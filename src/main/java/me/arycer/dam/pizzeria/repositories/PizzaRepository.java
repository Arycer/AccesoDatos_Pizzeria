package me.arycer.dam.pizzeria.repositories;

import me.arycer.dam.pizzeria.models.Pizza;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PizzaRepository extends MongoRepository<Pizza, String> {
    List<Pizza> findByDisponibleTrue();
}
