import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';
import { useCallback, useEffect, useState } from 'react';
import style from './edit-department-modal.module.scss';
import { Input } from '@/components/input/input';

type Props = {
  isOpen: boolean,
  department: string,
  onClickOkButton: (value: string) => void,
  onClickCancelButton: () => void,
  onClickOverlay: () => void,
};

export const EditDepartmentModal = (props: Props) => {
  const {
    isOpen,
    department,
    onClickOverlay,
    onClickCancelButton,
    onClickOkButton,
  } = props;
  const [departmentText, setDepartmentText] = useState(department);

  useEffect(() => {
    setDepartmentText(department);
  }, [department]);

  const handleChangeDepartment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentText(e.target.value);
  }, []);

  const handleClickOkButton = useCallback(() => {
    onClickOkButton(departmentText);
  }, [onClickOkButton, departmentText]);

  return (
    <Modal
      isOpen={isOpen}
      onClickOverlay={onClickOverlay}
    >
        <div className={style['dit-department-modal']}>
          <div>
            <p className={style['edit-department-modal__label']}>会社名を入力してください</p>
            <Input
              type="text"
              value={departmentText}
              onChange={handleChangeDepartment}
            />
          </div>
          <div className={style['edit-department-modal__controller']}>
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
