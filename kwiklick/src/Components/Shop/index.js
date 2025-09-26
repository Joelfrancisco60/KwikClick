import { useState, useEffect } from "react";
import ShopCadre from "../../Asset/Shop/ShopCursorCadre.png";
import ShopPrice from "../../Asset/Shop/ShopPriceCadre.png";
import ShopCadreGris from "../../Asset/Shop/cadreGris1.png";
import ShopPriceGris from "../../Asset/Shop/cadreGris2.png";
import CursorX2 from "../../Asset/Shop/cursorX2.png";
import CursorX4 from "../../Asset/Shop/cursorX4.png";
import CursorX10 from "../../Asset/Shop/cursorX10.png";
import "./styles.sass";

const PriceText = ({ text }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" className="priceText">
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Jore"
      fontSize="24"
      fontWeight="800"
      fill="white"
      stroke="black"
      strokeWidth="8"
      paintOrder="stroke"
    >
      {text}
    </text>
  </svg>
);

const Shop = (props) => {
  const [buy100, setBuy100] = useState(() => JSON.parse(localStorage.getItem("buy100")) ?? true);
  const [buy10K, setBuy10K] = useState(() => JSON.parse(localStorage.getItem("buy10K")) ?? true);
  const [buy1M, setBuy1M] = useState(() => JSON.parse(localStorage.getItem("buy1M")) ?? true);

  useEffect(() => { localStorage.setItem("buy100", JSON.stringify(buy100)); }, [buy100]);
  useEffect(() => { localStorage.setItem("buy10K", JSON.stringify(buy10K)); }, [buy10K]);
  useEffect(() => { localStorage.setItem("buy1M", JSON.stringify(buy1M)); }, [buy1M]);

  useEffect(() => {
    if (props.resetShop) {
      setBuy100(true);
      setBuy10K(true);
      setBuy1M(true);
      props.setResetShop(false);
    }
  }, [props.resetShop]);

  const buy = (clicks) => {
    if (clicks === 2 && props.score >= 100) {
      setBuy100(false);
      props.setNumberClicks(clicks);
    } 
    else if (clicks === 4 && props.score >= 10000) {
      setBuy10K(false);
      setBuy100(false);
      props.setNumberClicks(clicks);
    } 
    else if (clicks === 10 && props.score >= 1000000) {
      setBuy1M(false);
      setBuy10K(false);
      setBuy100(false);
      props.setNumberClicks(clicks);
    }
  };

  return (
    <div className="ShopDiv">
      {/* --- Palier 100 --- */}
      {buy100 ? (
        <div className="ShopElements" onClick={() => buy(2)}>
          <div className="multiplyBackground">
            <img src={ShopCadre} alt="cadre boutique" />
            <img className="multiplyCursor" src={CursorX2} alt="curseur X2" />
          </div>
          <div className="Price">
            <img src={ShopPrice} alt="cadre du prix" />
            <PriceText text="100 $" />
          </div>
        </div>
      ) : (
        <div className="ShopElements">
          <div className="multiplyBackground">
            <img src={ShopCadreGris} alt="cadre boutique" />
            <img className="multiplyCursor" src={CursorX2} alt="curseur X2" />
          </div>
          <div className="Price">
            <img src={ShopPriceGris} alt="cadre du prix" />
            <PriceText text="100 $" />
          </div>
        </div>
      )}

      {/* --- Palier 10K --- */}
      {buy10K ? (
        <div className="ShopElements" onClick={() => buy(4)}>
          <div className="multiplyBackground">
            <img src={ShopCadre} alt="cadre boutique" />
            <img className="multiplyCursor" src={CursorX4} alt="curseur X4" />
          </div>
          <div className="Price">
            <img src={ShopPrice} alt="cadre du prix" />
            <PriceText text="10K $" />
          </div>
        </div>
      ) : (
        <div className="ShopElements">
          <div className="multiplyBackground">
            <img src={ShopCadreGris} alt="cadre boutique" />
            <img className="multiplyCursor" src={CursorX4} alt="curseur X4" />
          </div>
          <div className="Price">
            <img src={ShopPriceGris} alt="cadre du prix" />
            <PriceText text="10K $" />
          </div>
        </div>
      )}

      {/* --- Palier 1M --- */}
      {buy1M ? (
        <div className="ShopElements" onClick={() => buy(10)}>
          <div className="multiplyBackground">
            <img src={ShopCadre} alt="cadre boutique" />
            <img className="multiplyCursor" src={CursorX10} alt="curseur X10" />
          </div>
          <div className="Price">
            <img src={ShopPrice} alt="cadre du prix" />
            <PriceText text="1M $" />
          </div>
        </div>
      ) : (
        <div className="ShopElements">
          <div className="multiplyBackground">
            <img src={ShopCadreGris} alt="cadre boutique" />
            <img className="multiplyCursor" src={CursorX10} alt="curseur X10" />
          </div>
          <div className="Price">
            <img src={ShopPriceGris} alt="cadre du prix" />
            <PriceText text="1M $" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
