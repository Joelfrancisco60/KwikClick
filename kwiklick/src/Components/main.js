import { useState, useEffect, useRef } from "react";
import Clicker from "./Clicker/index";
import FondScore from "../Asset/fondScore.png";
import FlyingVideo from "../Asset/mouchee_VP9.webm";
import Shop from "./Shop/index";
import "./styles.sass";

const VIDEO_WIDTH = 400;
const VIDEO_HEIGHT = 300;
const SPEED = 4;

const Main = () => {
  const [score, setScore] = useState(() => {
    const saveScore = localStorage.getItem("score");
    return saveScore ? Number(saveScore) : 0;
  });
  const [scoreSize, setScoreSize] = useState(30);
  const [nClickpPerClick, setNClickpPerClick] = useState(1);
  const [resetShop, setResetShop] = useState(false);
  const [showFlier, setShowFlier] = useState(false);

  const lastThresholdRef = useRef(Math.floor(score / 100));
  const prevScoreRef = useRef(score); // 👈 on garde l'ancien score
  const posRef = useRef({ x: 100, y: 100 });
  const velRef = useRef({ x: SPEED, y: SPEED });
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!showFlier) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      posRef.current.x += velRef.current.x;
      posRef.current.y += velRef.current.y;

      if (posRef.current.x + VIDEO_WIDTH >= vw) {
        posRef.current.x = vw - VIDEO_WIDTH;
        velRef.current.x = -Math.abs(velRef.current.x);
      } else if (posRef.current.x <= 0) {
        posRef.current.x = 0;
        velRef.current.x = Math.abs(velRef.current.x);
      }

      if (posRef.current.y + VIDEO_HEIGHT >= vh) {
        posRef.current.y = vh - VIDEO_HEIGHT;
        velRef.current.y = -Math.abs(velRef.current.y);
      } else if (posRef.current.y <= 0) {
        posRef.current.y = 0;
        velRef.current.y = Math.abs(velRef.current.y);
      }

      if (videoRef.current) {
        videoRef.current.style.left = `${posRef.current.x}px`;
        videoRef.current.style.top = `${posRef.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [showFlier]);

  useEffect(() => {
    localStorage.setItem("score", score);
    if (score >= 1000000) setScoreSize(20);

    const currentThreshold = Math.floor(score / 100);
    const scoreIncreased = score > prevScoreRef.current; // 👈 le score a augmenté ?

    if (scoreIncreased && currentThreshold > lastThresholdRef.current) {
      lastThresholdRef.current = currentThreshold;
      posRef.current = {
        x: Math.random() * (window.innerWidth - VIDEO_WIDTH),
        y: Math.random() * (window.innerHeight - VIDEO_HEIGHT),
      };
      const angle = Math.random() * Math.PI * 2;
      velRef.current = {
        x: Math.cos(angle) * SPEED,
        y: Math.sin(angle) * SPEED,
      };
      setShowFlier(true);
    }

    prevScoreRef.current = score; // 👈 on met à jour l'ancien score
  }, [score]);

  const click = () => {
    if (showFlier) return;
    setScore((prevScore) => prevScore + nClickpPerClick);
  };

  const buyClicks = (item) => {
    setScore((prevScore) => prevScore - item);
  };

  const resetAll = () => {
    setNClickpPerClick(1);
    setResetShop(true);
    lastThresholdRef.current = 0;
    setShowFlier(false);
    localStorage.removeItem("buy100");
    localStorage.removeItem("buy10K");
    localStorage.removeItem("buy1M");
  };

  const handleFlierClick = () => {
    setShowFlier(false);
  };

  return (
    <div className="main">
      {showFlier && (
        <video
          ref={videoRef}
          className="bouncing-video"
          src={FlyingVideo}
          autoPlay
          loop
          muted
          playsInline
          onClick={handleFlierClick}
          style={{
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            left: posRef.current.x,
            top: posRef.current.y,
          }}
        />
      )}

      <div className={`mainContent ${showFlier ? "blocked" : ""}`}>
        <div className="shop">
          <Shop
            setNumberClicks={setNClickpPerClick}
            score={score}
            buyClicks={buyClicks}
            resetShop={resetShop}
            setResetShop={setResetShop}
          />
        </div>
        <div className="ShopElements" onClick={resetAll}>
          <button>reset</button>
        </div>
        <div className="clicker">
          <Clicker Click={click} />
        </div>
        <div className="score">
          <img src={FondScore} alt="fond score" />
          <span style={{ fontSize: scoreSize }}>{score} $</span>
        </div>
      </div>
    </div>
  );
};

export default Main;
