import styles from './index.css'
import CicleArch from './CicleArch';
import CicleCanvas from './CicleCanvas'

function DiscBox(props) {

  return(
    <div>
      <div className={styles.circle}>


        <CicleArch/>
      </div>
      <CicleCanvas></CicleCanvas>
    </div>
  )

}

export default DiscBox;
