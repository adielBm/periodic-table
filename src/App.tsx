import { useLayoutEffect, useState } from "react"
import Element from "./Element"
import "./styles/main.scss"
import { data } from "./lib/data"
import InfoBox from "./components/InfoBox"
import Filter from "./components/Filter"
import { Moon, Sun } from "lucide-react"

export default function App() {

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useLayoutEffect(() => {
    // Update color-scheme immediately on mount
    document.documentElement.style.colorScheme = theme;

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const [showInfo, setShowInfo] = useState(false)
  const [element, setElement] = useState(data[1])

  const handleshowInfo = (num: number) => {
    setShowInfo(true)
    setElement(data[num])
  }

  const populateElements = (start: number, end: number) => {
    const items = []
    for (let i = start; i <= end; i++) {
      items.push(<Element showInfo={handleshowInfo} num={i} key={i} />)
    }
    return items
  }

  return (
    <div id='table' className={`${theme}`}>

      <h1 id="site-title">Periodic Table</h1>

      {/* groups 1-18 */}
      {Array.from(Array(18).keys()).map((i) => (
        <div key={i} className={`group-num group-num-${i + 1}`}>{i + 1}</div>
      ))}

      {/* Elements 1-4 */}
      {populateElements(1, 4)}

      {/* Information Table */}
      {showInfo && (
        <InfoBox element={element} />
      )}

      <Filter />

      {/* Populating elements from 5-57 */}
      {populateElements(5, 20)}
      <div></div>
      {populateElements(21, 38)}
      <div></div>
      {populateElements(39, 56)}
      <div
        style={{
          width: '1vmax',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          writingMode: 'vertical-rl',
        }}
        className={`element lanthanide`}
      >
        57-70
      </div>
      {/* Lanthanoids split 72-89 */}
      {populateElements(71, 88)}

      <div
        style={{
          width: '1vmax',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          writingMode: 'vertical-rl',
        }}
        className={`element actinide`}
      >
        89-102
      </div>
      {/* Actinoids split 104-119*/}
      {populateElements(103, 118)}
      {/* Lanthenoids 58-71*/}
      {populateElements(57, 70)}
      {/* Actionoids 90-103 */}
      {populateElements(89, 102)}

      <div
        className="gh-dm"
      >
        <div
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </div>
        <a
          href="https://github.com/adielBm/periodic-table" target="_blank" rel="noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        </a>
      </div>

    </div>
  )
}