import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import DesoApi from "../../deso/api/desoApi";
import DesoIdentity from "../../deso/identity/desoIdentity";
// import fs from "fs";
import MusicList from "./musicList";
import PopUpModal from "./popUpModal";

export default function Header() {
	const [login, setLogin] = useState(false);
	const [toUsername, setToUsername] = useState("@MelanieJ");
	const [allUsers, setAllUsers] = useState([]);
	const [publicKey, setSetPublicKey] = useState(null);
	const [desoIdentity, setDesoIdentity] = useState(null);
	const [desoApi, setDesoApi] = useState(null);
	const IdentityUsersKey = "identityUsersV2";

	useEffect(() => {
		const desoIdentity = new DesoIdentity();
		if (localStorage.getItem("users")) {
			const temp = JSON.parse(localStorage.getItem("users"));
			setAllUsers(temp);
		}
		setDesoIdentity((prev) => desoIdentity);
		const desoApi = new DesoApi();
		setDesoApi((prev) => desoApi);
		var currentUser = {};
		console.log(localStorage.getItem(IdentityUsersKey));
		if (localStorage.getItem(IdentityUsersKey) === "undefined") {
			currentUser = {};
		} else if (localStorage.getItem(IdentityUsersKey)) {
			currentUser = JSON.parse(localStorage.getItem(IdentityUsersKey) || "{}");
		}
		console.log(currentUser);

		if (currentUser.publicKey) {
			setLogin(true);
			setSetPublicKey(currentUser.publicKey);
			setAllUsers((prev) => {
				return [...prev, currentUser.publicKey];
			});
			localStorage.setItem("users", JSON.stringify(allUsers));
		}
	}, []);

	useEffect(() => {
		console.log(login);
	}, [login]);
	const loginToApp = async () => {
		const currentUser = await desoIdentity.loginAsync("4");
		setSetPublicKey(currentUser.publicKey);
		setAllUsers((prev) => {
			return [...prev, currentUser.publicKey];
		});
		localStorage.setItem("users", JSON.stringify(allUsers));
		setLogin(true);
	};

	const logOutOftheApp = async () => {
		const res = await desoIdentity.logout(publicKey);
		setSetPublicKey(null);
		setLogin(false);
	};

	const getUserNfts = async () => {};

	const myTestingFunction = async () => {
		console.log(JSON.stringify(allUsers));
	};

	const createPostForNft = async () => {
		const imgUrl = ["https://i.imgur.com/2w1CRvL.jpeg"];
		const extraData = {};
		const body = "this is to show it works";

		const res = await desoApi.createPostForNfts(
			publicKey,
			body,
			imgUrl,
			extraData,
		);
		const txnHex = res.TransactionHex;
		const signTxnHex = await desoIdentity.signTxAsync(txnHex);
		const res2 = await desoApi.submitTransaction(signTxnHex);

		console.log(res2);

		// const vidsUrl = []
	};

	const mintNft = async () => {
		const s = await createPostForNft();
		const p = await test();
	};

	const test = async () => {
		const getPostsForPublicKey = await desoApi.getPostsForPublicKey(
			"",
			publicKey,
			"",
		);
		console.log(getPostsForPublicKey);
		const lastPostHashHex = getPostsForPublicKey.Posts[0].PostHashHex;

		console.log(lastPostHashHex);
		const txnHex = await desoApi.createNftTxn(publicKey, lastPostHashHex);
		const hex = txnHex.TransactionHex;
		// console.log();
		const signTxnHex = await desoIdentity.signTxAsync(hex);
		console.log("here");

		const sub = await desoApi.submitTransaction(signTxnHex);
		console.log("here");
		console.log(sub);
		console.log("here");
	};

	return (
		<>
			<iframe
				title="desoidentity"
				id="identity"
				frameBorder="0"
				src="https://identity.deso.org/embed?v=2"
				style={{
					height: "100vh",
					width: "100vw",
					display: "none",
					position: "fixed",
					zIndex: 1000,
					left: 0,
					top: 0,
				}}></iframe>
			<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-gray border-bottom shadow-sm">
				<h1 className="my-0 text-gradient mr-md-auto font-weight-normal">
					DeSo(ngs)
				</h1>
				<nav className="my-2 my-md-0 mr-md-3">
					<a className="p-2 text-gradient-green text-info" href="/">
						Home
					</a>
					<a className="p-2 text-gradient-red text-info" href="/">
						Trending
					</a>
					<a className="p-2 text-gradient-blue text-info" href="/">
						Top Songs
					</a>
				</nav>

				<Button
					id="btnUpload"
					className="margin btn-primary"
					variant="danger"
					onClick={loginToApp}>
					Login
				</Button>

				<PopUpModal
					desoIdentity={desoIdentity}
					desoApi={desoApi}
					publicKey={publicKey}></PopUpModal>
				<div style={{ color: "black", margin: "20px" }}> {publicKey} </div>
			</div>
			<MusicList allUsers={allUsers} />
		</>
	);
}
