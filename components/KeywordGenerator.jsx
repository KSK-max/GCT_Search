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

function KeywordGenerator() {
	const [url, setUrl] = useState("");
	const [showOutput, setShowOutput] = useState(false);
	const [keywords, setKeywords] = useState<string>("");
	const [isFetching, setIsFetching] = useState(false);
	const handleKeywords = async () => {
		setShowOutput(false);
		setIsFetching(true);
		try {
			const res = await axios.post(
				"https://corsproxy.io/?https://g4psxk5dfojq227n6ssufwu2gi0qbqzl.lambda-url.eu-north-1.on.aws/30_keywords",
				JSON.stringify({ url: url }),
				{
		 			method: "POST",
					headers: { "Content-Type": "application/json" },
				}
			);
			setKeywords(res.data.keywords);
			setShowOutput(true);
		} catch (error) {
			alert(error);
		}
		setIsFetching(false);
	};

	return (
		<div className="flex flex-col gap-4 sm:gap-8 px-6 pb-2 container font-thin">
			<div className="flex flex-col rounded-xl shadow-lg p-4 gap-2 bg-slate-700 text-white border-2 border-blue-900">
				<h1 className="text-3xl sm:text-4xl">
					<span className="text-orange-500">AI</span> Taxonomy Scribe
				</h1>
				<h4 className="text-xl">
					Create an{" "}
					<span className="text-orange-500">AI generated Taxonomy</span> of
					keywords for your content in seconds
				</h4>
				<form className="flex flex-col gap-4 items-center mt-2">
					<Input
						id="url"
						type="text"
						label="Content URL"
						className="text-xl  text-black"
						onChange={(e) => setUrl(e.target.value)}
						value={url}
					/>
					<Button
						onClick={handleKeywords}
						color="primary"
						isDisabled={isFetching}
						className="place-self-end text-xl border-2 bg-orange-500"
					>
						{isFetching ? (
							<Spinner size="sm" color="warning" />
						) : (
							"Generate Taxonomy"
						)}
					</Button>
				</form>
			</div>
			{showOutput && (
				<Card className="bg-slate-700 border-2 border-blue-900">
					<CardBody>
						<div className="flex flex-wrap gap-2 sm:gap-4">
							{keywords.split(/\n/).map((keyword) => (
								<Chip className="bg-gray-100" key={keyword}>
									{keyword}
								</Chip>
							))}
						</div>
					</CardBody>
				</Card>
			)}
		</div>
	);
}

export default KeywordGenerator;
