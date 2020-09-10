package by.bsuir.courseproject.entites.files;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class UploadFile {
    @NonNull
    private String fileName;
    @NonNull
    private String fileType;
    @NonNull
    private String fileDownloadUri;
    @NonNull
    private long size;
}
