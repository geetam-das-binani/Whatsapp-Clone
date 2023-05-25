import React, { useEffect, useState } from "react";
import "../styles/sidebarchats.css";
import Avatar from "@mui/material/Avatar";
import db from "../firebase";
import { Link } from "react-router-dom";
export default function SidebarChats({ addNewChat, id, name }) {
	const [Seed, setSeed] = useState("");
	const [messages, setMessages] = useState([]);
	
	

	const createChat = () => {
		const roomName = prompt("Please enter name for chat");
		if (roomName) {
			// database stuff
			db.collection("rooms").add({
				name: roomName,
			});
		}
	};
	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	useEffect(() => {
		const clear = setTimeout(() => {
			setSeed(Math.floor(Math.random() * 5000));
		}, 500);
		return () => clearTimeout(clear);
	}, []);
	return !addNewChat ? (
		<Link to={`/rooms/${id}`} className="sidebarChats__links">
			<div className="sidebarchats">
				<Avatar
					alt="Remy Sharp"
					src={`https://avatars.dicebear.com/api/male/${Seed}.svg`}
				/>
				<div className="sidebarChat">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div className="sidebarchats" onClick={createChat}>
			<h2>Add new chat</h2>
		</div>
	);
}
