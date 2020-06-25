import React, { Component } from 'react'
import '../help.css';
import faqimg from './faq.png';

export default class Faqs extends Component {
    render() {
        return (
            <div>
                <h1 className="title-right">FAQs</h1>
                <img className="faq-img" src={faqimg}></img>
                <div>
                    <ul>
                        <li className="list-faq">
                            <h2 className="faq-que">Languages Used</h2>
                            <p className="faq-ans">hang of Slim for compiling into HTML, but someday I'll use it since its syntax complimen</p>
                        </li>
                        <li className="list-faq">
                            <h2 className="faq-que">How it Works</h2>
                            <p className="faq-ans"> use, as demonstrated here, is an ia queries are used to make the element responsive to different screen sizes.</p>
                        </li>
                        <li className="list-faq">
                            <h2 className="faq-que">Points of Interest</h2>
                            <p className="faq-ans">By making the open state default for when </p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
