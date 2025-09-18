import "./styles.sass"

const Clicker = (props) => {

    return(
        <div className="clickerDiv">
            <button onClick={props.Click}>Kwik</button>
        </div>
    );
}

export default Clicker;