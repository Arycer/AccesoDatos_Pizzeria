package me.arycer.dam.pizzeria.services;

import me.arycer.dam.pizzeria.models.Order;
import me.arycer.dam.pizzeria.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> getById(String id) {
        return orderRepository.findById(id);
    }

    public List<Order> getClientOrders(String clienteUsername) {
        return orderRepository.getUserOrders(clienteUsername);
    }

    public Order actualizarPedido(String id, Order order) {
        order.setId(id);
        return orderRepository.save(order);
    }

    public void eliminarPedido(String id) {
        orderRepository.deleteById(id);
    }
}