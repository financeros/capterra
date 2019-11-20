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

## Run Solution
```bash
npm run solution
```
This solution would produce the file ```resultset.json``` and add this file to **code_output** folder within the root directory

### ReactJS App
The Web app would run on [localhost:3000](http://localhost:3000/)

```bash
npm run solution-app
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
- Creates **24** one-hour periods
- Groups Clicks data into one-hour periods
- Creates an IP Count Lookup table
- Creates an Invalid IP Lookup table
- Sorts Clicks by timestamp (earliest to latest)
- Traverses from earliest to latest click, searching higher click amounts for Duplicate Clicks
- Checks if IP address is valid (i.e. IP appears at most 10 times)
- Checks if Duplicate Click exists for period
- If Duplicate Click doesn't exist, adds click to result set
- If Duplicate Click exists, compares click amounts for similar IP and only adds the more expensive click to result set
- Concatenates array of result set for all one-hour periods
- Produces a resultset.json file from resultset array
- Stores resultset.json in root folder 'code_output'
### Additional Web App Features
- Allows view of clicks per period
- Allows download of valid Most Expensive Clicks per period
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
- Shows an navigation tab to each 24 hour period
- (if user JSON) Refresh to default data

![alt text](https://docs.google.com/uc?id=16fBmOxwOE6TuSJ4Um2J6KkaMiEad7MpH "screenshot1")

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
- **resultset** ```Array``` - Result set that includes each valid clicks/IPs within each one-hour period
- **hide_form** ```Boolean``` - Toggle JSON input form
- **default_data** ```Array``` - current JSON data loaded
