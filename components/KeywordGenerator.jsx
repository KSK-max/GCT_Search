"use client";

import {
	Navbar,
	NavbarBrand,
	Input,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Spinner,
	Chip,
	Divider,
	Link
  } from "@nextui-org/react";
  import { useState } from "react";
  import axios from "axios";
  import Image from "next/image";
  import { AiOutlineSearch } from "react-icons/ai";
  import Nav from "./Navbar";
  
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
		  `http://16.170.27.15/search_function`,
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
	  <div className="flex flex-col gap-4 sm:gap-8 px-6 pb-4 container font-thin">
		<Nav />
		<div className="flex flex-col gap-4 sm:gap-8 px-6 pb-4 container font-thin">
		  <div className="flex w-full flex-wrap md:flex-nowrap mt-6 md:mb-0 gap-4">
			<form
			  className="flex flex-col gap-4 sm:gap-8 px-6 pb-4 container font-thin"
			  onSubmit={(e) => {
				e.preventDefault(); // Prevent form submission
				handleKeywords(); // Call the keyword generation function
			  }}
			>
			  <Input
				id="word"
				type="text"
				label="Search"
				className="text-xl text-white pl max-w-xs mx-auto"
				onChange={(e) => setWord(e.target.value)}
				value={word}
				startContent={
				  <AiOutlineSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
				}
			  ></Input>
			</form>
		  </div>
		  {showOutput &&
			countryData.map((country) => {
			  return (
				<Card classNames="flex gap-3 text-md"
				  key={country.name}
				  className=" max-w-[500px] mx-auto "
				  onSubmit={(e) => {
					e.preventDefault(); // Prevent form submission
					handleKeywords(); // Call the keyword generation function
				  }}
				>
					  <CardHeader className="flex gap-3">
				  <div className="flex flex-col">
					<p className="text-large font-serif mx-auto">{country.name}</p>
					<Divider/>
					<Link className="text-small font-medium mt-2 mx-auto">{country.link}</Link>
				  </div>
				  </CardHeader>
				  <Divider/>
				
				  <CardBody>
					<div className="flex flex-col md:flex-row gap-8 mx-auto">
					 <Image
						alt={country.name}
						className="object-cover"
						src={`https://source.unsplash.com/random/?${country.name}`}
						width={200}
						height={200}
					  /> 
					  	</div>
						  </CardBody>
						  <Divider/>
						  <CardFooter>
					  <div className="flex gap-2 flex-wrap items-center justify-start h-fit">
						{country.top_n_keywords.map((keyword) => (
						  <Chip key={keyword}>{keyword}</Chip>
						))}
					  </div>
					  </CardFooter>
				
			
				  </Card>
			  );
			})}
		</div>
	  </div>
	);
  }
  
  export default KeywordGenerator;
  