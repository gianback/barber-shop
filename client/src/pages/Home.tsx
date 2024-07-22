import { About } from "@/components/About";
import { Banner } from "@/components/Banner";
// import { Blogs } from "@/components/Blogs";
import { Services } from "@/components/Services";

export function Home() {
  return (
    <main>
      <Banner />
      <About />
      <Services />
      {/* <Blogs /> */}
    </main>
  );
}
