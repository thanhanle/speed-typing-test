import React, { useState, useEffect  } from "react";
import PARAGRAPHS from "../paragraphs"
import CreateSpanElements from "../components/CreateSpanElements.tsx"
import { useAuth } from '../contexts/AuthContext'
import { firebaseFirestore, db } from '../firebase'
import { doc, getDoc, getDocs, collection, deleteDoc, setDoc } from "firebase/firestore";

function SpeedGame(props) {

    // used for debugging
    //const [debug, setDebug] = useState("a"); 

    const { currentUser } = useAuth();

    const initialStartTime = "Start";
    const maxTime = 60;
    const [remainingTime, setRemainingTime] = useState(initialStartTime); 
    const [activeTimer, setActiveTimer] = useState(false);
    
    const [displayText, setDisplayText] = useState(""); 
    const [userInput, setUserInput] = useState(""); 
    const [wordsPerMin, setWordsPerMin] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const [displayTextArr, setDisplayTextArr] = useState([]);
    const [newArr, setNewArr] = useState([]);
    const [userInputArr, setUserInputArr] = useState([]);
    const [incorrectEntry, setIncorrectEntry] = useState(0);

    useEffect(() => {
        if ((activeTimer) && (remainingTime === initialStartTime))
        {
            startGame();
        }
        else if ((activeTimer) && (remainingTime <= maxTime && (remainingTime >= 1 && remainingTime >= -20)))  // -20 is for exception occuring
        {
            if (userInput.length >= displayText.length)
            {
                resetGame();
            }
            else
            {
                setTimeout(() => {
                    setRemainingTime((remainingTime) => remainingTime - 1);
                }, 1000);  // default is 1000  // test 100
            }
        }
        else if ((activeTimer) && (remainingTime <= 0 && remainingTime >= -20))  // -20 is for exception occuring
        {
            resetGame();
        }
        else
        {
            // do nothing
        }
    }, [remainingTime, activeTimer]);

    function startGame()
    {
        setNewArr([]);
        //setWordsPerMin(0);
        //setAccuracy(0);
        setUserInput("");
        setUserInputArr([]);
        setIncorrectEntry(0);
        setDisplayText(PARAGRAPHS[Math.floor(Math.random()*(PARAGRAPHS.length-0)+0)]);
        setNewArr(displayTextArr.map((val,index) => <CreateSpanElements value={val} index={index} nameClass="normalText"/>));
        setRemainingTime(maxTime);
    }
    
    function resetGame()
    {
        setActiveTimer(false);
        setRemainingTime(initialStartTime);
        calculateResults();
    }

    function handleInput(e)
    {
        setUserInput(e.target.value);
        
        // debug
        //setDebug(e.target.value);
    }

    useEffect(() => {
        if(userInput){
            setUserInputArr(userInput.split(''));
        }
    }, [userInput]);

    useEffect(() => {
        if (!activeTimer)
        {
            //
        }
        else
        {
            compareStuff();
        }
    }, [userInputArr]);

    function compareStuff()
    {
        if(userInputArr[userInputArr.length - 1] !== displayTextArr[userInputArr.length - 1]){
            const copyArr = newArr.slice();
            copyArr[userInputArr.length - 1] = <CreateSpanElements value={displayTextArr[userInputArr.length - 1]} index={userInputArr.length-1} nameClass="wrongText"/>;
            setIncorrectEntry(prevState => ++prevState);
            setNewArr(copyArr);
        }
        else{
            const copyArr = newArr.slice();
            copyArr[userInputArr.length - 1] = <CreateSpanElements value={displayTextArr[userInputArr.length - 1]} index={userInputArr.length-1} nameClass="correctText"/>;
            setNewArr(copyArr);
        }
    }

    useEffect(() => {
        if(displayText){
            setDisplayTextArr(displayText.split(''));
        }
    }, [displayText]);

    useEffect(() => {
        setNewArr(displayTextArr.map((val,index) => <CreateSpanElements value={val} index={index} nameClass="normalText"/>));
    }, [displayTextArr]);

    function calculateResults()
    {
        const displayWPM = ((userInput.length / 5) / (maxTime / 60));
        const displayAccuracy = ((((userInput.length - incorrectEntry) / userInput.length) * 100).toFixed(2));

        setWordsPerMin(displayWPM);
        setAccuracy(displayAccuracy);

        storeResultsToDB(displayWPM, displayAccuracy);
    }

    async function storeResultsToDB(displayWPM, displayAccuracy)
    {
        try {
            const querySnapshot = await getDocs(collection(db, 'Users', currentUser.email, 'Games'));
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            props.setUserGameData(items);

            const numOfGameData = props.userGameData.length + 1;
            // const wpm = Math.floor(wordsPerMin);
            // const acc = Math.floor(accuracy);
            const idString = 'game' + numOfGameData;
            const data = {
                wpm: parseFloat(displayWPM),
                accuracy: parseFloat(displayAccuracy),
                id: idString
            }

            // console.log(displayWPM);
            // console.log(displayAccuracy);
            // console.log(JSON.stringify(displayWPM));
            // console.log(JSON.stringify(displayAccuracy));
            // console.log(wordsPerMin);
            // console.log(accuracy);
            // console.log(JSON.stringify(wordsPerMin));
            // console.log(JSON.stringify(accuracy));
            // console.log(data);
            // console.log(typeof displayWPM);

            await setDoc(doc(db, 'Users', currentUser.email, 'Games', idString), data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>

            <div className="filters btn-group stack-exception">
                <button 
                    type="button" 
                    className="btn"
                >
                    Speed Game
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    onClick={() => props.setComponent(props.Component.TaskListPage)}
                >
                    Task List
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    onClick={() => props.setComponent(props.Component.USERPAGE)}
                >
                    User Profile
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
