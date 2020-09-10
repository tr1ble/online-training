package by.bsuir.courseproject.entites;

public enum Role {
    ROLE_ADMINISTRATOR("ROLE_ADMINISTRATOR"),
    ROLE_STUDENT("ROLE_STUDENT"),
    ROLE_TRAINER("ROLE_TRAINER"),
    ROLE_DEFAULT("ROLE_DEFAULT");
    String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
