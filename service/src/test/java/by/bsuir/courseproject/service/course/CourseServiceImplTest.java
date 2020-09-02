package by.bsuir.courseproject.service.course;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Trainer;
import by.bsuir.courseproject.repository.CourseRepository;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

class CourseServiceImplTest {

    @Mock
    private CourseRepository courseRepository;
    @InjectMocks
    private CourseServiceImpl courseService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllCoursesTest() {
        List<Course> expectedCoursesList = new ArrayList<>(4);

        Trainer trainer = Mockito.mock(Trainer.class);
        Date date = Mockito.mock(Date.class);
        Course courseOne = new Course(1, trainer, "one", date, date);
        Course courseTwo = new Course(2, trainer, "two", date, date);
        Course courseThree = new Course(3, trainer, "three", date, date);
        Course courseFour = new Course(4, trainer, "four", date, date);

        expectedCoursesList.add(courseOne);
        expectedCoursesList.add(courseTwo);
        expectedCoursesList.add(courseThree);
        expectedCoursesList.add(courseFour);

        Mockito.when(courseRepository.findAll()).thenReturn(expectedCoursesList);

        List<Course> actualCoursesList = courseService.getAll();

        Assert.assertArrayEquals(expectedCoursesList.toArray(), actualCoursesList.toArray());
        Mockito.verify(courseRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void addCoursesTest() {
        Trainer trainer = Mockito.mock(Trainer.class);

        Date date = Mockito.mock(Date.class);
        Course courseOne = new Course(1, trainer, "one", date, date);
        Course courseTwo = new Course(2, trainer, "two", date, date);

        courseService.add(courseOne);
        courseService.add(courseTwo);


        Mockito.verify(courseRepository, Mockito.times(1)).save(courseOne);
        Mockito.verify(courseRepository, Mockito.times(1)).save(courseTwo);
    }

    @Test
    public void findCourseByIdTest() throws ParseException {

        Date startDate = new SimpleDateFormat("dd-MM-yyyy").parse("11-11-2019");
        Date endDate = new SimpleDateFormat("dd-MM-yyyy").parse("01-01-2020");
        int expectedTrainerId = 11;
        String expectedTitle = "one";

        Course exptectedCourse = new Course(1, new Trainer(expectedTrainerId), expectedTitle, startDate, endDate);

        Mockito.when(courseRepository.findById(1)).thenReturn(Optional.of(exptectedCourse));

        Course actualCourse = courseService.findById(1).get();

        Assert.assertEquals(exptectedCourse, actualCourse);
        Mockito.verify(courseRepository, Mockito.times(1)).findById(1);
    }


    @Test
    public void removeCourseTest() {
        courseService.remove(1);
        Mockito.verify(courseRepository, Mockito.times(1)).deleteById(1);
    }

    @Test
    public void updateCourseTest() {
        Trainer trainer = Mockito.mock(Trainer.class);
        Date date = Mockito.mock(Date.class);
        Course course = new Course(1, trainer, "one", date, date);
        courseService.update(course);
        Mockito.verify(courseRepository, Mockito.times(1)).save(course);
    }

}
