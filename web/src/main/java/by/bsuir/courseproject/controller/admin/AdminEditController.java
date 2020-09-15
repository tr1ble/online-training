package by.bsuir.courseproject.controller.admin;

import by.bsuir.courseproject.entites.*;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
public class AdminEditController {

    private final TrainerService trainerService;
    private final CourseService courseService;
    private final TaskService taskService;
    private final UserService userService;
    private final CompletedTaskService completedTaskService;
    private final StudentService studentService;

    @Autowired
    public AdminEditController(TrainerService trainerService, CourseService courseService, TaskService taskService, UserService userService, CompletedTaskService completedTaskService, StudentService studentService) {
        this.completedTaskService = completedTaskService;
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.taskService = taskService;
        this.userService = userService;
        this.studentService = studentService;
    }

    @PutMapping(value = {"/course"}, consumes = "application/json", produces = "application/json")
    public ResponseEntity<Course> editCourse(@RequestBody Course course) {
        int trainerId = course.getTrainer().getId();
        Optional<Trainer> trainerOptional = trainerService.getById(trainerId);
        if(trainerOptional.isPresent()) {
            trainerOptional.get().setBusy(true);
            trainerService.add(trainerOptional.get());
        }
        courseService.update(course);
        return ResponseEntity.ok(course);
    }


    @PutMapping(value = {"/task"}, consumes = "application/json", produces = "application/json")
    public ResponseEntity<Task> editTask(@RequestBody Task task) {
       taskService.update(task);
       return ResponseEntity.ok(task);
    }

    @PutMapping(value = {"/trainer"}, consumes = "application/json", produces = "application/json")
    public ResponseEntity<Trainer> editTrainer(@RequestBody Trainer trainer) {
        trainerService.update(trainer);
        return ResponseEntity.ok(trainer);

    }
    @PutMapping(value = {"/user"}, consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.update(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping(value = {"/student"}, consumes = "application/json", produces = "application/json")
    public ResponseEntity<Student> editStudent(@RequestBody Student student) {
        studentService.update(student);
        return ResponseEntity.ok(student);

    }
    
    @PutMapping(value = {"/completedTask"}, consumes = "application/json", produces = "application/json")
    public ResponseEntity<CompletedTask> editCompletedTask(@RequestBody CompletedTask completedTask) {
        completedTaskService.update(completedTask);
        return ResponseEntity.ok(completedTask);
    }
}
