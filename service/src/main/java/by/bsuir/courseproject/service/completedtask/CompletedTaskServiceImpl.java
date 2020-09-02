package by.bsuir.courseproject.service.completedtask;

import by.bsuir.courseproject.entites.CompletedTask;
import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.repository.CompletedTaskRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class CompletedTaskServiceImpl implements CompletedTaskService {

    @Autowired
    private CompletedTaskRepository completedTaskRepository;

    @Autowired
    public CompletedTaskServiceImpl()  {
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<CompletedTask> getAll() {
        return completedTaskRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public CompletedTask add(CompletedTask completedTask)  {
        return completedTaskRepository.save(completedTask);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id)  {
        completedTaskRepository.deleteById(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void update(CompletedTask completedTask) {
        completedTaskRepository.save(completedTask);
    }

    @Override
    public Optional<CompletedTask> findById(int taskId) {
        return completedTaskRepository.findById(taskId);
    }

    @Override
    public List<CompletedTask> findByCourse(Course course)  {
        return completedTaskRepository.findByCourse(course);
    }

    @Override
    public List<CompletedTask> findByStudent(Student student) {
        return completedTaskRepository.findByStudent(student);
    }

    @Override
    public List<CompletedTask> findByMark(double mark) {
        return null;
    }
}
