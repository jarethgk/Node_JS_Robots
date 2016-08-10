'use strict';

/* Animations */

angular.module('animations.samples', [])
    .animation('.fader', function() {
        return {
            beforeAddClass: function(element, className, done) { //before adding ng-hide
                var attrs = angular.fromJson(element.attr('data-ng-animation')) || {};
                TweenMax.fromTo(
                    element, 
                    ( attrs.timeOut || attrs.time || 0.5 ), 
                    { opacity: /ng-hide/.test(className) ? 1 : 0 },
                    { opacity: /ng-hide/.test(className) ? 0 : 1, 
                      onComplete: done
                    }
                );
                return function(cancelled) {
                    if(cancelled)
                        TweenMax.killTweensOf(element);
                };
            },
            removeClass: function(element, className, done) { //after removing ng-hide
                var attrs = angular.fromJson(element.attr('data-ng-animation')) || {};
                TweenMax.fromTo(
                    element, 
                    ( attrs.timeIn || attrs.time || 0.5 ), 
                    { opacity: /ng-hide/.test(className) ? 0 : 1 },
                    { opacity: /ng-hide/.test(className) ? 1 : 0, 
                      onComplete: done
                    }
                );
                return function(cancelled) {
                    if(cancelled)
                        TweenMax.killTweensOf(element);
                };
            }
        };
    })
    .animation('.left-in', function() {
        return {
            beforeAddClass: function(element, className, done) { //before adding ng-hide
                if(/ng-hide/.test(className)) {
                    element = element[0];
                    TweenMax.fromTo(element, 0.5, {left: 0}, {left:-element.offsetWidth, onComplete: done});
                } else done();
                return function(cancelled) {
                    if(cancelled)
                        TweenMax.killTweensOf(element);
                };
            },
            removeClass: function(element, className, done) { //after removing ng-hide
                if(/ng-hide/.test(className)) {
                    element = element[0];
                    TweenMax.fromTo(element, 0.5, {left:-element.offsetWidth}, {left: 0, onComplete: done});
                } else done();
                return function(cancelled) {
                    if(cancelled)
                        TweenMax.killTweensOf(element);
                };
            }
        }
    })
    .animation('.right-in', function() {
        return {
            beforeAddClass: function(element, className, done) { //before adding ng-hide
                if(/ng-hide/.test(className)) {;
                    element = element[0];
                    TweenMax.fromTo(element, 0.5, {right: 0}, {right:-element.offsetWidth, onComplete: done});
                } else done();
                return function(cancelled) {
                    if(cancelled)
                        TweenMax.killTweensOf(element);
                };
            },
            removeClass: function(element, className, done) { //after removing ng-hide
                if(/ng-hide/.test(className)) {
                    element = element[0];
                    TweenMax.fromTo(element, 0.5, {right:-element.offsetWidth}, {right: 0, onComplete: done});
                } else done();
                return function(cancelled) {
                    if(cancelled)
                        TweenMax.killTweensOf(element);
                };
            }
        }
    });