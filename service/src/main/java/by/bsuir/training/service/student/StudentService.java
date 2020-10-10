package by.bsuir.training.service.student;

import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Student;
import by.bsuir.training.entites.User;
import by.bsuir.training.service.Service;
import java.util.*;

import java.util.Optional;

public interface StudentService extends Service<Student> {
    Optional<Student> findById(int id);
    List<Student> findByCourse(Course course);
    Optional<Student> findCurrentStudentByUser(User user);
    void removeByCourse(Course course);
    Optional<Student> findByFio(String surname, String firstname, String secname);
}
