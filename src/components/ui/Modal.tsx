import { createPortal } from 'react-dom';

import { closeModal } from '../../data/appSlice';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import YoutubePlayer from './YoutubePlayer';
import Loader from './Loader';

const Modal = () => {
  const { trailerKey, loadingTrailer, movie } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return createPortal(
    <div className="modal-container" data-testid="modal-video">
      <div className="modal-overlay" onClick={closeModalHandler}></div>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header-title">{movie.title}</h2>
          <button className="modal-header-close" onClick={closeModalHandler}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        {loadingTrailer === 'loading' && <Loader />}
        <div className="modal-body">
          {trailerKey ? (
            <YoutubePlayer videoKey={trailerKey} />
          ) : (
            loadingTrailer !== 'loading' && (
              <div className="modal-error" aria-live="assertive">
                <i className="modal-error-icon fi fi-rr-diamond-exclamation"></i>
                <h6>No trailer available. Try another movie.</h6>
              </div>
            )
          )}
        </div>
        <div className="modal-overview">{movie.overview}</div>
      </div>
    </div>,
    document.querySelector('#modal')!
  );
};

export default Modal;
