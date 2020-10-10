package by.bsuir.training.repository;


import by.bsuir.training.entites.Request;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends CrudRepository<Request, Integer> {
    List<Request> findAll();
    List<Request> findByUserLogin(String login);
}
