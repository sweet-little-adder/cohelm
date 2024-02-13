import React, { use, useEffect, useState } from "react";
import axios from "axios";

interface Props {
	setApprove: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ProcessDocument: React.FC<Props> = ({ setApprove }) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const [expanded, setExpanded] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://file.notion.so/f/f/372cc316-8aa0-41e7-980a-0d43ccecc1f4/b86fe468-5604-478d-8151-0912bf3b1aed/example-response.json?id=5f90a20e-7e99-4dce-b3fd-decc43e70423&table=block&spaceId=372cc316-8aa0-41e7-980a-0d43ccecc1f4&expirationTimestamp=1707854400000&signature=zGe7UwK41AuMjA4dnk8DM9RWx19HuuwDzP49SiouNyw&downloadName=example-response.json"
				);
				setData(response.data);
			} catch (error) {
				setError(error as Error);
			} finally {
				setTimeout(() => setLoading(false), 3000);
			}
		};

		fetchData();
		console.log("Data: ", data);
	}, []);

	useEffect(() => {
		if (data !== null) {
			console.log("Data: ", data);
			setTimeout(() => setApprove(data.is_met), 9000);
		}
	}, [data]);
	const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (currentStepIndex < steps.length - 1) {
				setCurrentStepIndex(currentStepIndex + 1);
			}
		}, 2000);

		return () => clearTimeout(timeout);
	}, [currentStepIndex, steps.length]);
	return (
		<div>
			{console.log("Data: ", data)}
			{loading && (
				<div className="flex items-center">
					<div className="lds-ellipsis translate-x-0 my-9 mx-auto">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
			{error && <p>Error: {error.message}</p>}
			{data && !loading && (
				<div className="space-y-5">
					<div className="border-b-[1px] pb-5">
						<p>Procedure</p> <b>{data.procedure_name}</b>
					</div>
					<div className="text-sm text-[#4a4a4a] leading-loose tracking-wide">
						{expanded ? data.summary : `${data.summary.slice(0, 100)}`}

						<span
							className="text-[#9e9e9e] hover:text-[#c9c9c9]  ml-1 cursor-pointer"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? `[collapse]` : `[...]`}
						</span>
					</div>
					<div className="border-b-[1px] pb-5 text-sm space-y-3">
						<p>Does the patient meet requirement:</p>
						<div className="text-[#4a4a4a]">{data.is_met ? "Yes" : "No"}</div>
					</div>

					{steps.slice(0, currentStepIndex + 1).map((step, index) => (
						<div
							key={index}
							className={`pb-5 space-y-3 ${
								index !== steps.length - 1 ? "border-b" : ""
							}`}
						>
							<div>{step}</div>
							{/* {index === currentStepIndex && ( */}
							<div className="space-y-3">
								<div>{data.steps[index].question}</div>
								<div className="space-y-3 flex-col justify-center items-center">
									{data.steps[index].options.map(
										(option: any, index: number) => (
											<div key={index} className="flex gap-3 items-center">
												<div className="transition-all cursor-pointer hover:bg-[#049E67] hover:text-white bg-[#ccc]/50 p-2 rounded-full w-8 h-8 text-sm text-center flex justify-center items-center">
													{option["key"]}
												</div>
												<div className="text-sm text-[#4a4a4a] tracking-wide">
													{option["text"]}
												</div>
											</div>
										)
									)}
								</div>
							</div>
							{/* )} */}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ProcessDocument;
