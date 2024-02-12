"use client";
import { useState, ChangeEvent, FormEvent } from "react";

const UploadForm: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<number | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		setSelectedFile(file || null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>, i: number) => {
		event.preventDefault();
		if (selectedFile) {
			setLoading(i);
			try {
				// Simulate file upload delay
				await new Promise((resolve) => setTimeout(resolve, 2000));

				// Handle file upload here (e.g., send it to a server)
				console.log("Selected file:", selectedFile);

				// Reset form and loading state
				setSelectedFile(null);
			} catch (error) {
				console.error("Error uploading file:", error);
			} finally {
				setLoading(i);
			}
		}
	};

	return (
		<div className="flex-col text-[#343541] space-y-5">
			<p>Medical record</p>
			<form
				// onSubmit={handleSubmit}
				className="flex items-center justify-between text-[#9e9e9e] pb-5 flex-wrap border-b-[1px] "
			>
				<input type="file" onChange={handleFileChange} />
				<div className="flex items-center">
					<button
						onClick={(e)=>handleSubmit(e,1)}
						type="submit"
						className="my-2 text-[#9e9e9e]  px-3 py-1 rounded-lg shadow-md/ shadow-[inset_0_-1px_2.5px_rgba(0,0,0,0.2)] inset-drop-shadow hover:bg-[#049E67] hover:text-white transition-colors duration-300 ease-in-out"
					>
						{loading ? "Uploading..." : "Upload"}
					</button>
					{loading && (
						<div className="w-5 h-5 border-t-2 border-b-5 border-[#ff0000] rounded-full animate-spin"></div>
					)}
				</div>
			</form>
			<p>Guidelines</p>
			<form
				// onSubmit={handleSubmit}
				className="flex items-center justify-between text-[#9e9e9e] gap-5 flex-wrap "
			>
				<input type="file" onChange={handleFileChange} />
				<div className="flex items-center">
					<button
						type="submit"
						className="my-2 text-[#9e9e9e] bg-[#] px-3 py-1 rounded-lg shadow-md/ shadow-[inset_0_-1px_2.5px_rgba(0,0,0,0.2)] inset-drop-shadow hover:bg-[#049E67] hover:text-white transition-colors duration-300 ease-in-out"
					>
						{loading ? "Uploading..." : "Upload"}
					</button>
					{loading && (
						<div className="w-5 h-5 border-t-2 border-b-5 border-[#ff006d] rounded-full animate-spin"></div>
					)}
				</div>
			</form>
		</div>
	);
};

export default UploadForm;
