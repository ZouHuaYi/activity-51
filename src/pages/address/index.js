import React,{Component} from 'react';
import {
  List,
  InputItem,
  WhiteSpace,
  Button ,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './index.css';
import ThreeClassSelect from '@/components/AreaSelect/ThreeClassSelect';
import { connect } from 'dva';
import {addAddress} from "@/api/common";

@connect(({loading,user})=>({
  user,
  addAddressLoading:loading.effects['user/addAddressFun']
}))

class AddAddress extends Component{
  constructor(props){
    super(props);
    this.state={
      areaSelectStatus:false,
      address:undefined,
    }
    setTimeout(()=>{
      this.setState({
        address:props.user.defaultAddress?props.user.defaultAddress[0]:undefined
      })
    },200)
  }

  handleClick = () => {
    this.props.form.validateFields((err,value)=>{
      if(err){
        const first = err[Object.keys(err)[0]].errors[0].message;
        Toast.info(first, 1);
        return;
      }
      if(this.props.addAddressLoading) return;
      console.log(value)
      this.props.dispatch({
        type:'user/addAddressFun',
        addressInfoData:value,
      })

    })
  }

  selectComfig = (val) => {
    if(val.length>0){
      this.setState({
        areaSelectStatus:false,
      })
      this.props.form.setFieldsValue({"area":val.join('')})
    }
  }

  selectCancel = () => {
    this.setState({
      areaSelectStatus:false,
    })
  }


  render(){
    const { getFieldProps } = this.props.form;
    const {areaSelectStatus,address} = this.state;
    return (
      <div>
        <List renderHeader={() => '填写收货地址'}>
          <InputItem
            {...getFieldProps('receiveName',{
              initialValue:address?address.receiveName:address,
              rules:[
                {required:true,message:'收货地址不能为空'},
              ]
            }
            )}
            defaultValue={address?address.receiveName:address}
            clear
            placeholder="请输入收件人姓名"
          >收货人</InputItem>
          <InputItem
            {...getFieldProps('receivePhone',{
              initialValue:address?address.receivePhone:address,
              rules:[
                {required:true,message:'联系人电话不能为空'},
              ],
            }
            )}
            clear
            type="phone"
            placeholder="请输入联系人电话"
          >联系电话</InputItem>
          <InputItem
            {...getFieldProps('area',{
              initialValue:address?address.area:address,
              rules:[
                {required:true,message:'所在地址不能为空'},
              ]
            })}
            clear
            editable={false}
            placeholder="请选择所在地址"
            onClick={()=>this.setState({areaSelectStatus:true})}
          >所在地址</InputItem>
          <InputItem
            {...getFieldProps('address',{
              initialValue:address?address.address:address,
              rules:[
                {required:true,message:'详细地址不能为空'},
              ]
            })}
            clear
            placeholder="请输入详细地址"
          >详细地址</InputItem>
        </List>
        <WhiteSpace/>
        <div className={styles.formBtn}>
          <Button type="primary" onClick={this.handleClick}>确认并保存</Button>
        </div>
        <ThreeClassSelect areaSelectStatus={areaSelectStatus} selectComfig={this.selectComfig} cancel={this.selectCancel}></ThreeClassSelect>
      </div>
    )
  }
}

export default createForm()(AddAddress);
