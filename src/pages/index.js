/**
 * title: 首页
 */

import React,{ Component } from 'react';
import styles from './index.css';
import { List,
  Button,
  WhiteSpace,
  Modal,
  Toast,
  Carousel,
} from 'antd-mobile';
import CicleCanvas from '@/components/Raffle/CicleCanvas';
import GiftBay from '@/components/GiftBay/GiftBay';
import Banner from '@/components/Banner/Banner';
import Hours from '@/components/Hours/CountTime'

import { connect } from 'dva';
const printer = require('@/assets/click_gift.png');
const headerOk = require('@/assets/header_ok.jpg');
const giftBay = require('@/assets/sale.png');

@connect(({global,loading})=>({
  global,
  prizeLoading:loading.effects['global/awardPrize']
}))

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth:window.innerWidth-30,
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type:'global/test',
    })
  }

  startPraise = (callback) => {
    if(this.props.prizeLoading===true) return;
    const {raffleData,prizeData} = this.props.global;

    this.props.dispatch({
      type: 'global/awardPrize'
    });
    raffleData.awardList).forEach((item,key)=>{
      if(item.id === prizeData.id){
        callback&&callback(key);
        return;
      }
    });
  }

  render() {
    const colors = ["#5f109e","#ffffff","#5f109e","#ffffff","#5f109e","#ffffff","#5f109e"];
    const { raffleData ,prizeData} = this.props.global;
    let imageList = [];
    let expandContent = {};
    let bannerList = [];
    let ruleImgSet = [];
    if(raffleData){
      raffleData.awardList).(forEach(item=>{
        imageList.push(item.awardImg);
      })
      expandContent = JSON.parse(raffleData.expandContent);
      bannerList = raffleData.bannerList.map(item=>{
        return item.banner;
      })
      ruleImgSet = raffleData.ruleImgSet.map(item=>{
        return item;
      })
    }
    


    return (
      <div>
        <div className={styles.headerBanner}>
          <img src={headerOk} alt=""/>
        </div>
         <GiftBay
            topImg={giftBay}
         />
        <Banner
          bannerList={bannerList}
          imgHeight={'auto'}
          dots={true}
          dotStyle={{background:'#8880a1'}}
          dotActiveStyle={{background:'#ffffff'}}
        />
        <div className={styles.hours} >
          <Hours
            hoursWidth={this.state.canvasWidth}
            timestamp={expandContent.countdown}
          />
        </div>
        <Banner
          bannerList={ruleImgSet}
          imgHeight={'auto'}
          dots={false}
        />
        <div className={styles.raffleBox}>
          <div className={styles.rafTitle}>
            <h3>抽奖赢豪礼</h3>
            <h3>精美面膜等你拿</h3>
          </div>
          <CicleCanvas
            canvasWidth={this.state.canvasWidth}
            numPiece={6}
            allCircle={12}
            imgWidth={100}
            imgHeight={60}
            colors={colors}
            startDraw={this.startDraw}
            imageList={imageList}
            printerImg={printer}
            printerMarginTop={-15}
            startPraise={this.startPraise}
          />
        </div>
      </div>
    );
  }

}


export default TodoList;
