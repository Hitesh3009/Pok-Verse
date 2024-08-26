import Navbar from "@/components/Navbar";
import LandingPage from "@/components/Landingpage";
export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="">
        <div className="">
            <LandingPage/>
        </div>
      </main>
    </>
  );
}
