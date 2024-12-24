import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { updateWebsiteContent, type WebsiteContent } from '@/lib/editor';

interface ContentEditorProps {
  websiteId: string;
  initialContent: WebsiteContent['content'];
  onSave?: () => void;
}

export function ContentEditor({ websiteId, initialContent, onSave }: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    if (debouncedContent) {
      updateWebsiteContent(websiteId, { content: debouncedContent })
        .then(() => onSave?.())
        .catch(console.error);
    }
  }, [debouncedContent, websiteId, onSave]);

  const handleContentChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="relative group">
          <textarea
            value={value}
            onChange={(e) => handleContentChange(key, e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-500 bg-white border rounded-bl-md">
            {key}
          </span>
        </div>
      ))}
    </div>
  );
}