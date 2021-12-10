import styled from 'styled-components';

const Dot = styled.div`
  position: absolute;
  top: 14px;
  left: 11px;
  background: var(--pink);
  color: var(--white);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 1.2rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  user-select: none;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CartCount({ count }) {
  return <Dot>{count}</Dot>;
}
