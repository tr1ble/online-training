package by.bsuir.courseproject.controller.common;

import by.bsuir.courseproject.entites.Role;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.exceptions.FileStorageException;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.databasefile.DatabaseFileService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.MultipartConfigElement;
import javax.servlet.annotation.MultipartConfig;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class CommonAddController {

    private static final String ROLE_DEFAULT = "ROLE_DEFAULT";
    private static final String ERROR_MESSAGE = "This login is already taken";

    private final UserService userService;
    private final DatabaseFileService databaseFileService;

    @Autowired
    public CommonAddController(UserService userService, DatabaseFileService databaseFileService) {
        this.userService = userService;
        this.databaseFileService = databaseFileService;
    }

    @PostMapping(value = {"/register"}, consumes = "application/json")
    public ResponseEntity<String> register(@RequestBody(required = false) User user) {
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(!userOptional.isPresent()) {
            user.setRole(Role.valueOf(ROLE_DEFAULT));
            userService.add(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(ERROR_MESSAGE, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/uploadImage/{login}")
    public ResponseEntity<User> uploadImage(@RequestParam(value="formData", required = false) MultipartFile file, @PathVariable String login) throws FileStorageException {
        if(file!=null) {
            Optional<User> userOptional = userService.getUserByLogin(login);
            DatabaseFile databaseFile = databaseFileService.store(file);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setImage(databaseFile);
                userService.add(user);
                return ResponseEntity.ok(user);
            }
        }
        System.out.println(file);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
