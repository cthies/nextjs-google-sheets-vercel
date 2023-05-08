import CountUp from "react-countup";

function Comparison(props) {
    const {moreThanLastYear,saving,percentage } = props;

    return (
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
    )
}

export default Comparison;