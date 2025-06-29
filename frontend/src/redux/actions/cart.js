

// add to cart 

export const addToCart = (data) => async (dispatchEvent,getState) => {
    dispatchEvent({
        type: "addToCart",
        payload: data
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cart)
    );
    return data;
}

// remove from cart
export const removeFromCart = (data) => async (dispatchEvent,getState) => {
    dispatchEvent({
        type: "removeFromCart",
        payload: data._id,
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cart)
    );
    return data;
}