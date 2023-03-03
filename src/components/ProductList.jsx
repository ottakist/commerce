import React from 'react';
import GridView from './GridView';
import ListView from './ListView';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const {
    filtered_products: products,
    grid_view,
    list_view,
  } = useSelector((state) => state.filters);
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry,no products matched your search...
      </h5>
    );
  }
  return (
    <>
      {grid_view && <GridView products={products} />}
      {list_view && <ListView products={products} />}
    </>
  );
};

export default ProductList;
