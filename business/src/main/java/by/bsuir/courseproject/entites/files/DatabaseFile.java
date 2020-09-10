package by.bsuir.courseproject.entites.files;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "files")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class DatabaseFile {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @NonNull
    private String fileName;

    @NonNull
    private String fileType;

    @Lob
    @NonNull
    private byte[] data;
}
