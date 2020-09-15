package by.bsuir.courseproject.entites;


import by.bsuir.courseproject.entites.files.DatabaseFile;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @OneToOne
    @JoinColumn(name="file_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DatabaseFile image;

    public User(String username) {
        this.login = username;
    }
}
