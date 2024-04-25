package com.example.oblig2;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OrderController {
    private final List<Order> orders = new ArrayList<>();

    @PostMapping("/saveOrder")
    public void saveOrder(Order order) {
        orders.add(order);
    }

    @GetMapping("/getOrders")
    public List<Order> getOrders() {
        return orders;
    }

    @DeleteMapping("/deleteOrders")
    public void deleteOrders() {
        orders.clear();
    }
}