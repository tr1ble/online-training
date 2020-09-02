package by.bsuir.courseproject.config.security;

import lombok.Data;

@Data
public class AuthenticationRequestDto {
    private String login;
    private String password;
}
