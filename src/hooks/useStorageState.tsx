import { useState, useCallback } from 'react';

export function useStorageStateGeneric<T>(
  key: string,
  storageGet: (string) => T | null,
  storageSet: (string, T) => void
): [T | null, (a: T | null) => void] {
  const initialValue = storageGet(key);
  const [value, setter] = useState<T | null>(initialValue);
  const storageSetter = useCallback(
    (newVal) => {
      storageSet(key, newVal);
      setter(newVal);
    },
    [setter]
  );
  return [value, storageSetter];
}

export default function useStorageState(key: string) {
  return useStorageStateGeneric<string>(
    key,
    localStorage.getItem.bind(localStorage),
    localStorage.setItem.bind(localStorage)
  );
}
