import React, { useState } from 'react';

const InputForm = props => {
  const [jsontext, setJSONText] = useState(JSON.stringify(props.default_data));
  return (
      <div className="row m-2">
        <h5>Paste JSON data</h5>
        <div className="col-md-12 form-group p-2">
            <textarea rows="20" placeholder="E.g. [{'ip':xx.xx.xx.xx, 'amount': x.xx, 'timestamp':MM/DD/YYYY HH:MM:SS}]" onChange={(e)=> setJSONText(e.target.value)} value={jsontext} className="form-control rounded-0 md-textarea" />
            <button style={{cursor: 'pointer'}} onClick={() => props.closeForm()} className="btn btn-danger m-1">Cancel</button>
            <button style={{cursor: 'pointer'}} onClick={() => props.submitForm(jsontext)} className="btn btn-primary m-1">Submit</button>
        </div>
      </div>
  );
}

export default InputForm
