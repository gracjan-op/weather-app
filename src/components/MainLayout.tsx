import { ReactNode } from 'react';
import Footer from './Footer';
import Hero from './Hero';
import Navigation from './Navigation';
import ReduxDevTools from './ReduxDevTools';

interface MainLayoutProps {
  children: ReactNode;
  hideHero?: boolean;
}

const MainLayout = ({ children, hideHero = false }: MainLayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navigation />

      <main className='flex-1'>
        {!hideHero && <Hero />}
        {children}
      </main>

      <Footer />

      <ReduxDevTools />
    </div>
  );
};

export default MainLayout;
