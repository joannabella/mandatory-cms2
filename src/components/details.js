import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Store from '../store';
import Reviews from './reviews';

let API = 'http://localhost:8080/';


function Details({ match }) {
    const [product, updateProduct] = useState(null);
    const [quantity, updateQuantity] = useState(1);
    const [carouselIndex, updateCarouselIndex] = useState(0);


    useEffect(() => {
        axios
            .get(API + 'api/collections/get/Products?filter[_id]=' + match.params.id)
            .then(response => {
                updateProduct(response.data.entries[0]);
            });
    }, []);

    function addProduct() {
        Store.dispatch({
            type: 'ADD_ITEM',
            product: product,
            quantity: parseInt(quantity),
        })
    }

    function createList(product) {

        return (
            <li key={product._id} className='product-listimage'>
                <div className='product-small-imgs'>
                    {product.images.map((image, idx) => {
                        return <img className='product-img' src={API + image.path} key={image.path} onMouseOver={() => updateCarouselIndex(idx)}></img>
                    })}
                </div>
                <img className='product-big-img' src={API + product.images[carouselIndex].path} />
            </li>
        );
    }

    if (!product) {
        return <></>;
    }

    return (
        <div className="container">
            <Helmet>
                <title>Details</title>
            </Helmet>
            <div className="product-container">
                <div className='product-info'>

                </div>
                <div className='product-img-list'>
                    <div>
                        {createList(product)}
                    </div>
                </div>
                <section className='product-details'>
                    <h3 className='product-brand'>{product.brand}</h3>
                    <p className='product-name'>{product.name}</p>
                    <p className='product-price'>{product.price} kr</p>
                    <img className='product-img-color' src={API + product.images[0].path} key={product.path}></img>
                    <span className='small-img-text'>{product.color}</span>
                    <p className='product-instock'>I lager: {product.amount_in_stock}</p>
                    <p className='product-description'><strong>Beskrivning</strong> <br /><br /> {product.description}</p>
                    <input className='product-amount-select' onChange={(event) => updateQuantity(event.target.value)} value={quantity}></input>
                    <button className='add-to-basket' onClick={() => addProduct()}>Lägg i varukorg</button>
                </section>
            </div>
            <Reviews match={match} />
        </div>
    );
}

export default Details;


