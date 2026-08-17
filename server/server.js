import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import products from "./products.js";
import {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
} from "./orders.js";
import db from "./database.js";

dotenv.config();

const app = express();

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
);


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.post(
    "/api/webhook",

    express.raw({
        type: "application/json"
    }),

    (req, res) => {

        const signature =
            req.headers["stripe-signature"];

        let event;


        try {

            event =
                stripe.webhooks.constructEvent(
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


        console.log(
            "Stripe event received:",
            event.type
        );


        // ========================================
        // CHECKOUT COMPLETED
        // ========================================

        if (
            event.type ===
            "checkout.session.completed"
        ) {

            const session =
                event.data.object;


            // ------------------------------
            // GET ITEMS
            // ------------------------------

            if (
                !session.metadata?.items
            ) {

                console.error(
                    "No order items found in Stripe metadata."
                );

                return res.status(400).json({
                    error: "Order items missing"
                });

            }


            const itemsFromMetadata =
                JSON.parse(
                    session.metadata.items
                );


            // ------------------------------
            // BUILD ORDER ITEMS
            // ------------------------------

            const orderItems =
                itemsFromMetadata.map(
                    (item) => {

                        const product =
                            products[item.id];


                        if (!product) {

                            throw new Error(
                                `Product not found: ${item.id}`
                            );

                        }


                        return {

                            id: item.id,

                            name:
                                product.name,

                            quantity:
                                item.quantity,

                            price:
                                product.price / 100

                        };

                    }
                );


            // ------------------------------
            // CALCULATE TOTAL
            // ------------------------------

            const total =
                orderItems.reduce(
                    (sum, item) => {

                        return (
                            sum +
                            item.price *
                            item.quantity
                        );

                    },
                    0
                );


            // ------------------------------
            // ORDER ID
            // ------------------------------

            const orderId =
                `NOIR-${Date.now()}`;


            // ------------------------------
            // CREATE ORDER
            // ------------------------------

            const order = {

                id: orderId,

                stripeSessionId:
                    session.id,

                customer: {

                    email:
                        session
                            .customer_details
                            ?.email || null

                },

                items:
                    orderItems,

                total:
                    total,

                status:
                    "paid",

                createdAt:
                    new Date().toISOString()

            };


            // ------------------------------
            // SAVE
            // ------------------------------

            createOrder(order);


            // ------------------------------
            // LOG
            // ------------------------------

            console.log("");

            console.log(
                "=============================="
            );

            console.log(
                "NEW ORDER"
            );

            console.log(
                "=============================="
            );

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

            console.log(
                "=============================="
            );

            console.log("");

        }


        res.json({
            received: true
        });

    }
);

// ========================================
// CREATE CHECKOUT SESSION
// ========================================

app.post(
    "/api/create-checkout-session",

    async (req, res) => {

        try {

            const { items } =
                req.body;


            if (
                !items ||
                items.length === 0
            ) {

                return res.status(400).json({
                    error: "Cart is empty"
                });

            }


            const lineItems =
                items.map((item) => {

                    const product =
                        products[item.id];


                    if (!product) {

                        throw new Error(
                            `Product not found: ${item.id}`
                        );

                    }


                    if (
                        !Number.isInteger(
                            item.quantity
                        ) ||
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

                                name:
                                    product.name

                            },

                            unit_amount:
                                product.price

                        },

                        quantity:
                            item.quantity

                    };

                });


            const session =
                await stripe
                    .checkout
                    .sessions
                    .create({

                        line_items:
                            lineItems,

                        mode:
                            "payment",

                        metadata: {

                            items:
                                JSON.stringify(
                                    items.map(
                                        (item) => ({
                                            id:
                                                item.id,

                                            quantity:
                                                item.quantity
                                        })
                                    )
                                )

                        },

                        success_url:
                            "http://localhost:5173/success",

                        cancel_url:
                            "http://localhost:5173/takeaway"

                    });


            res.json({
                url: session.url
            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                error:
                    "Unable to create checkout session"

            });

        }

    }
);

app.use(express.json());



// ========================================
// GET ALL ORDERS
// ========================================

app.get("/api/orders", (req, res) => {

    try {

        const orders = getOrders();

        res.json(orders);

    } catch (error) {

        console.error(
            "Error fetching orders:",
            error
        );

        res.status(500).json({
            error: "Unable to fetch orders"
        });
    }

});


// ========================================
// GET SINGLE ORDER
// ========================================

app.get("/api/orders/:id", (req, res) => {

    try {

        const order = getOrder(
            req.params.id
        );


        if (!order) {

            return res.status(404).json({
                error: "Order not found"
            });

        }


        res.json(order);

    } catch (error) {

        console.error(
            "Error fetching order:",
            error
        );

        res.status(500).json({
            error: "Unable to fetch order"
        });

    }

});


// ========================================
// UPDATE ORDER STATUS
// ========================================

app.patch(
    "/api/orders/:id/status",

    express.json(),

    (req, res) => {

        try {

            const { status } = req.body || {};

            console.log(
                "Updating order:",
                req.params.id
            );

            console.log(
                "New status:",
                status
            );


            if (!status) {

                return res.status(400).json({
                    error: "Status is required"
                });

            }


            const order = updateOrderStatus(
                req.params.id,
                status
            );


            if (!order) {

                return res.status(404).json({
                    error: "Order not found"
                });

            }


            res.json({
                success: true,
                order
            });

        } catch (error) {

            console.error(
                "Error updating order status:",
                error
            );


            if (
                error.message ===
                "Invalid order status"
            ) {

                return res.status(400).json({
                    error: error.message
                });

            }


            res.status(500).json({
                error: "Unable to update order status"
            });

        }

    }
);

// ========================================
// ROOT
// ========================================

app.get("/", (req, res) => {

    res.send(
        "Noir backend is running"
    );

});


// ========================================
// SERVER
// ========================================

const PORT = 4242;

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    }
);