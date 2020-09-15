package by.bsuir.courseproject.controller.common;

import by.bsuir.courseproject.entites.*;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class CommonGetController {

    private StudentService studentService;
    private TaskService taskService;
    private CompletedTaskService completedTaskService;
    private TrainerService trainerService;
    private CourseService courseService;


    @Autowired
    public CommonGetController(StudentService studentService, TaskService taskService, CompletedTaskService completedTaskService, TrainerService trainerService, CourseService courseService) {

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

    @RequestMapping(value = "/courses", produces = {"application/json"} )
    public  ResponseEntity<List<Course>> getCourses() {
        return ResponseEntity.ok(courseService.getAll());
    }

    @RequestMapping(value = "/course/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        Optional<Course> courseOptional = courseService.findById(id);
        return courseOptional.map(course -> new ResponseEntity<>(course, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/courses/findByTrainer/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<Course>> getCourseByTrainer(@PathVariable int id) {
        Optional<Trainer> trainerOptional = trainerService.getById(id);
        return trainerOptional.map(trainer -> ResponseEntity.ok(courseService.findByTrainer(trainer))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/completedtasks", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<CompletedTask>> getCompletedTasks() {
        return ResponseEntity.ok(completedTaskService.getAll());
    }

    @RequestMapping(value = "/completedtasks/findByStudent/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<CompletedTask>> getCompletedTasksByStudent(@PathVariable int id) {
        Optional<Student> studentOptional = studentService.findById(id);
        return studentOptional.map(student -> ResponseEntity.ok(completedTaskService.findByStudent(student))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/completedtasks/findByMark/{mark}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<CompletedTask>> getCompletedTasksByMark(@PathVariable double mark) {
        return ResponseEntity.ok(completedTaskService.findByMark(mark));
    }

    @RequestMapping(value = "/completedtasks/findByCourse/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<CompletedTask>> getCompletedTasksByCourse(@PathVariable int id) {
        Optional<Task> taskOptional = taskService.findById(id);
        return taskOptional.map(task -> ResponseEntity.ok(completedTaskService.findByTask(task))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @RequestMapping(value = "/completedtask/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<CompletedTask> getCompletedTaskById(@PathVariable int id) {
        Optional<CompletedTask> taskOptional = completedTaskService.findById(id);
        return taskOptional.map(task -> new ResponseEntity<>(task, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/trainers", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<Trainer>> getTrainers() {
        return ResponseEntity.ok(trainerService.getAll());
    }

    @RequestMapping(value = "/trainer/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Trainer> getTrainerById(@PathVariable int id) {
        Optional<Trainer> trainerOptional = trainerService.getById(id);
        return trainerOptional.map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/trainers/findByBusy/{busy}", method = {RequestMethod.POST, RequestMethod.GET})
    public List<Trainer> getTrainersByBusy(@PathVariable boolean busy) {
        return trainerService.findByBusy(busy);
    }

    @RequestMapping(value = "/trainers/findByUser/{username}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Trainer> getTrainerByUser(@PathVariable String username) {
        User user = new User(username);
        Optional<Trainer> trainerOptional = trainerService.findByUser(user);
        return trainerOptional.map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/trainers/findByFio/{surname}&{firstname}&{secondname}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Trainer> getTrainerByFio(@PathVariable String surname, @PathVariable String firstname, @PathVariable String secondname) {
        Optional<Trainer> trainerOptional = trainerService.findByFio(surname, firstname, secondname);
        return trainerOptional.map(trainer -> new ResponseEntity<>(trainer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/tasks", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(taskService.getAll());
    }

    @RequestMapping(value = "/tasks/findByCourse/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<Task>> getTasksById(@PathVariable int id) {
        Optional<Course> courseOptional = courseService.findById(id);
        if(courseOptional.isPresent()) {
            return ResponseEntity.ok(taskService.findByCourse(courseOptional.get()));
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/task/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        Optional<Task> taskOptional = taskService.findById(id);
        return taskOptional.map(task -> new ResponseEntity<>(task, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/students", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<Student>> getStudents() {
        return ResponseEntity.ok(studentService.getAll());
    }

    @RequestMapping(value = "/student/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> studentOptional = studentService.findById(id);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/students/findByCourse/{id}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<List<Student>> getStudentsByCourse(@PathVariable int id) {
        Optional<Course> courseOptional = courseService.findById(id);
        return courseOptional.map(course -> ResponseEntity.ok(studentService.findByCourse(course))).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/students/findByUser/{username}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Student> getStudentByUser(@PathVariable String username) {
        User user = new User(username);
        Optional<Student> studentOptional = studentService.findCurrentStudentByUser(user);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/students/findByFio/{surname}&{firstname}&{secondname}", method = {RequestMethod.POST, RequestMethod.GET})
    public ResponseEntity<Student> getStudentByFio(@PathVariable String surname, @PathVariable String firstname, @PathVariable String secondname) {
        Optional<Student> studentOptional = studentService.findByFio(surname, firstname, secondname);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
