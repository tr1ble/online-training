package by.bsuir.training.service.user;

import by.bsuir.training.entites.User;
import by.bsuir.training.service.Service;

import java.util.List;
import java.util.Optional;

public interface UserService extends Service<User> {
    Optional<User> login(String login, String password);
    Optional<User> getUserByLogin(String username);
    List<User> findByRole(String role);
    void removeByLogin(String login);
}
