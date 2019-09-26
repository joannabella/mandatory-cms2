import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import avatar from '../undraw_destinations_fpv7 copy.svg'
import Confirm from '../components/confirm';
import axios from 'axios';

let API = 'http://localhost:8080/';

function Checkout(props) {
    const cartItems = props.cart;
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.totalPrice;
    });

    const products = cartItems.map((item) => {
        return { 'value': { name: item.product.name, totalPrice: item.totalPrice, quantity: item.quantity } };
    })

    const [hasCheckedOut, updatehasCheckedout] = useState(false);
    const [order, updateOrder] = useState({ name: '', address: '', total_price: totalPrice, products: products });

    function clearShoppingCart(event) {
        event.preventDefault();

        props.dispatch({
            type: 'EMPTY_CART',
        })
        updatehasCheckedout(true);
    }

    function createOrder(event) {
        event.preventDefault();
        let URL = `${API}api/collections/save/Orders`;
        axios
            .post(URL, { data: order })
            .then((response) => {
                clearShoppingCart(event);
            })
    }

    function updateOrderKey(key, event) {
        order[key] = event.target.value;
        updateOrder(order);
    }

    return (
        <div className='checkout-container'>
            <img className='checkout-avatar' src={avatar}></img>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <form className='checkout-form' onSubmit={(event) => createOrder(event)}>
                {hasCheckedOut ? <Confirm /> : ''}
                {!hasCheckedOut ?
                    <>
                        <h2 className='checkout-form-title'>Checkout</h2>
                        <label className='checkout-name-label' htmlFor='entername'>För och efternamn<span className='checkout-star'>*</span></label> <br />
                        <input className='checkout-name-userfield' name='entername' type='text' name='name' spellCheck='false' autoComplete='off' required='required' onChange={(event) => updateOrderKey('name', event)}></input> <br />

                        <label className='checkout-email-label' htmlFor='enteremail'>Email<span className='checkout-star'>*</span></label> <br />
                        <input className='checkout-email-userfield' name='enteremail' type='text' name='email' spellCheck='false' autoComplete='off' required='required' onChange={(event) => updateOrderKey('email', event)}></input> <br />

                        <label className='checkout-adress-label' htmlFor='enteradress'>Gatuadress<span className='checkout-star'>*</span></label> <br />
                        <input className='checkout-adress-userfield' name='enteradress' type='text' name='adress' spellCheck='false' autoComplete='off' required='required' onChange={(event) => updateOrderKey('address', event)}></input> <br />
                        <span className='checkout-error'></span>

                        <button className='checkout-button' type='submit'>Genomför köp</button>
                    </>
                    : ''}
            </form>
        </div >
    )
}

export default connect(
    (state, props) => {
        return { cart: state, location: props.location };
    },
    dispatch => ({ dispatch })
)(Checkout);