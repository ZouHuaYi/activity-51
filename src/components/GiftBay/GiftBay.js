import styles from "./index.css";

function GiftBay(props) {
  return(
    <div className={styles.giftBag}>
      <img className={styles.giftTopImg} src={props.topImg} alt=""/>
    </div>
  )
}

export default GiftBay;
