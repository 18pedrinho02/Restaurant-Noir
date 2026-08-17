import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import products from "./products.js";
import { createOrder } from "./orders.js";
import db from "./database.js";

dotenv.config();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(cors());

app.post(
    "/api/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {

        const signature = req.headers["stripe-signature"];

        let event;

        try {

            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );

        } catch (error) {

            console.error(
                "Webhook signature verification failed:",
                error.message
            );

            return res.status(400).send(
                `Webhook Error: ${error.message}`
            );
        }

        console.log("Stripe event received:", event.type);

        if (event.type === "checkout.session.completed") {

            const session = event.data.object;


            // GET ITEMS FROM METADATA
            if (!session.metadata?.items) {

                console.error(
                    "No order items found in Stripe metadata."
                );

                return res.status(400).json({
                    error: "Order items missing"
                });
            }

            const itemsFromMetadata = JSON.parse(
                session.metadata.items
            );


            // BUILD ORDER ITEMS

            const orderItems = itemsFromMetadata.map((item) => {

                const product = products[item.id];

                if (!product) {

                    throw new Error(
                        `Product not found: ${item.id}`
                    );
                }

                return {
                    id: item.id,
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price / 100
                };
            });


            // CALCULATE TOTAL

            const total = orderItems.reduce(
                (sum, item) => {
                    return sum + item.price * item.quantity;
                },
                0
            );


            // CREATE ORDER ID

            const orderId = `NOIR-${Date.now()}`;


            // CREATE ORDER

            const order = {

                id: orderId,

                stripeSessionId: session.id,

                customer: {
                    email: session.customer_details?.email || null
                },

                items: orderItems,

                total: total,

                status: "paid",

                createdAt: new Date().toISOString()
            };


            // SAVE ORDER

            createOrder(order);


            // LOG ORDER

            console.log("");
            console.log("==============================");
            console.log("NEW ORDER");
            console.log("==============================");

            console.log(
                "Order ID:",
                order.id
            );

            console.log(
                "Customer:",
                order.customer.email
            );

            console.log(
                "Items:",
                order.items
            );

            console.log(
                "Total:",
                `€${order.total.toFixed(2)}`
            );

            console.log(
                "Status:",
                order.status
            );

            console.log("==============================");
            console.log("");
        }

        res.json({ received: true });
    }
);

app.use(express.json());


console.log(
    process.env.STRIPE_SECRET_KEY
        ? "Stripe key loaded"
        : "Stripe key missing"
);


app.post("/api/create-checkout-session", async (req, res) => {

    try {

        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                error: "Cart is empty"
            });
        }

        const lineItems = items.map((item) => {

            const product = products[item.id];

            if (!product) {
                throw new Error(`Product not found: ${item.id}`);
            }

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0
            ) {
                throw new Error(
                    `Invalid quantity for product: ${item.id}`
                );
            }

            return {
                price_data: {
                    currency: "eur",

                    product_data: {
                        name: product.name,
                    },

                    unit_amount: product.price,
                },

                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({

            line_items: lineItems,

            mode: "payment",

            metadata: {
                items: JSON.stringify(
                    items.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                    }))
                ),
            },

            success_url: "http://localhost:5173/success",

            cancel_url: "http://localhost:5173/takeaway",

        });

        res.json({
            url: session.url
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to create checkout session"
        });

    }

});

app.get("/", (req, res) => {
    res.send("Noir backend is running");
});

const PORT = 4242;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});