package by.bsuir.courseproject.entites;


import by.bsuir.courseproject.entites.files.DatabaseFile;
import by.bsuir.courseproject.entites.files.UploadFile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.dialect.Database;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@RequiredArgsConstructor
public class User {

    @Basic
    @Id
    @Column(name="login", nullable = false, length = 45, unique = true)
    @NonNull
    private String login;

    @Basic
    @Column(name="password", nullable = false, length = 200)
    @NonNull
    private String password;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    @NonNull
    private Role role;

    @Basic
    @Column(name="email", nullable = false, length = 200)
    @Email
    private String email;

    @OneToOne
    @JoinColumn(name="file_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private DatabaseFile image;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Request> requestList;

    public User(String username) {
        this.login = username;
    }
}
