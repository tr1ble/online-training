package by.bsuir.courseproject.repository;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Integer> {
    List<Task> findAll();
    List<Task> findByCourse(Course course);
}
