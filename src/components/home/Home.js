import { React, useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { categories } from '../../Data';
import { Link } from 'react-router-dom';
import ProductCard from '../templates/product_card/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import './Home.css'

export default function Home() {
    const [new_arrival, set_new_arrival] = useState([])


    const get_data_func = async () => {
        await fetch('https://fakestoreapi.com/products?limit=10')
            .then(res => res.json())
            .then(data => {
                set_new_arrival(data);
            });
    }

    useEffect(() => {
        get_data_func();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            <section className='home_banner_section'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide className='swiper_slide'>
                        <img src='./images/0001.jpg' alt='fashion' />
                    </SwiperSlide>
                    <SwiperSlide className='swiper_slide'>
                        <img src='./images/0002.jpg' alt='fashion' />
                    </SwiperSlide>
                    <SwiperSlide className='swiper_slide'>
                        <img src='./images/0003.jpg' alt='fashion' />
                    </SwiperSlide>
                </Swiper>

                <div className='small_banners_container'>
                    <img src='./images/0002.jpg' alt='small' />
                    <img src='./images/0003.jpg' alt='small' />
                </div>
            </section>

            <section className='categories_container'>
                {categories.map((category, index) => (
                    <Link key={index} to={`/shop/${category.title}`}>
                        <div className='category_container'>
                            <img src={category.image} alt='category' />
                            <h2 className='category_link'>{category.title}</h2>
                        </div>
                    </Link>
                ))}
            </section>

            <section className='events_section'>
                <img src='./images/0004.jpg' alt='autumn event' />
                <img src='./images/0005.jpg' alt='autumn event' />
            </section>

            <section className='new_arrival'>
                <div className='title_container'>
                    <h2 className='section_title'>New Arrival</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Id reiciendis sunt eum, nam perspiciatis facere
                    </p>

                    <Link to='/shop'>All Products</Link>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        "delay": 5000,
                        "disableOnInteraction": false
                    }}
                    navigation
                >
                    {
                        new_arrival.map(product => (

                            <SwiperSlide key={product.id} className='swiper_slide_product'>
                                <ProductCard {...product} />
                            </SwiperSlide>

                        ))
                    }
                </Swiper>
            </section>
            <section className='offers_section'>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        "delay": 5000,
                        "disableOnInteraction": false
                    }}
                    navigation
                >
                    {
                        new_arrival.map(product => (

                            <SwiperSlide key={product.id} className='swiper_slide_product'>
                                <div className='offer_amount'>50%</div>
                                <ProductCard {...product} />
                            </SwiperSlide>

                        ))
                    }
                </Swiper>

                <div className='title_container'>
                    <h2 className='section_title'>UP TO 50%</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Id reiciendis sunt eum, nam perspiciatis facere
                    </p>

                    <Link to='/shop'>All Products</Link>
                </div>
            </section>

        </main>
    )
}
