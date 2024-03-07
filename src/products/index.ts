import express, { Request, Response } from 'express';
import ProductGetByIdAdapter from './adapter/productGetByIdAdapter';
import ProductCreateAdapter from './adapter/productCreateAdapter';

const router = express.Router();
const productGetByIdAdapter = new ProductGetByIdAdapter(); // Renombramos el adaptador para obtener por ID
const productCreateAdapter = new ProductCreateAdapter(); // Creamos una instancia del adaptador para crear productos

// Ruta para obtener un producto por su ID
router.get("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await productGetByIdAdapter.getProductById(productId); // Usamos el adaptador correcto
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

// Ruta para crear un nuevo producto
router.post("/create", async (req: Request, res: Response) => {
    try {
        const productData = req.body; // Suponiendo que los datos del producto están en el cuerpo de la solicitud
        const newProduct = await productCreateAdapter.createProduct(productData); // Llamamos al método correspondiente en el adaptador
        res.status(201).json(newProduct); // Devuelve el producto creado con el código de estado 201 (Created)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.' });
    }
});

export default router;

