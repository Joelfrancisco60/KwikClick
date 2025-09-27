import { useState, useEffect } from "react";
import Clicker from "./Clicker/index";
import FondScore from "../Asset/fondScore.png";
import Shop from "./Shop/index";
import "./styles.sass";

const Main = () => {
  const [score, setScore] = useState(() => {
    const saveScore = localStorage.getItem("score");
    return saveScore ? Number(saveScore) : 0;
  });
  const [scoreSize, setScoreSize] = useState(30);
  const [nClickpPerClick, setNClickpPerClick] = useState(1);
  const [resetShop, setResetShop] = useState(false);

  useEffect(() => {
    localStorage.setItem("score", score);
    if (score >= 1000000) {
      setScoreSize(20);
    }
  }, [score]);

  const click = () => {
    setScore((prevScore) => prevScore + nClickpPerClick);
  };

  const buyClicks = (item) => {
    setScore((prevScore) => prevScore - item);
  }

  const resetAll = () => {
    setNClickpPerClick(1);
    setResetShop(true);
    localStorage.removeItem("buy100");
    localStorage.removeItem("buy10K");
    localStorage.removeItem("buy1M");
  };

  return (
    <div className="main">
      <div className="mainContent">
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
