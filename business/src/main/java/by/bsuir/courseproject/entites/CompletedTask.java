package by.bsuir.courseproject.entites;

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
public class CompletedTask extends Task {


   @Basic
   @Column(name="mark", nullable = false)
   @Min(0)
   @Max(10)
   private double mark;

   @Basic
   @Column(name="feedback", nullable = false)
   private String feedback;

   @ManyToOne
   @JoinColumn(name="student_id")
   @OnDelete(action = OnDeleteAction.CASCADE)
   private Student student;

}
