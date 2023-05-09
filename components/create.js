import { useState } from "react";

function Create(props) {
    const content = props.content;
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);

    /* Define your adminPassword in your .env */
    const handleAdmin = async (event) => {
        event.preventDefault();

        if (password === process.env.NEXT_PUBLIC_ADMIN) {
            setError('');
            setAdmin(true);
        } else {
            setError('You shall not pass! ');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (date && number) {
            try {
                let response = await fetch(process.env.NEXT_PUBLIC_BASE + "/api/create", {
                    method: "POST",
                    body: JSON.stringify({
                        date,
                        number
                    }),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                });
                response = await response.json();
                //TODO: always space for improvement: Load new data
                location.reload();

            } catch (errorMessage) {
                setError(errorMessage);
            }
        } else {
            return setError("All fields are required and the link must be a valid url!");
        }
    };

    return (
        <div className="createForm">
            <h2>{content.createNew}</h2>
            {error &&
                <p>{error}</p>
            }
            <form onSubmit={handleAdmin} className={admin ? 'hide' : ''}>
                <label htmlFor="adminpassword">{content.admin}</label>
                <input type="password" id="adminpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn">
                    Login
                </button>
            </form>

            <form onSubmit={handleSubmit} className={admin ? '' : 'hide'}>
                <div>
                    <label htmlFor="date">{content.tableDate}</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="value">{content.tableReading}</label>
                    <input type="num" id="value" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <button type="submit" className="btn">
                    {content.save}
                </button>
            </form>
        </div>
    )
}

export default Create