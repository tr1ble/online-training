package by.bsuir.training.controller.admin;

import by.bsuir.training.entites.User;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class AdminGetController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public AdminGetController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping(value = "/users", produces = "application/json")
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/user/{username}", produces = "application/json")
    @Secured({"ROLE_ADMINISTRATOR", "ROLE_STUDENT", "ROLE_TRAINER", "ROLE_DEFAULT"})
    public ResponseEntity<User> getUserByLogin(@PathVariable String username, Authentication authentication) {
        ResponseEntity<User> responseNotFound = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(authentication.getName().equals(username)) {
            Optional<User> userOptional = userService.getUserByLogin(username);
            return userOptional.map((user) -> new ResponseEntity<>(user, HttpStatus.OK)
            ).orElse(responseNotFound);
        }
        return responseNotFound;
    }


    @GetMapping(value = "/users/findByRole/{role}", produces = "application/json")
    @Secured({"ROLE_ADMINISTRATOR"})
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.findByRole(role));
    }

}
