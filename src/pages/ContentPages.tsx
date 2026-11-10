import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';

const PageFrame = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16 md:pt-20">{children}</main>
    <Footer />
  </div>
);

export const AboutPage = () => <PageFrame><AboutSection /></PageFrame>;
export const ServicesPage = () => <PageFrame><ServicesSection /></PageFrame>;
export const ProcessPage = () => <PageFrame><ProcessSection /></PageFrame>;
export const ResultsPage = () => <PageFrame><StatsSection /></PageFrame>;
export const TestimonialsPage = () => <PageFrame><TestimonialsSection /></PageFrame>;
export const FAQPage = () => <PageFrame><FAQSection /></PageFrame>;
export const ContactPage = () => <PageFrame><ContactSection /></PageFrame>;