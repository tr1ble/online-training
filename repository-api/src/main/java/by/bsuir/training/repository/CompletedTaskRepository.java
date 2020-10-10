package by.bsuir.training.repository;


import by.bsuir.training.entites.CompletedTask;
import by.bsuir.training.entites.Student;
import by.bsuir.training.entites.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompletedTaskRepository extends CrudRepository<CompletedTask, Integer> {
    List<CompletedTask> findByTask(Task task);
    List<CompletedTask> findAll();
    List<CompletedTask> findByStudent(Student student);
    List<CompletedTask> findByMark(double mark);
}
