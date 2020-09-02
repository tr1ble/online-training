package by.bsuir.courseproject.controller;

import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UtilController {

    private UserService userService;

    @Autowired
    public UtilController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = {"/current-user"}, method = RequestMethod.GET)
    public ResponseEntity<User> user(Authentication authentication) {
        String userLogin = authentication.getName();
        Optional<User> optionalUser = userService.getUserByLogin(userLogin);
        return optionalUser.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
