import React from 'react';

const Periods = props => {
  return (
    <div className="row text-dark m-2 p-2"> <span className="m-2">Periods</span>
          {
            Object.keys(props.periods).map((period, id) => {
                return (
                    <span key={id}>
                        <button onClick={() => props.updatePeriod(period)} style={{cursor:'pointer'}} className={(period === props.period.period) ? 'btn btn-dark btn-sm m-1' : 'btn btn-outline-dark btn-sm m-1'}> {id+1} </button> <br/>
                    </span>
                )
            })
          }

    </div>
  );
}

export default Periods
