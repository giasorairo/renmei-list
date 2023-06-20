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
import { useFontFamily } from './_hooks/use-font-family';
import { RenmeiList } from '@/components/renmai-list/renmei-list';
import { usePdf } from './_hooks/use-pdf';
import { PrintModal } from './_components/modals/print-modal/print-modal';
import { RenmeiDocument } from '@/components/renmei-document.tsx/renmei-document';
import { fontFamilies } from './_hooks/use-font-family';

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

  const handleAddNames = useCallback(() => {
    setNames((prev) => [...prev, '', '']);
  }, []);

  const { printPdf } = usePdf(names, company, department);

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

  const handleClickPrintOkButton = useCallback(() => {
    printPdf(<RenmeiDocument names={names} company={company} department={department} fontFamily={fontFamily} />)
  }, [company, department, fontFamily, names, printPdf]);

  return (
    <div className={styles.page}>
      <section className={styles['renmeiList']}>
        <div className={styles['renmeiList__controller']}>
          <div className={styles['renmeiList__buttonContainer']}>
            <select className={styles['renmeiList__select']} onChange={handleSelectFontFamily}>
              {fontFamilies.map((_fontFamily, i) => (
                <option key={`font-option-${i}`} value={_fontFamily.name}>{_fontFamily.name}</option>
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
            <div className={styles['renmeiList__printButtonContainer']}>
              <Button
                color='black'
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
      </section>

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
