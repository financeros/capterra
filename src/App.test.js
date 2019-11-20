import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { hasClickPeriod, getClickPeriod, checkIps, createResultset } from './helpers';

const test_data = require('./data/test_clicks.json');

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('check if timestamp belongs to period', () => {
  expect(hasClickPeriod('3-11-2016 06:45:01', '06:00:00', '07:00:00')).toEqual(true);
  expect(hasClickPeriod('3-11-2016 05:45:01', '06:00:00', '07:00:00')).toEqual(false);
});

it('create period ranges',()=> {
    expect(getClickPeriod(1)).toEqual({'period':'1', 'min':'00:00:00', 'max': '01:00:00'});
    expect(getClickPeriod(13)).toEqual({'period':'13', 'min':'12:00:00', 'max': '13:00:00'})
    expect(getClickPeriod(19)).toEqual({'period':'19', 'min':'18:00:00', 'max': '19:00:00'})
})

it('check for invalid ips + most expensive clicks within period',()=> {
    expect(checkIps(test_data, getClickPeriod(5))).toEqual({"expensive_clicks": [], "invalid_ips": {"22.22.22.22": 12}, "period_clicks": []});
    expect(checkIps(test_data, getClickPeriod(19))).toEqual({
                                                        "expensive_clicks": [{"amount": 9, "ip": "55.55.55.55", "timestamp": "3/11/2016 18:19:20"}],
                                                        "invalid_ips": {"22.22.22.22": 12},
                                                        "period_clicks": [{"amount": 9, "ip": "55.55.55.55", "timestamp": "3/11/2016 18:19:20"}]
                                                    });
})


it('check resultset output',()=> {
    expect(createResultset(test_data)).toEqual([{"amount": 8, "ip": "55.55.55.55", "timestamp": "3/11/2016 13:02:40"},
                                                {"amount": 8, "ip": "44.44.44.44", "timestamp": "3/11/2016 13:02:55"},
                                                {"amount": 9, "ip": "55.55.55.55", "timestamp": "3/11/2016 18:19:20"}
                                                ]);
})
