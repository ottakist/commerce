import React from 'react'
import styled from 'styled-components'
import { PageHero} from '../components'

import { Link } from 'react-router-dom'
import { Checkout } from '.'

const CheckoutPage = () => {
  return <main><PageHero title={"checkout"}></PageHero>
  <Wrapper className='page'>
    <h1>Checkout</h1>
    </Wrapper>
    </main>
}
const Wrapper = styled.div``
export default CheckoutPage
