package by.bsuir.training.repository;

import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Trainer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends CrudRepository<Course, Integer> {
    Optional<Course> findById(int id);
    List<Course> findAll();
    List<Course> findByTrainer(Trainer trainer);
}
