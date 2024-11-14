import React, { useEffect, useRef, useState } from 'react'
import { categories } from '../../Data';
import ProductCard from '../templates/product_card/ProductCard';
import './Shop.css';



export default function Shop() {

    const [products_list, set_product_list] = useState([]);
    const [current_page, set_current_page] = useState(1);
    const [page_products_list, set_page_products_list] = useState([]);

    let filtered_products;
    let pagination_btn_count = [];
    const pagination_size = 16;
    const filter_category_item_ref = useRef([]);

    const get_data_func = async () => {
        await fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                set_product_list(data);
            });
    }

    useEffect(() => {
        const end_index = pagination_size * current_page;
        const start_index = end_index - pagination_size;
        set_page_products_list(products_list.slice(start_index, end_index));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products_list, current_page]);

    useEffect(() => {
        get_data_func();
        filter_category_item_ref.current[0].classList.add('active_filter');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    for (let i = 0; i < products_list.length / pagination_size; i++) {
        pagination_btn_count.push(i + 1);
    }

    function filter_products_handler(e) {
        const get_filter_data_func = async () => {
            filter_category_item_ref.current.forEach(category_filter =>
                category_filter.classList.remove('active_filter')
            );
            await fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(data => {
                    filtered_products = [...data];
                    const filter_name = e.target.innerHTML;
                    if (filter_name === 'all') {
                        set_product_list(filtered_products);
                    } else {
                        const filtered_product = filtered_products.filter(product => product.category === filter_name)
                        set_product_list(filtered_product);
                    }
                    e.target.classList.add('active_filter');
                });
        }
        get_filter_data_func();
        set_current_page(1);
    }

    const change_pagination_handler = (e) => {
        set_current_page(parseInt(e.target.innerHTML));
    }

    return (
        <main>
            <div className='categories_container'>
                <span ref={(el) => { filter_category_item_ref.current[0] = el }} key={0} onClick={(e) => filter_products_handler(e)}>all</span>
                {
                    categories.map((category, index) => (
                        <span ref={(el) => { filter_category_item_ref.current[index + 1] = el }} key={index + 1} onClick={(e) => filter_products_handler(e)}>{category.title}</span>
                    ))
                }
            </div>

            <div className='products_container'>

                {
                    page_products_list.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                }
            </div>
            <div className='pagination_container'>
                {
                    pagination_btn_count.map((btn_num, index) => (
                        <span key={index} className={btn_num === current_page ? 'pagination_btn active_pagination_btn' : 'pagination_btn'} onClick={(e) => change_pagination_handler(e)}>{btn_num}</span>
                    ))

                }

            </div>
        </main>
    )
}

