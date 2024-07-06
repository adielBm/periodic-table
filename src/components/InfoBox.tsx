import { IPA } from "../lib/ipa.js"
import { roundTo3 } from "../App.js"

const getIPA = (symbol: string) => {
  return IPA.find((ipa: { symbol: string }) => ipa.symbol === symbol).IPA
}

export default function InfoBox({ element/* , handlecloseInfo */ }) {
  const {
    name,
    // summary,
    symbol,
    category,
    number,
    // source,
    appearance,
    atomic_mass,
    molar_heat,
    density,
    melt,
    boil,
    shells,
    period,
  } = element

  return (
    <>
      <div id='element-box' className={`${category}`}>
        <div className='number'>{number}</div>
        <div className="atomic-mass">{roundTo3(atomic_mass)}</div>
        <div className='symbol'>{symbol}</div>
      </div>
      <div id='information'>
        {/* <div
          onClick={handlecloseInfo}
          className='close-button'
          title='Close Info'
        >
          Close [&times;]
        </div> */}
        <div style={
          {
            display: 'flex',
            gap: '1vw',
            alignItems: 'center',
            height: '5vmin',
          }
        }>
          <h1 className='big_title'>{name}</h1>
          <span className={`${category}`} style={{
            padding: '.4vw 1vw',
            textTransform: 'capitalize',
            fontWeight: 'bold'
          }}

          >{category}</span>
        </div>
        <div className='ipa'>/{getIPA(symbol)}/</div>
       
        <div className='atom_info'>
          <div> {density && <><strong>Density</strong> {density}<small> g/cm³</small></>}</div>
          <div> {molar_heat && <><strong>Molar Heat</strong> {molar_heat}</>}</div>
          <div> {melt && <><strong>Melt</strong> {melt}K</>}</div>
          <div> {boil && <><strong>Boil</strong> {boil}K</>}</div>
          <div> {period && <strong>Period</strong>} {period}</div>
          <div> {shells && <><strong>Shells</strong> {shells.join(",")}</>}</div>
        </div>
        {appearance && (
          <div className='appearance'>
            <strong>Appearance</strong> {appearance}
          </div>
        )}
        {/*           <div>
            {summary} ...{" "}
            <a target='_blank' href={source}>
              Source
            </a>
          </div> */}
      </div>
    </>
  )
}
