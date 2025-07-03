console.log(' InsightDocs content script injected!');

document.addEventListener('mouseup', async () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 2) {
    const existing = document.getElementById('insight-docs-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'insight-docs-popup';
    Object.assign(popup.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      maxWidth: '400px',
      background: '#fff',
      padding: '16px',
      border: '1px solid #ccc',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      zIndex: 9999,
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '14px',
      color: '#333',
      overflowY: 'auto',
      maxHeight: '70vh'
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '6px',
      right: '10px',
      background: 'transparent',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      color: '#888'
    });
    closeBtn.addEventListener('click', () => popup.remove());
    popup.appendChild(closeBtn);

    const loading = document.createElement('p');
    loading.textContent = `Fetching documentation for: "${selectedText}"...`;
    popup.appendChild(loading);
    document.body.appendChild(popup);

    try {
      const res = await fetch('http://localhost:5000/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText })
      });

      const data = await res.json();
      console.log(' AI Result:', data.result);

      popup.removeChild(loading);

      const content = parseAIResponse(data.result || 'No documentation found.');
      popup.appendChild(content);
    } catch (err) {
      console.error('Error fetching or parsing:', err);
      popup.innerHTML = '<p style="color:red;">Error fetching documentation.</p>';
    }
  }
});

function parseAIResponse(rawText) {
  const container = document.createElement('div');
  const sections = rawText.split(/\*\*(.*?)\*\*/g); 

  for (let i = 1; i < sections.length; i += 2) {
    const title = sections[i]?.trim();
    const content = sections[i + 1]?.trim();

    const section = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = title;
    heading.style.color = '#4f46e5';
    section.appendChild(heading);

    if (title === 'Syntax' || title === 'Example') {
      const pre = document.createElement('pre');
      pre.textContent = content.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
      Object.assign(pre.style, {
        background: '#f4f4f4',
        padding: '10px',
        borderRadius: '6px',
        overflowX: 'auto'
      });
      section.appendChild(pre);
    } else if (['Explanation', 'Related Examples', 'Dependencies', 'FAQ'].includes(title)) {
      const ul = document.createElement('ul');
      content.split('\n').forEach(line => {
        if (line.trim()) {
          const li = document.createElement('li');
          li.textContent = line.replace(/^[-•›]/, '').trim();
          ul.appendChild(li);
        }
      });
      section.appendChild(ul);
    } else {
      const p = document.createElement('p');
      p.textContent = content;
      section.appendChild(p);
    }

    container.appendChild(section);
  }

  return container;
}
