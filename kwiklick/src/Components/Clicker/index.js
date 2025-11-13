import { useState } from "react"
import corp from "../../Asset/Clicker/corps.png"
import teteContante from "../../Asset/Clicker/tete 1.png"
import teteEnerver from "../../Asset/Clicker/tete 2.png"
import "./styles.sass"

const Clicker = (props) => {
    const [contant, setContant] = useState(true)
    const [animate, setAnimate] = useState(false)

    const clickTete = () => {
        props.Click()
        setContant(false)
        setAnimate(true)

        setTimeout(() => {
            setContant(true)
            setAnimate(false)
        }, 270)
    }

    return (
        <div className="clickerDiv" onClick={clickTete}>
            <div className="character">
                <img
                    className={`teteContante ${!contant ? 'animate' : ''} floating`}
                    src={contant ? teteContante : teteEnerver}
                    alt="tête"
                />
                <img className="corp" src={corp} alt="corps" />
            </div>
        </div>
    )
}

export default Clicker
