package by.bsuir.courseproject.service.student;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.Service;
import java.util.*;

import java.util.Optional;

public interface StudentService extends Service<Student> {
    Optional<Student> findById(int id);
    List<Student> findByCourse(Course course);
    Optional<Student> findCurrentStudentByUser(User user);
    void removeByCourse(Course course);
    Optional<Student> findByFio(String surname, String firstname, String secname);
}
