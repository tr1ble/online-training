package by.bsuir.training.authentication;

import lombok.Data;

@Data
public class AuthenticationRequestDto {
    private String login;
    private String password;
}
