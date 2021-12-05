import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  color: var(--lightBlue);
  user-select: none;
  & > * {
    margin: 0;
    padding: 15px 30px;
    color: var(--lightBlue);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: var(--lightBlue);
    pointer-events: none;
  }
`;

export default PaginationStyles;
