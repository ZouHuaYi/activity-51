import styles from './index.css';
import {
  Carousel
} from 'antd-mobile';
const headerOk = require('@/assets/header_ok.jpg');


function goToLink(val) {
  if(val.clickUrl){
    window.g_app._store.dispatch({
      type:'other/actionSaveMp4',
      mp4: val.clickUrl,
    })
   }else if(val.description){
    window.g_app._store.dispatch({
      type: 'other/actionSaveHtml',
      html:val.description
    })
   }

}



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
              key={val.id}
              style={{ display: 'block', width: '100%', height: props.imgHeight }}
              onClick={goToLink.bind(null,val)}
            >
              <img
                src={val.banner}
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


