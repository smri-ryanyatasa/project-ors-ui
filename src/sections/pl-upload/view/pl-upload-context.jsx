'use client';

import { useContext, createContext } from 'react';

import { usePlUpload } from '../hooks/use-pl-upload';

const PlUploadContext = createContext(null);

export function PlUploadProvider({ children }) {
  const plUpload = usePlUpload();

  return <PlUploadContext.Provider value={plUpload}>{children}</PlUploadContext.Provider>;
}

export function usePlUploadContext() {
  const context = useContext(PlUploadContext);

  if (!context) {
    throw new Error('usePlUploadContext must be used inside PlUploadProvider');
  }

  return context;
}
