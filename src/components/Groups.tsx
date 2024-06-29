export default function Groups() {

    // classes of elements: noble, alkali, alkaline, transition, polyatomic, diatomic, post-transition, metalloid, lanthanide, actinide, unknown
    // metals: alkali, alkaline, transition, post-transition, lanthanide, actinide
    // metalloids: metalloid
    // nonmetals: noble, polyatomic, diatomic, unknown

    const allClasss = '.alkali, .alkaline, .transition, .post-transition, .lanthanide, .actinide, .metalloid, .noble, .polyatomic, .diatomic, .unknown'
    const metalsClasss = '.alkali, .alkaline, .transition, .post-transition, .lanthanide, .actinide'
    const metalloidsClasss = '.metalloid'
    const nonmetalsClasss = '.noble, .polyatomic, .diatomic'

    function emphasizeGroup(group: string) {
        const css = `
        ${allClasss} {
            opacity: 0.1;
        }
        ${group} {
            opacity: 1 !important;
        }
        `

        // create a style element (with an ID) and append it to the head
        const style = document.createElement('style')
        style.id = 'emphasize-group'
        style.textContent = css
        document.head.appendChild(style)
    }

    function resetEmphasis() {
        // remove styles we added in emphasizeGroup
        const style = document.getElementById('emphasize-group')
        if (style) {
            style.remove()
        }
    }
    
    return (
        <>
            <div className="group-btn" style={{
                gridColumn: '11/12',
            }}
            onMouseEnter={() => emphasizeGroup(metalsClasss)}
            onMouseLeave={() => resetEmphasis()}
            >
                Metals
            </div>
            <div className="group-btn" style={{
                gridColumn: '12/13',
            }}
            onMouseEnter={() => emphasizeGroup(metalloidsClasss)}
            onMouseLeave={() => resetEmphasis()}

            >
                Metalloids
            </div>
            <div className="group-btn" style={{
                gridColumn: '13/14',
            }}
            onMouseEnter={() => emphasizeGroup(nonmetalsClasss)}
            onMouseLeave={() => resetEmphasis()}
            >
                Nonmetals
            </div>
        </>
    )
}
