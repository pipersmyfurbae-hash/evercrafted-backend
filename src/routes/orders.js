'use strict';

const express = require('express');
const router = express.Router();

let orders = [];

// Create a new order
router.post('/', (req, res) => {
    const order = req.body;
    order.id = orders.length + 1; // Simple ID assignment
    orders.push(order);
    res.status(201).json(order);
});

// Retrieve all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// Retrieve a specific order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

// Update an order status
router.put('/:id/status', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    order.status = req.body.status;
    res.json(order);
});

module.exports = router;
