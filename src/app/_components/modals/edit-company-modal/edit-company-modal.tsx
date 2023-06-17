import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';
import { useCallback, useEffect, useState } from 'react';
import style from './edit-company-modal.module.scss';
import { Input } from '@/components/input/input';

type Props = {
  isOpen: boolean,
  company: string,
  onClickOkButton: (value: string) => void,
  onClickCancelButton: () => void,
  onClickOverlay: () => void,
};

export const EditCompanyModal = (props: Props) => {
  const {
    isOpen,
    company,
    onClickOverlay,
    onClickCancelButton,
    onClickOkButton,
  } = props;
  const [companyText, setCompanyText] = useState(company);

  useEffect(() => {
    setCompanyText(company);
  }, [company]);

  const handleChangeCompany = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyText(e.target.value);
  }, []);

  const handleClickOkButton = useCallback(() => {
    onClickOkButton(companyText);
  }, [onClickOkButton, companyText]);

  return (
    <Modal
      isOpen={isOpen}
      onClickOverlay={onClickOverlay}
    >
        <div className={style['edit-company-modal']}>
          <div>
            <p className={style['edit-company-modal__label']}>会社名を入力してください</p>
            <Input
              type="text"
              value={companyText}
              onChange={handleChangeCompany}
            />
          </div>
          <div className={style['edit-company-modal__controller']}>
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
