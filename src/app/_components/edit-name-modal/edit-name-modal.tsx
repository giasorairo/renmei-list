import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal/modal";
import { useCallback, useEffect, useState } from "react";

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
    <Modal isOpen={isOpen} onClickOverlay={onClickOverlay}>
        <div>
          <div>
            <p>名前を入力してください</p>
            <input
              type="text"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <Button
            color="black"
            onClick={handleClickOkButton}
          >
            変更する
          </Button>
          <Button
            color="outlineBlack"
            onClick={handleClickOkButton}
          >
            変更しない
          </Button>
        </div>
      </Modal>
  );
};
