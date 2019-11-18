# Hassan Badru
### Capterra - Expensive Click App
This app allows user to view or download valid most Expensive clicks

## Libraries
- [x] ReactJS - Lightweight & agnostic UI library with a component architecture
- [x] JSON_Loader - for reading JSON string
- [x] Moment - for better dates
- [x] Bootstrap - for basic styling
- [x] Font Awesome - for basic icons
- [x] Jest - for basic testing

## Install Dependencies
Would install package.json modules
```bash
npm install
```

## Run Web App
The Web app would run on [localhost:3000](http://localhost:3000/)

```bash
npm run solution
```

Run a production build
```bash
 npm run build
 npm install -g serve
 serve -s build
 ```

## Test App
To run test suites:
```bash
npm run test
```
Sample test:
```bash
 PASS  src/App.test.js
  ✓ renders without crashing (97ms)
  ✓ check if timestamp belongs to period (29ms)
  ✓ create period ranges (1ms)
  ✓ check for invalid ips + highest clicks within period (23ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.075s
Ran all test suites related to changed files.
```


## Design
- Extracts JSON data from file (clicks.json)
- Creates **24** 1-hour periods
- Filters Clicks data into 1-hour periods
- Sorts Clicks by timestamp (earliest to latest)
- Creates an IP Count Lookup table
- Checks if most expensive click has an IP that appears more than 10 times
- Searches for expensive clicks (i.e. higher click amounts with a different IP) while traversing from earliest to latest click
- Allows download of valid Most Expensive Click (resultset.json)
- Allows and validates user inputted JSON data
- Allows reset of app data to JSON file (clicks.json)

## Main Components
Used React Class & Function Components + React Hooks
### App
- Class component that initialize / manage entire app states

### Display
- Shows all clicks within that period (sorted by timestamp)
- Shows the most expensive click (result set)
- Shows 'No Valid Result' if no click exists or if click IP appears more than 10 times
- Download button for resultset.json

### Periods
- Shows an navigation tab to any 24 hour period
- (if user JSON) Refresh to default data

![alt text](https://docs.google.com/uc?id=1cIe5aq5s08eLS_A5pXAKX6h5nwzaDMhJ "screenshot1")

### Clicks
- Shows all valid, invalid clicks and their count
![alt text](https://docs.google.com/uc?id=1RgBO8PLJ2czsFQ4AJ7vUbMmvW7u42mJM "screenshot2")

### InputForm
- Updates data with JSON string via Text Box
![alt text](https://docs.google.com/uc?id=1oJ5R8oE4jqucuSBPwsZ1pQRx9OQ6OA5H "screenshot3")

### App States
- **period** ```Object``` - current period being viewed
- **period_clicks** ```Array``` - total clicks within period
- **expensive_clicks** ```Array``` - highest and/or earliest clicks within period
- **invalid_ips** ```Array``` - All clicks with IP appearing more than 10 times
- **hide_form** ```Boolean``` - Toggle JSON input form
- **default_data** ```Array``` - current JSON data loaded
