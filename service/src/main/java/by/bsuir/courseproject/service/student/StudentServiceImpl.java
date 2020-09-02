package by.bsuir.courseproject.service.student;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;


    public StudentServiceImpl() throws IllegalArgumentException {
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id)  {
        studentRepository.deleteById(id);
    }

    @Override
    public void update(Student student) {
        studentRepository.save(student);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Student add(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> findById(int id) {
        return studentRepository.findById(id);
    }

    @Override
    public List<Student> findByCourse(Course course) {
        return studentRepository.findByCourse(course);
    }

    @Override
    public Optional<Student> findCurrentStudentByUser(User user) throws IllegalArgumentException{
        return studentRepository.findByUser(user);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void removeByCourse(Course course) {
        studentRepository.deleteByCourse(course);
    }

    @Override
    public Optional<Student> findByFio(String surname, String firstname, String secname) {
        return studentRepository.findBySurnameAndFirstnameAndSecondname(surname, firstname, secname);
    }
}
