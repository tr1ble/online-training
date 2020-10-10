package by.bsuir.training.service.trainer;

import by.bsuir.training.entites.Trainer;
import by.bsuir.training.entites.User;
import by.bsuir.training.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    public TrainerServiceImpl() throws IllegalArgumentException {
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Trainer> getAll() {
        return trainerRepository.findAll();
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Trainer add(Trainer trainer) {
        trainer.setBusy(false);
        return trainerRepository.save(trainer);
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id) {
        trainerRepository.deleteById(id);
    }

    @Override
    public Optional<Trainer> getById(int id) {
        return trainerRepository.findById(id);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void changeBusy(int id, boolean isBusy) {
        Optional<Trainer> trainerByID = getById(id);
        Trainer trainer;
        if(trainerByID.isPresent()) {
            trainer= trainerByID.get();
            trainer.setBusy(isBusy);
            trainerRepository.save(trainer);
        }
    }

    @Override
    public Optional<Trainer> findByUser(User user) throws IllegalArgumentException {
        return trainerRepository.findByUser(user);
    }

    @Override
    public Optional<Trainer> findByFio(String surname, String firstname, String secname) {
        return trainerRepository.findBySurnameAndFirstnameAndSecondname(surname, firstname, secname);
    }

    @Override
    public List<Trainer> findByBusy(boolean busy) {
        return trainerRepository.findByBusy(busy);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void update(Trainer trainer) {
        trainerRepository.save(trainer);
    }
}
