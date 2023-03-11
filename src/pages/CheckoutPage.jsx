import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Checkout } from '.';

const CheckoutPage = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <main>
      <PageHero title={'checkout'}></PageHero>
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link to={'/products'} className='btn'>
              Fill cart
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content: center;
.empty{
  text-align:center;
}
`;
export default CheckoutPage;
