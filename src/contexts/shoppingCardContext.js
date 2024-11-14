import React, { createContext, useState, useEffect } from 'react'

export const shoppingCardContext = createContext()

const ShoppingCardProvider = ({ children }) => {
    const [show_card_toast, set_show_card_toast] = useState(false);
    const [show_card, set_show_card] = useState(false);
    const stored_cart_products = localStorage.getItem('bag_products_array');
    const [add_product_to_card, set_add_product_to_card] = useState(JSON.parse(stored_cart_products) || []);
    const [product_count, set_product_count] = useState(1);
    const [all_product_list, set_all_product_list] = useState([]);

    const get_data_func = async () => {
        await fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                set_all_product_list(data);
            });
    }

    useEffect(() => {
        get_data_func();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    localStorage.setItem('bag_products_array', JSON.stringify(add_product_to_card))

    return (
        <shoppingCardContext.Provider value={{
            show_card_toast,
            set_show_card_toast,
            show_card,
            set_show_card,
            add_product_to_card,
            set_add_product_to_card,
            product_count,
            set_product_count,
            all_product_list
        }}>
            {children}
        </shoppingCardContext.Provider>
    )
}

export default ShoppingCardProvider