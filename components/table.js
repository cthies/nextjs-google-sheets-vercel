function Table(props) {
    const { sheetdata, content } = props;
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
                    {item[1]}
                </td>
                <td className='diff'>
                    {diff}
                </td>
            </tr>
        )
    });

    return (
        <div>


            <table id="table">
                <thead>
                    <tr>
                        <th>{content.tableDate}</th>
                        <th>{content.tableReading}</th>
                        <th className='diff'>{content.tableDiff}</th>
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