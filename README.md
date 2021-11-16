# BackOffice CMS Front-End

## Framework Buttons

In order to display the correct buttons for every package you **have to pass as a prop** to the package the arrow function **getButtons** from CMS FE

In your package you have to create an array of objects like the following one:

```javascript
;[
  {
    id: 4,
    title: 'Save',
    package: 'maintenance-mode',
    onClick: handleClickOpen,
    disabled: false,
    className: 'save-button',
  },
]
```

The code above is only for a Save Button.

Where:

- id -> Give a number
- title -> Exactly the name of the predefined button
- package -> The name of your package (lowercase and for every space put a dash (-))
- onClick -> The function to handle the button when is clicked
- disabled -> true/false based on if you want your button to be disabled or not
- className -> Exactly the name of the predefined classname

There are 9 buttons predefined from where you should take the title and the className. If the title and the className are not identical with the buttons you see below, then the buttons won't be inserted in the CMS FE.The 9 predefined buttons are:

```javascript
;[
  {
    id: 0,
    title: 'UAT',
    package: '',
    onClick: '',
    disabled: false,
    className: 'uat-button',
  },
  {
    id: 1,
    title: 'Save Theme',
    package: 'look-and-feel',
    onClick: '',
    disabled: false,
    className: 'save-button',
  },
  {
    id: 2,
    title: 'Save',
    package: 'maintenance-mode',
    onClick: '',
    disabled: false,
    className: 'save-button',
  },
  {
    id: 3,
    title: 'Save',
    package: 'ui-text-editor',
    onClick: '',
    disabled: false,
    className: 'save-button',
  },
  {
    id: 4,
    title: 'Save',
    package: 'update-app',
    onClick: '',
    disabled: false,
    className: 'save-button',
  },
  {
    id: 5,
    title: 'Change Theme',
    package: '',
    onClick: '',
    disabled: false,
    className: 'change-theme-button',
  },
  {
    id: 6,
    title: 'UAT Date',
    package: '',
    onClick: '',
    disabled: false,
    className: 'uat-date-button',
  },
  {
    id: 7,
    title: 'Export as .csv',
    package: '',
    onClick: '',
    disabled: false,
    className: 'export-csv-button',
  },
  {
    id: 8,
    title: 'Preview',
    package: '',
    onClick: '',
    disabled: false,
    className: 'preview-button',
  },
  {
    id: 9,
    title: 'Info',
    package: '',
    onClick: '',
    disabled: false,
    className: 'info-button',
  },
  {
    id: 10,
    title: 'Publish',
    package: '',
    onClick: '',
    disabled: false,
    className: 'publish-button',
  },
]
```

Inside the package, you have to write the buttons you want and then pass them as an argument to the props.getButtons(argument) in ComponentDidUpdate/useEffect

## EXAMPLE

I want to display two buttons, a save button and a publish button, in the maintenance-mode package so inside the package i write:

```javascript
const buttons = [
  {
    id: 4,
    title: 'Save',
    package: 'maintenance-mode',
    onClick: handleClickOpen,
    disabled: false,
    className: 'save-button',
  },
  {
    id: 10,
    title: 'Publish',
    package: 'maintenance-mode',
    onClick: handleClickOpen,
    disabled:
      from === '' ||
      from === null ||
      to === '' ||
      to === null ||
      disabled === false,
    className: 'publish-button',
  },
]

useEffect(() => props.getButtons(buttons), [from, to, disabled])
```

**NOTE:** Publish button in maintenance mode needs to be disabled based on the variables (from,to,disabled) which are inside the maintenance-mode package. That's why i need to declare [from, to, disabled] in useEffect, in order to re-render the button if needed when from,to,disabled change.
