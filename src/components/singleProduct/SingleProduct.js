import { React, useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shoppingCardContext } from '../../contexts/shoppingCardContext';

import './SingleProduct.css';

export default function SingleProduct() {
    const [this_product, set_this_product] = useState([]);
    const [product_amount, set_product_amount] = useState(1);
    let params = useParams();
    const product_amount_ref = useRef();

    const contextData = useContext(shoppingCardContext);

    const get_product_info = async () => {
        await fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => res.json())
            .then(product_data => {
                set_this_product(product_data)
            })
    }

    useEffect(() => {
        get_product_info();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const increse_decrease_card_product_amount = (product, operator) => {

        let is_exist_in_card = contextData.add_product_to_card.some(element => element.id === product.id);
        if (is_exist_in_card) {
            let user_card = [...contextData.add_product_to_card];

            let new_user_card = user_card.map(bag_product => {
                if (bag_product.id === product.id) {
                    if(operator === 'plus'){
                        bag_product.product_count += 1;
                    }
                    if (operator === 'minus') {
                        bag_product.product_count -= 1;
                    }
                    
                }
                return bag_product
            });
            contextData.set_add_product_to_card(new_user_card);
            contextData.set_show_card_toast(true);

            setTimeout(() => {
                contextData.set_show_card_toast(false);
            }, 3000)
        }
    }

    const increase_product_amount_handler = (product) => {
        set_product_amount(prevState => parseInt(prevState) + 1);
        increse_decrease_card_product_amount(product, 'plus');
    }

    const decreas_product_amount_handler = (product) => {
        if (product_amount > 1) {
            set_product_amount(prevState => parseInt(prevState) - 1);
            increse_decrease_card_product_amount(product, 'minus');
        }
    }

    const product_amount_change_handler = (e) => {
        set_product_amount(e.target.value);
    }

    const add_single_product_to_card_handler = (product) => {

        let is_exist_in_card = contextData.add_product_to_card.some(element => element.id === product.id);
        if (is_exist_in_card) {
            let user_card = [...contextData.add_product_to_card];

            let new_user_card = user_card.map(bag_product => {
                if (bag_product.id === product.id) {
                    bag_product.product_count = parseInt(product_amount);
                }
                return bag_product
            });
            contextData.set_add_product_to_card(new_user_card);
        } else {
            let amount = parseInt(product_amount);

            contextData.set_product_count(amount);
            let added_product = {
                id: product.id,
                image: product.image,
                title: product.title,
                price: product.price,
                product_count: amount
            }
            contextData.set_add_product_to_card(prevState => [...prevState, added_product]);
        }

        contextData.set_show_card_toast(true);

        setTimeout(() => {
            contextData.set_show_card_toast(false);
        }, 3000)
    }

    return (
        <main>
            <section className='single_product_container'>
                <div className='single_product_image_container'>
                    <img src={this_product.image} alt={this_product.title} />
                </div>
                <div className='product_details_container'>
                    <div className='info_wrapper'>
                        <h1 className='product_title'>{this_product.title}</h1>
                        <Link className='product_category' to={`/shop/${this_product.category}`}>{this_product.category}</Link>
                        <p className='product_description'>{this_product.description}</p>
                    </div>
                    <div className='amount_wrapper'>
                        <span className='product_price'>{this_product.price} $</span>
                        <div className='amount_container'>
                            <button className='increas_btn' onClick={() => increase_product_amount_handler(this_product)}>+</button>
                            {/* <span ref={product_amount_ref} className='product_amount'>{product_amount}</span> */}
                            <input type='number' step={1} min={1} ref={product_amount_ref} className='product_amount' value={product_amount} onChange={(e) => product_amount_change_handler(e)} />
                            <button className='decreas_btn' onClick={() => decreas_product_amount_handler(this_product)}>-</button>
                        </div>
                        <button className='add_to_card_btn' onClick={() => add_single_product_to_card_handler(this_product)}>add to cart</button>
                    </div>
                </div>
            </section>
        </main>
    )
}
