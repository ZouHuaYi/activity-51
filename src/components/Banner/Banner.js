import styles from './index.css';
import {
  Carousel
} from 'antd-mobile';
const headerOk = require('@/assets/header_ok.jpg');

function Banner(props) {
  return(
    <div>
      {props.bannerList&&props.bannerList.length>0&&
        <Carousel
          autoplay={false}
          dots={props.dots===false?false:true}
          infinite
          dotStyle={props.dotStyle}
          dotActiveStyle={props.dotActiveStyle}
        >
          {props.bannerList.map(val => (
            <div
              key={val}
              style={{ display: 'block', width: '100%', height: props.imgHeight }}
            >
              <img
                src={val}
                style={{ display:'block',width: '100%'}}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            </div>
          ))}
        </Carousel>
      }
    </div>
  )
}

export default Banner;


