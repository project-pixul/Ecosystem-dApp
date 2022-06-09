import * as React from "react";

import "./modal.css";

import { toast } from "react-toastify";

export type ModalProps = {
  invokeFn: Promise<any>;
  setModalState: Function;
};

const Modal = (props: ModalProps) => {
  const onClickOutside = (e: any) => {
    if (e.target.id === "modal-wrapper") {
      props.setModalState(false);
    }
  };

  return (
    <div id="modal-wrapper" onClick={onClickOutside}>
      <div className="modal-container">
        <span>Are you sure ?</span>
        <div className="modal-button-container">
          <button
            onClick={() => {
              toast.promise(props.invokeFn, {
                success: "Transaction successful",
                pending: "Transaction pending....",
                error: "Transaction failed",
              });
              props.setModalState(false);
            }}
          >
            Yes
          </button>
          <button onClick={() => props.setModalState(false)}>No</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
