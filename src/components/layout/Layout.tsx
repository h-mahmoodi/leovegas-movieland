import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Layout = () => {
  return (
    <section className="layout">
      <Header />
      <main className="container page">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
