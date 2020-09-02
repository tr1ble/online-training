package by.bsuir.courseproject.exceptions;

import java.io.IOException;

public class RepositoryException extends IOException {
    public RepositoryException() { super("Exception in repository"); }
    public RepositoryException(String message) { super(message);}
    public RepositoryException(String message, Throwable cause) { super(message, cause); }
    public RepositoryException(Throwable cause) { super(cause); }
}
