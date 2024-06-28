import { useState } from "react"
import Element from "./Element"
import "./styles/main.css"
import { data } from "./lib/data"
import InfoBox from "./components/InfoBox"

export default function App() {
  const [showInfo, setShowInfo] = useState(false)
  const [element, setElement] = useState(data[1])

  const handleshowInfo = (num: number) => {
    setShowInfo(true)
    setElement(data[num])
  }

/*   const handlecloseInfo = () => {
    setShowInfo(false)
  } */

  const populateElements = (start: number, end: number) => {
    const items = []
    for (let i = start; i <= end; i++) {
      items.push(<Element showInfo={handleshowInfo} num={i} key={i} />)
    }
    return items
  }

  return (
    <>
      <div id='table'>
        <h1 id="site-title">Periodic Table</h1>
        {/* Elements 1-4 */}
        {populateElements(1, 4)}
        {/* Information Table */}
        {showInfo && (
          <InfoBox element={element} /* handlecloseInfo={handlecloseInfo} */ />
        )}
        {/* Populating elements from 5-57 */}
        {populateElements(5, 57)}
        {/* Lanthanoids split 72-89 */}
        {populateElements(72, 89)}
        {/* Actinoids split 104-119*/}
        {populateElements(104, 118)}
        {/* Lanthenoids 58-71*/}
        {populateElements(58, 71)}
        {/* Actionoids 90-103 */}
        {populateElements(90, 103)}
      </div>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '1vw',
          transform: 'translate(-50%, -50%)',
          margin: '0 auto'
        }}
      >
        <a style={{
          textDecoration: 'underline',
          opacity: '0.5',
          textAlign: 'center',
        }}
          href="https://github.com/adielBm/" target="_blank" rel="noreferrer">Source Code</a>
      </div>
    </>
  )
}
