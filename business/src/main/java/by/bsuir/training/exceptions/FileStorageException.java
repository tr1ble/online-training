package by.bsuir.training.exceptions;

import java.io.IOException;

public class FileStorageException extends IOException {
    public FileStorageException() { super("Error occurred while storing file!"); }
    public FileStorageException(String message) { super(message);}
    public FileStorageException(String message, Throwable cause) { super(message, cause); }
    public FileStorageException(Throwable cause) { super(cause); }
}