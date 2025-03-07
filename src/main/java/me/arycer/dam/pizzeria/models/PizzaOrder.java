package me.arycer.dam.pizzeria.models;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PizzaOrder {
    private String nombre;
    private double precio;

    public PizzaOrder() {
    }

    public PizzaOrder(String nombre, double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}