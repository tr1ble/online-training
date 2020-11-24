package by.bsuir.training.controller.admin;

import by.bsuir.training.entites.*;
import by.bsuir.training.entites.files.DatabaseFile;
import by.bsuir.training.exceptions.FileStorageException;
import by.bsuir.training.service.course.CourseService;
import by.bsuir.training.service.databasefile.DatabaseFileService;
import by.bsuir.training.service.student.StudentService;
import by.bsuir.training.service.trainer.TrainerService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@RestController
public class AdminAddController {

    private final TrainerService trainerService;
    private final CourseService courseService;
    private final UserService userService;
    private final StudentService studentService;
    private final DatabaseFileService databaseFileService;

    @Autowired
    public AdminAddController(TrainerService trainerService, CourseService courseService, UserService userService, StudentService studentService, DatabaseFileService databaseFileService) {
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.userService = userService;
        this.studentService = studentService;
        this.databaseFileService = databaseFileService;
    }


    @PostMapping(value = {"/course"}, consumes = "application/json")
    @Secured("ROLE_ADMINISTRATOR")
    public Course addCourse(@RequestBody(required = false) Course course, @RequestParam(value="file") MultipartFile file) throws FileStorageException {
        int trainerId = course.getTrainer().getId();
        Optional<Trainer> trainerOptional = trainerService.getById(trainerId);
        if(trainerOptional.isPresent()) {
            trainerOptional.get().setBusy(true);
            trainerService.add(trainerOptional.get());
        }
        DatabaseFile databaseFile = databaseFileService.store(file);
        course.setImage(databaseFile);
        return courseService.add(course);
    }


    @PostMapping(value = {"/trainer"}, consumes = "application/json")
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<Trainer> addTrainer(@RequestBody(required = false) Trainer trainer) {
        Optional<User> userOptional = userService.getUserByLogin(trainer.getUser().getLogin());
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(Role.valueOf("ROLE_TRAINER"));
            userService.update(user);
        }
        return new ResponseEntity<>(trainerService.add(trainer), HttpStatus.OK);
    }


    @PostMapping(value = {"/user"}, consumes = "application/json")
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<String> addUser(@RequestBody(required = false) User user) {
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(!userOptional.isPresent()) {
            userService.add(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("This login is already taken", HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(value = {"/student"}, consumes = "application/json")
    @Secured("ROLE_ADMINISTRATOR")
    public Student addStudent(@RequestBody(required = false) Student student) {
        return studentService.add(student);

    }
}
