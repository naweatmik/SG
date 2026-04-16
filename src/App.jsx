import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import WhySection from './components/WhySection'
import ReasonsSection from './components/ReasonsSection'
import PromoSection from './components/PromoSection'
import SkillsSection from './components/SkillsSection'
import CurriculumSection from './components/CurriculumSection'
import CtaSection from './components/CtaSection'
import PageBackground from './components/PageBackground'

function App() {
  return (
    <>
      <PageBackground />
      <Header />
      <main>
        <Hero />
        <WhySection />
        <ReasonsSection />
        <PromoSection />
        <SkillsSection />
        <CurriculumSection />
        <CtaSection />
      </main>
    </>
  )
}

export default App
