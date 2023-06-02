import { ReactNode } from 'react';
import styles from './modal.module.scss';

type Props = {
  children: ReactNode,
  isOpen: boolean,
  onClickOverlay: () => void,
};

export const Modal = (props: Props) => {
  const { children, isOpen, onClickOverlay } = props; 

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className={styles['modal__overlay']}
      onClick={onClickOverlay}
    >
      <div
        className={styles['modal__content']}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};