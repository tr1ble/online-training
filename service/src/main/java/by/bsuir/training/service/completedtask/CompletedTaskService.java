package by.bsuir.training.service.completedtask;

import by.bsuir.training.entites.CompletedTask;
import by.bsuir.training.entites.Student;
import by.bsuir.training.entites.Task;
import by.bsuir.training.service.Service;

import java.util.List;
import java.util.Optional;

public interface CompletedTaskService extends Service<CompletedTask> {
    Optional<CompletedTask> findById(int taskId);
    List<CompletedTask> findByTask(Task Task);
    List<CompletedTask> findByStudent(Student student);
    List<CompletedTask> findByMark(double mark);
}
