import { useEffect, useState } from "react";
import AdminOrderDetails from "./AdminOrderDetails";

const Admin = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    const [statusFilter, setStatusFilter] =
        useState("all");


    // =========================
    // FETCH ORDERS
    // =========================

    const fetchOrders = async () => {

        try {

            const response = await fetch(
                "http://localhost:4242/api/orders"
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch orders"
                );

            }


            const data = await response.json();

            setOrders(data);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load orders."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        fetchOrders();

    }, []);


    // =========================
    // UPDATE ORDER IN LIST
    // =========================

    const handleOrderUpdated = (updatedOrder) => {

        setOrders((currentOrders) => {

            return currentOrders.map((order) => {

                if (order.id === updatedOrder.id) {

                    return {
                        ...order,
                        status: updatedOrder.status
                    };

                }

                return order;

            });

        });

    };


    // =========================
    // FILTER ORDERS
    // =========================

    const filteredOrders = orders.filter((order) => {

        if (statusFilter === "all") {

            return true;

        }

        return order.status === statusFilter;

    });


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] flex items-center justify-center">

                <span className="font-body text-xs tracking-[0.2em] text-[#9A9A9A] uppercase">
                    Loading orders...
                </span>

            </div>
        );

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] flex items-center justify-center">

                <span className="font-body text-sm text-red-400">
                    {error}
                </span>

            </div>
        );

    }


    return (

        <main className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] px-10 py-12">


            {/* =========================
                HEADER
            ========================= */}

            <header className="max-w-7xl mx-auto mb-12">

                <div className="flex items-end justify-between">

                    <div>

                        <span className="font-body text-xs tracking-[0.3em] text-[#9A9A9A] uppercase">
                            Noir
                        </span>

                        <h1 className="font-heading text-6xl mt-3">
                            Orders
                        </h1>

                    </div>


                    <span className="font-body text-xs tracking-[0.2em] text-[#9A9A9A] uppercase">
                        {orders.length} orders
                    </span>

                </div>

            </header>


            {/* =========================
                FILTERS
            ========================= */}

            <section className="max-w-7xl mx-auto mb-8">

                <div className="flex flex-wrap gap-2">

                    {[
                        "all",
                        "paid",
                        "preparing",
                        "ready",
                        "completed"
                    ].map((status) => (

                        <button
                            key={status}
                            type="button"
                            onClick={() =>
                                setStatusFilter(status)
                            }
                            className={`
                                px-5
                                py-3
                                border
                                font-body
                                text-[10px]
                                tracking-[0.2em]
                                uppercase
                                transition-all
                                duration-300

                                ${
                                    statusFilter === status
                                        ? "bg-[#EDE9E1] text-[#181818] border-[#EDE9E1]"
                                        : "border-white/10 text-[#9A9A9A] hover:border-white/30 hover:text-white"
                                }
                            `}
                        >
                            {status}
                        </button>

                    ))}

                </div>

            </section>


            {/* =========================
                ORDERS
            ========================= */}

            <section className="max-w-7xl mx-auto">

                {filteredOrders.length === 0 ? (

                    <div className="border border-white/10 py-24 text-center">

                        <h2 className="font-heading text-4xl text-white/30">
                            No orders.
                        </h2>

                        <p className="font-body text-xs text-[#9A9A9A] mt-4">
                            There are no orders with this status.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {filteredOrders.map((order) => (

                            <button
                                key={order.id}
                                type="button"
                                onClick={() =>
                                    setSelectedOrder(order.id)
                                }
                                className="w-full text-left border border-white/10 px-8 py-7 transition-all duration-300 hover:bg-white/[0.03] hover:border-white/20"
                            >

                                <div className="grid grid-cols-4 gap-8 items-center">


                                    {/* ORDER */}

                                    <div>

                                        <span className="font-body text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                                            Order
                                        </span>

                                        <p className="font-body text-sm mt-2">
                                            #{order.id}
                                        </p>

                                    </div>


                                    {/* CUSTOMER */}

                                    <div>

                                        <span className="font-body text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                                            Customer
                                        </span>

                                        <p className="font-body text-sm mt-2">
                                            {order.customer.email}
                                        </p>

                                    </div>


                                    {/* TOTAL */}

                                    <div>

                                        <span className="font-body text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                                            Total
                                        </span>

                                        <p className="font-heading text-2xl mt-1">
                                            €{order.total.toFixed(2)}
                                        </p>

                                    </div>


                                    {/* STATUS */}

                                    <div className="flex justify-end">

                                        <span className={`
                                            px-4
                                            py-2
                                            border
                                            font-body
                                            text-[10px]
                                            tracking-[0.2em]
                                            uppercase

                                            ${
                                                order.status === "paid"
                                                    ? "border-blue-400/30 text-blue-300"
                                                    : order.status === "preparing"
                                                        ? "border-yellow-400/30 text-yellow-300"
                                                        : order.status === "ready"
                                                            ? "border-green-400/30 text-green-300"
                                                            : "border-white/20 text-white/50"
                                            }
                                        `}>
                                            {order.status}
                                        </span>

                                    </div>

                                </div>

                            </button>

                        ))}

                    </div>

                )}

            </section>


            {/* =========================
                ORDER DETAILS
            ========================= */}

            {selectedOrder && (

                <AdminOrderDetails
                    orderId={selectedOrder}

                    onClose={() =>
                        setSelectedOrder(null)
                    }

                    onOrderUpdated={
                        handleOrderUpdated
                    }
                />

            )}

        </main>

    );

};

export default Admin;