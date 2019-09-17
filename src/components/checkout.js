import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import avatar from '../undraw_destinations_fpv7 copy.svg'
import Confirm from '../components/confirm';

function Checkout(props) {
    const [hasCheckedOut, updatehasCheckedout] = useState(false);

    function clearShoppingCart(event) {
        event.preventDefault();

        props.dispatch({
            type: 'EMPTY_CART',
        })
        updatehasCheckedout(true);
    }

    return (
        <div className='checkout-container'>
            <img className='checkout-avatar' src={avatar}></img>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <form className='checkout-form' onSubmit={(event) => clearShoppingCart(event)}>
                {hasCheckedOut ? <Confirm /> : ''}
                {!hasCheckedOut ?
                    <>
                        <h2 className='checkout-form-title'>Checkout</h2>
                        <label className='checkout-name-label' htmlFor='entername'>För och efternamn<span className='checkout-star'>*</span></label> <br />
                        <input className='checkout-name-userfield' name='entername' type='text' name='name' spellCheck='false' autoComplete='off' required='required'></input> <br />

                        <label className='checkout-email-label' htmlFor='enteremail'>Email<span className='checkout-star'>*</span></label> <br />
                        <input className='checkout-email-userfield' name='enteremail' type='text' name='email' spellCheck='false' autoComplete='off' required='required'></input> <br />

                        <label className='checkout-adress-label' htmlFor='enteradress'>Gatuadress<span className='checkout-star'>*</span></label> <br />
                        <input className='checkout-adress-userfield' name='enteradress' type='text' name='adress' spellCheck='false' autoComplete='off' required='required'></input> <br />
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