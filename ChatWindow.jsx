import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Sidebar from "./Sidebar";

const ChatWindow = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    const chatId = [auth.currentUser.uid, selectedUser.uid].sort().join("_");
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMsg.trim() === "") return;

    const chatId = [auth.currentUser.uid, selectedUser.uid].sort().join("_");

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: newMsg,
      sender: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    });

    setNewMsg("");
  };

  return (
    <div className="chat-container">
      <Sidebar selectChat={setSelectedUser} />
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`msg ${msg.sender === auth.currentUser.uid ? "sent" : "received"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a user to start chat</div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow
