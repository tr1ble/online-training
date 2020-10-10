package by.bsuir.training.service.trainer;

import by.bsuir.training.entites.Trainer;
import by.bsuir.training.entites.User;
import by.bsuir.training.service.Service;

import java.util.List;
import java.util.Optional;

public interface TrainerService extends Service<Trainer> {
    Optional<Trainer> getById(int id);
    void changeBusy(int id, boolean isBusy);
    Optional<Trainer> findByUser(User user);
    Optional<Trainer> findByFio(String surname, String firstname, String secname);
    List<Trainer> findByBusy(boolean busy);
}
