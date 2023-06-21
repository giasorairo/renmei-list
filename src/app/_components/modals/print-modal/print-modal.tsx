import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';
import { FC } from 'react';
import style from './print-modal.module.scss';

type Props = {
  isOpen: boolean,
  onClickOkButton: () => void,
  onClickCancelButton: () => void,
  onClickOverlay: () => void,
};

export const PrintModal: FC<Props> = ({
  isOpen,
  onClickOkButton,
  onClickCancelButton,
  onClickOverlay,
}) => {
  return (
    <Modal isOpen={isOpen} onClickOverlay={onClickOverlay}>
      <div className={style.printModal}>
        <div>
          <p>印刷確認画面が表示されます。</p>
          <p>プリンタを選択して、印刷を実行してください。</p>
        </div>
        <div className={style.printModal__controller}>
          <Button
            color="blue"
            onClick={onClickOkButton}
          >
            印刷する
          </Button>
          <Button
            color="outlineBlack"
            onClick={onClickCancelButton}
          >
            閉じる
          </Button>
        </div>
      </div>
    </Modal>
  );
};
