package by.bsuir.training.service.request;

import by.bsuir.training.entites.Request;
import by.bsuir.training.service.Service;

import java.util.List;

public interface RequestService extends Service<Request> {
    List<Request> findByUserLogin(String login);
}
