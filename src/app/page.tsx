import Contact from '@/components/contact';
import Hero from "@/components/Hero";

import LatestArticles from '@/components/latest-article';
import PopularArticles from '@/components/popular-article';
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
    <main>
    <Navbar bgColor="bg-transparent" color="text-white"/>

      <Hero />
      <PopularArticles />
      <LatestArticles />
      <Contact />
    </main>
    </>
  );
}
