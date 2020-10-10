package by.bsuir.training.exceptions;

import java.io.IOException;

public class FileIsEmptyException extends IOException {
    public FileIsEmptyException() { super("File is empty!"); }
    public FileIsEmptyException(String message) { super(message);}
    public FileIsEmptyException(String message, Throwable cause) { super(message, cause); }
    public FileIsEmptyException(Throwable cause) { super(cause); }
}