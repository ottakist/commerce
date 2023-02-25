import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';

import Product from './Product';

const FeaturedProducts = () => {
  const { featuredProducts, isLoading, products_error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  {
    if (isLoading) {
      <Loading />;
    }
  }
  {
    if (products_error) {
      <Error />;
    }
  }
  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>featured products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {/* Add slider later */}
        {featuredProducts.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
