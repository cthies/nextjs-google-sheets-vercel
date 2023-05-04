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

    const percentage = Math.round(100/savingLastYear * (saveLastEntry - savingLastYear)).toFixed(2);

    return (
        <div>
            <div className="compare">
                Difference to previous year
                <span className="saving">{saveLastEntry - savingLastYear}</span>
                {percentage}%
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

export default Table