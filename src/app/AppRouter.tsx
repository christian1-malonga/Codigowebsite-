import { useEffect, useState } from 'react';
import { SiteShell } from '../components/SiteShell';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import HowWeWorkPage from '../pages/HowWeWorkPage';
import VacanciesPage from '../pages/VacanciesPage';
import ContactsPage from '../pages/ContactsPage';
import LegalPage from '../pages/LegalPage';

function AppRouter() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = path === '/' ? 'CODIGO — International product engineering' : `CODIGO — ${path.replace('/', '').replaceAll('-', ' ')}`;
  }, [path]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href?.startsWith('/') && !href.startsWith('//') && !href.includes('#')) {
        event.preventDefault();
        window.history.pushState({}, '', href);
        setPath(href);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const page = path === '/'
    ? <HomePage />
    : path === '/about'
      ? <AboutPage />
      : path === '/how-we-work'
        ? <HowWeWorkPage />
        : path === '/vacancies'
          ? <VacanciesPage />
          : path === '/contacts'
            ? <ContactsPage />
            : <LegalPage path={path} />;

  return <SiteShell>{page}</SiteShell>;
}

export default AppRouter;
