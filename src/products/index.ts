import express from 'express';
import ProductAdapter from './adapter/productTypeAdapter';

const router = express.Router();
const productAdapter = new ProductAdapter();

// Ruta para obtener un producto por su ID
router.get("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await productAdapter.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

export default router;
