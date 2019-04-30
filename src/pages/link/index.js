/*
* title: 美上美App
*
* */
import {connect} from 'dva';


function pagesLink(props){
  if(props.history.location.query=='html'){
    return(
      <div>
        <div dangerouslySetInnerHTML={{__html:props.other.outHtml}}></div>
      </div>)
  }else if(props.history.location.query=='mp4'){
    return (
      <div style={{width:"100%",height:'100vh'}}>
        <video preload='auto' id='my-video' autoPlay={true}  src={props.other.outMp4}  width='100%' height='100%'><p> 不支持video</p> </video>
      </div>
    )
  }else {
    return '';
  }
}

export default connect(({other})=>({
  other
}))(pagesLink);
