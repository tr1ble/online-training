package by.bsuir.training.repository;

import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Student;
import by.bsuir.training.entites.User;
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
