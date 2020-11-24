package by.bsuir.training.entites;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="task")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RequiredArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Task implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Basic
    @Column(name="title", nullable = false, length = 45)
    @NonNull
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @NonNull
    private Course course;

    @Basic
    @Column(name="description", nullable = false, length = 200)
    @NonNull
    private String description;


    @Override
    public Integer getId() {
        return id;
    }


}
