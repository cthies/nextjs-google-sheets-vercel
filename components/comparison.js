import CountUp from "react-countup";

function Comparison(props) {
    const { sheetdata, content } = props;
    let prev = 0;
    let savingLastYear = 0;
    let saveLastEntry = 0;

    sheetdata.map((item, index) => {

        let diff = Number(item[1]) - prev;
        prev = Number(item[1]);

        /* CALCULATE PREVIOUS YEAR */

        //get 12 month back
        if (sheetdata.length - 13 === index) {
            savingLastYear = diff;
        }

        //get last entry
        if (sheetdata.length - 1 === index) {
            saveLastEntry = diff;
        }
    });

    const saving = parseInt(saveLastEntry - savingLastYear);
    const percentage = Number(parseInt(100 / savingLastYear * saving).toFixed(2));
    const moreThanLastYear = saving > 0;

    return (
        <div className="compare">
            {content.comparison}
            <span className="saving">
                {moreThanLastYear &&
                    <span>+</span>
                }
                <CountUp
                    start={0}
                    end={saving}
                    duration={1}
                    useEasing={true}
                />
            </span>
            <span>
                {moreThanLastYear &&
                    <span>+</span>
                }
                <CountUp
                    decimal='.'
                    decimals={2}
                    start={0}
                    end={percentage}
                    duration={1}
                    useEasing={true}
                />%
            </span>
        </div>
    )
}

export default Comparison;