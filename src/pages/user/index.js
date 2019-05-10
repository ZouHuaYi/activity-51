/*
* title: 个人中心
*
* */

import React from 'react';
import styles from './index.css'
const header = require('@/assets/header_ok.jpg');
import router from 'umi/router';
import {WhiteSpace} from 'antd-mobile';
import {connect} from 'dva';
import {clearPath} from '@/utils/utils'


const QRCode = require('qrcode.react');
const shareImg = require('@/assets/share.png');

@connect(({global,user})=>({
  user,
  global,
}))
class User extends React.Component{
  state = {
   shareStatus:false
  }

  componentDidMount(){

    this.props.dispatch({
      type:'user/getUserCenterData'
    })

    if(this.props.global.raffleData!==null) return;
    this.props.dispatch({
      type:'global/getRaffleData',
      callback:()=>{}
    })
  }

  // 跳转到下订单页面
  goToOrder = (num) => {
    if(num<this.props.user.ordeInitData) return;
    router.push('/order');
  }

  render(){
    const {rewardData,ordeInitData} = this.props.user;
    if(!rewardData) return '';
    const intNumber = Math.floor(rewardData.userActivityIntegral);
    const remainder = Math.floor(intNumber%ordeInitData);
    const divisor = Math.floor(intNumber/ordeInitData);
    const {raffleData} = this.props.global;
    let exp = {};
    try {
      exp = JSON.parse(raffleData.expandContent);
    }catch (e) {}

    let list = [];
    // 第一条
    for(let i=0;i<divisor;i++){
      list.push(
        <div className={styles.listBox} key={i}>
          <div className={styles.itemLine}>
            <div className={styles.tran} style={{width:'100%',borderRadius:'28px 28px'}}></div>
          </div>
          {/*<p className={styles.ileft}>5片</p>*/}
          <p className={styles.iright}>{ordeInitData}片</p>
        </div>
      )
    }

    return (
      <div className={styles.user}>
        <div className={styles.header}>
          <div className={styles.himg}><img  src={rewardData.avatar||header} alt=""/></div>
          <div className={styles.name}>
            <h5>{rewardData.nickname}</h5>
            {/*<p>{rewardData}积分</p>*/}
          </div>
        </div>
        <WhiteSpace size='lg'/>
        <WhiteSpace size='lg'/>
        <div className={styles.card}>
          {
            exp&&exp.booking&&exp.booking==1?(
              <div>
                <WhiteSpace size='lg'/>
                 <p className={styles.textsup}>{rewardData.userAlreadyLuckDraw==true?'你已参团，赶快邀请好友领取更多大奖':'你已开团，获取精美枕头一个，赶快邀请好友领取更多大奖'} </p>
              </div>
            ):(
              <div>
                <div className={styles.ctitle}>
                  <span className={styles.icon}></span>我的面膜
                </div>
                <div className={styles.listLine}>
                  {list}
                  <div className={styles.listBox}>
                    <div className={styles.itemLine}>
                      <div className={styles.tran} style={{width:remainder/5*100+'%'}}>
                      </div>
                    </div>
                    <p className={styles.ileft}>{remainder}片</p>
                    <p className={styles.iright}>5片</p>
                  </div>
                </div>
                <div className={styles.textsup} dangerouslySetInnerHTML={{__html: divisor>0?`您已获得<span>${intNumber}</span>${rewardData.activityIntegralPoolName}，请尽快领取`:`您已获得<span>${intNumber}</span>${rewardData.activityIntegralPoolName}，还差<span>${5-remainder}</span>${rewardData.activityIntegralPoolName}可提货，
              赶快邀请好友集齐吧！`}}>
                </div>
              </div>
            )
          }


          <WhiteSpace size='lg'/>
          <div className={styles.qrcode}>
            <QRCode value={clearPath()} size={150} level={'L'}  />
          </div>
          <WhiteSpace size='lg'/>
          <div className={styles.person}>
            <div className={styles.personImg}>
              {
                rewardData.inviteAvatarList&&rewardData.inviteAvatarList.length>0&&
                rewardData.inviteAvatarList.map((item,key)=>{
                  if(key<=5){
                    return (
                      <img key={key} src={item} alt=""/>
                    )
                  }
                })
              }
              { rewardData.inviteAvatarList&&rewardData.inviteAvatarList.length>5&&(<span className={styles.imgOut}>...</span>) }
            </div>
            <div className={styles.numPerson}>
              已邀请{rewardData.userInviteCount}人
            </div>
          </div>
          <WhiteSpace size='lg'/>
          <WhiteSpace size='sm'/>
          <div className={styles.btn}>
            <a className={styles.btnShare} href="javascript:;" onClick={()=>{
              this.setState({
                shareStatus:true
              })
            }}>邀请好友</a>
            {
              exp&&exp.booking&&exp.booking==1?'':(<a className={styles.btnShop+' '+ (divisor>0?styles.active:'')} onClick={this.goToOrder.bind(this,intNumber)} href="javascript:;">提货</a>)
            }
          </div>
          {
            this.state.shareStatus&&(
              <div onClick={()=>{
                this.setState({
                  shareStatus:false
                })
              }} className={styles.shareImg}>
                <img src={shareImg} alt=""/>
              </div>
            )
          }

          <WhiteSpace size='lg'/>
          {
            exp&&exp.appletBuyUrl&&(
              <div className={styles.buyMak}>
                  <div className={styles.makImg}>
                    <img src={exp.appletBuyUrl} alt=""/>
                  </div>
                  {
                    exp&&exp.booking&&exp.booking==1?'':(
                      <div className={styles.buyText}>
                        长按小程序码购买精美面膜
                      </div>
                    )
                  }
              </div>
            )
          }

        </div>
      </div>
    )
  }
}

export default User;
