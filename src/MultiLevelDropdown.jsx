import "./ui/MultiLevelDropdown.css";
import { createElement, useEffect, useState, useCallback, useMemo } from "react";

export function MultiLevelDropdown({ DataJSON, placeholder, selectedOption }) {
    const [canRender, setCanRender] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("main");
    const [isOpen, setIsOpen] = useState(false);
    const [menuData, setMenuData] = useState(null);
    const [menuStack, setMenuStack] = useState([]);
    const [selectedValue, setSelectedValue] = useState();

    const currentItems = useMemo(() => {
        if (!menuData || !currentMenu) {
            return [];
        }
        return menuData[currentMenu] || [];
    }, [menuData, currentMenu]);

    const navigateToSubmenu = useCallback(
        (submenu, label) => {
            if (submenu && label) {
                setCurrentMenu(submenu);
                setMenuStack(prevStack => [...prevStack, { menu: currentMenu, label }]);
            }
        },
        [currentMenu]
    );

    const goBack = useCallback(() => {
        setMenuStack(prevStack => {
            if (prevStack.length === 0) return [];

            const newStack = prevStack.slice(0, -1);
            const targetMenu = newStack.length > 0 ? prevStack[newStack.length - 1].menu : "main";

            setCurrentMenu(targetMenu);
            return newStack;
        });
    }, []);

    useEffect(() => {
        if (DataJSON?.status === "available") {
            try {
                const parsedData = JSON.parse(DataJSON.value);
                setMenuData(parsedData);
                setCurrentMenu("main");
                setMenuStack([]);
                setCanRender(true);
            } catch (error) {
                console.error("Failed to parse DataJSON:", error);
            }
        }
    }, [DataJSON]);

    if (!canRender || !menuData) {
        return <div className="multilevel-dropdown form-group"></div>;
    }

    return (
        <div
            className="multilevel-dropdown form-group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="form-control">
                <span>{selectedValue || placeholder}</span>
                <div className="multilevel-dropdown__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M8.12496 9.00002L12.005 12.88L15.885 9.00002C16.275 8.61002 16.905 8.61002 17.295 9.00002C17.685 9.39002 17.685 10.02 17.295 10.41L12.705 15C12.315 15.39 11.685 15.39 11.295 15L6.70496 10.41C6.51771 10.2232 6.41248 9.96954 6.41248 9.70502C6.41248 9.4405 6.51771 9.18685 6.70496 9.00002C7.09496 8.62002 7.73496 8.61002 8.12496 9.00002Z" />
                    </svg>
                </div>
            </div>
            {isOpen && (
                <div className="multilevel-dropdown-content" key={currentMenu}>
                    <ul>
                        {menuStack.length > 0 && (
                            <li onClick={goBack} className="multilevel-dropdown__back">
                                <div className="multilevel-dropdown__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="m15,17.29c.39-.39.39-1.02,0-1.41l-3.88-3.88,3.88-3.88c.39-.39.39-1.02,0-1.41-.39-.39-1.02-.39-1.41,0l-4.59,4.59c-.39.39-.39,1.02,0,1.41l4.59,4.59c.38.38,1.02.38,1.41,0Z" />
                                    </svg>
                                </div>
                                <span>{menuStack[menuStack.length - 1]?.label}</span>
                            </li>
                        )}
                        {currentItems.map(item => (
                            <li
                                key={item.value}
                                className={menuData[item.value] ? "sub-dropdown" : ""}
                                onClick={() => {
                                    if (menuData[item.value]) {
                                        navigateToSubmenu(item.value, item.label);
                                    } else {
                                        setSelectedValue(item.label);
                                        selectedOption.setValue(item.label);
                                        setIsOpen(false);
                                        setCurrentMenu("main");
                                        setMenuStack([]);
                                    }
                                }}
                            >
                                <span>{item.label}</span>
                                {menuData[item.value] && (
                                    <div className="multilevel-dropdown__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="m9,6.71c-.39.39-.39,1.02,0,1.41l3.88,3.88-3.88,3.88c-.39.39-.39,1.02,0,1.41.39.39,1.02.39,1.41,0l4.59-4.59c.39-.39.39-1.02,0-1.41l-4.59-4.59c-.38-.38-1.02-.38-1.41,0Z" />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
