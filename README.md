# Hassan Badru
### Capterra - Expensive Click App
This app allows user to view or download valid most Expensive clicks

## Libraries
- [x] ReactJS - Lightweight & agnostic UI library with a component architecture
- [x] JSON_Loader - for reading JSON string
- [x] Moment - for working better with date/time
- [x] Bootstrap - for basic styling
- [x] Font Awesome - for basic icons
- [x] Jest - for basic testing

## Solution
While within root directory (i.e. solution_Hassan_Badru)

### Install Dependencies
This would install the necessary package.json modules
```bash
npm install
```
### Run exercise solution
```bash
npm run solution
```
This solution would produce the file ```resultset.json``` and add this file to **code_output** folder within the root directory.
Note: If a **code_output** folder doesn't already exist, one would be created

```
$ File -> resultset.json has been saved!
Location -> /path/to/solution_Hassan_Badru/code_output/resultset.json
```

```
solution_Hassan_Badru
    ├── src/
    │   ├── components/
    │   │   ├── clicks.js
    │   │   ├── display.js
    │   │   ├── inputform.js
    │   │   └── periods.js
    │   ├── data/
    │   │   ├── clicks.json
    │   │   └── test_clicks.json
    │   ├── App.js
    │   ├── App.test.js
    │   ├── App.css
    │   ├── index.css
    │   ├── index.js
    │   ├── helpers.js
    │   ├── serviceWorker.js
    │   └── logo.svg
    ├── public/
    │   └── index.html
    ├── solution.js
    └── code_output/
        └── resultset.json
    ├── README.md
    ├── node_modules/
    ├── package.json
    ├── package-lock.json
    ├── .git/
    └── .gitignore

```
## Run Web App
The React App would run on [localhost:3000](http://localhost:3000/) with the command:

```bash
npm run solution-app
```

### To run a production build
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
 ✓ renders without crashing (271ms)
 ✓ check if timestamp belongs to period (4ms)
 ✓ create period ranges (1ms)
 ✓ check for invalid ips + most expensive clicks within period (10ms)
 ✓ check resultset output (104ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.209s
Ran all test suites.
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
- Download button for resultset.json
- Shows toggle button to open user inputted JSON form
- (if user inputted JSON), allow Refresh of data to default

### Display
- Shows all clicks within that period (sorted by timestamp)
- Shows the most expensive clicks for that period (period set)
- Shows 'No Valid Result' if no click exists or if click IP appears more than 10 times
- Download button for periodset_#.json

### Periods
- Shows an navigation tab to each 24 hour period

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
