package by.bsuir.courseproject.controller.student;

import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.entites.files.UploadFile;
import by.bsuir.courseproject.exceptions.FileStorageException;
import by.bsuir.courseproject.service.databasefile.DatabaseFileService;
import by.bsuir.courseproject.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;


@RestController
public class StudentController {

    private static final String STUDENT_ID = "studentId";

    private final StudentService studentService;
    private final DatabaseFileService databaseFileService;

    @Autowired
    public StudentController(StudentService studentService, DatabaseFileService databaseFileService) {
        this.databaseFileService = databaseFileService;
        this.studentService = studentService;
    }

    @PostMapping(value = {"/registration"})
    public Student registration(@RequestBody Student student)  {
        return studentService.add(student);
    }

    @PostMapping(value = {"/unregister"})
    public void unregister(@RequestBody Map<String, Integer> data)  {
        studentService.remove(data.get("student_id"));
    }


    @PostMapping("/uploadFile")
    public UploadFile uploadFile(@RequestParam("file") MultipartFile file) throws FileStorageException {
        DatabaseFile databaseFile = databaseFileService.store(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(String.valueOf(databaseFile.getId()))
                .toUriString();

        return new UploadFile(databaseFile.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }



}
