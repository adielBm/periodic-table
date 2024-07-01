export default function Filter() {

    // classes of elements: noble, alkali, alkaline, transition, polyatomic, diatomic, post-transition, metalloid, lanthanide, actinide, unknown
    // metals: alkali, alkaline, transition, post-transition, lanthanide, actinide
    // metalloids: metalloid
    // nonmetals: noble, polyatomic, diatomic, unknown

    const allClasss = '.alkali, .alkaline, .transition, .post-transition, .lanthanide, .actinide, .metalloid, .noble, .polyatomic, .diatomic, .unknown'
    const metalsClasss = '.alkali, .alkaline, .transition, .post-transition, .lanthanide, .actinide'
    // const metalloidsClasss = '.metalloid'
    const nonmetalsClasss = '.noble, .polyatomic, .diatomic'


    // By Blocks: s, p, d, f
    const sClasss = '.alkali, .alkaline, .element-1, .element-2';
    const dClasss = '.transition';
    const fClasss = '.lanthanide, .actinide';
    const pClasss = '.noble:not(.element-2), .polyatomic, .diatomic:not(.element-1), .metalloid, .unknown, .post-transition';

    function emphasize(group: string) {
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
        // remove styles we added in emphasize
        const style = document.getElementById('emphasize-group')
        if (style) {
            style.remove()
        }
    }

    return (
        <div
            style={{
                gridColumn: '11/14',
                gridRow: '3/5',
                display: 'grid',
                gridTemplateRows: '1fr 1fr',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                }}
            >
                <div className="group-btn"
                    onMouseEnter={() => emphasize(metalsClasss)}
                    onMouseLeave={() => resetEmphasis()}
                >
                    Metals
                </div>
                <div className="group-btn"
                    onMouseEnter={() => emphasize(nonmetalsClasss)}
                    onMouseLeave={() => resetEmphasis()}
                >
                    Nonmetals
                </div>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                }}
            >
                <div className="group-btn"
                    onMouseEnter={() => emphasize(sClasss)}
                    onMouseLeave={() => resetEmphasis()}
                >
                    s
                </div>
                <div className="group-btn"
                    onMouseEnter={() => emphasize(pClasss)}
                    onMouseLeave={() => resetEmphasis()}
                >
                    p
                </div>
                <div className="group-btn"
                    onMouseEnter={() => emphasize(dClasss)}
                    onMouseLeave={() => resetEmphasis()}
                >
                    d
                </div>
                <div className="group-btn"
                    onMouseEnter={() => emphasize(fClasss)}
                    onMouseLeave={() => resetEmphasis()}
                >
                    f
                </div>
            </div>


        </div>
    )
}
