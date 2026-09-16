/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { LiquidBackground } from './components/LiquidBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Statistics } from './components/Statistics';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { WorkProcess } from './components/WorkProcess';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminStudioModal } from './components/AdminStudioModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminBar } from './components/AdminBar';
import { AiAssistant } from './components/AiAssistant';
import { PageSwitcherBar, PagePaginationBar } from './components/PageSwitcherBar';
import { HomeQuickNav } from './components/HomeQuickNav';

function PortfolioMain() {
  const { activePage } = usePortfolio();

  return (
    <div className="relative min-h-screen selection:bg-blue-500/20 selection:text-blue-200">
      {/* Dynamic iPhone Liquid Glass Ambient Atmosphere */}
      <LiquidBackground />

      {/* Floating Liquid Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Continuous Full View */}
        {activePage === 'all' && (
          <>
            <Hero />
            <About />
            <Skills />
            <Services />
            <Portfolio />
            <Statistics />
            <WhyWorkWithMe />
            <WorkProcess />
            <Pricing />
            <Testimonials />
            <ResumeSection />
            <Contact />
          </>
        )}

        {/* Separate Page: Home */}
        {activePage === 'home' && (
          <div className="animate-fadeIn">
            <Hero />
            <HomeQuickNav />
            <PagePaginationBar />
          </div>
        )}

        {/* Separate Page: Content & Media */}
        {activePage === 'content' && (
          <div className="pt-24 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Content & Portfolio Page
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Creative Digital Works & Projects
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                High-CTR YouTube Thumbnails, AI Video Productions, Full-Stack Web Apps, and Python Automations.
              </p>
            </div>
            <Portfolio />
            <Statistics />
            <PagePaginationBar />
          </div>
        )}

        {/* Separate Page: Services & Pricing */}
        {activePage === 'services' && (
          <div className="pt-24 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Services & Pricing Page
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineering & Design Solutions
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                Transparent pricing starting from $5, rapid turnaround times, and verified quality benchmarks.
              </p>
            </div>
            <Services />
            <Pricing />
            <WorkProcess />
            <Testimonials />
            <PagePaginationBar />
          </div>
        )}

        {/* Separate Page: About & Skills */}
        {activePage === 'about' && (
          <div className="pt-24 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                About & Expertise Page
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                About Sagar D.
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                Python Developer, Web Engineer & AI Digital Creator delivering fast, high-impact digital solutions.
              </p>
            </div>
            <About />
            <Skills />
            <WhyWorkWithMe />
            <ResumeSection />
            <PagePaginationBar />
          </div>
        )}

        {/* Separate Page: Contact & Hire */}
        {activePage === 'contact' && (
          <div className="pt-24 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Contact & Order Page
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build Something Exceptional
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                Get in touch directly via email, place a protected order on Fiverr, or chat with my 24/7 AI Concierge.
              </p>
            </div>
            <Contact />
            <Testimonials />
            <PagePaginationBar />
          </div>
        )}
      </main>

      {/* Liquid Glass Footer */}
      <Footer />

      {/* Floating Bottom Bar Button for Switching Pages Separately */}
      <PageSwitcherBar />

      {/* 24/7 AI Customer Assistant Widget */}
      <AiAssistant />

      {/* Interactive Overlays & Modals */}
      <CaseStudyModal />
      <ResumeModal />
      <AdminStudioModal />
      <AdminLoginModal />
      <AdminBar />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
