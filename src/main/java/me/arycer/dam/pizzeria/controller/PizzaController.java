package me.arycer.dam.pizzeria.controller;

import me.arycer.dam.pizzeria.models.Pizza;
import me.arycer.dam.pizzeria.services.PizzaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pizzas")
public class PizzaController {
    private final PizzaService pizzaService;

    public PizzaController(PizzaService pizzaService) {
        this.pizzaService = pizzaService;
    }

    @GetMapping("/all")
    public List<Pizza> getAll() {
        return pizzaService.getAll();
    }

    @GetMapping("/available")
    @PreAuthorize("hasAuthority('ROLE_CLIENTE')")
    public List<Pizza> getAvailable() {
        return pizzaService.getAvailable();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pizza> getById(@PathVariable String id) {
        return pizzaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Pizza> add(@RequestBody Pizza pizza) {
        return ResponseEntity.ok(pizzaService.add(pizza));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Pizza> update(@PathVariable String id, @RequestBody Pizza pizza) {
        return ResponseEntity.ok(pizzaService.update(id, pizza));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        pizzaService.eliminarPizza(id);
        return ResponseEntity.noContent().build();
    }
}