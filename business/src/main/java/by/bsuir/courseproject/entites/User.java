package by.bsuir.courseproject.entites;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class User {

    @Basic
    @Id
    @Column(name="login", nullable = false, length = 45, unique = true)
    private String login;

    @Basic
    @Column(name="password", nullable = false, length = 200)
    private String password;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String username) {
        this.login = username;
    }
}
