import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

let API = 'http://localhost:8080/';

function CartPreview(props) {
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

    if (props.location.pathname === '/shoppingcart' || props.location.pathname === '/checkout') {
        return '';
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.totalPrice;
    });

    return (
        <div className='preview-container'>
            <span className='preview-container-title'>Varukorg</span>
            <ul className='preview-list'>
                {cartItems.map((item) => {
                    return (
                        <Link to={'/details/' + item.product._id}><li className='preview-item' key={item.product._id}>
                            <div className='preview-count'>
                                <button className='increase' onClick={() => increase(item.product)}><i className='fa fa-sort-up'></i></button>
                                <div className='amount'>{item.quantity}x</div>
                                <button className='decrease' onClick={() => decrease(item.product)}><i className='fa fa-sort-down'></i></button>
                            </div>
                            <img className='preview-img' src={API + item.product.images[0].path} alt=''></img>
                            <div className='preview-info'>
                                <p className='preview-brand'>{item.product.brand}</p>
                                <h3 className='preview-name'>{item.product.name}</h3>
                            </div>
                            <p className='preview-price'><span>{item.totalPrice} kr</span></p>
                        </li>
                        </Link>
                    );
                })}
            </ul>
            {cartItems.length === 0 ? <p className='preview-empty-message'>Din varukorg är tom...</p> : <div className='to-cart-container'>
                <div className='preview-totalprice-container'>
                    <p className='preview-totalprice'><strong>Totalsumma:</strong> {totalPrice} kr</p>
                </div>
                <Link to='/shoppingcart'><button className='to-cart-button'>Till varukorgen</button></Link>
            </div>}
        </div>
    )
}

export default withRouter(connect(
    (state, props) => {
        return { cart: state, location: props.location };
    }
)(CartPreview))
