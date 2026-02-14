import React, { useEffect, useState } from 'react';
import './TermsPage.css';

const TermsPage = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTerms(true);
    }, 500);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, []);

  const terms = [
    {
      number: "1️⃣",
      title: "Beautiful Smile Promise",
      content: "You promise to keep that beautiful smile alive — and I promise to always try being one of the reasons behind it."
    },
    {
      number: "2️⃣",
      title: "Unlimited Hugs & Kisses",
      content: "Exchange allowed anytime, anywhere "
    },
    {
      number: "3️⃣",
      title: "Clear Communication Rule",
      content: "We try to speak honestly instead of staying silent or misunderstanding each other."
    },
    {
      number: "4️⃣",
      title: "Self-Care Clause",
      content: "You will eat on time and not stay hungry — because someone here genuinely worries about you."
    },
    {
      number: "5️⃣",
      title: "Kiss Request Policy",
      content: "Whenever a kiss is requested politely, approval is highly encouraged😉"
    },
    {
      number: "6️⃣",
      title: "Anger Recovery Agreement",
      content: "Even when you're angry, you'll allow  chance to make things right ."
    },
    {
      number: "7️⃣",
      title: "Eye Care Agreement",
      content: "Please take care of those beautiful eyes — I like seeing them happy and shining."
    }
  ];

  if (!showTerms) {
    return (
      <div className="loading-container">
        <div className="loading-heart">💝</div>
        <h2 className="loading-text">Processing your agreement...</h2>
        <div className="countdown">{countdown}</div>
      </div>
    );
  }

  return (
    <div className="terms-container">
      <div className="floating-hearts">
        <span>💕</span><span>💖</span><span>💗</span><span>💓</span><span>💘</span>
      </div>
      
      <div className="terms-card">
        <div className="terms-header">
          <h1 className="terms-title">🌸 Terms & Conditions</h1>
          <div className="already-agreed">
            <span className="agreed-badge">✓ Already Agreed</span>
            <p className="agreed-message">
              You've already accepted these terms by clicking YES! 
            
            </p>
          </div>
        </div>

        <div className="terms-list">
          {terms.map((term, index) => (
            <div 
              key={index} 
              className="term-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="term-number">{term.number}</div>
              <div className="term-content">
                <h3 className="term-title">{term.title}</h3>
                <p className="term-text">{term.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="terms-footer">
          <p className="footer-text">
            By having clicked YES, you have entered into this sacred agreement 💝
          </p>
          <div className="signature-line">
            <span>RIYA AFROZ SWEETI</span>
            <span>(Your digital fingerprint of love is taken)</span>
          </div>
          <div className="footer-hearts">
            <span>💖</span><span>💖</span><span>💖</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;