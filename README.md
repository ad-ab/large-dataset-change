# large-dataset-change

## Introduction
A test project to demonstrate my solution of a complete problem. 

I tried to implement these points: 

- Backend [Readme](./backend/README.md)
  - Data Generation (some fields change with a different probability)
  - REST Server - Fastify 
  - Websocket Server - Broadcast mode
  - Algorithm to determine changes
  - Checksum for validation

- Frontend [Readme](./frontend/README.md)
  - React
  - Websocket consumer
  - CRC check
  - Replay functionality algorithm

- Both 
  - Dockerization
  - Env variables

- What I didn't do yet
  - Tests (frontend - Cypress, backend - ava/jest)
  - Proper state management (frontend) 
  - Better project organisation (both)
## Data Structure

### Main Data Structure
- data 
    - id
    - configuration - device name, ip address, firmware version  
    - topology - geographical location, parent
    - statistics - X fields that change their values often, counters, and other values
- counter - Which step was the changeset created

In the end I didn't choose to represent this as an array and that might have been a bad idea. So its a classic Javascript Object, which is not optimal for transmiting data, I would switch to something more compact.


### Diff algorithm structure
- changes
    - id
    - fields that were changed compared to previous version of the main data structure
- deletions - array of ids that we should remove on the frontend
- counter - Which step was the changeset created

### Websocket messages
#### join request
This will add your websocket to the listeners of `room1` and you will get any message
that is sent to room1
```JS
{ 
    meta:"join", 
    room: "room1", 
    participant: "you", 
    payload: "Hi" 
}
```
#### Send-message 
This sends a message to `room1` that will be sent to all people in the room
```JS
{
    topic: "room-event",
    meta: "send-message",
    room: "room1",
    broadCast: true,
    payload,
}
```
## Algorithms

### Difference algorithm (backend)

Compare two sets of data to figure out the changes in O(n) time. 
This requires both of the arrays to be sorted by ID field ascending.

- We have two indexes one for each set. 
- We always increate the lower one and based on which set it is in 
- We either add the whole line or add the line id to be deleted from the results set.
- If the IDs are the same we compare fields and add the different fields to the result set
- If we finish one or the other index has finished going trough the set. We either add or delete the rest of ids based on the set its in

### Replay functionality algorithm (frontend)

This is basically the ability to get a full dataset for a certain point in time and allow
to apply a array of changesets that we recieved to see what the state of the data was at
a certain point. We can always do a CRC check to figure out if our data is correct.

This is inspired loosely by how mmo games (or maybe how redux) work. Messages that alter the global state that we can replay (to fix sync issues). 

Algorithm:
    1. Recieve changeset 
    2. Apply changeset on our current dataset
    2. Check CRC
    3. If CRC failed, fetch current data
    4. Replay updates to current counter if needed

