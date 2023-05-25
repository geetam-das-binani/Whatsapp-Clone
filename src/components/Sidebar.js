import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import SidebarChats from "../components/SidebarChats";
import Avatar from "@mui/material/Avatar";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import db from "../firebase";
import { useStateValue } from "../StateProvider";

export default function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [ {user} , dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
			// map function returns an array of objects
			setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
		);
		return () => unsubscribe();
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar sx={{ width: 30, height: 30 }} src={user?.photoURL} />

				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeOutlinedIcon />
					</IconButton>
					<IconButton>
						
						<ChatOutlinedIcon />
					</IconButton>
					<IconButton>
						<MoreVertOutlinedIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebarSearch__container">
					<SearchIcon />
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div>
			<div className="sidebar__chats">
				<SidebarChats addNewChat />
				{rooms.map((room) => (
					<SidebarChats key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}
