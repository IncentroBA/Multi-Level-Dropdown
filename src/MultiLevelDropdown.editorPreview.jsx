import { createElement } from "react";

export function preview({ placeholder }) {
    return (
        <div className="multilevel-dropdown-preview">
            MultiLevel Dropdown
            <span>{placeholder}</span>
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.8572959,21 C13.637883,21 13.4184701,20.918335 13.2513392,20.7558384 C12.9162203,20.4300119 12.9162203,19.9033562 13.2513392,19.5775296 L16.9307907,16.0001042 L13.2513392,12.4226787 C12.9162203,12.0968521 12.9162203,11.5701965 13.2513392,11.2443699 C13.5864581,10.9185434 14.1281337,10.9185434 14.4632526,11.2443699 L18.7486608,15.4109498 C19.0837797,15.7367763 19.0837797,16.263432 18.7486608,16.5892586 L14.4632526,20.7558384 C14.2961217,20.918335 14.0767088,21 13.8572959,21"
                    fill="#0A1325"
                    transform="translate(16.000000, 16.000000) rotate(90.000000) translate(-16.000000, -16.000000) "
                ></path>
            </svg>
        </div>
    );
}

export function getPreviewCss() {
    return require("./ui/MultiLevelDropdown.css");
}
