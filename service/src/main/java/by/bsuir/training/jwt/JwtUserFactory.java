package by.bsuir.training.jwt;

import by.bsuir.training.entites.Role;
import by.bsuir.training.entites.User;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public final class JwtUserFactory {

    public JwtUserFactory() {

    }

    public static JwtUser create(User user) {
        return new JwtUser(user.getLogin(),
                            user.getPassword(),
                            toGrantedAuthorities(user.getRole()));
    }

    private static List<GrantedAuthority> toGrantedAuthorities(Role role) {
        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<>(1);
        grantedAuthorities.add(new SimpleGrantedAuthority(role.getValue()));
        return grantedAuthorities;
    }
}
