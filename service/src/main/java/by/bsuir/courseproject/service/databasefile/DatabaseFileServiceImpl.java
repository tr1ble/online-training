package by.bsuir.courseproject.service.databasefile;

import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.exceptions.FileStorageException;
import by.bsuir.courseproject.repository.DatabaseFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;


@Service
public class DatabaseFileServiceImpl implements DatabaseFileService {

    @Autowired
    private DatabaseFileRepository databaseFileRepository;

    @Autowired
    public DatabaseFileServiceImpl()  {
    }


    @Override
    public Optional<DatabaseFile> findById(int databaseFileId) {
        return databaseFileRepository.findById(databaseFileId);
    }

    @Override
    public DatabaseFile store(MultipartFile file) throws FileStorageException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! File contains invalid path sequence " + fileName);
            }
            DatabaseFile dbFile = new DatabaseFile(fileName, file.getContentType(), file.getBytes());
            return databaseFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }


}
