package by.bsuir.training.repository;


import by.bsuir.training.entites.files.DatabaseFile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseFileRepository extends CrudRepository<DatabaseFile, Integer> {
}
