import React, { useEffect, useState } from "react";
import "./tableStyles.css";
import axios from "axios";

export default function UserActivity() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_ENDPOINT}`;
        axios.get(`${url}/users`).then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    console.log('Data fetched: ', users);
    return (
        <div className="layer">
            <h2>User's Activity Tracker</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.hasTakenTest ? `🟩 Completed` : `🟥 Not completed`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
