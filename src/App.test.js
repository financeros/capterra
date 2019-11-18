import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { hasClickPeriod, getPeriodRange, checkClicks } from './helpers';

const data = require('./data/clicks.json');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('check if timestamp belongs to period', () => {
  expect(hasClickPeriod('3-11-2016 06:45:01', '06:00:00', '07:00:00')).toEqual(true);
  expect(hasClickPeriod('3-11-2016 05:45:01', '06:00:00', '07:00:00')).toEqual(false);
});

it('create period ranges',()=> {
    expect(getPeriodRange(1)).toEqual({'period':'1', 'min':'00:00:00', 'max': '01:00:00'});
    expect(getPeriodRange(13)).toEqual({'period':'13', 'min':'12:00:00', 'max': '13:00:00'})
    expect(getPeriodRange(19)).toEqual({'period':'19', 'min':'18:00:00', 'max': '19:00:00'})
})

it('check for invalid ips + highest clicks within period',()=> {
    expect(checkClicks(data, getPeriodRange(5))).toEqual({"expensive_clicks": [], "invalid_ips": {"22.22.22.22": 12}, "period_clicks": []});
    expect(checkClicks(data, getPeriodRange(19))).toEqual({
                                                        "expensive_clicks": [{"amount": 9, "ip": "55.55.55.55", "timestamp": "3/11/2016 18:19:20"}],
                                                        "invalid_ips": {"22.22.22.22": 12},
                                                        "period_clicks": [{"amount": 9, "ip": "55.55.55.55", "timestamp": "3/11/2016 18:19:20"}]
                                                    });
})
