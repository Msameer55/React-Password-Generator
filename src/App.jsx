import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [onlyNumAllowed, setOnlyNumAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (onlyNumAllowed) {
      str = '1234567890';
    } else {
      if (numAllowed) str += '1234567890';
      if (charAllowed) str += '`~{}[]/?.>|%$#!@*()';
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, onlyNumAllowed]);

  const copyTextToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 p-4">
      <div className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Password Generator</h1>

        <div className="p-2 mb-4 flex items-center">
          <input
            className="outline-0 break-all text-lg text-center w-[80%]"
            ref={passwordRef}
            readOnly
            value={password}
          />
          <button
            className="w-[20%] bg-purple-500 hover:bg-purple-600 p-2 cursor-pointer"
            onClick={copyTextToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-300">Length:</label>
            <span className="text-white font-semibold">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="space-y-4 text-sm">
          <div
            className="flex justify-between items-center bg-slate-800 p-3 rounded-lg cursor-pointer"
            onClick={() => {
              const newVal = !onlyNumAllowed;
              setOnlyNumAllowed(newVal);
              if (newVal) {
                setNumAllowed(false);
                setCharAllowed(false);
              }
            }}
          >
            <span>Only Numbers</span>
            <input
              type="checkbox"
              checked={onlyNumAllowed}
              className="w-5 h-5 accent-purple-500"
              readOnly
            />
          </div>

          <div
            className="flex justify-between items-center bg-slate-800 p-3 rounded-lg cursor-pointer"
            onClick={() => {
              const newVal = !numAllowed;
              setNumAllowed(newVal);
              if (newVal) setOnlyNumAllowed(false);
            }}
          >
            <span>Include Numbers</span>
            <input
              type="checkbox"
              checked={numAllowed}
              className="w-5 h-5 accent-purple-500"
              readOnly
            />
          </div>

          <div
            className="flex justify-between items-center bg-slate-800 p-3 rounded-lg cursor-pointer"
            onClick={() => {
              const newVal = !charAllowed;
              setCharAllowed(newVal);
              if (newVal) setOnlyNumAllowed(false);
            }}
          >
            <span>Include Symbols</span>
            <input
              type="checkbox"
              checked={charAllowed}
              className="w-5 h-5 accent-purple-500"
              readOnly
            />
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition cursor-pointer"
        >
          GENERATE PASSWORD
        </button>
      </div>
    </div>
  );
};

export default App;
