package by.bsuir.training.service.user;


import by.bsuir.training.entites.Role;
import by.bsuir.training.entites.User;
import by.bsuir.training.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Transactional(readOnly = false)
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) throws IllegalArgumentException {
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Optional<User> login(String login, String password) {
        return userRepository.findByLoginAndPassword(login, password);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Optional<User> getUserByLogin(String username) {
        return userRepository.findByLogin(username);
    }

    @Override
    public List<User> findByRole(String role) {
        return userRepository.findByRole(Role.valueOf(role));
    }

    @Override
    public void removeByLogin(String login) {
        userRepository.removeByLogin(login);
    }

    @Override
    public User add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void remove(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public void update(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user);
        userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

}
