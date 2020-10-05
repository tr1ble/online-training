package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="request")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RequiredArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Request implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name="request_type")
    @Enumerated(EnumType.STRING)
    private RequestType requestType;


    @ManyToOne
    @JoinColumn(name="user_login")
    private User user;


    @Basic
    @Column(name="value", nullable = false, length = 45)
    @NonNull
    private String value;


    @Override
    public Integer getId() {
        return id;
    }


}
