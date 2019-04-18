/**
 * title: 首页
 */

import React,{ Component } from 'react';
import styles from './index.css';
import { List,Button,WhiteSpace,Modal,Toast  } from 'antd-mobile';
import DrawGift from '@/components/Raffle/DrawGift'

class TodoList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <DrawGift/>
      </div>
    );
  }

}


export default TodoList;
