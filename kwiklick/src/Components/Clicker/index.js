import { useState, useEffect } from "react";

const Clicker = () => {

    // Charger le score depuis le localStorage au démarrage
    const [score, setScore] = useState(() => {
        const saveScore = localStorage.getItem("score")
        return saveScore ? Number(saveScore) : 0
    })

    // Sauvegarder le score à chaque modification
    useEffect(() => {
        localStorage.setItem("score", score);
    }, [score]);

    const click = () => {
        setScore((prevScore) => prevScore + 1)
    }

    return(
        <div>
            <span>Score : {score}</span>
            <button onClick={click}>Kwik</button>
        </div>
    );
}

export default Clicker;