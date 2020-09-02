package by.bsuir.courseproject.repository;


import by.bsuir.courseproject.entites.CompletedTask;
import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Scope
public interface CompletedTaskRepository extends CrudRepository<CompletedTask, Integer> {
    List<CompletedTask> findByCourse(Course course);
    List<CompletedTask> findAll();
    List<CompletedTask> findByStudent(Student student);
    List<CompletedTask> findByMark(double mark);
}
