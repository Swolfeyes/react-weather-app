import React from 'react';

import SpinnerIcon from '../icon/main.js';
import styles from './main.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchDataStatus: undefined,
      data: [],
      condition: undefined,
    }

    this.showPosition = this.showPosition.bind(this);

  }

  // Lifecycle
  // =============================================

  componentDidMount() {
    this.setState({
      fetchDataStatus: 'pending',
    });

    this.getLocation();
  }

  // Getters
  // =============================================

  getAddress(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=metric&APPID=7c3f79256b2640fc786dec9c8bf5d09c`

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        let weather = data.weather.map((item, index) => {
          console.log(item);
          return (
            <div key='index' className={styles['weather']}>
              <div className={styles['weather__item']}>
                <h1>{data.name}</h1>
              </div>
              <div className={styles['weather__item']}>
                <span>{`${data.main.temp.toFixed()} C`}</span>
              </div>
              <div className={styles['weather__item']}>
                <span>{item.main}</span>
              </div>
            </div>
          )
        })

        this.setState({
          fetchDataStatus: 'success',
          data: weather,
          condition: data.weather[0].main,
        });

      })
      .catch(error => {

        this.setState({
          fetchDataStatus: 'error',
        });
      });

  }

  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        return (
          <div>
            <span>"Geolocation is not supported by this browser."</span>
          </div>
        )
    }
  }

  // Others
  // =============================================

  showPosition(position) {
    this.getAddress(position.coords.latitude, position.coords.longitude);
  }


  // Render
  // =============================================
  render() {

    const { fetchDataStatus, data, condition } = this.state;

    const classes = cx({
      'app': true,
      [`app--theme-${condition}`]: condition,
    })

    return (
      <div className={classes}>
        {fetchDataStatus === 'pending' &&
        <div className={styles['app__item']}>
          <span>Getting weather info...</span>
          <div className={styles['app__item__icon']}>
            <SpinnerIcon />
          </div>
        </div>
        }
        {fetchDataStatus === 'success' &&
        <div className={styles['app__item']}>
          {data}
        </div>
        }
        {fetchDataStatus === 'error' &&
        <div className={styles['app__item']}>
          <span>Ooops, something went wrong...</span>
        </div>
        }
      </div>
    );
  }
}

export default App;

App.displayName = 'App';
