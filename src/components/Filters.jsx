import React, { useState } from 'react';
import styled from 'styled-components';
// import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateFilters, clearFilters } from '../features/products/filtersSlice';
const Filters = () => {
  const {
    all_products,
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
  } = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  return (
    <Wrapper>
      <div className='content'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className='form-control'>
            <input
              type='text'
              name='text'
              className='search-input'
              placeholder='search'
              value={text}
              onChange={(e) =>
                dispatch(
                  updateFilters({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>
          <div className='form-control'>
            <h5>category</h5>
            <div className='categories'>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      c === category.toLowerCase() ? 'active' : null
                    }`}
                    type='button'
                    name='category'
                    onClick={(e) => {
                      dispatch(
                        updateFilters({ name: e.target.name, value: c })
                      );
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='company'
              id='company'
              className='company'
              value={company}
              onChange={(e) =>
                dispatch(
                  updateFilters({ name: e.target.name, value: e.target.value })
                )
              }
            >
              {companies.map((c, index) => {
                return (
                  <option value={c} key={index}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name='color'
                      value='all'
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                      onClick={(e) => {
                        dispatch(
                          updateFilters({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        );
                      }}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    value={c}
                    onClick={(e) => {
                      dispatch(
                        updateFilters({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      );
                    }}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>Price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              value={price}
              onChange={(e) =>
                dispatch(
                  updateFilters({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={(e) =>
                dispatch(
                  updateFilters({
                    name: e.target.name,
                    value: e.target.checked,
                  })
                )
              }
            />
          </div>
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFilters())}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
  @media (max-width: 768px) {
    .categories {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .categories button {
      margin-right: 10px;
    }

    .clear-btn {
      margin: 0.25rem auto;
    }
  }
`;

export default Filters;
