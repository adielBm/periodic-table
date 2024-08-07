import React, { useLayoutEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import "./styles/main.scss";
import { data } from "./lib/data2";
import InfoBox from "./components/InfoBox";
import Filter from "./components/Filter";

interface ElementData {
  number: number;
  name: string;
  symbol: string;
  category: string;
  atomic_mass: number;
}

interface ElementProps {
  num: number;
  handleShowInfo: (num?: number, click?: boolean) => void;
  isActive: boolean;
}

/* function to keep only two digits after dot  
  and add parentheses if the number is an integer 
*/
export function roundTo3(num: number): string {
  num = +(Math.round(Number(num + "e+3")) + "e-3");
  return num % 1 === 0 ? `(${num})` : `${num}`;
}

const Element: React.FC<ElementProps> = ({ num, handleShowInfo, isActive }) => {
  const element = data[num] as ElementData;
  return (
    <div
      title={element.name}
      onClick={() => handleShowInfo(num, true)}
      onMouseEnter={() => handleShowInfo(num)}
      onMouseLeave={() => handleShowInfo()}
      className={`element element-${num} ${element.category} ${isActive ? 'active' : ''}`}
    >
      <div className="number">{element.number}</div>
      <div className="symbol">{element.symbol}</div>
      <div className="element-name">{element.name}</div>

      <div style={{
        fontWeight: 'bold',
      }} className="mass">{roundTo3(element.atomic_mass)}</div>
    </div>
  );
};

const PeriodicTable: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const [showInfo, setShowInfo] = useState(false);
  const [element, setElement] = useState<ElementData>(data[1] as ElementData);
  const [elNumClicked, setElNumClicked] = useState<number | null>(null);

  useLayoutEffect(() => {
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

  const handleShowInfo = (num?: number, click: boolean = false) => {
    if (num !== undefined) {
      setElement(data[num] as ElementData);
      if (click) setElNumClicked(num);
      setShowInfo(true);
    } else {
      if (elNumClicked !== null) {
        setElement(data[elNumClicked] as ElementData);
        setShowInfo(true);
      } else {
        setShowInfo(false);
      }
    }
  };

  const renderElements = (start: number, end: number) => (
    Array.from({ length: end - start + 1 }, (_, i) => (
      <Element
        key={start + i}
        num={start + i}
        handleShowInfo={handleShowInfo}
        isActive={start + i === elNumClicked}
      />
    ))
  );

  const renderGroupNumbers = () => (
    Array.from({ length: 18 }, (_, i) => (
      <div key={i} className={`group-num group-num-${i + 1}`}>{i + 1}</div>
    ))
  );

  const renderSpecialRow = (text: string, className: string) => (
    <div className={`element ${className}`} style={{
      width: '1vmax',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      writingMode: 'vertical-rl',
    }}>
      {text}
    </div>
  );

  return (
    <div id="table" className={theme}>
      <h1 id="site-title">Periodic Table</h1>

      {renderGroupNumbers()}

      {renderElements(1, 4)}
      {showInfo && <InfoBox element={element} />}
      <Filter />

      {renderElements(5, 20)}
      <div></div>
      {renderElements(21, 38)}
      <div></div>
      {renderElements(39, 56)}

      {renderSpecialRow('57-70', 'lanthanide')}
      {renderElements(71, 88)}
      {renderSpecialRow('89-102', 'actinide')}
      {renderElements(103, 118)}
      {renderElements(57, 70)}
      {renderElements(89, 102)}

      <div className="gh-dm">
        <div className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </div>
        <a href="https://github.com/adielBm/periodic-table" target="_blank" rel="noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PeriodicTable;