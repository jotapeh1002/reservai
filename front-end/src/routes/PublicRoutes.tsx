import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Index';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to={'/notfound'} />} />
      {/*add dps a tela de not found */}
    </Routes>
  );
};
