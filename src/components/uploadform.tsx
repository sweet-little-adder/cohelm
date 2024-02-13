"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
interface Props {
	setLoadLLM: React.Dispatch<React.SetStateAction<boolean>>;
}
const UploadForm: React.FC<Props> = ({ setLoadLLM }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loadingMedicalRecord, setLoadingMedicalRecord] = useState<
		boolean | null
	>(false);
	const [loadingGuidelines, setLoadingGuidelines] = useState<boolean | null>(
		false
	);
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		setSelectedFile(file || null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>, i: number) => {
		event.preventDefault();

		if (selectedFile) {
			if (i === 0) {
				setLoadingMedicalRecord(true);
			} else {
				setLoadingGuidelines(true);
			}
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
				if (i === 0) {
					setLoadingMedicalRecord(null);
				} else {
					setLoadingGuidelines(null);
				}
			}
		}
	};
	useEffect(() => {
		if (loadingMedicalRecord === null && loadingGuidelines === null) {
			setLoadLLM(true);
		}
	}, [loadingMedicalRecord, loadingGuidelines]);
	return (
		<div className="flex-col text-[#343541] space-y-5">
			<p>Medical record</p>
			<form
				onSubmit={(e) => handleSubmit(e, 0)}
				className="flex items-center justify-between text-[#9e9e9e] pb-5 flex-wrap border-b-[1px] "
			>
				<input type="file" onChange={handleFileChange} />
				<div className="flex items-center">
					<button
						type="submit"
						className={`my-2 text-[#9e9e9e] text-sm px-3 py-1 rounded-lg shadow-[inset_0_-1px_2.5px_rgba(0,0,0,0.2)] inset-drop-shadow hover:bg-[#049E67] ${
							loadingMedicalRecord === null
								? "bg-[#049E67] text-white shadow-none"
								: "bg-white"
						} hover:text-white transition-colors duration-300 ease-in-out`}
					>
						{loadingMedicalRecord
							? "Uploading..."
							: loadingMedicalRecord === null
							? "Uploaded!"
							: "Upload"}
					</button>
				</div>
			</form>
			<p>Guidelines</p>
			<form
				onSubmit={(e) => handleSubmit(e, 1)}
				className="flex items-center justify-between text-[#9e9e9e] flex-wrap "
			>
				<input type="file" onChange={handleFileChange} />
				<div className="flex items-center">
					<button
						type="submit"
						className={`my-2 text-[#9e9e9e] text-sm px-3 py-1 rounded-lg  shadow-[inset_0_-1px_2.5px_rgba(0,0,0,0.2)] inset-drop-shadow hover:bg-[#049E67] ${
							loadingGuidelines === null
								? "bg-[#049E67] text-white shadow-none"
								: "bg-white"
						} hover:text-white transition-colors duration-300 ease-in-out`}
					>
						{loadingGuidelines
							? "Uploading..."
							: loadingGuidelines === null
							? "Uploaded!"
							: "Upload"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default UploadForm;
