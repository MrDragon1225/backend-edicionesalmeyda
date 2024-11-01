const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const orderRoutes = require('./routes/order');
const productoRoutes = require('./routes/productos');

// Configuración de CORS para permitir cookies
app.use(cors({
    credentials: true
}));
app.use(express.json());

// Usar Ruta de Productos
app.use('/api/productos', productoRoutes);

// Usar Ruta de Órdenes
app.use('/api/orders', orderRoutes);


// Conexión a MongoDB
mongoose.connect('mongodb+srv://jose-new:WPXAbwRWYCEUZKUJ@cluster0.2jkla.mongodb.net/edicionesalmeyda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.log("Error al conectar a MongoDB:", error));


// Configuración del servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
