import React from 'react'
import HeroSection from '../components/contributor/HeroSection'
import ChromaGrid from '../components/contributor/CardGrid'
import { contributorData } from '../components/contributor/data/contributorData';

function ContributorPage() {
  return (
    <>
      <HeroSection />
 <section className="flex justify-center items-center min-h-screen bg-transparent">
  <div className="rounded-3xl bg-white shadow-lg overflow-hidden w-[90%] max-w-6xl">
    <ChromaGrid items={contributorData} />
  </div>
</section>
    </>
  )
}

export default ContributorPage