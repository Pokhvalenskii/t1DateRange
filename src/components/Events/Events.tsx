import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Steps from '../Steps/Steps';
import SimpleCard from '../SimpleCard/SimpleCard';
import 'swiper/css';
import 'swiper/css/navigation';
import { gsap } from "gsap";
import styles from './Events.module.scss';

import { EventBlock } from '../../types/events';

type EventsProps = React.ComponentProps<'div'> & {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: EventBlock[];
};

type ArrowProps = React.ComponentProps<'div'> & {
  left?: boolean;
}

type PaginationProps = React.ComponentProps<'div'> &  {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: EventBlock[];
};

const Arrow = ({ left }: ArrowProps) => {
  return (
    <div className={styles.arrowContainer}>
      <svg className={`${styles.arrow} ${left ? styles.arrow_left : styles.arrow_right}`}
           xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2"/>
      </svg>
    </div>
  )
}

const Pagination = ({ step, setStep, data }: PaginationProps) => {
  const count = data.length;

  return (
    <div className={styles.pagination}>
      {Array.from({ length: count }).map((_, index) => {
        const active = index + 1 === step;
        return (
          <div
            key={index}
            className={`${styles.dot} ${active ? styles.active : ""}`}
            onClick={() => setStep(index + 1)}
          />
        );
      })}
    </div>
  );
};

const Events = ({step, setStep, data, ...rest}: EventsProps) => {
  const swiperRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [displayStep, setDisplayStep] = useState(step);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (step === displayStep) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayStep(step);
      }
    });

    tl.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

  }, [step]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.fromTo(wrapperRef.current,
      {opacity: 0, y: 20},
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
      swiperRef.current.swiper.slideTo(0);
    }
  }, [displayStep]);

  return (
    <div className={styles.eventsContainer} {...rest}>
      <Steps step={step} setStep={setStep} data={data}/>
      <div className={styles.swiperWrapper} ref={wrapperRef}>
        <Swiper
          key={displayStep}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.3}
          breakpoints={{
            1440: {
              slidesPerView: 3.3,
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: styles.swiperButtonDisabled,
          }}
          className={styles.swiper}
          ref={swiperRef}
        >
          {data[displayStep - 1]?.items.map((item: any, index: number) => (
            <SwiperSlide key={`${item.title}-${displayStep}-${index}`}>
              <SimpleCard title={item.title} description={item.description}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={`swiper-button-prev ${styles.swiperButtonPrev}`}>
          <Arrow left={true}/>
        </div>
        <div className={`swiper-button-next ${styles.swiperButtonNext}`}>
          <Arrow/>
        </div>
      </div>
      <Pagination step={step} setStep={setStep} data={data}/>
    </div>
  );
};

export default Events;