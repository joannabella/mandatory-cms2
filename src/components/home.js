import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

let API = 'http://localhost:8080/';


function createList(product) {

    return (
        <Link to={'/details/' + product._id} key={product._id}>
            <li className='home-product'>
                <img className='home-product-img' src={API + product.images[0].path} alt=''></img>
                <section className='home-product-details'>
                    <h4 className='home-product-brand'>{product.brand}</h4>
                    <p className='home-product-price'>{product.price} kr</p>
                    <p className='home-product-name'>{product.name}</p>
                </section>
            </li>
        </Link>
    );
}


function Home({ location, history }) {
    const params = new URLSearchParams(location.search);

    const [products, updateProducts] = useState([]);
    const [total, updateTotal] = useState(0);
    const [currentPage, updateCurrentPage] = useState(+params.get('page'));
    const [searchName, updateSearchName] = useState('');
    const [inStock, updateInStock] = useState(JSON.parse(localStorage.getItem('instock') || 'false'));
    localStorage.setItem('instock', JSON.stringify(inStock));

    const perPage = 4;
    const totalPages = Math.ceil(total / perPage);
    const skip = currentPage * perPage;


    function setPage(page) {
        history.push({
            pathname: location.pathname,
            search: '?page=' + page,
        })
        updateCurrentPage(page);
    }

    function nextPage() {
        if (currentPage === totalPages - 1) {
            setPage(0);
        }
        else {
            setPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage === 0) {
            setPage(totalPages - 1);
        }
        else {
            setPage(currentPage - 1);
        }
    }

    useEffect(() => {
        let URL = `${API}api/collections/get/Products?limit=${perPage}&skip=${skip}`;
        if (searchName) {
            URL += '&filter[name][$regex]=' + searchName;
        }
        if (inStock) {
            URL += '&filter[amount_in_stock][$regex]=^[1-9]\\d*$';
        }
        axios
            .get(URL)
            .then(response => {
                updateProducts(response.data.entries);
                updateTotal(response.data.total);
            });
    }, [skip, searchName, inStock]);

    return (
        <div className='Home'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <header className='header'>

            </header>
            <div>
                <div className='search-container'>
                    <input className='searchfield' type='text' name='search' id='search' placeholder='Sök...' onChange={(event) => updateSearchName(event.target.value)} spellCheck='false'></input>
                    <p className='search-instock'>Finns i lager</p>
                    <input className='in-stock-checkbox' type='checkbox' onChange={(event) => updateInStock(event.target.checked)} checked={inStock}></input>
                </div>
            </div>
            <section className='main-section'>
                <ul className='home-products-list'>
                    {products.map(product => {
                        return createList(product);
                    })}
                </ul>
                <button className='backward' onClick={() => previousPage()}><i className="fas fa-chevron-left"></i></button>
                <button className='forward' onClick={() => nextPage()}><i className="fas fa-chevron-right"></i></button>
            </section>
        </div>
    );
}

export default Home;

