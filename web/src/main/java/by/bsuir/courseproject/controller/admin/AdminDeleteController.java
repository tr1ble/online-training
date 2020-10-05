package by.bsuir.courseproject.controller.admin;

import by.bsuir.courseproject.entites.CompletedTask;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;


@RestController
public class AdminDeleteController {

    private static final String COURSE_ID = "courseId";
    private static final String TRAINER_ID = "trainerId";
    private static final String USERNAME = "username";
    private static final String TASK_ID = "taskId";
    private static final String STUDENT_ID = "studentId";
    private static final String FILE_ID = "fileId";
    private static final String COMPLETED_TASK_ID = "completedTaskId";

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
    public ResponseEntity<Integer> deleteCourse(@PathVariable(COURSE_ID) int courseId) {
        courseService.remove(courseId);
        return ResponseEntity.ok(courseId);
    }

    @DeleteMapping(value = {"/task/{taskId}"})
    public ResponseEntity<Integer> deleteTask(@PathVariable(TASK_ID) int taskId)  {
        taskService.remove(taskId);
        return ResponseEntity.ok(taskId);
    }

    @DeleteMapping(value = {"/trainer/{trainerId}"})
    public ResponseEntity<Integer> deleteTrainer(@PathVariable(TRAINER_ID) int trainerId) {
        trainerService.remove(trainerId);
        return ResponseEntity.ok(trainerId);
    }

    @DeleteMapping(value = {"/user/{username}"})
    public ResponseEntity<String> deleteUser(@PathVariable(USERNAME) String login) {
        userService.removeByLogin(login);
        return ResponseEntity.ok(login);
    }

    @DeleteMapping(value = {"/completedTask/{completedTaskId}"})
    public ResponseEntity<Integer> deleteCompletedTask(@PathVariable(COMPLETED_TASK_ID) int completedTaskId) {
        completedTaskService.remove(completedTaskId);
        return ResponseEntity.ok(completedTaskId);
    }

    @DeleteMapping(value = {"/student/{studentId}"})
    public ResponseEntity<Integer> deleteStudent(@PathVariable(STUDENT_ID) int studentId) {
        studentService.remove(studentId);
        return ResponseEntity.ok(studentId);
    }

    @DeleteMapping(value = {"/file/{fileId}"})
    public ResponseEntity<Integer> deleteFile(@PathVariable(FILE_ID) int fileId) {
        databaseFileService.remove(fileId);
        return ResponseEntity.ok(fileId);
    }
}
