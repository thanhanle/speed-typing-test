import React, { useState } from "react";
//import { render } from "react-dom";
//import { Router } from "@reach/router";

import Login from './Login';
import SpeedGame from './SpeedGame';
import UserPage from './UserPage';
import ErrorPage from './ErrorPage';

import App from './App';
import Register from './Register';

import '../firebase';
import { AuthProvider } from '../contexts/AuthContext'

// const DATA = [
//     { id: "todo-0", name: "Eat", completed: true },
//     { id: "todo-1", name: "Sleep", completed: false },
//     { id: "todo-2", name: "Repeat", completed: true }
// ];

function Main(props) {

    const Component = {
        LOGIN: 1,
        SPEEDGAME: 2,
        USERPAGE: 3,
        ERRORPAGE: 4,

        APP: 5,
        REGISTER: 6
    };
    Object.freeze(Component);

    const [currentComponent, setComponent] = useState(Component.LOGIN);
    const [userGameData, setUserGameData] = useState([]);

    //const [isEditing, setEditing] = useState("");

    function renderComponent()
    {
        if (currentComponent === Component.APP)
        {
            return <App setComponent={setComponent} Component={Component} />;
        }
        else if (currentComponent === Component.LOGIN)
        {
            return <Login setComponent={setComponent} Component={Component} />;
        }
        else if (currentComponent === Component.SPEEDGAME)
        {
            return <SpeedGame setComponent={setComponent} Component={Component} userGameData={userGameData} setUserGameData={setUserGameData} />;
        }
        else if (currentComponent === Component.USERPAGE)
        {
            return <UserPage setComponent={setComponent} Component={Component} userGameData={userGameData} setUserGameData={setUserGameData} />;
        }
        else if (currentComponent === Component.ERRORPAGE)
        {
            return <ErrorPage setComponent={setComponent} Component={Component} />;
        }
        else if (currentComponent === Component.REGISTER)
        {
            return <Register setComponent={setComponent} Component={Component} />;
        }
    }

    return (
        <AuthProvider>
            <div className="todoapp stack-large">
                {/* <Router>
                    <Main path="/">
                        <Login path="login" />
                        <SpeedGame>
                        </SpeedGame>
                        <UserPage>
                        </UserPage>
                        <ErrorPage path="error" />
                    </Main>
                </Router> */}
                <div>
                {
                    renderComponent()
                }
                </div>
            </div>
        </AuthProvider>

        //use conditional rendering here and mix in routing
        // <li className="todo">
        //     {
        //         isEditing ? editingTemplate : viewTemplate
        //     }
        // </li>    

        // <div>
        //     <Logo />
        //     <Router>
        //     <Home path="/">
        //         <About path="about" />
        //         <Support path="support" />
        //         <Dash path="dashboard">
        //         <DashHome path="/" />
        //         <Invoices path="invoices" />
        //         <Team path="team" />
        //         </Dash>
        //     </Home>
        //     </Router>
        // </div>,
    );
}

export default Main;
