package by.bsuir.training.controller.student;

import by.bsuir.training.entites.*;
import by.bsuir.training.service.completedtask.CompletedTaskService;
import by.bsuir.training.service.course.CourseService;
import by.bsuir.training.service.databasefile.DatabaseFileService;
import by.bsuir.training.service.student.StudentService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;


@RestController
public class StudentController {
    private final StudentService studentService;
    private final UserService userService;
    private final CourseService courseService;
    private final CompletedTaskService completedTaskService;
    private final DatabaseFileService databaseFileService;

    private static final String STUDENT_ID = "student_id";
    private static final String COMPLETED_TASK_ID = "completedTaskId";

    @Autowired
    public StudentController(StudentService studentService, UserService userService, CourseService courseService, CompletedTaskService completedTaskService, DatabaseFileService databaseFileService) {
        this.userService = userService;
        this.courseService = courseService;
        this.completedTaskService = completedTaskService;
        this.databaseFileService = databaseFileService;
        this.studentService = studentService;
    }

    @PostMapping(value = {"/registration"}, consumes = "application/json")
    @Secured({"ROLE_DEFAULT"})
    public Student registration(@RequestBody Student student)  {
        Optional<User> userOptional = userService.getUserByLogin(student.getUser().getLogin());
        userOptional.ifPresent(u -> {
            u.setRole(Role.ROLE_STUDENT);
            student.setUser(u);
        });
        Optional<Course> courseOptional = courseService.findById(student.getCourse().getId());
        courseOptional.ifPresent(student::setCourse);
        return studentService.add(student);
    }

    @PostMapping(value = {"/unregister"}, consumes = "application/json")
    @Secured({"ROLE_STUDENT"})
    public void unregister(@RequestBody Map<String, Integer> data)  {
        studentService.remove(data.get(STUDENT_ID));
    }


    @PostMapping("/uploadFile")
    @Secured({"ROLE_STUDENT"})
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            databaseFileService.store(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @PostMapping(value = {"/completedtask"}, consumes = "application/json")
    @Secured("ROLE_STUDENT")
    public CompletedTask addCompletedTask(@RequestBody(required = false) CompletedTask completedTask) {
        return completedTaskService.add(completedTask);
    }

    @PutMapping(value = {"/completedTask"}, consumes = "application/json", produces = "application/json")
    @Secured("ROLE_STUDENT")
    public ResponseEntity<CompletedTask> editCompletedTask(@RequestBody CompletedTask completedTask) {
        completedTaskService.update(completedTask);
        return ResponseEntity.ok(completedTask);
    }

    @DeleteMapping(value = {"/completedTask/{completedTaskId}"})
    public ResponseEntity<Integer> deleteCompletedTask(@PathVariable(COMPLETED_TASK_ID) int completedTaskId) {
        completedTaskService.remove(completedTaskId);
        return ResponseEntity.ok(completedTaskId);
    }



}
