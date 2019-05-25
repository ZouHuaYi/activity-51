import React from 'react';
import {
  List,
  Stepper,
  Button,
  Toast,
  WhiteSpace
} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './index.css';
import {connect} from 'dva';
const Item = List.Item;
const Brief = Item.Brief;
import router from 'umi/router';

@connect(({user})=>({
  user,
}))
class BasicInput extends React.Component {
  state = {
    numberValue: {},
  }

  componentDidMount(){
    this.props.dispatch({
      type:'user/getPlaceOrder'
    })
    this.props.dispatch({
      type: 'user/getDefaultAddressData',
    })
  }

  // 选择面膜数量
  selectNumber = (key,val) => {

    this.setState(state=>{
      return{
        numberValue:{
          ...state.numberValue,
          [key]:val,
        }
      }
    })

  }

  onSubmit = (value) => {
    if(!value){
      Toast.info('请填写收货详细信息', 2);
      return;
    }
    // 执行下订单
    let formData = {
      ...value,
      productCount:this.state.numberValue[value.key]||0,
      key:undefined,
    }

    this.props.dispatch({
      type:'user/orderPlace',
      formData,
    })

  }

  onSubReward = (value) => {

    if(!value){
      Toast.info('请填写收货详细信息', 2);
      return;
    }

    this.props.dispatch({
      type:'user/postAwardPlace',
      formData:value,
    })

  }

  render() {

    const { orderList,defaultAddress,rewardData,ordeInitData} = this.props.user;
    // if(!orderList) return "";
    const userActivityAwardList = rewardData?rewardData.userActivityAwardList:null;

    return (
      <div>

        {
          !userActivityAwardList&&!orderList?(<div style={{textAlign:'center',background:'#F5F5F9',paddingTop:'60px',fontSize:'20px'}}>你没有可提货的礼品</div>):(
            <List
              renderHeader={() => '我要提货'}
            >
              {
                  orderList&&orderList.length>0&&
                  orderList.map((item,key)=>{
                  const intNumber =rewardData?Math.floor(Math.floor(rewardData.userActivityIntegral)/item.integralCount):0;

                  let config = null;
                  let c_key = 'key_'+key
                  if(defaultAddress&&defaultAddress[0]){
                    config = {
                      addressId:defaultAddress[0].id,
                      productType:item.productType,
                      productOrPackageId:item.productOrPackageId,
                      key:c_key,
                    }
                  }



                  return (
                    <div key={item.productOrPackageId} className={styles.listBox}>
                      <List renderHeader={() => item.productEntity.title} className="my-list">
                        <WhiteSpace size='lg'/>
                        <Item className={styles.orderImg} align="top" thumb={item.productEntity.thumbnail} multipleLine >
                          {item.productEntity.shortTitle} <Brief>{item.productEntity.subtitle}</Brief>
                        </Item>
                        <WhiteSpace size='lg'/>
                      </List>
                      <List>
                        <Item
                          arrow="horizontal"
                          multipleLine
                          onClick={() => {
                            router.push('/address');
                          }}
                          platform="android"
                          wrap
                        >
                          收货信息：
                          {
                            defaultAddress&&defaultAddress[0]?(
                              <div>
                                <div>
                                  <Brief>姓名：{defaultAddress[0].receiveName}&nbsp; &nbsp; 电话：{defaultAddress[0].receivePhone}</Brief>
                                  <Brief>{defaultAddress[0].area} <br/> {defaultAddress[0].address}</Brief>
                                </div>
                              </div>
                            ):(<Brief>你还没有填写地址</Brief>)
                          }
                        </Item>
                      </List>
                      <Item extra={<Stepper style={{ width: '100%', minWidth: '100px' }} min={0} onChange={this.selectNumber.bind(this,c_key)} max={intNumber} showNumber size="small" defaultValue={0} />}>提取数量（盒）</Item>
                      <Item>
                        <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this,config)}>领取礼品</Button>
                      </Item>
                      <WhiteSpace size='lg' style={{'background':'#F5F5F9'}} />
                    </div>
                  )
                })
              }

              {
                userActivityAwardList&&userActivityAwardList.map((item,key)=>{
                  let config = null;
                  if(defaultAddress&&defaultAddress[0]) {
                    config = {
                      addressId: defaultAddress[0].id,
                      id: item.id
                    }
                  }
                  return(
                    <div key={item.id} className={styles.listBox}>
                      <List renderHeader={() =>  item.productEntity.title} className="my-list">
                        <Item className={styles.orderImg} align="top" thumb={item.productEntity.thumbnail} multipleLine >
                          {item.productEntity.shortTitle} <Brief>{item.productEntity.subtitle}</Brief>
                        </Item>
                        <WhiteSpace size='lg'/>
                      </List>
                      <List>
                        <Item
                          arrow="horizontal"
                          multipleLine
                          onClick={() => {
                            router.push('/address');
                          }}
                          platform="android"
                          wrap
                        >
                          收货信息：
                          {
                            defaultAddress&&defaultAddress[0]?(
                              <div>
                                <div>
                                  <Brief>姓名：{defaultAddress[0].receiveName}&nbsp; &nbsp; 电话：{defaultAddress[0].receivePhone}</Brief>
                                  <Brief>{defaultAddress[0].area} <br/> {defaultAddress[0].address}</Brief>
                                </div>
                              </div>
                            ):(<Brief>你还没有填写地址</Brief>)
                          }
                        </Item>
                      </List>
                      <Item>
                        <Button type="primary" size="small" inline onClick={this.onSubReward.bind(this,config)}>礼品兑换</Button>
                      </Item>
                      <WhiteSpace size='lg' style={{'background':'#F5F5F9'}} />
                    </div>
                  )
                })

              }

            </List>
          )
        }

      </div>
    );
  }
}

export default BasicInput;
