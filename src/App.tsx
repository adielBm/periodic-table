import { useState } from "react"
import Element from "./Element"
import "./styles/main.scss"
import { data } from "./lib/data"
import InfoBox from "./components/InfoBox"
import Filter from "./components/Filter"

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
        {/* groups 1-18 */}

        {Array.from(Array(18).keys()).map((i) => (
          <div key={i} className={`group-num group-num-${i + 1}`}>{i + 1}</div>
        ))}
        {/* Elements 1-4 */}
        {populateElements(1, 4)}
        {/* Information Table */}
        {showInfo && (
          <InfoBox element={element} /* handlecloseInfo={handlecloseInfo} */ />
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
          style={{
            gridColumn: '-3 / -1',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <a style={{
            textDecoration: 'underline',
            opacity: '0.5',
            textAlign: 'center',
          }}
            href="https://github.com/adielBm/periodic-table" target="_blank" rel="noreferrer">Source Code</a>
        </div>

      </div>

    </>
  )
}
