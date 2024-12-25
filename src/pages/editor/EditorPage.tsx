import React, { useEffect, useState } from 'react';
import { useTemplate } from '@/contexts/TemplateContext';
import { ContentEditor } from '@/components/editor/ContentEditor';
import { getLandingPageTemplate } from '@/lib/supabase';
import { SubdomainForm } from '@/components/SubdomainForm';

export function EditorPage() {
  const { selectedTemplate } = useTemplate();
  const [templateData, setTemplateData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [showSubdomainForm, setShowSubdomainForm] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (selectedTemplate) {
        try {
          const data = await getLandingPageTemplate(selectedTemplate.name);
          setTemplateData(data);
        } catch (err) {
          console.error('Error fetching template:', err);
          setError('Failed to load the selected template. Please try again.');
        }
      }
    };

    fetchTemplate();
  }, [selectedTemplate]);

  const handleSave = () => {
    setShowSubdomainForm(true);
  };

  if (!selectedTemplate) {
    return <div>No template selected. Please go back and choose a template.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!templateData) {
    return <div>Loading template...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ContentEditor websiteId={selectedTemplate.id} initialContent={templateData.content} />
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Save and Set Subdomain
      </button>
      {showSubdomainForm && (
        <SubdomainForm
          userId="user-id-placeholder" // Replace with actual user ID
          templateId={selectedTemplate.id}
          onSuccess={() => {
            setShowSubdomainForm(false);
            alert('Subdomain saved successfully!');
          }}
        />
      )}
    </div>
  );
}