import styles from './index.css';
import withRouter from 'umi/withRouter';
import { TransitionGroup,CSSTransition } from 'react-transition-group';


// function BasicLayout(props) {
//
//     if(props.history.location.pathname==='/login'){
//         return  (<div className={styles.loginbox}>
//                     { props.children }
//                 </div>)
//     }
//
//     return (
//         <div className={styles.normal}>
//               { props.children }
//         </div>
//     );
//
//
//
// }
//
// export default BasicLayout;

export default withRouter(
  ({ location,children }) =>
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
