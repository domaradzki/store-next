import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background: var(--blue);
  color: var(--white);
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 1.2rem;
  min-width: 2rem;
  margin-left: 1.2rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  user-select: none;
`;

const AnimationStyles = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .cont-exit-active {
    transform: scale(4) rotateX(0.5turn);
    background: var(--dark);
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmontOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
