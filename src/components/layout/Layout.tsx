import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = () => {
  return (
    <section className="layout">
      <Header />
      <main className="container page">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </section>
  );
};

export default Layout;
