import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const ProjectsPage = lazy(() => import('../pages/projects/page'));
const MarketingPage = lazy(() => import('../pages/marketing/page'));
const ServicesPage = lazy(() => import('../pages/services/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const CaseStudyPage = lazy(() => import('../pages/case-study/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/marketing',
    element: <MarketingPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/case-study/:id',
    element: <CaseStudyPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;