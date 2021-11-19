import Link from 'next/link';
import styled from 'styled-components';
import Logo from '../public/static/images/logo.svg';
import CartImage from '../assets/images/cart.svg';
import Person from '../assets/images/person.svg';
import Heart from '../assets/images/heart.svg';

import Cart from './Cart';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import { useUser } from './User';

import Nav from './Nav';
import Search from './Search';

const StyledHeader = styled.header`
  border-bottom: 2px solid var(--black, black);
  display: flex;
  flex-direction: column;
  align-items: center;
  .bar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin-top: 30px;
    max-width: 1280px;
    width: 100%;
  }
  .account-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    margin: 20px 0;
  }
  .menu-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    margin: 5px 0%;
  }
  .logo {
    width: 250px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0 30px;
  }
  .account-items {
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0 500px;
  }
  .btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    margin-right: 10px;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

export default function Header() {
  const user = useUser();
  const { openCart } = useCart();
  const count = user?.cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  return (
    <StyledHeader>
      <div className="bar">
        <div className="account-bar">
          <div className="logo">
            <Logo />
          </div>
          <div className="action-items">
            {user && (
              <>
                <button className="btn" type="button">
                  <Heart />
                </button>
                <button className="btn" type="button">
                  <Person />
                </button>
                {/* <SignOut /> */}
                <button className="btn" type="button" onClick={openCart}>
                  <CartImage />
                  {!!count && <CartCount count={count} />}
                </button>
              </>
            )}
            {!user && (
              <>
                <Link href="/signin">Sign In</Link>
              </>
            )}
          </div>
        </div>
        <div className="menu-bar">
          <Nav />
        </div>
      </div>
      {/* <div className="sub-bar">
        <Search />
      </div> */}
      <Cart />
    </StyledHeader>
  );
}
