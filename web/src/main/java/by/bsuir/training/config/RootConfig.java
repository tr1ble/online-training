package by.bsuir.training.config;

import org.springframework.context.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan(basePackages = {"by.bsuir.training"}, excludeFilters={
                @ComponentScan.Filter(type= FilterType.ANNOTATION, value= EnableWebMvc.class)
        })
public class RootConfig {

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}