import React, { useState, useRef, useEffect, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { situationsData } from './situations.js';
import { uiStrings } from './uiStrings.js';
// import './App.css';

const languageOptions = [ "English", "Mandarin Chinese", "Spanish", "Vietnamese", "French", "Hindi" ];

// --- Cursor Flow Animation for Welcome Screen ---
const FluidBackground = () => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', handleResize);

        const addParticle = (x, y, vx, vy) => {
            // Spawn particles in a circular radius
            const spawnRadius = 10;
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * spawnRadius;
            
            const spawnX = x + Math.cos(angle) * radius;
            const spawnY = y + Math.sin(angle) * radius;

            particles.current.push({
                x: spawnX, y: spawnY,
                vx: vx * 0.5 + (Math.random() - 0.5) * 20,
                vy: vy * 0.5 + (Math.random() - 0.5) * 0.5,
                life: 30 + Math.random() * 10,
                size: Math.random() * 3 + 2,
            });
        };

        const handleMouseMove = (e) => {
            const vx = e.clientX - lastMousePosition.current.x;
            const vy = e.clientY - lastMousePosition.current.y;
            
            // Vary particle count based on cursor speed
            const speed = Math.hypot(vx, vy);
            const particleCount = Math.min(Math.floor(speed / 6), 20);

            for (let i = 0; i < particleCount; i++) {
                addParticle(e.clientX, e.clientY, -vx, -vy);
            }
            
            lastMousePosition.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                
                p.x += p.vx * 0.3;
                p.y += p.vy * 0.3;
                p.life -= 1;
                
                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    continue;
                }
                
                ctx.beginPath();
                ctx.fillStyle = `rgba(111, 66, 193, ${p.life / 50 * 0.3})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fluid-background-canvas" />;
};


// --- Welcome Screen Component ---
const WelcomeScreen = ({ onStart, T }) => {
    return (
        <div className="welcome-screen">
            <FluidBackground />
            <div className="welcome-content">
                <h1 className="welcome-title"> [ project persona ]</h1>
                <button onClick={onStart} className="welcome-button">
                    {T.startChatting}
                </button>
            </div>
        </div>
    );
};


// --- Webcam Feed Component ---
const WebcamFeed = ({ onCapture, T }) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let stream = null;
        const enableWebcam = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing webcam:", err);
                setError(T.webcamError);
            }
        };
        enableWebcam();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [T]);

    const handleCaptureClick = () => {
        if (!videoRef.current || !onCapture) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
    };

    return (
        <div className="webcam-container">
            {error ? (
                <div className="webcam-error">{error}</div>
            ) : (
                <video ref={videoRef} className="webcam-feed" autoPlay playsInline muted />
            )}
            <button onClick={handleCaptureClick} className="capture-button" disabled={!!error}>
                {T.capture}
            </button>
        </div>
    );
};

// --- TTS Hook ---
const useTTS = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [vibrationScale, setVibrationScale] = useState(1);
    const pulseTimeoutRef = useRef(null);
    const speak = useCallback((text, lang) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
        const utterance = new SpeechSynthesisUtterance(text);
        
        const langCodeMap = {
            "Mandarin Chinese": "zh-CN",
            "Spanish": "es-ES",
            "Vietnamese": "vi-VN",
            "French": "fr-FR",
            "Hindi": "hi-IN",
            "English": "en-US"
        };
        utterance.lang = langCodeMap[lang] || "en-US";

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => { setIsPlaying(false); setVibrationScale(1); };
        utterance.onerror = () => { setIsPlaying(false); setVibrationScale(1); };
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
                const randomScale = 1.3 + Math.random() * 0.5;
                setVibrationScale(randomScale);
                pulseTimeoutRef.current = setTimeout(() => setVibrationScale(1), 120);
            }
        };
        window.speechSynthesis.speak(utterance);
    }, []);
    const cancel = useCallback(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setVibrationScale(1);
            if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
        }
    }, []);
    useEffect(() => () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); }, []);
    return { isPlaying, vibrationScale, speak, cancel };
};

const parseFormatting = (text) => {
    if (!text) return { __html: '' };
    let formattedText = text
        .replace(/^\* (.*)$/gm, '<div class="bullet-item">• $1</div>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return { __html: formattedText };
};

// --- Main App Component ---
export default function App() {
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [selectedSituationKey, setSelectedSituationKey] = useState(null);
    const [language, setLanguage] = useState(languageOptions[0]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState(Object.keys(situationsData[languageOptions[0]])[0]);
    const [finalFeedback, setFinalFeedback] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const { isPlaying, vibrationScale, speak, cancel } = useTTS();
    const [currentlySpeakingMessageId, setCurrentlySpeakingMessageId] = useState(null);
    const [stagedImage, setStagedImage] = useState(null);
    
    const T = uiStrings[language];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setInput(transcript);
    }, [transcript]);

    const getLanguageCode = (lang) => {
        const langCodeMap = {
            "Mandarin Chinese": "zh-CN",
            "Spanish": "es-ES",
            "Vietnamese": "vi-VN",
            "French": "fr-FR",
            "Hindi": "hi-IN",
            "English": "en-US"
        };
        return langCodeMap[lang] || "en-US";
    }

    const onToggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ 
                continuous: true, 
                language: getLanguageCode(language) 
            });
        }
    };
    
    const handleStartSession = (situationKey) => {
        setIsSessionActive(true);
        setSelectedSituationKey(situationKey);
        const situation = situationsData[language][activeTab][situationKey];
        const systemPrompt = `
            You are a role-playing AI. Your persona is strictly defined as: '${situation.AI_persona}'.
            The context of the scene is: '${situation.description}'.
            You MUST respond in ${language}.

            RULES:
            1.  STAY IN CHARACTER. You are '${situation.AI_persona}'. Do not break character for any reason.
            2.  Your entire response must be ONLY the direct dialogue from your persona.
            3.  NEVER mention that you are an AI, a language model, or a computer program.
            4.  If you are shown an image, react to it as your persona would. For example, if you are a hiring manager and see a picture of a cat, you might say, "Oh, is that your cat? Very cute. Let's get back to the interview.
            5.  Don't use emojis"
        `;
        const initialMessage = { id: `msg-${Date.now()}`, role: 'assistant', content: situation.initial_message };
        setMessages([
            { id: 'system-prompt', role: 'system', content: systemPrompt },
            initialMessage
        ]);
        speak(initialMessage.content, language);
        setCurrentlySpeakingMessageId(initialMessage.id);
    };

    const handleEndSession = async () => {
        cancel();
        SpeechRecognition.stopListening();
        const userMessagesExist = messages.some(msg => msg.role === 'user');
        if (!userMessagesExist) {
            window.alert(T.sendMessageFirst);
            return;
        }
        setIsEvaluating(true);
        try {
            const response = await fetch('https://project-persona-backend.onrender.com/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages,
                    situation: situationsData[language][activeTab][selectedSituationKey],
                    language
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to get feedback.");
            setFinalFeedback(data.feedback);
        } catch (error) {
            console.error("Error getting final evaluation:", error);
            setFinalFeedback(`${T.errorOccurred}: ${error.message}`);
        } finally {
            setIsEvaluating(false);
            setIsSessionActive(false);
        }
    };

    const resetToSetup = () => {
        cancel();
        SpeechRecognition.stopListening();
        setIsSessionActive(false);
        setMessages([]);
        setFinalFeedback(null);
        setSelectedSituationKey(null);
        setStagedImage(null);
        setInput('');
    };

    const sendApiRequest = async (messagesForApi) => {
        setIsTyping(true);
        try {
            const response = await fetch('https://project-persona-backend.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: messagesForApi,
                    situation: situationsData[language][activeTab][selectedSituationKey],
                    language: language
                }),
            });
            if (!response.ok) throw new Error("Network response was not ok.");
            const data = await response.json();
            const assistantMessage = { id: `msg-${Date.now() + 1}`, role: 'assistant', content: data.dialogue };
            
            const lastUserMessage = messagesForApi[messagesForApi.length - 1];
            setMessages(prev => prev.map((msg) => 
                msg.id === lastUserMessage.id ? { ...msg, feedback: data.feedback, rating: data.rating } : msg
            ));

            setMessages(prev => [...prev, assistantMessage]);
            speak(assistantMessage.content, language);
            setCurrentlySpeakingMessageId(assistantMessage.id);
        } catch (error) {
            console.error("Error fetching from backend:", error);
            setMessages(prev => [...prev, { id: `err-${Date.now()}`, role: 'assistant', content: T.errorOccurred }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() && !stagedImage) return;
        SpeechRecognition.stopListening();
        cancel();
        // setIsTyping(true); // You might want to move this to after the message is added locally

        let userMessage = {
            id: `msg-${Date.now()}`,
            role: 'user',
            content: input || T.whatDoYouSee,
            rating: null,
        };

        // --- MODIFICATION START ---
        // Directly attach the staged image data to the message object.
        // The /upload_image call has been removed.
        if (stagedImage) {
            userMessage.imageSrc = stagedImage; // The base64 data URL
        }
        
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setStagedImage(null);
        resetTranscript();
        
        // The API request now sends the message with the embedded image data.
        sendApiRequest(newMessages);
    };
    
    const handleCapture = (imageDataUrl) => {
        setStagedImage(imageDataUrl);
    };

    const handleTtsToggle = (messageId, text) => {
        if (isPlaying && currentlySpeakingMessageId === messageId) {
            cancel();
            setCurrentlySpeakingMessageId(null);
        } else {
            speak(text, language);
            setCurrentlySpeakingMessageId(messageId);
        }
    };

    const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
    
    // ** THE FIX IS HERE **
    // This useEffect hook now correctly resets the activeTab when the language changes.
    // This prevents the app from crashing by ensuring the activeTab is always a valid
    // key for the currently selected language's data.
    useEffect(() => {
        const firstTab = Object.keys(situationsData[language])[0];
        setActiveTab(firstTab);
        setSelectedSituationKey(null);
        cancel();
    }, [language, cancel]);

    useEffect(() => {
        if (!isPlaying) {
            setCurrentlySpeakingMessageId(null);
        }
    }, [isPlaying]);

    if (!browserSupportsSpeechRecognition) {
        return <span>{T.unsupportedBrowser}</span>;
    }

    if (showWelcomeScreen) {
        return <WelcomeScreen onStart={() => setShowWelcomeScreen(false)} T={T} />;
    }

    return (
        <div className="app-layout">
            <ConfigPanel
                isSessionActive={isSessionActive}
                isEvaluating={isEvaluating}
                handleStartSession={handleStartSession}
                handleEndSession={handleEndSession}
                language={language}
                setLanguage={setLanguage}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedSituationKey={selectedSituationKey}
                setSelectedSituationKey={setSelectedSituationKey}
                messages={messages}
                onCapture={handleCapture}
                resetToSetup={resetToSetup}
                T={T}
            />
            <div className="main-content-area">
                <VisualizerPanel vibrationScale={vibrationScale} />
                <ChatPanel
                    isSessionActive={isSessionActive}
                    messages={messages}
                    isTyping={isTyping}
                    input={input}
                    setInput={setInput}
                    handleKeyPress={handleKeyPress}
                    handleSend={handleSend}
                    isPlaying={isPlaying}
                    currentlySpeakingMessageId={currentlySpeakingMessageId}
                    onTtsToggle={handleTtsToggle}
                    stagedImage={stagedImage}
                    onRemoveStagedImage={() => setStagedImage(null)}
                    isListening={listening}
                    onToggleListening={onToggleListening}
                    T={T}
                />
            </div>
            {finalFeedback && <FeedbackModal feedback={finalFeedback} handleClose={resetToSetup} T={T} />}
        </div>
    );
}

// --- Custom Language Selector Component ---
const LanguageSelector = ({ language, setLanguage, T }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleSelect = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className="form-group" ref={wrapperRef}>
            <label>{T.language}</label>
            <div className="language-select-wrapper">
                <button className="language-select-trigger" onClick={() => setIsOpen(!isOpen)}>
                    <span>{language}</span>
                    <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
                </button>
                {isOpen && (
                    <div className="language-select-options">
                        {languageOptions.map(opt => (
                            <div key={opt} className={`language-select-option ${language === opt ? 'selected' : ''}`} onClick={() => handleSelect(opt)}>
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Left-Side Configuration Panel ---
const ConfigPanel = ({ 
    isSessionActive, isEvaluating, handleStartSession, handleEndSession, language, setLanguage,
    activeTab, setActiveTab, selectedSituationKey, setSelectedSituationKey, messages, onCapture,
    resetToSetup, T
}) => {
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setSelectedSituationKey(null); 
    };
    
    const currentSituation = selectedSituationKey && situationsData[language][activeTab]
        ? situationsData[language][activeTab][selectedSituationKey] 
        : null;

    const hasUserMessages = messages.some(msg => msg.role === 'user');
    const isLimitedTab = activeTab === 'Limited';

    return (
        <aside className="config-panel">
            {isSessionActive ? (
                <>
                    <WebcamFeed onCapture={onCapture} T={T} />
                    <CriteriaBoard situation={currentSituation} T={T} />
                    {hasUserMessages ? (
                        <button onClick={handleEndSession} className="reset-button" disabled={isEvaluating}>
                            {isEvaluating ? T.analyzing : T.endAndGetFeedback}
                        </button>
                    ) : (
                        <button onClick={resetToSetup} className="reset-button">
                            {T.goBack}
                        </button>
                    )}
                </>
            ) : (
                <>
                    <div className="config-panel-header">
                        <h1>{T.personaChat}</h1>
                        <p>{T.appDescription}</p>
                        <LanguageSelector language={language} setLanguage={setLanguage} T={T} />
                        <div className="tabs-container">
                            {/* ** THE FIX IS HERE ** */}
                            {/* We iterate over the stable English keys from the data... */}
                            {Object.keys(situationsData[language]).map(tabKey => (
                                <div key={tabKey} className={`tab ${activeTab === tabKey ? 'active' : ''}`} onClick={() => handleTabClick(tabKey)}>
                                    {/* ...but we display the translated text from uiStrings. */}
                                    {T[tabKey]}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="situation-selector">
                        {/* This check is now safe because the `useEffect` in App ensures `activeTab` is always valid */}
                        {situationsData[language][activeTab] && Object.entries(situationsData[language][activeTab]).map(([key, situation]) => (
                            <div 
                                key={key} 
                                className={`situation-box ${selectedSituationKey === key ? 'selected' : ''} ${isLimitedTab ? 'limited-situation' : ''}`}
                                onClick={() => setSelectedSituationKey(key)}
                            >
                                <h4>{situation.title}</h4>
                                <p>{situation.description}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleStartSession(selectedSituationKey)} disabled={!selectedSituationKey} className="start-button">
                        {T.startSession}
                    </button>
                </>
            )}
        </aside>
    );
};

// --- Criteria Board ---
const CriteriaBoard = ({ situation, T }) => {
    if (!situation) return null;
    return (
        <div className="criteria-board">
            <h3>{situation.title}</h3>
            <p><strong>{T.goal}</strong> {situation.goal}</p>
            <hr style={{margin: '1rem 0'}}/>
            <h4>{T.ratingCriteria}</h4>
            <div className="criteria-item"><div className="rating-indicator green visible"></div><p><strong>{T.green}</strong> <span>{situation.criteria.green}</span></p></div>
            <div className="criteria-item"><div className="rating-indicator yellow visible"></div><p><strong>{T.yellow}</strong> <span>{situation.criteria.yellow}</span></p></div>
            <div className="criteria-item"><div className="rating-indicator red visible"></div><p><strong>{T.red}</strong> <span>{situation.criteria.red}</span></p></div>
        </div>
    );
};

// --- Modals ---
const FeedbackModal = ({ feedback, handleClose, T }) => ( <div className="modal-overlay"><div className="modal-content"><h2 className="feedback-title">{T.finalFeedback}</h2><div className="feedback-report" dangerouslySetInnerHTML={parseFormatting(feedback)} /><button onClick={handleClose}>{T.practiceAgain}</button></div></div> );

// --- Top Visualizer Panel ---
const VisualizerPanel = ({ vibrationScale }) => {
    return (
        <div className="visualizer-panel">
            <div className="main-visualizer-circle" style={{ transform: `scale(${vibrationScale})` }}></div>
        </div>
    );
};

// --- Bottom Chat Panel ---
const ChatPanel = ({ isSessionActive, messages, isTyping, input, setInput, handleKeyPress, handleSend, isPlaying, currentlySpeakingMessageId, onTtsToggle, stagedImage, onRemoveStagedImage, isListening, onToggleListening, T }) => {
    const messagesEndRef = useRef(null);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

    if (!isSessionActive) {
        return (
            <div className="chat-panel chat-panel--disabled">
                <h2>{T.selectSituation}</h2>
                <p>{T.getStarted}</p>
            </div>
        );
    }
    return (
        <div className="chat-panel">
            <section className="chat-messages">
                {messages.map((msg) => msg.role !== 'system' && (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg}
                        isSpeaking={isPlaying && currentlySpeakingMessageId === msg.id}
                        onTtsToggle={() => onTtsToggle(msg.id, msg.content)}
                        T={T}
                    />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </section>
            <footer className="chat-footer">
                <div className="input-area">
                    {stagedImage && (
                        <div className="staged-image-preview">
                            <img src={stagedImage} alt={T.stagedImageAlt} />
                            <button onClick={onRemoveStagedImage} className="remove-staged-image-btn">
                                &times;
                            </button>
                        </div>
                    )}
                    <div className="input-row">
                        <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder={T.inputPlaceholder} rows="1" disabled={isTyping} />
                        <button onClick={onToggleListening} className={`stt-button ${isListening ? 'listening' : ''}`} title={T.sttTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                                <path d="M8 8a3 3 0 0 0 3-3V3a3 3 0 0 0-6 0v2a3 3 0 0 0 3 3z"/>
                            </svg>
                        </button>
                        <button onClick={handleSend} disabled={isTyping || (!input.trim() && !stagedImage)}>{T.send}</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// --- Child Components ---
const MessageBubble = ({ message, isSpeaking, onTtsToggle, T }) => {
    const { role, content, rating, imageSrc, feedback } = message;
    const isUser = role === 'user';
    return (
        <div className={`message ${isUser ? 'message--user' : 'message--assistant'}`}>
            {isUser && <div className={`rating-indicator ${rating || ''} ${rating ? 'visible' : ''}`}></div>}
            
            <div className="message-content-wrapper">
                {imageSrc && <img src={imageSrc} alt={T.userCaptureAlt} className="chat-image" />}
                <div className="message-bubble" dangerouslySetInnerHTML={parseFormatting(content)}></div>
                {isUser && feedback && (
                    <div className={`feedback-text ${rating}`}>
                        {feedback}
                    </div>
                )}
            </div>

            {!isUser && (
                 <button onClick={onTtsToggle} className="tts-button-inline">
                    {isSpeaking ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/></svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
                    }
                </button>
            )}
        </div>
    );
};

const TypingIndicator = () => (
    <div className="message message--assistant">
        <div className="message-bubble">
            <div className="typing-indicator"><span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span></div>
        </div>
    </div>
);
