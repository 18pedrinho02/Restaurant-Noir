import db from "./database.js";


// CREATE ORDER

const createOrder = (order) => {

    const insertOrder = db.prepare(`
        INSERT INTO orders (
            id,
            stripe_session_id,
            customer_email,
            total,
            status,
            created_at
        )

        VALUES (
            @id,
            @stripeSessionId,
            @customerEmail,
            @total,
            @status,
            @createdAt
        )
    `);


    const insertOrderItem = db.prepare(`
        INSERT INTO order_items (
            order_id,
            product_id,
            product_name,
            quantity,
            price
        )

        VALUES (
            @orderId,
            @productId,
            @productName,
            @quantity,
            @price
        )
    `);


    const saveOrder = db.transaction(() => {

        // SAVE ORDER

        insertOrder.run({
            id: order.id,
            stripeSessionId: order.stripeSessionId,
            customerEmail: order.customer.email,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt
        });


        // SAVE ORDER ITEMS

        for (const item of order.items) {

            insertOrderItem.run({
                orderId: order.id,
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            });

        }

    });


    saveOrder();

    return order;
};


// GET ALL ORDERS

const getOrders = () => {

    return db
        .prepare(`
            SELECT *
            FROM orders
            ORDER BY created_at DESC
        `)
        .all();
};


// GET ORDER BY ID

const getOrder = (orderId) => {

    const order = db
        .prepare(`
            SELECT *
            FROM orders
            WHERE id = ?
        `)
        .get(orderId);


    if (!order) {
        return null;
    }


    const items = db
        .prepare(`
            SELECT
                product_id,
                product_name,
                quantity,
                price

            FROM order_items

            WHERE order_id = ?
        `)
        .all(orderId);


    return {
        id: order.id,

        stripeSessionId:
            order.stripe_session_id,

        customer: {
            email: order.customer_email
        },

        items: items.map((item) => ({
            id: item.product_id,
            name: item.product_name,
            quantity: item.quantity,
            price: item.price
        })),

        total: order.total,

        status: order.status,

        createdAt: order.created_at
    };
};


export {
    createOrder,
    getOrders,
    getOrder
};