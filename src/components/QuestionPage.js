import React, { useState, useEffect, useRef } from 'react';
import './QuestionPage.css';

const QuestionPage = ({ onYesClick }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '0px', left: '0px' });
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);

  const teaseMessages = [
    "Nice try! 😋",
    "Almost! 😄",
    "Not today! 💫",
    "Keep trying! 🌟",
    "So close! ✨",
    "Can't catch me! 🎯",
    "Nope! 😜",
    "Try harder! 💪",
    "Missed me! 🏃‍♂️",
    "Too slow! ⚡"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current && noButtonRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const noButtonRect = noButtonRef.current.getBoundingClientRect();
        
        // Calculate distance between mouse and No button
        const buttonCenterX = noButtonRect.left + noButtonRect.width / 2;
        const buttonCenterY = noButtonRect.top + noButtonRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + 
          Math.pow(e.clientY - buttonCenterY, 2)
        );

        // If mouse gets too close, move the button
        if (distance < 150) {
          moveNoButton();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moveNoButton = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxX = containerRect.width - 150; // Button width approx
      const maxY = containerRect.height - 100; // Button height approx
      
      // Calculate new position within container bounds
      let newX = Math.random() * maxX;
      let newY = Math.random() * maxY;
      
      // Keep button away from edges
      newX = Math.max(20, Math.min(newX, maxX - 20));
      newY = Math.max(20, Math.min(newY, maxY - 20));
      
      setNoButtonPosition({ left: `${newX}px`, top: `${newY}px` });
      setNoButtonClicks(prev => prev + 1);
    }
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    moveNoButton();
  };

  return (
    <div className="question-container" ref={containerRef}>
      <div className="heart-float">💝</div>
      <div className="heart-float" style={{ animationDelay: '0.5s', left: '20%' }}>💖</div>
      <div className="heart-float" style={{ animationDelay: '1s', left: '80%' }}>💗</div>
      
      <h1 className="question-title">Do You Love Me?</h1>
      <h2 className="question-subtitle">sweety? 💕</h2>
      
      {noButtonClicks > 0 && (
        <div className="tease-message">
          {teaseMessages[noButtonClicks % teaseMessages.length]}
        </div>
      )}
      
      <div className="button-wrapper">
        <button 
          className="btn btn-yes"
          onClick={onYesClick}
        >
          YES! 💝
        </button>
        
        <button
          ref={noButtonRef}
          className="btn btn-no"
          style={{
            position: 'absolute',
            top: noButtonPosition.top,
            left: noButtonPosition.left,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
        >
          No {noButtonClicks > 0 && '😜'}
        </button>
      </div>
      
      <div className="hint">
        <p>✨ The "No" button is feeling playful today! ✨</p>
      </div>
    </div>
  );
};

export default QuestionPage;