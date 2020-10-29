package by.bsuir.training.controller.admin;

import by.bsuir.training.service.completedtask.CompletedTaskService;
import by.bsuir.training.service.course.CourseService;
import by.bsuir.training.service.databasefile.DatabaseFileService;
import by.bsuir.training.service.student.StudentService;
import by.bsuir.training.service.task.TaskService;
import by.bsuir.training.service.trainer.TrainerService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;


@RestController
public class AdminDeleteController {

    private static final String COURSE_ID = "courseId";
    private static final String TRAINER_ID = "trainerId";
    private static final String USERNAME = "username";
    private static final String STUDENT_ID = "studentId";
    private static final String FILE_ID = "fileId";


    private final TrainerService trainerService;
    private final CourseService courseService;
    private final TaskService taskService;
    private final UserService userService;
    private final CompletedTaskService completedTaskService;
    private final StudentService studentService;
    private final DatabaseFileService databaseFileService;

    @Autowired
    public AdminDeleteController(TrainerService trainerService, CourseService courseService, TaskService taskService, UserService userService, CompletedTaskService completedTaskService, StudentService studentService, DatabaseFileService databaseFileService) {
        this.completedTaskService = completedTaskService;
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.taskService = taskService;
        this.userService = userService;
        this.studentService = studentService;
        this.databaseFileService = databaseFileService;
    }


    @DeleteMapping(value = {"/course/{courseId}"})
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<Integer> deleteCourse(@PathVariable(COURSE_ID) int courseId) {
        courseService.remove(courseId);
        return ResponseEntity.ok(courseId);
    }


    @DeleteMapping(value = {"/trainer/{trainerId}"})
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<Integer> deleteTrainer(@PathVariable(TRAINER_ID) int trainerId) {
        trainerService.remove(trainerId);
        return ResponseEntity.ok(trainerId);
    }

    @DeleteMapping(value = {"/user/{username}"})
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<String> deleteUser(@PathVariable(USERNAME) String login) {
        userService.removeByLogin(login);
        return ResponseEntity.ok(login);
    }


    @DeleteMapping(value = {"/student/{studentId}"})
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<Integer> deleteStudent(@PathVariable(STUDENT_ID) int studentId) {
        studentService.remove(studentId);
        return ResponseEntity.ok(studentId);
    }

    @DeleteMapping(value = {"/file/{fileId}"})
    @Secured("ROLE_ADMINISTRATOR")
    public ResponseEntity<Integer> deleteFile(@PathVariable(FILE_ID) int fileId) {
        databaseFileService.remove(fileId);
        return ResponseEntity.ok(fileId);
    }
}
