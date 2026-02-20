import { useState, useRef } from "react"
import corp from "../../Asset/Clicker/corps.png"
import teteContante from "../../Asset/Clicker/tete 1.png"
import teteEnerver from "../../Asset/Clicker/tete 2.png"
import "./styles.sass"

const Clicker = (props) => {
    const [contant, setContant] = useState(true)
    const [animate, setAnimate] = useState(false)
    const timeoutRef = useRef(null)

    const clickTete = () => {
        props.Click()
        setContant(false)
        setAnimate(false)

        requestAnimationFrame(() => {
            setAnimate(true)
        })

        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            setContant(true)
            setAnimate(false)
        }, 300)
    }

    return (
        <div className="clickerDiv" onClick={clickTete}>
            <div className="character">
                <img
                    className={`teteContante floating ${animate ? 'animate' : ''}`}
                    src={contant ? teteContante : teteEnerver}
                    alt="tête"
                />
                <img className="corp" src={corp} alt="corps" />
            </div>
        </div>
    )
}

export default Clicker