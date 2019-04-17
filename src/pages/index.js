/**
 * title: 首页
 */

import React,{ Component } from 'react';
import styles from './index.css';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import  uuid from 'uuid';
import { List,Button,WhiteSpace,Modal,Toast  } from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state={
      itemList: [
        {id:uuid(),text:'zouhuayi'},
        {id:uuid(),text: 'denghongyi'},
        {id:uuid(),text: 'wengzehua'},
        {id:uuid(),text: 'chengpeifa'},
        {id:uuid(),text: 'luozhichong'}
      ],
      isProps:false,
    }
  }

  // 点击按钮的函数
  clickHandle = () => {
    prompt('温馨提示',null,[
        {
          text:'关闭',
          onPress:value => new Promise((resolve => {
            Toast.info('你不写点东西吗', 1);
            setTimeout(()=>{
              resolve();
            },1000)
          }))
        },
        {
          text: '确认',
          onPress:value => new Promise((resolve,reject)=>{
              if(value.trim()==''){
                Toast.info('输入不能为空哦', 1);
                setTimeout(() => {
                  reject();
                },1000);
              }
              let {itemList} =  this.state;
              itemList.push({
                id:uuid(),
                text:value,
              })
              this.setState({
                itemList:itemList,
              },()=>resolve());
          })
        }
      ],"default",null,['请输入你的名字']
    )
  }


  // 测试css动画
  testCssHandle = () => {
    this.setState({
      isProps:true
    },()=>{
      setTimeout(()=>{
        this.setState({
          isProps:false
        })
      },2000)
    })
  }


  render() {
    return (
      <div>
        <div>
          <TransitionGroup className="todo-list" >
            {
              this.state.itemList.map((item,key)=>{
                return(
                  <CSSTransition key={item.id}  timeout={500} classNames="item">
                    <List  className="my-list">
                      <Item extra={item.text}>Title</Item>
                    </List>

                </CSSTransition>
                )
              })
            }
        </TransitionGroup>
          <WhiteSpace size="lg" />
          <Button type="primary"
                  onClick={this.clickHandle}>Add Item</Button>
          <WhiteSpace size="lg" />
          <CSSTransition timeout={2000} in={this.state.isProps} classNames="my-node">
            <List>
              <Item extra="hello world">Title</Item>
            </List>
          </CSSTransition>
          <WhiteSpace size="lg" />
          <Button type="primary" onClick={this.testCssHandle}>Fade In</Button>
          <WhiteSpace size="lg" />
          <Button type="primary" onClick={()=>{
            router.push('/test')
          }}>Go To Test</Button>
        </div>
      </div>
    );
  }

}


export default TodoList;
