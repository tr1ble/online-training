package by.bsuir.training.controller.admin;

import by.bsuir.training.entites.User;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/user/{username}", produces = "application/json")
    public ResponseEntity<User> getTrainerById(@PathVariable String username) {
        Optional<User> userOptional = userService.getUserByLogin(username);
        return userOptional.map((user) -> new ResponseEntity<>(user, HttpStatus.OK)
        ).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @GetMapping(value = "/users/findByRole/{role}", produces = "application/json")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.findByRole(role));
    }

}
