define(['exports', 'react'], (function (exports, react) { 'use strict';

    function MultiLevelDropdown({
      DataJSON,
      displaySubmenuString,
      placeholder,
      selectedOption
    }) {
      const [canRender, setCanRender] = react.useState(false);
      const [currentMenu, setCurrentMenu] = react.useState("main");
      const [isOpen, setIsOpen] = react.useState(false);
      const [menuData, setMenuData] = react.useState(null);
      const [menuStack, setMenuStack] = react.useState([]);
      const [selectedValue, setSelectedValue] = react.useState();
      const [submenuPath, setSubmenuPath] = react.useState("");
      const currentItems = react.useMemo(() => {
        if (!menuData || !currentMenu) {
          return [];
        }
        return menuData[currentMenu] || [];
      }, [menuData, currentMenu]);
      const navigateToSubmenu = react.useCallback((submenu, label) => {
        if (submenu && label) {
          setCurrentMenu(submenu);
          setMenuStack(prevStack => [...prevStack, {
            menu: currentMenu,
            label
          }]);
        }
      }, [currentMenu]);
      const goBack = react.useCallback(() => {
        setMenuStack(prevStack => {
          if (prevStack.length === 0) return [];
          const newStack = prevStack.slice(0, -1);
          const targetMenu = newStack.length > 0 ? prevStack[newStack.length - 1].menu : "main";
          setCurrentMenu(targetMenu);
          return newStack;
        });
      }, []);
      react.useEffect(() => {
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
        return react.createElement("div", {
          className: "multilevel-dropdown"
        });
      }
      return react.createElement("div", {
        className: "multilevel-dropdown",
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false)
      }, react.createElement("div", {
        className: "form-control"
      }, react.createElement("span", null, selectedValue ? displaySubmenuString && submenuPath ? `${submenuPath} > ${selectedValue}` : selectedValue : placeholder), react.createElement("div", {
        className: "multilevel-dropdown__icon"
      }, react.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
      }, react.createElement("path", {
        d: "M8.12496 9.00002L12.005 12.88L15.885 9.00002C16.275 8.61002 16.905 8.61002 17.295 9.00002C17.685 9.39002 17.685 10.02 17.295 10.41L12.705 15C12.315 15.39 11.685 15.39 11.295 15L6.70496 10.41C6.51771 10.2232 6.41248 9.96954 6.41248 9.70502C6.41248 9.4405 6.51771 9.18685 6.70496 9.00002C7.09496 8.62002 7.73496 8.61002 8.12496 9.00002Z"
      })))), isOpen && react.createElement("div", {
        className: "multilevel-dropdown-content",
        key: currentMenu
      }, react.createElement("ul", null, menuStack.length > 0 && react.createElement("li", {
        onClick: goBack,
        className: "multilevel-dropdown__back"
      }, react.createElement("div", {
        className: "multilevel-dropdown__icon"
      }, react.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
      }, react.createElement("path", {
        d: "m15,17.29c.39-.39.39-1.02,0-1.41l-3.88-3.88,3.88-3.88c.39-.39.39-1.02,0-1.41-.39-.39-1.02-.39-1.41,0l-4.59,4.59c-.39.39-.39,1.02,0,1.41l4.59,4.59c.38.38,1.02.38,1.41,0Z"
      }))), react.createElement("span", null, menuStack[menuStack.length - 1]?.label)), currentItems.map(item => react.createElement("li", {
        key: item.value,
        className: menuData[item.value] ? "sub-dropdown" : "",
        onClick: () => {
          if (menuData[item.value]) {
            navigateToSubmenu(item.value, item.label);
          } else {
            const currentPath = menuStack.map(item => item.label).join(" > ");
            setSubmenuPath(currentPath);
            setSelectedValue(item.label);
            selectedOption.setValue(item.label);
            setIsOpen(false);
            setCurrentMenu("main");
            setMenuStack([]);
          }
        }
      }, react.createElement("span", null, item.label), menuData[item.value] && react.createElement("div", {
        className: "multilevel-dropdown__icon"
      }, react.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
      }, react.createElement("path", {
        d: "m9,6.71c-.39.39-.39,1.02,0,1.41l3.88,3.88-3.88,3.88c-.39.39-.39,1.02,0,1.41.39.39,1.02.39,1.41,0l4.59-4.59c.39-.39.39-1.02,0-1.41l-4.59-4.59c-.38-.38-1.02-.38-1.41,0Z"
      }))))))));
    }

    exports.MultiLevelDropdown = MultiLevelDropdown;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlMZXZlbERyb3Bkb3duLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvTXVsdGlMZXZlbERyb3Bkb3duLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3VpL011bHRpTGV2ZWxEcm9wZG93bi5jc3NcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWx0aUxldmVsRHJvcGRvd24oeyBEYXRhSlNPTiwgZGlzcGxheVN1Ym1lbnVTdHJpbmcsIHBsYWNlaG9sZGVyLCBzZWxlY3RlZE9wdGlvbiB9KSB7XG4gICAgY29uc3QgW2NhblJlbmRlciwgc2V0Q2FuUmVuZGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbY3VycmVudE1lbnUsIHNldEN1cnJlbnRNZW51XSA9IHVzZVN0YXRlKFwibWFpblwiKTtcbiAgICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFttZW51RGF0YSwgc2V0TWVudURhdGFdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW21lbnVTdGFjaywgc2V0TWVudVN0YWNrXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRWYWx1ZSwgc2V0U2VsZWN0ZWRWYWx1ZV0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFtzdWJtZW51UGF0aCwgc2V0U3VibWVudVBhdGhdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICBjb25zdCBjdXJyZW50SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKCFtZW51RGF0YSB8fCAhY3VycmVudE1lbnUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVudURhdGFbY3VycmVudE1lbnVdIHx8IFtdO1xuICAgIH0sIFttZW51RGF0YSwgY3VycmVudE1lbnVdKTtcblxuICAgIGNvbnN0IG5hdmlnYXRlVG9TdWJtZW51ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzdWJtZW51LCBsYWJlbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN1Ym1lbnUgJiYgbGFiZWwpIHtcbiAgICAgICAgICAgICAgICBzZXRDdXJyZW50TWVudShzdWJtZW51KTtcbiAgICAgICAgICAgICAgICBzZXRNZW51U3RhY2socHJldlN0YWNrID0+IFsuLi5wcmV2U3RhY2ssIHsgbWVudTogY3VycmVudE1lbnUsIGxhYmVsIH1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2N1cnJlbnRNZW51XVxuICAgICk7XG5cbiAgICBjb25zdCBnb0JhY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldE1lbnVTdGFjayhwcmV2U3RhY2sgPT4ge1xuICAgICAgICAgICAgaWYgKHByZXZTdGFjay5sZW5ndGggPT09IDApIHJldHVybiBbXTtcblxuICAgICAgICAgICAgY29uc3QgbmV3U3RhY2sgPSBwcmV2U3RhY2suc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0TWVudSA9IG5ld1N0YWNrLmxlbmd0aCA+IDAgPyBwcmV2U3RhY2tbbmV3U3RhY2subGVuZ3RoIC0gMV0ubWVudSA6IFwibWFpblwiO1xuXG4gICAgICAgICAgICBzZXRDdXJyZW50TWVudSh0YXJnZXRNZW51KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdTdGFjaztcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKERhdGFKU09OPy5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoRGF0YUpTT04udmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldE1lbnVEYXRhKHBhcnNlZERhdGEpO1xuICAgICAgICAgICAgICAgIHNldEN1cnJlbnRNZW51KFwibWFpblwiKTtcbiAgICAgICAgICAgICAgICBzZXRNZW51U3RhY2soW10pO1xuICAgICAgICAgICAgICAgIHNldENhblJlbmRlcih0cnVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBwYXJzZSBEYXRhSlNPTjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW0RhdGFKU09OXSk7XG5cbiAgICBpZiAoIWNhblJlbmRlciB8fCAhbWVudURhdGEpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibXVsdGlsZXZlbC1kcm9wZG93blwiPjwvZGl2PjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm11bHRpbGV2ZWwtZHJvcGRvd25cIiBvbk1vdXNlRW50ZXI9eygpID0+IHNldElzT3Blbih0cnVlKX0gb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRJc09wZW4oZmFsc2UpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGRpc3BsYXlTdWJtZW51U3RyaW5nICYmIHN1Ym1lbnVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgJHtzdWJtZW51UGF0aH0gPiAke3NlbGVjdGVkVmFsdWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc2VsZWN0ZWRWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdWx0aWxldmVsLWRyb3Bkb3duX19pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xMjQ5NiA5LjAwMDAyTDEyLjAwNSAxMi44OEwxNS44ODUgOS4wMDAwMkMxNi4yNzUgOC42MTAwMiAxNi45MDUgOC42MTAwMiAxNy4yOTUgOS4wMDAwMkMxNy42ODUgOS4zOTAwMiAxNy42ODUgMTAuMDIgMTcuMjk1IDEwLjQxTDEyLjcwNSAxNUMxMi4zMTUgMTUuMzkgMTEuNjg1IDE1LjM5IDExLjI5NSAxNUw2LjcwNDk2IDEwLjQxQzYuNTE3NzEgMTAuMjIzMiA2LjQxMjQ4IDkuOTY5NTQgNi40MTI0OCA5LjcwNTAyQzYuNDEyNDggOS40NDA1IDYuNTE3NzEgOS4xODY4NSA2LjcwNDk2IDkuMDAwMDJDNy4wOTQ5NiA4LjYyMDAyIDcuNzM0OTYgOC42MTAwMiA4LjEyNDk2IDkuMDAwMDJaXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXVsdGlsZXZlbC1kcm9wZG93bi1jb250ZW50XCIga2V5PXtjdXJyZW50TWVudX0+XG4gICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW51U3RhY2subGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e2dvQmFja30gY2xhc3NOYW1lPVwibXVsdGlsZXZlbC1kcm9wZG93bl9fYmFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm11bHRpbGV2ZWwtZHJvcGRvd25fX2ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwibTE1LDE3LjI5Yy4zOS0uMzkuMzktMS4wMiwwLTEuNDFsLTMuODgtMy44OCwzLjg4LTMuODhjLjM5LS4zOS4zOS0xLjAyLDAtMS40MS0uMzktLjM5LTEuMDItLjM5LTEuNDEsMGwtNC41OSw0LjU5Yy0uMzkuMzktLjM5LDEuMDIsMCwxLjQxbDQuNTksNC41OWMuMzguMzgsMS4wMi4zOCwxLjQxLDBaXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21lbnVTdGFja1ttZW51U3RhY2subGVuZ3RoIC0gMV0/LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjdXJyZW50SXRlbXMubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17bWVudURhdGFbaXRlbS52YWx1ZV0gPyBcInN1Yi1kcm9wZG93blwiIDogXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lbnVEYXRhW2l0ZW0udmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVUb1N1Ym1lbnUoaXRlbS52YWx1ZSwgaXRlbS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gbWVudVN0YWNrLm1hcChpdGVtID0+IGl0ZW0ubGFiZWwpLmpvaW4oXCIgPiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3VibWVudVBhdGgoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkVmFsdWUoaXRlbS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb24uc2V0VmFsdWUoaXRlbS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50TWVudShcIm1haW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVudVN0YWNrKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21lbnVEYXRhW2l0ZW0udmFsdWVdICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXVsdGlsZXZlbC1kcm9wZG93bl9faWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIm05LDYuNzFjLS4zOS4zOS0uMzksMS4wMiwwLDEuNDFsMy44OCwzLjg4LTMuODgsMy44OGMtLjM5LjM5LS4zOSwxLjAyLDAsMS40MS4zOS4zOSwxLjAyLjM5LDEuNDEsMGw0LjU5LTQuNTljLjM5LS4zOS4zOS0xLjAyLDAtMS40MWwtNC41OS00LjU5Yy0uMzgtLjM4LTEuMDItLjM4LTEuNDEsMFpcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiJdLCJuYW1lcyI6WyJNdWx0aUxldmVsRHJvcGRvd24iLCJEYXRhSlNPTiIsImRpc3BsYXlTdWJtZW51U3RyaW5nIiwicGxhY2Vob2xkZXIiLCJzZWxlY3RlZE9wdGlvbiIsImNhblJlbmRlciIsInNldENhblJlbmRlciIsInVzZVN0YXRlIiwiY3VycmVudE1lbnUiLCJzZXRDdXJyZW50TWVudSIsImlzT3BlbiIsInNldElzT3BlbiIsIm1lbnVEYXRhIiwic2V0TWVudURhdGEiLCJtZW51U3RhY2siLCJzZXRNZW51U3RhY2siLCJzZWxlY3RlZFZhbHVlIiwic2V0U2VsZWN0ZWRWYWx1ZSIsInN1Ym1lbnVQYXRoIiwic2V0U3VibWVudVBhdGgiLCJjdXJyZW50SXRlbXMiLCJ1c2VNZW1vIiwibmF2aWdhdGVUb1N1Ym1lbnUiLCJ1c2VDYWxsYmFjayIsInN1Ym1lbnUiLCJsYWJlbCIsInByZXZTdGFjayIsIm1lbnUiLCJnb0JhY2siLCJsZW5ndGgiLCJuZXdTdGFjayIsInNsaWNlIiwidGFyZ2V0TWVudSIsInVzZUVmZmVjdCIsInN0YXR1cyIsInBhcnNlZERhdGEiLCJKU09OIiwicGFyc2UiLCJ2YWx1ZSIsImVycm9yIiwiY29uc29sZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJ4bWxucyIsInZpZXdCb3giLCJkIiwia2V5Iiwib25DbGljayIsIm1hcCIsIml0ZW0iLCJjdXJyZW50UGF0aCIsImpvaW4iLCJzZXRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7SUFHTyxTQUFTQSxrQkFBa0JBLENBQUM7TUFBRUMsUUFBUTtNQUFFQyxvQkFBb0I7TUFBRUMsV0FBVztJQUFFQyxFQUFBQSxjQUFBQTtJQUFlLENBQUMsRUFBRTtNQUNoRyxNQUFNLENBQUNDLFNBQVMsRUFBRUMsWUFBWSxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtNQUNqRCxNQUFNLENBQUNDLFdBQVcsRUFBRUMsY0FBYyxDQUFDLEdBQUdGLGNBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtNQUN0RCxNQUFNLENBQUNHLE1BQU0sRUFBRUMsU0FBUyxDQUFDLEdBQUdKLGNBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtNQUMzQyxNQUFNLENBQUNLLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdOLGNBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUM5QyxNQUFNLENBQUNPLFNBQVMsRUFBRUMs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
