import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  align-items: center;
  font-size: 1.5rem;
  a,
  button {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.3rem;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:active {
      font-weight: 700;
    }
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1280px) {
    width: 100%;
    font-size: 1.5rem;
    padding: 20px;
  }
`;

export default NavStyles;
