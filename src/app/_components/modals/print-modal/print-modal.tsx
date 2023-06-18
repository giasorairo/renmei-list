import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';
import { FC, useCallback, useEffect, useState } from 'react';
import style from './print-modal.module.scss';
import { Input } from '@/components/input/input';

type Props = {
  isOpen: boolean,
  onClickOkButton: () => void,
  onClickCancelButton: () => void,
  onClickOverlay: () => void,
  loading: boolean,
};

export const PrintModal: FC<Props> = ({
  isOpen,
  onClickOkButton,
  onClickCancelButton,
  onClickOverlay,
  loading,
}) => {

  const handleClickOverLay = useCallback(() => {
    if (loading) {
      return;
    }
    onClickOverlay();
  }, [loading, onClickOverlay]);

  return (
    <Modal isOpen={isOpen} onClickOverlay={handleClickOverLay}>
      <div className={style.printModal}>
        <div>
          {loading
            ? <div>印刷するファイルを生成中です...</div>
            : (
              <>
                <p>印刷確認画面が表示されます。</p>
                <p>プリンタを選択して、印刷を実行してください。</p>
              </>
            )}
        </div>
        <div className={style.printModal__controller}>
          <Button
            color="black"
            onClick={onClickOkButton}
            loading={loading}
          >
            印刷する
          </Button>
          <Button
            color="outlineBlack"
            onClick={onClickCancelButton}
            loading={loading}
          >
            閉じる
          </Button>
        </div>
      </div>
    </Modal>
  );
};
