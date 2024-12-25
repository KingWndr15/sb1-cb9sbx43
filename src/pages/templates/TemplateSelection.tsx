// src/pages/templates/TemplateSelection.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { getTemplates, type Template } from '@/lib/templates';

export function TemplateSelection() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { user } = useAuth();
  const { setSelectedTemplate } = useTemplate();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (err) {
        console.error('Error loading templates:', err);
        setError('Failed to load templates. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadTemplates();
  }, []);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    navigate('/setup/subdomain');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Website Template
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Select a template to get started with your professional website
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}