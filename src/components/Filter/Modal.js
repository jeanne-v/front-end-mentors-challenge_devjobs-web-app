import { useContext } from "react";
import { ThemeContext } from "../Layout/Layout";

export default function Modal({ children, closeModal }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="modal-container" onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal ${theme}-theme`}
      >
        {children}
      </div>
    </div>
  );
}
