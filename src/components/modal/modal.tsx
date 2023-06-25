import { ReactNode } from "react";
import styles from "./modal.module.scss";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClickOverlay: () => void;
};

export const Modal = (props: Props) => {
  const { children, isOpen, onClickOverlay } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.modal__overlay}
      onClick={onClickOverlay}
      onKeyDown={onClickOverlay}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
};
