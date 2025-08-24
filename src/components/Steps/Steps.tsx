import React from 'react';
import styles from './Steps.module.scss';
import NextButton from '../NextButton/NextButton';
import { EventBlock } from '../../types/events';

type StepsProps = React.ComponentProps<'div'> & {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
  data: EventBlock[],
};

type CounterProps = React.ComponentProps<'p'> & {
  selected: number,
  total: number
};

const Counter = ({ selected, total, className, ...rest } : CounterProps) => {
  return (
    <p className={className}>{`${String(selected).padStart(2,'0')}/${String(total).padStart(2,'0')}`}</p>
  )
}

const Steps = ({step, setStep, data, ...rest}: StepsProps) => {
  return (
    <div className={styles.steps} {...rest}>
      <Counter selected={step} total={6} className={styles.steps__counter}/>
      <div className={`${styles.steps__buttons} ${styles.steps__buttons_desktop}`}>
        <NextButton
          direction={'left'}
          size={'large'}
          handler={() => setStep(prev => prev === 1 ? 1 : prev - 1)}/>
        <NextButton
          direction={'right'}
          size={'large'}
          handler={() => setStep(prev => prev === 6 ? 6 : prev + 1)}/>
      </div>
      <div className={`${styles.steps__buttons} ${styles.steps__buttons_mobile}`}>
        <NextButton
          direction={'left'}
          size={'small'}
          handler={() => setStep(prev => prev === 1 ? 1 : prev - 1)}/>
        <NextButton
          direction={'right'}
          size={'small'}
          handler={() => setStep(prev => prev === 6 ? 6 : prev + 1)}/>
      </div>
      <div className={styles.steps__pagination}>

      </div>
    </div>
  );
};

export default Steps;
