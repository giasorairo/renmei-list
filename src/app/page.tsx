'use client'

import styles from './page.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/button/button';
import { RenmeiListCanvas } from './_components/renmai-list-canvas/renmai-list-canvas';
import { useRenmeiListCanvas } from './_components/renmai-list-canvas/hooks/use-renmei-list-canvas';
import { useCanvasToBase64 } from './_hooks/use-canvas-to-base64';
import { usePreviewPdf } from './_hooks/use-preview-pdf';
import { RenmeiDocument } from './_components/renmei-document/renmei-document';
import { Modal } from '@/components/modal/modal';
import { useModal } from '@/components/modal/hooks/use-modal';
import { EditNameModal } from './_components/modals/edit-name-modal/edit-name-modal';
import { isEvenNumber } from '@/utilities/is-even-number';
import { EditCompanyModal } from './_components/modals/edit-company-modal/edit-company-modal';
import { useCompany } from './_hooks/use-company';
import { useDepartment } from './_hooks/use-department';
import { EditDepartmentModal } from './_components/modals/edit-department-modal/edit-department-modal';
import { FONT_FAMILY, useFontFamily } from './_hooks/use-font-family';
import { useImageDownload } from './_hooks/use-download';
import { download } from '@/utilities/download';

const getWindowSize = () => {
  const width = window.innerHeight;
  const height = window.innerWidth;
  return { width, height }
}

export default function Home() {

  const [names, setNames] = useState([
    '山田一郎',
    '山田二郎',
    '山田三郎',
    '山田四郎',
    '山田五郎',
    '山田六郎',
    '山田七郎',
    '山田八郎',
    '',
    '山田十郎',
    '山田十一郎',
    '山田十二郎',
    '山田十三郎',
    '山田十四郎',
    '山田十五郎',
    '',
  ]);

  const renmeiListCanvasRef = useRef<HTMLCanvasElement>(null);

  const {
    baseNameHeight,
    stagePadding,
    lastNamePositionX,
    getCharacterSpace,
    getNamePosition,
    canvasSize,
  } = useRenmeiListCanvas({ names });
  const { canvasBase64, convertCanvasToBase64 } = useCanvasToBase64(renmeiListCanvasRef);
  const { previewPdf } = usePreviewPdf(<RenmeiDocument base64Image={canvasBase64} canvasSize={canvasSize} />);
  const { handleClickDownloadButton } = useImageDownload(renmeiListCanvasRef);
  const { fontFamily, isLoaded: isLoadedFontFamily, handleSelectFontFamily } = useFontFamily();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenEditNameModal,
    openModal: openEditNameModal,
    closeModal: closeEditNameModal,
  } = useModal();

  const { company, changeCompany } = useCompany();
  const {
    isOpen: isOpenEditCompanyModal,
    openModal: openEditCompanyModal,
    closeModal: closeEditCompanyModal,
  } = useModal();
  const handleClickEditCompanyModalOkButton = useCallback((value: string) => {
    changeCompany(value);
    closeEditCompanyModal();
  }, [changeCompany, closeEditCompanyModal]);

  const { department, changeDepartment } = useDepartment();
  const {
    isOpen: isOpenEditDepartmentModal,
    openModal: openEditDepartmentModal,
    closeModal: closeEditDepartmentModal,
  } = useModal();
  const handleClickEditDepartmentModalOkButton = useCallback((value: string) => {
    changeDepartment(value);
    closeEditDepartmentModal();
  }, [changeDepartment, closeEditDepartmentModal]);

  const handleAddNames = useCallback(() => {
    setNames((prev) => [...prev, '名前を入力', '名前を入力']);
  }, []);

  const handleDeleteNames = useCallback(() => {
    const deleteNameCount = isEvenNumber(names.length) ? 2 :  1;
    // names.length が偶数の場合は 2 つ、奇数の場合は 1 つ要素を削除する
    const deletedNames = names.slice(0, names.length - deleteNameCount);
    setNames(deletedNames)
  }, [names]);

  const handleClickPrint = useCallback(() => {
    convertCanvasToBase64();
    openModal();
  }, [convertCanvasToBase64, openModal]);

  const [selectNameIndex, setSelectNameIndex] = useState<number | null>(null);
  const handleClickName = useCallback((index: number) => {
    setSelectNameIndex(index);
    openEditNameModal();
  }, [setSelectNameIndex, openEditNameModal]);

  const handleClickOkButton = useCallback((value: string) => {
    if (selectNameIndex === null) {
      return;
    }
    const namesCopy = [...names];
    namesCopy[selectNameIndex] = value
    setNames(namesCopy);
    closeEditNameModal();
  }, [selectNameIndex, names, closeEditNameModal, setNames]);

  useEffect(() => {
    fetch('/api/pdf', {
      method: 'POST',
    })
      .then((res) => res.blob())
      .then(async (blob) => {
        download(blob, 'download.pdf');
      });
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles['renmei-list']}>
        <div className={styles['renmei-list__controller']}>
          <div className={styles['renmei-list__button-container']}>
            <select className={styles['renmei-list__select']} onChange={handleSelectFontFamily}>
              {FONT_FAMILY.map((font, i) => (
                <option key={`font-option-${i}`} value={font}>{font}</option>
              ))}
            </select>
            <Button
              color='blue'
              onClick={handleAddNames}
            >
              行を追加する
            </Button>
            <Button
              color='red'
              onClick={handleDeleteNames}
            >
              行を削除する
            </Button>
            <div className={styles['renmei-list__print-button-container']}>
              <Button
                color='black'
                onClick={handleClickPrint}
              >
                印刷する
              </Button>
              <Button
                color='black'
                onClick={handleClickDownloadButton}
              >
                ダウンロード
              </Button>
            </div>
          </div>
        </div>
        <div
          className={styles['renmei-list__canvas']}
        >
          <RenmeiListCanvas
            names={names}
            canvasRef={renmeiListCanvasRef}
            canvasSize={canvasSize}
            baseNameHeight={baseNameHeight}
            stagePadding={stagePadding}
            lastNamePositionX={lastNamePositionX}
            getCharacterSpace={getCharacterSpace}
            getNamePosition={getNamePosition}
            onClickName={handleClickName}
            company={company}
            onClickCompany={openEditCompanyModal}
            department={department}
            onClickDepartment={openEditDepartmentModal}
            isLoadedFontFamily={isLoadedFontFamily}
            fontFamily={fontFamily}
          />
        </div>
      </section>

      <Modal isOpen={isOpen} onClickOverlay={closeModal}>
        <div>
          <div>
            <p>印刷確認画面が表示されます。</p>
            <p>プリンタを選択して、印刷を実行してください</p>
          </div>
          <Button
            color="black"
            onClick={previewPdf}
          >
            はい
          </Button>
        </div>
      </Modal>

      <EditNameModal
        isOpen={isOpenEditNameModal}
        selectName={selectNameIndex === null ? '' : names[selectNameIndex]}
        onClickOkButton={handleClickOkButton}
        onClickOverlay={closeEditNameModal}
        onClickCancelButton={closeEditNameModal}
      />

      <EditCompanyModal
        isOpen={isOpenEditCompanyModal}
        company={company}
        onClickOkButton={handleClickEditCompanyModalOkButton}
        onClickCancelButton={closeEditCompanyModal}
        onClickOverlay={closeEditCompanyModal}
      />

      <EditDepartmentModal
        isOpen={isOpenEditDepartmentModal}
        department={department}
        onClickOkButton={handleClickEditDepartmentModalOkButton}
        onClickCancelButton={closeEditDepartmentModal}
        onClickOverlay={closeEditDepartmentModal}
      />

    </div>
  )
};
