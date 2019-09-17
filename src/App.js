import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './components/home';
import Details from './components/details';
import ShoppingCart from './components/shoppingCart';
import CartPreview from './components/cartPreview';
import Checkout from './components/checkout';
import './App.css';
import { Provider } from 'react-redux';
import Store from './store';


function App() {
  const [showPreview, updateShowPreview] = useState(false);

  return (
    <Provider store={Store}>
      <Router>
        <div className='App'>
          <nav className='nav'>
            <Link to='/' className='home-link'>Hem</Link>
            <div className='shoppingcart-container' onMouseEnter={() => updateShowPreview(true)} onMouseLeave={() => updateShowPreview(false)}>
              <Link to='/shoppingcart' className='shoppingcart-link'><i className="fas fa-shopping-cart"></i> Varukorg</Link>
              {showPreview ? <CartPreview /> : ''}
            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route path='/details/:id' component={Details} />
          <Route path='/shoppingcart' component={ShoppingCart} />
          <Route path='/checkout' component={Checkout} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
