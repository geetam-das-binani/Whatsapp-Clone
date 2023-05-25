import React from "react";
import "../styles/login.css";
import { Button } from "@mui/material";
import { auth } from "../firebase";
import { provider } from "../firebase";
import { useStateValue } from "../StateProvider";

export default function Login() {
	const [{ user }, dispatch] = useStateValue();
	const singIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: "SET_USER",
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	};
	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png "
					alt="whatsapp logo"
				/>
				<div className="login__text">
					<h1>Sign in to WhatsApp</h1>
				</div>
				<Button onClick={singIn}>Sign in with Google</Button>
			</div>
		</div>
	);
}
