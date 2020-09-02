package by.bsuir.courseproject.service.completedtask;

import by.bsuir.courseproject.entites.CompletedTask;
import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.service.Service;

import java.util.List;
import java.util.Optional;

public interface CompletedTaskService extends Service<CompletedTask> {
    Optional<CompletedTask> findById(int taskId);
    List<CompletedTask> findByCourse(Course course);
    List<CompletedTask> findByStudent(Student student);
    List<CompletedTask> findByMark(double mark);
}
