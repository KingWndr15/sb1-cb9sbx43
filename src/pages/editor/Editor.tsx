import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { template } = location.state || {};

  if (!template) {
    return (
      <div>
        No template data found. Please go back and select a template.
        <button onClick={() => navigate('/templates')}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: template.theme.background, color: template.theme.text }}>
      {template.sections.map((section: any) => (
        <section key={section.id} id={section.id}>
          <h1>{section.title}</h1>
          <p>{section.content}</p>
          {section.image && <img src={section.image} alt={section.title} />}
        </section>
      ))}
    </div>
  );
}

export default Editor;