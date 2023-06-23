import { useDidmount } from "@/hooks/use-didmount";
import { isEvenNumber } from "@/utilities/is-even-number";
import { LocalStorageController } from "@/utilities/local-storage-controller";
import { LOCAL_STORAGE_KEYS } from "@/utilities/local-storage-keys";
import { useState, useCallback } from "react";

const initialNames = [
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
];

export const useNames = () => {
  const [names, setNames] = useState<string[]>([]);

  const setNamesEnhance = useCallback((value: string[]) => {
    setNames(value);
    LocalStorageController.set<string[]>(LOCAL_STORAGE_KEYS.names, value);
  }, []);

  const handleAddNames = useCallback(() => {
    setNamesEnhance([...names, '', '']);
  }, [names, setNamesEnhance]);

  const handleDeleteNames = useCallback(() => {
    const deleteNameCount = isEvenNumber(names.length) ? 2 :  1;
    // names.length が偶数の場合は 2 つ、奇数の場合は 1 つ要素を削除する
    const deletedNames = names.slice(0, names.length - deleteNameCount);
    setNamesEnhance(deletedNames);
  }, [names, setNamesEnhance]);

  useDidmount(() => {
    const gotNames = LocalStorageController.get<string[]>(LOCAL_STORAGE_KEYS.names);
    if (!gotNames || typeof gotNames === 'string') {
      setNamesEnhance(initialNames);
      return;
    }
    setNamesEnhance(gotNames);
  });

  return { names, setNamesEnhance, handleAddNames, handleDeleteNames };
};
