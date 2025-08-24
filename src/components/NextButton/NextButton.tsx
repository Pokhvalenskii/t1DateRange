import React from 'react';
import styles from './NextButton.module.scss';

type Direction = 'left' | 'right';

type NextButtonProps = React.ComponentProps<'button'> & {
  handler: () => void;
  direction: Direction;
  size: 'large' | 'small';
};

type BtnIconProps = {
  direction: Direction;
  size: 'large' | 'small';
};

const BtnIcon = ({ direction, size } : BtnIconProps) => {
  if (size === 'large') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        style={{
          transform: direction === 'right' ? 'rotate(180deg)' : 'none',
        }}
      >
        <circle cx="25" cy="25" r="24.5" transform="matrix(-1 0 0 1 50 0)" stroke="#42567A" strokeOpacity="0.5"/>
        <path d="M27.4999 18.75L21.2499 25L27.4999 31.25" stroke="#42567A" strokeWidth="2"/>
      </svg>
    )
  } else if (size === 'small') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="26"
        viewBox="0 0 25 26"
        fill="none"
        style={{
          transform: direction === 'right' ? 'rotate(180deg)' : 'none',
        }}
      >
        <circle cx="12.5" cy="12.5" r="12" transform="matrix(-1 0 0 1 25 0.666718)" stroke="#42567A"
                strokeOpacity="0.5"/>
        <path d="M13.7489 10.0418L10.6239 13.1668L13.7489 16.2918" stroke="#42567A" strokeWidth="2"/>
      </svg>
    )
  }
  return <></>
}

const NextButton = ({handler, direction, size, ...rest}: NextButtonProps) => {
  return (
    <button onClick={handler} className={styles.btn} {...rest} >
      <BtnIcon direction={direction} size={size}/>
    </button>
  );
};

export default NextButton;
