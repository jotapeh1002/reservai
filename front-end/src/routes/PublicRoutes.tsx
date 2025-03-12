import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login/Index';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to={'/notfound'} />} />
      {/*add dps a tela de not found */}
    </Routes>
  );
};
