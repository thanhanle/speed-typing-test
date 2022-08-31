import React, { useState, useEffect  } from "react";
import PARAGRAPHS from "../paragraphs"
import CreateSpanElements from "../components/CreateSpanElements.tsx"

function SpeedGame(props) {

    // used for debugging
    //const [debug, setDebug] = useState("a"); 

    const initialStartTime = "Start";
    const maxTime = 60;
    const [remainingTime, setRemainingTime] = useState(initialStartTime); 
    const [activeTimer, setActiveTimer] = useState(false);
    
    const [displayText, setDisplayText] = useState(""); 
    const [userInput, setUserInput] = useState(""); 
    const [wordsPerMin, setWordsPerMin] = useState("NA");
    const [accuracy, setAccuracy] = useState("NA");

    const [splitToArr, setSplitToArr] = useState([]);
    const [newArr, setNewArr] = useState([]);
    const [inpBoxSplit, setInpBoxSplit] = useState([]);
    const [incorrectEntry, setIncorrectEntry] = useState(0);

    useEffect(() => {
        if ((activeTimer) && (remainingTime === initialStartTime))
        {
            startGame();
        }
        else if ((activeTimer) && (remainingTime <= maxTime && (remainingTime >= 1 && remainingTime >= -20)))  // -20 is for exception occuring
        {
            setTimeout(() => {
                setRemainingTime((timeText) => timeText - 1);
            }, 1000);  // default is 1000  // test 100
        }
        else if ((activeTimer) && (remainingTime <= 0 && remainingTime >= -20))  // -20 is for exception occuring
        {
            setActiveTimer(false);
            setRemainingTime(initialStartTime);
            endGame()
        }
        else
        {
            // do nothing
        }
    }, [remainingTime, activeTimer]);

    //todo
    function startGame()
    {
        setDisplayText(PARAGRAPHS[Math.floor(Math.random()*(PARAGRAPHS.length-0)+0)]);
        setWordsPerMin("NA");
        setAccuracy("NA");
        setUserInput("");
        setSplitToArr([]);
        setInpBoxSplit([]);
        setIncorrectEntry(0);
        setRemainingTime(maxTime);
    }

    // todo
    function handleInput(e)
    {
        setUserInput(e.target.value);
        
        // debug
        //setDebug(e.target.value);
    }

    useEffect(() => {
        if(userInput){
            setInpBoxSplit(userInput.split(''));
        }
    }, [userInput]);

    useEffect(() => {
        compareStuff();
    }, [inpBoxSplit]);

    function compareStuff()
    {
        if(inpBoxSplit[inpBoxSplit.length - 1] !== splitToArr[inpBoxSplit.length - 1]){
            const copyArr = newArr.slice();
            copyArr[inpBoxSplit.length - 1] = <CreateSpanElements value={splitToArr[inpBoxSplit.length - 1]} index={inpBoxSplit.length-1} nameClass="wrongText"/>;
            setIncorrectEntry(prevState => ++prevState);
            setNewArr(copyArr);
        }
        else{
            const copyArr = newArr.slice();
            copyArr[inpBoxSplit.length - 1] = <CreateSpanElements value={splitToArr[inpBoxSplit.length - 1]} index={inpBoxSplit.length-1} nameClass="correctText"/>;
            setNewArr(copyArr);
        }
    }

    useEffect(() => {
        if(displayText){
            setSplitToArr(displayText.split(''));
        }
    }, [displayText]);

    useEffect(() => {
        setNewArr(splitToArr.map((val,index) => <CreateSpanElements value={val} index={index} nameClass="normalText"/>));
    }, [splitToArr]);

    function calculateResults()
    {
        setWordsPerMin((userInput.length / 5) / (maxTime / 60));
        setAccuracy((((userInput.length - incorrectEntry) / userInput.length) * 100).toFixed(2));
    }

    //todo
    function endGame()
    {
        calculateResults();
        setNewArr([]);
    }

    //todo
    function resetGame()
    {
        setActiveTimer(false);
        setUserInput("");
        setDisplayText("");
        setRemainingTime(initialStartTime);
    }

    return (
        <div>

            <div div className="filters btn-group stack-exception">
                <button type="submit" className="btn">
                    Speed Game
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    //aria-pressed={props.isPressed}
                    onClick={() => props.setComponent(props.Component.USERPAGE)}
                >
                    User Page
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    //aria-pressed={props.isPressed}
                    onClick={() => props.setComponent(props.Component.APP)}
                >
                    App Example
                </button>
            </div>

            <h1>Speed Game</h1>
            <div>
                <button
                    type="button"
                    //class="start-button"
                    className="btn toggle-btn"
                    //value = "start"
                    //name="start"
                    //aria-pressed={props.isPressed}
                    onClick={() => setActiveTimer(true)}
                >
                    {remainingTime}
                </button>
            </div>
            
            <div>
                {newArr}
            </div>

            <div>
                <input 
                    type="text"
                    // id="new-todo-input"
                    //class="input-text"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    //size="300"
                    //width="48" 
                    //height="300"
                    value={userInput}
                    onChange={handleInput}
                />
            </div>

            {/* used for debugging */}
            {/* <div>
                {debug}
            </div> */}

            <div>
                <h2>WPM: {wordsPerMin}</h2>
            </div>
            <div>
                <h2>Accuracy: {accuracy}%</h2>
            </div>

        </div>
    );
}

export default SpeedGame;
