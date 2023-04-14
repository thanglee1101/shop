const paypal = require('paypal-rest-sdk');
const Payment = require('../model/payments')


paypal.configure({
    'mode': 'sandbox',
    'client_id': "Ae5hdQSRJJsmzoMDzQwGfSS1mdWnp8jaIw6sVJb8rRz4U-OaBaQXcjoqWibYrRTE8XBoDsQnvVk2-ovJ",
    'client_secret': "ED7ycipWDdTO6D4CLMrxVqV-v7dlG1tooEhfKYcDoLlaBRS8uQ4rZiy7sd8nQ1_lQEDAXq8qcYj7eki1"
});


class PaypalController {
    async createPaymentOrder(req, res) {
        const item_list = req.body.item_list
        const total = req.body.total
        console.log(typeof total)
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/paypal/capture-paypal-order",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": item_list,
                "amount": {
                    "currency": "USD",
                    "total": total
                },
                "description": "Product Description"
            }]
        }
        paypal.payment.create(create_payment_json, (err, payment) => {
            if (err) {
                res.status(401).json({ error: err });
            } else {
                console.log(payment)
                const paymentcreate = {
                    orderId: payment.id,
                    userId: req.body.userId,
                    amount: payment.transactions[0].amount.total,
                    method: payment.payer.payment_method,
                    createAt: payment.create_time,
                    updateAt: payment.update_time,
                    status: "create"
                };
                const createpayment = Payment.create(paymentcreate);
                if (!createpayment) {
                    res.status(400)
                    throw new Error("Error")
                }
                // Payment.save()
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
                // res.status(200).json(payment)
            }
        })
    }
    async executePayment(req, res) {
        const payerId = req.query.PayerID
        const paymentId = req.query.paymentId
        console.log(payerId, paymentId)
        paypal.payment.execute(paymentId, { "payer_id": payerId }, (err, payment) => {
            if (err) {
                const paymentstatus = {
                    status: payment.state
                }
                Payment.findOneAndUpdate({ orderId: payment.id }, paymentstatus)
                    // Payment.save()
                res.status(401).json({ error: err })
            } else {
                console.log(payment)
                const paymentstatus = {
                    status: payment.state
                }
                Payment.findOneAndUpdate({ orderId: payment.id }, paymentstatus)
                    // payment.save()
                res.status(200).json({ payment: payment })
            }

        })
    }
}
module.exports = new PaypalController;