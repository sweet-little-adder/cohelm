import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
	// Define prop types here
}

const ProcessDocument: React.FC<Props> = () => {
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
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Data Fetching Example</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<div>
					<p>Data:</p>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default ProcessDocument;
