package me.arycer.dam.pizzeria.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Data
@NoArgsConstructor
@Document(collection = "pedidos")
public class Order {

    @Id
    private String id;
    private String clienteUsername;
    private List<PizzaOrder> pizzas;
    private double total;

    private Date fecha;
    private String estado;

    public Order(String clienteId, List<PizzaOrder> pizzas, String estado) {
        this.clienteUsername = clienteId;
        this.pizzas = pizzas;
        this.total = pizzas.stream().mapToDouble(PizzaOrder::getPrecio).sum();
        this.fecha = new Date();
        this.estado = estado;
    }
}