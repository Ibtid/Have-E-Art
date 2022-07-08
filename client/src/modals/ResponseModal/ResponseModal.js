import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import './ResponseModal.css';

const ResponseModal = (props) => {
  const ref = useRef();
  const [pop, setPop] = useState('pop__up');
  const [showForm, setShowForm] = useState(true);

  const { setShowSpinner } = useContext(SpinnerContext);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showForm && ref.current && !ref.current.contains(e.target)) {
        setPop('pop__down');
        setTimeout(() => {
          setShowForm(false);
          props.closeForm();
        }, 300);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showForm]);

  return ReactDOM.createPortal(
    <div
      className='responseModal'
      onClick={() => {
        setShowForm(true);
      }}>
      <div ref={ref}>
        {showForm && (
          <div
            className={`responseModal__container ${pop}`}
            onClick={() => {
              setShowForm(true);
            }}>
            <div className='responseModal__message'>
              User with the email does not exist
            </div>
            <div
              className='responseModal__button'
              onClick={() => {
                setPop('pop__down');
                setTimeout(() => {
                  setShowForm(false);
                  props.closeForm();
                }, 300);
              }}>
              Okay
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('responseModal')
  );
};

export default ResponseModal;
