package by.bsuir.training.controller.admin;

import by.bsuir.training.Application;
import by.bsuir.training.entites.Course;
import by.bsuir.training.entites.Role;
import by.bsuir.training.entites.Trainer;
import by.bsuir.training.entites.User;
import by.bsuir.training.service.course.CourseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class AdminAddControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean(name = "courseServiceImpl")
    private CourseService courseService;

    private String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

    @Test
    public void addCourseTestShouldBeStatus200AndReturnCourseAsJson() throws Exception {
        String uri = "/course";

        Course course=new Course(1, new Trainer(new User("trainer", "trainer", Role.valueOf("ROLE_TRAINER"))), "description", new Date(), new Date());

        String inputJson = new ObjectMapper().writeValueAsString(course);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(content, inputJson);
    }
}
