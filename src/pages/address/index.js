import React,{Component} from 'react';
import {
  List,
  InputItem,
  WhiteSpace,
  Button ,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';

class AddAddress extends Component{

  handleClick = () => {
    this.props.form.validateFields((err,value)=>{
      console.log(err);
      if(err){
        const first = err[Object.keys(err)[0]].errors[0].message;
        Toast.info(first, 1);
      }
    })
  }


  render(){
    const { getFieldProps } = this.props.form;
    console.dir(getFieldProps)
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
                {required:true,message:'收件人地址不能为空'},
              ]
            }
            )}
            clear
            placeholder="请输入联系人电话"
          >联系电话</InputItem>
          <InputItem
            {...getFieldProps('areaInfo',{
              rules:[
                {required:true,message:'所在地址不能为空'},
              ]
            })}
            clear
            placeholder="请选择所在地址"
          >所在地址</InputItem>
          <InputItem
            {...getFieldProps('address',{
              rules:[
                {required:true,message:详细地址不能为空'},
              ]
            })}
            clear
            placeholder="请输入详细地址"
          >详细地址</InputItem>
        </List>
        <WhiteSpace/>
        <Button type="primary" onClick={this.handleClick}>确认并保存</Button>
      </div>
    )
  }
}

export default createForm()(AddAddress);
