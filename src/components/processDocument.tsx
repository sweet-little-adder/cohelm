import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
	setApprove: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProcessDocument: React.FC<Props> = ({ setApprove }) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

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
				console.log("Data: ", data);
				setTimeout(() => setApprove(true), 9000);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{loading && (
				<div className="flex items-center">
					{/* <p>Loading</p> */}
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
				<div>
					<p>Data:</p>
					procedure_name: {data.procedure_name}
					<br />
					summary: {data.summary}
					<br />
					is_met: {data.is_met}
					<br />
					question: {data.question}
					<br />
					options: {data.options}
					<br />
					reasoning: {data.reasoning}
					<br />
					decision: {data.decision}
					<br />
					is_final: {data.is_final}
					<br />
					evidence: {data.evidence}
					<br />
					question: {data.question}
					<br />
					{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
				</div>
			)}
		</div>
	);
};

export default ProcessDocument;
