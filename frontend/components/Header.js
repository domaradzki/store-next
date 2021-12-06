import Link from 'next/link';
import styled from 'styled-components';
import { ShoppingCart, Person, Favorite } from '@styled-icons/material';
import Logo from '../public/static/images/logo.svg';

import Cart from './Cart';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import { useUser } from './User';

import Nav from './Nav';
import Search from './Search';

const StyledHeader = styled.header`
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
  .sub-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    align-self: stretch;
    margin: 0;
  }
  .menu-bar {
    border-bottom: 2px solid var(--lightBlack, black);
  }
  .search-bar {
    margin-top: 10px;
  }
  .logo {
    width: 200px;
    flex: none;
    order: 0;
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
        <div className="sub-bar">
          <div className="logo">
            <Logo />
          </div>
          <div className="action-items">
            {user && (
              <>
                <button className="btn" type="button">
                  <Favorite size="32" color="#03120e" title="Ulubione" />
                </button>
                <button className="btn" type="button">
                  <Person size="32" color="#03120e" title="Profil" />
                </button>
                {/* <SignOut /> */}

                <button className="btn" type="button" onClick={openCart}>
                  <ShoppingCart size="32" color="#03120e" title="Koszyk" />
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
        <div className="sub-bar menu-bar">
          <Nav />
        </div>
        <div className="sub-bar search-bar">
          <div>
            <Nav />
          </div>
          <Search />
        </div>
      </div>
      <Cart />
    </StyledHeader>
  );
}
