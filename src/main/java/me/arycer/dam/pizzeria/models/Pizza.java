package me.arycer.dam.pizzeria.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@Document(collection = "pizzas")
public class Pizza {
    @Id
    private String id;
    private String nombre;
    private String descripcion;
    private List<String> ingredientes;
    private double precio;
    private String imagenUrl;
    private boolean disponible;

    public Pizza(String id, String nombre, String descripcion, List<String> ingredientes, double precio, String imagenUrl, boolean disponible) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
        this.disponible = disponible;
    }
}