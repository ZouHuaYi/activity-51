import React from 'react';
import styles from './index.css';


class CicleCanvas extends React.Component{
  constructor(props){
    super(props);
    this.CanavasId = ref => this.CanavasId = ref;
    this.image = new Image();
    this.image.src = require('@/assets/login_bgk.jpg');
    this.state={
      canvasWidth:window.innerWidth-30,
    }
  }
  componentDidMount () {
    this.image.onload = () =>{
      this.initCanvas();
    }
    // this.initCanvas();
  }

  // renderImageCanvas = () => {
  //   this.imageCtx = this.CanavasId.getContext('2d');
  //   this.imageCtx.drawImage(this.image, 0, 0, 100, 100);
  //
  // }
  initCanvas = () => {
    const {canvasWidth} = this.state;
    this.ctx = this.CanavasId.getContext('2d');
    //this.imageCtx.clearRect(0,0,canvasWidth,canvasWidth);
    // this.ctx.moveTo(0,0)
    //     // this.ctx.lineTo(100,100)
    //     // this.ctx.stroke();
    //     // this.ctx.drawImage(this.image,-35,0,60,60);
    //     // this.ctx.restore();
    this.ctx.clearRect(0,0,canvasWidth,canvasWidth);
    this.ctx.fillStyle='blue';
    this.ctx.beginPath();
    this.ctx.arc(canvasWidth/2,canvasWidth/2,canvasWidth/2,0,Math.PI/2,false);
    this.ctx.arc(canvasWidth/2,canvasWidth/2,0,Math.PI/2,0,true);
    this.ctx.translate(canvasWidth/2, canvasWidth/2);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.save()

    // this.ctx.translate(canvasWidth/2, canvasWidth/2);
    this.ctx.rotate(Math.PI/6);

    this.ctx.drawImage(this.image,canvasWidth/4,0,60,60);

    this.ctx.restore();


  }

  render(){
    const { canvasWidth } = this.state;
    return(
      <div className={styles.canvasBox} style={{width:canvasWidth+'px'}}>
        <canvas
          width={canvasWidth}
          height={canvasWidth}
          ref={this.CanavasId}
        >
        </canvas>
      </div>
    )
  }
}

export default CicleCanvas;
