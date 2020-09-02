package by.bsuir.courseproject.controller.admin;

import by.bsuir.courseproject.Application;
import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Role;
import by.bsuir.courseproject.entites.Trainer;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.course.CourseService;
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

@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class AdminDeleteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean(name = "courseServiceImpl")
    private CourseService courseService;

    private String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

    @Test
    public void deleteCourseShouldBeStatus200() throws Exception {
        String ID = "2";
        String uri = "/courses/" + ID;
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(content, ID);
    }
}
