const express = require('express');
const router = express.Router();

// Mock database (replace this with actual database calls)
let designs = [];

// GET all designs
router.get('/', (req, res) => {
    res.json(designs);
});

// GET design by id
router.get('/:id', (req, res) => {
    const design = designs.find(d => d.id === parseInt(req.params.id));
    if (!design) return res.status(404).send('Design not found');
    res.json(design);
});

// POST create a new design
router.post('/', (req, res) => {
    const design = {
        id: designs.length + 1,
        name: req.body.name,
        description: req.body.description,
    };
    designs.push(design);
    res.status(201).json(design);
});

// PUT update an existing design
router.put('/:id', (req, res) => {
    const design = designs.find(d => d.id === parseInt(req.params.id));
    if (!design) return res.status(404).send('Design not found');

    design.name = req.body.name;
    design.description = req.body.description;
    res.json(design);
});

// DELETE a design
router.delete('/:id', (req, res) => {
    const designIndex = designs.findIndex(d => d.id === parseInt(req.params.id));
    if (designIndex === -1) return res.status(404).send('Design not found');

    const deletedDesign = designs.splice(designIndex, 1);
    res.json(deletedDesign);
});

module.exports = router;