package by.bsuir.training.controller.trainer;

import by.bsuir.training.entites.CompletedTask;
import by.bsuir.training.entites.files.DatabaseFile;
import by.bsuir.training.service.completedtask.CompletedTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class TrainerController {

    private final CompletedTaskService completedTaskService;

    @Autowired
    public TrainerController(CompletedTaskService completedTaskService) {
        this.completedTaskService = completedTaskService;
    }


    @GetMapping("/download/{completedTaskId}")
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

}
