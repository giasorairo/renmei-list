import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';
import { useCallback, useEffect, useState } from 'react';
import style from './edit-name-modal.module.scss';
import { Input } from '@/components/input/input';

type Props = {
  isOpen: boolean,
  selectName: string,
  onClickOkButton: (value: string) => void,
  onClickOverlay: () => void,
};

export const EditNameModal = (props: Props) => {
  const {
    isOpen,
    selectName,
    onClickOverlay,
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
        className={style['editNameModal']}
      >
        <div>
          <Input
            type="text"
            value={name}
            onChange={handleChangeName}
            placeholder='名前を入力'
          />
        </div>
        <div className={style['editNameModal__controller']}>
          <Button
            color="blue"
            onClick={handleClickOkButton}
          >
            決定
          </Button>
        </div>
      </div>
    </Modal>
  );
};
