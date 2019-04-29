import React from 'react';
import styles from './hours.css'
import {counterTime,getPixelRatio} from '@/utils/utils'


class CoutTime extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showStatus:0,      // 0 开始状态 1 正常执行状态 2 已经过时
      ratio:1
    }
    this.CanavasId = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timestamp && this.state.showStatus===0){
      this.setState({
        showStatus:1
      },()=>{
        this.loadAllImg();
      })
    }
  }

  loadAllImg = () => {
    let promiseAll = [];
    let img = [];
    for(let i=0;i<12;i++){
      promiseAll[i] = new Promise((resolve,reject)=>{
        img[i] = new Image();
        img[i].src = require(`@/assets/d_${i}.png`);
        img[i].onload  = () =>{
          resolve(img[i]);
        }
        img[i].onerror = () =>{
          reject('图片路径出错啦');
        }
      })
    }

    Promise.all(promiseAll).then(res=>{
      this.setState({
        imageLoadArr:res
      },()=>{
        // 图片加载完成 执行话canvas的动作
        this.ctx = this.CanavasId.current.getContext('2d');
        this.drawArc(0);

        const ratio = getPixelRatio(this.ctx);
        this.CanavasId.current.style.width = this.props.hoursWidth+'px';
        this.CanavasId.current.style.height = this.props.hoursWidth+'px';

        this.setState({
          ratio: Number(ratio),
        })

        let gay = 0;
        clearInterval(this.tim);
        this.tim = setInterval(()=>{
          gay++;
          const dt = counterTime('dd天HH:mm:ss',this.props.timestamp);
          if(dt===-1){
            clearInterval(this.tim);
            this.setState({
              showStatus:2
            });
            return;
          }

          this.drawArc(gay*Math.PI/30,dt);
          if(gay>59){
            gay=0;
          }
        },1000);

      })
    }).catch(err=>{
      console.log(err)
    })
  }

  componentWillUnmount(){
    if (!this.tim) {
      return;
    }
    clearInterval(this.tim);
  }

  // 主要的画图部分
  drawArc = (angle,dt)=> {
    const {ratio} = this.state;
    const hoursWidth = this.props.hoursWidth*ratio;
    const ctx = this.ctx;

    ctx.clearRect(0,0,hoursWidth,hoursWidth);
    const imgRad = (hoursWidth/2-20*ratio);
    const length = this.state.imageLoadArr.length;


    for(let i=0; i<length ; i++){
      ctx.save();
      const angle = 2*Math.PI/length*i-(4*Math.PI/length);
      const x = imgRad*Math.cos(angle)+hoursWidth/2;
      const y = imgRad*Math.sin(angle)+hoursWidth/2;
      ctx.translate( x,y);
      ctx.drawImage(this.state.imageLoadArr[length-i-1],-16*ratio,-12*ratio,32*ratio,24*ratio);
      ctx.restore();
    }

    // 写距离活动结束
    ctx.save();
    ctx.fillStyle = '#fff';
    let f1 = 26*ratio;
    ctx.font = `${f1}px Microsoft YaHei`;
    ctx.translate(hoursWidth/2,hoursWidth/2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('距离面膜发布',0,-30*ratio);
    ctx.restore();

    if(dt){
      // 写倒计时
      ctx.save();
      ctx.fillStyle = '#fff';
      let f2 = 32*ratio;
      ctx.font = `${f2}px Microsoft YaHei`;
      ctx.translate(hoursWidth/2,hoursWidth/2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(dt.fmt,0,40*ratio);
      ctx.restore();
    }
    // 画短针
    if(dt){
      const dayAngle = (length-(dt.day+1))*(2*Math.PI/length)+((24-dt.hours)/24*(2*Math.PI)/length);
      ctx.save();
      ctx.lineWidth = 3*ratio;
      ctx.strokeStyle="#fff";
      ctx.translate(hoursWidth/2,hoursWidth/2);
      ctx.rotate(dayAngle);
      ctx.beginPath();
      ctx.moveTo(0,-(imgRad-30));
      ctx.lineTo(0,20*ratio);
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    //  画长针
    ctx.save();
    ctx.lineWidth = 2*ratio;
    ctx.strokeStyle="#ff0011";
    ctx.translate(hoursWidth/2,hoursWidth/2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,-imgRad);
    ctx.lineTo(0,30*ratio);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // 画圆点
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle="#f00";
    ctx.arc(hoursWidth/2,hoursWidth/2,10*ratio,0,360,false);
    ctx.fill();
    ctx.restore();

  }

  // 倒计时换算
  render(){
    const {hoursWidth} = this.props;
    const wh = hoursWidth*this.state.ratio;


    return (
      <div>
      {this.state.showStatus===1&&
          (<div className={styles.bodyHours} style={{width:hoursWidth+'px',height:hoursWidth+'px'}}>
          <canvas ref={this.CanavasId} width={wh} height={wh}></canvas>
        </div>)

      }
      </div>
    )
  }
}

export default CoutTime;
