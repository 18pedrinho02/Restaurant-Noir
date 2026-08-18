import { useEffect, useState } from "react";

const AdminOrderDetails = ({
    orderId,
    onClose,
    onOrderUpdated
}) => {

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);


    // =========================
    // FETCH ORDER
    // =========================

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const response = await fetch(
                    `http://localhost:4242/api/orders/${orderId}`
                );


                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch order"
                    );
                }


                const data = await response.json();

                setOrder(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };


        fetchOrder();

    }, [orderId]);


    // =========================
    // UPDATE STATUS
    // =========================

    const updateStatus = async (newStatus) => {

        try {

            setUpdatingStatus(true);


            const response = await fetch(
                `http://localhost:4242/api/orders/${orderId}/status`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to update order"
                );

            }


            const data = await response.json();


            // Atualiza o pedido dentro do drawer

            setOrder(data.order);


            // Avisa o Admin.jsx

            if (onOrderUpdated) {

                onOrderUpdated(data.order);

            }

        } catch (error) {

            console.error(error);

        } finally {

            setUpdatingStatus(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">

                <span className="font-body text-xs tracking-[0.2em] text-white uppercase">
                    Loading order...
                </span>

            </div>
        );

    }


    // =========================
    // ORDER NOT FOUND
    // =========================

    if (!order) {

        return null;

    }


    return (

        <div className="fixed inset-0 z-50 bg-black/70 flex justify-end">

            <aside className="w-full max-w-xl h-full bg-[#EDE9E1] text-[#181818] flex flex-col">


                {/* =========================
                    HEADER
                ========================= */}

                <div className="flex items-center justify-between border-b border-[#181818]/20 px-8 py-7">

                    <div>

                        <span className="font-body text-[10px] tracking-[0.3em] text-[#77736C] uppercase">
                            Order details
                        </span>

                        <h2 className="font-heading text-3xl mt-2">
                            #{order.id}
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="w-10 h-10 border border-[#181818]/20 text-xl hover:bg-[#181818] hover:text-[#EDE9E1] transition-colors"
                    >
                        ×
                    </button>

                </div>


                {/* =========================
                    CUSTOMER
                ========================= */}

                <div className="px-8 py-7 border-b border-[#181818]/10">

                    <span className="font-body text-[10px] tracking-[0.2em] text-[#77736C] uppercase">
                        Customer
                    </span>

                    <p className="font-body text-sm mt-2">
                        {order.customer.email}
                    </p>

                </div>


                {/* =========================
                    PRODUCTS
                ========================= */}

                <div className="flex-1 overflow-y-auto px-8 py-8">

                    <span className="font-body text-[10px] tracking-[0.2em] text-[#77736C] uppercase">
                        Items
                    </span>


                    <div className="mt-6 space-y-5">

                        {order.items.map((item) => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b border-[#181818]/10 pb-5"
                            >

                                <div>

                                    <h3 className="font-heading text-xl">
                                        {item.name}
                                    </h3>

                                    <p className="font-body text-xs text-[#77736C] mt-1">
                                        €{item.price.toFixed(2)} × {item.quantity}
                                    </p>

                                </div>


                                <span className="font-body text-sm">
                                    €{(
                                        item.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                {/* =========================
                    FOOTER
                ========================= */}

                <div className="border-t border-[#181818]/20 px-8 py-8">

                    {/* TOTAL */}

                    <div className="flex items-center justify-between mb-8">

                        <span className="font-body text-xs tracking-[0.2em] text-[#77736C] uppercase">
                            Total
                        </span>

                        <span className="font-heading text-3xl">
                            €{order.total.toFixed(2)}
                        </span>

                    </div>


                    {/* STATUS */}

                    <div>

                        <span className="font-body text-[10px] tracking-[0.2em] text-[#77736C] uppercase">
                            Order status
                        </span>


                        <div className="grid grid-cols-2 gap-2 mt-4">

                            {[
                                "paid",
                                "preparing",
                                "ready",
                                "completed"
                            ].map((status) => (

                                <button
                                    key={status}
                                    type="button"
                                    disabled={updatingStatus}
                                    onClick={() =>
                                        updateStatus(status)
                                    }
                                    className={`
                                        px-4
                                        py-3
                                        border
                                        font-body
                                        text-[10px]
                                        tracking-[0.15em]
                                        uppercase
                                        transition-all
                                        duration-300

                                        ${
                                            order.status === status
                                                ? "bg-[#181818] text-[#EDE9E1] border-[#181818]"
                                                : "border-[#181818]/20 text-[#77736C] hover:border-[#181818] hover:text-[#181818]"
                                        }

                                        disabled:opacity-40
                                    `}
                                >
                                    {status}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </aside>

        </div>

    );

};

export default AdminOrderDetails;