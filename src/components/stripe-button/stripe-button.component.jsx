import React from 'react';
import StripeCheckout from 'react-stripe-checkout'; 

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; 
    const publishablekey = 'pk_test_Tvynk1W0EzOarkin0Qss8p1l';
    const onToken = token => {
        console.log(token); 
        alert("Payment Successful"); 
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/Cuz/svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton; 