import MusicList from "./musicList";
import "./styles.css";
import Header from "./header";
import { useEffect, useState } from "react";
import DesoApi from "../../deso/api/desoApi";
import DesoIdentity from "../../deso/identity/desoIdentity";

export default function MainPage() {
	// const [login, setLogin] = useState(false);
	// const [toUsername, setToUsername] = useState("@MelanieJ");
	// const [message, setMessage] = useState(
	// 	"👉 waiting for you to send your GM...",
	// );
	// const [publicKey, setSetPublicKey] = useState(null);
	// const [desoIdentity, setDesoIdentity] = useState(null);
	// const [desoApi, setDesoApi] = useState(null);
	// const IdentityUsersKey = "identityUsersV2";

	// useEffect(() => {
	// 	const desoIdentity = new DesoIdentity();
	// 	setDesoIdentity((prev) => desoIdentity);
	// 	const desoApi = new DesoApi();
	// 	setDesoApi((prev) => desoApi);
	// 	var currentUser = {};
	// 	console.log(localStorage.getItem(IdentityUsersKey));
	// 	if (localStorage.getItem(IdentityUsersKey) === "undefined") {
	// 		currentUser = {};
	// 	} else if (localStorage.getItem(IdentityUsersKey)) {
	// 		currentUser = JSON.parse(localStorage.getItem(IdentityUsersKey) || "{}");
	// 	}
	// 	console.log(currentUser);

	// 	if (currentUser.publicKey) {
	// 		setLogin(true);
	// 		setSetPublicKey(currentUser.publicKey);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	console.log(login);
	// }, [login]);

	// const getUserNfts = async () => {};

	return (
		<>
			<div className="container mt-5 mb-3">
				<Header />
				
			</div>
		</>
	);
}
