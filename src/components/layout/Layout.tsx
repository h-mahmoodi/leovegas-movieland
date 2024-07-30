import { Outlet } from 'react-router-dom';

import useAppSelector from '../../hooks/useAppSelector';

import Header from '../header/Header';
import Modal from '../ui/Modal';

const Layout = () => {
  const isModal = useAppSelector((state) => state.app.isModal);
  return (
    <>
      <section className="layout">
        <Header />
        <main className="container page">
          <Outlet />
        </main>
      </section>
      {isModal && <Modal />}
    </>
  );
};

export default Layout;
