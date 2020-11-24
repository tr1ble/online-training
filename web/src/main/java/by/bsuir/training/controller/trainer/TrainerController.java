package by.bsuir.training.controller.trainer;

import by.bsuir.training.entites.*;
import by.bsuir.training.entites.files.DatabaseFile;
import by.bsuir.training.service.completedtask.CompletedTaskService;
import by.bsuir.training.service.course.CourseService;
import by.bsuir.training.service.task.TaskService;
import by.bsuir.training.service.trainer.TrainerService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
public class TrainerController {

    private final CompletedTaskService completedTaskService;
    private final TaskService taskService;
    private final CourseService courseService;
    private final UserService userService;
    private final TrainerService trainerService;
    private static final String TASK_ID = "taskId";

    @Autowired
    public TrainerController(CompletedTaskService completedTaskService, TaskService taskService, CourseService courseService, UserService userService, TrainerService trainerService) {
        this.completedTaskService = completedTaskService;
        this.taskService = taskService;
        this.courseService = courseService;
        this.userService = userService;
        this.trainerService = trainerService;
    }


    @GetMapping("/download/{completedTaskId}")
    @Secured({"ROLE_TRAINER"})
    public ResponseEntity<Resource> downloadCompletedTask(@PathVariable int completedTaskId) {

        Optional<CompletedTask> completedTask = completedTaskService.findById(completedTaskId);

        if (completedTask.isPresent()) {
            DatabaseFile databaseFile = completedTask.get().getDatabaseFile();
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(databaseFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + databaseFile.getFileName() + "\"")
                .body(new ByteArrayResource(databaseFile.getData()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = {"/task"}, consumes = "application/json")
    @Secured("ROLE_TRAINER")
    public Task addTask(@RequestBody(required = false) @Valid Task task, Errors errors) {
        if(errors.hasErrors()) {
            return null;
        }
        return taskService.add(task);
    }

    @DeleteMapping(value = {"/task/{taskId}"})
    @Secured("ROLE_TRAINER")
    public ResponseEntity<Integer> deleteTask(@PathVariable(TASK_ID) int taskId)  {
        taskService.remove(taskId);
        return ResponseEntity.ok(taskId);
    }

    @PutMapping(value = {"/task"}, consumes = "application/json", produces = "application/json")
    @Secured("ROLE_TRAINER")
    public ResponseEntity<Task> editTask(@RequestBody Task task) {
        taskService.update(task);
        return ResponseEntity.ok(task);
    }


}
