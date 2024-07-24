import useAppSelector from './hooks/useAppSelector';

import AppRouter from './router/AppRouter';
import Modal from './components/ui/Modal';

import './styles/main.scss';
import React from 'react';

const App = () => {
  const { isModal } = useAppSelector((state) => state.app);

  return (
    <React.StrictMode>
      <AppRouter />
      {isModal && <Modal />}
    </React.StrictMode>
  );
};

export default App;
