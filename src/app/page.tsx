'use client'

import styles from './page.module.scss';
import { useCallback, useState } from 'react';
import { Button } from '@/components/button/button';
import { useModal } from '@/components/modal/hooks/use-modal';
import { EditNameModal } from './_components/modals/edit-name-modal/edit-name-modal';
import { EditCompanyModal } from './_components/modals/edit-company-modal/edit-company-modal';
import { useCompany } from './_hooks/use-company';
import { useDepartment } from './_hooks/use-department';
import { EditDepartmentModal } from './_components/modals/edit-department-modal/edit-department-modal';
import { useFontFamily } from './_hooks/use-font-family';
import { RenmeiList } from '@/components/renmai-list/renmei-list';
import { usePdf } from './_hooks/use-pdf';
import { PrintModal } from './_components/modals/print-modal/print-modal';
import { RenmeiDocument } from '@/components/renmei-document/renmei-document';
import { fontFamilies } from './_hooks/use-font-family';
import { LandscapeModeRequest } from '@/components/landscape-mode-request/landscape-mode-request';
import { useMobileDetect } from '@/hooks/use-mobile-detect';
import { useOrientation } from '@/hooks/use-orientation';
import { useNames } from './_hooks/use-names';

export default function Home() {
  const { names, setNamesEnhance, handleAddNames, handleDeleteNames } = useNames();
  const { fontFamily, handleSelectFontFamily, isLoaded } = useFontFamily();
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

  const { printPdf } = usePdf(names, company, department);

  const handleClickPrint = useCallback(() => {
    openModal();
  }, [openModal]);

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
    setNamesEnhance(namesCopy)
    closeEditNameModal();
  }, [selectNameIndex, names, setNamesEnhance, closeEditNameModal]);

  const handleClickPrintOkButton = useCallback(() => {
    printPdf(<RenmeiDocument names={names} company={company} department={department} fontFamily={fontFamily} />)
  }, [company, department, fontFamily, names, printPdf]);

  const { isMobile } = useMobileDetect();
  const { isLandscape } = useOrientation();

  if (isMobile && !isLandscape) {
    return (<LandscapeModeRequest />);
  }

  return (
    <section className={styles.page}>
      <div className={styles['renmeiList']}>
        <div className={styles['renmeiList__controller']}>
          <div className={styles['renmeiList__buttonContainer']}>
            <select className={styles['renmeiList__select']} onChange={handleSelectFontFamily}>
              {fontFamilies.map((_fontFamily, i) => (
                <option key={`font-option-${i}`} value={_fontFamily.name}>{_fontFamily.displayName}</option>
              ))}
            </select>
            <Button
              color='black'
              onClick={handleAddNames}
            >
              名前を追加する
            </Button>
            <Button
              color='outlineBlack'
              onClick={handleDeleteNames}
            >
              名前を削除する
            </Button>
            <div className={styles['renmeiList__printButtonContainer']}>
              <Button
                color='blue'
                onClick={handleClickPrint}
              >
                印刷する
              </Button>
            </div>
          </div>
        </div>
        <div className={styles['renmeiList__container']}>
          <div className={styles['renmeiList__pdf']}>
            <div className={styles['renmeiList__scrollContainer']}>
              <RenmeiList
                names={names}
                company={company}
                department={department}
                onClickName={handleClickName}
                onClickCompany={openEditCompanyModal}
                onClickDepartment={openEditDepartmentModal}
                fontFamily={fontFamily.name}
              />
            </div>
          </div>
        </div>
      </div>

      <PrintModal
        isOpen={isOpen}
        onClickCancelButton={closeModal}
        onClickOverlay={closeModal}
        onClickOkButton={handleClickPrintOkButton}
      />

      <EditNameModal
        isOpen={isOpenEditNameModal}
        selectName={selectNameIndex === null ? '' : names[selectNameIndex]}
        onClickOkButton={handleClickOkButton}
        onClickOverlay={closeEditNameModal}
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

    </section>
  )
};
