package by.bsuir.courseproject.entites;

import by.bsuir.courseproject.entites.files.DatabaseFile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.*;
import java.util.Date;


@Entity
@Table(name="courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Builder
public class Course implements Identifable {

    @Id
    @Basic
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private int id;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    @NonNull
    private Trainer trainer;

    @Basic
    @Column(name = "title", length = 45, nullable = false)
    @NonNull
    private String title;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    @NonNull
    private Date startDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    @NonNull
    private Date endDate;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Student> studentList;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Task> taskList;

    @OneToOne
    @JoinColumn(name="file_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DatabaseFile image;

    @Override
    public Integer getId() {
        return id;
    }

}

