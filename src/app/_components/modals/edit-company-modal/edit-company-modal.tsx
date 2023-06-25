import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal/modal";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/input/input";
import style from "./edit-company-modal.module.scss";

type Props = {
  isOpen: boolean;
  company: string;
  onClickOkButton: (value: string) => void;
  onClickOverlay: () => void;
};

export const EditCompanyModal = (props: Props) => {
  const { isOpen, company, onClickOverlay, onClickOkButton } = props;
  const [companyText, setCompanyText] = useState(company);

  useEffect(() => {
    setCompanyText(company);
  }, [company]);

  const handleChangeCompany = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyText(e.target.value);
    },
    []
  );

  const handleClickOkButton = useCallback(() => {
    onClickOkButton(companyText);
  }, [onClickOkButton, companyText]);

  return (
    <Modal isOpen={isOpen} onClickOverlay={onClickOverlay}>
      <div className={style.editCompanyModal}>
        <div>
          <Input
            type="text"
            value={companyText}
            onChange={handleChangeCompany}
          />
        </div>
        <div className={style.editCompanyModal__controller}>
          <Button color="blue" onClick={handleClickOkButton}>
            決定
          </Button>
        </div>
      </div>
    </Modal>
  );
};
