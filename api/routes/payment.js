import { Router } from 'express';
const router = Router();
import { createOrder, reciveWebhook } from '../controllers/payment.controller.js';

router.post('/create-order', createOrder);

router.get('/success', (req,res) => res.send('success'));
router.get('/failure', (req,res) => res.send('failure'));
router.get('/pending', (req,res) => res.send('pending'));

router.post('/webhook', reciveWebhook);

export default router;