import Link from 'next/link';
import { ShoppingCart, Person, Favorite } from '@styled-icons/material';
import { useState } from 'react';
import Logo from '../public/static/images/logo.svg';

import Cart from './Cart';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import { useUser } from './User';

import Nav from './Nav';
import Search from './Search';
import ButtonsHints from './ButtonsHints';
import HeaderStyles from './styles/HeaderStyles';
import LoginRegisterModule from './LoginRegisterModule';

export default function Header() {
  const [openHints, setOpenHints] = useState(true);
  const [module, setModule] = useState(null);

  const user = useUser();
  const { openCart } = useCart();
  const count = user?.cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <HeaderStyles>
      <div className="bar">
        <div className="sub-bar">
          <div className="logo">
            <Logo />
          </div>
          <div className="account-items">
            <button
              className="btn"
              type="button"
              onMouseEnter={() => setOpenHints(false)}
              onFocus={() => setOpenHints(false)}
              onMouseLeave={() => setOpenHints(true)}
            >
              <Favorite size="32" color="var(--blue)" title="Ulubione" />
            </button>
            <button
              className="btn"
              type="button"
              onMouseEnter={() => setOpenHints(false)}
              onFocus={() => setOpenHints(false)}
              onMouseLeave={() => setOpenHints(true)}
            >
              <Person size="32" color="var(--blue)" title="Profil" />
            </button>

            <button
              className="btn"
              type="button"
              onClick={openCart}
              onMouseEnter={() => setOpenHints(false)}
              onFocus={() => setOpenHints(false)}
              onMouseLeave={() => setOpenHints(true)}
            >
              <ShoppingCart size="32" color="var(--blue)" title="Koszyk" />
              {!!count && <CartCount count={count} />}
            </button>

            {/* {!user && (
              <>
                <Link href="/signin">Sign In</Link>
              </>
            )} */}
            <ButtonsHints
              className={openHints && 'hidden-buttons'}
              onMouseEnter={() => setOpenHints(false)}
              onFocus={() => setOpenHints(false)}
              onMouseLeave={() => setOpenHints(true)}
              setModule={(e) => setModule(e)}
            />
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
      <LoginRegisterModule module={module} />
    </HeaderStyles>
  );
}
