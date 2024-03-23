import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className='relative z-50 p-4 min-h-[200px] max-w-[80%] m-auto bg-white'>
            <div className='flex justify-end'>
              <AiOutlineClose
                onClick={onClose}
                className='self-end text-2xl cursor-pointer '
              />
            </div>
            {children}
          </div>
          <div
            onClick={onClose}
            className='absolute top-0 z-40 w-screen h-screen backdrop-blur'
          />
        </>
      )}
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
