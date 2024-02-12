"use client";
import ProcessDocument from "@/components/processDocument";
import UploadForm from "@/components/uploadform";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const [loadLLM, setLoadLLM] = useState<boolean>(false);
	useEffect(() => {
		if (loadLLM) {
			console.log("fetch");
		}
	}, [loadLLM]);
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#202124] space-y-9">
			<div className="w-full bg-white rounded-md p-6 shadow-md">
				<UploadForm setLoadLLM={setLoadLLM} />
			</div>
			<div className="text-black w-full bg-white rounded-md p-6 shadow-md">
				<p>Decision Process</p>
				<div>{loadLLM && <ProcessDocument />}</div>
			</div>
			<div className="text-black w-full bg-white rounded-md p-6 shadow-md">
				Chance of Approval
			</div>
		</main>
	);
}
