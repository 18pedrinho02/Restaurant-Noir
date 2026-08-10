import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);


    // ADD TO CART

    const addToCart = (product) => {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };


    // REMOVE COMPLETELY

    const removeFromCart = (productId) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );
    };


    // DECREASE QUANTITY

    const decreaseQuantity = (productId) => {

        setCartItems((currentItems) => {

            return currentItems
                .map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0);
        });
    };


    // TOTAL ITEMS

    const getCartItemCount = () => {

        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    };


    // CART TOTAL

    const getCartTotal = () => {

        return cartItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                getCartItemCount,
                getCartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};


const useCart = () => {
    return useContext(CartContext);
};


export { CartProvider, useCart };