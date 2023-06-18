'use client'

import styles from './page.module.scss';
import { useCallback, useState } from 'react';
import { Button } from '@/components/button/button';
import { useModal } from '@/components/modal/hooks/use-modal';
import { EditNameModal } from './_components/modals/edit-name-modal/edit-name-modal';
import { isEvenNumber } from '@/utilities/is-even-number';
import { EditCompanyModal } from './_components/modals/edit-company-modal/edit-company-modal';
import { useCompany } from './_hooks/use-company';
import { useDepartment } from './_hooks/use-department';
import { EditDepartmentModal } from './_components/modals/edit-department-modal/edit-department-modal';
import { FONT_FAMILY, useFontFamily } from './_hooks/use-font-family';
import { RenmeiList } from '@/components/renmai-list/renmei-list';
import { usePdf } from './_hooks/use-pdf';
import { PrintModal } from './_components/modals/print-modal/print-modal';

export default function Home() {

  const [names, setNames] = useState([
    '山田佐賀',
    '山田宮崎',
    '山田大分',
    '山田福岡',
    '山田長崎',
    '山田鹿児島',
    '山田沖縄',
    '山田熊本',
    '',
    '山田愛媛',
    '山田香川',
    '山田徳島',
    '山田高知',
    '山田山口',
    '山田広島',
    '',
  ]);

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
    setNames((prev) => [...prev, '', '']);
  }, []);

  const { printPdf, loading: loadingPdf } = usePdf(names, company, department);

  const handleDeleteNames = useCallback(() => {
    const deleteNameCount = isEvenNumber(names.length) ? 2 :  1;
    // names.length が偶数の場合は 2 つ、奇数の場合は 1 つ要素を削除する
    const deletedNames = names.slice(0, names.length - deleteNameCount);
    setNames(deletedNames)
  }, [names]);

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
    setNames(namesCopy);
    closeEditNameModal();
  }, [selectNameIndex, names, closeEditNameModal, setNames]);

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
            </div>
          </div>
        </div>
        <div className={styles['renmei-list-container']}>
          <div className={styles['renmei-list__pdf']}>
            <div className={styles['renmei-list__scroll-container']}>
              <RenmeiList
                names={names}
                company={company}
                department={department}
                onClickName={handleClickName}
                onClickCompany={openEditCompanyModal}
                onClickDepartment={openEditDepartmentModal}
              />
            </div>
          </div>
        </div>
      </section>

      <PrintModal
        isOpen={isOpen}
        onClickCancelButton={closeModal}
        onClickOverlay={closeModal}
        onClickOkButton={printPdf}
        loading={loadingPdf}
      />

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
