package by.bsuir.training.controller.admin;

import by.bsuir.training.entites.*;
import by.bsuir.training.service.completedtask.CompletedTaskService;
import by.bsuir.training.service.course.CourseService;
import by.bsuir.training.service.student.StudentService;
import by.bsuir.training.service.task.TaskService;
import by.bsuir.training.service.trainer.TrainerService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;


@RestController
public class AdminAddController {

    private TrainerService trainerService;
    private CourseService courseService;
    private TaskService taskService;
    private UserService userService;
    private CompletedTaskService completedTaskService;
    private StudentService studentService;

    @Autowired
    public AdminAddController(TrainerService trainerService, CourseService courseService, TaskService taskService, UserService userService, CompletedTaskService completedTaskService, StudentService studentService) {
        this.completedTaskService = completedTaskService;
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.taskService = taskService;
        this.userService = userService;
        this.studentService = studentService;
    }


    @PostMapping(value = {"/course"}, consumes = "application/json")
    public Course addCourse(@RequestBody(required = false) Course course) {
        int trainerId = course.getTrainer().getId();
        Optional<Trainer> trainerOptional = trainerService.getById(trainerId);
        if(trainerOptional.isPresent()) {
            trainerOptional.get().setBusy(true);
            trainerService.add(trainerOptional.get());
        }
        return courseService.add(course);
    }

    @PostMapping(value = {"/task"}, consumes = "application/json")
    public Task addTask(@RequestBody(required = false) @Valid Task task, Errors errors) {
        if(errors.hasErrors()) {
            return null;
        }
        return taskService.add(task);
    }

    @PostMapping(value = {"/trainer"}, consumes = "application/json")
    public ResponseEntity<Trainer> addTrainer(@RequestBody(required = false) Trainer trainer) {
        Optional<User> userOptional = userService.getUserByLogin(trainer.getUser().getLogin());
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(Role.valueOf("ROLE_TRAINER"));
            userService.add(user);
        }
        return new ResponseEntity<>(trainerService.add(trainer), HttpStatus.OK);
    }


    @PostMapping(value = {"/user"}, consumes = "application/json")
    public ResponseEntity<String> addUser(@RequestBody(required = false) User user) {
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(!userOptional.isPresent()) {
            userService.add(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("This login is already taken", HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(value = {"/completedtask"}, consumes = "application/json")
    public CompletedTask addCompletedTask(@RequestBody(required = false) CompletedTask completedTask) {
        return completedTaskService.add(completedTask);

    }

    @PostMapping(value = {"/student"}, consumes = "application/json")
    public Student addStudent(@RequestBody(required = false) Student student) {
        return studentService.add(student);

    }
}
