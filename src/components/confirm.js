import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

function Confirm() {
    return (
        <div className='confirm-container'>
            <Helmet>
                <title>Confirm</title>
            </Helmet>
            <h4 className='confirm-title'>Orderbekfräftelse</h4>
            <p>Hej,</p>
            <p>Tack för din beställning!</p>
            <p>Vi skickar ett mail när ditt paket är påväg.</p>
            <p className='confirm-regards'>Mvh, kundservice.</p>
        </div>
    )
}

export default Confirm;
