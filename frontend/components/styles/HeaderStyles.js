import styled from 'styled-components';

const HeaderStyles = styled.header`
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
    border-bottom: 1px solid var(--lightBlack, black);
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
    position: relative;
  }
  .hidden-buttons {
    visibility: hidden;
    opacity: 0;
    transform: translateY(8px);
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

export default HeaderStyles;
