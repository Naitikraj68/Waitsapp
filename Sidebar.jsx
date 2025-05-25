import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectChat }) => {
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "!=", currentUser.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="header">
        <h3>{currentUser.email}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="chat-list">
        {users.map(user => (
          <div key={user.uid} className="chat-user" onClick={() => selectChat(user)}>
            {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
