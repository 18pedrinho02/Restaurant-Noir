import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import takeawayCategories from '../menu.js';
import CartDrawer from './CartDrawer';

const Takeaway = () => {
    const takeawayRef = useRef(null);


    const [isCartOpen, setIsCartOpen]=useState(false);

    const {
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    // Número total de produtos no carrinho
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Preço total do carrinho
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <section
            ref={takeawayRef}
            className="w-full min-h-screen bg-[#EDE9E1] text-[#181818] overflow-hidden relative px-16 py-32"
        >

            {/* HEADER */}

            <div className="w-full max-w-6xl mx-auto mb-28">
                <div className="flex flex-col items-center text-center">

                    <span className="font-body text-xs tracking-[0.3em] text-[#77736C] uppercase">
                        Takeaway
                    </span>

                    <h1 className="font-heading text-7xl max-w-4xl mt-6 leading-none">
                        Noir,
                        <span className="text-[#A88B5A]"> at home.</span>
                    </h1>

                    <p className="font-body text-sm text-[#77736C] max-w-md leading-7 mt-7">
                        Enjoy a selection of Noir dishes from the comfort
                        of your home, prepared with the same attention to
                        detail as our restaurant menu.
                    </p>

                </div>
            </div>


            {/* MENU */}

            <div className="w-full max-w-6xl mx-auto">

                {takeawayCategories.map((category) => (

                    <div
                        key={category.id}
                        className="mb-24"
                    >

                        {/* CATEGORY HEADER */}

                        <div className="flex items-center justify-between border-b border-[#181818]/20 pb-5 mb-8">

                            <div className="flex items-center gap-6">

                                <span className="font-body text-xs tracking-[0.2em] text-[#77736C]">
                                    {category.number}
                                </span>

                                <h2 className="font-heading text-4xl">
                                    {category.name}
                                </h2>

                            </div>

                            <span className="font-body text-xs tracking-[0.2em] text-[#77736C] uppercase">
                                {category.products.length} items
                            </span>

                        </div>


                        {/* PRODUCTS */}

                        <div>

                            {category.products.map((product) => {

                                const cartItem = cartItems.find(
                                    (item) => item.id === product.id
                                );

                                return (
                                    <div
                                        key={product.id}
                                        className="group flex items-center justify-between gap-10 border-b border-[#181818]/10 py-8"
                                    >

                                        {/* PRODUCT INFO */}

                                        <div className="max-w-2xl">

                                            <h3 className="font-heading text-2xl transition-colors duration-500 group-hover:text-[#A88B5A]">
                                                {product.name}
                                            </h3>

                                            <p className="font-body text-sm text-[#77736C] mt-2">
                                                {product.description}
                                            </p>

                                        </div>


                                        {/* PRODUCT ACTION */}

                                        <div className="flex items-center gap-8 shrink-0">

                                            <span className="font-body text-sm">
                                                €{product.price}
                                            </span>


                                            {/* ADD BUTTON */}

                                            {!cartItem && (
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(product)}
                                                    className="group/add inline-flex items-center gap-3 border border-[#181818]/30 px-5 py-3 font-body text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#181818] hover:text-[#EDE9E1]"
                                                >
                                                    <span>
                                                        Add
                                                    </span>

                                                    <span className="transition-transform duration-500 group-hover/add:translate-x-1">
                                                        +
                                                    </span>
                                                </button>
                                            )}


                                            {/* CART CONTROLS */}

                                            {cartItem && (
                                                <div className="flex items-center border border-[#181818]/30">

                                                    {/* DECREASE */}

                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(product.id)}
                                                        className="px-4 py-3 font-body text-sm transition-all duration-300 hover:bg-[#181818] hover:text-[#EDE9E1]"
                                                    >
                                                        −
                                                    </button>


                                                    {/* QUANTITY */}

                                                    <span className="px-4 min-w-[45px] text-center font-body text-sm">
                                                        {cartItem.quantity}
                                                    </span>


                                                    {/* INCREASE */}

                                                    <button
                                                        type="button"
                                                        onClick={() => addToCart(product)}
                                                        className="px-4 py-3 font-body text-sm transition-all duration-300 hover:bg-[#181818] hover:text-[#EDE9E1]"
                                                    >
                                                        +
                                                    </button>


                                                    {/* REMOVE */}

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(product.id)}
                                                        className="border-l border-[#181818]/20 px-4 py-3 font-body text-xs text-[#77736C] transition-all duration-300 hover:bg-[#181818] hover:text-[#EDE9E1]"
                                                        aria-label={`Remove ${product.name}`}
                                                    >
                                                        ×
                                                    </button>

                                                </div>
                                            )}

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                ))}

            </div>


            {/* CART BUTTON */}

            <button
                onClick={() => setIsCartOpen(true)}
                type="button"
                className="fixed bottom-8 right-8 z-40 flex items-center gap-5 bg-[#181818] text-[#EDE9E1] px-7 py-4 font-body text-xs tracking-[0.15em] uppercase shadow-xl transition-all duration-500 hover:-translate-y-1"
            >

                <span>
                    Cart
                </span>

                <span className="h-4 w-px bg-[#EDE9E1]/30" />

                <span className="text-[#A88B5A]">
                    {cartCount}
                </span>

                <span>
                    €{cartTotal.toFixed(2)}
                </span>

            </button>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

        </section>
    );
};

export default Takeaway;