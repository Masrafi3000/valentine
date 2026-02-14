import React, { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import './PlayfulQuestionPage.css';

const PlayfulQuestionPage = ({ onYesClick, backgroundImage }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 300, y: 200 });
  const [noButtonExpression, setNoButtonExpression] = useState('😜');
  const [noButtonMessage, setNoButtonMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonScale, setButtonScale] = useState(1);
  const [showTeaseBubble, setShowTeaseBubble] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;
  const imgRef = useRef(null);
  const formRef = useRef(null);
  
  // EmailJS configuration - REPLACE WITH YOUR ACTUAL VALUES
  const EMAILJS_PUBLIC_KEY = 'Yrx0YHZ5_uwHKnBLB'; // Get from EmailJS
  const EMAILJS_SERVICE_ID = 'service_v8lqcbl'; // Get from EmailJS
  const EMAILJS_TEMPLATE_ID = 'template_k5yolh3'; // Get from EmailJS
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Playful expressions
  const expressions = [
    '😜', '😝', '🤪', '😋', '😎', '🥳', '😏', '😈', '👻', '🐶', '🦊', '🐼', '🐸', '🐧', '🦄', '🐥', '🦋', '🌟', '🌈', '⭐'
  ];

  // Teasing messages
  const teaseMessages = [
    "Catch me if you can! 🏃‍♂️",
    "Nope nope nope! 🙈",
    "You'll never get me! 😜",
    "Too slowww! 🐢",
    "Almost... but no! ✨",
    "Sweety, keep trying! 💫",
    "Boop! Missed me! 👆",
    "I'm too quick! ⚡",
    "Nuh-uh! Not today! 🌈",
    "Wheee! So fast! 🚀",
    "You can't catch me! 🦊",
    "Silly goose! 🦆",
    "I'm right here! 👋",
    "Over here, sweety! 💕",
    "Try again! 😘",
    "You love me really! 💖",
    "Never gonna catch me! 🎵",
    "Too slow, too slow! 🐌",
    "Don't touch the No button! 😝",
    "Impossible hehe~! ✨",
    "No wayyy you can catch it! 🏃‍♀️",
    "Hehe, too slow sweety! 🐢",
    "No button says NOPE! 🙈",
    "Can't touch this~ 🎶",
    "Stay awayyy! 💕",
    "It's mineee! 😈",
    "Try harder cutie! 🥰",
    "Never gonna happennn~ 🌈"
  ];

  // Voice messages - extra childish and playful
  const voiceMessages = [
    "Catch me sweety!",
    "You can't catch me!",
    "Nope nope nope!",
    "Too slow!",
    "Try again sweety!",
    "I'm over here!",
    "Boop!",
    "Wheee!",
    "Silly!",
    "Not today!",
    "I'm still here!",
    "Come catch me!",
    "You love me!",
    "Never gonna catch me!",
    "Sweety sweety sweety!",
    "Hey look over here!",
    "You almost got me!",
    "No no no no no!",
    "You caaan't catch meee~",
    "No button is too fast for youuu!",
    "Hehehe, try again sweety pie!",
    "Impossible! No wayyy!"
  ];

  // Cartoon helpers (bunny, santa, teddy, etc.)
  const helperCharacters = ['🐰', '🎅', '🧸', '🦄', '🐥', '🐼', '🦊', '🐨', '🐸', '🐧', '🦉', '🐝'];

  const helperTeases = [
    "Don't touch the No button! 😝",
    "Impossible hehe~! ✨",
    "No wayyy you can catch it! 🏃‍♀️",
    "Hehe, too slow sweety! 🐢",
    "No button says NOPE! 🙈",
    "Can't touch this~ 🎶",
    "Stay awayyy! 💕",
    "It's mineee! 😈",
    "Try harder cutie! 🥰",
    "Never gonna happennn~ 🌈",
    "The No button is too fast! ⚡",
    "You'll never catch it! 🏆",
    "Sweety, give up! 😜",
    "No means no! 🙅‍♀️"
  ];

  // Function to send email notification
  const sendEmailNotification = async () => {
    setIsSendingEmail(true);
    setEmailStatus('sending');
    
    try {
      // Get browser and device info
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;
      const screenSize = `${window.screen.width}x${window.screen.height}`;
      const timestamp = new Date().toLocaleString();
      
      // Prepare template parameters
      const templateParams = {
        to_email: 'makdummasrafi@gmail.com', // Your email
        from_name: 'Love Question Website',
        message: 'Someone clicked YES! 💝',
        attempts: attempts,
        timestamp: timestamp,
        user_agent: userAgent,
        platform: platform,
        language: language,
        screen_size: screenSize,
        url: window.location.href
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setEmailStatus('success');
        console.log('Email sent successfully!');
      } else {
        setEmailStatus('error');
        console.error('Failed to send email');
      }
    } catch (error) {
      setEmailStatus('error');
      console.error('Email error:', error);
    } finally {
      setIsSendingEmail(false);
      // Call the original onYesClick after email is sent
      setTimeout(() => {
        onYesClick();
      }, 1000);
    }
  };

  // Modified handleYesClick
  const handleYesClick = async (e) => {
    e.preventDefault();
    // Send email notification
    await sendEmailNotification();
  };

  // Preload background image
  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => setImageLoaded(true);
    } else {
      setImageLoaded(true); // Use gradient if no image
    }
  }, [backgroundImage]);

  // Initialize button position
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const centerX = (container.clientWidth - 200) / 2;
      const centerY = (container.clientHeight - 150) / 2;
      setNoButtonPosition({
        x: Math.max(50, Math.min(centerX, container.clientWidth - 250)),
        y: Math.max(50, Math.min(centerY, container.clientHeight - 200))
      });
    }
  }, []);

  // Continuous rotation effect
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 8) % 360);
    }, 100);
    return () => clearInterval(rotationInterval);
  }, []);

  // Continuous expression changes
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      setNoButtonExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    }, 600);
    return () => clearInterval(expressionInterval);
  }, [expressions]);

  // Continuous teasing messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setNoButtonMessage(teaseMessages[Math.floor(Math.random() * teaseMessages.length)]);
      setShowTeaseBubble(true);
      
      setTimeout(() => setShowTeaseBubble(false), 2000);
    }, 2500);
    
    return () => clearInterval(messageInterval);
  }, [teaseMessages]);

  // Continuous speaking with more childish voice
  useEffect(() => {
    const speakInterval = setInterval(() => {
      if (Math.random() < 0.8) {
        const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
        speak(randomMessage);
      }
    }, 3500);
    
    return () => clearInterval(speakInterval);
  }, [voiceMessages]);

  // Spawn floating helpers randomly
  useEffect(() => {
    const spawnHelper = () => {
      if (Math.random() < 0.5) { // 50% chance every 4 seconds
        const id = Date.now() + Math.random();
        const char = helperCharacters[Math.floor(Math.random() * helperCharacters.length)];
        const message = helperTeases[Math.floor(Math.random() * helperTeases.length)];
        
        // Random starting position around edges
        const side = Math.floor(Math.random() * 4);
        let x, y;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        switch(side) {
          case 0: // top
            x = Math.random() * (viewportWidth - 200) + 100;
            y = -100;
            break;
          case 1: // right
            x = viewportWidth + 50;
            y = Math.random() * (viewportHeight - 200) + 100;
            break;
          case 2: // bottom
            x = Math.random() * (viewportWidth - 200) + 100;
            y = viewportHeight + 50;
            break;
          case 3: // left
            x = -100;
            y = Math.random() * (viewportHeight - 200) + 100;
            break;
          default:
            x = Math.random() * viewportWidth;
            y = -100;
        }

        setHelpers(prev => [...prev, { 
          id, 
          char, 
          x, 
          y, 
          message,
          startX: x,
          startY: y,
          targetX: Math.random() * (viewportWidth - 200) + 100,
          targetY: Math.random() * (viewportHeight - 300) + 150,
          floatOffset: Math.random() * 100
        }]);

        // Remove after 8-12 seconds
        setTimeout(() => {
          setHelpers(prev => prev.filter(h => h.id !== id));
        }, 8000 + Math.random() * 4000);
      }
    };

    const interval = setInterval(spawnHelper, 4000);
    return () => clearInterval(interval);
  }, [helperCharacters, helperTeases]);

  // Animate helpers to float around
  useEffect(() => {
    const animateHelpers = setInterval(() => {
      setHelpers(prev => prev.map(helper => ({
        ...helper,
        x: helper.x + (helper.targetX - helper.x) * 0.02,
        y: helper.y + (helper.targetY - helper.y) * 0.02,
        targetX: helper.targetX + Math.sin(Date.now() * 0.001 + helper.floatOffset) * 30,
        targetY: helper.targetY + Math.cos(Date.now() * 0.001 + helper.floatOffset) * 30
      })));
    }, 50);

    return () => clearInterval(animateHelpers);
  }, []);

  // Continuous bouncing movement
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 300);
    }, 1200);
    
    return () => clearInterval(bounceInterval);
  }, []);

  // Continuous movement around the screen
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (containerRef.current && noButtonRef.current) {
        const container = containerRef.current;
        const button = noButtonRef.current;
        
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        const maxX = containerRect.width - buttonRect.width - 40;
        const maxY = containerRect.height - buttonRect.height - 40;
        
        setNoButtonPosition(prev => {
          let newX = prev.x + (Math.random() - 0.5) * 120;
          let newY = prev.y + (Math.random() - 0.5) * 120;
          
          newX = Math.max(30, Math.min(newX, maxX));
          newY = Math.max(30, Math.min(newY, maxY));
          
          return { x: newX, y: newY };
        });
      }
    }, 1800);
    
    return () => clearInterval(moveInterval);
  }, []);

  // Speak function - SUPER CHILDISH VOICE 🎵
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    
    try {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85 + Math.random() * 0.15;     // Slower, more childish
      utterance.pitch = 1.9 + Math.random() * 0.3;      // Very high pitch
      utterance.volume = 0.9;
      
      // Try to get a child-like voice
      const voices = speechSynthesis.getVoices();
      let voice = voices.find(v => 
        v.name.toLowerCase().includes('child') || 
        v.name.toLowerCase().includes('girl') ||
        v.name.toLowerCase().includes('female') ||
        v.name.includes('Samantha') || 
        v.name.includes('Google UK')
      );
      
      if (!voice) {
        voice = voices.find(v => v.lang.includes('en'));
      }
      
      if (voice) utterance.voice = voice;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.log("Speech error:", error);
    }
  }, [speechSynthesis]);

  // Long teasing phrases occasionally
  useEffect(() => {
    const longTeaseInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const longTeases = [
          "You caaan't catch meee~",
          "No button is too fast for youuu!",
          "Hehehe, try again sweety pie!",
          "Impossible! No wayyy!",
          "Never gonna catch me, never gonna get me~",
          "Sweety sweety, too slowww!"
        ];
        speak(longTeases[Math.floor(Math.random() * longTeases.length)]);
      }
    }, 9000);
    
    return () => clearInterval(longTeaseInterval);
  }, [speak]);

  // Move button function
  const moveNoButton = useCallback((mouseX, mouseY) => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current;
    const button = noButtonRef.current;
    
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;
    
    let newX = noButtonPosition.x;
    let newY = noButtonPosition.y;
    
    if (mouseX && mouseY) {
      const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2;
      
      const deltaX = buttonCenterX - (mouseX - containerRect.left);
      const deltaY = buttonCenterY - (mouseY - containerRect.top);
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 250) {
        const angle = Math.atan2(deltaY, deltaX);
        const jumpDistance = Math.min(100, distance * 1.1);
        newX = buttonCenterX + Math.cos(angle) * jumpDistance;
        newY = buttonCenterY + Math.sin(angle) * jumpDistance;
      }
    }
    
    newX += (Math.random() - 0.5) * 50;
    newY += (Math.random() - 0.5) * 50;
    
    newX = Math.max(30, Math.min(newX, maxX));
    newY = Math.max(30, Math.min(newY, maxY));
    
    if (newX < 80) newX += 50;
    if (newX > maxX - 80) newX -= 50;
    if (newY < 80) newY += 50;
    if (newY > maxY - 80) newY -= 50;
    
    newX = Math.max(30, Math.min(newX, maxX));
    newY = Math.max(30, Math.min(newY, maxY));
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    
    if (Math.random() < 0.7) {
      setNoButtonMessage(teaseMessages[Math.floor(Math.random() * teaseMessages.length)]);
      setShowTeaseBubble(true);
      setTimeout(() => setShowTeaseBubble(false), 1500);
    }
    
    setAttempts(prev => prev + 1);
    setButtonScale(1.3);
    setTimeout(() => setButtonScale(1), 200);
    
  }, [noButtonPosition.x, noButtonPosition.y, expressions, teaseMessages]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (noButtonRef.current && containerRef.current) {
        const buttonRect = noButtonRef.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(e.clientX - (buttonRect.left + buttonRect.width / 2), 2) +
          Math.pow(e.clientY - (buttonRect.top + buttonRect.height / 2), 2)
        );
        
        if (distance < 200) {
          moveNoButton(e.clientX, e.clientY);
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [moveNoButton]);

  // Rescue timer
  useEffect(() => {
    const rescueTimer = setInterval(() => {
      if (!noButtonRef.current || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const btn = noButtonRef.current.getBoundingClientRect();

      const tooFarLeft = btn.left < container.left + 20;
      const tooFarRight = btn.right > container.right - 20;
      const tooFarTop = btn.top < container.top + 20;
      const tooFarBottom = btn.bottom > container.bottom - 20;

      if (tooFarLeft || tooFarRight || tooFarTop || tooFarBottom) {
        const safeX = container.width * (0.3 + Math.random() * 0.4);
        const safeY = container.height * (0.3 + Math.random() * 0.4);
        setNoButtonPosition({ x: safeX, y: safeY });
        
        speak("Oops! I'm back! 🫣");
        setNoButtonExpression('😳');
      }
    }, 1000);
    
    return () => clearInterval(rescueTimer);
  }, [speak]);

  // Handle no button click
  const handleNoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        moveNoButton(mousePosition.x, mousePosition.y);
      }, i * 60);
    }
    
    speak("Nice try! 😜");
    
    setNoButtonMessage("You can't click me! 🙈");
    setShowTeaseBubble(true);
    setTimeout(() => setShowTeaseBubble(false), 2000);
    
    setButtonScale(1.6);
    setTimeout(() => setButtonScale(1), 300);
  };

  // Handle mouse enter
  const handleNoMouseEnter = () => {
    moveNoButton(mousePosition.x, mousePosition.y);
    setButtonScale(0.8);
    setTimeout(() => setButtonScale(1), 200);
  };

  // Inline style for background image
  const containerStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  } : {};

  return (
    <div 
      className={`playful-container ${!backgroundImage ? 'gradient-bg' : ''}`} 
      ref={containerRef} 
      style={containerStyle}
    >
      {/* Semi-transparent overlay for better text readability if needed */}
      <div className="background-overlay"></div>
      
      {/* Floating hearts */}
      <div className="floating-hearts">
        <span>💕</span><span>💖</span><span>💗</span><span>💓</span><span>💘</span>
        <span>💝</span><span>💞</span><span>💟</span>
      </div>
      
      {/* Confetti */}
      <div className="confetti">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="confetti-piece" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`
          }} />
        ))}
      </div>
      
      {/* Floating cartoon helpers */}
      {helpers.map(helper => (
        <div
          key={helper.id}
          className="floating-helper visible"
          style={{
            left: `${helper.x}px`,
            top: `${helper.y}px`,
            transform: `translate(-50%, -50%) rotate(${Math.sin(Date.now() * 0.001) * 10}deg)`
          }}
        >
          {helper.char}
          <div className="helper-bubble">
            {helper.message}
            <div className="bubble-pointer"></div>
          </div>
        </div>
      ))}
      
      <h1 className="playful-title">
        Will You Be My Girlfriend? 
        <span className="title-emoji">💝</span>
      </h1>
      
      <h2 className="playful-subtitle">
        sweety? 
        <span className="subtitle-emoji">😍</span>
      </h2>
      
      <div className="attempt-counter">
        Attempts to catch No: {attempts}
        {attempts > 5 && <span className="attempt-emoji"> 🤭</span>}
        {attempts > 10 && <span className="attempt-emoji"> 😂</span>}
        {attempts > 15 && <span className="attempt-emoji"> 🎯</span>}
        {attempts > 20 && <span className="attempt-emoji"> 🏆</span>}
        {attempts > 25 && <span className="attempt-emoji"> 🌟</span>}
        {attempts > 30 && <span className="attempt-emoji"> 💫</span>}
        {attempts > 40 && <span className="attempt-emoji"> 👑</span>}
        {attempts > 50 && <span className="attempt-emoji"> 🦄</span>}
        {attempts > 75 && <span className="attempt-emoji"> 🎪</span>}
        {attempts > 100 && <span className="attempt-emoji"> 🏅</span>}
      </div>
      
      <div className="playful-button-area">
        <button 
          className={`btn btn-yes playful-yes ${isSendingEmail ? 'sending' : ''}`}
          onClick={handleYesClick}
          disabled={isSendingEmail}
        >
          {isSendingEmail ? 'Sending... 💌' : 'YES!!'}
          <span className="yes-emoji">💖</span>
        </button>
        
        {emailStatus === 'success' && (
          <div className="email-status success">
            💌 Love notification sent!
          </div>
        )}
        
        {emailStatus === 'error' && (
          <div className="email-status error">
            😢 Couldn't send love letter, but you still said YES!
          </div>
        )}
        
        <div
          ref={noButtonRef}
          className="no-button-container"
          style={{
            position: 'absolute',
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transform: `scale(${buttonScale}) rotate(${rotation}deg)`,
            transition: 'left 0.15s ease, top 0.15s ease, transform 0.1s ease',
            zIndex: 9999
          }}
        >
          <button
            className={`btn-no-playful ${isBouncing ? 'bouncing' : ''} ${isSpeaking ? 'speaking' : ''}`}
            onClick={handleNoClick}
            onMouseEnter={handleNoMouseEnter}
            onTouchStart={handleNoClick}
            disabled={isSendingEmail}
          >
            <span className="no-emoji">{noButtonExpression}</span>
            <span className="no-text">No</span>
            {isSpeaking && <span className="speaking-indicator child-voice">🔊</span>}
          </button>
          
          {showTeaseBubble && (
            <div className="tease-bubble">
              {noButtonMessage}
              <div className="bubble-pointer"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="playful-footer">
        <p className="playful-hint">
          ✨ The No button is super playful! It's always here, spinning and teasing! Try to catch it! ✨
        </p>
        <div className="fun-facts">
          {attempts > 0 && (
            <span className="fact">
              {attempts === 1 && "First attempt! Keep going! 🌟"}
              {attempts === 5 && "You're getting warm! 🔥"}
              {attempts === 10 && "So persistent! 💪"}
              {attempts === 15 && "Never give up! 🎯"}
              {attempts === 20 && "You really want that No button! 😄"}
              {attempts === 25 && "Champion pursuer! 🏆"}
              {attempts === 30 && "You're amazing! ✨"}
              {attempts === 35 && "Legendary persistence! 👑"}
              {attempts === 40 && "You deserve a medal! 🥇"}
              {attempts === 45 && "Superstar! ⭐"}
              {attempts === 50 && "Absolutely incredible! 🌈"}
              {attempts > 50 && "You're the champion! 🏆"}
            </span>
          )}
        </div>
        
        {/* Made by Masrafi footer */}
        <div className="made-by">
          <span className="made-by-text">made by Masrafi</span>
          <span className="made-by-emoji">💝</span>
        </div>
      </div>
      
      <div className="floating-characters">
        <span className="character" style={{ top: '5%', left: '5%' }}>🌈</span>
        <span className="character" style={{ top: '15%', right: '10%' }}>⭐</span>
        <span className="character" style={{ bottom: '10%', left: '10%' }}>🎈</span>
        <span className="character" style={{ bottom: '20%', right: '5%' }}>🎪</span>
        <span className="character" style={{ top: '30%', left: '20%' }}>✨</span>
        <span className="character" style={{ top: '70%', right: '15%' }}>💫</span>
        <span className="character" style={{ bottom: '40%', left: '30%' }}>🦄</span>
        <span className="character" style={{ top: '80%', left: '80%' }}>🌟</span>
      </div>
    </div>
  );
};

export default PlayfulQuestionPage;