import React, { useState, useEffect } from "react";
import "../styles/chat.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
export default function Chats() {
	const [{ user }, dispatch] = useStateValue();
	const [Seed, setSeed] = useState("");
	const [Input, setInput] = useState("");
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);
	const { roomId } = useParams();

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot((snapshot) => setRoomName(snapshot.data().name));
		}

		db.collection("rooms")
			.doc(roomId)
			.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setMessages(snapshot.docs.map((doc) => doc.data()))
			);
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	useEffect(() => {
		const clear = setTimeout(() => {
			setSeed(Math.floor(Math.random() * 5000));
		}, 500);
		return () => clearTimeout(clear);
	}, []);

	const sendMessage = (e) => {
		// only enter key will work when button having type submit is clicked inside a form
		e.preventDefault();
		db.collection("rooms").doc(roomId).collection("messages").add({
			message: Input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			// server time
		});
		setInput("");
	};
	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar
					alt="Remy Sharp"
					src={`https://avatars.dicebear.com/api/male/${Seed}.svg`}
					// sx={{ width: 30, height: 30 }}
				/>
				<div className=" chat__headerinfo">
					<h3>{roomName}</h3>
					<p>
						last seen at {""}
						{new Date(messages[messages.length - 1]?.timestamp?.toDate())
							.toUTCString()
							.slice(0, -3)}
					</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertOutlinedIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map(
					(msgs) => {
						const { message, name, timestamp } = msgs;
						return (
							<p
								key={message}
								className={`chat__message ${
									name === user.displayName && "chat__receiver"
								}`}
							>
								<span key={message} className="chat__name">
									{name}
								</span>
								{message}
								<span key={message} className="time__stamp">
									{new Date(timestamp?.toDate()).toUTCString().slice(0, -3)}
								</span>
							</p>
						);
					}
				
				)}
			</div>
			<div className="chat__footer">
				<IconButton>
					<InsertEmoticonIcon />
				</IconButton>
				<form>
					<input
						value={Input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder="Type a message"
					/>
					<button onClick={sendMessage} type="submit">
						Send a message
					</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</div>
		</div>
	);
}
