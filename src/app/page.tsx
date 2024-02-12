import UploadForm from "@/components/uploadform";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#202124] space-y-9">
			<div className="w-full bg-white rounded-md p-6 shadow-md">
				<UploadForm />
			</div>
			<div className="text-black w-full bg-white rounded-md p-6 shadow-md">
				Decision
			</div>
		</main>
	);
}
