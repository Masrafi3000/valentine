import React, { useState } from 'react';
import PlayfulQuestionPage from './components/PlayfulQuestionPage';
import TermsPage from './components/TermsPage';
import './App.css';

// Import your background image
import backgroundImg from './assets/Gemini_Generated_Image_fehqmkfehqmkfehq (1).png';

function App() {
  const [showTerms, setShowTerms] = useState(false);

  const handleYesClick = () => {
    setShowTerms(true);
  };

  return (
    <div className="App">
      {!showTerms ? (
        <PlayfulQuestionPage 
          onYesClick={handleYesClick} 
          backgroundImage={backgroundImg}
        />
      ) : (
        <TermsPage />
      )}
    </div>
  );
}

export default App;