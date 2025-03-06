package me.arycer.dam.pizzeria.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

/**
 * Representa un pedido en la base de datos MongoDB
 */
@Setter
@Getter
@Data
@NoArgsConstructor
@Document(collection = "pedidos")
public class Pedido {

    @Id
    private String id;
    private String clienteUsername;
    private List<PizzaPedido> pizzas;
    private double total;

    private Date fecha;
    private String estado;

    // Constructor con parámetros
    public Pedido(String clienteId, List<PizzaPedido> pizzas, String estado) {
        this.clienteUsername = clienteId;
        this.pizzas = pizzas;
        this.total = pizzas.stream().mapToDouble(PizzaPedido::getPrecio).sum(); // cálculo automático del total
        this.fecha = new Date();
        this.estado = estado;
    }

}