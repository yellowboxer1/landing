/*
Template Name: 파트너잇 - 새로운 공고 매칭의 시작
Author: 파트너잇
Version: 1.0.0
File: main Js File
*/
import flatpickr from "flatpickr";

import us from '/assets/images/flag/us.svg';

const path = window.location.pathname.replace(/^\/|\/$/g, '');
const currentPath = path !== '' ? path : 'index.html';

function delayFun(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(function () {
	("use strict");
	let backDropOverlay = null;
	function drawerSetting() {
		const allDrawerButtons = document.querySelectorAll("[data-drawer-target]");
		const allDrawerCloseButtons = document.querySelectorAll("[data-drawer-close]");
		const allModalButtons = document.querySelectorAll("[data-modal-target]");
		const allModalCloseButtons = document.querySelectorAll("[data-modal-close]");
		const bodyElement = document.body;
		let openDrawerId = null;
		let openModalId = null;
		if (document.getElementById("backDropDiv")) {
			backDropOverlay = document.getElementById("backDropDiv");
		} else if (backDropOverlay == null) {
			backDropOverlay = document.createElement("div");
			backDropOverlay.className = "!hidden backdrop-overlay backdrop-blur-xs";
			backDropOverlay.id = "backDropDiv";
		}
		async function addClass(elem, delay) {
			await delayFun(delay);
			elem.classList.add('!hidden');
		}
		async function removeClass(elem, elem2, delay) {
			await delayFun(delay);
			elem.classList.remove("show");
			elem2.classList.remove("!hidden");
		}
		// Function to toggle the state of drawers and modals
		function toggleElementState(elementId, show, delay) {
			const element = document.getElementById(elementId);
			if (element) {
				if (!show) {
					element.classList.add("show");
					backDropOverlay.classList.add("!hidden");
					addClass(element, 350);
				} else {
					element.classList.remove("!hidden");
					removeClass(element, backDropOverlay, delay);
				}
				bodyElement.classList.toggle("overflow-hidden", show);
				if (show) {
					openDrawerId = elementId;
					openModalId = elementId;
				} else {
					openDrawerId = null;
					openModalId = null;
				}
			}
		}
		// Attach click event listeners to drawer buttons
		allDrawerButtons.forEach((element) => {
			const drawerId = element.getAttribute("data-drawer-target");
			if (drawerId) {
				element.addEventListener("click", function () {
					toggleElementState(drawerId, true, 0);
					document.body.appendChild(backDropOverlay);
				});
			}
		});
		// Attach click event listeners to drawer close buttons
		allDrawerCloseButtons.forEach((element) => {
			const drawerId = element.getAttribute("data-drawer-close");
			if (drawerId) {
				element.addEventListener("click", function () {
					toggleElementState(drawerId, false, 0);
				});
			}
		});
		// Attach click event listeners to modal buttons
		allModalButtons.forEach((element) => {
			const modalId = element.getAttribute("data-modal-target");
			if (modalId) {
				element.addEventListener("click", function () {
					toggleElementState(modalId, true, 200);
					var modalElement = document.getElementById(modalId);
					if (modalElement)
						modalElement.appendChild(backDropOverlay);
				});
			}
		});
		// Attach click event listeners to modal close buttons
		allModalCloseButtons.forEach((element) => {
			const modalId = element.getAttribute("data-modal-close");
			if (modalId) {
				element.addEventListener("click", function () {
					toggleElementState(modalId, false, 200);
				});
			}
		});
		// Attach click event listener to backdrop-overlay
		backDropOverlay?.addEventListener("click", function () {
			if (openDrawerId)
				toggleElementState(openDrawerId, false, 0);
			if (openModalId)
				toggleElementState(openModalId, false, 200);
		});
	}

	function initFlatpickr() {
		const flatpickrExamples = document.querySelectorAll("[data-provider]");
		flatpickrExamples.forEach((item) => {
			const provider = item.getAttribute("data-provider");

			if (provider === "flatpickr")
				configureFlatpickr(item);
			else if (provider === "timepickr")
				configureTimePicker(item);
			else
				return; // Early return if provider is not supported
		});
	}

	function configureFlatpickr(item) {
		const dateData = getDatePickerOptions(item);
		flatpickr(item, dateData);
	}

	async function configureTimePicker(item) {
		const timeData = getTimepickerOptions(item);
		await delayFun(750); // Wait for 750ms
		flatpickr(item, timeData); // Initialize the time picker
	}

	function getDatePickerOptions(item) {
		const attributes = item.attributes;
		const dateData = {};

		// Handle common options
		dateData.dateFormat = attributes["data-date-format"]?.value.toString() || "";
		if (attributes["data-enable-time"]) {
			dateData.enableTime = true;
			dateData.dateFormat += " H:i";
		}

		if (attributes["data-altFormat"]) {
			dateData.altInput = true;
			dateData.altFormat = attributes["data-altFormat"].value.toString();
		}

		if (attributes["data-minDate"])
			dateData.minDate = attributes["data-minDate"].value.toString();

		if (attributes["data-maxDate"])
			dateData.maxDate = attributes["data-maxDate"].value.toString();

		if (attributes["data-default-date"])
			dateData.defaultDate = attributes["data-default-date"].value.toString();

		if (attributes["data-multiple-date"])
			dateData.mode = "multiple";

		if (attributes["data-range-date"])
			dateData.mode = "range";

		if (attributes["data-inline-date"]) {
			dateData.inline = true;
			dateData.defaultDate = attributes["data-default-date"]?.value.toString();
		}

		if (attributes["data-disable-date"])
			dateData.disable = attributes["data-disable-date"].value.split(",");

		if (attributes["data-week-number"])
			dateData.weekNumbers = true;

		return dateData;
	}

	function getTimepickerOptions(item) {
		const attributes = item.attributes;
		const timeData = {};
		timeData.enableTime = true;
		timeData.noCalendar = true;
		timeData.dateFormat = "H:i";

		if (attributes["data-time-hrs"])
			timeData.time_24hr = true;

		if (attributes["data-min-time"])
			timeData.minTime = attributes["data-min-time"].value.toString();

		if (attributes["data-max-time"])
			timeData.maxTime = attributes["data-max-time"].value.toString();

		if (attributes["data-default-time"])
			timeData.defaultDate = attributes["data-default-time"].value.toString();

		if (attributes["data-time-inline"]) {
			timeData.inline = true;
			timeData.defaultDate = attributes["data-time-inline"].value.toString();
		}
		return timeData;
	}

	async function init() {
		await delayFun(100);
		drawerSetting();
		initFlatpickr();
	}

	init();
	window.drawerSetting = drawerSetting;
})();

function sidebarMenu() {
	return {
		menu: menu,
		filteredMenu: menu,
		activeUrl: window.location.pathname,
		init() {
			this.fetchMenu();
			window.addEventListener('search-data', (event) => {
				this.filterData(event.detail.term);
			});
		},
		filterData(term) {
			if (term) {
				this.filteredMenu = this.menu.filter(item =>
					(item.title && item.title.toLowerCase().includes(term.toLowerCase())) ||
					(item.children && item.children.some(child => child.title.toLowerCase().includes(term.toLowerCase())))
				);
			} else
				this.filteredMenu = this.menu;
			this.fetchMenu();
		},
		chunkArray(array, chunkSize) {
			const chunks = [];
			for (let i = 0; i < array.length; i += chunkSize) {
				chunks.push(array.slice(i, i + chunkSize));
			}
			return chunks;
		},
		async fetchMenu() {
			await delayFun(350);
			window.lucide.createIcons();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	// Initialize Alpine.js
	document.addEventListener('alpine:init', () => {
		Alpine.data('dropdownBehavior', dropdownBehavior);
		Alpine.data('layoutSettings', layoutSettings);
		Alpine.data('sidebarMenu', sidebarMenu);
		if (localStorage.getItem('settingModal') === null) {
			localStorage.setItem('settingModal', 'false'); // Store as a string
			document.getElementById('settingsModalButton')?.click();
		}
	});
})

function dropdownBehavior() {
	return {
		open: false,
		parent: null,
		async toggle() {
			if (!this.open)
				await this.calculatePosition();
			this.open = !this.open;
		},
		async toggleMenu() {
			if (!this.open)
				await this.calculatePosition();
			this.open = !this.open;
		},
		close() {
			this.open = false;
		},
		getOpen(e) {
			if ((this.$data.sidebar === 'default' || this.$data.sidebar === 'large') && this.$data.layout !== 'horizontal') {
				if (e.target.closest("#main-sidebar"))
					return false;
				if (!this.$refs.button.contains(e.target))
					return true;
			}
			return false;
		},
		getTopRight(buttonRect, dropdown) {
			let data = {
				left: 0,
				top: 0
			};
			if (window.innerWidth < buttonRect.right + dropdown.offsetWidth) {
				data.top = buttonRect.top;
				data.left = buttonRect.left - dropdown.clientWidth;
			}
			if (window.innerHeight < buttonRect.top + dropdown.offsetHeight && dropdown.hasAttribute('data-parent-yes')) {
				data.top = window.innerHeight - dropdown.offsetHeight;
				data.left = buttonRect.right;
			} else if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
				data.top = (buttonRect.bottom - dropdown.offsetHeight) - buttonRect.height;
				data.left = buttonRect.right - dropdown.clientWidth;
			}
			return data;
		},
		getLeft(buttonRect, dropdown) {
			let data = {
				left: 0,
				top: 0
			};
			if (window.innerWidth < buttonRect.right + dropdown.offsetWidth) {
				data.top = buttonRect.bottom;
				data.left = buttonRect.right - dropdown.clientWidth;
			}
			if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
				data.top = (buttonRect.bottom - dropdown.offsetHeight) - buttonRect.height;
				data.left = buttonRect.right - dropdown.clientWidth;
			}
			return data;
		},
		getRightLeft(buttonRect, dropdown) {
			let data = {
				left: 0,
				top: 0
			};
			if (buttonRect.x - dropdown.offsetWidth < 0) {
				data.top = buttonRect.bottom;
				data.left = buttonRect.left;
			}
			if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
				data.top = buttonRect.top - dropdown.clientHeight;
				data.left = buttonRect.left;
			}
			return data;
		},
		async calculatePosition() {
			if (!this.$refs.button || !this.$refs.dropdown) return false;

			const buttonRect = this.$refs.button.parentElement
				? this.$refs.button.parentElement.getBoundingClientRect()
				: this.$refs.button.getBoundingClientRect();
			const dropdown = this.$refs.dropdown;
			const position = dropdown.getAttribute("dropdown-position") || 'left';
			dropdown.classList.remove("hidden");
			dropdown.style.display = "block";
			let left = 0, top = 0;

			switch (position) {
				case 'left':
					const data = this.getLeft(buttonRect, dropdown);
					top = data.top || buttonRect.bottom;
					left = data.left || buttonRect.left;
					break;
				case 'right':
					const data1 = this.getRightLeft(buttonRect, dropdown);
					top = data1.top || buttonRect.bottom;
					left = data1.left || (buttonRect.right - dropdown.clientWidth);
					break;
				case 'right-top':
					const data2 = this.getTopRight(buttonRect, dropdown);
					top = data2.top || buttonRect.top;
					left = data2.left || buttonRect.right;
					break;
				case 'left-top':
					const data3 = this.getRightLeft(buttonRect, dropdown);
					top = data3.top || buttonRect.top;
					left = data3.left || buttonRect.left - dropdown.offsetWidth;
					break;
				default:
					const data4 = this.getLeft(buttonRect, dropdown);
					top = data4.top || buttonRect.bottom;
					left = data4.left || buttonRect.left;
					break;
			}
			dropdown.style.left = `${Math.max(0, left)}px`;
			dropdown.style.top = `${Math.max(0, top)}px`;
			dropdown.style.display = "none";
		},
		async scrollToActive() {
			await delayFun(0);
			const container = document.querySelector('#sidebar');
			const activeElements = container.getElementsByClassName('active');

			if (activeElements.length > 0) {
				setTimeout(() => {
					activeElements[activeElements.length - 1].scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}, 100); // Adjust the delay as needed
			}
		},
		async initializeDropdownActive() {
			if (currentPath) {
				await delayFun(100);
				const matchingLink = this.$refs?.dropdown?.querySelector(`a[href="${currentPath}"]`);
				if (matchingLink) {
					matchingLink.classList.add('active');
					this.$refs?.button.classList.add('active');
					if (this.layout !== 'horizontal' && this.sidebar !== 'small') this.open = true;

					this.calculatePosition();

					let parentElement = matchingLink.closest('.dropdown-menu');
					while (parentElement && parentElement !== this.$refs.dropdown) {
						parentElement?.click();
						parentElement = parentElement.parentElement.closest('.dropdown-menu');
					}
					this.scrollToActive();
				} else {
					const matchingLinkButton = this.$refs?.navLink;
					if (matchingLinkButton && matchingLinkButton.getAttribute('href') == currentPath) {
						matchingLinkButton.classList.add('active');
						this.scrollToActive();
					}
				}
			}
		},
	};
}

function layoutSettings() {
	return {
		layout: sessionStorage.getItem('layout') || document.documentElement.getAttribute('data-layout') || 'default', // ['default', 'horizontal', 'modern', 'boxed', 'semibox']
		navType: sessionStorage.getItem('navType') || (document.documentElement.getAttribute('data-nav-type') || 'default'), // ['default', 'floating', 'boxed', 'pattern']
		contentWidth: sessionStorage.getItem('contentWidth') || (document.documentElement.getAttribute('data-content-width') || 'default'), //  ['default', 'fluid']
		layoutMode: sessionStorage.getItem('layoutMode') || (document.documentElement.getAttribute('data-mode') || 'light'), // ['light', 'dark', 'auto', 'black-white']
		curLayoutMode: sessionStorage.getItem('curLayoutMode') || (document.documentElement.getAttribute('data-mode') || 'light'), // ['light', 'dark', 'auto', 'black-white']
		sidebar: sessionStorage.getItem('sidebar') || (document.documentElement.getAttribute('data-sidebar') || 'large'), // ['large', 'small', 'medium']
		sidebarColors: sessionStorage.getItem('sidebarColors') || (document.documentElement.getAttribute('data-sidebar-colors') || 'light'), // ['light', 'purple', 'dark', 'brand', 'sky']
		layoutDir: sessionStorage.getItem('layoutDir') || (document.documentElement.getAttribute('dir') || 'ltr'), // ['ltr', 'rtl']
		primaryColors: sessionStorage.getItem('colors') || (document.documentElement.getAttribute('data-colors') || 'default'), // ['default', 'purple', 'green', 'orange']
		darkModeColors: sessionStorage.getItem('darkModeColors') || '', // ['', 'gray', 'stone', 'zinc', 'neutral]
		backdrop: document.getElementById('backdrop'),
		sidebarMainDiv: document.getElementById('main-sidebar'),
		languages: {},

		// language translation data
		currentLang: sessionStorage.getItem('language') || 'en', // Default language
		languageData: {},

		navTypeOld: this.navType || 'default',
		sidebarOld: this.sidebar || 'default',
		sidebarColorsOld: this.sidebarColors || 'light',
		darkModeColorsOld: this.darkModeColors || '',

		/**
		 * Initialize the layout settings by fetching the language data and updating the attributes.
		 * Also, it sets an event listener for the window resize event to toggle the sidebar.
		 * If the layout mode is dark, it sets the dark mode color to the one stored in the local storage.
		 */
		initialize() {
			if (this.layoutMode == 'dark') {
				this.darkModeColors = sessionStorage.getItem('darkModeColors') || this.getColor();
				this.darkModeColorsOld = this.darkModeColors;
			} else {
				this.darkModeColors = '';
			}
			this.fetchLanguage();
			this.updateAttributes(true);
			const backdrop = document.querySelector('#backdrop');
			if (backdrop) {
				let resizeTimeout;
				window.addEventListener('resize', () => {
					if (resizeTimeout) clearTimeout(resizeTimeout);
					resizeTimeout = setTimeout(() => {
						this.toggleSidebar(true);
					}, 150);
				});
			}
		},
		getColor() {
			const colorClasses = ['gray', 'stone', 'zinc', 'neutral'];
			for (let color of colorClasses) {
				if (document.documentElement.classList.contains(colorClasses))
					return color;
			}
			return null;
		},
		updateAttributes(isResize = null) {
			const documentElement = document.documentElement;
			documentElement.setAttribute('data-layout', this.layout);
			documentElement.setAttribute('data-content-width', this.contentWidth);
			if (this.curLayoutMode == 'auto')
				this.setAutoLayout();
			documentElement.setAttribute('data-mode', this.layoutMode);
			if (this.layout !== 'horizontal')
				this.sidebarColors ? documentElement.setAttribute('data-sidebar-colors', this.sidebarColors) : documentElement.removeAttribute('data-sidebar-colors');
			else
				documentElement.removeAttribute('data-sidebar-colors')
			this.sidebar ? documentElement.setAttribute('data-sidebar', this.sidebar) : documentElement.removeAttribute('data-sidebar');
			this.navType ? documentElement.setAttribute('data-nav-type', this.navType) : documentElement.removeAttribute('data-nav-type');
			documentElement.setAttribute('dir', this.layoutDir);
			documentElement.setAttribute('data-colors', this.primaryColors);
			if (this.darkModeColors) documentElement.classList.add(this.darkModeColors);

			// Save settings to sessionStorage
			sessionStorage.setItem('layout', this.layout);
			sessionStorage.setItem('navType', this.navType);
			sessionStorage.setItem('contentWidth', this.contentWidth);
			sessionStorage.setItem('layoutMode', this.layoutMode);
			sessionStorage.setItem('sidebar', this.sidebar);
			sessionStorage.setItem('layoutDir', this.layoutDir);
			sessionStorage.setItem('sidebarColors', this.sidebarColors);
			sessionStorage.setItem('colors', this.primaryColors);
			if (this.darkModeColors) sessionStorage.setItem('darkModeColors', this.darkModeColors);
			if (isResize) {
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'));
				}, 100)
			}
		},
		setLayout(newLayout) {
			this.layout = newLayout;
			if (newLayout === 'horizontal') {
				this.navTypeOld = this.navType || 'default';
				this.sidebarOld = this.sidebar || 'default';
				this.sidebarColorsOld = this.sidebarColors || 'light';
				this.sidebarColors = '';
				this.navType = '';
				this.sidebar = '';
			} else if (newLayout === 'default') {
				if (this.navType != '') this.navTypeOld = this.navType;
				this.navType = '';
				this.sidebar = (this.sidebar != '') ? this.sidebar : this.sidebarOld;
				this.sidebarColors = (this.sidebarColors != '') ? this.sidebarColors : this.sidebarColorsOld;
			} else if (newLayout === 'modern') {
				this.navType = (this.navType != '') ? this.navType : this.navTypeOld;
				this.sidebar = (this.sidebar != '') ? this.sidebar : this.sidebarOld;
				this.sidebarColors = (this.sidebarColorsOld != '') ? this.sidebarColorsOld : this.sidebarColors;
			} else if (newLayout === 'boxed') {
				if (this.navType != '') this.navTypeOld = this.navType;
				this.navType = '';
				this.sidebar = (this.sidebar != '') ? this.sidebar : this.sidebarOld;
				this.sidebarColors = (this.sidebarColorsOld != '') ? this.sidebarColorsOld : this.sidebarColors;
			} else if (newLayout === 'semibox') {
				if (this.navType != '') this.navTypeOld = this.navType;
				this.navType = '';
				this.sidebar = (this.sidebar != '') ? this.sidebar : this.sidebarOld;
				this.sidebarColors = (this.sidebarColorsOld != '') ? this.sidebarColorsOld : this.sidebarColors;
			} else {
				this.navType = this.navTypeOld;
				this.sidebar = this.sidebarOld;
			}
			this.updateAttributes();
		},
		setNavigation(newNavType) {
			this.navType = newNavType;
			this.updateAttributes();
		},
		setContentWidth(newContentWidth) {
			this.contentWidth = newContentWidth;
			this.updateAttributes();
		},
		setSidebar(newSidebar) {
			this.sidebar = newSidebar;
			this.updateAttributes();
		},
		setDirection(newLayoutDir) {
			this.layoutDir = newLayoutDir;
			this.updateAttributes();
		},
		setAutoLayout() {
			const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			if (colorSchemeMediaQuery.matches)
				this.layoutMode = "dark";
		},
		setLayoutMode(newLayoutMode) {
			this.layoutMode = newLayoutMode;
			this.curLayoutMode = newLayoutMode;
			sessionStorage.setItem('curLayoutMode', newLayoutMode)
			if (newLayoutMode == 'auto') {
				this.setAutoLayout();
				return false;
			}
			if (newLayoutMode !== 'dark') {
				if (this.darkModeColors)
					document.documentElement.classList.remove(this.darkModeColors);
				this.darkModeColors = '';
				this.sidebarColors = this.sidebarColorsOld ?? 'light';
			} else {
				this.sidebarColorsOld = this.sidebarColors;
				this.sidebarColors = "light";
				if (this.darkModeColorsOld) {
					this.darkModeColors = this.darkModeColorsOld;
					document.documentElement.classList.add(this.darkModeColorsOld); // manage reset time remove color class
				} else {
					this.darkModeColors = this.darkModeColorsOld = 'default';
				}
			}
			this.updateAttributes(true);
		},
		setDarkModeColors(newDarkModeColors) { // only for dark modes
			if (this.darkModeColorsOld) document.documentElement.classList.remove(this.darkModeColorsOld);
			if (this.darkModeColors) document.documentElement.classList.remove(this.darkModeColors);
			this.darkModeColorsOld = this.darkModeColors = newDarkModeColors;
			this.updateAttributes(true);
		},
		setSidebarColors(newSidebarColors) {
			this.sidebarColors = newSidebarColors;
			this.updateAttributes();
		},
		setPrimaryColors(newColors) {
			this.primaryColors = newColors;
			this.updateAttributes(true);
		},
		toggleSidebar(isResize = false) {
			const isSmallScreen = window.innerWidth < 1024;
			if (isResize) {
				if (isSmallScreen) {
					this.backdrop.classList.add('hidden');
					this.sidebarMainDiv.classList.add('hidden');
				} else {
					this.backdrop.classList.remove('hidden');
					this.sidebarMainDiv.classList.remove('hidden');
				}
			} else {
				if (isSmallScreen) {
					const isHidden = this.backdrop.classList.contains('hidden');
					this.backdrop.classList.toggle('hidden', !isHidden);
					this.sidebarMainDiv.classList.toggle('hidden', !isHidden);
				} else {
					this.sidebar = (this.sidebar === 'small') ? 'large' : 'small';
					this.updateAttributes();
				}
			}
		},
		getFlag() {
			let flag = this.languages[this.currentLang].flag;
			if (flag) return flag;
			return this.languages['en'].flag;
		},
		fetchLanguage() {
			this.languages = {
				en: { id: 'us', flag: us, name: 'English' },
			}
			return fetch(`./assets/lang/${this.currentLang}.json`)
				.then(response => response.json())
				.then(data => {
					this.languageData = data;
					return data;
				})
				.catch(error => console.log('Error loading menu:', error));
		},
		updateLanguage(lang) {
			if (lang !== this.currentLang) {
				this.currentLang = lang;
				sessionStorage.setItem('language', lang);
				this.fetchLanguage();
			}
			this.open = false;
		},
		resetAttributes() {
			this.layout = '';
			this.navType = '';
			this.contentWidth = '';
			this.layoutMode = '';
			this.sidebar = '';
			this.sidebarColors = '';
			this.layoutDir = '';
			this.primaryColors = '';
			this.darkModeColors = '';
			sessionStorage.clear();
			window.location.reload();
		}
	};
}

// Initialize Alpine.js
window.onload = function () {
	window.Alpine.start();
}