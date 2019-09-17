import React from 'react'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

let API = 'http://localhost:8080/';

function ShoppingCart(props) {
    const cartItems = props.cart;

    function increase(product) {
        props.dispatch({
            type: 'INCREASE_QUANTITY',
            product: product,
        });
    }

    function decrease(product) {
        props.dispatch({
            type: 'DECREASE_QUANTITY',
            product: product,
        });
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.totalPrice;
    });

    return (
        <div className='cart-background'>
            <div className='cart-container'>
                <Helmet>
                    <title>Varukorg</title>
                </Helmet>
                <span className='cart-container-title'>Varukorg</span>
                <ul className='cart-list'>
                    {cartItems.map((item) => {
                        return (
                            <li className='cart-item' key={item.product._id}>
                                <div className='cart-count'>
                                    <button className='cart-item-increase' onClick={() => increase(item.product)}><i className='fa fa-sort-up'></i></button>
                                    <div className='amount'>{item.quantity}x</div>
                                    <button className='cart-item-decrease' onClick={() => decrease(item.product)}><i className='fa fa-sort-down'></i></button>
                                </div>
                                <img className='cart-img' src={API + item.product.images[0].path} alt=''></img>
                                <div className='cart-info'>
                                    <p className='cart-brand'>{item.product.brand}</p>

                                    <h3 className='cart-name'>{item.product.name}</h3>
                                    <p><span className='cart-price'>{item.quantity} st | {item.totalPrice} kr</span></p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {cartItems.length === 0 ? <div className='cart-container-empty'><p className='cart-empty-message'>Din varukorg är tom...</p></div> : <div className='to-checkout-container'>
                    <div className='cart-totalprice-container'>
                        <p className='cart-totalprice'><strong>Totalsumma:</strong> {totalPrice} kr</p>
                    </div>
                    <Link to='/checkout'><button className='to-checkout-button'>Gå till checkout</button></Link>
                </div>}
            </div>
        </div>
    )
}

export default withRouter(connect(
    (state, props) => {
        return { cart: state, location: props.location };
    }
)(ShoppingCart))