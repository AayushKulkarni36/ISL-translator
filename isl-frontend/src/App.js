import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const localizedText = {
  en: {
    title: "Indian Sign Language Translator",
    start: "Start Voice Input",
    toggle: "Toggle",
    light: "Light",
    dark: "Dark",
    status: "Status",
    recognized: "Recognized Text (Voice):",
    typed: "Or Type Text to Translate:",
    langSelect: "Select Input Language:",
    speak: "Speak Text",
    translate: "Translate & Show ISL Animation",
    footer: "© 2025 ISL Translator by Team Horizon"
  },
  hi: {
    title: "भारतीय सांकेतिक भाषा अनुवादक",
    start: "वॉइस इनपुट शुरू करें",
    toggle: "बदलें",
    light: "प्रकाश",
    dark: "अंधकार",
    status: "स्थिति",
    recognized: "पहचाना गया पाठ (आवाज़):",
    typed: "या अनुवाद के लिए पाठ दर्ज करें:",
    langSelect: "इनपुट भाषा चुनें:",
    speak: "पाठ बोलें",
    translate: "अनुवाद करें और सांकेतिक वीडियो दिखाएं",
    footer: "© 2025 आईएसएल अनुवादक टीम होराइजन"
  },
  mr: {
    title: "भारतीय सांकेतिक भाषा अनुवादक",
    start: "व्हॉईस इनपुट सुरू करा",
    toggle: "बदल",
    light: "प्रकाश",
    dark: "गडद",
    status: "स्थिती",
    recognized: "ओळखलेला मजकूर (आवाज):",
    typed: "किंवा भाषांतरासाठी मजकूर टाका:",
    langSelect: "इनपुट भाषा निवडा:",
    speak: "मजकूर वाचा",
    translate: "भाषांतर करा आणि संकेत व्हिडिओ दाखवा",
    footer: "© 2025 आयएसएल अनुवादक - टीम होरायझन"
  }
};

function App() {
  const [status, setStatus] = useState('Idle');
  const [statusClass, setStatusClass] = useState('idle');
  const [recognizedTextList, setRecognizedTextList] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  const t = localizedText[selectedLang];

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Web Speech API not supported. Use Chrome or Edge.');
      updateStatus('Browser not supported', 'error');
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = selectedLang === 'mr' ? 'mr-IN' : selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
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
  }, [selectedLang, recognizedTextList]);

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
    if (!selectedText.trim()) {
      updateStatus('Nothing to speak.', 'error');
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = selectedLang === 'mr' ? 'mr-IN' : selectedLang === 'hi' ? 'hi-IN' : 'en-IN';

    utterance.onstart = () => updateStatus('Speaking...', 'listening');
    utterance.onend = () => updateStatus('Done speaking.', 'success');
    utterance.onerror = (e) => {
      console.error("Speech error:", e.error);
      updateStatus('Speech error occurred.', 'error');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTranslate = () => {
    if (!selectedText) return alert('Please speak, select, or type some text');

    setIsLoading(true);
    updateStatus('Translating...', 'listening');

    fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: selectedText, lang: selectedLang })
    })
      .then(res => res.json())
      .then(data => {
        const videoUrls = data.videos || [];
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
      })
      .finally(() => setIsLoading(false));
  };

  const playVideosSequentially = (urls) => {
    let index = 0;
    const videoEl = videoRef.current;
    const sourceEl = videoEl.querySelector('source');

    const playNext = () => {
      if (index >= urls.length) {
        updateStatus('All signs played.', 'success');
        videoEl.classList.add('hidden'); // fade out video
        return;
      }

      let fullPath = urls[index];
      if (!fullPath.startsWith('http')) {
        fullPath = 'http://localhost:5000' + fullPath;
      }

      videoEl.classList.remove('hidden'); // fade in
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
    <div className={`container ${darkMode ? 'dark-mode' : ''}`} role="main" aria-label={t.title}>
      <header>{t.title}</header>

      <div className="card">
        <button onClick={handleStart}>{t.start}</button>
        <button onClick={() => setDarkMode(prev => !prev)}>{t.toggle} {darkMode ? t.light : t.dark}</button>
        <p>{t.status}: <span id="status" className={statusClass}>{status}</span></p>

        <label>{"Select Language Preference:"}</label>
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>

        <label>{t.recognized}</label>
        <select size="3" value={selectedText} onChange={(e) => setSelectedText(e.target.value)}>
          {recognizedTextList.map((text, idx) => (
            <option key={idx} value={text}>{text}</option>
          ))}
        </select>

        <label>{t.typed}</label>
        <input type="text" value={selectedText} onChange={(e) => setSelectedText(e.target.value)} />



        <button onClick={handleSpeak} disabled={!selectedText}>{t.speak}</button>
        <button onClick={handleTranslate} disabled={!selectedText}>{t.translate}</button>

        {isLoading && <div className="loader"></div>}

        <video ref={videoRef} controls className="" style={{ marginTop: '20px' }}>
          <source src="" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <footer>Indian Sign Language Translator | By Aayush Kulkarni</footer>
    </div>
  );
}

export default App;
