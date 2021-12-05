import styled from 'styled-components';

const ItemStyles = styled.div`
  background: var(--white);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 400px;
  .item-image {
    width: 100%;
    user-select: none;
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
  }
  h4 {
    text-transform: uppercase;
    padding: 0 1rem;
    line-height: 1.2;
    font-weight: 700;
    flex-grow: 1;
    font-size: 1.2rem;
    color: var(--lightBlack);
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightBlue);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: var(--lightBlue);
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default ItemStyles;
