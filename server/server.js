import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const products = {
    burrata: {
        name: "Burrata",
        price: 1200
    },

    "beef-tartare": {
        name: "Beef Tartare",
        price: 1600
    },

    "dry-aged-ribeye": {
        name: "Dry Aged Ribeye",
        price: 3800
    },

    "truffle-risotto": {
        name: "Truffle Risotto",
        price: 2800
    },

    "chocolate-sphere": {
        name: "Chocolate Sphere",
        price: 1100
    },

    "lemon-tart": {
        name: "Lemon Tart",
        price: 1000
    }
};

console.log(
    process.env.STRIPE_SECRET_KEY
        ? "Stripe key loaded"
        : "Stripe key missing"
);

app.use(cors());
app.use(express.json());

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