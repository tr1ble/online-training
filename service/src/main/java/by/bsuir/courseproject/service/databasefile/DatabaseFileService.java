package by.bsuir.courseproject.service.databasefile;

import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.exceptions.FileStorageException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface DatabaseFileService {
    Optional<DatabaseFile> findById(int databaseFileId);
    DatabaseFile store(MultipartFile file) throws FileStorageException;
    void remove(int id);
}
