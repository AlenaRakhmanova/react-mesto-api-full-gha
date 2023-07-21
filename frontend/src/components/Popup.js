import {useEffect} from 'react';

function Popup({ isOpen, onClose, name, children, classContainer }) {

  useEffect(() => {
    if (!isOpen) return;

    function closeByEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  function handleOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`} onClick={handleOverlay}>
      <div className={`popup__container ${classContainer}`}>
        <button
          type="button"
          className="popup__button-close opacity-hover"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
