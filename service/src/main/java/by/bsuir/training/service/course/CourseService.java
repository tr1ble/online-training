package by.bsuir.training.service.course;

import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Trainer;
import by.bsuir.training.service.Service;

import java.util.Optional;
import java.util.*;

public interface CourseService extends Service<Course> {
    Optional<Course> findById(int id);
    List<Course> findByTrainer(Trainer trainer);
}
