import React from 'react';
import styles from './canvas.css';
import PropTypes from 'prop-types';
const printer = require('@/assets/printer.png');

class CicleCanvas extends React.Component{
  constructor(props){
    super(props)
    this.CanavasId = React.createRef();
    this.image = new Image();
    this.image.src = require('@/assets/login_bgk.jpg');
    console.log(props,'props')
    this.state={
      canvasWidth: props.canvasWidth,
      semiWidth: (props.canvasWidth)/2,
      //["#AE3EFF","#4D3FFF","#FC262C","#3A8BFF","#EE7602","#FE339F","#3A8BFF","#4D3FFF","#EE7602","#FE339F"],
      rotateDeg: 0,
      imageLoadArr: [],
      allCircle: props.allCircle || 12,
    }
  }

  // 更新
  componentWillReceiveProps(nextProps){
    if(nextProps.imageList.length>0||nextProps.numPiece>0){
      this.setState({
        semiBaseCenter: nextProps.semiBaseCenter||10,
        AngleRadius: Math.PI*2 / (nextProps.numPiece),
        AngleDeg: 360/(nextProps.numPiece),
        imgBaseBack: nextProps.imgBaseBack || 10,
        imgWidth: nextProps.imgWidth || 100,
        imgHeight: nextProps.imgHeight || 50,
        colors: nextProps.colors || ["#AE3EFF","#4D3FFF","#FC262C","#3A8BFF","#EE7602","#FE339F","#3A8BFF","#4D3FFF","#EE7602","#FE339F"],
        imageList: nextProps.imageList || [],
      },()=>{
        this.loadAllImg();
      })

    }
  }

  componentDidMount () {
    // this.loadAllImg();
  }

  // 中奖角度换算
  matrixingAngle = (index) => {
    const {allCircle,AngleDeg} = this.state;
    return allCircle*360 + (270-(AngleDeg*(index+0.5)));
  }

  // 图片加载监听函数
  loadAllImg = () => {
    let promiseAll = [];
    let img = [];

    console.log(this.state.imageList);

      for(let i=0,len=this.state.imageList.length;i<len;i++){
        promiseAll[i] = new Promise((resolve,reject)=>{
          img[i] = new Image();
          img[i].src = this.state.imageList[i];
          console.log(img[i])
          img[i].onload  = () =>{
            resolve(img[i]);
          }
          img[i].onerror = () =>{
            reject();
          }
        })
      }

    Promise.all(promiseAll).then(res=>{
      this.setState({
        imageLoadArr:res
      },()=>{
        console.log(res)
          // 图片加载完成 执行话canvas的动作
        this.ctx = this.CanavasId.current.getContext('2d');
        for (let i=0;i<this.props.numPiece;i++){
          this.drawFanshaped(i);
        }
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  // 旋转的函数
  rotationHandle = (index) => {
    let angle = 0;
    let step = 0;
    let endDeg = this.matrixingAngle(1);
    let slowDown = 1000;
    clearInterval(this.t);
    this.t = setInterval(()=>{
      if(angle>(endDeg-slowDown)){
        step -= 0.05;
      }
      if(angle<slowDown){
        if(step<=10){
          step += 0.5
        }
      }
      angle+=step;
      this.setState({
        rotateDeg:angle.toFixed(3)
      })
      if(angle>=endDeg){
        clearInterval(this.t);
      }
    },10)
  }

  // 点击抽奖按钮
  startPraise = () => {
    this.rotationHandle();
  }

  // 画扇形的函数
  drawFanshaped = (index) => {
    const {colors,AngleRadius,semiWidth,semiBaseCenter} = this.state;
    const angle = AngleRadius*index;
    this.ctx.beginPath();
    this.ctx.fillStyle = colors[index] || '#ffffff';
    this.ctx.arc(semiWidth,semiWidth,semiWidth,angle,angle+AngleRadius,false);
    this.ctx.arc(semiWidth,semiWidth,semiBaseCenter,angle+AngleRadius,angle,true);
    this.ctx.fill();
    this.ctx.save();
    this.drowTextImage(index,angle,AngleRadius);
  }

  // 写图片
  drowTextImage = (index) => {
    const {AngleRadius,imgWidth,imgHeight,imgBaseBack,imageLoadArr} = this.state;
    const center = this.centerCoord(index);
    this.ctx.translate(center.x,center.y);
    this.ctx.rotate(AngleRadius*index+AngleRadius/2+Math.PI/2);
    try {
      this.ctx.drawImage(imageLoadArr[index],-imgWidth/2,imgBaseBack,imgWidth,imgHeight);
    }catch (e) {}

    this.ctx.restore();
  }

  // 获取中心点的位置
  centerCoord = (index) => {
    const { AngleRadius,semiWidth } = this.state;
    const angle = AngleRadius*index;
    const widthRadius = semiWidth*Math.cos(AngleRadius/2);
    let Rx = widthRadius*Math.cos(angle+AngleRadius/2)+semiWidth;
    let Ry = widthRadius*Math.sin(angle+AngleRadius/2)+semiWidth;
    return {x:Rx,y:Ry};
  }

  render(){
    const { canvasWidth } = this.state;
    return(
      <div className={styles.canvasBox} style={{width:canvasWidth+'px'}}>
        <div className={styles.canvasConent} style={{transform:`rotate(${this.state.rotateDeg}deg)`}}>
          <canvas
            width={canvasWidth}
            height={canvasWidth}
            ref={this.CanavasId}
          >
          </canvas>
        </div>
        <img className={styles.printer} src={printer} alt="" onClick={this.startPraise} />
      </div>
    )
  }
}

CicleCanvas.propTypes  = {
  canvasWidth: PropTypes.number,
  numPiece: PropTypes.number,
  imageList: PropTypes.array,
  colors: PropTypes.array,
  allCircle: PropTypes.number,
  imgBaseBack: PropTypes.number,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  semiBaseCenter: PropTypes.number,
}



export default CicleCanvas;
