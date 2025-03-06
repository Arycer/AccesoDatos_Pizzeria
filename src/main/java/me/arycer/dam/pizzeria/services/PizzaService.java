package me.arycer.dam.pizzeria.services;


import me.arycer.dam.pizzeria.models.Pizza;
import me.arycer.dam.pizzeria.repositories.PizzaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PizzaService {
    private final PizzaRepository pizzaRepository;

    public PizzaService(PizzaRepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    public List<Pizza> getAll() {
        return pizzaRepository.findAll();
    }

    public List<Pizza> getAvailable() {
        return pizzaRepository.findByDisponibleTrue();
    }

    public Optional<Pizza> getById(String id) {
        return pizzaRepository.findById(id);
    }

    public Pizza add(Pizza pizza) {
        return pizzaRepository.save(pizza);
    }

    public Pizza update(String id, Pizza pizzaActualizada) {
        Optional<Pizza> optionalPizza = pizzaRepository.findById(id);

        if (optionalPizza.isPresent()) {
            Pizza pizza = optionalPizza.get();
            pizza.setNombre(pizzaActualizada.getNombre());
            pizza.setDescripcion(pizzaActualizada.getDescripcion());
            pizza.setPrecio(pizzaActualizada.getPrecio());
            pizza.setIngredientes(pizzaActualizada.getIngredientes());
            pizza.setDisponible(pizzaActualizada.isDisponible());
            pizza.setImagenUrl(pizzaActualizada.getImagenUrl());

            return pizzaRepository.save(pizza);

        } else {
            throw new RuntimeException("Pizza no encontrada");
        }
    }

    public void eliminarPizza(String id) {
        pizzaRepository.deleteById(id);
    }
}