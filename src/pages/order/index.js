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
    numberValue: 1,
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
  selectNumber = (val) => {
    this.setState({
      numberValue:val
    })
  }

  onSubmit = (value) => {
    console.log(value);
    if(!value){
      Toast.info('请填写收货详细信息', 2);
      return;
    }
    // 执行下订单
    const formData = {
      ...value,
      productCount:this.state.numberValue
    }

    this.props.dispatch({
      type:'user/orderPlace',
      formData,
    })

  }

  render() {
    const { orderList,defaultAddress,rewardData,ordeInitData} = this.props.user;
    if(!orderList) return "";
    const intNumber =rewardData?Math.floor(Math.floor(rewardData.userActivityIntegral)/ordeInitData):1;

    return (
      <List
        renderHeader={() => '我要提货'}
      >
          {orderList&&orderList.length>0&&
          orderList.map((item,key)=>{
            let config = null;
            if(defaultAddress&&defaultAddress[0]){
              config = {
                addressId:defaultAddress[0].id,
                productType:item.productType,
                productOrPackageId:item.productOrPackageId,
              }
            }
            return (
              <div key={item.productOrPackageId}>
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
                <Item extra={<Stepper style={{ width: '100%', minWidth: '100px' }} min={1} onChange={this.selectNumber} max={intNumber} showNumber size="small" defaultValue={1} />}>提取数量（盒）</Item>
                <Item>
                  <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this,config)}>确认订单</Button>
                </Item>
              </div>
            )
          })
          }
      </List>
    );
  }
}

export default BasicInput;
