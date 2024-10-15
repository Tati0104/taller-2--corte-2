class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

class CarritoDeCompras {
    constructor() {
        this.productosEnCarrito = []; // Array que contendrá los productos añadidos al carrito
    }

    // Método para agregar un producto al carrito
    agregarProducto(producto, cantidad) {
        // Verificar si el producto ya está en el carrito
        const productoExistente = this.productosEnCarrito.find(p => p.producto.nombre === producto.nombre);

        if (productoExistente) {
            // Si el producto ya está en el carrito, actualizamos la cantidad
            if (productoExistente.cantidad + cantidad <= producto.stock) {
                productoExistente.cantidad += cantidad;
                console.log(`${cantidad} unidad(es) de ${producto.nombre} agregadas. Total en el carrito: ${productoExistente.cantidad}`);
            } else {
                console.log(`No hay suficiente stock de ${producto.nombre}.`);
            }
        } else {
            // Si el producto no está en el carrito, lo añadimos
            if (cantidad <= producto.stock) {
                this.productosEnCarrito.push({ producto, cantidad });
                console.log(`${cantidad} unidad(es) de ${producto.nombre} agregadas al carrito.`);
            } else {
                console.log(`No hay suficiente stock de ${producto.nombre}.`);
            }
        }
    }

    // Método para mostrar los productos en el carrito
    mostrarCarrito() {
        if (this.productosEnCarrito.length === 0) {
            console.log('El carrito está vacío.');
        } else {
            console.log('Productos en el carrito:');
            this.productosEnCarrito.forEach(item => {
                const { producto, cantidad } = item;
                const subtotal = producto.precio * cantidad;
                console.log(`- ${producto.nombre}: ${cantidad} unidad(es) x $${producto.precio} = $${subtotal}`);
            });
        }
    }

    // Método para calcular y mostrar el total de la compra
    calcularTotal() {
        const total = this.productosEnCarrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
        console.log(`El total de la compra es: $${total}`);
        return total;
    }
}

// Crear algunos productos
const producto1 = new Producto('Laptop', 1500, 5);
const producto2 = new Producto('Teléfono', 800, 10);
const producto3 = new Producto('Auriculares', 200, 15);

// Crear una instancia del carrito de compras
const carrito = new CarritoDeCompras();

// Agregar productos al carrito
carrito.agregarProducto(producto1, 1); // Agregar 1 Laptop
carrito.agregarProducto(producto2, 2); // Agregar 2 Teléfonos
carrito.agregarProducto(producto3, 5); // Agregar 5 Auriculares

// Mostrar los productos en el carrito
carrito.mostrarCarrito();

// Calcular y mostrar el total de la compra
carrito.calcularTotal();