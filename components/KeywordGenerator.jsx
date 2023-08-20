"use client";

import {
	Button,
	Input,
	Card,
	CardBody,
	Spinner,
	CardHeader,
	Chip,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";


function KeywordGenerator() {
	const [word, setWord] = useState("");
	const [showOutput, setShowOutput] = useState(false);
	const [countryData, setCountryData] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const handleKeywords = async () => {
		setShowOutput(false);
		setIsFetching(true);
		try {
			const { data } = await axios.post(
				`https://16.170.27.15/search_function`,
				JSON.stringify({ search_term: word }),
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
				}
			);
			let topCountry = null;
			let maxKeywords = 0;

			for (const countryName in data) {
				const country = data[countryName];
				if (country.top_n_keywords.length > maxKeywords) {
					maxKeywords = country.top_n_keywords.length;
					topCountry = {
						...country,
						name: countryName,
						link: country.link,
					};
				}
			}

			if (topCountry) {
				setCountryData([topCountry]);
				setShowOutput(true);
			}
		} catch (error) {
			alert(error);
		}
		setIsFetching(false);
	};

	return (
		<div className="flex flex-col gap-4 sm:gap-8 px-6 pb-2 container font-thin">
			<div className="flex flex-col rounded-xl p-4 gap-2 ">
				{/* <h1 className="text-3xl sm:text-4xl">
					<span className="text-orange-500">AI</span> Taxonomy Scribe
				</h1>
				<h4 className="text-xl">
					Create an{" "}
					<span className="text-orange-500">AI generated Taxonomy</span> of
					keywords for your content in seconds
				</h4> */}
				<form className="flex flex-col gap-4 items-center mt-2">
					<Input
						id="word"
						type="text"
						label="Search Country"
						className="text-xl text-black pl"
						onChange={(e) => setWord(e.target.value)}
						value={word}
						startContent={
							<AiOutlineSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
						}
					>
					</Input>
					<Button
						onClick={handleKeywords}
						color="primary"
						isDisabled={isFetching}
						className="place-self-end text-xl border-2 bg-lime-950"
					>
						{isFetching ? (
							<Spinner size="sm" color="warning" />
						) : (
							"Generate Keywords"
						)}
					</Button>
				</form>
			</div>
			{showOutput &&
				countryData.map((country) => {
					return (
						<Card
							className="bg-slate-700 border-2 border-blue-900 text-white"
							key={country.name}
						>
							<div className="flex flex-col">
								<p className="text-large font-medium mt-2">{country.name}</p>
								<p className="text-large font-medium mt-2">{country.link}</p>
							</div>
							<CardBody>
								<div className="flex flex-col md:flex-row gap-8">
									<Image
										alt={country.name}
										src={`https://source.unsplash.com/random/?${country.name}`}
										width={300}
										height={300}
									/>
									<div className="flex gap-2 flex-wrap items-center justify-start h-fit">
										{country.top_n_keywords.map((keyword) => (
											<Chip key={keyword}>{keyword}</Chip>
										))}
									</div>
								</div>
							</CardBody>
						</Card>
					);
				})}
		</div>
	);
}

export default KeywordGenerator;