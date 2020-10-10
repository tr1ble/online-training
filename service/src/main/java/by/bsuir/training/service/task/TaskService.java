package by.bsuir.training.service.task;

import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Task;
import by.bsuir.training.service.Service;
import java.util.*;

import java.util.Optional;

public interface TaskService extends Service<Task> {
    Optional<Task> findById(int taskId);
    List<Task> findByCourse(Course course);
}
