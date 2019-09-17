import React, { useState, useEffect } from 'react';
import axios from 'axios';

let API = 'http://localhost:8080/';

function createList(review) {

    return (
        <li className='single-review' key={review._id}>
            <h5 className='review-title'>{review.title}</h5>
            <p className='review-rating'>{review.rating}</p>
            <p className='review-body'>{review.body}</p>
        </li>
    );
}

function Reviews({ match }) {
    const [reviews, updateReviews] = useState([]);

    useEffect(() => {
        axios
            .get(API + 'api/collections/get/Reviews?filter[product._id]=' + match.params.id)
            .then(response => {
                updateReviews(response.data.entries);
            });
    }, []);

    return (
        <div className='reviews-container'>
            <ul className='reviews-list'>
                {reviews.map((review) => {
                    return createList(review);
                })}
            </ul>
        </div>
    )
}

export default Reviews
