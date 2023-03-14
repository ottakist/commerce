import React, { useState } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

const ProductImages = ({ images = [{ url: '' }] }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [id, setId] = useState(images.indexOf(mainImage));

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setId((prev) => (prev < images.length - 1 ? prev + 1 : (prev = 0)));
      setMainImage(images[id]);
    },
    onSwipedRight: () => {
      setId((prev) => (prev > 0 ? prev - 1 : (prev = images.length - 1)));
      setMainImage(images[id]);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <Wrapper>
      <img
        className='main'
        {...handlers}
        src={mainImage.url}
        alt={mainImage.filename}
      />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt=''
              className={image.url === mainImage.url ? 'active' : null}
              onClick={() => setMainImage(images[index])}
              key={image.id}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
