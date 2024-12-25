// src/components/editor/ThemeEditor.tsx
import React from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { updateWebsiteContent, type WebsiteContent } from '@/lib/editor';

interface ThemeEditorProps {
  websiteId: string;
  initialTheme: WebsiteContent['theme'];
  onSave?: () => void;
}

export function ThemeEditor({ websiteId, initialTheme, onSave }: ThemeEditorProps) {
  const [theme, setTheme] = React.useState(initialTheme);
  const debouncedTheme = useDebounce(theme, 1000);

  React.useEffect(() => {
    if (debouncedTheme) {
      updateWebsiteContent(websiteId, { theme: debouncedTheme })
        .then(() => onSave?.())
        .catch(console.error);
    }
  }, [debouncedTheme, websiteId, onSave]);

  const handleColorChange = (key: keyof WebsiteContent['theme'], value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-white">
      <h3 className="text-lg font-semibold">Theme Colors</h3>
      <div className="grid gap-4">
        {Object.entries(theme).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label htmlFor={key} className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="flex items-center gap-2">
              <input
                id={key}
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key as keyof WebsiteContent['theme'], e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleColorChange(key as keyof WebsiteContent['theme'], e.target.value)}
                className="w-24 px-2 py-1 text-sm border rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}