export default interface Product {
    nombre: string;
    descripcion?: string; // El signo de interrogación indica que este campo es opcional
    precio: number;
    reference: string,
    quantity: number,
    imagenes?: string,
    isActive: number;
}