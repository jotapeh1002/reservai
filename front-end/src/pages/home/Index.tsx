import { Feed } from '../../shared/components/Feed';
import { NavBar } from '../../shared/components/NavBar';

export const Home = () => {
  return (
    <div className="bg-zinc-200 h-screen flex flex-col items-center">
      <NavBar />
      <Feed />
    </div>
  );
};
