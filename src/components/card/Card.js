import React, { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { shoppingCardContext } from '../../contexts/shoppingCardContext';
import './Card.css';

export default function Card() {
  const contextData = useContext(shoppingCardContext);
  const local_card_products = JSON.parse(localStorage.getItem('bag_products_array'));
  let total_card_price = 0;

  local_card_products.map(product => {
    return total_card_price += product.product_count * product.price;
  })

  const close_card_handler = () => {
    contextData.set_show_card(false);
  }

  const remove_card_product_handler = (product) => {
    let updated_user_card = [...contextData.add_product_to_card];
    updated_user_card.map(card_product => {
      if (card_product.id === product.id) {
        updated_user_card.splice(updated_user_card.indexOf(card_product), 1);
      }
      return contextData.set_add_product_to_card(updated_user_card);
    })

  }

  const increase_decreas_card_product_amount_handler = (product, operator) => {
    let updated_user_card = [...contextData.add_product_to_card];
    updated_user_card.map(card_product => {
      if (card_product.id === product.id) {
        if (operator === 'plus') {
          card_product.product_count = parseInt(card_product.product_count) + 1;
        }
        if (operator === 'minus') {
          if (card_product.product_count > 1) {
            card_product.product_count = parseInt(card_product.product_count) - 1;
          }
        }

      }
      return contextData.set_add_product_to_card(updated_user_card);
    })

  }

  const change_card_product_amount_handler = (product, e) => {

    let updated_user_card = [...contextData.add_product_to_card];
    updated_user_card.map(card_product => {
      if (card_product.id === product.id) {
        card_product.product_count = e.target.value;
      }
      return contextData.set_add_product_to_card(updated_user_card);
    })

  }

  return (
    <div className={`card_main_container ${contextData.show_card ? 'active_card' : ''}`}>
      <div className='card_container'>
        <div className='card_header'>
          <span className='card_header_btn' onClick={close_card_handler}><CloseIcon /></span>
        </div>
        <div className='card_body'>
          <div className='card_products_container'>

            {
              local_card_products.map(product => {
                return (
                  <div key={product.id} className='card_product_container'>
                    <div className='card_product_infos'>
                      <img src={product.image} alt='card product' />
                      <div className='card_product_details'>
                        <div className='card_product_title'>{`${product.title}`} <span>x{product.product_count}</span></div>
                        <div className='card_product_price_container'>
                          <div className='card_unit_product_price'>Unit Price: {product.price} $</div>

                          <div className='amount_container'>
                            <button className='increas_btn' onClick={() => increase_decreas_card_product_amount_handler(product, 'plus')}>+</button>
                            {/* <span ref={product_amount_ref} className='product_amount'>{product_amount}</span> */}
                            <input type='number' step={1} min={1} className='product_amount' value={product.product_count} onChange={(e) => change_card_product_amount_handler(product, e)} />
                            <button className='decreas_btn' onClick={() => increase_decreas_card_product_amount_handler(product, 'minus')}>-</button>
                          </div>

                          <div className='card_total_product_price'>Total Price: {(product.price * product.product_count).toFixed(2)} $</div>
                        </div>
                      </div>
                    </div>
                    <div className='remove_product_btn' onClick={() => remove_card_product_handler(product)}><CloseIcon /></div>
                  </div>
                )
              })
            }
          </div>
          {
            local_card_products.length ? (<div className='card_total_price'>Total Price: {total_card_price.toFixed(2)} $</div>) : (<p className='empty_card_message'>Your Cart is Empty.</p>)
          }
        </div>
        
        {
          local_card_products.length ? (<div className='card_btns_container'>
            <button className='card_buy_btn'>Buy Now</button>
          </div>) : ('')
        }

      </div>
    </div>
  )
}
