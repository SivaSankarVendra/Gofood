import React from 'react';
import ReactDOM from 'react-dom';

const ModalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34, 34, 34)',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    height: '90%',
    width: '90%',
    padding: '20px',
    borderRadius: '8px',
    overflowY: 'auto'
};

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <>
            <div style={overlayStyles} onClick={onClose} />
            <div style={ModalStyles} onClick={(e) => e.stopPropagation()}>
                <button
                    className="bg-red-800 text-xl rounded-xl p-5"
                    style={{ marginLeft: '95%', marginTop: '-35px' }}
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </>,
        document.getElementById('wishlist-root')
    );
};

export default Modal;
