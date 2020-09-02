package by.bsuir.courseproject.service.task;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Task;
import by.bsuir.courseproject.service.Service;
import java.util.*;

import java.util.Optional;

public interface TaskService extends Service<Task> {
    Optional<Task> findById(int taskId);
    List<Task> findByCourse(Course course);
}
