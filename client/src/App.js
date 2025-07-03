import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedText, setSelectedText] = useState('');
  const [leftPanelDoc, setLeftPanelDoc] = useState(null);
  const [query, setQuery] = useState('');

  const handleExplain = async () => {
    if (!selectedText) return alert('Select a term to explain.');
    try {
      const res = await axios.post('/api/explain', { text: selectedText });
      const parsed = parseAIResponse(res.data.result);
      setLeftPanelDoc(parsed);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch explanation');
    }
  };

  const handleAsk = async () => {
    if (!query) return alert('Please type a question.');
    try {
      const res = await axios.post('/api/explain', { text: query });
      const parsed = parseAIResponse(res.data.result);
      setLeftPanelDoc(parsed); 
    } catch (err) {
      console.error(err);
      alert('Failed to get response');
    }
  };

  const handleSelection = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  const parseAIResponse = (text) => {
    const parsed = {};
    const sectionRegex = /###?\s*(.+?)\n([\s\S]*?)(?=###|\n##|\n\*\*|\n?$)/g;
    let match;

    while ((match = sectionRegex.exec(text)) !== null) {
      const title = match[1].trim();
      const content = match[2].trim();
      parsed[title] = content;
    }

    if (Object.keys(parsed).length === 0) {
      const sections = text.split(/\*\*(.*?)\*\*/g);
      for (let i = 1; i < sections.length; i += 2) {
        const title = sections[i].trim();
        const content = sections[i + 1]?.trim();
        parsed[title] = content;
      }
    }

    return parsed;
  };

  const renderDoc = (doc) => {
    if (!doc) return null;

    return (
      <>
        {Object.entries(doc).map(([title, content]) => {
          if ((title === 'Syntax' || title === 'Example') && content.includes('```')) {
            const codeMatch = content.match(/```(?:[a-z]*)\n([\s\S]*?)```/);
            return (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <pre><code>{codeMatch ? codeMatch[1] : content}</code></pre>
              </div>
            );
          }

          if (title === 'Explanation' || title === 'Related Examples' || title === 'FAQ' || title === 'Dependencies') {
            return (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <ul>
                  {content.split('\n').map((line, idx) => (
                    <li key={idx}>{line.replace(/^[-•›]/, '').trim()}</li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p>{content}</p>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="main" onMouseUp={handleSelection}>
      <h1 className="heading">InsightDocs – Smart AI Documentation</h1>

      <div className="content">
        <div className="left-panel">
          <h2><strong>📘 Documentation</strong></h2>
          {leftPanelDoc ? renderDoc(leftPanelDoc) : (
            <>
              <p>This is a sample about <code>useEffect</code> in React.</p>
              <h3>Explanation</h3>
              <ul>
                <li>Subscribe to services or modify the DOM.</li>
                <li><code>useEffect</code> takes a function and an optional dependency array.</li>
                <li>Runs after first render and on updates.</li>
              </ul>

              <h3>Syntax</h3>
              <pre><code>{`useEffect(() => {
  // Run effect
}, [dependencies]);`}</code></pre>

              <h3>Example</h3>
              <pre><code>{`import { useState, useEffect } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'Count: ' + count;
  }, [count]);

  return <div>{count}</div>;
}`}</code></pre>
            </>
          )}
        </div>

        <div className="right-panel">
          <div className="card">
            <h3>✨ Explain Highlighted Text</h3>
            <button onClick={handleExplain}> Explain</button>
          </div>

          <div className="card">
            <h3>Ask a Question</h3>
            <input
              type="text"
              placeholder="Ask about any concept..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-box"
            />
            <button onClick={handleAsk}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
