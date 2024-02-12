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
			setTimeout(() => setApprove(data.is_met), 3000);
		}
	}, [data]);

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
					<div className="border-b-[1px] pb-5">
						Does the patient meet requirement: {data.is_met ? "Yes" : "No"}
					</div>
					<div className="border-b-[1px] pb-5">question: {data.question}</div>
					<div className="border-b-[1px] pb-5">options: {data.options}</div>
					<div className="">reasoning: {data.reasoning}</div>
					{/* <div className="">decision: {data.decision}</div> */}
				</div>
			)}
		</div>
	);
};

export default ProcessDocument;
