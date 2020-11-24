package by.bsuir.training;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.Arrays;


@SpringBootApplication
@EntityScan(basePackages = "by.bsuir.training.**")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}