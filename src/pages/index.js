/**
 * title: 首页
 */

import React,{ Component } from 'react';
import styles from './index.css';
import { List,Button,WhiteSpace,Modal,Toast  } from 'antd-mobile';
import CicleCanvas from '@/components/Raffle/CicleCanvas'
import { connect } from 'dva';


@connect(({global})=>({
  global
}))

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth:window.innerWidth-30
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type:'global/test',
    })
  }

  startDraw = (fun) => {
      fun&&fun(1);
  }

  render() {
    const colors = ["#AE3EFF","#4D3FFF","#FC262C","#3A8BFF","#EE7602","#FE339F","#3A8BFF","#4D3FFF","#EE7602","#FE339F"];

    const { raffleData } = this.props.global;

    let imageList = [];
    if(raffleData){
      (raffleData.awardList).forEach(item=>{
        imageList.push(item.awardImg);
      })
    }

    return (
      <div>
         <CicleCanvas
           canvasWidth={this.state.canvasWidth}
           numPiece={6}
           allCircle={12}
           imgWidth={100}
           imgHeight={60}
           colors={colors}
           startDraw={this.startDraw}
           imageList={imageList}
         />
      </div>
    );
  }

}


export default TodoList;
