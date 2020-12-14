package by.bsuir.training.entites;

import by.bsuir.training.entites.files.DatabaseFile;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Data
@Table(name="completed_task")
@AllArgsConstructor
@NoArgsConstructor
public class CompletedTask {

   @Id
   @Basic
   @Column(name="id", nullable = false)
   @GeneratedValue(strategy= GenerationType.IDENTITY)
   private int id;

   @Basic
   @Column(name="mark")
   @Min(0)
   @Max(10)
   private double mark;

   @Basic
   @Column(name="feedback")
   private String feedback;

   @ManyToOne
   @JoinColumn(name="student_id")
   @OnDelete(action = OnDeleteAction.CASCADE)
   private Student student;

   @OneToOne
   @JoinColumn(name="file_id")
   @OnDelete(action = OnDeleteAction.CASCADE)
   private DatabaseFile file;

   @ManyToOne
   @JoinColumn(name="task_id")
   @OnDelete(action = OnDeleteAction.CASCADE)
   private Task task;
}

