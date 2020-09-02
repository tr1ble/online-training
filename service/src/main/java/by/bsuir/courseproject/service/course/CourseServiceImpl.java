package by.bsuir.courseproject.service.course;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Trainer;
import by.bsuir.courseproject.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public CourseServiceImpl() {
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Course add(Course course)  {
        return courseRepository.save(course);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id) {
        courseRepository.deleteById(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void update(Course course) {
        courseRepository.save(course);
    }

    @Override
    public Optional<Course> findById(int id)  {
        return courseRepository.findById(id);
    }

    @Override
    public List<Course> findByTrainer(Trainer trainer) {
        return courseRepository.findByTrainer(trainer);
    }


}
