## MultiLevelDropdown

Render a dropdown widget from a multilevel JSON structure with multiple levels of hierarchy. The selected value will be
stored in a String attribute.

## Features

Provide a JSON `attribute(String)` with a sublevel that the widget will use to render the dropdown with options.

Allocate a Selected option `attribute(String)` that the widget can use to write the selected value to.

Optionally you can configure a placeholder `String` for the widget to display

Output submenu value `Boolean` (Optional): Also pass the submenu value to the selected option attribute.

### Demo Data JSON

```
{
	"main": [
		{
			"label": "Option 1",
			"value": "option1"
		},
		{
			"label": "Option 2",
			"value": "submenu1"
		},
		{
			"label": "Option 3",
			"value": "option3"
		}
	],
	"submenu1": [
		{
			"label": "Sub Option 1",
			"value": "suboption1"
		},
		{
			"label": "Sub Option 2",
			"value": "suboption2"
		}
	]
}
```

Note how the value for Option 2 points to the second level `submenu1`.

## Usage

Just place on the page and configure according to above features and JSON structure.

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing
   `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[specify contribution]
