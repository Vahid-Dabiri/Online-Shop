import React from 'react';
import { counters } from '../../Data';
import CountUp from 'react-countup';
import './About.css';

export default function About() {
    return (
        <main>
            <h1 className='page_title'>About Us</h1>
            <section className='desc_container'>
                <img src='./images/0001.jpg' alt='about' />
                <p className='about_desc'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum alias, explicabo eum architecto, rem, reprehenderit
                    quam voluptatem iste quis vel ut nesciunt nostrum! Nobis exercitationem quas facilis magnam quaerat incidunt delectus
                    provident magni, est pariatur placeat impedit sed iure facere, hic asperiores animi explicabo molestiae praesentium
                    fugit doloremque? Labore nemo molestias cumque consectetur. Repellat obcaecati, labore, suscipit cum illo officiis
                    accusantium dignissimos, dolores similique optio sunt et sequi. Illo possimus nemo laudantium dignissimos quos expedita
                    est esse aperiam magnam maxime qui nostrum minima iusto numquam earum reiciendis, asperiores nesciunt autem, consequuntur
                    labore nihil molestias amet impedit. Laudantium labore minus ipsam unde ullam deserunt atque maiores vel fugiat, pariatur
                    magnam voluptas incidunt eligendi impedit dolore itaque! Tempora praesentium eum quos magnam veniam esse et debitis
                    ducimus, nihil nesciunt quam. Cum iure repudiandae, eligendi ipsam ducimus eveniet illo recusandae quam non quas
                    asperiores ullam natus dignissimos earum fuga totam libero adipisci quia, deserunt quasi, unde aspernatur.
                </p>
            </section>

            <section className='counters_container'>
                {
                    counters.map((item, index) => (
                        <div className='counter' key={index}>
                            <span className='counter_amount'>
                                <CountUp
                                    end={item.counter}
                                    duration={3}
                                    separator=" "
                                    enableScrollSpy={true}
                                    scrollSpyDelay={1}
                                />
                            </span>
                            <span className='counter_title'>{item.title}</span>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}
