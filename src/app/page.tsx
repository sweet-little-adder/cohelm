"use client";
import ProcessDocument from "@/components/processDocument";
import UploadForm from "@/components/uploadform";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

interface Props {
	approve: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Home: React.FC<Props> = () => {
	const [loadLLM, setLoadLLM] = useState<boolean>(false);
	const [approve, setApprove] = useState<boolean | null>(null);
	function scrollPageDown(pixels: number) {
		window.scrollTo({
			top: window.pageYOffset + pixels,
			behavior: "smooth", // Optional: Smooth scrolling behavior
		});
	}
	useEffect(() => {
		if (loadLLM) {
			console.log("fetch");
			scrollPageDown(1000);
		}
	}, [loadLLM]);

	return (
		<main className="flex min-h-screen flex-col items-start justify-start p-24 bg-[#202124] space-y-9 text-[#343541] transition-all">
			<div className="transition-all w-full bg-white rounded-md p-6 shadow-md">
				<UploadForm setLoadLLM={setLoadLLM} />
			</div>
			{loadLLM && (
				<div
					className={`transition-all opacity-0 transition-opacity delay-500 ease-in-out  ${
						loadLLM && `opacity-100`
					} w-full bg-white rounded-md p-6 shadow-md`}
				>
					<ProcessDocument setApprove={setApprove} />
				</div>
			)}

			{approve !== null && (
				<div
					className={`flex-col text-center space-y-5 w-full bg-white rounded-md p-6 shadow-md`}
				>
					<p>{approve ? "Approved" : "Not Approved"}</p>

					{approve ? (
						<MdOutlineDone
							color={"#fff"}
							size={32}
							className={`transform transition scale-0 ${
								approve && `scale-100`
							} duration-500  ease-in-out p-1 mx-auto bg-[#049E67] rounded-full`}
						/>
					) : (
						<RxCross2
							color={"#fff"}
							size={32}
							className={`transform transition scale-0 ${
								!approve && `scale-100`
							} duration-500  ease-in-out p-1 mx-auto bg-[#E91E63] rounded-full`}
						/>
					)}
				</div>
			)}
		</main>
	);
};

export default Home;
