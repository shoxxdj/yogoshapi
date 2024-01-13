# Yogoshapi 

A wrapper for yogosha API

## Usage 

```
const apiUsername = "YOUR_USERNAME";
const apikey = "YOUR_APIKEY";

import initYogoshapi from 'yogoshapi';
const yogoshapi = initYogoshapi(apiUsername,apikey);
```

## Methods 

### printUsername

for debug, it prints apiUsername and apiKey

### getReports
call /reports (may be removed in the future)
### getAllReports
call /reports with embed author,close,content,doublechecks,feedbackToOrganization,feedbackToResearcher,fix,organization,program,review,reward,vulnerability,history,remediation

### getNonReviewedReports
Same as getAllReports but with filter on non reviewed

### getReport(id)
Query a specific report by id

### getReportByProgram(id)
Get all reports for a specific program id

