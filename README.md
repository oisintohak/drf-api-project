https://blog.logrocket.com/using-material-ui-with-react-hook-form/#date

https://www.leighhalliday.com/google-maps-clustering


Features:

Auth:
Register
Login
Logout

Event/SubEvent:
Create - Event Create Form
Read - Event List, Event Detail, Event Map, Event Search/Filter
Update - Event Edit Form
Delete - Event Delete Page


# Issues

- Map markers shifting while zooming
- Intermittent error on CreateEventForm: 'Google maps places API must be loaded.' - Seems to only happen when refreshing the home page and then navigating to the CreateEventForm, possibly a conflict between both pages loading google APIs
- Time zone conversion between frontend/backend when creating/listing events
- Event map date filters are applying when a date is clicked, causing unnecessary API requests. Need to only apply the filters once a 'Submit'/'Apply' button is clicked
- Need to add validation to ensure start-date comes before end-date when creating/updating events