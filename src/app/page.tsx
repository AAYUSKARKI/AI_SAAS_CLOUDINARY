'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
    <div className="text-center p-10 flex flex-col justify-center items-center gap-10">
    <h1 className="text-3xl font-bold underline">Welcome To Gallery Showcase!</h1>
    <button
     className="btn btn-info" 
     onClick={() => router.push("/home")}>GET STARTED</button>
     </div>
    </>
  );
}
