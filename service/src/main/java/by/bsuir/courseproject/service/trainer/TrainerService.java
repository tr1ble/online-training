package by.bsuir.courseproject.service.trainer;

import by.bsuir.courseproject.entites.Trainer;
import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.service.Service;

import java.util.List;
import java.util.Optional;

public interface TrainerService extends Service<Trainer> {
    Optional<Trainer> getById(int id);
    void changeBusy(int id, boolean isBusy);
    Optional<Trainer> findByUser(User user);
    Optional<Trainer> findByFio(String surname, String firstname, String secname);
    List<Trainer> findByBusy(boolean busy);
}
