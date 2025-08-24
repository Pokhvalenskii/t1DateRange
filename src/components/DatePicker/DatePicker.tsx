import React, { useEffect, useRef, useState } from 'react';
import styles from './DatePicker.module.scss';
import { gsap } from "gsap";
import { EventBlock } from '../../types/events';

type DatePickerProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: EventBlock[]
} & React.ComponentProps<'div'>;

type AnimatedNumberProps = {
  value: number;
  duration?: number;
};

type CircleWithButtonsProps = {
  segments: number;
  size: number;
  selectedSegment: number;
  setSelectedSegment: React.Dispatch<React.SetStateAction<number>>;
}

const CircleWithButtons = ({ segments, size, selectedSegment, setSelectedSegment }: CircleWithButtonsProps) => {
  const radius = size / 2;
  const buttonSize = 56;
  const circleRef = useRef<HTMLDivElement>(null);
  const angles = Array.from({ length: segments }, (_, i) => (i * 360) / segments);
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    if (!circleRef.current) return;

    const activeAngle = (selectedSegment - 1) * (360 / segments);
    const targetAngle = 130;
    let newRotation = targetAngle - activeAngle - 90;

    gsap.to(circleRef.current, {
      rotate: newRotation,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        const progress = gsap.getProperty(circleRef.current, "rotate") as number;
        setCurrentRotation(progress);
      }
    });
  }, [selectedSegment, segments]);

  const handleEnter = (el: any, isActive: boolean) => {
    if (isActive) return;
    gsap.to(el, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      background: "#F4F5F9",
      transform: `rotate(${-currentRotation}deg) scale(1)`,
    });
    gsap.to(el.querySelector("span"), {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (el: any, isActive: boolean) => {
    if (isActive) return;
    gsap.to(el, {
      scale: .15,
      duration: 0.3,
      ease: "power2.in",
      background: "rgb(var(--Black-blue))",
      transform: `rotate(${-currentRotation}deg) scale(.15)`,
    });
    gsap.to(el.querySelector("span"), {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={circleRef}
      className={styles.circle}
      style={{
        width: size,
        height: size,
      }}
    >
      {angles.map((angle, idx) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const x = radius + Math.cos(rad) * radius;
        const y = radius + Math.sin(rad) * radius;
        const isActive = idx + 1 === selectedSegment;

        return (
          <button
            key={idx}
            className={styles.button}
            style={{
              width: buttonSize,
              height: buttonSize,
              left: x - buttonSize / 2,
              top: y - buttonSize / 2,
              transform: isActive
                ? `rotate(${-currentRotation}deg) scale(1)`
                : `rotate(${-currentRotation}deg) scale(.15)`,
              background: isActive ? "#F4F5F9" : "rgb(var(--Black-blue))",
            }}
            onMouseEnter={(e) => handleEnter(e.currentTarget, isActive)}
            onMouseLeave={(e) => handleLeave(e.currentTarget, isActive)}
            onClick={() => setSelectedSegment(idx + 1)}
          >
            <span style={{ opacity: isActive ? 1 : 0 }}>{idx + 1}</span>
          </button>
        );
      })}
    </div>
  );
};

const AnimatedNumber = ({ value, duration = 1 }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const obj = useRef({ val: value });

  useEffect(() => {
    gsap.to(obj.current, {
      val: value,
      duration,
      ease: "power1.inOut",
      onUpdate: () => {
        setDisplayValue(Math.round(obj.current.val));
      },
    });
  }, [value, duration]);

  return <>{displayValue}</>;
};

const DatePicker = ({ step, setStep, data, ...rest }: DatePickerProps) => {
  return (
    <div className={styles.container} {...rest}>
      <CircleWithButtons
        size={530}
        segments={data.length}
        selectedSegment={step}
        setSelectedSegment={setStep}
      />
      <div className={styles.container__calendar}>
        <p className={styles.container__date}>
         <span className={styles.container__date_start}>
          <AnimatedNumber value={data[step - 1].start} duration={1.5}/>
          </span>
          <span className={styles.container__date_end}>
            <AnimatedNumber value={data[step - 1].end} duration={1.5}/>
          </span>
        </p>
      </div>
    </div>
  );
};

export default DatePicker;
