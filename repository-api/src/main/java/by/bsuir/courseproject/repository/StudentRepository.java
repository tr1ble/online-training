package by.bsuir.courseproject.repository;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.entites.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {
    List<Student> findAll();
    Optional<Student> findByUser(User user);
    Optional<Student> findBySurnameAndFirstnameAndSecondname(String surname, String firstname, String secname);
    List<Student> findByCourse(Course course);
    int deleteByCourse(Course course);
}
