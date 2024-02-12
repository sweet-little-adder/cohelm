"use client";
import ProcessDocument from "@/components/processDocument";
import UploadForm from "@/components/uploadform";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function Home() {
	const [loadLLM, setLoadLLM] = useState<boolean>(false);
	const [approve, setApprove] = useState<boolean>(false);
	useEffect(() => {
		if (loadLLM) {
			console.log("fetch");
		}
	}, [loadLLM]);
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#202124] space-y-9 text-[#343541] ">
			<div className="w-full bg-white rounded-md p-6 shadow-md">
				<UploadForm setLoadLLM={setLoadLLM} />
			</div>
			<div className=" w-full bg-white rounded-md p-6 shadow-md">
				<p>Decision Process</p>
				<div>{loadLLM && <ProcessDocument setApprove={setApprove} />}</div>
			</div>
			<div className="flex-col text-center space-y-5 w-full bg-white rounded-md p-6 shadow-md">
				<p>Approve</p>
				{approve && (
					<MdOutlineDone
						color={"#fff"}
						size={22}
						className="p-1 mx-auto bg-[#049E67] rounded-full"
					/>
				)}
			</div>
		</main>
	);
}
