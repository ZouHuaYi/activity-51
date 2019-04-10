import styles from './index.css';

function BasicLayout(props) {

    if(props.history.location.pathname==='/login'){
        return  (<div className={styles.loginbox}>
                    { props.children }
                </div>)
    }

    
    return (
        <div className={styles.normal}>
            { props.children }
        </div>
    );



}

export default BasicLayout;
