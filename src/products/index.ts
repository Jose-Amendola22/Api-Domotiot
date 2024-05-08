import express, { Request, Response } from 'express';
import ProductGetByIdAdapter from './adapter/productGetByIdAdapter';
import ProductCreateAdapter from './adapter/productCreateAdapter';
import ProductUpdateAdapter from './adapter/productUpdateAdapter';
import ProductDeleteAdapter from './adapter/productDeleteAdapter';
import ProductsGetAllAdapter from './adapter/productsGetAllAdapter';

const router = express.Router();
const productGetByIdAdapter = new ProductGetByIdAdapter(); // Renombramos el adaptador para obtener por ID
const productCreateAdapter = new ProductCreateAdapter(); // Creamos una instancia del adaptador para crear productos
const productUpdateAdapter = new ProductUpdateAdapter();
const productDeleteAdapter = new ProductDeleteAdapter();
const productsGetAllAdapter = new ProductsGetAllAdapter();


// Ruta para obtener un producto por su ID
router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productGetByIdAdapter.getProductById(productId); // Usamos el adaptador correcto
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

router.get("/", async (_req: Request, res: Response) => { // Cambia req por _req si no lo estás utilizando
    try {
        const products = await productsGetAllAdapter.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});
// Ruta para crear un nuevo producto
router.post("/create", async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const newProduct = await productCreateAdapter.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.' });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const productReference = req.params.id;
    const updatedData = req.body;
    try {
        console.log("FIRST REF::  ", req.params.id);
        const updatedProduct = await productUpdateAdapter.updateProduct(productReference, updatedData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'El producto no pudo ser actualizado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        console.log("Holi", productId);
        await productDeleteAdapter.deleteProduct(productId);
        res.status(204).json({ message: 'Producto eliminado correctamente' }); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar el producto.' });
    }
});

export default router;

