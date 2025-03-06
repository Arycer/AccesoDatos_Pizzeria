package me.arycer.dam.pizzeria.models;

import lombok.Getter;
import lombok.Setter;

/**
 * Clase intermedia que almacena el nombre de una pizza y su precio para guardarla en
 * la base de datos MongoDB
 */
@Setter
@Getter
public class PizzaPedido {
    // Getters y Setters
    private String nombre;
    private double precio;

    // Constructor vacío
    public PizzaPedido() {}

    // Constructor con parámetros
    public PizzaPedido(String nombre, double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}