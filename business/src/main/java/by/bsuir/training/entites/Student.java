package by.bsuir.training.entites;

import lombok.*;

import javax.persistence.*;


@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="student")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student extends Man implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_login")
    private User user;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    @Basic
    @Column(name="firstname", length = 45, nullable = false)
    private String firstname;
    @Basic
    @Column(name="surname", length = 45, nullable = false)
    private String surname;
    @Basic
    @Column(name="secondname", length = 45, nullable = true)
    private String secondname;


    @Override
    public Integer getId() {
        return id;
    }

}
