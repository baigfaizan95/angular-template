# Byrd Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Tools / 3rd Party Components Used

* Bootstrap 4 -> Grid and Layout
* Flatpickr -> Date Picker
* ng-select -> Select
* ngx-toastr -> Notifications
* ngxs -> State Management

## Solution

- Created a component folder which contains all the component used, for the project.
- actions, state and objects are used by ngxs for state management.
- Stored the value of customerId, startDate, endDate and orderId in localStorage for State persistence.
- When we refresh the page it checks for the values for from the localStorage and gives us the state which we had before refresh.
