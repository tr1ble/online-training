package by.bsuir.courseproject.controller.student;

import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.entites.files.UploadFile;
import by.bsuir.courseproject.exceptions.FileStorageException;
import by.bsuir.courseproject.service.databasefile.DatabaseFileService;
import by.bsuir.courseproject.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;


@RestController
public class StudentController {

    private static final String STUDENT_ID = "student_id";
    private final StudentService studentService;
    private final DatabaseFileService databaseFileService;

    @Autowired
    public StudentController(StudentService studentService, DatabaseFileService databaseFileService) {
        this.databaseFileService = databaseFileService;
        this.studentService = studentService;
    }

    @PostMapping(value = {"/registration"}, consumes = "application/json")
    public Student registration(@RequestBody Student student)  {
        return studentService.add(student);
    }

    @PostMapping(value = {"/unregister"}, consumes = "application/json")
    public void unregister(@RequestBody Map<String, Integer> data)  {
        studentService.remove(data.get(STUDENT_ID));
    }


    @PostMapping("/uploadFile")
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



}
