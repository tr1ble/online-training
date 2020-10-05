package by.bsuir.courseproject.service.request;


import by.bsuir.courseproject.entites.Request;
import by.bsuir.courseproject.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Transactional(readOnly = false)
@Service
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;


    @Autowired
    public RequestServiceImpl(RequestRepository requestRepository) throws IllegalArgumentException {
        this.requestRepository = requestRepository;
    }


    @Override
    public Request add(Request request) {
        return requestRepository.save(request);
    }

    @Override
    public void remove(int id) {
        requestRepository.deleteById(id);
    }

    @Override
    public void update(Request request) {
        requestRepository.save(request);
    }


    @Override
    public List<Request> getAll() {
        return requestRepository.findAll();
    }

    @Override
    public List<Request> findByUserLogin(String login) {
        return requestRepository.findByUserLogin(login);
    }
}
