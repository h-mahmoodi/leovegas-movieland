import { createPortal } from 'react-dom';

import YoutubePlayer from './YoutubePlayer';
import Loader from './Loader';
import { IMovieSummery } from '../../types/Movie';
import useLoadTrailer from '../../hooks/useLoadTrailer';

interface ModalProps {
  onClose: () => void;
  movie: IMovieSummery;
}

const Modal = ({ onClose, movie }: ModalProps) => {
  const { status, trailerKey } = useLoadTrailer(movie.id);

  return createPortal(
    <div className="modal-container" data-testid="modal-video">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2 className="modal-header-title">{movie.title}</h2>
          <button className="modal-header-close" onClick={onClose}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        {status === 'loading' && <Loader />}
        <div className="modal-body">
          {trailerKey ? (
            <YoutubePlayer videoKey={trailerKey} />
          ) : (
            status !== 'loading' && (
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
