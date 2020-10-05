package by.bsuir.courseproject.service.request;

import by.bsuir.courseproject.entites.Request;
import by.bsuir.courseproject.service.Service;

import java.util.List;
import java.util.Optional;

public interface RequestService extends Service<Request> {
    List<Request> findByUserLogin(String login);
}
