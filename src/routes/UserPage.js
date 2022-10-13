import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext'
import { firebaseFirestore, db } from '../firebase'
import { doc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { Form, Button, Card, Alert } from "react-bootstrap";

function UserPage(props) {

    const [error, setError] = useState('');
    const { logout, currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    // if (loading)
    // {
    //     return <h1>Loading...</h1>;
    // }

    async function handleLogout(e)
    {
        setError('');

        try {
            await logout()
            props.setComponent(props.Component.LOGIN);
        } catch {
            setError('Failed to log out');
        }
    }

    async function clearData()
    {
        try {
            await props.userGameData.map((gameData) => {
                deleteDoc(doc(db, 'Users', currentUser.email, 'Games', gameData.id));
            });

            getUserGameData()
        } catch (error) {
            console.error(error);
        }
    }

    async function getUserGameData()
    {
        setLoading(true);

        const querySnapshot = await getDocs(collection(db, 'Users', currentUser.email, 'Games'));
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        props.setUserGameData(items);
        
        setLoading(false);
    }

    useEffect(() => {
        getUserGameData();
    }, []);

    return (
        <div>
            <div className="filters btn-group stack-exception">
                <button
                    type="button"
                    className="btn toggle-btn"
                    onClick={() => props.setComponent(props.Component.SPEEDGAME)}
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
                <button type="button" className="btn">
                    User Profile
                </button>
            </div>

            <h1>{currentUser.email}'s User Profile</h1>

            <div>
                {props.userGameData.map((userGameData) => (
                    <div key={userGameData.id}>
                        <h1>{userGameData.id}</h1>
                        <p className="text-center mb-4">wpm: {userGameData.wpm}</p>
                        <p className="text-center mb-4">accuracy: {userGameData.accuracy}%</p>
                    </div>
                ))}
            </div>

            <div className="w-100 text-center mt-2">
                <Button onClick={() => clearData()}>
                    Clear Data
                </Button>
                <Button onClick={() => handleLogout()}>
                    Logout
                </Button>
            </div>

        </div>
        
    );
}

export default UserPage;
