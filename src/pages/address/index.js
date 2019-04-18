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

@connect(({loading})=>({
  addAddressLoading:loading.effects['global/addAddressFun']
}))
class AddAddress extends Component{

  state={
    areaSelectStatus:false,
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
        type:'global/addAddressFun',
        addressInfoData:value,
      })

    })
  }

  selectComfig = (val) => {
    console.log(val);
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
    const {areaSelectStatus} = this.state;
    return (
      <div>

        <List renderHeader={() => '填写收货地址'}>
          <InputItem
            {...getFieldProps('receiveName',{
              rules:[
                {required:true,message:'收货地址不能为空'},
              ]
            }
            )}
            clear
            placeholder="请输入收件人姓名"
          >收货人</InputItem>
          <InputItem
            {...getFieldProps('receivePhone',{
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
