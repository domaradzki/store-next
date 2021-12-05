import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--pink);
  background: ${(props) => (props.highlighted ? '#03120e4d' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px var(--pink);
  }

  to {
    box-shadow: 0 0 5px 1px var(--pink);
  }
`;

const SearchStyles = styled.div`
  position: relative;
  .search-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    color: var(--lightBlack);
  }

  input {
    width: 100%;
    padding: 10px 10px 10px 35px;
    border: 0;
    font-size: 1.3rem;
    border: 1px solid var(--lightBlack);
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
