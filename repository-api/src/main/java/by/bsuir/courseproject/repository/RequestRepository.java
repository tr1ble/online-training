package by.bsuir.courseproject.repository;


import by.bsuir.courseproject.entites.Request;
import by.bsuir.courseproject.entites.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends CrudRepository<Request, Integer> {
    List<Request> findAll();
    List<Request> findByUserLogin(String login);
}
