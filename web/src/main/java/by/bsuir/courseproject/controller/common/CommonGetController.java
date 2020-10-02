package by.bsuir.courseproject.controller.common;

import by.bsuir.courseproject.entites.*;
import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.entites.files.UploadFile;
import by.bsuir.courseproject.exceptions.FileStorageException;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.databasefile.DatabaseFileService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;


@RestController
public class CommonGetController {

    private final StudentService studentService;
    private final TaskService taskService;
    private final CompletedTaskService completedTaskService;
    private final TrainerService trainerService;
    private final CourseService courseService;
    private final UserService userService;


    @Autowired
    public CommonGetController(StudentService studentService, TaskService taskService, CompletedTaskService completedTaskService, TrainerService trainerService,
                               CourseService courseService, UserService userService) {
        this.userService = userService;
        this.courseService = courseService;
        this.studentService = studentService;
        this.taskService = taskService;
        this.completedTaskService = completedTaskService;
        this.trainerService = trainerService;
    }

    @GetMapping(value = "/")
    public  String training() {
        return "Online training application";
    }

    @GetMapping(value = "/courses", produces = {"application/json"})
    public  ResponseEntity<List<Course>> getCourses() {
        return ResponseEntity.ok(courseService.getAll());
    }

    @GetMapping(value = "/course/{id}", produces = {"application/json"})
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        Optional<Course> courseOptional = courseService.findById(id);
        return courseOptional.map(course -> new ResponseEntity<>(course, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/courses/findByTrainer/{id}", produces = {"application/json"})
    public ResponseEntity<List<Course>> getCourseByTrainer(@PathVariable int id) {
        Optional<Trainer> trainerOptional = trainerService.getById(id);
        return trainerOptional.map(trainer -> ResponseEntity.ok(courseService.findByTrainer(trainer))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/completedtasks", produces = {"application/json"})
    public ResponseEntity<List<CompletedTask>> getCompletedTasks() {
        return ResponseEntity.ok(completedTaskService.getAll());
    }

    @GetMapping(value = "/completedtasks/findByStudent/{id}", produces = {"application/json"})
    public ResponseEntity<List<CompletedTask>> getCompletedTasksByStudent(@PathVariable int id) {
        Optional<Student> studentOptional = studentService.findById(id);
        return studentOptional.map(student -> ResponseEntity.ok(completedTaskService.findByStudent(student))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/completedtasks/findByMark/{mark}", produces = {"application/json"})
    public ResponseEntity<List<CompletedTask>> getCompletedTasksByMark(@PathVariable double mark) {
        return ResponseEntity.ok(completedTaskService.findByMark(mark));
    }

    @GetMapping(value = "/completedtasks/findByCourse/{id}", produces = {"application/json"})
    public ResponseEntity<List<CompletedTask>> getCompletedTasksByCourse(@PathVariable int id) {
        Optional<Task> taskOptional = taskService.findById(id);
        return taskOptional.map(task -> ResponseEntity.ok(completedTaskService.findByTask(task))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @GetMapping(value = "/completedtask/{id}", produces = {"application/json"})
    public ResponseEntity<CompletedTask> getCompletedTaskById(@PathVariable int id) {
        Optional<CompletedTask> taskOptional = completedTaskService.findById(id);
        return taskOptional.map(task -> new ResponseEntity<>(task, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/trainers", produces = {"application/json"})
    public ResponseEntity<List<Trainer>> getTrainers() {
        return ResponseEntity.ok(trainerService.getAll());
    }

    @GetMapping(value = "/trainer/{id}", produces = {"application/json"})
    public ResponseEntity<Trainer> getTrainerById(@PathVariable int id) {
        Optional<Trainer> trainerOptional = trainerService.getById(id);
        return trainerOptional.map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/trainers/findByBusy/{busy}", produces = {"application/json"})
    public List<Trainer> getTrainersByBusy(@PathVariable boolean busy) {
        return trainerService.findByBusy(busy);
    }

    @GetMapping(value = "/trainers/findByUser/{username}", produces = {"application/json"})
    public ResponseEntity<Trainer> getTrainerByUser(@PathVariable String username) {
        User user = new User(username);
        Optional<Trainer> trainerOptional = trainerService.findByUser(user);
        return trainerOptional.map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/trainers/findByFio/{surname}&{firstname}&{secondname}", produces = {"application/json"})
    public ResponseEntity<Trainer> getTrainerByFio(@PathVariable String surname, @PathVariable String firstname, @PathVariable String secondname) {
        Optional<Trainer> trainerOptional = trainerService.findByFio(surname, firstname, secondname);
        return trainerOptional.map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/tasks", produces = {"application/json"})
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(taskService.getAll());
    }

    @GetMapping(value = "/tasks/findByCourse/{id}", produces = {"application/json"})
    public ResponseEntity<List<Task>> getTasksById(@PathVariable int id) {
        Optional<Course> courseOptional = courseService.findById(id);
        return courseOptional.map(course -> ResponseEntity.ok(taskService.findByCourse(course))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/task/{id}", produces = {"application/json"})
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        Optional<Task> taskOptional = taskService.findById(id);
        return taskOptional.map(task -> new ResponseEntity<>(task, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/students", produces = {"application/json"})
    public ResponseEntity<List<Student>> getStudents() {
        return ResponseEntity.ok(studentService.getAll());
    }

    @GetMapping(value = "/student/{id}", produces = {"application/json"})
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> studentOptional = studentService.findById(id);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/students/findByCourse/{id}", produces = {"application/json"})
    public ResponseEntity<List<Student>> getStudentsByCourse(@PathVariable int id) {
        Optional<Course> courseOptional = courseService.findById(id);
        return courseOptional.map(course -> ResponseEntity.ok(studentService.findByCourse(course))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/students/findByUser/{username}", produces = {"application/json"})
    public ResponseEntity<Student> getStudentByUser(@PathVariable String username) {
        User user = new User(username);
        Optional<Student> studentOptional = studentService.findCurrentStudentByUser(user);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/students/findByFio/{surname}&{firstname}&{secondname}", produces = {"application/json"})
    public ResponseEntity<Student> getStudentByFio(@PathVariable String surname, @PathVariable String firstname, @PathVariable String secondname) {
        Optional<Student> studentOptional = studentService.findByFio(surname, firstname, secondname);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/currentUser", produces = "application/json")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        ResponseEntity<User> responseEntityNotFound = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        String name = authentication.getName();
        System.out.println(name);
        Optional<User> userOptional = userService.getUserByLogin(name);
        return userOptional.map((user) -> new ResponseEntity<>(user, HttpStatus.OK)
        ).orElse(responseEntityNotFound);
    }

    @PostMapping(value = "/getImage/{login}", produces = "application/json")
    public ResponseEntity<DatabaseFile> getImage(@PathVariable("login") String username) {
        Optional<User> userOptional = userService.getUserByLogin(username);
        System.out.println(userOptional);
        return userOptional.map((user) -> new ResponseEntity<>(user.getImage(), HttpStatus.OK)
        ).orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }


}
