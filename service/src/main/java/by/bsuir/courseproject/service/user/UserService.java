package by.bsuir.courseproject.service.user;

import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.Service;

import java.util.List;
import java.util.Optional;

public interface UserService extends Service<User> {
    Optional<User> login(String login, String password);
    Optional<User> getUserByLogin(String username);
    List<User> findByRole(String role);
    void removeByLogin(String login);
}
