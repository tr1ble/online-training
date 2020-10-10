package by.bsuir.training.config.security;

import by.bsuir.training.jwt.JwtUserFactory;
import by.bsuir.training.entites.User;
import by.bsuir.training.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service(value = "userDetailsService")
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> userOptional = userService.getUserByLogin(login);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            return JwtUserFactory.create(user);
        } else {
            throw new UsernameNotFoundException("User with username: " + login + " not found");
        }
    }
}
