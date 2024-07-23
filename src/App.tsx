import useAppSelector from './hooks/useAppSelector';

import AppRouter from './router/AppRouter';
import Modal from './components/ui/Modal';

import './styles/main.scss';

const App = () => {
  const { isModal } = useAppSelector((state) => state.app);

  return (
    <>
      <AppRouter />
      {isModal && <Modal />}
    </>
  );
};

export default App;
