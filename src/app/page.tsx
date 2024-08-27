'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="text-center p-10 flex flex-col justify-center items-center gap-10">
    <h1 className="md:text-3xl lg:text-5xl font-bold text-sm md:font-bold lg:font-extrabold">Welcome To Gallery Showcase!</h1>
    <button
     className="btn btn-info" 
     onClick={() => router.push("/home")}>GET STARTED</button>
     </div>
     </main>
    </>
  );
}
