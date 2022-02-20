import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "react-bootstrap";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export default function PopUpModal({ desoApi, desoIdentity, publicKey }) {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [body, setBody] = useState("");
	let words;
	const [link, setLink] = useState("");
	const [sellPrice, setSellPrice] = useState(0);
	const [isForSale, setIsForSale] = useState(true);
	const [amountToBeSold, setAmountToBeSold] = useState(0);
	const createPostForNft = async () => {
		const imgUrl = ["https://i.imgur.com/2w1CRvL.jpeg"];
		const extraData = {};
		const body = "This Happens to be my newest Song";

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

	async function handleSubmit(event) {
		event.preventDefault();
		await mintNft();
		setIsOpen(false);
	}

	function onChangeTextFeild(event, name) {
		switch (name) {
			case "body":
				setBody(event.target.value);
				break;
			case "number":
				setAmountToBeSold(event.target.value);
				break;

			case "link":
				setLink(event.target.value);
				break;

			case "sellPrice":
				setSellPrice(event.target.value);
				break;

			case "isForSale":
				setIsForSale(event.target.value);
				break;

			default:
				break;

			// setProjectName(event.target.value);
		}
	}
	function openModal() {
		setIsOpen(true);
	}
	function afterOpenModal() {
		// references are now sync'd and can be accessed.
	}
	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<div>
				<Button onClick={openModal} variant="danger">
					Add your Musical NFT
				</Button>

				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal">
					<p>Add your Musical NFT</p>

					<form>
						<label>
							Enter the title of the song <br></br>
							<input
								type={"text"}
								name="Enter the title of the song"
								ref={(input) => {
									words = input;
								}}
								onChange={(event) => {
									onChangeTextFeild(event, "link");
								}}
							/>
						</label>
						<br></br>
						<label>
							Enter the link of the song <br></br>
							<input
								type={"text"}
								name="Enter the link of the song"
								onChange={(event) => {
									onChangeTextFeild(event, "link");
								}}
							/>
						</label>
						<br></br>
						<label>
							How much do you wanna sell? <br></br>
							<input
								type={"number"}
								name="Enter the name of the Project"
								onChange={(event) => {
									onChangeTextFeild(event, "number");
								}}
							/>
						</label>
						<br></br>

						<br></br>

						<Button type={"submit"} value={"Submit"} onClick={handleSubmit}>
							{" "}
							Submit{" "}
						</Button>
					</form>

					<Button variant="danger" onClick={closeModal}>
						close
					</Button>
				</Modal>
			</div>
		</>
	);
}
