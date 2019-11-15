import React from 'react';

const InvalidIps = props => {
    if (props.invalid_ips && Object.keys(props.invalid_ips).length > 0){
    return (
        <div className="m-3 p-3 text-dark text-weight-lighter">
        <h5> Invalid IPs </h5>
        <table className="table">
            <thead>
                <tr>
                    <th>IP</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
            {
                Object.keys(props.invalid_ips).map((click, id) => {
                       return (
                           <tr key={id} className="text-danger">
                               <td><b>{click}</b></td>
                               <td>{props.invalid_ips[click]}</td>
                           </tr>
                       )
                })
            }
            </tbody>
        </table>
        </div>
    )
} else {
    return <span></span>
}
}

const Clicks = props => {
  return (
    <div className="text-dark text-left bg-light p-0 m-1">

        <InvalidIps invalid_ips={props.invalid_ips} />
          {
              props.clickdata.map((click, id) => {
                  if (Object.keys(props.invalid_ips).includes(click.ip)){
                      return <span className="badge badge-danger m-1" key={id}> {click.ip} </span>

                  } else{
                      return <span className="badge text-secondary border border-secondary m-1" key={id}> {click.ip} </span>
                  }
              })
          }

    </div>
  );
}

export default Clicks
