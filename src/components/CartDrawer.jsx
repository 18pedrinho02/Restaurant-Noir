import { useRef } from 'react';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CartDrawer = ({ isOpen, onClose }) => {

    const {
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );


    const handleCheckout = async () => {

        try {

            const response = await fetch(
                "http://localhost:4242/api/create-checkout-session",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        items: cartItems,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Checkout failed");
            }

            window.location.href = data.url;

        } catch (error) {

            console.error("Checkout error:", error);

        }

    };



    const drawerRef = useRef(null);


    useGSAP(() => {

        if (isOpen) {

            gsap.fromTo(
                drawerRef.current,
                {
                    xPercent: 100
                },
                {
                    xPercent: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                }
            );

        } else {

            gsap.to(drawerRef.current, {
                xPercent: 100,
                duration: 0.6,
                ease: 'power3.in'
            });

        }

    }, {
        dependencies: [isOpen]
    });


    return (
        <>

            {/* =========================
                OVERLAY
            ========================= */}

            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40"
                />
            )}


            {/* =========================
                DRAWER
            ========================= */}

            <aside
                ref={drawerRef}
                className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#EDE9E1] text-[#181818] shadow-2xl"
            >

                <div className="flex h-full flex-col">


                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="flex items-center justify-between border-b border-[#181818]/20 px-8 py-7">

                        <div>

                            <span className="font-body text-[10px] tracking-[0.3em] text-[#77736C] uppercase">
                                Your Order
                            </span>

                            <h2 className="font-heading text-3xl mt-2">
                                Cart
                            </h2>

                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center border border-[#181818]/20 font-body text-lg transition-all duration-300 hover:bg-[#181818] hover:text-[#EDE9E1]"
                        >
                            ×
                        </button>

                    </div>


                    {/* =========================
                        PRODUCTS
                    ========================= */}

                    <div className="flex-1 overflow-y-auto px-8 py-8">

                        {cartItems.length === 0 ? (

                            <div className="flex h-full flex-col items-center justify-center text-center">

                                <span className="font-heading text-4xl text-[#181818]/20">
                                    Your cart is empty.
                                </span>

                                <p className="font-body text-xs text-[#77736C] mt-4">
                                    Add something from the menu.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-8">

                                {cartItems.map((item) => (

                                    <div
                                        key={item.id}
                                        className="border-b border-[#181818]/10 pb-7"
                                    >

                                        {/* PRODUCT INFO */}

                                        <div className="flex items-start justify-between gap-6">

                                            <div>

                                                <h3 className="font-heading text-xl">
                                                    {item.name}
                                                </h3>

                                                <p className="font-body text-xs text-[#77736C] mt-2">
                                                    €{item.price} each
                                                </p>

                                            </div>


                                            <span className="font-body text-sm whitespace-nowrap">
                                                €{(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </span>

                                        </div>


                                        {/* QUANTITY CONTROLS */}

                                        <div className="flex items-center justify-between mt-6">

                                            <div className="flex items-center border border-[#181818]/20">

                                                {/* DECREASE */}

                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="px-4 py-2 font-body text-sm transition-colors duration-300 hover:bg-[#181818] hover:text-[#EDE9E1]"
                                                >
                                                    −
                                                </button>


                                                {/* QUANTITY */}

                                                <span className="min-w-[40px] text-center font-body text-sm">
                                                    {item.quantity}
                                                </span>


                                                {/* INCREASE */}

                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(item)}
                                                    className="px-4 py-2 font-body text-sm transition-colors duration-300 hover:bg-[#181818] hover:text-[#EDE9E1]"
                                                >
                                                    +
                                                </button>

                                            </div>


                                            {/* REMOVE */}

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="font-body text-[10px] tracking-[0.15em] text-[#77736C] uppercase transition-colors duration-300 hover:text-red-900"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* =========================
                        FOOTER
                    ========================= */}

                    <div className="border-t border-[#181818]/20 px-8 py-8">

                        <div className="flex items-center justify-between mb-6">

                            <span className="font-body text-xs tracking-[0.2em] text-[#77736C] uppercase">
                                Subtotal
                            </span>

                            <span className="font-heading text-2xl">
                                €{cartTotal.toFixed(2)}
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className="w-full bg-[#181818] px-6 py-5 font-body text-xs tracking-[0.2em] text-[#EDE9E1] uppercase transition-all duration-500 hover:bg-[#A88B5A] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            Checkout
                        </button>

                    </div>

                </div>

            </aside>

        </>
    );
};

export default CartDrawer;