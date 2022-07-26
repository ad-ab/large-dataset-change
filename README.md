# large-dataset-change
A test to see how to efficiently update a large dataset and send the infromation from the server to the client

## Data Structure

### Node 
- id
- configuration - device name, ip address, firmware version  
- statistics - X fields that change their values often, counters, and other values
- topology - geographical location, parent

Array of arrays
```
["id",  "stat1", "stat2", "stat3", "stat4", "stat5", "stat6", "name", "ip", "fw", "parentId", "geoLat", "geoLong"]
```
Ordered descendingly by probability that the field changes often  