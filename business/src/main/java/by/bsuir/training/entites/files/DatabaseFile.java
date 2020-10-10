package by.bsuir.training.entites.files;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

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
    @JsonIgnore
    private byte[] data;
}
