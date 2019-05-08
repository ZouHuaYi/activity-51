import React from 'react';
import styles from './canvas.css';
import PropTypes from 'prop-types';
import { getPixelRatio } from '@/utils/utils';

class CicleCanvas extends React.Component{
  constructor(props){
    super(props)
    this.CanavasId = React.createRef();
    this.state={
      canvasWidth: props.canvasWidth,
      rotateDeg: 0,
      ratio:1
    }
  }

  componentDidMount () {
    this.props.onRef(this);
    this.ctx = this.CanavasId.current.getContext('2d');
    const ratio = getPixelRatio(this.ctx);
    this.CanavasId.current.style.width = this.state.canvasWidth+'px';
    this.CanavasId.current.style.height = this.state.canvasWidth+'px';

    this.setState({
      ratio: Number(ratio),
    })
  }

  // 开始加载
  loadCanvas = ()=>{
    for (let i=0;i< this.props.numPiece;i++){
      this.drawFanshaped(i);
    }
  }

  // 中奖角度换算
  matrixingAngle = (index) => {
    const {allCircle,numPiece} = this.props;
    const AngleDeg = 360/numPiece;
    return (allCircle||12)*360 + (270-(AngleDeg*(index+0.5)));
  }

  // 旋转的函数
  rotationHandle = (index) => {
    let angle = 0;
    let step = 0;
    let endDeg = this.matrixingAngle(index);
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
        this.props.prizeEnd();
        clearInterval(this.t);
      }
    },10)
  }

  // 点击抽奖按钮
  startPraise = () => {
    this.props.startPraise();
  }

  // 画扇形的函数
  drawFanshaped = (index) => {
    const {colors,numPiece,imageList,canvasWidth,imgWidth,imgHeight,semiBaseCenter,imgBaseBack} = this.props;
    const {ratio} = this.state;
    const semiWidth = canvasWidth/2*ratio;
    const AngleRadius = 2*Math.PI/numPiece;

    const angle = AngleRadius*index;
    this.ctx.beginPath();
    this.ctx.fillStyle = colors[index] || '#ffffff';
    this.ctx.arc(semiWidth,semiWidth,semiWidth,angle,angle+AngleRadius,false);
    this.ctx.arc(semiWidth,semiWidth,(semiBaseCenter||10)*ratio,angle+AngleRadius,angle,true);
    this.ctx.fill();
    this.ctx.save();
    // 写图片
    const widthRadius = semiWidth*Math.cos(AngleRadius/2);
    const Rx = widthRadius*Math.cos(angle+AngleRadius/2)+semiWidth;
    const Ry = widthRadius*Math.sin(angle+AngleRadius/2)+semiWidth;
    this.ctx.translate(Rx,Ry);
    this.ctx.rotate(AngleRadius*index+AngleRadius/2+Math.PI/2);
    if(imageList[index]){
      this.ctx.drawImage(imageList[index],-imgWidth/2*ratio,(imgBaseBack||10)*ratio,imgWidth*ratio,imgHeight*ratio);
    }
    this.ctx.restore();
    this.ctx.beginPath();
    this.ctx.lineWidth = 2*ratio;
    this.ctx.moveTo(semiWidth,semiWidth);
    const lineX = (semiWidth+20)*Math.cos(angle)+ semiWidth;
    const lineY = (semiWidth+20)*Math.sin(angle)+ semiWidth;
    this.ctx.lineTo(lineX,lineY);
    this.ctx.save();
    this.ctx.stroke();


  }

  render(){
    const { canvasWidth,printerImg ,printerMarginTop } = this.props;
    const {ratio} = this.state;
    const wh = ratio*canvasWidth;

    return(
      <div className={styles.canvasBox} style={{width:canvasWidth+'px'}}>
        <div className={styles.canvasConent} style={{transform:`rotate(${this.state.rotateDeg}deg)`}}>
          <canvas
            width={wh}
            height={wh}
            ref={this.CanavasId}
          >
          </canvas>
        </div>
        <img className={styles.printer}  style={{marginTop:printerMarginTop+'px'}} src={printerImg} alt="" onClick={this.startPraise} />
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
