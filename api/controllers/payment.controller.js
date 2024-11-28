import mercadopago from 'mercadopago'

export const createOrder = async (req,res) => {
    
    mercadopago.configure({
        access_token: "APP_USR-7450350696113745-112621-916b77e1431131ade6c143d514983e28-2118704325",
    });
    
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "laptop lenovo",
                unit_price: 500,
                currency_id: "PEN",
                quantity: 1,
            }
        ],
        back_urls: {
            success: "/success",
            failure: "/failure",
            pending: "/pending",
        },
        notification_url: "/webhook"
    })

    console.log(result)
    
    res.send(result.body);
};

export const reciveWebhook = async (req,res) => {
const payment = req.query

try {

    if (payment.type == 'payment') {
        const data = await mercadopago.payment.findById(payment['data.id']);
        console.log(data);
        //store in database
    }
    
    res.sendStatus(204);
} catch (error) {
    console.log(error);
    return res.sendStatus(500 ).json({error: error.message});
}


    

}