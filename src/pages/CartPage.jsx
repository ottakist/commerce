import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';
import { useDispatch } from 'react-redux';
import { calculateTotals } from '../features/cart/cartSlice';
const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals());
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/products' className='btn'>
            fill cart
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title={'Cart'} />
      <Wrapper>
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
