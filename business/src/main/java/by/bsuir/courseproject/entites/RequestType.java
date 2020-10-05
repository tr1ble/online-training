package by.bsuir.courseproject.entites;

public enum RequestType {
    LOGIN("LOGIN"),
    ROLE("ROLE");

    String value;

    RequestType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
