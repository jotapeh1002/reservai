import './styles/index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PublicRoutes />
  </BrowserRouter>,
);
