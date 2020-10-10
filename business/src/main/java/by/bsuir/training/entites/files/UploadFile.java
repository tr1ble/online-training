package by.bsuir.training.entites.files;

import lombok.*;

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
