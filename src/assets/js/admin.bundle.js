/*
Template Name: 파트너잇 - 새로운 공고 매칭의 시작
Author: 파트너잇
Version: 1.0.0
File: admin bundle Js File
*/

import Alpine from 'alpinejs';
import menu from './menu.js';
import Tooltip from "@ryangjchandler/alpine-tooltip";
import masonry from 'alpinejs-masonry';
import lucide from "lucide/dist/umd/lucide.js";

window.menu = menu;
window.lucide = lucide;
Alpine.plugin(masonry)
Alpine.plugin(Tooltip);
window.Alpine = Alpine;

import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';

import 'simplebar';

lucide?.createIcons();

//counter number
function animatedCounter(target, time = 200, start = 0) {
    return {
        current: 0,
        target: target,
        time: time,
        start: start,
        updateCounter: function () {
            start = this.start;
            const increment = (this.target - start) / this.time;
            const handle = setInterval(() => {
                if (this.current < this.target)
                    this.current += increment
                else {
                    clearInterval(handle);
                    this.current = this.target
                }
            }, 1);
        }
    };
}

document.addEventListener('alpine:init', () => {
    Alpine.data('animatedCounter', animatedCounter);
});
