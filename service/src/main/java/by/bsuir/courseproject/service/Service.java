package by.bsuir.courseproject.service;

import by.bsuir.courseproject.entites.Course;

import java.util.List;

public interface Service<T> {
    T add(T o);
    void remove(int id);
    void update(T o);
    List<T> getAll();
}
