import React from 'react';

import styles from './main.scss';


const WeatherBox = (props) => {
  return (
    <div className={styles['weather-box']}>
      <div className={styles['weather-box__item']}>
        <h1>{props.location}</h1>
      </div>
      <div className={styles['weather-box__item']}>
        <span>{`${props.temperature.toFixed()} C`}</span>
      </div>
      <div className={styles['weather-box__item']}>
        <span>{props.weatherCondition}</span>
      </div>
    </div>
  )
}

WeatherBox.displayName = 'WeatherBox';

export default WeatherBox;
