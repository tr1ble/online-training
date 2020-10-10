package by.bsuir.training.authentication;

import by.bsuir.training.entites.User;
import by.bsuir.training.jwt.JwtTokenProvider;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationService {
    private static final String LOGIN = "login";
    private static final String TOKEN = "token";
    private static final String ROLE = "role";
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Autowired
    public AuthenticationService (AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    public ResponseEntity<Map<Object, Object>> toAuthenticate(@RequestBody AuthenticationRequestDto authenticationRequestDto) {
        try {
            String login = authenticationRequestDto.getLogin();
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
