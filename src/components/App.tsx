import React from 'react';
import styles from './App.module.scss';
import Title from './Title/Title';
import DatePicker from './DatePicker/DatePicker';
import Events from './Events/Events';

import { EventBlock } from '../types/events';

const data: EventBlock[] = [
  {
    start: 2000,
    end: 2005,
    items: [
      {
        title: '2000',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2003',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2003',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2003',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2003',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2003',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2005',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      }
    ],
  },
  {
    start: 2006,
    end: 2010,
    items: [
      {
        title: '2006',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2008',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2008',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2008',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2010',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      }
    ],
  },
  {
    start: 2010,
    end: 2015,
    items: [
      {
        title: '2010',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2013',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2015',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      }
    ],
  },
  {
    start: 2015,
    end: 2016,
    items: [
      {
        title: '2016',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
    ],
  },
  {
    start: 2016,
    end: 2017,
    items: [
      {
        title: '2017',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
    ],
  },
  {
    start: 2017,
    end: 2025,
    items: [
      {
        title: '2017',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
      {
        title: '2025',
        description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis distinctio, abore '
      },
    ],
  }
]
const title: React.ReactNode = (<>
  Исторические
  <br/>
  даты
</>)

function App() {
  const [step, setStep] = React.useState(1);
  return (
    <div className={styles.cover}>
      <div className={styles.container}>
        <Title>{title}</Title>
        <DatePicker step={step} setStep={setStep} data={data}/>
        <Events step={step} setStep={setStep} data={data}/>
      </div>
    </div>
  );
}

export default App;
