import React from 'react';
import styles from './SimpleCard.module.scss';

type SimpleCardProps = React.ComponentProps<'div'> & {
  title: string;
  description: string;
};

const SimpleCard = ({ title, description, ...rest} : SimpleCardProps) => {
  return (
    <div className={styles.container} {...rest}>
      <p className={styles.container__title}>{title}</p>
      <p className={styles.container__description}>{description}</p>
    </div>
  );
};

export default SimpleCard;
