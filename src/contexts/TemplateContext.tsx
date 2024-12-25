// src/contexts/TemplateContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { Template } from '@/types/supabase';

interface TemplateContextType {
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}