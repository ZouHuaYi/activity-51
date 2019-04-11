/**
 * title: 首页
 */

import React from 'react';
import styles from './index.css';
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import router from 'umi/router';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    router.push('/login');
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>
        <button className={styles.ok} onClick={this.handleAdd}>Add Item</button>
        <TransitionGroup className={styles.todo}>
          {this.state.items.map((item,i)=>(
            <CSSTransition key={i} timeout={500} className={styles.item}>
              <div className={styles.okitem} onClick={() =>  this.handleRemove(i)} >
                {item}
              </div>
            </CSSTransition>))
          }
        </TransitionGroup>
      </div>
    );
  }
}
export default TodoList;
