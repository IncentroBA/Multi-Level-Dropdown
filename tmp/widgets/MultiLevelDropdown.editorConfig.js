'use strict';

/**
 * @typedef Property
 * @type {object}
 * @property {string} key
 * @property {string} caption
 * @property {string} description
 * @property {string[]} objectHeaders
 * @property {ObjectProperties[]} objects
 * @property {Properties[]} properties
 */

/**
 * @typedef ObjectProperties
 * @type {object}
 * @property {PropertyGroup[]} properties
 * @property {string[]} captions
 */

/**
 * @typedef PropertyGroup
 * @type {object}
 * @property {string} caption
 * @property {PropertyGroup[]} propertyGroups
 * @property {Property[]} properties
 */

/**
 * @typedef Properties
 * @type {PropertyGroup}
 */

/**
 * @typedef Problem
 * @type {object}
 * @property {string} property
 * @property {("error" | "warning" | "deprecation")} severity
 * @property {string} message
 * @property {string} studioMessage
 * @property {string} url
 * @property {string} studioUrl
 */

/**
 * @param {object} values
 * @param {Properties} defaultProperties
 * @param {("web"|"desktop")} target
 * @returns {Properties}
 */
function getProperties(values, defaultProperties, target) {
  // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
  /* Example
  if (values.myProperty === "custom") {
      delete defaultProperties.properties.myOtherProperty;
  }
  */
  return defaultProperties;
}

// /**
//  * @param {Object} values
//  * @returns {Problem[]} returns a list of problems.
//  */
// export function check(values) {
//    /** @type {Problem[]} */
//    const errors = [];
//    // Add errors to the above array to throw errors in Studio and Studio Pro.
//    /* Example
//    if (values.myProperty !== "custom") {
//        errors.push({
//            property: `myProperty`,
//            message: `The value of 'myProperty' is different of 'custom'.`,
//            url: "https://github.com/myrepo/mywidget"
//        });
//    }
//    */
//    return errors;
// }

// /**
//  * @param {object} values
//  * @param {boolean} isDarkMode
//  * @param {number[]} version
//  * @returns {object}
//  */
var chevronDownIcon = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg width=\"32px\" height=\"32px\" viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>Date picker Copy</title><g id=\"Date-picker-Copy\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13.8572959,21 C13.637883,21 13.4184701,20.918335 13.2513392,20.7558384 C12.9162203,20.4300119 12.9162203,19.9033562 13.2513392,19.5775296 L16.9307907,16.0001042 L13.2513392,12.4226787 C12.9162203,12.0968521 12.9162203,11.5701965 13.2513392,11.2443699 C13.5864581,10.9185434 14.1281337,10.9185434 14.4632526,11.2443699 L18.7486608,15.4109498 C19.0837797,15.7367763 19.0837797,16.263432 18.7486608,16.5892586 L14.4632526,20.7558384 C14.2961217,20.918335 14.0767088,21 13.8572959,21\" id=\"Icon\" fill=\"#0A1325\" transform=\"translate(16.000000, 16.000000) rotate(90.000000) translate(-16.000000, -16.000000) \"></path></g></svg>";
var chevronDownIconDark = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg width=\"32px\" height=\"32px\" viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>Date picker Copy</title><g id=\"Date-picker-Copy\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M13.8572959,21 C13.637883,21 13.4184701,20.918335 13.2513392,20.7558384 C12.9162203,20.4300119 12.9162203,19.9033562 13.2513392,19.5775296 L16.9307907,16.0001042 L13.2513392,12.4226787 C12.9162203,12.0968521 12.9162203,11.5701965 13.2513392,11.2443699 C13.5864581,10.9185434 14.1281337,10.9185434 14.4632526,11.2443699 L18.7486608,15.4109498 C19.0837797,15.7367763 19.0837797,16.263432 18.7486608,16.5892586 L14.4632526,20.7558384 C14.2961217,20.918335 14.0767088,21 13.8572959,21\" id=\"Icon\" fill=\"#579BF9\" transform=\"translate(16.000000, 16.000000) rotate(90.000000) translate(-16.000000, -16.000000) \"></path></g></svg>";
function getPreview(values, isDarkMode) {
  return {
    type: "RowLayout",
    borders: true,
    borderRadius: 0,
    borderWidth: 1,
    // borderColor: isDarkMode ? "#313131" : "#313131",
    columnSize: "grow",
    padding: 4,
    children: [{
      type: "RowLayout",
      columnSize: "grow",
      // backgroundColor: isDarkMode ? "#FFF" : "#000",
      children: [{
        type: "Container",
        children: [{
          type: "Text",
          fontColor: isDarkMode ? "#DEDEDE" : "#DEDEDE",
          content: "MultiLevel Dropdown"
        }, {
          content: "[".concat(values.placeholder, "]"),
          fontColor: isDarkMode ? "#5596F1" : "#5596F1",
          type: "Text"
        }],
        grow: 1
      }, {
        type: "Container",
        padding: 2,
        grow: 0,
        children: [{
          type: "Image",
          document: isDarkMode ? chevronDownIconDark : chevronDownIcon
        }]
      }]
    }]
  };
}

// /**
//  * @param {Object} values
//  * @param {("web"|"desktop")} platform
//  * @returns {string}
//  */
// export function getCustomCaption(values, platform) {
//     return "MultiLevelDropdown";
// }

exports.getPreview = getPreview;
exports.getProperties = getProperties;
