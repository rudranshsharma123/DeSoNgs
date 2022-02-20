import React, { useState, useEffect } from "react";
import DesoApi from "../../deso/api/desoApi";
import DesoIdentity from "../../deso/identity/desoIdentity";

const TestingPage = () => {
	const [login, setLogin] = useState(false);
	const [toUsername, setToUsername] = useState("@MelanieJ");
	const [message, setMessage] = useState(
		"👉 waiting for you to send your GM...",
	);
	const [publicKey, setSetPublicKey] = useState(null);
	const [desoIdentity, setDesoIdentity] = useState(null);
	const [desoApi, setDesoApi] = useState(null);
	const IdentityUsersKey = "identityUsersV2";

	useEffect(() => {
		const desoIdentity = new DesoIdentity();
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
		}
	}, []);

	useEffect(() => {
		console.log(login);
	}, [login]);
	const loginToApp = async () => {
		const currentUser = await desoIdentity.loginAsync("4");
		setSetPublicKey(currentUser.publicKey);
		setLogin(true);
	};

	const logOutOftheApp = async () => {
		const res = await desoIdentity.logout(publicKey);
		setSetPublicKey(null);
		setLogin(false);
	};

	const getUserNfts = async () => {};

	const createPostForNft = async () => {
		const imgUrl = ["https://i.imgur.com/2w1CRvL.jpeg"];
		const extraData = {};
		const body = "Why are the images not showing up :(";

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

	const test = async () => {
		const getPostsForPublicKey = await desoApi.getPostsForPublicKey(
			"",
			publicKey,
			"",
		);
		console.log(getPostsForPublicKey);
		const lastPostHashHex = getPostsForPublicKey.LastPostHashHex;
		const txnHex = await desoApi.createNftTxn(publicKey, lastPostHashHex);
		const hex = txnHex.TransactionHex;
		// console.log();
		const signTxnHex = await desoIdentity.signTxAsync(hex);
		console.log("here");

		const sub = await desoApi.submitTransaction(signTxnHex);
		console.log("here");
		console.log(sub);
		// 	console.log("here");
		// };
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
			<div>
				{login && <button onClick={logOutOftheApp}>Logout</button>}
				{!login && <button onClick={loginToApp}>Login</button>}
				<button onClick={test}>Test</button>
				<button onClick={createPostForNft}>Create POsr</button>
			</div>
		</>
	);
};

export default TestingPage;
