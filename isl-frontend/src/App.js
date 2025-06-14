import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Idle');
  const [statusClass, setStatusClass] = useState('idle');
  const [recognizedTextList, setRecognizedTextList] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Web Speech API not supported. Use Chrome or Edge.');
      updateStatus('Browser not supported', 'error');
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => updateStatus('Listening...', 'listening');
      recognitionRef.current.onerror = e => updateStatus('Error: ' + e.error, 'error');
      recognitionRef.current.onend = () => updateStatus('Idle', 'idle');
      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript.trim();
        if (!recognizedTextList.includes(transcript)) {
          setRecognizedTextList(prev => [...prev, transcript]);
        }
        setSelectedText(transcript);
        updateStatus('Voice recognized.', 'success');
      };
    }
  }, [recognizedTextList]);

  const updateStatus = (text, type = 'idle') => {
    setStatus(text);
    setStatusClass(type);
  };

  const handleStart = () => {
    recognitionRef.current.start();
    setSelectedText('');
    updateStatus('Idle', 'idle');
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = 'en-IN';
    speechSynthesis.speak(utterance);
  };

  const handleTranslate = () => {
    if (!selectedText) return alert('Please speak or select some text');

    updateStatus('Translating...', 'listening');

    fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: selectedText })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to translate');
        return res.json();
      })
      .then(data => {
        const videoUrls = data.video_urls || data.videos || []; // supports both keys
        if (videoUrls.length > 0) {
          playVideosSequentially(videoUrls);
          updateStatus('Playing ISL translation...', 'success');
        } else {
          updateStatus('No video found for this text.', 'error');
        }
      })
      .catch(err => {
        updateStatus('Error during translation.', 'error');
        console.error(err);
      });
  };

  const playVideosSequentially = (urls) => {
    let index = 0;
    if (!urls || urls.length === 0) return;

    const videoEl = videoRef.current;
    const sourceEl = videoEl.querySelector('source');

    const playNext = () => {
      if (index >= urls.length) {
        updateStatus('All signs played.', 'success');
        return;
      }

      let fullPath = urls[index];
      if (!fullPath.startsWith('http')) {
        fullPath = 'http://localhost:5000' + fullPath; // ensure full path
      }

      console.log('Playing:', fullPath);

      videoEl.style.display = 'block';
      sourceEl.src = fullPath;
      videoEl.load();
      videoEl.play();

      videoEl.onended = () => {
        index++;
        playNext();
      };
    };

    playNext();
  };

  return (
    <div className="container" role="main" aria-label="Indian Sign Language Translator">
      <h1>Indian Sign Language Translator</h1>

      <button onClick={handleStart}>🎤 Start Voice Input</button>
      <p>Status: <span id="status" className={statusClass}>{status}</span></p>

      <label htmlFor="recognized-text">Recognized Text:</label>
      <select
        id="recognized-text"
        size="3"
        value={selectedText}
        onChange={(e) => setSelectedText(e.target.value)}
      >
        {recognizedTextList.map((text, idx) => (
          <option key={idx} value={text}>{text}</option>
        ))}
      </select>

      <button onClick={handleSpeak} disabled={!selectedText}> Speak Recognized Text</button>
      <button onClick={handleTranslate} disabled={!selectedText}> Translate &amp; Show ISL Animation</button>

      <video
        id="isl-video"
        controls
        ref={videoRef}
        style={{
          display: 'none',
          marginTop: '20px',
          width: '100%',
          maxHeight: '400px',
          borderRadius: '12px'
        }}
      >
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
