import CountUp from "react-countup";

function Table(props) {
    const sheetdata = props.sheetdata;
    let prev = 0;

    const items = sheetdata.map((item, index) => {

        let diff = Number(item[1]) - prev;
        prev = Number(item[1]);

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

    return (
        <div>


            <table id="table">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Zählerstand</th>
                        <th className='diff'>Vergleich zum Vormonat</th>
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