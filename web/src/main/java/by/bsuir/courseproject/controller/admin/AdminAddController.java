package by.bsuir.courseproject.controller.admin;

import by.bsuir.courseproject.entites.*;
import by.bsuir.courseproject.exceptions.RepositoryException;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.apache.coyote.Response;
import org.apache.tomcat.jni.Error;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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


    @RequestMapping(value = {"/course"}, method = RequestMethod.POST)
    public Course addCourse(@RequestBody(required = false) Course course) {
        int trainerId = course.getTrainer().getId();
        Optional<Trainer> trainerOptional = trainerService.getById(trainerId);
        if(trainerOptional.isPresent()) {
            trainerOptional.get().setBusy(true);
            trainerService.add(trainerOptional.get());
        }
        return courseService.add(course);
    }

    @RequestMapping(value = {"/task"}, method = RequestMethod.POST)
    public Task addTask(@RequestBody(required = false) @Valid Task task, Errors errors) {
        if(errors.hasErrors()) {
            return null;
        }
        return taskService.add(task);
    }

    @RequestMapping(value = {"/trainer"}, method = RequestMethod.POST)
    public ResponseEntity<Trainer> addTrainer(@RequestBody(required = false) Trainer trainer) {
        Optional<User> userOptional = userService.getUserByLogin(trainer.getUser().getLogin());
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(Role.valueOf("ROLE_TRAINER"));
            userService.add(user);
        }
        return new ResponseEntity<>(trainerService.add(trainer), HttpStatus.OK);
    }


    @RequestMapping(value = {"/user"}, method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody(required = false) User user) {
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(!userOptional.isPresent()) {
            userService.add(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("This login is already taken", HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value = {"/completedtask"}, method = RequestMethod.POST)
    public CompletedTask addCompletedTask(@RequestBody(required = false) CompletedTask completedTask) {
        return completedTaskService.add(completedTask);

    }

    @RequestMapping(value = {"/student"}, method = RequestMethod.POST)
    public Student addStudent(@RequestBody(required = false) Student student) {
        return studentService.add(student);

    }
}
