package by.bsuir.courseproject.entites;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Man {

    @Basic
    @Column(name="firstname", length = 45, nullable = false)
    private String firstname;
    @Basic
    @Column(name="surname", length = 45, nullable = false)
    private String surname;
    @Basic
    @Column(name="secondname", length = 45, nullable = true)
    private String secondname;


}
