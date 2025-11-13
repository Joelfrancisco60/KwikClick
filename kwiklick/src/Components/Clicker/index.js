import { useState, useEffect } from "react"
import gsap from "gsap"
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

    // Stoppe GSAP pendant le clic
    gsap.killTweensOf(".teteContante")

    // Animation de descente rapide
    gsap.to(".teteContante", {
      y: 100,
      duration: 0.20,
      ease: "power1.inOut",
      onComplete: () => {
        // Remonte la tête
        gsap.to(".teteContante", {
          y: 0,
          duration: 0.20,
          ease: "power1.inOut",
          onComplete: () => {
            setContant(true)
            setAnimate(false)
            // Relance le flottement aléatoire
            startFloating()
          }
        })
      }
    })
  }

  const startFloating = () => {
    const animate = () => {
      gsap.to(".teteContante", {
        x: () => (Math.random() - 0.5) * 30,
        y: () => (Math.random() - 0.5) * 30,
        duration: 3,
        ease: "sine.inOut",
        onComplete: animate
      })
    }
    animate()
  }

  useEffect(() => {
    startFloating()
  }, [])

  return (
    <div className="clickerDiv" onClick={clickTete}>
      <div className="character">
        <img
          className="teteContante"
          src={contant ? teteContante : teteEnerver}
          alt="tête"
        />
        <img className="corp" src={corp} alt="corps" />
      </div>
    </div>
  )
}

export default Clicker
