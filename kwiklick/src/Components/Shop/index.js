import ShopCadre from "../../Asset/Shop/ShopCursorCadre.png"
import ShopPrice from "../../Asset/Shop/ShopPriceCadre.png"
import CursorX2 from "../../Asset/Shop/cursorX2.png"
import CursorX4 from "../../Asset/Shop/cursorX4.png"
import CursorX10 from "../../Asset/Shop/cursorX10.png"
import "./styles.sass"

const PriceText = ({ text }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 50"
        className="priceText"
    >
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

const Shop = () => {
    return (
        <div className="ShopDiv">
            <div className="ShopElements">
                <div className="multiplyBackground">
                    <img src={ShopCadre} alt="cadre boutique" />
                    <img className="multiplyCursor" src={CursorX2} alt="curseur X2" />
                </div>
                <div className="Price">
                    <img src={ShopPrice} alt="cadre du prix" />
                    <PriceText text="100 $" />
                </div>
            </div>
            <div className="ShopElements">
                <div className="multiplyBackground">
                    <img src={ShopCadre} alt="cadre boutique" />
                    <img className="multiplyCursor" src={CursorX4} alt="curseur X2" />
                </div>
                <div className="Price">
                    <img src={ShopPrice} alt="cadre du prix" />
                    <PriceText text="10K $" />
                </div>
            </div>
            <div className="ShopElements">
                <div className="multiplyBackground">
                    <img src={ShopCadre} alt="cadre boutique" />
                    <img className="multiplyCursor" src={CursorX10} alt="curseur X2" />
                </div>
                <div className="Price">
                    <img src={ShopPrice} alt="cadre du prix" />
                    <PriceText text="1M $" />
                </div>
            </div>
        </div>
    );
};

export default Shop;
