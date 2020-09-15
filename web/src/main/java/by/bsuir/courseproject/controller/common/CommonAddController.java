package by.bsuir.courseproject.controller.common;

import by.bsuir.courseproject.entites.Role;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CommonAddController {

    private static final String ROLE_DEFAULT = "ROLE_DEFAULT";
    private static final String ERROR_MESSAGE = "This login is already taken";

    private UserService userService;

    @Autowired
    public CommonAddController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = {"/register"}, consumes = "application/json")
    public ResponseEntity register(@RequestBody(required = false) User user) {
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(!userOptional.isPresent()) {
            user.setRole(Role.valueOf(ROLE_DEFAULT));
            userService.add(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(ERROR_MESSAGE, HttpStatus.NOT_FOUND);
        }

    }
}
