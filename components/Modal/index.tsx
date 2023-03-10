import React, { ReactElement } from "react";

interface IProps {
  isOpen: boolean;
  title?: string;
  body: ReactElement;
  footer?: ReactElement;
  onClose?: () => void;
}

const Modal: React.FC<IProps> = ({ isOpen, title, body, footer, onClose }) => {
  return (
    <div
      className={isOpen ? "modal fade show block" : "modal fade"}
      id={`modal-${title}`}
    >
      <div className="modal-dialog p-6 w-1/3">
        <div className="modal-content">
          {/* <!-- Header --> */}
          <div className="modal-header py-4 px-6">
            <h5 className="modal-title text-lg" id={`modal-${title}-label`}>
              {title}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-jacarta-700 h-6 w-6 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
              </svg>
            </button>
          </div>

          {/* <!-- Body --> */}
          <div className="modal-body p-6">{body}</div>
          {/* <!-- Footer --> */}
          <div className="modal-footer flex justify-end py-4">{footer}</div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
