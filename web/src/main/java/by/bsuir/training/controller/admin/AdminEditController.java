package by.bsuir.training.controller.admin;

import by.bsuir.training.entites.*;
import by.bsuir.training.service.completedtask.CompletedTaskService;
import by.bsuir.training.service.course.CourseService;
import by.bsuir.training.service.request.RequestService;
import by.bsuir.training.service.student.StudentService;
import by.bsuir.training.service.task.TaskService;
import by.bsuir.training.service.trainer.TrainerService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class AdminEditController {

    private final TrainerService trainerService;
    private final CourseService courseService;
    private final TaskService taskService;
    private final UserService userService;
    private final CompletedTaskService completedTaskService;
    private final StudentService studentService;
    private final RequestService requestService;

    @Autowired
    public AdminEditController(TrainerService trainerService, CourseService courseService, TaskService taskService, UserService userService, CompletedTaskService completedTaskService, StudentService studentService, RequestService requestService) {
        this.completedTaskService = completedTaskService;
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.taskService = taskService;
        this.userService = userService;
        this.studentService = studentService;
        this.requestService = requestService;
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
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(userOptional.isPresent()) {
            user.setImage(userOptional.get().getImage());
            user.setRequestList(userOptional.get().getRequestList());
        }
        userService.updateExceptPassword(user);
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

    @PutMapping(value = {"/request"}, consumes = "application/json")
    @Secured({"ROLE_ADMINISTRATOR"})
    public ResponseEntity<String> handleRequest(@RequestBody(required = false)Request request) {
        Optional<User> userOptional = userService.getUserByLogin(request.getUser().getLogin());
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            switch (request.getRequestType()) {
                case ROLE:
                    user.setRole(Role.valueOf(request.getValue()));
                    break;
                case LOGIN:
                    user.setLogin(request.getValue());
                    break;
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong request type");
            }
            userService.update(user);
            return ResponseEntity.ok("Request was successfully handled!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No such a user");
        }
    }
}
