import style from '../Modal.module.css';

const ModalSubject = ({ children, isOpen, setIsOpen, titleModal, dispatch }) => {
  return (
    <div>
      {isOpen &&
        <div className={style.principal}>
          <div className={style.contenedorModal}>
            <div className={style.contenedorTituloModal}>
              <h3>{titleModal}</h3>
            </div>
            <button className={style.botonCerrar} onClick={() => setIsOpen(false)}>X</button>
            <div className={style.contenido}>
              {children}
            </div>
            <div className={style.divButtonConfirmar}>
              <button onClick={() => dispatch()}>Confirm</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ModalSubject;