package by.bsuir.courseproject;

import by.bsuir.courseproject.controller.GlobalExceptionHandler;
import by.bsuir.courseproject.controller.admin.AdminAddController;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = Application.class)
@RunWith(SpringRunner.class)
public class ContextTest {

    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;

    @Test
    public void contextLoads() throws Exception {
        Assertions.assertThat(globalExceptionHandler).isNotNull();
    }
}