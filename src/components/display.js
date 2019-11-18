import React from 'react';

const downloadFile = (highest_click) => {
    var highest_json = JSON.stringify(highest_click)
    const blob = new Blob([highest_json], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.download = 'resultset.json';
    link.href = url;
    link.click()
}

const Display = props => {

  return (

      <div className='container'>
      <div className='card row p-2'>
          <h5>Timeframe
              <p className="text-secondary">
                    ({`${[props.period.min]} - ${props.period.max}`})
              </p>
          </h5>

      </div>

        <div className='row'>
         <div className='card col m-2 p-2'>
            <h5>Clicks within Period</h5>
            <i className="font-weight-lighter text-secondary"> (Sorted earliest to latest)</i>

            <table className='table'>
                    <thead>
                        <tr className="p-2 text-center">
                            <th className="m-1 text-center"> Amount </th>
                            <th className="m-1 text-center"> IP </th>
                            <th className="m-1 text-center"> Timestamp </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    (props.period_clicks && props.period_clicks.length > 0) ? (props.period_clicks.map((click, id) => {
                            return (
                                <tr key={id} className="p-2 text-center">
                                    <td className="m-1 text-center"><span className="badge badge-warning rounded-circle">{click.amount} </span></td>
                                    <td className="m-1 text-center"><span className="badge badge-primary">{click.ip} </span></td>
                                    <td className="m-1 text-center"><span className="badge badge-light">{click.timestamp} </span></td>
                                </tr>
                            )
                        })
                    ) : (<tr></tr>)
                 }
                 </tbody>
            </table>
            </div>

            <div className='card col m-2'>
                <h5>Result</h5>
                <i className="font-weight-lighter text-secondary">(Expensive Clicks)</i>
                {
                    (props.highest_click && props.highest_click.length > 0) ? (props.highest_click.map((click, id) => {
                        return (
                            <div key={id} className="p-2 m-2">
                                <div>
                                    <div className="badge badge-success m-1 w-25"> {click.ip} </div>
                                    <div className="badge badge-light m-1 w-25"> {click.timestamp} </div>
                                </div>

                            </div>
                        )
                    })
                ) :  (<i className="text-danger m-2"> No Valid Result </i>)

                }
                {
                    (props.highest_click  && props.highest_click.length > 0) ? (
                        <div style={{cursor: 'pointer'}} onClick={() => downloadFile(props.highest_click)} className="btn btn-outline-primary">Download resultset.json</div>
                    ) : null
                }
            </div>
        </div>
    </div>
  );
}

export default Display
