package by.bsuir.courseproject.service.course;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Trainer;
import by.bsuir.courseproject.service.Service;

import java.util.Optional;
import java.util.*;

public interface CourseService extends Service<Course> {
    Optional<Course> findById(int id);
    List<Course> findByTrainer(Trainer trainer);
}
