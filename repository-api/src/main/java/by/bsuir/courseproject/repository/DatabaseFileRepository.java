package by.bsuir.courseproject.repository;


import by.bsuir.courseproject.entites.files.DatabaseFile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseFileRepository extends CrudRepository<DatabaseFile, Integer> {
}
