import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onValidate }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setUserInput('');
    setIsValid(false);
    onValidate(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    const valid = input === captchaText;
    setIsValid(valid);
    onValidate(valid);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div 
          className="bg-gray-400/10 p-3 rounded-lg select-none"
          style={{
            fontFamily: 'monospace',
            letterSpacing: '0.25em',
            textDecoration: 'line-through',
            background: 'linear-gradient(45deg, #08233E, #101F36)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Random lines for added complexity */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gray-400/20"
              style={{
                height: '2px',
                width: '100%',
                top: `${Math.random() * 100}%`,
                left: 0,
                transform: `rotate(${Math.random() * 20}deg)`
              }}
            />
          ))}
          <span className="relative z-10 text-gray-200 font-bold">
            {captchaText}
          </span>
        </div>
        <motion.button
          type="button"
          onClick={generateCaptcha}
          className="text-blue-400 hover:text-blue-300 p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter the captcha text"
        className="w-full px-4 py-3 bg-gray-400/10 rounded-lg border-b-[1px] text-sm focus:outline-none focus:ring-0 transition-all duration-200 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
  );
};

export default Captcha;