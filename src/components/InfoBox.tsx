import { IPA } from "../lib/ipa.js"
import { roundTo3 } from "../App.js"

const getIPA = (symbol: string) => {
  return IPA.find((ipa: { symbol: string }) => ipa.symbol === symbol).IPA
}

function replaceWithSuperscripts(config: string): string {
  // Mapping of numbers to superscript Unicode characters
  const superscriptMap = {
    '0': '\u2070',
    '1': '\u00B9',
    '2': '\u00B2',
    '3': '\u00B3',
    '4': '\u2074',
    '5': '\u2075',
    '6': '\u2076',
    '7': '\u2077',
    '8': '\u2078',
    '9': '\u2079'
  };

  // Function to convert numbers to superscripts
  function toSuperscript(number) {
    return number.split('').map(char => superscriptMap[char]).join('');
  }

  // Regex to match electron configuration parts
  const regex = /(\d+)([sdpf])(\d+)/g;

  // Replace each part of the configuration with formatted version
  return config.replace(regex, (_match, n, l, p) => `${n}${l}${toSuperscript(p)}`);

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
    group,
    phase,
    electron_configuration_semantic,
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
          <div> {phase && <><strong>Phase</strong> {phase}</>}</div>
          <div> {period && <strong>Period</strong>} {period}</div>
          <div> {group && <strong>Group</strong>} {group}</div>
          <div> {shells && <><strong>Shells</strong> {shells.join(",")}</>}</div>
        </div>
        <div>
          <strong>Conf.</strong> {replaceWithSuperscripts(electron_configuration_semantic)}
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
