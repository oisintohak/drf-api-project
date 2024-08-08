# Eventually - Event Management System

Eventually is a comprehensive event management system designed to streamline the process of creating, managing, and discovering events. With a focus on user experience, Eventually integrates advanced features such as Google Maps for event locations, detailed event search and filtering, and robust date handling to ensure users can find and manage events with ease.

## Features

- **Event Management**: Users can create, read, update, and delete events through intuitive forms and interfaces.
- **Google Maps Integration**: Visualize event locations on maps, enhanced with markers and clustering for better navigation.
- **Advanced Search and Filtering**: Find events that match your interests with powerful search and filtering capabilities.
- **Responsive Design**: Accessible on any device, providing a seamless experience whether on desktop or mobile.

## Tech Stack

- **Frontend**: React, @emotion/react for styling, @mui/material for material UI components.
- **Backend**: (Assuming a backend technology, as it's not specified in the provided details)
- **APIs**: Google Maps JavaScript API for map features, other backend APIs for event data management.

## Installation

1. Clone the repository:


## Usage

- Navigate to the homepage to view the list of upcoming events.
- Use the search and filter options to find events that interest you.
- Click on an event to view its details, location on the map, and more.
- Create your own events using the "Create Event" form accessible from the navigation menu.

## Known Issues

- Map markers shift while zooming.
- Intermittent error on CreateEventForm related to Google Maps Places API.
- Time zone conversion issues between frontend and backend.
- Event map date filters trigger unnecessary API requests.
- Start-date and end-date validation needed for event creation and updating.

## Contributing

Contributions are welcome! If you encounter an issue or have a suggestion for improving the application, please open an issue or submit a pull request.

## License

[MIT License](LICENSE.md)