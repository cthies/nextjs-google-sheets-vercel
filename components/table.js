import CountUp from "react-countup";
import Comparison from './comparison'

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
                    <CountUp
                        start={0}
                        end={Number(item[1])}
                        duration={1}
                        useEasing={true}
                    />
                </td>
                <td className='diff'>
                    <CountUp
                        start={0}
                        end={diff}
                        duration={2}
                        useEasing={true}
                    />
                </td>
            </tr>
        )
    });

    const saving = parseInt(saveLastEntry - savingLastYear);
    const percentage = parseInt(Math.round(100 / savingLastYear * (saving)).toFixed(2));
    const moreThanLastYear = saving > 0;

    return (
        <div>
            <Comparison moreThanLastYear={moreThanLastYear} saving={saving} percentage={percentage} />

            <table id="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Dial recording </th>
                        <th className='diff'>Diff to previous month</th>
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