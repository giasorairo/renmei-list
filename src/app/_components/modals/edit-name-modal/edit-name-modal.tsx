import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';
import { useCallback, useEffect, useState } from 'react';
import style from './edit-name-modal.module.scss';
import { Input } from '@/components/input/input';

type Props = {
  isOpen: boolean,
  selectName: string,
  onClickOkButton: (value: string) => void,
  onClickCancelButton: () => void,
  onClickOverlay: () => void,
};

export const EditNameModal = (props: Props) => {
  const {
    isOpen,
    selectName,
    onClickOverlay,
    onClickCancelButton,
    onClickOkButton,
  } = props;
  const [name, setName] = useState(selectName);

  useEffect(() => {
    setName(selectName);
  }, [selectName]);

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleClickOkButton = useCallback(() => {
    onClickOkButton(name);
  }, [onClickOkButton, name]);

  return (
    <Modal
      isOpen={isOpen}
      onClickOverlay={onClickOverlay}
    >
        <div
          className={style['edit-name-modal']}
        >
          <div>
            <p className={style['edit-name-modal__label']}>名前を入力してください</p>
            <Input
              type="text"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <div className={style['edit-name-modal__controller']}>
            <Button
              color="black"
              onClick={handleClickOkButton}
            >
              変更する
            </Button>
            <Button
              color="outlineBlack"
              onClick={onClickCancelButton}
            >
              変更しない
            </Button>
          </div>
        </div>
      </Modal>
  );
};
