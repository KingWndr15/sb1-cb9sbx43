// src/pages/editor/EditorPage.tsx
import React from 'react';
import { useTemplate } from '@/contexts/TemplateContext';
import { ContentEditor } from '@/components/editor/ContentEditor';

export function EditorPage() {
  const { selectedTemplate } = useTemplate();

  if (!selectedTemplate) {
    return <div>No template selected. Please go back and choose a template.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ContentEditor websiteId={selectedTemplate.id} initialContent={{}} />
    </div>
  );
}