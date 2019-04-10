/**
 * Created by zhy on 2019/4/10.
 */
import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'dva';
import { Toast} from 'antd-mobile';
const logo = require('@/assets/ic_logo.png');



@connect(({login})=>({
    login
}))
 class Login extends Component{

    state = {
        phone:'',
        code:'',
        password:'',
        repasssword:'',
    }

    componentDidMount(){
       // this.props.dispatch({
       //     type:'login/loginFun',
       //     phoneAndCode:{phone:'15016447087',code:'123456'}
       // })
    }

    astrictInputValue = (num,key,event)=> {
        const val = (''+event.target.value).trim().substr(0, num);
        this.setState({
            [key]:val
        })
    }

   verifyFormFun = (type)=>{
      const keyType = type.split(',');
      const { phone,code,password,repassword } = this.state;
      let errorText = [];
      if(keyType.indexOf('phone')>-1){
        if(phone===''){
          errorText.push('手机号码不能为空');
        }
        if(!/^1\d{10}$/.test(phone)){
          errorText.push('手机号码格式不正确');
        }
      }

      if(keyType.indexOf('code')>-1){
        if(code===''){
          errorText.push('验证码不能为空');
        }
        if(''+code.length<6){
          errorText.push('验证码不等于6位数');
        }
      }

      if(keyType.indexOf('password')>-1){
        if(password===''){
          errorText.push('密码不能为空');
        }
        if(''+password.length<6){
          errorText.push('密码不能小于6位数');
        }
        if(password!==repassword){
          errorText.push('两次输入的密码不相等');
        }
      }
      if(errorText.length>0){
        Toast.info(errorText[0],1);
        return false;
      }
      return true;

   }


    handleLogin = ()=>{
      const {phone,code} = this.state;
      if(!this.verifyFormFun('phone,code')) return;
      this.props.dispatch({
        type: 'login/loginFun',
        phoneAndCode:{phone,code}
      });

    }

    handleSendCode =()=>{
        const {phone} = this.state;
        if(!this.props.login.sendCodeAbleClick) return;
        if(!this.verifyFormFun('phone')) return;

        const {dispatch} = this.props;
        dispatch({
            type:'login/sendCodeFun',
            phone:{phone}
        })
    }
    

    render(){
        const {passworldStatus,verifyDisable,verifyText} = this.props.login;
        const {phone,code} = this.state;
        return (
            <div className={styles.login}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <img src={logo} alt=""/>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.group}>
                            <div className={styles.input}>
                                <i className={styles.icon+" iconfont icon-shouji"}></i>
                                <input type="number" value={phone} onChange={this.astrictInputValue.bind(this,11,'phone')} placeholder="请输入手机号码" />
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.input}>
                                <i className={styles.icon+" iconfont icon-yanzhengma"}></i>
                                <input type="number" value={code} disabled={verifyDisable} onChange={this.astrictInputValue.bind(this,6,'code')} placeholder="请输入验证码" />
                                <a className={styles.vcode} onClick={this.handleSendCode} href="javascript:;">{verifyText}</a>
                            </div>
                        </div>
                        {passworldStatus?(
                            <div>
                                <div className={styles.group}>
                                    <div className={styles.input}>
                                        <i className={styles.icon+" iconfont icon-mima"}></i>
                                        <input type="password" placeholder="请输入密码" />
                                    </div>
                                </div>
                                <div className={styles.group}>
                                    <div className={styles.input}>
                                        <i className={styles.icon+" iconfont icon-mima"}></i>
                                        <input type="password" placeholder="再次确认密码" />
                                    </div>
                                </div>
                            </div>
                        ):''}
                        <div className={styles.tips}>
                            <span>温馨提示：未注册美上美App账号的手机号，登录时将会自动注册，且代表您已同意</span>
                            <a className={styles.vip} href="">《用户注册协议》</a>
                        </div>
                    </div>
                    <a className={styles.sigin} href="javascript:;" onClick={this.handleLogin}>登录</a>
                </div>
            </div>

        );
    }
}

export default Login;
