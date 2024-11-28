import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';

const app = express();
const router = express.Router();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Definir la ruta de registro correctamente
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(200).send('Usuario registrado correctamente');
    } catch (error) {
        res.status(500).send('Error al registrar al usuario');
    }
});


router.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).send('Error al autenticar usuario');
        } else if (!user) {
            res.status(200).send('El usuario no existe');
        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('Error al autenticar');
                } else if (result) {
                    res.status(200).send('Usuario autenticado correctamente');
                } else {
                    res.status(401).send('Usuario y/o contraseña incorrecta');
                }
            });
        }
    });
});

export default router;
