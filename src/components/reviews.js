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
    const [newReview, updateNewReview] = useState({ title: '', body: '', rating: '', product: { _id: match.params.id, link: 'Products', display: match.params.name } });

    useEffect(() => {
        axios
            .get(API + 'api/collections/get/Reviews?filter[product._id]=' + match.params.id)
            .then(response => {
                updateReviews(response.data.entries);
            });
    }, []);


    function createReview(event) {
        event.preventDefault();
        let URL = `${API}api/collections/save/Reviews`;
        axios
            .post(URL, { data: newReview })
            .then((response) => {
                updateReviews([...reviews, newReview]);
                updateNewReview(Object.assign({}, newReview, {
                    title: '',
                    body: '',
                    rating: ''
                }))
            })
    }

    function updateReviewKey(key, event) {
        const clone = { ...newReview };
        clone[key] = event.target.value;
        updateNewReview(clone);
    }

    return (
        <div className='reviews-container'>
            <form className='review-form' onSubmit={(event) => createReview(event)}>
                <h2 className='review-form-title'>Omdöme</h2>

                <label className='review-label' htmlFor='entertitle'>Titel<span className='review-star'>*</span></label> <br />
                <input className='review-userfield' name='entertitle' type='text' spellCheck='false' autoComplete='off' required='required' value={newReview.title} onChange={(event) => updateReviewKey('title', event)}></input> <br />

                <label className='review-label' htmlFor='enterbody'>Kommentar<span className='review-star'>*</span></label> <br />
                <textarea className='review-textarea' name='enterbody' type='text' spellCheck='false' autoComplete='off' required='required' value={newReview.body} onChange={(event) => updateReviewKey('body', event)}></textarea> <br />

                <label className='review-label' htmlFor='enterrating'>Betyg<span className='review-star'>*</span></label> <br />
                <input className='review-userfield' name='enterrating' type='number' min='1' max='5' spellCheck='false' autoComplete='off' required='required' value={newReview.rating} onChange={(event) => updateReviewKey('rating', event)}></input> <br />

                <span className='review-error'></span>

                <button className='review-button' type='submit'>Skicka</button>
            </form>
            <ul className='reviews-list'>
                {reviews.map((review) => {
                    return createList(review);
                })}
            </ul>
        </div>
    )
}

export default Reviews
