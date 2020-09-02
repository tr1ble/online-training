package by.bsuir.courseproject.service;

import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.completedtask.CompletedTaskServiceImpl;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.course.CourseServiceImpl;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.student.StudentServiceImpl;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.task.TaskServiceImpl;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.trainer.TrainerServiceImpl;
import by.bsuir.courseproject.service.user.UserService;
import by.bsuir.courseproject.service.user.UserServiceImpl;
import org.springframework.context.annotation.*;

@Configuration
public class ServiceConfig {

        @Bean
        public UserService userService() {
                return new UserServiceImpl();
        }

        @Bean
        public TrainerService trainerService() {
                return new TrainerServiceImpl();
        }

        @Bean
        public CourseService courseService() {
                return new CourseServiceImpl();
        }

        @Bean
        public StudentService studentService() {
                return new StudentServiceImpl();
        }

        @Bean
        public CompletedTaskService completedTaskService() {
                return new CompletedTaskServiceImpl();
        }

        @Bean
        public TaskService taskService() throws IllegalArgumentException {
                return new TaskServiceImpl();
        }

}