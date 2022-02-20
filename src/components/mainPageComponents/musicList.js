import Music from "./music";
import { useEffect, useState } from "react";
import DesoApi from "../../deso/api/desoApi";
export default function App({ allUsers }) {
	const [music, setMusic] = useState([
		{
			name: "Justin Bieber - KID LAROI",
			title: "STAY",
			url: "https://open.spotify.com/embed/track/4kux0P5UfguojB4h0lQnsj",
			created_at: "2022-02-20T23:30:01.000Z",
		},
	]);

	const [allsUsers, setAllUsers] = useState([]);
	useEffect(() => {
		if (localStorage.getItem("users")) {
			const temp = JSON.parse(localStorage.getItem("users"));
			setAllUsers(temp);
		}
		console.log(allsUsers);
		console.log(localStorage.getItem("users"));
		getNfts(uniqueUsers[0]);
	}, []);
	let uniqueUsers = [...new Set(allUsers)];

	const test = async () => {
		console.log(uniqueUsers);
		await getNfts(uniqueUsers[0]);
		console.log(music);
	};

	const getNfts = async (uniqueUser) => {
		const desoApi = new DesoApi();
		const nfts = await desoApi.getNfts(uniqueUser);
		const keys = Object.keys(nfts.NFTsMap);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const nft = nfts.NFTsMap[key];
			const postBody = nft.PostEntryResponse.Body;
			const postImage = nft.PostEntryResponse.ImageURLs;
			const poster = nft.PostEntryResponse.ProfileEntryResponse.Username;
			let actualImage = "";
			if (postImage) {
				actualImage = postImage[0];
			}
			console.log(nft, postBody, postImage);
			setMusic((prev) => {
				return [
					...prev,
					{
						name: poster,
						title: postBody,
						url: actualImage,
						created_at: "2022-02-20T23:30:01.000Z",
					},
				];
			});
		}
		console.log(music);
	};

	const musicList = [
		{
			name: "Justin Bieber - KID LAROI",
			title: "STAY",
			url: "https://open.spotify.com/embed/track/4kux0P5UfguojB4h0lQnsj",
			created_at: "2022-02-20T23:30:01.000Z",
		},
	];
	return (
		<>
			<button onClick={test}>Refresh Music List</button>
			<div className="row">
				{music.map((m, key) => (
					<Music musicList={m} index={key} key={key} />
				))}
			</div>
		</>
	);
}
