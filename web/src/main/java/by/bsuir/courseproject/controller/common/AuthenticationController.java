package by.bsuir.courseproject.controller.common;

import by.bsuir.courseproject.config.security.AuthenticationRequestDto;
import by.bsuir.courseproject.config.security.jwt.JwtTokenProvider;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthenticationController {

    private static final String LOGIN = "login";
    private static final String TOKEN = "token";
    private static final String ROLE = "role";
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody AuthenticationRequestDto authenticationRequestDto) {
        try {
            String login = authenticationRequestDto.getLogin();
            System.out.println(passwordEncoder.encode(authenticationRequestDto.getPassword()));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, authenticationRequestDto.getPassword()));
            Optional<User> user = userService.getUserByLogin(login);
            if(!user.isPresent()) {
                throw new UsernameNotFoundException("User with username: " + login + " not found");
            }
            String token = jwtTokenProvider.newToken(login, user.get().getRole());
            Map<Object, Object> response = new HashMap<>();
            response.put(LOGIN, login);
            response.put(TOKEN, token);
            response.put(ROLE, user.get().getRole());
            return ResponseEntity.ok(response);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid password");
        }
    }
}
