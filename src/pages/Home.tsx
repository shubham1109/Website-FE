import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Hero from '../sections/Hero';
import FilmShowcase from '../sections/FilmShowcase';
import Team from '../sections/Team';
import Supporters from '../sections/Supporters';
import Contact from '../sections/Contact';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <FilmShowcase />
      <Team />
      <Supporters />
      <Contact />
    </>
  );
}
