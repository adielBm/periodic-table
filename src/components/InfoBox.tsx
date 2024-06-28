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
  } = element

  return (
    <>
      <div id='element-box' className={`${category}`}>
        <div className='number'>{number}</div>
        <div className="atomic-mass">{atomic_mass}</div>
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
        <div>
          <div style={
            {
              display: 'flex',
              gap: '1vw',
              alignItems: 'center',
            }
          }>
            <h1 className='big_title'>{name}</h1>
            <span className={`${category}`} style={{
              padding: '0 1.1vw',
            }}
            
            >{category}</span>
          </div>
          {appearance && (
            <div className='appearance'>
              <strong>Appearance</strong> {appearance}
            </div>
          )}
          <div className='atom_info'>
            <div><strong>Density</strong> {density}</div>
            {molar_heat && <div><strong>Molar Heat</strong> {molar_heat}</div>}
            {melt && <div><strong>Melt</strong> {melt}K</div>}
            {boil && <div><strong>Boil</strong> {boil}K</div>}
          </div>
          {/*           <div>
            {summary} ...{" "}
            <a target='_blank' href={source}>
              Source
            </a>
          </div> */}
        </div>
      </div>
    </>
  )
}
