package by.bsuir.training.repository;


import by.bsuir.training.entites.Trainer;
import by.bsuir.training.entites.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainerRepository extends CrudRepository<Trainer, Integer> {
    List<Trainer> findAll();
    List<Trainer> findByBusy(boolean busy);
    Optional<Trainer> findBySurnameAndFirstnameAndSecondname(String surname, String firstname, String secname);
    Optional<Trainer> findByUser(User user);
}
