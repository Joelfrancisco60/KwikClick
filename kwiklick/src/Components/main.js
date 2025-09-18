import { useState, useEffect } from "react";
import Clicker from "./Clicker/index";
import FondScore from "../Asset/fondScore.png";
import "./styles.sass";

const Main = () => {
  const [score, setScore] = useState(() => {
    const saveScore = localStorage.getItem("score");
    return saveScore ? Number(saveScore) : 0;
  });
  const [scoreSize, setScoreSize] = useState((30))

  useEffect(() => {
    localStorage.setItem("score", score);
    if (score >= 1000000) {
      setScoreSize(20)
    }
  }, [score]);

  const click = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="main">
      <div className="mainContent">
        <div className="coucou">coucou</div>
        <div className="clicker">
          <Clicker Click={click} />
        </div>
        <div className="score">
          <img src={FondScore} alt="fond score" />
          <span style={{'fontSize' : scoreSize}}>{score} $</span>
        </div>
      </div>
    </div>
  );
};

export default Main;