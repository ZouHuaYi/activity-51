import React from 'react';
import styles from './music.css';
const playMusic = require('@/assets/music');
const stopMusic = require('@/assets/stop.png');
import {connect} from 'dva';


@connect(({other})=>({
  other,
}))
class MyMusic extends React.Component{
  constructor(props){
    super(props);
    this.audioMusic = React.createRef();
  }

  componentDidMount() {
    this.audioMusic.current.src = this.props.src;

    document.addEventListener("WeixinJSBridgeReady",  ()=> {//微信
        if(this.props.other.playMusicStatus){
          (this.audioMusic.current).pause();
          this.props.dispatch({
            type:'other/changePlayStatus',
            status:false,
          });
        }else{
          (this.audioMusic.current).play();
          this.props.dispatch({
            type:'other/changePlayStatus',
            status:true,
          });
        }
      }, false);

  }

  componentWillUnmount(){
    this.audioMusic.current.pause();
    this.props.dispatch({
      type:'other/changePlayStatus',
      status:false,
    });
  }

  playStop = () => {
    const status = this.props.other.playMusicStatus;
    if(status){
      this.audioMusic.current.pause();
    }else {
      this.audioMusic.current.play();
    }

    this.props.dispatch({
      type:'other/changePlayStatus',
      status:!status,
    });

  }

  render(){
    const status = this.props.other.playMusicStatus;
    return (
      <div className={styles.music} onClick={this.playStop}>
        <div className={styles.imgs+' '+(status?styles.on:'')}>
          <img src={status?playMusic:stopMusic} alt=""/>
        </div>
        <audio className={styles.audio} preload="true" id='audio' loop="loop" ref={this.audioMusic}  name="media"> </audio>
      </div>
    )
  }
}

export default MyMusic;
