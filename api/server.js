
import { connect } from 'mongoose';
import express, { json } from 'express';
import cors from 'cors';
const app = express();
import paymentRoutes from './routes/payment.js';
import productoRoutes from './routes/productos.js';
import userRoutes from './routes/usuarios.js';
import morgan from 'morgan';
import dotenv from "dotenv";
import path from 'path';
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

//middleware
app.use(json());

// Configuración de CORS para permitir cookies
app.use(cors({
    origin: '*', // Permite todas las conexiones (no recomendado en producción)
    credentials: true,
}));

app.use(morgan('dev'));

//utilizando import de las rutas
app.use(paymentRoutes);
app.use(productoRoutes);
app.use('/api/users', userRoutes);


// Conexión a MongoDB
connect('mongodb+srv://jose-new:WPXAbwRWYCEUZKUJ@cluster0.2jkla.mongodb.net/edicionesalmeyda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.log("Error al conectar a MongoDB:", error));


// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
