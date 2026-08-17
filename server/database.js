import Database from "better-sqlite3";

const db = new Database("orders.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        stripe_session_id TEXT NOT NULL,
        customer_email TEXT,
        total REAL NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,

        FOREIGN KEY (order_id)
            REFERENCES orders(id)
    );
`);

export default db;