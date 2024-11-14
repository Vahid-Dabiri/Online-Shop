import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './../templates/product_card/ProductCard';
import Card from '../card/Card';

import './CategoryArchive.css';

export default function CategoryArchive() {
    const [categ_products, set_categ_products] = useState([]);
    let params = useParams();

    const [current_page, set_current_page] = useState(1);
    const [page_products_list, set_page_products_list] = useState([]);
    let pagination_btn_count = [];
    const pagination_size = 16;

    const get_archive_data = async () => {
        await fetch(`https://fakestoreapi.com/products/category/${params.category}`)
            .then(res => res.json())
            .then(data => {
                set_categ_products(data);
            })
    }

    useEffect(() => {
        const end_index = pagination_size * current_page;
        const start_index = end_index - pagination_size;
        set_page_products_list(categ_products.slice(start_index, end_index));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categ_products, current_page]);

    for (let i = 0; i < categ_products.length / pagination_size; i++) {
        pagination_btn_count.push(i + 1);
    }

    useEffect(() => {
        get_archive_data();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const change_pagination_handler = (e) => {
        set_current_page(parseInt(e.target.innerHTML));
    }

    return (
        <main>
            <Card />
            <h1 className='page_title'>{params.category}</h1>
            <div className='products_list'>
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
