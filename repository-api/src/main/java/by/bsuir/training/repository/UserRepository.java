package by.bsuir.training.repository;


import by.bsuir.training.entites.Role;
import by.bsuir.training.entites.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findAll();
    Optional<User> findByLogin(String login);
    Optional<User> findByLoginAndPassword(String login, String password);
    List<User> findByRole(Role role);
    void removeByLogin(String login);
}
