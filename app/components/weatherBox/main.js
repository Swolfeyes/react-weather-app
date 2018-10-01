import React from 'react';

import styles from './main.scss';


const WeatherBox = ({ location, temperature, weatherCondition }) => {
  return (
    <div className={styles['weather-box']}>
      <div className={styles['weather-box__item']}>
        <h1>{location}</h1>
      </div>
      <div className={styles['weather-box__item']}>
        <span>{`${temperature.toFixed()} C`}</span>
      </div>
      <div className={styles['weather-box__item']}>
        <span>{weatherCondition}</span>
      </div>
    </div>
  )
}

WeatherBox.displayName = 'WeatherBox';

export default WeatherBox;
