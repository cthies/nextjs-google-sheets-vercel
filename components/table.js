import CountUp from "react-countup";

function Table(props) {
    const sheetdata = props.sheetdata;
    let prev = 0;
    let savingLastYear = 0;
    let saveLastEntry = 0;

    const items = sheetdata.map((item, index) => {

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

        return (
            <tr key={index}>
                <td id={item[0]}>
                    {item[0]}
                </td>
                <td id={item[0] + '-val'}>
                    {item[1]}
                </td>
                <td className='diff'>
                    {diff.toString()}
                </td>
            </tr>
        )
    });

    const saving = parseInt(saveLastEntry - savingLastYear);
    const percentage = parseInt(Math.round(100 / savingLastYear * (saving)).toFixed(2));
    const moreThanLastYear = saving > 0;

    return (
        <div>
            <div className="compare">
                Difference to previous year
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
                    {moreThanLastYear  &&
                        <span>+</span>
                    }
                    <CountUp
                        start={0}
                        end={percentage}
                        duration={1}
                        useEasing={true}
                    />%
                </span>

            </div>

            <table id="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Diff to previous month</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}

export default Table;