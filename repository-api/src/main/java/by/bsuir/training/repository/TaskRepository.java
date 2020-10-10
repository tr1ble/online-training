package by.bsuir.training.repository;

import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Integer> {
    List<Task> findAll();
    List<Task> findByCourse(Course course);
}
