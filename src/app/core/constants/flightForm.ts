export const FLIGHT_FORM = [{
    type: 'select',
    label: 'Origin',
    controlName: 'origin',
    options: [],
    placeholder: 'Select an option',
    propertyName: "shortName",
    optionalPropertyName: "iata"
}, {
    type: 'select',
    label: 'Destination',
    controlName: 'destination',
    options: [],
    placeholder: 'Select an option',
    propertyName: "shortName",
    optionalPropertyName: "iata"
}, {
    type: 'input',
    label: 'Departure',
    controlName: 'departure',
    placeholder: 'Departure',
    inputType: 'date',
}, {
    type: 'input',
    label: 'Return',
    controlName: 'return',
    placeholder: 'Return',
    inputType: 'date'
}, {
    type: 'button',
    label: 'Search',
    inputType: 'submit'
}];