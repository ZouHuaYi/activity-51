/**
 * title: 首页
 */

import React,{ Component } from 'react';
import styles from './index.css';
import { Modal
} from 'antd-mobile';
import { getToken } from '@/utils/jscookie';
import CicleCanvas from '@/components/Raffle/CicleCanvas';
import GiftBay from '@/components/GiftBay/GiftBay';
import Banner from '@/components/Banner/Banner';
import Hours from '@/components/Hours/CountTime'
import router from 'umi/router';
import { connect } from 'dva';
import {Link} from 'umi';
import Music from '@/components/Music/Music';


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
      canvasWidth:window.innerWidth-40,
      endPrizeStatus:false,
      endPrizeClick:false,
      canavsConfig:{
        canvasWidth:window.innerWidth-15,
        allCircle:12,
        imgWidth:120,
        imgHeight:120,
        imgBaseBack:-10,
        printerImg:printer,
        printerMarginTop:-10
      },
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type:'global/getRaffleData',
      callback:()=>{
        // 这里执行获取数据成功后的函数
        this.awardConfig();
      }
    })
  }
  // 跳转登陆
  goToOrder =()=>{
    if(!getToken()){
      Modal.alert('温馨提示','请先登录,再进入我的个人中心',[
        {text:'取消',onPress:()=>{}},
        {text:'确定',onPress:()=>{
            router.push('/login');
          }}
      ])
      return;
    }
    router.push('/user');
  }

  // 抽奖组件的配置完成函数
  awardConfig = () => {
    const {raffleData} = this.props.global;
    let imageList = [];
    if(raffleData){
      const length  = raffleData.awardList.length;
      let promiseAll = [];
      let img = [];
      for(let i=0;i<length;i++){
        promiseAll[i] = new Promise((resolve,reject)=>{
          img[i] = new Image();
          img[i].src = raffleData.awardList[i].awardImg;
          img[i].onload  = () =>{
            resolve(img[i]);
          }
          img[i].onerror = () =>{
            resolve(null);
          }
        })
      }
      // 图片加载完成
      Promise.all(promiseAll).then(res=>{
        imageList = res;
        let config = {
          ...this.state.canavsConfig,
          imageList:res,
          numPiece: length,
          colors:["#9F1014","#ffffff","#9F1014","#ffffff","#9F1014","#ffffff","#9F1014","#ffffff","#9F1014","#ffffff","#9F1014"],
        }
        this.setState({
          canavsConfig:config
        },()=>{
          // 执行转盘函数
          this.cirCanvas.loadCanvas();
        })
      }).catch(err=>{
        console.log(err);
      })

    }
  }

  startPraise = (callback) => {
    if(this.props.prizeLoading===true) return;
    if(this.state.endPrizeClick) return;
    if(!getToken()){
      Modal.alert('温馨提示','请先登录,再抽奖',[
        {text:'取消',onPress:()=>{}},
        {text:'确定',onPress:()=>{
            router.push('/login');
         }}
      ])
      return;
    }

    // const {raffleData,prizeData} = this.props.global;
    this.props.dispatch({
      type: 'global/awardPrize',
      callback: (index)=>{
        this.setState({
          endPrizeClick:true
        })
        this.cirCanvas.rotationHandle(index);
      }
    });

  }

  // 调用抽奖组件的方法
  onCanvas = (ref) => {
    this.cirCanvas = ref;
  }

  prizeEnd = () =>{
    // 抽奖结束的动作
    setTimeout(()=>{
      this.setState({
        endPrizeStatus:true,
        endPrizeClick:false
      })
    },1000);
  }


  render() {
    const colors = ["#5f109e","#ffffff","#5f109e","#ffffff","#5f109e","#ffffff","#5f109e"];
    const { raffleData,prizeData } = this.props.global;
    let expandContent = {};
    let bannerList = [];
    let ruleImgSet = [];
    if(raffleData){
      try {
        expandContent = JSON.parse(raffleData.expandContent);
      }catch (e) { }
      try {
        bannerList = raffleData.bannerList
      }catch (e) {}
      try {
        ruleImgSet = raffleData.ruleImgSet.map(item=>{
          return item;
        });
      }catch (e) {}

    }
    return (
      <div style={{background:'#9C0004'}}>
        {
          expandContent.musicUrl&&(<Music src={expandContent.musicUrl}/>)
        }

        {
          raffleData&&raffleData.descriptionImgSet&&
          <div className={styles.headerBanner}>
            <img src={raffleData.descriptionImgSet[0]} alt=""/>
          </div>
        }
        {
          expandContent&&expandContent.maskImg&&
          <GiftBay
            topImg={expandContent.maskImg}
          />
        }
        {expandContent.storyUrl&&
          (
            <div style={{width:'100%'}}>
              <img style={{display:'block',width:'100%'}} src={expandContent.storyUrl} alt=""/>
            </div>
          )
        }
        <Banner
          bannerList={bannerList}
          imgHeight={'auto'}
          dots={true}
          dotStyle={{background:'rgba(255,255,255,0.5)'}}
          dotActiveStyle={{background:'#ffffff'}}
        />
        <Hours
          hoursWidth={this.state.canvasWidth}
          timestamp={expandContent.countdown}
        />
        {
          ruleImgSet[0]&&(
            <div className={styles.bannerOver}>
              <img src={ruleImgSet[0]} alt=""/>
            </div>
          )
        }
        <div className={styles.raffleBox}>
          <div className={styles.rafTitle}>
            <h3>抽奖赢豪礼</h3>
            <h3>百分百中奖</h3>
          </div>
          <CicleCanvas
            onRef={this.onCanvas}
            startDraw={this.startDraw}
            startPraise={this.startPraise}
            {...this.state.canavsConfig}
            prizeEnd={this.prizeEnd}
          />
        </div>
        <div className={styles.centerMan}>
          <a href='javascript:;' onClick={this.goToOrder} className={styles.goCenter} >个人<br/>中心</a>
        </div>
        {this.state.endPrizeStatus&&prizeData&&(
            <div className={styles.awardBox}>
              <div className={styles.awardMak} onClick={()=>{
                this.setState({
                  endPrizeStatus:false,
                })
              }}></div>
              <div className={styles.awardbody}>
                <div className={styles.awardImg}>
                  <img src={prizeData.awardImg} alt=""/>
                </div>
                <div className={styles.awardText}>{prizeData.name}</div>
                <Link className={styles.awardBtn} to='/user' >领取奖品</Link>
              </div>
            </div>
          )
        }
        {expandContent.girlUrl&&(
          <div style={{width:'100%'}}>
            <img style={{display:'block',width:'100%'}} src={expandContent.girlUrl} alt=""/>
          </div>
        )
        }
      </div>
    );
  }

}


export default TodoList;
