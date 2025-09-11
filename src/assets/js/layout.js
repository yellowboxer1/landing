if (sessionStorage.length > 0) {
    const documentElement = document.documentElement;
    const getValue = (key, attr) => {
        // Try to get the value from sessionStorage first, otherwise fallback to the HTML attribute
        return sessionStorage.getItem(key) || documentElement.getAttribute(attr);
    };

    // Check for each item
    documentElement.setAttribute('data-layout', getValue('layout', 'data-layout'));
    documentElement.setAttribute('data-content-width', getValue('contentWidth', 'data-content-width'));
    documentElement.setAttribute('layoutMode', getValue('layoutMode', 'layoutMode'));
    if(getValue('layout', 'data-layout') !== 'horizontal') {
        documentElement.setAttribute('data-sidebar-colors', getValue('sidebarColors', 'data-sidebar-colors'));        
    } else {
        documentElement.setAttribute('data-sidebar-colors', 'light');
    }
    documentElement.setAttribute('data-sidebar', getValue('sidebar', 'data-sidebar'));
    documentElement.setAttribute('data-nav-type', getValue('navType', 'data-nav-type'));
    documentElement.setAttribute('dir', getValue('layoutDir', 'dir'));
    documentElement.setAttribute('data-colors', getValue('primaryColors', 'data-colors'));

    // Handle dark mode specific logic
    const layoutMode = getValue('layoutMode', 'layoutMode');
    if (layoutMode === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
        if (sessionStorage.getItem('darkModeColors')) {
            documentElement.classList.add(sessionStorage.getItem('darkModeColors'));
        }
    }
}
