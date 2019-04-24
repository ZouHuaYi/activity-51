import styles from './index.css';
import withRouter from 'umi/withRouter';
import { TransitionGroup,CSSTransition } from 'react-transition-group';
import React from 'react';
import {browerType, getQueryString} from "@/utils/utils";
import {setActivityId,setParentId} from '@/utils/jscookie';
import {Modal} from 'antd-mobile';

class BasicLayout extends React.Component {

  componentWillMount(){
    // 微信页面打开的时候
    if(browerType()==='isWechat'){
      const code = getQueryString('code');
      if(code){
        // 获取到微信值后微信登录执行
        window.g_app._store.dispatch({
          type:'wechat/getUnionId',
          code:{code}
        })
      }else {
        const appid = 'wx594f420067cba83d';
        const backUrl = encodeURIComponent(window.location.href);
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      }
    }
    const activity = getQueryString('activity');
    if(activity){
      setActivityId(activity);
    }else {
      Modal.alert('温馨提示','该活动已经停止，请跟活动相关的负责人联系',[
        {text:'确定',onPress:()=>{ }}
      ])
      return;
    }
    const inviterId = getQueryString('inviter');
    if(inviterId){
      setParentId(inviterId);
    }
  }

  render(){
    const {location,children} = this.props;
    return(
          <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
              {
                location.pathname==='/login'?
                  (<div className={styles.loginbox}>
                    {children}
                  </div>):(
                    <div className={styles.normal}>
                      { children }
                    </div>)
              }
            </CSSTransition>
          </TransitionGroup>
    )
  }
}


export default withRouter(BasicLayout)

