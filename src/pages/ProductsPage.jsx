import React, { useEffect } from 'react';
import styled from 'styled-components';
import { loadProducts } from '../features/products/filtersSlice';
import { Filters, ProductList, Sort, PageHero } from '../components';
import { useSelector, useDispatch } from 'react-redux';
const ProductsPage = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProducts(products));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <main>
      <PageHero title={'products'} />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
