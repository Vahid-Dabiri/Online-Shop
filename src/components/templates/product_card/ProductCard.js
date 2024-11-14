import React, { useContext } from 'react';
import { shoppingCardContext } from '../../../contexts/shoppingCardContext';
import { Link } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import './ProductCard.css';



export default function ProductCard(product) {

    const contextData = useContext(shoppingCardContext);

    // useEffect(() => {
    //     localStorage.setItem('bag_products_array', JSON.stringify(contextData.add_product_to_card))
    // }, [contextData.add_product_to_card])

    const add_product_to_card_handler = () => {

            let is_exist_in_card = contextData.add_product_to_card.some(element => element.id === product.id);

            if (is_exist_in_card) {
                let user_card = [...contextData.add_product_to_card];

                let new_user_card = user_card.map(bag_product => {
                    if (bag_product.id === product.id) {
                        bag_product.product_count += 1;
                    }
                    return bag_product
                });
                contextData.set_add_product_to_card(new_user_card);

            } else {
                contextData.set_product_count(1)
                let added_product = {
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    product_count: contextData.product_count
                }
                contextData.set_add_product_to_card(prevState => [...prevState, added_product]);

            }

            contextData.set_show_card_toast(true);

            setTimeout(() => {
                contextData.set_show_card_toast(false);
            }, 3000)
    }

    return (
        <div className='product_container' key={product.id}>
            <div className='product_image_container'>
                <img src={product.image} alt='product' />
                <h2>{product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title}</h2>
                <span className='product_category'>{product.category}</span>
            </div>
            <div className='product_details'>
                <div className='product_desc'>
                    {/* <p>{product.description.slice(0, 100)} ...</p> */}
                    <span className='product_price'>{product.price} $</span>
                </div>
                <Link className='product_single_page_link' to={`/shop/${product.category}/${product.id}`}><RemoveRedEyeOutlinedIcon /></Link>
                <div className='add_to_card_btn' onClick={add_product_to_card_handler}>
                    <div className='add_to_card icon_container'><AddShoppingCartOutlinedIcon /></div>
                    <div className='add_to_card text_container'>Add to Cart</div>
                </div>
            </div>
        </div>
    )
}
