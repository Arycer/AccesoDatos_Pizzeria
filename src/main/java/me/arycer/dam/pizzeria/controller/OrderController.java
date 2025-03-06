package me.arycer.dam.pizzeria.controller;

import me.arycer.dam.pizzeria.models.Order;
import me.arycer.dam.pizzeria.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders/")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_CLIENTE')")
    public ResponseEntity<Order> createOrder(@RequestBody Order order, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        order.setClienteUsername(username);

        Order newOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(newOrder);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Order>> getAll() {
        List<Order> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/me")
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<Order> orders = orderService.getClientOrders(username);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_CLIENTE', 'ROLE_ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Optional<Order> pedido = orderService.getById(id);
        return pedido.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody Order order) {
        Optional<Order> pedidoExistente = orderService.getById(id);

        if (pedidoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Order updated = pedidoExistente.get();
        updated.setEstado(order.getEstado());

        Order orderGuardado = orderService.saveOrder(updated);
        return ResponseEntity.ok(orderGuardado);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.eliminarPedido(id);
        return ResponseEntity.noContent().build();
    }
}