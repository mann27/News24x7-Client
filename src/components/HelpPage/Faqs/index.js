import React, { Component } from 'react'
import '../help.css';
import faqimg from './faq.png';

export default class Faqs extends Component {
    render() {
        return (
            <div>
                <h1 className="title-right">FAQs</h1>
                <img className="faq-img" src={faqimg}></img>
                <p>Stuck up somewhere? Need the help of our developers? Feel free to contact anyone from the developers tema. For any queries just drop a mail at:
sengrp3@gmail.com </p>
                <div>
                    <ul>
                        <li className="list-faq">
                            <h2 className="faq-que">Do I need to login to use the application?</h2>
                            <p className="faq-ans">You need to login to create a post or upvote, downvote or comment on anything. Without logging in you can view the general feed.</p>
                        </li>
                        <li className="list-faq">
                            <h2 className="faq-que">What should I do if I find any post abusive or against someone?</h2>
                            <p className="faq-ans"> You can report the post and it will be taken into consideration by the admin if it is necessary to report the post.</p>
                        </li>
                        <li className="list-faq">
                            <h2 className="faq-que">Can I post something which is articulated by me?</h2>
                            <p className="faq-ans">No, you just have to post the link of an article with its title, any relevant image and its corresponding tags.</p>
                        </li>
                        <li className="list-faq">
                            <h2 className="faq-que">Whom should I contact in case of any queries?</h2>
                            <p className="faq-ans"> The email-id of the developers team is given on the contact us page. You can drop an email in case of any queries.</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
