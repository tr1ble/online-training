package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;


@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "trainer")
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Setter
public class Trainer extends Man implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  int id;


    @Basic
    @Column(name="firstname", length = 45, nullable = false)
    private String firstname;

    @Basic
    @Column(name="surname", length = 45, nullable = false)
    private String surname;
    
    @Basic
    @Column(name="secondname", length = 45, nullable = true)
    private String secondname;

    @Basic
    @Column(name="busy", nullable = false)
    @Setter
    private boolean busy;

    @Basic
    @ManyToOne
    @JoinColumn(name = "login", nullable = false, unique = true)
    @NonNull
    private User user;

    public Trainer(int id) {
        this.id=id;
    }


    @Override
    public Integer getId() {
        return id;
    }


}
