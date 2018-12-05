! function(i) {
    var n = new Array,
        o = new Array,
        r = function() {},
        e = 0,
        a = {
            splashVPos: "35%",
            loaderVPos: "75%",
            splashID: "#jpreContent",
            showSplash: !0,
            showPercentage: !0,
            autoClose: !0,
            closeBtnText: "Start!",
            onetimeLoad: !1,
            debugMode: !1,
            splashFunction: function() {}
        },
        s = function(t) {
            var e = new Image;
            i(e).load(function() {
                l()
            }).error(function() {
                o.push(i(this).attr("src")), l()
            }).attr("src", t)
        },
        l = function() {
            e++;
            var t = Math.round(e / n.length * 100);
            if (i(jBar).stop().animate({
                    width: t + "%"
                }, 500, "linear"), a.showPercentage && i(jPer).text(t + "%"), e >= n.length) {
                if (e = n.length, function(t) {
                        if (a.onetimeLoad) {
                            var e = new Date;
                            e.setDate(e.getDate() + t);
                            var i = null == t ? "" : "expires=" + e.toUTCString();
                            document.cookie = "jpreLoader=loaded; " + i
                        }
                    }(), a.showPercentage && i(jPer).text("100%"), a.debugMode) c();
                i(jBar).stop().animate({
                    width: "100%"
                }, 500, "linear", function() {
                    a.autoClose ? d() : i(jButton).fadeIn(1e3)
                })
            }
        },
        d = function() {
            i(jOverlay).fadeOut(800, function() {
                i(jOverlay).remove(), r()
            })
        },
        c = function() {
            if (0 < o.length) {
                o.length + " image files cound not be found. \n\r", "Please check your image paths and filenames:\n\r";
                for (var t = 0; t < o.length; t++) "- " + o[t] + "\n\r";
                return !0
            }
            return !1
        };
    i.fn.jpreLoader = function(t, e) {
        return t && i.extend(a, t), "function" == typeof e && (r = e), i("body").css({
            display: "block"
        }), this.each(function() {
            ! function() {
                if (a.onetimeLoad) {
                    for (var t, e = document.cookie.split("; "), i = 0; t = e[i] && e[i].split("="); i++)
                        if ("jpreLoader" === t.shift()) return t.join("=");
                    return !1
                }
                return !1
            }() ? (function() {
                if (jOverlay = i("<div></div>").attr("id", "jpreOverlay").css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 9999999
                    }).appendTo("body"), a.showSplash) {
                    jContent = i("<div></div>").attr("id", "jpreSlide").appendTo(jOverlay);
                    var t = i(window).width() - i(jContent).width();
                    i(jContent).css({
                        position: "absolute",
                        top: a.splashVPos,
                        left: Math.round(50 / i(window).width() * t) + "%"
                    }), i(jContent).html(i(a.splashID).wrap("<div/>").parent().html()), i(a.splashID).remove(), a.splashFunction()
                }
                jLoader = i("<div></div>").attr("id", "jpreLoader").appendTo(jOverlay);
                var e = i(window).width() - i(jLoader).width();
                i(jLoader).css({
                    position: "absolute",
                    top: a.loaderVPos,
                    left: Math.round(50 / i(window).width() * e) + "%"
                }), jBar = i("<div></div>").attr("id", "jpreBar").css({
                    width: "0%",
                    height: "100%"
                }).appendTo(jLoader), a.showPercentage && (jPer = i("<div></div>").attr("id", "jprePercentage").css({
                    position: "relative",
                    height: "100%"
                }).appendTo(jLoader).html("0%")), a.autoclose || (jButton = i("<div></div>").attr("id", "jpreButton").on("click", function() {
                    d()
                }).css({
                    position: "relative",
                    height: "100%"
                }).appendTo(jLoader).text(a.closeBtnText).hide())
            }(), i(this).find("*:not(script)").each(function() {
                var t = ""; - 1 == i(this).css("background-image").indexOf("none") && -1 == i(this).css("background-image").indexOf("-gradient") && -1 == i(this).css("background-image").indexOf("svg") ? -1 != (t = i(this).css("background-image")).indexOf("url") && (t = t.match(/url\((.*?)\)/)[1].replace(/\"/g, "")) : "img" == i(this).get(0).nodeName.toLowerCase() && void 0 !== i(this).attr("src") && (t = i(this).attr("src")), 0 < t.length && n.push(t)
            }), function() {
                for (var t = 0; t < n.length; t++) s(n[t])
            }()) : (i(a.splashID).remove(), r())
        })
    }
}(jQuery),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(d) {
    "use strict";
    var o, a = window.Slick || {};
    o = 0, (a = function(t, e) {
        var i, n = this;
        n.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: d(t),
            appendDots: d(t),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
            nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(t, e) {
                return d('<button type="button" data-role="none" role="button" tabindex="0" />').text(e + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, d.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = d(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, i = d(t).data("slick") || {}, n.options = d.extend({}, n.defaults, e, i), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = d.proxy(n.autoPlay, n), n.autoPlayClear = d.proxy(n.autoPlayClear, n), n.autoPlayIterator = d.proxy(n.autoPlayIterator, n), n.changeSlide = d.proxy(n.changeSlide, n), n.clickHandler = d.proxy(n.clickHandler, n), n.selectHandler = d.proxy(n.selectHandler, n), n.setPosition = d.proxy(n.setPosition, n), n.swipeHandler = d.proxy(n.swipeHandler, n), n.dragHandler = d.proxy(n.dragHandler, n), n.keyHandler = d.proxy(n.keyHandler, n), n.instanceUid = o++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, a.prototype.addSlide = a.prototype.slickAdd = function(t, e, i) {
        var n = this;
        if ("boolean" == typeof e) i = e, e = null;
        else if (e < 0 || e >= n.slideCount) return !1;
        n.unload(), "number" == typeof e ? 0 === e && 0 === n.$slides.length ? d(t).appendTo(n.$slideTrack) : i ? d(t).insertBefore(n.$slides.eq(e)) : d(t).insertAfter(n.$slides.eq(e)) : !0 === i ? d(t).prependTo(n.$slideTrack) : d(t).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(t, e) {
            d(e).attr("data-slick-index", t)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, a.prototype.animateHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({
                height: e
            }, t.options.speed)
        }
    }, a.prototype.animateSlide = function(t, e) {
        var i = {},
            n = this;
        n.animateHeight(), !0 === n.options.rtl && !1 === n.options.vertical && (t = -t), !1 === n.transformsEnabled ? !1 === n.options.vertical ? n.$slideTrack.animate({
            left: t
        }, n.options.speed, n.options.easing, e) : n.$slideTrack.animate({
            top: t
        }, n.options.speed, n.options.easing, e) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), d({
            animStart: n.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function(t) {
                t = Math.ceil(t), !1 === n.options.vertical ? i[n.animType] = "translate(" + t + "px, 0px)" : i[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(i)
            },
            complete: function() {
                e && e.call()
            }
        })) : (n.applyTransition(), t = Math.ceil(t), !1 === n.options.vertical ? i[n.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[n.animType] = "translate3d(0px," + t + "px, 0px)", n.$slideTrack.css(i), e && setTimeout(function() {
            n.disableTransition(), e.call()
        }, n.options.speed))
    }, a.prototype.getNavTarget = function() {
        var t = this.options.asNavFor;
        return t && null !== t && (t = d(t).not(this.$slider)), t
    }, a.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = d(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, a.prototype.applyTransition = function(t) {
        var e = this,
            i = {};
        !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, a.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, a.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, a.prototype.autoPlayIterator = function() {
        var t = this,
            e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
    }, a.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = d(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = d(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, a.prototype.buildDots = function() {
        var t, e, i = this;
        if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"), e = d("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) e.append(d("<li />").append(i.options.customPaging.call(this, i, t)));
            i.$dots = e.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, a.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, e) {
            d(e).attr("data-slick-index", t).data("originalStyling", d(e).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? d('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (!0 === t.options.centerMode || !0 === t.options.swipeToSlide) && (t.options.slidesToScroll = 1), d("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, a.prototype.buildRows = function() {
        var t, e, i, n, o, r, a, s = this;
        if (n = document.createDocumentFragment(), r = s.$slider.children(), 1 < s.options.rows) {
            for (a = s.options.slidesPerRow * s.options.rows, o = Math.ceil(r.length / a), t = 0; t < o; t++) {
                var l = document.createElement("div");
                for (e = 0; e < s.options.rows; e++) {
                    var d = document.createElement("div");
                    for (i = 0; i < s.options.slidesPerRow; i++) {
                        var c = t * a + (e * s.options.slidesPerRow + i);
                        r.get(c) && d.appendChild(r.get(c))
                    }
                    l.appendChild(d)
                }
                n.appendChild(l)
            }
            s.$slider.empty().append(n), s.$slider.children().children().children().css({
                width: 100 / s.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, a.prototype.checkResponsive = function(t, e) {
        var i, n, o, r = this,
            a = !1,
            s = r.$slider.width(),
            l = window.innerWidth || d(window).width();
        if ("window" === r.respondTo ? o = l : "slider" === r.respondTo ? o = s : "min" === r.respondTo && (o = Math.min(l, s)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            for (i in n = null, r.breakpoints) r.breakpoints.hasOwnProperty(i) && (!1 === r.originalSettings.mobileFirst ? o < r.breakpoints[i] && (n = r.breakpoints[i]) : o > r.breakpoints[i] && (n = r.breakpoints[i]));
            null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || e) && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = d.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = n) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = d.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), a = n), t || !1 === a || r.$slider.trigger("breakpoint", [r, a])
        }
    }, a.prototype.changeSlide = function(t, e) {
        var i, n, o = this,
            r = d(t.currentTarget);
        switch (r.is("a") && t.preventDefault(), r.is("li") || (r = r.closest("li")), i = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, t.data.message) {
            case "previous":
                n = 0 === i ? o.options.slidesToScroll : o.options.slidesToShow - i, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - n, !1, e);
                break;
            case "next":
                n = 0 === i ? o.options.slidesToScroll : i, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + n, !1, e);
                break;
            case "index":
                var a = 0 === t.data.index ? 0 : t.data.index || r.index() * o.options.slidesToScroll;
                o.slideHandler(o.checkNavigable(a), !1, e), r.children().trigger("focus");
                break;
            default:
                return
        }
    }, a.prototype.checkNavigable = function(t) {
        var e, i;
        if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
        else
            for (var n in e) {
                if (t < e[n]) {
                    t = i;
                    break
                }
                i = e[n]
            }
        return t
    }, a.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && d("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", d.proxy(t.interrupt, t, !0)).off("mouseleave.slick", d.proxy(t.interrupt, t, !1)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), d(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && d(t.$slideTrack).children().off("click.slick", t.selectHandler), d(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), d(window).off("resize.slick.slick-" + t.instanceUid, t.resize), d("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), d(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), d(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, a.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", d.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", d.proxy(t.interrupt, t, !1))
    }, a.prototype.cleanUpRows = function() {
        var t;
        1 < this.options.rows && ((t = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(t))
    }, a.prototype.clickHandler = function(t) {
        !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, a.prototype.destroy = function(t) {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), d(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"))
        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), e.unslicked = !0, t || e.$slider.trigger("destroy", [e])
    }, a.prototype.disableTransition = function(t) {
        var e = {};
        e[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(e) : this.$slides.eq(t).css(e)
    }, a.prototype.fadeSlide = function(t, e) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, a.prototype.fadeSlideOut = function(t) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, a.prototype.filterSlides = a.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, a.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(t) {
            t.stopImmediatePropagation();
            var e = d(this);
            setTimeout(function() {
                i.options.pauseOnFocus && (i.focussed = e.is(":focus"), i.autoPlay())
            }, 0)
        })
    }, a.prototype.getCurrent = a.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, a.prototype.getDotCount = function() {
        var t = this,
            e = 0,
            i = 0,
            n = 0;
        if (!0 === t.options.infinite)
            for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else if (!0 === t.options.centerMode) n = t.slideCount;
        else if (t.options.asNavFor)
            for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
        return n - 1
    }, a.prototype.getLeft = function(t) {
        var e, i, n, o = this,
            r = 0;
        return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, r = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (r = o.slideOffset = 0), !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + r, !0 === o.options.variableWidth && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === o.options.centerMode && (n = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? n[0] ? -1 * (o.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, e += (o.$list.width() - n.outerWidth()) / 2)), e
    }, a.prototype.getOption = a.prototype.slickGetOption = function(t) {
        return this.options[t]
    }, a.prototype.getNavigableIndexes = function() {
        var t, e = this,
            i = 0,
            n = 0,
            o = [];
        for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, n = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) o.push(i), i = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return o
    }, a.prototype.getSlick = function() {
        return this
    }, a.prototype.getSlideCount = function() {
        var i, n, o = this;
        return n = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(t, e) {
            return e.offsetLeft - n + d(e).outerWidth() / 2 > -1 * o.swipeLeft ? (i = e, !1) : void 0
        }), Math.abs(d(i).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, a.prototype.goTo = a.prototype.slickGoTo = function(t, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e)
    }, a.prototype.init = function(t) {
        var e = this;
        d(e.$slider).hasClass("slick-initialized") || (d(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), t && e.$slider.trigger("init", [e]), !0 === e.options.accessibility && e.initADA(), e.options.autoplay && (e.paused = !1, e.autoPlay())
    }, a.prototype.initADA = function() {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            d(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + e.instanceUid + t
            })
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(t) {
            d(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + t,
                id: "slick-slide" + e.instanceUid + t
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, a.prototype.initArrowEvents = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, t.changeSlide))
    }, a.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && d("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && d("li", t.$dots).on("mouseenter.slick", d.proxy(t.interrupt, t, !0)).on("mouseleave.slick", d.proxy(t.interrupt, t, !1))
    }, a.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", d.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", d.proxy(t.interrupt, t, !1)))
    }, a.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), d(document).on(t.visibilityChange, d.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && d(t.$slideTrack).children().on("click.slick", t.selectHandler), d(window).on("orientationchange.slick.slick-" + t.instanceUid, d.proxy(t.orientationChange, t)), d(window).on("resize.slick.slick-" + t.instanceUid, d.proxy(t.resize, t)), d("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), d(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), d(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, a.prototype.initUI = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
    }, a.prototype.keyHandler = function(t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, a.prototype.lazyLoad = function() {
        function t(t) {
            d("img[data-lazy]", t).each(function() {
                var t = d(this),
                    e = d(this).attr("data-lazy"),
                    i = document.createElement("img");
                i.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        t.attr("src", e).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, t, e])
                    })
                }, i.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, t, e])
                }, i.src = e
            })
        }
        var e, i, n = this;
        !0 === n.options.centerMode ? !0 === n.options.infinite ? i = (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), i = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, i = Math.ceil(e + n.options.slidesToShow), !0 === n.options.fade && (0 < e && e--, i <= n.slideCount && i++)), t(n.$slider.find(".slick-slide").slice(e, i)), n.slideCount <= n.options.slidesToShow ? t(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? t(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && t(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, a.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(), t.$slideTrack.css({
            opacity: 1
        }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, a.prototype.next = a.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, a.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, a.prototype.pause = a.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, a.prototype.play = a.prototype.slickPlay = function() {
        var t = this;
        t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
    }, a.prototype.postSlide = function(t) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && e.initADA())
    }, a.prototype.prev = a.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, a.prototype.preventDefault = function(t) {
        t.preventDefault()
    }, a.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var e, i, n, o = this,
            r = d("img[data-lazy]", o.$slider);
        r.length ? (e = r.first(), i = e.attr("data-lazy"), (n = document.createElement("img")).onload = function() {
            e.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), !0 === o.options.adaptiveHeight && o.setPosition(), o.$slider.trigger("lazyLoaded", [o, e, i]), o.progressiveLazyLoad()
        }, n.onerror = function() {
            t < 3 ? setTimeout(function() {
                o.progressiveLazyLoad(t + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, e, i]), o.progressiveLazyLoad())
        }, n.src = i) : o.$slider.trigger("allImagesLoaded", [o])
    }, a.prototype.refresh = function(t) {
        var e, i, n = this;
        i = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > i && (n.currentSlide = i), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), e = n.currentSlide, n.destroy(!0), d.extend(n, n.initials, {
            currentSlide: e
        }), n.init(), t || n.changeSlide({
            data: {
                message: "index",
                index: e
            }
        }, !1)
    }, a.prototype.registerBreakpoints = function() {
        var t, e, i, n = this,
            o = n.options.responsive || null;
        if ("array" === d.type(o) && o.length) {
            for (t in n.respondTo = n.options.respondTo || "window", o)
                if (i = n.breakpoints.length - 1, e = o[t].breakpoint, o.hasOwnProperty(t)) {
                    for (; 0 <= i;) n.breakpoints[i] && n.breakpoints[i] === e && n.breakpoints.splice(i, 1), i--;
                    n.breakpoints.push(e), n.breakpointSettings[e] = o[t].settings
                }
            n.breakpoints.sort(function(t, e) {
                return n.options.mobileFirst ? t - e : e - t
            })
        }
    }, a.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && d(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, a.prototype.resize = function() {
        var t = this;
        d(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = d(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, a.prototype.removeSlide = a.prototype.slickRemove = function(t, e, i) {
        var n = this;
        return "boolean" == typeof t ? t = !0 === (e = t) ? 0 : n.slideCount - 1 : t = !0 === e ? --t : t, !(n.slideCount < 1 || t < 0 || t > n.slideCount - 1) && (n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit())
    }, a.prototype.setCSS = function(t) {
        var e, i, n = this,
            o = {};
        !0 === n.options.rtl && (t = -t), e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px", o[n.positionProp] = t, !1 === n.transformsEnabled || (!(o = {}) === n.cssTransitions ? o[n.animType] = "translate(" + e + ", " + i + ")" : o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)"), n.$slideTrack.css(o)
    }, a.prototype.setDimensions = function() {
        var t = this;
        !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, a.prototype.setFade = function() {
        var i, n = this;
        n.$slides.each(function(t, e) {
            i = n.slideWidth * t * -1, !0 === n.options.rtl ? d(e).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            }) : d(e).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            })
        }), n.$slides.eq(n.currentSlide).css({
            zIndex: n.options.zIndex - 1,
            opacity: 1
        })
    }, a.prototype.setHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, a.prototype.setOption = a.prototype.slickSetOption = function() {
        var t, e, i, n, o, r = this,
            a = !1;
        if ("object" === d.type(arguments[0]) ? (i = arguments[0], a = arguments[1], o = "multiple") : "string" === d.type(arguments[0]) && (i = arguments[0], n = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) r.options[i] = n;
        else if ("multiple" === o) d.each(i, function(t, e) {
            r.options[t] = e
        });
        else if ("responsive" === o)
            for (e in n)
                if ("array" !== d.type(r.options.responsive)) r.options.responsive = [n[e]];
                else {
                    for (t = r.options.responsive.length - 1; 0 <= t;) r.options.responsive[t].breakpoint === n[e].breakpoint && r.options.responsive.splice(t, 1), t--;
                    r.options.responsive.push(n[e])
                }
        a && (r.unload(), r.reinit())
    }, a.prototype.setPosition = function() {
        var t = this;
        t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, a.prototype.setProps = function() {
        var t = this,
            e = document.body.style;
        t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
    }, a.prototype.setSlideClasses = function(t) {
        var e, i, n, o, r = this;
        i = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(t).addClass("slick-current"), !0 === r.options.centerMode ? (e = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e <= t && t <= r.slideCount - 1 - e ? r.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = r.options.slidesToShow + t, i.slice(n - e + 1, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && i.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(t).addClass("slick-center")) : 0 <= t && t <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(t, t + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= r.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, n = !0 === r.options.infinite ? r.options.slidesToShow + t : t, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow ? i.slice(n - (r.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
    }, a.prototype.setupInfinite = function() {
        var t, e, i, n = this;
        if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (e = null, n.slideCount > n.options.slidesToShow)) {
            for (i = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, t = n.slideCount; t > n.slideCount - i; t -= 1) e = t - 1, d(n.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < i; t += 1) e = t, d(n.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "")
            })
        }
    }, a.prototype.interrupt = function(t) {
        t || this.autoPlay(), this.interrupted = t
    }, a.prototype.selectHandler = function(t) {
        var e = this,
            i = d(t.target).is(".slick-slide") ? d(t.target) : d(t.target).parents(".slick-slide"),
            n = parseInt(i.attr("data-slick-index"));
        return n || (n = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(n), void e.asNavFor(n)) : void e.slideHandler(n)
    }, a.prototype.slideHandler = function(t, e, i) {
        var n, o, r, a, s, l = null,
            d = this;
        return e = e || !1, !0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === t || d.slideCount <= d.options.slidesToShow ? void 0 : (!1 === e && d.asNavFor(t), n = t, l = d.getLeft(n), a = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? a : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (t < 0 || t > d.getDotCount() * d.options.slidesToScroll) ? void(!1 === d.options.fade && (n = d.currentSlide, !0 !== i ? d.animateSlide(a, function() {
            d.postSlide(n)
        }) : d.postSlide(n))) : !1 === d.options.infinite && !0 === d.options.centerMode && (t < 0 || t > d.slideCount - d.options.slidesToScroll) ? void(!1 === d.options.fade && (n = d.currentSlide, !0 !== i ? d.animateSlide(a, function() {
            d.postSlide(n)
        }) : d.postSlide(n))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), o = n < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + n : n >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : n - d.slideCount : n, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, o]), r = d.currentSlide, d.currentSlide = o, d.setSlideClasses(d.currentSlide), d.options.asNavFor && ((s = (s = d.getNavTarget()).slick("getSlick")).slideCount <= s.options.slidesToShow && s.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), !0 === d.options.fade ? (!0 !== i ? (d.fadeSlideOut(r), d.fadeSlide(o, function() {
            d.postSlide(o)
        })) : d.postSlide(o), void d.animateHeight()) : void(!0 !== i ? d.animateSlide(l, function() {
            d.postSlide(o)
        }) : d.postSlide(o))))
    }, a.prototype.startLoad = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, a.prototype.swipeDirection = function() {
        var t, e, i, n, o = this;
        return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && 0 <= n ? !1 === o.options.rtl ? "left" : "right" : n <= 360 && 315 <= n ? !1 === o.options.rtl ? "left" : "right" : 135 <= n && n <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? 35 <= n && n <= 135 ? "down" : "up" : "vertical"
    }, a.prototype.swipeEnd = function(t) {
        var e, i, n = this;
        if (n.dragging = !1, n.interrupted = !1, n.shouldClick = !(10 < n.touchObject.swipeLength), void 0 === n.touchObject.curX) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(e), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, a.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, a.prototype.swipeMove = function(t) {
        var e, i, n, o, r, a = this;
        return r = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || r && 1 !== r.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : t.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), !0 === a.options.verticalSwiping && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), "vertical" !== (i = a.swipeDirection()) ? (void 0 !== t.originalEvent && 4 < a.touchObject.swipeLength && t.preventDefault(), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + n * o : a.swipeLeft = e + n * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = e + n * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0)
    }, a.prototype.swipeStart = function(t) {
        var e, i = this;
        return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? !(i.touchObject = {}) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
    }, a.prototype.unfilterSlides = a.prototype.slickUnfilter = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, a.prototype.unload = function() {
        var t = this;
        d(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, a.prototype.unslick = function(t) {
        this.$slider.trigger("unslick", [this, t]), this.destroy()
    }, a.prototype.updateArrows = function() {
        var t = this;
        Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, a.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, a.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }, d.fn.slick = function() {
        var t, e, i = this,
            n = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            r = i.length;
        for (t = 0; t < r; t++)
            if ("object" == typeof n || void 0 === n ? i[t].slick = new a(i[t], n) : e = i[t].slick[n].apply(i[t].slick, o), void 0 !== e) return e;
        return i
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define([], function() {
        return t.svg4everybody = e()
    }) : "object" == typeof exports ? module.exports = e() : t.svg4everybody = e()
}(this, function() {
    function f(t, e) {
        if (e) {
            var i = document.createDocumentFragment(),
                n = !t.getAttribute("viewBox") && e.getAttribute("viewBox");
            n && t.setAttribute("viewBox", n);
            for (var o = e.cloneNode(!0); o.childNodes.length;) i.appendChild(o.firstChild);
            t.appendChild(i)
        }
    }

    function g(n) {
        n.onreadystatechange = function() {
            if (4 === n.readyState) {
                var i = n._cachedDocument;
                i || ((i = n._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = n.responseText, n._cachedTarget = {}), n._embeds.splice(0).map(function(t) {
                    var e = n._cachedTarget[t.id];
                    e || (e = n._cachedTarget[t.id] = i.getElementById(t.id)), f(t.svg, e)
                })
            }
        }, n.onreadystatechange()
    }
    return function(t) {
        var d, c = Object(t);
        d = "polyfill" in c ? c.polyfill : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537;
        var u = {},
            h = window.requestAnimationFrame || setTimeout,
            p = document.getElementsByTagName("use");
        d && function t() {
            for (var e = 0; e < p.length;) {
                var i = p[e],
                    n = i.parentNode;
                if (n && /svg/i.test(n.nodeName)) {
                    var o = i.getAttribute("xlink:href");
                    if (d && (!c.validate || c.validate(o, n, i))) {
                        n.removeChild(i);
                        var r = o.split("#"),
                            a = r.shift(),
                            s = r.join("#");
                        if (a.length) {
                            var l = u[a];
                            l || ((l = u[a] = new XMLHttpRequest).open("GET", a), l.send(), l._embeds = []), l._embeds.push({
                                svg: n,
                                id: s
                            }), g(l)
                        } else f(n, document.getElementById(s))
                    }
                } else ++e
            }
            h(t, 67)
        }()
    }
}),
function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Countdown = t()
    }
}(function() {
    return function r(a, s, l) {
        function d(i, t) {
            if (!s[i]) {
                if (!a[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (c) return c(i, !0);
                    var n = new Error("Cannot find module '" + i + "'");
                    throw n.code = "MODULE_NOT_FOUND", n
                }
                var o = s[i] = {
                    exports: {}
                };
                a[i][0].call(o.exports, function(t) {
                    var e = a[i][1][t];
                    return d(e || t)
                }, o, o.exports, r, a, s, l)
            }
            return s[i].exports
        }
        for (var c = "function" == typeof require && require, t = 0; t < l.length; t++) d(l[t]);
        return d
    }({
        1: [function(t, e, i) {
            var n = {
                date: "June 7, 2087 15:03:25",
                refresh: 1e3,
                offset: 0,
                onEnd: function() {},
                render: function(t) {
                    this.el.innerHTML = t.years + " years, " + t.days + " days, " + this.leadingZeros(t.hours) + " hours, " + this.leadingZeros(t.min) + " min and " + this.leadingZeros(t.sec) + " sec"
                }
            };
            e.exports = function(t, e) {
                this.el = t, this.options = {}, this.interval = !1, this.mergeOptions = function(t) {
                    for (var e in n) n.hasOwnProperty(e) && (this.options[e] = void 0 !== t[e] ? t[e] : n[e], "date" === e && "object" != typeof this.options.date && (this.options.date = new Date(this.options.date)), "function" == typeof this.options[e] && (this.options[e] = this.options[e].bind(this)));
                    "object" != typeof this.options.date && (this.options.date = new Date(this.options.date))
                }.bind(this), this.mergeOptions(e), this.getDiffDate = function() {
                    var t = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3,
                        e = {
                            years: 0,
                            days: 0,
                            hours: 0,
                            min: 0,
                            sec: 0,
                            millisec: 0
                        };
                    return t <= 0 ? this.interval && (this.stop(), this.options.onEnd()) : (31557600 <= t && (e.years = Math.floor(t / 31557600), t -= 365.25 * e.years * 86400), 86400 <= t && (e.days = Math.floor(t / 86400), t -= 86400 * e.days), 3600 <= t && (e.hours = Math.floor(t / 3600), t -= 3600 * e.hours), 60 <= t && (e.min = Math.floor(t / 60), t -= 60 * e.min), e.sec = Math.round(t), e.millisec = t % 1 * 1e3), e
                }.bind(this), this.leadingZeros = function(t, e) {
                    return e = e || 2, (t = String(t)).length > e ? t : (Array(e + 1).join("0") + t).substr(-e)
                }, this.update = function(t) {
                    return "object" != typeof t && (t = new Date(t)), this.options.date = t, this.render(), this
                }.bind(this), this.stop = function() {
                    return this.interval && (clearInterval(this.interval), this.interval = !1), this
                }.bind(this), this.render = function() {
                    return this.options.render(this.getDiffDate()), this
                }.bind(this), this.start = function() {
                    if (!this.interval) return this.render(), this.options.refresh && (this.interval = setInterval(this.render, this.options.refresh)), this
                }.bind(this), this.updateOffset = function(t) {
                    return this.options.offset = t, this
                }.bind(this), this.restart = function(t) {
                    return this.mergeOptions(t), this.interval = !1, this.start(), this
                }.bind(this), this.start()
            }
        }, {}],
        2: [function(t, e, i) {
            var o = t("./countdown.js"),
                r = "countdown";
            jQuery.fn.countdown = function(n) {
                return $.each(this, function(t, e) {
                    var i = $(e);
                    i.data(r) || (i.data("date") && (n.date = i.data("date")), i.data(r, new o(e, n)))
                })
            }, e.exports = o
        }, {
            "./countdown.js": 1
        }]
    }, {}, [2])(2)
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(0, function(i) {
    var a = function(t, a) {
            var i, e = document.createElement("canvas");
            t.appendChild(e), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(e);
            var o = e.getContext("2d");
            e.width = e.height = a.size;
            var n = 1;
            1 < window.devicePixelRatio && (n = window.devicePixelRatio, e.style.width = e.style.height = [a.size, "px"].join(""), e.width = e.height = a.size * n, o.scale(n, n)), o.translate(a.size / 2, a.size / 2), o.rotate((a.rotate / 180 - .5) * Math.PI);
            var r = (a.size - a.lineWidth) / 2;
            a.scaleColor && a.scaleLength && (r -= a.scaleLength + 2), Date.now = Date.now || function() {
                return +new Date
            };
            var s = function(t, e, i) {
                    var n = (i = Math.min(Math.max(-1, i || 0), 1)) <= 0;
                    o.beginPath(), o.arc(0, 0, r, 0, 2 * Math.PI * i, n), o.strokeStyle = t, o.lineWidth = e, o.stroke()
                },
                l = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                    window.setTimeout(t, 1e3 / 60)
                },
                d = function() {
                    a.scaleColor && function() {
                        var t, e;
                        o.lineWidth = 1, o.fillStyle = a.scaleColor, o.save();
                        for (var i = 24; 0 < i; --i) i % 6 == 0 ? (e = a.scaleLength, t = 0) : (e = .6 * a.scaleLength, t = a.scaleLength - e), o.fillRect(-a.size / 2 + t, 0, e, 1), o.rotate(Math.PI / 12);
                        o.restore()
                    }(), a.trackColor && s(a.trackColor, a.trackWidth || a.lineWidth, 1)
                };
            this.getCanvas = function() {
                return e
            }, this.getCtx = function() {
                return o
            }, this.clear = function() {
                o.clearRect(a.size / -2, a.size / -2, a.size, a.size)
            }, this.draw = function(t) {
                var e;
                a.scaleColor || a.trackColor ? o.getImageData && o.putImageData ? i ? o.putImageData(i, 0, 0) : (d(), i = o.getImageData(0, 0, a.size * n, a.size * n)) : (this.clear(), d()) : this.clear(), o.lineCap = a.lineCap, e = "function" == typeof a.barColor ? a.barColor(t) : a.barColor, s(e, a.lineWidth, t / 100)
            }.bind(this), this.animate = function(i, n) {
                var o = Date.now();
                a.onStart(i, n);
                var r = function() {
                    var t = Math.min(Date.now() - o, a.animate.duration),
                        e = a.easing(this, t, i, n - i, a.animate.duration);
                    this.draw(e), a.onStep(i, n, e), t >= a.animate.duration ? a.onStop(i, n) : l(r)
                }.bind(this);
                l(r)
            }.bind(this)
        },
        n = function(e, i) {
            var n = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(t, e, i, n, o) {
                    return (e /= o / 2) < 1 ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
                },
                onStart: function(t, e) {},
                onStep: function(t, e, i) {},
                onStop: function(t, e) {}
            };
            if (void 0 !== a) n.renderer = a;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                n.renderer = SVGRenderer
            }
            var o = {},
                r = 0,
                t = function() {
                    for (var t in this.el = e, this.options = o, n) n.hasOwnProperty(t) && (o[t] = i && void 0 !== i[t] ? i[t] : n[t], "function" == typeof o[t] && (o[t] = o[t].bind(this)));
                    "string" == typeof o.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[o.easing]) ? o.easing = jQuery.easing[o.easing] : o.easing = n.easing, "number" == typeof o.animate && (o.animate = {
                        duration: o.animate,
                        enabled: !0
                    }), "boolean" != typeof o.animate || o.animate || (o.animate = {
                        duration: 1e3,
                        enabled: o.animate
                    }), this.renderer = new o.renderer(e, o), this.renderer.draw(r), e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(t) {
                return t = parseFloat(t), o.animate.enabled ? this.renderer.animate(r, t) : this.renderer.draw(t), r = t, this
            }.bind(this), this.disableAnimation = function() {
                return o.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return o.animate.enabled = !0, this
            }, t()
        };
    i.fn.easyPieChart = function(e) {
        return this.each(function() {
            var t;
            i.data(this, "easyPieChart") || (t = i.extend({}, e, i(this).data()), i.data(this, "easyPieChart", new n(this, t)))
        })
    }
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(window.jQuery || window.Zepto)
}(function(c) {
    var u, n, h, o, p, e, l = "Close",
        d = "BeforeClose",
        f = "MarkupParse",
        g = "Open",
        m = ".mfp",
        v = "mfp-ready",
        i = "mfp-removing",
        a = "mfp-prevent-close",
        t = function() {},
        s = !!window.jQuery,
        y = c(window),
        b = function(t, e) {
            u.ev.on("mfp" + t + m, e)
        },
        x = function(t, e, i, n) {
            var o = document.createElement("div");
            return o.className = "mfp-" + t, i && (o.innerHTML = i), n ? e && e.appendChild(o) : (o = c(o), e && o.appendTo(e)), o
        },
        k = function(t, e) {
            u.ev.triggerHandler("mfp" + t, e), u.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), u.st.callbacks[t] && u.st.callbacks[t].apply(u, c.isArray(e) ? e : [e]))
        },
        w = function(t) {
            return t === e && u.currTemplate.closeBtn || (u.currTemplate.closeBtn = c(u.st.closeMarkup.replace("%title%", u.st.tClose)), e = t), u.currTemplate.closeBtn
        },
        r = function() {
            c.magnificPopup.instance || ((u = new t).init(), c.magnificPopup.instance = u)
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var t = navigator.appVersion;
            u.isLowIE = u.isIE8 = document.all && !document.addEventListener, u.isAndroid = /android/gi.test(t), u.isIOS = /iphone|ipad|ipod/gi.test(t), u.supportsTransition = function() {
                var t = document.createElement("p").style,
                    e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;)
                    if (e.pop() + "Transition" in t) return !0;
                return !1
            }(), u.probablyMobile = u.isAndroid || u.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), h = c(document), u.popupsCache = {}
        },
        open: function(t) {
            var e;
            if (!1 === t.isObj) {
                u.items = t.items.toArray(), u.index = 0;
                var i, n = t.items;
                for (e = 0; e < n.length; e++)
                    if ((i = n[e]).parsed && (i = i.el[0]), i === t.el[0]) {
                        u.index = e;
                        break
                    }
            } else u.items = c.isArray(t.items) ? t.items : [t.items], u.index = t.index || 0;
            if (!u.isOpen) {
                u.types = [], p = "", t.mainEl && t.mainEl.length ? u.ev = t.mainEl.eq(0) : u.ev = h, t.key ? (u.popupsCache[t.key] || (u.popupsCache[t.key] = {}), u.currTemplate = u.popupsCache[t.key]) : u.currTemplate = {}, u.st = c.extend(!0, {}, c.magnificPopup.defaults, t), u.fixedContentPos = "auto" === u.st.fixedContentPos ? !u.probablyMobile : u.st.fixedContentPos, u.st.modal && (u.st.closeOnContentClick = !1, u.st.closeOnBgClick = !1, u.st.showCloseBtn = !1, u.st.enableEscapeKey = !1), u.bgOverlay || (u.bgOverlay = x("bg").on("click" + m, function() {
                    u.close()
                }), u.wrap = x("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                    u._checkIfClose(t.target) && u.close()
                }), u.container = x("container", u.wrap)), u.contentContainer = x("content"), u.st.preloader && (u.preloader = x("preloader", u.container, u.st.tLoading));
                var o = c.magnificPopup.modules;
                for (e = 0; e < o.length; e++) {
                    var r = o[e];
                    r = r.charAt(0).toUpperCase() + r.slice(1), u["init" + r].call(u)
                }
                k("BeforeOpen"), u.st.showCloseBtn && (u.st.closeBtnInside ? (b(f, function(t, e, i, n) {
                    i.close_replaceWith = w(n.type)
                }), p += " mfp-close-btn-in") : u.wrap.append(w())), u.st.alignTop && (p += " mfp-align-top"), u.fixedContentPos ? u.wrap.css({
                    overflow: u.st.overflowY,
                    overflowX: "hidden",
                    overflowY: u.st.overflowY
                }) : u.wrap.css({
                    top: y.scrollTop(),
                    position: "absolute"
                }), (!1 === u.st.fixedBgPos || "auto" === u.st.fixedBgPos && !u.fixedContentPos) && u.bgOverlay.css({
                    height: h.height(),
                    position: "absolute"
                }), u.st.enableEscapeKey && h.on("keyup" + m, function(t) {
                    27 === t.keyCode && u.close()
                }), y.on("resize" + m, function() {
                    u.updateSize()
                }), u.st.closeOnContentClick || (p += " mfp-auto-cursor"), p && u.wrap.addClass(p);
                var a = u.wH = y.height(),
                    s = {};
                if (u.fixedContentPos && u._hasScrollBar(a)) {
                    var l = u._getScrollbarSize();
                    l && (s.marginRight = l)
                }
                u.fixedContentPos && (u.isIE7 ? c("body, html").css("overflow", "hidden") : s.overflow = "hidden");
                var d = u.st.mainClass;
                return u.isIE7 && (d += " mfp-ie7"), d && u._addClassToMFP(d), u.updateItemHTML(), k("BuildControls"), c("html").css(s), u.bgOverlay.add(u.wrap).prependTo(u.st.prependTo || c(document.body)), u._lastFocusedEl = document.activeElement, setTimeout(function() {
                    u.content ? (u._addClassToMFP(v), u._setFocus()) : u.bgOverlay.addClass(v), h.on("focusin" + m, u._onFocusIn)
                }, 16), u.isOpen = !0, u.updateSize(a), k(g), t
            }
            u.updateItemHTML()
        },
        close: function() {
            u.isOpen && (k(d), u.isOpen = !1, u.st.removalDelay && !u.isLowIE && u.supportsTransition ? (u._addClassToMFP(i), setTimeout(function() {
                u._close()
            }, u.st.removalDelay)) : u._close())
        },
        _close: function() {
            k(l);
            var t = i + " " + v + " ";
            if (u.bgOverlay.detach(), u.wrap.detach(), u.container.empty(), u.st.mainClass && (t += u.st.mainClass + " "), u._removeClassFromMFP(t), u.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                u.isIE7 ? c("body, html").css("overflow", "") : e.overflow = "", c("html").css(e)
            }
            h.off("keyup.mfp focusin" + m), u.ev.off(m), u.wrap.attr("class", "mfp-wrap").removeAttr("style"), u.bgOverlay.attr("class", "mfp-bg"), u.container.attr("class", "mfp-container"), !u.st.showCloseBtn || u.st.closeBtnInside && !0 !== u.currTemplate[u.currItem.type] || u.currTemplate.closeBtn && u.currTemplate.closeBtn.detach(), u.st.autoFocusLast && u._lastFocusedEl && c(u._lastFocusedEl).focus(), u.currItem = null, u.content = null, u.currTemplate = null, u.prevHeight = 0, k("AfterClose")
        },
        updateSize: function(t) {
            if (u.isIOS) {
                var e = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * e;
                u.wrap.css("height", i), u.wH = i
            } else u.wH = t || y.height();
            u.fixedContentPos || u.wrap.css("height", u.wH), k("Resize")
        },
        updateItemHTML: function() {
            var t = u.items[u.index];
            u.contentContainer.detach(), u.content && u.content.detach(), t.parsed || (t = u.parseEl(u.index));
            var e = t.type;
            if (k("BeforeChange", [u.currItem ? u.currItem.type : "", e]), u.currItem = t, !u.currTemplate[e]) {
                var i = !!u.st[e] && u.st[e].markup;
                k("FirstMarkupParse", i), u.currTemplate[e] = !i || c(i)
            }
            o && o !== t.type && u.container.removeClass("mfp-" + o + "-holder");
            var n = u["get" + e.charAt(0).toUpperCase() + e.slice(1)](t, u.currTemplate[e]);
            u.appendContent(n, e), t.preloaded = !0, k("Change", t), o = t.type, u.container.prepend(u.contentContainer), k("AfterChange")
        },
        appendContent: function(t, e) {
            (u.content = t) ? u.st.showCloseBtn && u.st.closeBtnInside && !0 === u.currTemplate[e] ? u.content.find(".mfp-close").length || u.content.append(w()) : u.content = t: u.content = "", k("BeforeAppend"), u.container.addClass("mfp-" + e + "-holder"), u.contentContainer.append(u.content)
        },
        parseEl: function(t) {
            var e, i = u.items[t];
            if (i.tagName ? i = {
                    el: c(i)
                } : (e = i.type, i = {
                    data: i,
                    src: i.src
                }), i.el) {
                for (var n = u.types, o = 0; o < n.length; o++)
                    if (i.el.hasClass("mfp-" + n[o])) {
                        e = n[o];
                        break
                    }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = e || u.st.type || "inline", i.index = t, i.parsed = !0, u.items[t] = i, k("ElementParse", i), u.items[t]
        },
        addGroup: function(e, i) {
            var t = function(t) {
                t.mfpEl = this, u._openClick(t, e, i)
            };
            i || (i = {});
            var n = "click.magnificPopup";
            i.mainEl = e, i.items ? (i.isObj = !0, e.off(n).on(n, t)) : (i.isObj = !1, i.delegate ? e.off(n).on(n, i.delegate, t) : (i.items = e).off(n).on(n, t))
        },
        _openClick: function(t, e, i) {
            if ((void 0 !== i.midClick ? i.midClick : c.magnificPopup.defaults.midClick) || !(2 === t.which || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey)) {
                var n = void 0 !== i.disableOn ? i.disableOn : c.magnificPopup.defaults.disableOn;
                if (n)
                    if (c.isFunction(n)) {
                        if (!n.call(u)) return !0
                    } else if (y.width() < n) return !0;
                t.type && (t.preventDefault(), u.isOpen && t.stopPropagation()), i.el = c(t.mfpEl), i.delegate && (i.items = e.find(i.delegate)), u.open(i)
            }
        },
        updateStatus: function(t, e) {
            if (u.preloader) {
                n !== t && u.container.removeClass("mfp-s-" + n), e || "loading" !== t || (e = u.st.tLoading);
                var i = {
                    status: t,
                    text: e
                };
                k("UpdateStatus", i), t = i.status, e = i.text, u.preloader.html(e), u.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), u.container.addClass("mfp-s-" + t), n = t
            }
        },
        _checkIfClose: function(t) {
            if (!c(t).hasClass(a)) {
                var e = u.st.closeOnContentClick,
                    i = u.st.closeOnBgClick;
                if (e && i) return !0;
                if (!u.content || c(t).hasClass("mfp-close") || u.preloader && t === u.preloader[0]) return !0;
                if (t === u.content[0] || c.contains(u.content[0], t)) {
                    if (e) return !0
                } else if (i && c.contains(document, t)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            u.bgOverlay.addClass(t), u.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), u.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (u.isIE7 ? h.height() : document.body.scrollHeight) > (t || y.height())
        },
        _setFocus: function() {
            (u.st.focus ? u.content.find(u.st.focus).eq(0) : u.wrap).focus()
        },
        _onFocusIn: function(t) {
            if (t.target !== u.wrap[0] && !c.contains(u.wrap[0], t.target)) return u._setFocus(), !1
        },
        _parseMarkup: function(o, t, e) {
            var r;
            e.data && (t = c.extend(e.data, t)), k(f, [o, t, e]), c.each(t, function(t, e) {
                if (void 0 === e || !1 === e) return !0;
                if (1 < (r = t.split("_")).length) {
                    var i = o.find(m + "-" + r[0]);
                    if (0 < i.length) {
                        var n = r[1];
                        "replaceWith" === n ? i[0] !== e[0] && i.replaceWith(e) : "img" === n ? i.is("img") ? i.attr("src", e) : i.replaceWith(c("<img>").attr("src", e).attr("class", i.attr("class"))) : i.attr(r[1], e)
                    }
                } else o.find(m + "-" + t).html(e)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === u.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), u.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return u.scrollbarSize
        }
    }, c.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(t, e) {
            return r(), (t = t ? c.extend(!0, {}, t) : {}).isObj = !0, t.index = e || 0, this.instance.open(t)
        },
        close: function() {
            return c.magnificPopup.instance && c.magnificPopup.instance.close()
        },
        registerModule: function(t, e) {
            e.options && (c.magnificPopup.defaults[t] = e.options), c.extend(this.proto, e.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Загрузка...",
            autoFocusLast: !0
        }
    }, c.fn.magnificPopup = function(t) {
        r();
        var e = c(this);
        if ("string" == typeof t)
            if ("open" === t) {
                var i, n = s ? e.data("magnificPopup") : e[0].magnificPopup,
                    o = parseInt(arguments[1], 10) || 0;
                n.items ? i = n.items[o] : (i = e, n.delegate && (i = i.find(n.delegate)), i = i.eq(o)), u._openClick({
                    mfpEl: i
                }, e, n)
            } else u.isOpen && u[t].apply(u, Array.prototype.slice.call(arguments, 1));
        else t = c.extend(!0, {}, t), s ? e.data("magnificPopup", t) : e[0].magnificPopup = t, u.addGroup(e, t);
        return e
    };
    var S, C, T, I = "inline",
        _ = function() {
            T && (C.after(T.addClass(S)).detach(), T = null)
        };
    c.magnificPopup.registerModule(I, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                u.types.push(I), b(l + "." + I, function() {
                    _()
                })
            },
            getInline: function(t, e) {
                if (_(), t.src) {
                    var i = u.st.inline,
                        n = c(t.src);
                    if (n.length) {
                        var o = n[0].parentNode;
                        o && o.tagName && (C || (S = i.hiddenClass, C = x(S), S = "mfp-" + S), T = n.after(C).detach().removeClass(S)), u.updateStatus("ready")
                    } else u.updateStatus("error", i.tNotFound), n = c("<div>");
                    return t.inlineElement = n
                }
                return u.updateStatus("ready"), u._parseMarkup(e, {}, t), e
            }
        }
    });
    var M, P = "ajax",
        A = function() {
            M && c(document.body).removeClass(M)
        },
        D = function() {
            A(), u.req && u.req.abort()
        };
    c.magnificPopup.registerModule(P, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                u.types.push(P), M = u.st.ajax.cursor, b(l + "." + P, D), b("BeforeChange." + P, D)
            },
            getAjax: function(o) {
                M && c(document.body).addClass(M), u.updateStatus("loading");
                var t = c.extend({
                    url: o.src,
                    success: function(t, e, i) {
                        var n = {
                            data: t,
                            xhr: i
                        };
                        k("ParseAjax", n), u.appendContent(c(n.data), P), o.finished = !0, A(), u._setFocus(), setTimeout(function() {
                            u.wrap.addClass(v)
                        }, 16), u.updateStatus("ready"), k("AjaxContentAdded")
                    },
                    error: function() {
                        A(), o.finished = o.loadError = !0, u.updateStatus("error", u.st.ajax.tError.replace("%url%", o.src))
                    }
                }, u.st.ajax.settings);
                return u.req = c.ajax(t), ""
            }
        }
    });
    var E;
    c.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var t = u.st.image,
                    e = ".image";
                u.types.push("image"), b(g + e, function() {
                    "image" === u.currItem.type && t.cursor && c(document.body).addClass(t.cursor)
                }), b(l + e, function() {
                    t.cursor && c(document.body).removeClass(t.cursor), y.off("resize" + m)
                }), b("Resize" + e, u.resizeImage), u.isLowIE && b("AfterChange", u.resizeImage)
            },
            resizeImage: function() {
                var t = u.currItem;
                if (t && t.img && u.st.image.verticalFit) {
                    var e = 0;
                    u.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", u.wH - e)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, E && clearInterval(E), t.isCheckingImgSize = !1, k("ImageHasSize", t), t.imgHidden && (u.content && u.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(e) {
                var i = 0,
                    n = e.img[0],
                    o = function(t) {
                        E && clearInterval(E), E = setInterval(function() {
                            0 < n.naturalWidth ? u._onImageHasSize(e) : (200 < i && clearInterval(E), 3 === ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500))
                        }, t)
                    };
                o(1)
            },
            getImage: function(t, e) {
                var i = 0,
                    n = function() {
                        t && (t.img[0].complete ? (t.img.off(".mfploader"), t === u.currItem && (u._onImageHasSize(t), u.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, k("ImageLoadComplete")) : ++i < 200 ? setTimeout(n, 100) : o())
                    },
                    o = function() {
                        t && (t.img.off(".mfploader"), t === u.currItem && (u._onImageHasSize(t), u.updateStatus("error", r.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0)
                    },
                    r = u.st.image,
                    a = e.find(".mfp-img");
                if (a.length) {
                    var s = document.createElement("img");
                    s.className = "mfp-img", t.el && t.el.find("img").length && (s.alt = t.el.find("img").attr("alt")), t.img = c(s).on("load.mfploader", n).on("error.mfploader", o), s.src = t.src, a.is("img") && (t.img = t.img.clone()), 0 < (s = t.img[0]).naturalWidth ? t.hasSize = !0 : s.width || (t.hasSize = !1)
                }
                return u._parseMarkup(e, {
                    title: function(t) {
                        if (t.data && void 0 !== t.data.title) return t.data.title;
                        var e = u.st.image.titleSrc;
                        if (e) {
                            if (c.isFunction(e)) return e.call(u, t);
                            if (t.el) return t.el.attr(e) || ""
                        }
                        return ""
                    }(t),
                    img_replaceWith: t.img
                }, t), u.resizeImage(), t.hasSize ? (E && clearInterval(E), t.loadError ? (e.addClass("mfp-loading"), u.updateStatus("error", r.tError.replace("%url%", t.src))) : (e.removeClass("mfp-loading"), u.updateStatus("ready"))) : (u.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, e.addClass("mfp-loading"), u.findImageSize(t))), e
            }
        }
    });
    var O;
    c.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, r = u.st.zoom,
                    e = ".zoom";
                if (r.enabled && u.supportsTransition) {
                    var i, n, o = r.duration,
                        a = function(t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + r.duration / 1e3 + "s " + r.easing,
                                n = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                o = "transition";
                            return n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = i, e.css(n), e
                        },
                        s = function() {
                            u.content.css("visibility", "visible")
                        };
                    b("BuildControls" + e, function() {
                        if (u._allowZoom()) {
                            if (clearTimeout(i), u.content.css("visibility", "hidden"), !(t = u._getItemToZoom())) return void s();
                            (n = a(t)).css(u._getOffset()), u.wrap.append(n), i = setTimeout(function() {
                                n.css(u._getOffset(!0)), i = setTimeout(function() {
                                    s(), setTimeout(function() {
                                        n.remove(), t = n = null, k("ZoomAnimationEnded")
                                    }, 16)
                                }, o)
                            }, 16)
                        }
                    }), b(d + e, function() {
                        if (u._allowZoom()) {
                            if (clearTimeout(i), u.st.removalDelay = o, !t) {
                                if (!(t = u._getItemToZoom())) return;
                                n = a(t)
                            }
                            n.css(u._getOffset(!0)), u.wrap.append(n), u.content.css("visibility", "hidden"), setTimeout(function() {
                                n.css(u._getOffset())
                            }, 16)
                        }
                    }), b(l + e, function() {
                        u._allowZoom() && (s(), n && n.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === u.currItem.type
            },
            _getItemToZoom: function() {
                return !!u.currItem.hasSize && u.currItem.img
            },
            _getOffset: function(t) {
                var e, i = (e = t ? u.currItem.img : u.st.zoom.opener(u.currItem.el || u.currItem)).offset(),
                    n = parseInt(e.css("padding-top"), 10),
                    o = parseInt(e.css("padding-bottom"), 10);
                i.top -= c(window).scrollTop() - n;
                var r = {
                    width: e.width(),
                    height: (s ? e.innerHeight() : e[0].offsetHeight) - o - n
                };
                return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O ? r["-moz-transform"] = r.transform = "translate(" + i.left + "px," + i.top + "px)" : (r.left = i.left, r.top = i.top), r
            }
        }
    });
    var L = "iframe",
        z = function(t) {
            if (u.currTemplate[L]) {
                var e = u.currTemplate[L].find("iframe");
                e.length && (t || (e[0].src = "//about:blank"), u.isIE8 && e.css("display", t ? "block" : "none"))
            }
        };
    c.magnificPopup.registerModule(L, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                u.types.push(L), b("BeforeChange", function(t, e, i) {
                    e !== i && (e === L ? z() : i === L && z(!0))
                }), b(l + "." + L, function() {
                    z()
                })
            },
            getIframe: function(t, e) {
                var i = t.src,
                    n = u.st.iframe;
                c.each(n.patterns, function() {
                    if (-1 < i.indexOf(this.index)) return this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1
                });
                var o = {};
                return n.srcAction && (o[n.srcAction] = i), u._parseMarkup(e, o, t), u.updateStatus("ready"), e
            }
        }
    });
    var F = function(t) {
            var e = u.items.length;
            return e - 1 < t ? t - e : t < 0 ? e + t : t
        },
        R = function(t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
        };
    c.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var r = u.st.gallery,
                    t = ".mfp-gallery";
                if (u.direction = !0, !r || !r.enabled) return !1;
                p += " mfp-gallery", b(g + t, function() {
                    r.navigateByImgClick && u.wrap.on("click" + t, ".mfp-img", function() {
                        if (1 < u.items.length) return u.next(), !1
                    }), h.on("keydown" + t, function(t) {
                        37 === t.keyCode ? u.prev() : 39 === t.keyCode && u.next()
                    })
                }), b("UpdateStatus" + t, function(t, e) {
                    e.text && (e.text = R(e.text, u.currItem.index, u.items.length))
                }), b(f + t, function(t, e, i, n) {
                    var o = u.items.length;
                    i.counter = 1 < o ? R(r.tCounter, n.index, o) : ""
                }), b("BuildControls" + t, function() {
                    if (1 < u.items.length && r.arrows && !u.arrowLeft) {
                        var t = r.arrowMarkup,
                            e = u.arrowLeft = c(t.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, "left")).addClass(a),
                            i = u.arrowRight = c(t.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, "right")).addClass(a);
                        e.click(function() {
                            u.prev()
                        }), i.click(function() {
                            u.next()
                        }), u.container.append(e.add(i))
                    }
                }), b("Change" + t, function() {
                    u._preloadTimeout && clearTimeout(u._preloadTimeout), u._preloadTimeout = setTimeout(function() {
                        u.preloadNearbyImages(), u._preloadTimeout = null
                    }, 16)
                }), b(l + t, function() {
                    h.off(t), u.wrap.off("click" + t), u.arrowRight = u.arrowLeft = null
                })
            },
            next: function() {
                u.direction = !0, u.index = F(u.index + 1), u.updateItemHTML()
            },
            prev: function() {
                u.direction = !1, u.index = F(u.index - 1), u.updateItemHTML()
            },
            goTo: function(t) {
                u.direction = t >= u.index, u.index = t, u.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, e = u.st.gallery.preload,
                    i = Math.min(e[0], u.items.length),
                    n = Math.min(e[1], u.items.length);
                for (t = 1; t <= (u.direction ? n : i); t++) u._preloadItem(u.index + t);
                for (t = 1; t <= (u.direction ? i : n); t++) u._preloadItem(u.index - t)
            },
            _preloadItem: function(t) {
                if (t = F(t), !u.items[t].preloaded) {
                    var e = u.items[t];
                    e.parsed || (e = u.parseEl(t)), k("LazyLoad", e), "image" === e.type && (e.img = c('<img class="mfp-img" />').on("load.mfploader", function() {
                        e.hasSize = !0
                    }).on("error.mfploader", function() {
                        e.hasSize = !0, e.loadError = !0, k("LazyLoadError", e)
                    }).attr("src", e.src)), e.preloaded = !0
                }
            }
        }
    });
    var B = "retina";
    c.magnificPopup.registerModule(B, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (1 < window.devicePixelRatio) {
                    var i = u.st.retina,
                        n = i.ratio;
                    1 < (n = isNaN(n) ? n() : n) && (b("ImageHasSize." + B, function(t, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), b("ElementParse." + B, function(t, e) {
                        e.src = i.replaceSrc(e, n)
                    }))
                }
            }
        }
    }), r()
}),
function(t) {
    "use strict";

    function i(t) {
        return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
    }
    var n, o, r;

    function e(t, e) {
        (n(t, e) ? r : o)(t, e)
    }
    "classList" in document.documentElement ? (n = function(t, e) {
        return t.classList.contains(e)
    }, o = function(t, e) {
        t.classList.add(e)
    }, r = function(t, e) {
        t.classList.remove(e)
    }) : (n = function(t, e) {
        return i(e).test(t.className)
    }, o = function(t, e) {
        n(t, e) || (t.className = t.className + " " + e)
    }, r = function(t, e) {
        t.className = t.className.replace(i(e), " ")
    });
    var a = {
        hasClass: n,
        addClass: o,
        removeClass: r,
        toggleClass: e,
        has: n,
        add: o,
        remove: r,
        toggle: e
    };
    "function" == typeof define && define.amd ? define(a) : t.classie = a
}(window),
function(i) {
    "use strict";

    function n(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t
    }

    function t(t, e) {
        this.el = t, this.options = n({}, this.options), n(this.options, e), this._init()
    }
    t.prototype.options = {
        newTab: !0,
        stickyPlaceholder: !0,
        onChange: function(t) {
            return !1
        }
    }, t.prototype._init = function() {
        var t = this.el.options[this.el.selectedIndex];
        this.hasDefaultPlaceholder = t && t.disabled, this.selectedOpt = t || this.el.querySelector("option"), this._createSelectEl(), this.selOpts = [].slice.call(this.selEl.querySelectorAll("li[data-option]")), this.selOptsCount = this.selOpts.length, this.current = this.selOpts.indexOf(this.selEl.querySelector("li.cs-selected")) || -1, this.selPlaceholder = this.selEl.querySelector("span.cs-placeholder"), this._initEvents()
    }, t.prototype._createSelectEl = function() {
        var i = "",
            n = function(t) {
                var e = "",
                    i = "",
                    n = "";
                !t.selectedOpt || this.foundSelected || this.hasDefaultPlaceholder || (i += "cs-selected ", this.foundSelected = !0), t.getAttribute("data-class") && (i += t.getAttribute("data-class")), t.getAttribute("data-link") && (n = "data-link=" + t.getAttribute("data-link")), "" !== i && (e = 'class="' + i + '" ');
                var o = "";
                return [].forEach.call(t.attributes, function(t) {
                    var e = t.name;
                    e.indexOf("data-") + ["data-option", "data-value"].indexOf(e) == -1 && (o += e + "='" + t.value + "' ")
                }), "<li " + e + n + o + ' data-option data-value="' + t.value + '"><span>' + t.textContent + "</span></li>"
            };
        [].slice.call(this.el.children).forEach(function(t) {
            if (!t.disabled) {
                var e = t.tagName.toLowerCase();
                "option" === e ? i += n(t) : "optgroup" === e && (i += '<li class="cs-optgroup"><span>' + t.label + "</span><ul>", [].slice.call(t.children).forEach(function(t) {
                    i += n(t)
                }), i += "</ul></li>")
            }
        });
        var t = '<div class="cs-options"><ul>' + i + "</ul></div>";
        this.selEl = document.createElement("div"), this.selEl.className = this.el.className, this.selEl.tabIndex = this.el.tabIndex, this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + "</span>" + t, this.el.parentNode.appendChild(this.selEl), this.selEl.appendChild(this.el)
    }, t.prototype._initEvents = function() {
        var i = this;
        this.selPlaceholder.addEventListener("click", function() {
            i._toggleSelect()
        }), this.selOpts.forEach(function(t, e) {
            t.addEventListener("click", function() {
                i.current = e, i._changeOption(), i._toggleSelect()
            })
        }), document.addEventListener("click", function(t) {
            var e = t.target;
            i._isOpen() && e !== i.selEl && ! function(t, e) {
                if (!t) return !1;
                for (var i = t.target || t.srcElement || t || !1; i && i != e;) i = i.parentNode || !1;
                return !1 !== i
            }(e, i.selEl) && i._toggleSelect()
        }), this.selEl.addEventListener("keydown", function(t) {
            switch (t.keyCode || t.which) {
                case 38:
                    t.preventDefault(), i._navigateOpts("prev");
                    break;
                case 40:
                    t.preventDefault(), i._navigateOpts("next");
                    break;
                case 32:
                    t.preventDefault(), i._isOpen() && void 0 !== i.preSelCurrent && -1 !== i.preSelCurrent && i._changeOption(), i._toggleSelect();
                    break;
                case 13:
                    t.preventDefault(), i._isOpen() && void 0 !== i.preSelCurrent && -1 !== i.preSelCurrent && (i._changeOption(), i._toggleSelect());
                    break;
                case 27:
                    t.preventDefault(), i._isOpen() && i._toggleSelect()
            }
        })
    }, t.prototype._navigateOpts = function(t) {
        this._isOpen() || this._toggleSelect();
        var e = void 0 !== this.preSelCurrent && -1 !== this.preSelCurrent ? this.preSelCurrent : this.current;
        ("prev" === t && 0 < e || "next" === t && e < this.selOptsCount - 1) && (this.preSelCurrent = "next" === t ? e + 1 : e - 1, this._removeFocus(), classie.add(this.selOpts[this.preSelCurrent], "cs-focus"))
    }, t.prototype._toggleSelect = function() {
        this._removeFocus(), this._isOpen() ? (-1 !== this.current && (this.selPlaceholder.textContent = this.selOpts[this.current].textContent), classie.remove(this.selEl, "cs-active")) : (this.hasDefaultPlaceholder && this.options.stickyPlaceholder && (this.selPlaceholder.textContent = this.selectedOpt.textContent), classie.add(this.selEl, "cs-active"))
    }, t.prototype._changeOption = function() {
        void 0 !== this.preSelCurrent && -1 !== this.preSelCurrent && (this.current = this.preSelCurrent, this.preSelCurrent = -1);
        var t = this.selOpts[this.current];
        this.selPlaceholder.textContent = t.textContent, this.el.value = t.getAttribute("data-value");
        var e = this.selEl.querySelector("li.cs-selected");
        e && classie.remove(e, "cs-selected"), classie.add(t, "cs-selected"), t.getAttribute("data-link") && (this.options.newTab ? i.open(t.getAttribute("data-link"), "_blank") : i.location = t.getAttribute("data-link")), this.options.onChange(this.el.value)
    }, t.prototype._isOpen = function(t) {
        return classie.has(this.selEl, "cs-active")
    }, t.prototype._removeFocus = function(t) {
        var e = this.selEl.querySelector("li.cs-focus");
        e && classie.remove(e, "cs-focus")
    }, i.SelectFx = t
}(window),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var a = r && r[o];
                a && (this.off(t, o), delete r[o]), o.apply(this, e), o = i[n += a ? 0 : 1]
            }
            return this
        }
    }, t
}),
function(e, i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter)
}(window, function(e, t) {
    var n = e.jQuery,
        o = e.console;

    function r(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function a(t, e, i) {
        if (!(this instanceof a)) return new a(t, e, i);
        "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = function(t) {
            var e = [];
            if (Array.isArray(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e
        }(t), this.options = r({}, this.options), "function" == typeof e ? i = e : r(this.options, e), i && this.on("always", i), this.getImages(), n && (this.jqDeferred = new n.Deferred), setTimeout(function() {
            this.check()
        }.bind(this))
    }(a.prototype = Object.create(t.prototype)).options = {}, a.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, a.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && s[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var a = r[n];
                    this.addElementBackgroundImages(a)
                }
            }
        }
    };
    var s = {
        1: !0,
        9: !0,
        11: !0
    };

    function i(t) {
        this.img = t
    }

    function l(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    return a.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, a.prototype.addImage = function(t) {
        var e = new i(t);
        this.images.push(e)
    }, a.prototype.addBackground = function(t, e) {
        var i = new l(t, e);
        this.images.push(i)
    }, a.prototype.check = function() {
        var n = this;

        function e(t, e, i) {
            setTimeout(function() {
                n.progress(t, e, i)
            })
        }
        this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : this.complete()
    }, a.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && o && o.log("progress: " + i, t, e)
    }, a.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, (i.prototype = Object.create(t.prototype)).check = function() {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
    }, i.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, i.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, i.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, i.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, i.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, (l.prototype = Object.create(i.prototype)).check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, l.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, l.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, a.makeJQueryPlugin = function(t) {
        (t = t || e.jQuery) && ((n = t).fn.imagesLoaded = function(t, e) {
            return new a(this, t, e).jqDeferred.promise(n(this))
        })
    }, a.makeJQueryPlugin(), a
}),
function(e, i) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
        i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery)
}(window, function(t, e) {
    "use strict";
    var u = Array.prototype.slice,
        i = t.console,
        h = void 0 === i ? function() {} : function(t) {
            i.error(t)
        };

    function n(d, o, c) {
        (c = c || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function(t) {
            c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t))
        }), c.fn[d] = function(t) {
            if ("string" == typeof t) {
                var e = u.call(arguments, 1);
                return a = e, l = "$()." + d + '("' + (r = t) + '")', (i = this).each(function(t, e) {
                    var i = c.data(e, d);
                    if (i) {
                        var n = i[r];
                        if (n && "_" != r.charAt(0)) {
                            var o = n.apply(i, a);
                            s = void 0 === s ? o : s
                        } else h(l + " is not a valid method")
                    } else h(d + " not initialized. Cannot call methods, i.e. " + l)
                }), void 0 !== s ? s : i
            }
            var i, r, a, s, l, n;
            return n = t, this.each(function(t, e) {
                var i = c.data(e, d);
                i ? (i.option(n), i._init()) : (i = new o(e, n), c.data(e, d, i))
            }), this
        }, r(c))
    }

    function r(t) {
        !t || t && t.bridget || (t.bridget = n)
    }
    return r(e || t.jQuery), n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var a = r && r[o];
                a && (this.off(t, o), delete r[o]), o.apply(this, e), o = i[n += a ? 0 : 1]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function v(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    var i = "undefined" == typeof console ? function() {} : function(t) {
            console.error(t)
        },
        y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        b = y.length;

    function x(t) {
        var e = getComputedStyle(t);
        return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }
    var k, w = !1;

    function S(t) {
        if (function() {
                if (!w) {
                    w = !0;
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
                    var e = document.body || document.documentElement;
                    e.appendChild(t);
                    var i = x(t);
                    S.isBoxSizeOuter = k = 200 == v(i.width), e.removeChild(t)
                }
            }(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
            var e = x(t);
            if ("none" == e.display) return function() {
                for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < b; e++) t[y[e]] = 0;
                return t
            }();
            var i = {};
            i.width = t.offsetWidth, i.height = t.offsetHeight;
            for (var n = i.isBorderBox = "border-box" == e.boxSizing, o = 0; o < b; o++) {
                var r = y[o],
                    a = e[r],
                    s = parseFloat(a);
                i[r] = isNaN(s) ? 0 : s
            }
            var l = i.paddingLeft + i.paddingRight,
                d = i.paddingTop + i.paddingBottom,
                c = i.marginLeft + i.marginRight,
                u = i.marginTop + i.marginBottom,
                h = i.borderLeftWidth + i.borderRightWidth,
                p = i.borderTopWidth + i.borderBottomWidth,
                f = n && k,
                g = v(e.width);
            !1 !== g && (i.width = g + (f ? 0 : l + h));
            var m = v(e.height);
            return !1 !== m && (i.height = m + (f ? 0 : d + p)), i.innerWidth = i.width - (l + h), i.innerHeight = i.height - (d + p), i.outerWidth = i.width + c, i.outerHeight = i.height + u, i
        }
    }
    return S
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var i = function() {
        var t = Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(t, e) {
        return t[i](e)
    }
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector)
}(window, function(d, r) {
    var c = {
            extend: function(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            },
            modulo: function(t, e) {
                return (t % e + e) % e
            },
            makeArray: function(t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if (t && "number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e
            },
            removeFrom: function(t, e) {
                var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
            },
            getParent: function(t, e) {
                for (; t != document.body;)
                    if (t = t.parentNode, r(t, e)) return t
            },
            getQueryElement: function(t) {
                return "string" == typeof t ? document.querySelector(t) : t
            },
            handleEvent: function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            },
            filterFindElements: function(t, n) {
                t = c.makeArray(t);
                var o = [];
                return t.forEach(function(t) {
                    if (t instanceof HTMLElement)
                        if (n) {
                            r(t, n) && o.push(t);
                            for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++) o.push(e[i])
                        } else o.push(t)
                }), o
            },
            debounceMethod: function(t, e, n) {
                var o = t.prototype[e],
                    r = e + "Timeout";
                t.prototype[e] = function() {
                    var t = this[r];
                    t && clearTimeout(t);
                    var e = arguments,
                        i = this;
                    this[r] = setTimeout(function() {
                        o.apply(i, e), delete i[r]
                    }, n || 100)
                }
            },
            docReady: function(t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t)
            },
            toDashed: function(t) {
                return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                    return e + "-" + i
                }).toLowerCase()
            }
        },
        u = d.console;
    return c.htmlInit = function(s, l) {
        c.docReady(function() {
            var t = c.toDashed(l),
                o = "data-" + t,
                e = document.querySelectorAll("[" + o + "]"),
                i = document.querySelectorAll(".js-" + t),
                n = c.makeArray(e).concat(c.makeArray(i)),
                r = o + "-options",
                a = d.jQuery;
            n.forEach(function(e) {
                var t, i = e.getAttribute(o) || e.getAttribute(r);
                try {
                    t = i && JSON.parse(i)
                } catch (t) {
                    return void(u && u.error("Error parsing " + o + " on " + e.className + ": " + t))
                }
                var n = new s(e, t);
                a && a.data(e, l, n)
            })
        })
    }, c
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";
    var i = document.documentElement.style,
        n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
        o = "string" == typeof i.transform ? "transform" : "WebkitTransform",
        r = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[n],
        a = {
            transform: o,
            transition: n,
            transitionDuration: n + "Duration",
            transitionProperty: n + "Property",
            transitionDelay: n + "Delay"
        };

    function s(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }
    var l = s.prototype = Object.create(t.prototype);
    l.constructor = s, l._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, l.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, l.getSize = function() {
        this.size = e(this.element)
    }, l.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            e[a[i] || i] = t[i]
        }
    }, l.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            r = this.layout.size,
            a = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10),
            s = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
        a = isNaN(a) ? 0 : a, s = isNaN(s) ? 0 : s, a -= e ? r.paddingLeft : r.paddingRight, s -= i ? r.paddingTop : r.paddingBottom, this.position.x = a, this.position.y = s
    }, l.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = i ? "paddingLeft" : "paddingRight",
            r = i ? "left" : "right",
            a = i ? "right" : "left",
            s = this.position.x + t[o];
        e[r] = this.getXValue(s), e[a] = "";
        var l = n ? "paddingTop" : "paddingBottom",
            d = n ? "top" : "bottom",
            c = n ? "bottom" : "top",
            u = this.position.y + t[l];
        e[d] = this.getYValue(u), e[c] = "", this.css(e), this.emitEvent("layout", [this])
    }, l.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, l.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, l._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            n = this.position.y,
            o = parseInt(t, 10),
            r = parseInt(e, 10),
            a = o === this.position.x && r === this.position.y;
        if (this.setPosition(t, e), !a || this.isTransitioning) {
            var s = t - i,
                l = e - n,
                d = {};
            d.transform = this.getTranslate(s, l), this.transition({
                to: d,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        } else this.layoutPosition()
    }, l.getTranslate = function(t, e) {
        return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)"
    }, l.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, l.moveTo = l._transitionTo, l.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, l._nonTransition = function(t) {
        for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, l.transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        } else this._nonTransition(t)
    };
    var d = "opacity," + o.replace(/([A-Z])/g, function(t) {
        return "-" + t.toLowerCase()
    });
    l.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: d,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(r, this, !1)
        }
    }, l.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, l.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var c = {
        "-webkit-transform": "transform"
    };
    l.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                i = c[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[i], function(t) {
                    for (var e in t) return !1;
                    return !0
                }(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) e.onEnd[i].call(this), delete e.onEnd[i];
            this.emitEvent("transitionEnd", [this])
        }
    }, l.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(r, this, !1), this.isTransitioning = !1
    }, l._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var u = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return l.removeTransitionStyles = function() {
        this.css(u)
    }, l.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, l.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, l.remove = function() {
        n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), this.hide()) : this.removeElem()
    }, l.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, l.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, l.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, l.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, l.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, l.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, s
}),
function(o, r) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(t, e, i, n) {
        return r(o, t, e, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = r(o, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : o.Outlayer = r(o, o.EvEmitter, o.getSize, o.fizzyUIUtils, o.Outlayer.Item)
}(window, function(t, e, o, r, n) {
    "use strict";
    var a = t.console,
        s = t.jQuery,
        i = function() {},
        l = 0,
        d = {};

    function c(t, e) {
        var i = r.getQueryElement(t);
        if (i) {
            this.element = i, s && (this.$element = s(this.element)), this.options = r.extend({}, this.constructor.defaults), this.option(e);
            var n = ++l;
            this.element.outlayerGUID = n, (d[n] = this)._create(), this._getOption("initLayout") && this.layout()
        } else a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
    }
    c.namespace = "outlayer", c.Item = n, c.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var u = c.prototype;

    function h(t) {
        function e() {
            t.apply(this, arguments)
        }
        return (e.prototype = Object.create(t.prototype)).constructor = e
    }
    r.extend(u, e.prototype), u.option = function(t) {
        r.extend(this.options, t)
    }, u._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, c.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, u._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), r.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, u.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, u._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = new i(e[o], this);
            n.push(r)
        }
        return n
    }, u._filterFindItemElements = function(t) {
        return r.filterFindElements(t, this.options.itemSelector)
    }, u.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, u.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, u._init = u.layout, u._resetLayout = function() {
        this.getSize()
    }, u.getSize = function() {
        this.size = o(this.element)
    }, u._getMeasurement = function(t, e) {
        var i, n = this.options[t];
        n ? ("string" == typeof n ? i = this.element.querySelector(n) : n instanceof HTMLElement && (i = n), this[t] = i ? o(i)[e] : n) : this[t] = 0
    }, u.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, u._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, u._layoutItems = function(t, i) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var n = [];
            t.forEach(function(t) {
                var e = this._getItemLayoutPosition(t);
                e.item = t, e.isInstant = i || t.isLayoutInstant, n.push(e)
            }, this), this._processLayoutQueue(n)
        }
    }, u._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, u._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, u.updateStagger = function() {
        var t = this.options.stagger;
        if (null != t) return this.stagger = function(t) {
            if ("number" == typeof t) return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                n = e && e[2];
            if (!i.length) return 0;
            i = parseFloat(i);
            var o = p[n] || 1;
            return i * o
        }(t), this.stagger;
        this.stagger = 0
    }, u._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, u._postLayout = function() {
        this.resizeContainer()
    }, u.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, u._getContainerSize = i, u._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, u._emitCompleteOnItems = function(e, t) {
        var i = this;

        function n() {
            i.dispatchEvent(e + "Complete", null, [t])
        }
        var o = t.length;
        if (t && o) {
            var r = 0;
            t.forEach(function(t) {
                t.once(e, a)
            })
        } else n();

        function a() {
            ++r == o && n()
        }
    }, u.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), s)
            if (this.$element = this.$element || s(this.element), e) {
                var o = s.Event(e);
                o.type = t, this.$element.trigger(o, i)
            } else this.$element.trigger(t, i)
    }, u.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, u.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, u.stamp = function(t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, u.unstamp = function(t) {
        (t = this._find(t)) && t.forEach(function(t) {
            r.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, u._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = r.makeArray(t)
    }, u._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, u._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, u._manageStamp = i, u._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            i = this._boundingRect,
            n = o(t);
        return {
            left: e.left - i.left - n.marginLeft,
            top: e.top - i.top - n.marginTop,
            right: i.right - e.right - n.marginRight,
            bottom: i.bottom - e.bottom - n.marginBottom
        }
    }, u.handleEvent = r.handleEvent, u.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, u.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, u.onresize = function() {
        this.resize()
    }, r.debounceMethod(c, "onresize", 100), u.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, u.needsResizeLayout = function() {
        var t = o(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth
    }, u.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, u.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, u.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, u.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var i = this.updateStagger();
            t.forEach(function(t, e) {
                t.stagger(e * i), t.reveal()
            })
        }
    }, u.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var i = this.updateStagger();
            t.forEach(function(t, e) {
                t.stagger(e * i), t.hide()
            })
        }
    }, u.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, u.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, u.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, u.getItems = function(t) {
        t = r.makeArray(t);
        var i = [];
        return t.forEach(function(t) {
            var e = this.getItem(t);
            e && i.push(e)
        }, this), i
    }, u.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), r.removeFrom(this.items, t)
        }, this)
    }, u.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete d[e], delete this.element.outlayerGUID, s && s.removeData(this.element, this.constructor.namespace)
    }, c.data = function(t) {
        var e = (t = r.getQueryElement(t)) && t.outlayerGUID;
        return e && d[e]
    }, c.create = function(t, e) {
        var i = h(c);
        return i.defaults = r.extend({}, c.defaults), r.extend(i.defaults, e), i.compatOptions = r.extend({}, c.compatOptions), i.namespace = t, i.data = c.data, i.Item = h(n), r.htmlInit(i, t), s && s.bridget && s.bridget(t, i), i
    };
    var p = {
        ms: 1,
        s: 1e3
    };
    return c.Item = n, c
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        n = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this)
            }
        }
    };
    var o = i.destroy;
    return i.destroy = function() {
        o.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(e, i) {
    "use strict";

    function n(t) {
        (this.isotope = t) && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = n.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function(t) {
        o[t] = function() {
            return i.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var t = e(this.isotope.element);
        return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            n = "outer" + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var t = this.isotope.filteredItems[0];
        return t && t.element && e(t.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, n.modes = {}, n.create = function(t, e) {
        function i() {
            n.apply(this, arguments)
        }
        return (i.prototype = Object.create(o)).constructor = i, e && (i.options = e), n.modes[i.prototype.namespace = t] = i
    }, n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, d) {
    var e = t.create("masonry");
    return e.compatOptions.fitWidth = "isFitWidth", e.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0
    }, e.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                e = t && t.element;
            this.columnWidth = e && d(e).outerWidth || this.containerWidth
        }
        var i = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            o = n / i,
            r = i - n % i;
        o = Math[r && r < 1 ? "round" : "floor"](o), this.cols = Math.max(o, 1)
    }, e.prototype.getContainerWidth = function() {
        var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            e = d(t);
        this.containerWidth = e && e.innerWidth
    }, e.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var n = this._getColGroup(i), o = Math.min.apply(Math, n), r = n.indexOf(o), a = {
                x: this.columnWidth * r,
                y: o
            }, s = o + t.size.outerHeight, l = this.cols + 1 - n.length, d = 0; d < l; d++) this.colYs[r + d] = s;
        return a
    }, e.prototype._getColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) {
            var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o)
        }
        return e
    }, e.prototype._manageStamp = function(t) {
        var e = d(t),
            i = this._getElementOffset(t),
            n = this._getOption("originLeft") ? i.left : i.right,
            o = n + e.outerWidth,
            r = Math.floor(n / this.columnWidth);
        r = Math.max(0, r);
        var a = Math.floor(o / this.columnWidth);
        a -= o % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
        for (var s = (this._getOption("originTop") ? i.top : i.bottom) + e.outerHeight, l = r; l <= a; l++) this.colYs[l] = Math.max(s, this.colYs[l])
    }, e.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, e.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, e.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        n = i.prototype,
        o = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var r in e.prototype) o[r] || (n[r] = e.prototype[r]);
    var a = n.measureColumns;
    n.measureColumns = function() {
        this.items = this.isotope.filteredItems, a.call(this)
    };
    var s = n._getOption;
    return n._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : s.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var n = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(a, s) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(t, e, i, n, o, r) {
        return s(a, t, e, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = s(a, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : a.Isotope = s(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode)
}(window, function(t, i, e, n, r, o, a) {
    var s = t.jQuery,
        l = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = i.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = o, d.LayoutMode = a;
    var c = d.prototype;
    c._create = function() {
        for (var t in this.itemGUID = 0, this._sorters = {}, this._getSorters(), i.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"], a.modes) this._initLayoutMode(t)
    }, c.reloadItems = function() {
        this.itemGUID = 0, i.prototype.reloadItems.call(this)
    }, c._itemize = function() {
        for (var t = i.prototype._itemize.apply(this, arguments), e = 0; e < t.length; e++) {
            t[e].id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, c._initLayoutMode = function(t) {
        var e = a.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? r.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, c.layout = function() {
        this._isLayoutInited || !this._getOption("initLayout") ? this._layout() : this.arrange()
    }, c._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, c.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, c._init = c.arrange, c._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, c._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e
    }, c._bindArrangeComplete = function() {
        var t, e, i, n = this;

        function o() {
            t && e && i && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        this.once("layoutComplete", function() {
            t = !0, o()
        }), this.once("hideComplete", function() {
            e = !0, o()
        }), this.once("revealComplete", function() {
            i = !0, o()
        })
    }, c._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], o = [], r = this._getFilterTest(e), a = 0; a < t.length; a++) {
            var s = t[a];
            if (!s.isIgnored) {
                var l = r(s);
                l && i.push(s), l && s.isHidden ? n.push(s) : l || s.isHidden || o.push(s)
            }
        }
        return {
            matches: i,
            needReveal: n,
            needHide: o
        }
    }, c._getFilterTest = function(e) {
        return s && this.options.isJQueryFiltering ? function(t) {
            return s(t.element).is(e)
        } : "function" == typeof e ? function(t) {
            return e(t.element)
        } : function(t) {
            return n(t.element, e)
        }
    }, c.updateSortData = function(t) {
        var e;
        t ? (t = r.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, c._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = u(i)
        }
    }, c._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            t[i].updateSortData()
        }
    };
    var u = function(t) {
        if ("string" != typeof t) return t;
        var e, i, n = l(t).split(" "),
            o = n[0],
            r = o.match(/^\[(.+)\]$/),
            a = (e = r && r[1], i = o, e ? function(t) {
                return t.getAttribute(e)
            } : function(t) {
                var e = t.querySelector(i);
                return e && e.textContent
            }),
            s = d.sortDataParsers[n[1]];
        return t = s ? function(t) {
            return t && s(a(t))
        } : function(t) {
            return t && a(t)
        }
    };
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, c._sort = function() {
        var t = this.options.sortBy;
        if (t) {
            var l, d, e = [].concat.apply(t, this.sortHistory),
                i = (l = e, d = this.options.sortAscending, function(t, e) {
                    for (var i = 0; i < l.length; i++) {
                        var n = l[i],
                            o = t.sortData[n],
                            r = e.sortData[n];
                        if (r < o || o < r) {
                            var a = void 0 !== d[n] ? d[n] : d,
                                s = a ? 1 : -1;
                            return (r < o ? 1 : -1) * s
                        }
                    }
                    return 0
                });
            this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
    }, c._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, c._resetLayout = function() {
        i.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, c._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, c._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, c._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, c.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, c.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, c._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, c.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, o = e.length;
            for (i = 0; i < o; i++) n = e[i], this.element.appendChild(n.element);
            var r = this._filter(e).matches;
            for (i = 0; i < o; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < o; i++) delete e[i].isLayoutInstant;
            this.reveal(r)
        }
    };
    var h = c.remove;
    return c.remove = function(t) {
        t = r.makeArray(t);
        var e = this.getItems(t);
        h.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
            var o = e[n];
            r.removeFrom(this.filteredItems, o)
        }
    }, c.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            this.items[t].sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, c._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i, n
    }, c.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
}),
function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Chart = t()
    }
}(function() {
    return function r(a, s, l) {
        function d(i, t) {
            if (!s[i]) {
                if (!a[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (c) return c(i, !0);
                    var n = new Error("Cannot find module '" + i + "'");
                    throw n.code = "MODULE_NOT_FOUND", n
                }
                var o = s[i] = {
                    exports: {}
                };
                a[i][0].call(o.exports, function(t) {
                    var e = a[i][1][t];
                    return d(e || t)
                }, o, o.exports, r, a, s, l)
            }
            return s[i].exports
        }
        for (var c = "function" == typeof require && require, t = 0; t < l.length; t++) d(l[t]);
        return d
    }({
        1: [function(t, e, i) {}, {}],
        2: [function(t, e, i) {
            function n(t) {
                if (t) {
                    var e = [0, 0, 0],
                        i = 1,
                        n = t.match(/^#([a-fA-F0-9]{3})$/);
                    if (n) {
                        n = n[1];
                        for (var o = 0; o < e.length; o++) e[o] = parseInt(n[o] + n[o], 16)
                    } else if (n = t.match(/^#([a-fA-F0-9]{6})$/)) {
                        n = n[1];
                        for (o = 0; o < e.length; o++) e[o] = parseInt(n.slice(2 * o, 2 * o + 2), 16)
                    } else if (n = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
                        for (o = 0; o < e.length; o++) e[o] = parseInt(n[o + 1]);
                        i = parseFloat(n[4])
                    } else if (n = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
                        for (o = 0; o < e.length; o++) e[o] = Math.round(2.55 * parseFloat(n[o + 1]));
                        i = parseFloat(n[4])
                    } else if (n = t.match(/(\w+)/)) {
                        if ("transparent" == n[1]) return [0, 0, 0, 0];
                        if (!(e = u[n[1]])) return
                    }
                    for (o = 0; o < e.length; o++) e[o] = d(e[o], 0, 255);
                    return i = i || 0 == i ? d(i, 0, 1) : 1, e[3] = i, e
                }
            }

            function o(t) {
                if (t) {
                    var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                    if (e) {
                        var i = parseFloat(e[4]);
                        return [d(parseInt(e[1]), 0, 360), d(parseFloat(e[2]), 0, 100), d(parseFloat(e[3]), 0, 100), d(isNaN(i) ? 1 : i, 0, 1)]
                    }
                }
            }

            function r(t) {
                if (t) {
                    var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                    if (e) {
                        var i = parseFloat(e[4]);
                        return [d(parseInt(e[1]), 0, 360), d(parseFloat(e[2]), 0, 100), d(parseFloat(e[3]), 0, 100), d(isNaN(i) ? 1 : i, 0, 1)]
                    }
                }
            }

            function a(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
            }

            function s(t, e) {
                return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")"
            }

            function l(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
            }

            function d(t, e, i) {
                return Math.min(Math.max(e, t), i)
            }

            function c(t) {
                var e = t.toString(16).toUpperCase();
                return e.length < 2 ? "0" + e : e
            }
            var u = t(6);
            e.exports = {
                getRgba: n,
                getHsla: o,
                getRgb: function(t) {
                    var e = n(t);
                    return e && e.slice(0, 3)
                },
                getHsl: function(t) {
                    var e = o(t);
                    return e && e.slice(0, 3)
                },
                getHwb: r,
                getAlpha: function(t) {
                    var e = n(t);
                    return e ? e[3] : (e = o(t)) ? e[3] : (e = r(t)) ? e[3] : void 0
                },
                hexString: function(t) {
                    return "#" + c(t[0]) + c(t[1]) + c(t[2])
                },
                rgbString: function(t, e) {
                    return e < 1 || t[3] && t[3] < 1 ? a(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
                },
                rgbaString: a,
                percentString: function(t, e) {
                    return e < 1 || t[3] && t[3] < 1 ? s(t, e) : "rgb(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%)"
                },
                percentaString: s,
                hslString: function(t, e) {
                    return e < 1 || t[3] && t[3] < 1 ? l(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
                },
                hslaString: l,
                hwbString: function(t, e) {
                    return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
                },
                keyword: function(t) {
                    return h[t.slice(0, 3)]
                }
            };
            var h = {};
            for (var p in u) h[u[p]] = p
        }, {
            6: 6
        }],
        3: [function(t, e, i) {
            var c = t(5),
                n = t(2),
                a = function(t) {
                    if (t instanceof a) return t;
                    if (!(this instanceof a)) return new a(t);
                    var e;
                    if (this.values = {
                            rgb: [0, 0, 0],
                            hsl: [0, 0, 0],
                            hsv: [0, 0, 0],
                            hwb: [0, 0, 0],
                            cmyk: [0, 0, 0, 0],
                            alpha: 1
                        }, "string" == typeof t)
                        if (e = n.getRgba(t)) this.setValues("rgb", e);
                        else if (e = n.getHsla(t)) this.setValues("hsl", e);
                    else {
                        if (!(e = n.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');
                        this.setValues("hwb", e)
                    } else if ("object" == typeof t)
                        if (void 0 !== (e = t).r || void 0 !== e.red) this.setValues("rgb", e);
                        else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues("hsl", e);
                    else if (void 0 !== e.v || void 0 !== e.value) this.setValues("hsv", e);
                    else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues("hwb", e);
                    else {
                        if (void 0 === e.c && void 0 === e.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(t));
                        this.setValues("cmyk", e)
                    }
                };
            a.prototype = {
                rgb: function() {
                    return this.setSpace("rgb", arguments)
                },
                hsl: function() {
                    return this.setSpace("hsl", arguments)
                },
                hsv: function() {
                    return this.setSpace("hsv", arguments)
                },
                hwb: function() {
                    return this.setSpace("hwb", arguments)
                },
                cmyk: function() {
                    return this.setSpace("cmyk", arguments)
                },
                rgbArray: function() {
                    return this.values.rgb
                },
                hslArray: function() {
                    return this.values.hsl
                },
                hsvArray: function() {
                    return this.values.hsv
                },
                hwbArray: function() {
                    var t = this.values;
                    return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
                },
                cmykArray: function() {
                    return this.values.cmyk
                },
                rgbaArray: function() {
                    var t = this.values;
                    return t.rgb.concat([t.alpha])
                },
                hslaArray: function() {
                    var t = this.values;
                    return t.hsl.concat([t.alpha])
                },
                alpha: function(t) {
                    return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
                },
                red: function(t) {
                    return this.setChannel("rgb", 0, t)
                },
                green: function(t) {
                    return this.setChannel("rgb", 1, t)
                },
                blue: function(t) {
                    return this.setChannel("rgb", 2, t)
                },
                hue: function(t) {
                    return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t)
                },
                saturation: function(t) {
                    return this.setChannel("hsl", 1, t)
                },
                lightness: function(t) {
                    return this.setChannel("hsl", 2, t)
                },
                saturationv: function(t) {
                    return this.setChannel("hsv", 1, t)
                },
                whiteness: function(t) {
                    return this.setChannel("hwb", 1, t)
                },
                blackness: function(t) {
                    return this.setChannel("hwb", 2, t)
                },
                value: function(t) {
                    return this.setChannel("hsv", 2, t)
                },
                cyan: function(t) {
                    return this.setChannel("cmyk", 0, t)
                },
                magenta: function(t) {
                    return this.setChannel("cmyk", 1, t)
                },
                yellow: function(t) {
                    return this.setChannel("cmyk", 2, t)
                },
                black: function(t) {
                    return this.setChannel("cmyk", 3, t)
                },
                hexString: function() {
                    return n.hexString(this.values.rgb)
                },
                rgbString: function() {
                    return n.rgbString(this.values.rgb, this.values.alpha)
                },
                rgbaString: function() {
                    return n.rgbaString(this.values.rgb, this.values.alpha)
                },
                percentString: function() {
                    return n.percentString(this.values.rgb, this.values.alpha)
                },
                hslString: function() {
                    return n.hslString(this.values.hsl, this.values.alpha)
                },
                hslaString: function() {
                    return n.hslaString(this.values.hsl, this.values.alpha)
                },
                hwbString: function() {
                    return n.hwbString(this.values.hwb, this.values.alpha)
                },
                keyword: function() {
                    return n.keyword(this.values.rgb, this.values.alpha)
                },
                rgbNumber: function() {
                    var t = this.values.rgb;
                    return t[0] << 16 | t[1] << 8 | t[2]
                },
                luminosity: function() {
                    for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
                        var n = t[i] / 255;
                        e[i] = n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
                    }
                    return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
                },
                contrast: function(t) {
                    var e = this.luminosity(),
                        i = t.luminosity();
                    return i < e ? (e + .05) / (i + .05) : (i + .05) / (e + .05)
                },
                level: function(t) {
                    var e = this.contrast(t);
                    return 7.1 <= e ? "AAA" : 4.5 <= e ? "AA" : ""
                },
                dark: function() {
                    var t = this.values.rgb;
                    return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
                },
                light: function() {
                    return !this.dark()
                },
                negate: function() {
                    for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
                    return this.setValues("rgb", t), this
                },
                lighten: function(t) {
                    var e = this.values.hsl;
                    return e[2] += e[2] * t, this.setValues("hsl", e), this
                },
                darken: function(t) {
                    var e = this.values.hsl;
                    return e[2] -= e[2] * t, this.setValues("hsl", e), this
                },
                saturate: function(t) {
                    var e = this.values.hsl;
                    return e[1] += e[1] * t, this.setValues("hsl", e), this
                },
                desaturate: function(t) {
                    var e = this.values.hsl;
                    return e[1] -= e[1] * t, this.setValues("hsl", e), this
                },
                whiten: function(t) {
                    var e = this.values.hwb;
                    return e[1] += e[1] * t, this.setValues("hwb", e), this
                },
                blacken: function(t) {
                    var e = this.values.hwb;
                    return e[2] += e[2] * t, this.setValues("hwb", e), this
                },
                greyscale: function() {
                    var t = this.values.rgb,
                        e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                    return this.setValues("rgb", [e, e, e]), this
                },
                clearer: function(t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e - e * t), this
                },
                opaquer: function(t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e + e * t), this
                },
                rotate: function(t) {
                    var e = this.values.hsl,
                        i = (e[0] + t) % 360;
                    return e[0] = i < 0 ? 360 + i : i, this.setValues("hsl", e), this
                },
                mix: function(t, e) {
                    var i = this,
                        n = t,
                        o = void 0 === e ? .5 : e,
                        r = 2 * o - 1,
                        a = i.alpha() - n.alpha(),
                        s = ((r * a == -1 ? r : (r + a) / (1 + r * a)) + 1) / 2,
                        l = 1 - s;
                    return this.rgb(s * i.red() + l * n.red(), s * i.green() + l * n.green(), s * i.blue() + l * n.blue()).alpha(i.alpha() * o + n.alpha() * (1 - o))
                },
                toJSON: function() {
                    return this.rgb()
                },
                clone: function() {
                    var t, e, i = new a,
                        n = this.values,
                        o = i.values;
                    for (var r in n) n.hasOwnProperty(r) && (t = n[r], "[object Array]" === (e = {}.toString.call(t)) ? o[r] = t.slice(0) : "[object Number]" === e ? o[r] = t : console.error("unexpected color value:", t));
                    return i
                }
            }, a.prototype.spaces = {
                rgb: ["red", "green", "blue"],
                hsl: ["hue", "saturation", "lightness"],
                hsv: ["hue", "saturation", "value"],
                hwb: ["hue", "whiteness", "blackness"],
                cmyk: ["cyan", "magenta", "yellow", "black"]
            }, a.prototype.maxes = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100]
            }, a.prototype.getValues = function(t) {
                for (var e = this.values, i = {}, n = 0; n < t.length; n++) i[t.charAt(n)] = e[t][n];
                return 1 !== e.alpha && (i.a = e.alpha), i
            }, a.prototype.setValues = function(t, e) {
                var i, n, o = this.values,
                    r = this.spaces,
                    a = this.maxes,
                    s = 1;
                if ("alpha" === t) s = e;
                else if (e.length) o[t] = e.slice(0, t.length), s = e[t.length];
                else if (void 0 !== e[t.charAt(0)]) {
                    for (i = 0; i < t.length; i++) o[t][i] = e[t.charAt(i)];
                    s = e.a
                } else if (void 0 !== e[r[t][0]]) {
                    var l = r[t];
                    for (i = 0; i < t.length; i++) o[t][i] = e[l[i]];
                    s = e.alpha
                }
                if (o.alpha = Math.max(0, Math.min(1, void 0 === s ? o.alpha : s)), "alpha" === t) return !1;
                for (i = 0; i < t.length; i++) n = Math.max(0, Math.min(a[t][i], o[t][i])), o[t][i] = Math.round(n);
                for (var d in r) d !== t && (o[d] = c[t][d](o[t]));
                return !0
            }, a.prototype.setSpace = function(t, e) {
                var i = e[0];
                return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this)
            }, a.prototype.setChannel = function(t, e, i) {
                var n = this.values[t];
                return void 0 === i ? n[e] : (i === n[e] || (n[e] = i, this.setValues(t, n)), this)
            }, "undefined" != typeof window && (window.Color = a), e.exports = a
        }, {
            2: 2,
            5: 5
        }],
        4: [function(t, e, i) {
            function o(t) {
                var e, i, n = t[0] / 255,
                    o = t[1] / 255,
                    r = t[2] / 255,
                    a = Math.min(n, o, r),
                    s = Math.max(n, o, r),
                    l = s - a;
                return s == a ? e = 0 : n == s ? e = (o - r) / l : o == s ? e = 2 + (r - n) / l : r == s && (e = 4 + (n - o) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), i = (a + s) / 2, [e, 100 * (s == a ? 0 : i <= .5 ? l / (s + a) : l / (2 - s - a)), 100 * i]
            }

            function n(t) {
                var e, i, n = t[0],
                    o = t[1],
                    r = t[2],
                    a = Math.min(n, o, r),
                    s = Math.max(n, o, r),
                    l = s - a;
                return i = 0 == s ? 0 : l / s * 1e3 / 10, s == a ? e = 0 : n == s ? e = (o - r) / l : o == s ? e = 2 + (r - n) / l : r == s && (e = 4 + (n - o) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), [e, i, s / 255 * 1e3 / 10]
            }

            function a(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2];
                return [o(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(i, n))), 100 * (n = 1 - 1 / 255 * Math.max(e, Math.max(i, n)))]
            }

            function s(t) {
                var e, i = t[0] / 255,
                    n = t[1] / 255,
                    o = t[2] / 255;
                return [100 * ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - o))) / (1 - e) || 0), 100 * ((1 - n - e) / (1 - e) || 0), 100 * ((1 - o - e) / (1 - e) || 0), 100 * e]
            }

            function l(t) {
                return T[JSON.stringify(t)]
            }

            function d(t) {
                var e = t[0] / 255,
                    i = t[1] / 255,
                    n = t[2] / 255;
                return [100 * (.4124 * (e = .04045 < e ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (i = .04045 < i ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92) + .1805 * (n = .04045 < n ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92)), 100 * (.2126 * e + .7152 * i + .0722 * n), 100 * (.0193 * e + .1192 * i + .9505 * n)]
            }

            function c(t) {
                var e = d(t),
                    i = e[0],
                    n = e[1],
                    o = e[2];
                return n /= 100, o /= 108.883, i = .008856 < (i /= 95.047) ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, [116 * (n = .008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (i - n), 200 * (n - (o = .008856 < o ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116))]
            }

            function u(t) {
                var e, i, n, o, r, a = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100;
                if (0 == s) return [r = 255 * l, r, r];
                e = 2 * l - (i = l < .5 ? l * (1 + s) : l + s - l * s), o = [0, 0, 0];
                for (var d = 0; d < 3; d++)(n = a + 1 / 3 * -(d - 1)) < 0 && n++, 1 < n && n--, r = 6 * n < 1 ? e + 6 * (i - e) * n : 2 * n < 1 ? i : 3 * n < 2 ? e + (i - e) * (2 / 3 - n) * 6 : e, o[d] = 255 * r;
                return o
            }

            function h(t) {
                var e = t[0] / 60,
                    i = t[1] / 100,
                    n = t[2] / 100,
                    o = Math.floor(e) % 6,
                    r = e - Math.floor(e),
                    a = 255 * n * (1 - i),
                    s = 255 * n * (1 - i * r),
                    l = 255 * n * (1 - i * (1 - r));
                n *= 255;
                switch (o) {
                    case 0:
                        return [n, l, a];
                    case 1:
                        return [s, n, a];
                    case 2:
                        return [a, n, l];
                    case 3:
                        return [a, s, n];
                    case 4:
                        return [l, a, n];
                    case 5:
                        return [n, a, s]
                }
            }

            function p(t) {
                var e, i, n, o, a = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100,
                    d = s + l;
                switch (1 < d && (s /= d, l /= d), n = 6 * a - (e = Math.floor(6 * a)), 0 != (1 & e) && (n = 1 - n), o = s + n * ((i = 1 - l) - s), e) {
                    default:
                        case 6:
                        case 0:
                        r = i,
                    g = o,
                    b = s;
                    break;
                    case 1:
                            r = o,
                        g = i,
                        b = s;
                        break;
                    case 2:
                            r = s,
                        g = i,
                        b = o;
                        break;
                    case 3:
                            r = s,
                        g = o,
                        b = i;
                        break;
                    case 4:
                            r = o,
                        g = s,
                        b = i;
                        break;
                    case 5:
                            r = i,
                        g = s,
                        b = o
                }
                return [255 * r, 255 * g, 255 * b]
            }

            function f(t) {
                var e = t[0] / 100,
                    i = t[1] / 100,
                    n = t[2] / 100,
                    o = t[3] / 100;
                return [255 * (1 - Math.min(1, e * (1 - o) + o)), 255 * (1 - Math.min(1, i * (1 - o) + o)), 255 * (1 - Math.min(1, n * (1 - o) + o))]
            }

            function m(t) {
                var e, i, n, o = t[0] / 100,
                    r = t[1] / 100,
                    a = t[2] / 100;
                return i = -.9689 * o + 1.8758 * r + .0415 * a, n = .0557 * o + -.204 * r + 1.057 * a, e = .0031308 < (e = 3.2406 * o + -1.5372 * r + -.4986 * a) ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, i = .0031308 < i ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, n = .0031308 < n ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (i = Math.min(Math.max(0, i), 1)), 255 * (n = Math.min(Math.max(0, n), 1))]
            }

            function v(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2];
                return i /= 100, n /= 108.883, e = .008856 < (e /= 95.047) ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (i = .008856 < i ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (e - i), 200 * (i - (n = .008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))]
            }

            function y(t) {
                var e, i, n, o, r = t[0],
                    a = t[1],
                    s = t[2];
                return r <= 8 ? o = (i = 100 * r / 903.3) / 100 * 7.787 + 16 / 116 : (i = 100 * Math.pow((r + 16) / 116, 3), o = Math.pow(i / 100, 1 / 3)), [e = e / 95.047 <= .008856 ? e = 95.047 * (a / 500 + o - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + o, 3), i, n = n / 108.883 <= .008859 ? n = 108.883 * (o - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(o - s / 200, 3)]
            }

            function x(t) {
                var e, i = t[0],
                    n = t[1],
                    o = t[2];
                return (e = 360 * Math.atan2(o, n) / 2 / Math.PI) < 0 && (e += 360), [i, Math.sqrt(n * n + o * o), e]
            }

            function k(t) {
                return m(y(t))
            }

            function w(t) {
                var e, i = t[0],
                    n = t[1];
                return e = t[2] / 360 * 2 * Math.PI, [i, n * Math.cos(e), n * Math.sin(e)]
            }

            function S(t) {
                return C[t]
            }
            e.exports = {
                rgb2hsl: o,
                rgb2hsv: n,
                rgb2hwb: a,
                rgb2cmyk: s,
                rgb2keyword: l,
                rgb2xyz: d,
                rgb2lab: c,
                rgb2lch: function(t) {
                    return x(c(t))
                },
                hsl2rgb: u,
                hsl2hsv: function(t) {
                    var e = t[0],
                        i = t[1] / 100,
                        n = t[2] / 100;
                    return 0 === n ? [0, 0, 0] : [e, 2 * (i *= (n *= 2) <= 1 ? n : 2 - n) / (n + i) * 100, (n + i) / 2 * 100]
                },
                hsl2hwb: function(t) {
                    return a(u(t))
                },
                hsl2cmyk: function(t) {
                    return s(u(t))
                },
                hsl2keyword: function(t) {
                    return l(u(t))
                },
                hsv2rgb: h,
                hsv2hsl: function(t) {
                    var e, i, n = t[0],
                        o = t[1] / 100,
                        r = t[2] / 100;
                    return e = o * r, [n, 100 * (e = (e /= (i = (2 - o) * r) <= 1 ? i : 2 - i) || 0), 100 * (i /= 2)]
                },
                hsv2hwb: function(t) {
                    return a(h(t))
                },
                hsv2cmyk: function(t) {
                    return s(h(t))
                },
                hsv2keyword: function(t) {
                    return l(h(t))
                },
                hwb2rgb: p,
                hwb2hsl: function(t) {
                    return o(p(t))
                },
                hwb2hsv: function(t) {
                    return n(p(t))
                },
                hwb2cmyk: function(t) {
                    return s(p(t))
                },
                hwb2keyword: function(t) {
                    return l(p(t))
                },
                cmyk2rgb: f,
                cmyk2hsl: function(t) {
                    return o(f(t))
                },
                cmyk2hsv: function(t) {
                    return n(f(t))
                },
                cmyk2hwb: function(t) {
                    return a(f(t))
                },
                cmyk2keyword: function(t) {
                    return l(f(t))
                },
                keyword2rgb: S,
                keyword2hsl: function(t) {
                    return o(S(t))
                },
                keyword2hsv: function(t) {
                    return n(S(t))
                },
                keyword2hwb: function(t) {
                    return a(S(t))
                },
                keyword2cmyk: function(t) {
                    return s(S(t))
                },
                keyword2lab: function(t) {
                    return c(S(t))
                },
                keyword2xyz: function(t) {
                    return d(S(t))
                },
                xyz2rgb: m,
                xyz2lab: v,
                xyz2lch: function(t) {
                    return x(v(t))
                },
                lab2xyz: y,
                lab2rgb: k,
                lab2lch: x,
                lch2lab: w,
                lch2xyz: function(t) {
                    return y(w(t))
                },
                lch2rgb: function(t) {
                    return k(w(t))
                }
            };
            var C = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                },
                T = {};
            for (var I in C) T[JSON.stringify(C[I])] = I
        }, {}],
        5: [function(t, e, i) {
            var o = t(4),
                r = function() {
                    return new d
                };
            for (var n in o) {
                r[n + "Raw"] = function(e) {
                    return function(t) {
                        return "number" == typeof t && (t = Array.prototype.slice.call(arguments)), o[e](t)
                    }
                }(n);
                var a = /(\w+)2(\w+)/.exec(n),
                    s = a[1],
                    l = a[2];
                (r[s] = r[s] || {})[l] = r[n] = function(n) {
                    return function(t) {
                        "number" == typeof t && (t = Array.prototype.slice.call(arguments));
                        var e = o[n](t);
                        if ("string" == typeof e || void 0 === e) return e;
                        for (var i = 0; i < e.length; i++) e[i] = Math.round(e[i]);
                        return e
                    }
                }(n)
            }
            var d = function() {
                this.convs = {}
            };
            d.prototype.routeSpace = function(t, e) {
                var i = e[0];
                return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i))
            }, d.prototype.setValues = function(t, e) {
                return this.space = t, this.convs = {}, this.convs[t] = e, this
            }, d.prototype.getValues = function(t) {
                var e = this.convs[t];
                if (!e) {
                    var i = this.space,
                        n = this.convs[i];
                    e = r[i][t](n), this.convs[t] = e
                }
                return e
            }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(e) {
                d.prototype[e] = function(t) {
                    return this.routeSpace(e, arguments)
                }
            }), e.exports = r
        }, {
            4: 4
        }],
        6: [function(t, e, i) {
            e.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        }, {}],
        7: [function(t, e, i) {
            var n = t(28)();
            t(26)(n), t(22)(n), t(25)(n), t(21)(n), t(23)(n), t(24)(n), t(29)(n), t(33)(n), t(31)(n), t(34)(n), t(32)(n), t(35)(n), t(30)(n), t(27)(n), t(36)(n), t(37)(n), t(38)(n), t(39)(n), t(40)(n), t(43)(n), t(41)(n), t(42)(n), t(44)(n), t(45)(n), t(46)(n), t(15)(n), t(16)(n), t(17)(n), t(18)(n), t(19)(n), t(20)(n), t(8)(n), t(9)(n), t(10)(n), t(11)(n), t(12)(n), t(13)(n), t(14)(n), window.Chart = e.exports = n
        }, {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            36: 36,
            37: 37,
            38: 38,
            39: 39,
            40: 40,
            41: 41,
            42: 42,
            43: 43,
            44: 44,
            45: 45,
            46: 46,
            8: 8,
            9: 9
        }],
        8: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.Bar = function(t, e) {
                    return e.type = "bar", new i(t, e)
                }
            }
        }, {}],
        9: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.Bubble = function(t, e) {
                    return e.type = "bubble", new i(t, e)
                }
            }
        }, {}],
        10: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.Doughnut = function(t, e) {
                    return e.type = "doughnut", new i(t, e)
                }
            }
        }, {}],
        11: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.Line = function(t, e) {
                    return e.type = "line", new i(t, e)
                }
            }
        }, {}],
        12: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.PolarArea = function(t, e) {
                    return e.type = "polarArea", new i(t, e)
                }
            }
        }, {}],
        13: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.Radar = function(t, e) {
                    return e.type = "radar", new i(t, e)
                }
            }
        }, {}],
        14: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                i.defaults.scatter = {
                    hover: {
                        mode: "single"
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom",
                            id: "x-axis-1"
                        }],
                        yAxes: [{
                            type: "linear",
                            position: "left",
                            id: "y-axis-1"
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return ""
                            },
                            label: function(t) {
                                return "(" + t.xLabel + ", " + t.yLabel + ")"
                            }
                        }
                    }
                }, i.controllers.scatter = i.controllers.line, i.Scatter = function(t, e) {
                    return e.type = "scatter", new i(t, e)
                }
            }
        }, {}],
        15: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                var h = i.helpers;
                i.defaults.bar = {
                    hover: {
                        mode: "label"
                    },
                    scales: {
                        xAxes: [{
                            type: "category",
                            categoryPercentage: .8,
                            barPercentage: .9,
                            gridLines: {
                                offsetGridLines: !0
                            }
                        }],
                        yAxes: [{
                            type: "linear"
                        }]
                    }
                }, i.controllers.bar = i.DatasetController.extend({
                    dataElementType: i.elements.Rectangle,
                    initialize: function(t, e) {
                        i.DatasetController.prototype.initialize.call(this, t, e), this.getMeta().bar = !0
                    },
                    getBarCount: function() {
                        var i = this,
                            n = 0;
                        return h.each(i.chart.data.datasets, function(t, e) {
                            i.chart.getDatasetMeta(e).bar && i.chart.isDatasetVisible(e) && ++n
                        }, i), n
                    },
                    update: function(i) {
                        var n = this;
                        h.each(n.getMeta().data, function(t, e) {
                            n.updateElement(t, e, i)
                        }, n)
                    },
                    updateElement: function(t, e, i) {
                        var n = this,
                            o = n.getMeta(),
                            r = n.getScaleForId(o.xAxisID),
                            a = n.getScaleForId(o.yAxisID),
                            s = a.getBasePixel(),
                            l = n.chart.options.elements.rectangle,
                            d = t.custom || {},
                            c = n.getDataset();
                        t._xScale = r, t._yScale = a, t._datasetIndex = n.index, t._index = e;
                        var u = n.getRuler(e);
                        t._model = {
                            x: n.calculateBarX(e, n.index, u),
                            y: i ? s : n.calculateBarY(e, n.index),
                            label: n.chart.data.labels[e],
                            datasetLabel: c.label,
                            base: i ? s : n.calculateBarBase(n.index, e),
                            width: n.calculateBarWidth(u),
                            backgroundColor: d.backgroundColor ? d.backgroundColor : h.getValueAtIndexOrDefault(c.backgroundColor, e, l.backgroundColor),
                            borderSkipped: d.borderSkipped ? d.borderSkipped : l.borderSkipped,
                            borderColor: d.borderColor ? d.borderColor : h.getValueAtIndexOrDefault(c.borderColor, e, l.borderColor),
                            borderWidth: d.borderWidth ? d.borderWidth : h.getValueAtIndexOrDefault(c.borderWidth, e, l.borderWidth)
                        }, t.pivot()
                    },
                    calculateBarBase: function(t, e) {
                        var i = this.getMeta(),
                            n = this.getScaleForId(i.yAxisID),
                            o = 0;
                        if (n.options.stacked) {
                            for (var r = this.chart, a = r.data.datasets, s = Number(a[t].data[e]), l = 0; l < t; l++) {
                                var d = a[l],
                                    c = r.getDatasetMeta(l);
                                if (c.bar && c.yAxisID === n.id && r.isDatasetVisible(l)) {
                                    var u = Number(d.data[e]);
                                    o += s < 0 ? Math.min(u, 0) : Math.max(u, 0)
                                }
                            }
                            return n.getPixelForValue(o)
                        }
                        return n.getBasePixel()
                    },
                    getRuler: function(t) {
                        var e, i = this,
                            n = i.getMeta(),
                            o = i.getScaleForId(n.xAxisID),
                            r = i.getBarCount(),
                            a = (e = "category" === o.options.type ? o.getPixelForTick(t + 1) - o.getPixelForTick(t) : o.width / o.ticks.length) * o.options.categoryPercentage,
                            s = (e - e * o.options.categoryPercentage) / 2,
                            l = a / r;
                        o.ticks.length !== i.chart.data.labels.length && (l *= o.ticks.length / i.chart.data.labels.length);
                        return {
                            datasetCount: r,
                            tickWidth: e,
                            categoryWidth: a,
                            categorySpacing: s,
                            fullBarWidth: l,
                            barWidth: l * o.options.barPercentage,
                            barSpacing: l - l * o.options.barPercentage
                        }
                    },
                    calculateBarWidth: function(t) {
                        var e = this.getScaleForId(this.getMeta().xAxisID);
                        return e.options.barThickness ? e.options.barThickness : e.options.stacked ? t.categoryWidth : t.barWidth
                    },
                    getBarIndex: function(t) {
                        var e, i = 0;
                        for (e = 0; e < t; ++e) this.chart.getDatasetMeta(e).bar && this.chart.isDatasetVisible(e) && ++i;
                        return i
                    },
                    calculateBarX: function(t, e, i) {
                        var n = this,
                            o = n.getMeta(),
                            r = n.getScaleForId(o.xAxisID),
                            a = n.getBarIndex(e),
                            s = r.getPixelForValue(null, t, e, n.chart.isCombo);
                        return s -= n.chart.isCombo ? i.tickWidth / 2 : 0, r.options.stacked ? s + i.categoryWidth / 2 + i.categorySpacing : s + i.barWidth / 2 + i.categorySpacing + i.barWidth * a + i.barSpacing / 2 + i.barSpacing * a
                    },
                    calculateBarY: function(t, e) {
                        var i = this,
                            n = i.getMeta(),
                            o = i.getScaleForId(n.yAxisID),
                            r = Number(i.getDataset().data[t]);
                        if (o.options.stacked) {
                            for (var a = 0, s = 0, l = 0; l < e; l++) {
                                var d = i.chart.data.datasets[l],
                                    c = i.chart.getDatasetMeta(l);
                                if (c.bar && c.yAxisID === o.id && i.chart.isDatasetVisible(l)) {
                                    var u = Number(d.data[t]);
                                    u < 0 ? s += u || 0 : a += u || 0
                                }
                            }
                            return r < 0 ? o.getPixelForValue(s + r) : o.getPixelForValue(a + r)
                        }
                        return o.getPixelForValue(r)
                    },
                    draw: function(t) {
                        var e, i, n = t || 1,
                            o = this.getMeta().data,
                            r = this.getDataset();
                        for (e = 0, i = o.length; e < i; ++e) {
                            var a = r.data[e];
                            null == a || isNaN(a) || o[e].transition(n).draw()
                        }
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = t._model;
                        o.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : h.getValueAtIndexOrDefault(e.hoverBackgroundColor, i, h.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor ? n.hoverBorderColor : h.getValueAtIndexOrDefault(e.hoverBorderColor, i, h.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : h.getValueAtIndexOrDefault(e.hoverBorderWidth, i, o.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = t._model,
                            r = this.chart.options.elements.rectangle;
                        o.backgroundColor = n.backgroundColor ? n.backgroundColor : h.getValueAtIndexOrDefault(e.backgroundColor, i, r.backgroundColor), o.borderColor = n.borderColor ? n.borderColor : h.getValueAtIndexOrDefault(e.borderColor, i, r.borderColor), o.borderWidth = n.borderWidth ? n.borderWidth : h.getValueAtIndexOrDefault(e.borderWidth, i, r.borderWidth)
                    }
                }), i.defaults.horizontalBar = {
                    hover: {
                        mode: "label"
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom"
                        }],
                        yAxes: [{
                            position: "left",
                            type: "category",
                            categoryPercentage: .8,
                            barPercentage: .9,
                            gridLines: {
                                offsetGridLines: !0
                            }
                        }]
                    },
                    elements: {
                        rectangle: {
                            borderSkipped: "left"
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function(t, e) {
                                var i = "";
                                return 0 < t.length && (t[0].yLabel ? i = t[0].yLabel : 0 < e.labels.length && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i
                            },
                            label: function(t, e) {
                                return (e.datasets[t.datasetIndex].label || "") + ": " + t.xLabel
                            }
                        }
                    }
                }, i.controllers.horizontalBar = i.controllers.bar.extend({
                    updateElement: function(t, e, i) {
                        var n = this,
                            o = n.getMeta(),
                            r = n.getScaleForId(o.xAxisID),
                            a = n.getScaleForId(o.yAxisID),
                            s = r.getBasePixel(),
                            l = t.custom || {},
                            d = n.getDataset(),
                            c = n.chart.options.elements.rectangle;
                        t._xScale = r, t._yScale = a, t._datasetIndex = n.index, t._index = e;
                        var u = n.getRuler(e);
                        t._model = {
                            x: i ? s : n.calculateBarX(e, n.index),
                            y: n.calculateBarY(e, n.index, u),
                            label: n.chart.data.labels[e],
                            datasetLabel: d.label,
                            base: i ? s : n.calculateBarBase(n.index, e),
                            height: n.calculateBarHeight(u),
                            backgroundColor: l.backgroundColor ? l.backgroundColor : h.getValueAtIndexOrDefault(d.backgroundColor, e, c.backgroundColor),
                            borderSkipped: l.borderSkipped ? l.borderSkipped : c.borderSkipped,
                            borderColor: l.borderColor ? l.borderColor : h.getValueAtIndexOrDefault(d.borderColor, e, c.borderColor),
                            borderWidth: l.borderWidth ? l.borderWidth : h.getValueAtIndexOrDefault(d.borderWidth, e, c.borderWidth)
                        }, t.draw = function() {
                            function t(t) {
                                return l[(d + t) % 4]
                            }
                            var e = this._chart.ctx,
                                i = this._view,
                                n = i.height / 2,
                                o = i.y - n,
                                r = i.y + n,
                                a = i.base - (i.base - i.x),
                                s = i.borderWidth / 2;
                            i.borderWidth && (o += s, r -= s, a += s), e.beginPath(), e.fillStyle = i.backgroundColor, e.strokeStyle = i.borderColor, e.lineWidth = i.borderWidth;
                            var l = [
                                    [i.base, r],
                                    [i.base, o],
                                    [a, o],
                                    [a, r]
                                ],
                                d = ["bottom", "left", "top", "right"].indexOf(i.borderSkipped, 0); - 1 === d && (d = 0), e.moveTo.apply(e, t(0));
                            for (var c = 1; c < 4; c++) e.lineTo.apply(e, t(c));
                            e.fill(), i.borderWidth && e.stroke()
                        }, t.pivot()
                    },
                    calculateBarBase: function(t, e) {
                        var i = this.getMeta(),
                            n = this.getScaleForId(i.xAxisID),
                            o = 0;
                        if (n.options.stacked) {
                            for (var r = this.chart, a = r.data.datasets, s = Number(a[t].data[e]), l = 0; l < t; l++) {
                                var d = a[l],
                                    c = r.getDatasetMeta(l);
                                if (c.bar && c.xAxisID === n.id && r.isDatasetVisible(l)) {
                                    var u = Number(d.data[e]);
                                    o += s < 0 ? Math.min(u, 0) : Math.max(u, 0)
                                }
                            }
                            return n.getPixelForValue(o)
                        }
                        return n.getBasePixel()
                    },
                    getRuler: function(t) {
                        var e, i = this,
                            n = i.getMeta(),
                            o = i.getScaleForId(n.yAxisID),
                            r = i.getBarCount(),
                            a = (e = "category" === o.options.type ? o.getPixelForTick(t + 1) - o.getPixelForTick(t) : o.width / o.ticks.length) * o.options.categoryPercentage,
                            s = (e - e * o.options.categoryPercentage) / 2,
                            l = a / r;
                        o.ticks.length !== i.chart.data.labels.length && (l *= o.ticks.length / i.chart.data.labels.length);
                        return {
                            datasetCount: r,
                            tickHeight: e,
                            categoryHeight: a,
                            categorySpacing: s,
                            fullBarHeight: l,
                            barHeight: l * o.options.barPercentage,
                            barSpacing: l - l * o.options.barPercentage
                        }
                    },
                    calculateBarHeight: function(t) {
                        var e = this.getScaleForId(this.getMeta().yAxisID);
                        return e.options.barThickness ? e.options.barThickness : e.options.stacked ? t.categoryHeight : t.barHeight
                    },
                    calculateBarX: function(t, e) {
                        var i = this,
                            n = i.getMeta(),
                            o = i.getScaleForId(n.xAxisID),
                            r = Number(i.getDataset().data[t]);
                        if (o.options.stacked) {
                            for (var a = 0, s = 0, l = 0; l < e; l++) {
                                var d = i.chart.data.datasets[l],
                                    c = i.chart.getDatasetMeta(l);
                                if (c.bar && c.xAxisID === o.id && i.chart.isDatasetVisible(l)) {
                                    var u = Number(d.data[t]);
                                    u < 0 ? s += u || 0 : a += u || 0
                                }
                            }
                            return r < 0 ? o.getPixelForValue(s + r) : o.getPixelForValue(a + r)
                        }
                        return o.getPixelForValue(r)
                    },
                    calculateBarY: function(t, e, i) {
                        var n = this,
                            o = n.getMeta(),
                            r = n.getScaleForId(o.yAxisID),
                            a = n.getBarIndex(e),
                            s = r.getPixelForValue(null, t, e, n.chart.isCombo);
                        return s -= n.chart.isCombo ? i.tickHeight / 2 : 0, r.options.stacked ? s + i.categoryHeight / 2 + i.categorySpacing : s + i.barHeight / 2 + i.categorySpacing + i.barHeight * a + i.barSpacing / 2 + i.barSpacing * a
                    }
                })
            }
        }, {}],
        16: [function(t, e, i) {
            "use strict";
            e.exports = function(p) {
                var f = p.helpers;
                p.defaults.bubble = {
                    hover: {
                        mode: "single"
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom",
                            id: "x-axis-0"
                        }],
                        yAxes: [{
                            type: "linear",
                            position: "left",
                            id: "y-axis-0"
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return ""
                            },
                            label: function(t, e) {
                                var i = e.datasets[t.datasetIndex].label || "",
                                    n = e.datasets[t.datasetIndex].data[t.index];
                                return i + ": (" + t.xLabel + ", " + t.yLabel + ", " + n.r + ")"
                            }
                        }
                    }
                }, p.controllers.bubble = p.DatasetController.extend({
                    dataElementType: p.elements.Point,
                    update: function(i) {
                        var n = this,
                            t = n.getMeta().data;
                        f.each(t, function(t, e) {
                            n.updateElement(t, e, i)
                        })
                    },
                    updateElement: function(t, e, i) {
                        var n = this,
                            o = n.getMeta(),
                            r = n.getScaleForId(o.xAxisID),
                            a = n.getScaleForId(o.yAxisID),
                            s = t.custom || {},
                            l = n.getDataset(),
                            d = l.data[e],
                            c = n.chart.options.elements.point,
                            u = n.index;
                        f.extend(t, {
                            _xScale: r,
                            _yScale: a,
                            _datasetIndex: u,
                            _index: e,
                            _model: {
                                x: i ? r.getPixelForDecimal(.5) : r.getPixelForValue("object" == typeof d ? d : NaN, e, u, n.chart.isCombo),
                                y: i ? a.getBasePixel() : a.getPixelForValue(d, e, u),
                                radius: i ? 0 : s.radius ? s.radius : n.getRadius(d),
                                hitRadius: s.hitRadius ? s.hitRadius : f.getValueAtIndexOrDefault(l.hitRadius, e, c.hitRadius)
                            }
                        }), p.DatasetController.prototype.removeHoverStyle.call(n, t, c);
                        var h = t._model;
                        h.skip = s.skip ? s.skip : isNaN(h.x) || isNaN(h.y), t.pivot()
                    },
                    getRadius: function(t) {
                        return t.r || this.chart.options.elements.point.radius
                    },
                    setHoverStyle: function(t) {
                        p.DatasetController.prototype.setHoverStyle.call(this, t);
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {};
                        t._model.radius = n.hoverRadius ? n.hoverRadius : f.getValueAtIndexOrDefault(e.hoverRadius, i, this.chart.options.elements.point.hoverRadius) + this.getRadius(e.data[i])
                    },
                    removeHoverStyle: function(t) {
                        p.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.point);
                        var e = this.chart.data.datasets[t._datasetIndex].data[t._index],
                            i = t.custom || {};
                        t._model.radius = i.radius ? i.radius : this.getRadius(e)
                    }
                })
            }
        }, {}],
        17: [function(t, e, i) {
            "use strict";
            e.exports = function(e) {
                var A = e.helpers,
                    t = e.defaults;
                t.doughnut = {
                    animation: {
                        animateRotate: !0,
                        animateScale: !1
                    },
                    aspectRatio: 1,
                    hover: {
                        mode: "single"
                    },
                    legendCallback: function(t) {
                        var e = [];
                        e.push('<ul class="' + t.id + '-legend">');
                        var i = t.data,
                            n = i.datasets,
                            o = i.labels;
                        if (n.length)
                            for (var r = 0; r < n[0].data.length; ++r) e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), o[r] && e.push(o[r]), e.push("</li>");
                        return e.push("</ul>"), e.join("")
                    },
                    legend: {
                        labels: {
                            generateLabels: function(l) {
                                var d = l.data;
                                return d.labels.length && d.datasets.length ? d.labels.map(function(t, e) {
                                    var i = l.getDatasetMeta(0),
                                        n = d.datasets[0],
                                        o = i.data[e],
                                        r = o && o.custom || {},
                                        a = A.getValueAtIndexOrDefault,
                                        s = l.options.elements.arc;
                                    return {
                                        text: t,
                                        fillStyle: r.backgroundColor ? r.backgroundColor : a(n.backgroundColor, e, s.backgroundColor),
                                        strokeStyle: r.borderColor ? r.borderColor : a(n.borderColor, e, s.borderColor),
                                        lineWidth: r.borderWidth ? r.borderWidth : a(n.borderWidth, e, s.borderWidth),
                                        hidden: isNaN(n.data[e]) || i.data[e].hidden,
                                        index: e
                                    }
                                }) : []
                            }
                        },
                        onClick: function(t, e) {
                            var i, n, o, r = e.index,
                                a = this.chart;
                            for (i = 0, n = (a.data.datasets || []).length; i < n; ++i)(o = a.getDatasetMeta(i)).data[r] && (o.data[r].hidden = !o.data[r].hidden);
                            a.update()
                        }
                    },
                    cutoutPercentage: 50,
                    rotation: -.5 * Math.PI,
                    circumference: 2 * Math.PI,
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return ""
                            },
                            label: function(t, e) {
                                var i = e.labels[t.index],
                                    n = ": " + e.datasets[t.datasetIndex].data[t.index];
                                return A.isArray(i) ? (i = i.slice())[0] += n : i += n, i
                            }
                        }
                    }
                }, t.pie = A.clone(t.doughnut), A.extend(t.pie, {
                    cutoutPercentage: 0
                }), e.controllers.doughnut = e.controllers.pie = e.DatasetController.extend({
                    dataElementType: e.elements.Arc,
                    linkScales: A.noop,
                    getRingIndex: function(t) {
                        for (var e = 0, i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && ++e;
                        return e
                    },
                    update: function(i) {
                        var n = this,
                            t = n.chart,
                            e = t.chartArea,
                            o = t.options,
                            r = o.elements.arc,
                            a = e.right - e.left - r.borderWidth,
                            s = e.bottom - e.top - r.borderWidth,
                            l = Math.min(a, s),
                            d = {
                                x: 0,
                                y: 0
                            },
                            c = n.getMeta(),
                            u = o.cutoutPercentage,
                            h = o.circumference;
                        if (h < 2 * Math.PI) {
                            var p = o.rotation % (2 * Math.PI),
                                f = (p += 2 * Math.PI * (p >= Math.PI ? -1 : p < -Math.PI ? 1 : 0)) + h,
                                g = Math.cos(p),
                                m = Math.sin(p),
                                v = Math.cos(f),
                                y = Math.sin(f),
                                b = p <= 0 && 0 <= f || p <= 2 * Math.PI && 2 * Math.PI <= f,
                                x = p <= .5 * Math.PI && .5 * Math.PI <= f || p <= 2.5 * Math.PI && 2.5 * Math.PI <= f,
                                k = p <= -Math.PI && -Math.PI <= f || p <= Math.PI && Math.PI <= f,
                                w = p <= .5 * -Math.PI && .5 * -Math.PI <= f || p <= 1.5 * Math.PI && 1.5 * Math.PI <= f,
                                S = u / 100,
                                C = k ? -1 : Math.min(g * (g < 0 ? 1 : S), v * (v < 0 ? 1 : S)),
                                T = w ? -1 : Math.min(m * (m < 0 ? 1 : S), y * (y < 0 ? 1 : S)),
                                I = b ? 1 : Math.max(g * (0 < g ? 1 : S), v * (0 < v ? 1 : S)),
                                _ = x ? 1 : Math.max(m * (0 < m ? 1 : S), y * (0 < y ? 1 : S)),
                                M = .5 * (I - C),
                                P = .5 * (_ - T);
                            l = Math.min(a / M, s / P), d = {
                                x: -.5 * (I + C),
                                y: -.5 * (_ + T)
                            }
                        }
                        t.borderWidth = n.getMaxBorderWidth(c.data), t.outerRadius = Math.max((l - t.borderWidth) / 2, 0), t.innerRadius = Math.max(u ? t.outerRadius / 100 * u : 1, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), t.offsetX = d.x * t.outerRadius, t.offsetY = d.y * t.outerRadius, c.total = n.calculateTotal(), n.outerRadius = t.outerRadius - t.radiusLength * n.getRingIndex(n.index), n.innerRadius = n.outerRadius - t.radiusLength, A.each(c.data, function(t, e) {
                            n.updateElement(t, e, i)
                        })
                    },
                    updateElement: function(t, e, i) {
                        var n = this,
                            o = n.chart,
                            r = o.chartArea,
                            a = o.options,
                            s = a.animation,
                            l = (r.left + r.right) / 2,
                            d = (r.top + r.bottom) / 2,
                            c = a.rotation,
                            u = a.rotation,
                            h = n.getDataset(),
                            p = i && s.animateRotate ? 0 : t.hidden ? 0 : n.calculateCircumference(h.data[e]) * (a.circumference / (2 * Math.PI)),
                            f = i && s.animateScale ? 0 : n.innerRadius,
                            g = i && s.animateScale ? 0 : n.outerRadius,
                            m = A.getValueAtIndexOrDefault;
                        A.extend(t, {
                            _datasetIndex: n.index,
                            _index: e,
                            _model: {
                                x: l + o.offsetX,
                                y: d + o.offsetY,
                                startAngle: c,
                                endAngle: u,
                                circumference: p,
                                outerRadius: g,
                                innerRadius: f,
                                label: m(h.label, e, o.data.labels[e])
                            }
                        });
                        var v = t._model;
                        this.removeHoverStyle(t), i && s.animateRotate || (v.startAngle = 0 === e ? a.rotation : n.getMeta().data[e - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot()
                    },
                    removeHoverStyle: function(t) {
                        e.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.arc)
                    },
                    calculateTotal: function() {
                        var i, n = this.getDataset(),
                            t = this.getMeta(),
                            o = 0;
                        return A.each(t.data, function(t, e) {
                            i = n.data[e], isNaN(i) || t.hidden || (o += Math.abs(i))
                        }), o
                    },
                    calculateCircumference: function(t) {
                        var e = this.getMeta().total;
                        return 0 < e && !isNaN(t) ? 2 * Math.PI * (t / e) : 0
                    },
                    getMaxBorderWidth: function(t) {
                        for (var e, i, n = 0, o = this.index, r = t.length, a = 0; a < r; a++) n = (n = n < (e = t[a]._model ? t[a]._model.borderWidth : 0) ? e : n) < (i = t[a]._chart ? t[a]._chart.config.data.datasets[o].hoverBorderWidth : 0) ? i : n;
                        return n
                    }
                })
            }
        }, {}],
        18: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                function p(t, e) {
                    return g.getValueOrDefault(t.showLine, e.showLines)
                }
                var g = t.helpers;
                t.defaults.line = {
                    showLines: !0,
                    spanGaps: !1,
                    hover: {
                        mode: "label"
                    },
                    scales: {
                        xAxes: [{
                            type: "category",
                            id: "x-axis-0"
                        }],
                        yAxes: [{
                            type: "linear",
                            id: "y-axis-0"
                        }]
                    }
                }, t.controllers.line = t.DatasetController.extend({
                    datasetElementType: t.elements.Line,
                    dataElementType: t.elements.Point,
                    update: function(t) {
                        var e, i, n, o = this,
                            r = o.getMeta(),
                            a = r.dataset,
                            s = r.data || [],
                            l = o.chart.options,
                            d = l.elements.line,
                            c = o.getScaleForId(r.yAxisID),
                            u = o.getDataset(),
                            h = p(u, l);
                        for (h && (n = a.custom || {}, void 0 !== u.tension && void 0 === u.lineTension && (u.lineTension = u.tension), a._scale = c, a._datasetIndex = o.index, a._children = s, a._model = {
                                spanGaps: u.spanGaps ? u.spanGaps : l.spanGaps,
                                tension: n.tension ? n.tension : g.getValueOrDefault(u.lineTension, d.tension),
                                backgroundColor: n.backgroundColor ? n.backgroundColor : u.backgroundColor || d.backgroundColor,
                                borderWidth: n.borderWidth ? n.borderWidth : u.borderWidth || d.borderWidth,
                                borderColor: n.borderColor ? n.borderColor : u.borderColor || d.borderColor,
                                borderCapStyle: n.borderCapStyle ? n.borderCapStyle : u.borderCapStyle || d.borderCapStyle,
                                borderDash: n.borderDash ? n.borderDash : u.borderDash || d.borderDash,
                                borderDashOffset: n.borderDashOffset ? n.borderDashOffset : u.borderDashOffset || d.borderDashOffset,
                                borderJoinStyle: n.borderJoinStyle ? n.borderJoinStyle : u.borderJoinStyle || d.borderJoinStyle,
                                fill: n.fill ? n.fill : void 0 !== u.fill ? u.fill : d.fill,
                                steppedLine: n.steppedLine ? n.steppedLine : g.getValueOrDefault(u.steppedLine, d.stepped),
                                cubicInterpolationMode: n.cubicInterpolationMode ? n.cubicInterpolationMode : g.getValueOrDefault(u.cubicInterpolationMode, d.cubicInterpolationMode),
                                scaleTop: c.top,
                                scaleBottom: c.bottom,
                                scaleZero: c.getBasePixel()
                            }, a.pivot()), e = 0, i = s.length; e < i; ++e) o.updateElement(s[e], e, t);
                        for (h && 0 !== a._model.tension && o.updateBezierControlPoints(), e = 0, i = s.length; e < i; ++e) s[e].pivot()
                    },
                    getPointBackgroundColor: function(t, e) {
                        var i = this.chart.options.elements.point.backgroundColor,
                            n = this.getDataset(),
                            o = t.custom || {};
                        return o.backgroundColor ? i = o.backgroundColor : n.pointBackgroundColor ? i = g.getValueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i
                    },
                    getPointBorderColor: function(t, e) {
                        var i = this.chart.options.elements.point.borderColor,
                            n = this.getDataset(),
                            o = t.custom || {};
                        return o.borderColor ? i = o.borderColor : n.pointBorderColor ? i = g.getValueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i
                    },
                    getPointBorderWidth: function(t, e) {
                        var i = this.chart.options.elements.point.borderWidth,
                            n = this.getDataset(),
                            o = t.custom || {};
                        return o.borderWidth ? i = o.borderWidth : n.pointBorderWidth ? i = g.getValueAtIndexOrDefault(n.pointBorderWidth, e, i) : n.borderWidth && (i = n.borderWidth), i
                    },
                    updateElement: function(t, e, i) {
                        var n, o, r = this,
                            a = r.getMeta(),
                            s = t.custom || {},
                            l = r.getDataset(),
                            d = r.index,
                            c = l.data[e],
                            u = r.getScaleForId(a.yAxisID),
                            h = r.getScaleForId(a.xAxisID),
                            p = r.chart.options.elements.point,
                            f = 1 === (r.chart.data.labels || []).length || 1 === l.data.length || r.chart.isCombo;
                        void 0 !== l.radius && void 0 === l.pointRadius && (l.pointRadius = l.radius), void 0 !== l.hitRadius && void 0 === l.pointHitRadius && (l.pointHitRadius = l.hitRadius), n = h.getPixelForValue("object" == typeof c ? c : NaN, e, d, f), o = i ? u.getBasePixel() : r.calculatePointY(c, e, d), t._xScale = h, t._yScale = u, t._datasetIndex = d, t._index = e, t._model = {
                            x: n,
                            y: o,
                            skip: s.skip || isNaN(n) || isNaN(o),
                            radius: s.radius || g.getValueAtIndexOrDefault(l.pointRadius, e, p.radius),
                            pointStyle: s.pointStyle || g.getValueAtIndexOrDefault(l.pointStyle, e, p.pointStyle),
                            backgroundColor: r.getPointBackgroundColor(t, e),
                            borderColor: r.getPointBorderColor(t, e),
                            borderWidth: r.getPointBorderWidth(t, e),
                            tension: a.dataset._model ? a.dataset._model.tension : 0,
                            steppedLine: !!a.dataset._model && a.dataset._model.steppedLine,
                            hitRadius: s.hitRadius || g.getValueAtIndexOrDefault(l.pointHitRadius, e, p.hitRadius)
                        }
                    },
                    calculatePointY: function(t, e, i) {
                        var n, o, r, a = this.chart,
                            s = this.getMeta(),
                            l = this.getScaleForId(s.yAxisID),
                            d = 0,
                            c = 0;
                        if (l.options.stacked) {
                            for (n = 0; n < i; n++)
                                if (o = a.data.datasets[n], "line" === (r = a.getDatasetMeta(n)).type && r.yAxisID === l.id && a.isDatasetVisible(n)) {
                                    var u = Number(l.getRightValue(o.data[e]));
                                    u < 0 ? c += u || 0 : d += u || 0
                                }
                            var h = Number(l.getRightValue(t));
                            return h < 0 ? l.getPixelForValue(c + h) : l.getPixelForValue(d + h)
                        }
                        return l.getPixelForValue(t)
                    },
                    updateBezierControlPoints: function() {
                        function t(t, e, i) {
                            return Math.max(Math.min(t, i), e)
                        }
                        var e, i, n, o, r = this.getMeta(),
                            a = this.chart.chartArea,
                            s = r.data || [];
                        if (r.dataset._model.spanGaps && (s = s.filter(function(t) {
                                return !t._model.skip
                            })), "monotone" === r.dataset._model.cubicInterpolationMode) g.splineCurveMonotone(s);
                        else
                            for (e = 0, i = s.length; e < i; ++e) n = s[e]._model, o = g.splineCurve(g.previousItem(s, e)._model, n, g.nextItem(s, e)._model, r.dataset._model.tension), n.controlPointPreviousX = o.previous.x, n.controlPointPreviousY = o.previous.y, n.controlPointNextX = o.next.x, n.controlPointNextY = o.next.y;
                        if (this.chart.options.elements.line.capBezierPoints)
                            for (e = 0, i = s.length; e < i; ++e)(n = s[e]._model).controlPointPreviousX = t(n.controlPointPreviousX, a.left, a.right), n.controlPointPreviousY = t(n.controlPointPreviousY, a.top, a.bottom), n.controlPointNextX = t(n.controlPointNextX, a.left, a.right), n.controlPointNextY = t(n.controlPointNextY, a.top, a.bottom)
                    },
                    draw: function(t) {
                        var e, i, n = this.getMeta(),
                            o = n.data || [],
                            r = t || 1;
                        for (e = 0, i = o.length; e < i; ++e) o[e].transition(r);
                        for (p(this.getDataset(), this.chart.options) && n.dataset.transition(r).draw(), e = 0, i = o.length; e < i; ++e) o[e].draw()
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = t._model;
                        o.radius = n.hoverRadius || g.getValueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), o.backgroundColor = n.hoverBackgroundColor || g.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, i, g.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor || g.getValueAtIndexOrDefault(e.pointHoverBorderColor, i, g.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth || g.getValueAtIndexOrDefault(e.pointHoverBorderWidth, i, o.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this,
                            i = e.chart.data.datasets[t._datasetIndex],
                            n = t._index,
                            o = t.custom || {},
                            r = t._model;
                        void 0 !== i.radius && void 0 === i.pointRadius && (i.pointRadius = i.radius), r.radius = o.radius || g.getValueAtIndexOrDefault(i.pointRadius, n, e.chart.options.elements.point.radius), r.backgroundColor = e.getPointBackgroundColor(t, n), r.borderColor = e.getPointBorderColor(t, n), r.borderWidth = e.getPointBorderWidth(t, n)
                    }
                })
            }
        }, {}],
        19: [function(t, e, i) {
            "use strict";
            e.exports = function(e) {
                var w = e.helpers;
                e.defaults.polarArea = {
                    scale: {
                        type: "radialLinear",
                        lineArc: !0,
                        ticks: {
                            beginAtZero: !0
                        }
                    },
                    animation: {
                        animateRotate: !0,
                        animateScale: !0
                    },
                    startAngle: -.5 * Math.PI,
                    aspectRatio: 1,
                    legendCallback: function(t) {
                        var e = [];
                        e.push('<ul class="' + t.id + '-legend">');
                        var i = t.data,
                            n = i.datasets,
                            o = i.labels;
                        if (n.length)
                            for (var r = 0; r < n[0].data.length; ++r) e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), o[r] && e.push(o[r]), e.push("</li>");
                        return e.push("</ul>"), e.join("")
                    },
                    legend: {
                        labels: {
                            generateLabels: function(s) {
                                var l = s.data;
                                return l.labels.length && l.datasets.length ? l.labels.map(function(t, e) {
                                    var i = s.getDatasetMeta(0),
                                        n = l.datasets[0],
                                        o = i.data[e].custom || {},
                                        r = w.getValueAtIndexOrDefault,
                                        a = s.options.elements.arc;
                                    return {
                                        text: t,
                                        fillStyle: o.backgroundColor ? o.backgroundColor : r(n.backgroundColor, e, a.backgroundColor),
                                        strokeStyle: o.borderColor ? o.borderColor : r(n.borderColor, e, a.borderColor),
                                        lineWidth: o.borderWidth ? o.borderWidth : r(n.borderWidth, e, a.borderWidth),
                                        hidden: isNaN(n.data[e]) || i.data[e].hidden,
                                        index: e
                                    }
                                }) : []
                            }
                        },
                        onClick: function(t, e) {
                            var i, n, o, r = e.index,
                                a = this.chart;
                            for (i = 0, n = (a.data.datasets || []).length; i < n; ++i)(o = a.getDatasetMeta(i)).data[r].hidden = !o.data[r].hidden;
                            a.update()
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return ""
                            },
                            label: function(t, e) {
                                return e.labels[t.index] + ": " + t.yLabel
                            }
                        }
                    }
                }, e.controllers.polarArea = e.DatasetController.extend({
                    dataElementType: e.elements.Arc,
                    linkScales: w.noop,
                    update: function(i) {
                        var n = this,
                            t = n.chart,
                            e = t.chartArea,
                            o = n.getMeta(),
                            r = t.options,
                            a = r.elements.arc,
                            s = Math.min(e.right - e.left, e.bottom - e.top);
                        t.outerRadius = Math.max((s - a.borderWidth / 2) / 2, 0), t.innerRadius = Math.max(r.cutoutPercentage ? t.outerRadius / 100 * r.cutoutPercentage : 1, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), n.outerRadius = t.outerRadius - t.radiusLength * n.index, n.innerRadius = n.outerRadius - t.radiusLength, o.count = n.countVisibleElements(), w.each(o.data, function(t, e) {
                            n.updateElement(t, e, i)
                        })
                    },
                    updateElement: function(t, e, i) {
                        for (var n = this, o = n.chart, r = n.getDataset(), a = o.options, s = a.animation, l = o.scale, d = w.getValueAtIndexOrDefault, c = o.data.labels, u = n.calculateCircumference(r.data[e]), h = l.xCenter, p = l.yCenter, f = 0, g = n.getMeta(), m = 0; m < e; ++m) isNaN(r.data[m]) || g.data[m].hidden || ++f;
                        var v = a.startAngle,
                            y = t.hidden ? 0 : l.getDistanceFromCenterForValue(r.data[e]),
                            b = v + u * f,
                            x = b + (t.hidden ? 0 : u),
                            k = s.animateScale ? 0 : l.getDistanceFromCenterForValue(r.data[e]);
                        w.extend(t, {
                            _datasetIndex: n.index,
                            _index: e,
                            _scale: l,
                            _model: {
                                x: h,
                                y: p,
                                innerRadius: 0,
                                outerRadius: i ? k : y,
                                startAngle: i && s.animateRotate ? v : b,
                                endAngle: i && s.animateRotate ? v : x,
                                label: d(c, e, c[e])
                            }
                        }), n.removeHoverStyle(t), t.pivot()
                    },
                    removeHoverStyle: function(t) {
                        e.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.arc)
                    },
                    countVisibleElements: function() {
                        var i = this.getDataset(),
                            t = this.getMeta(),
                            n = 0;
                        return w.each(t.data, function(t, e) {
                            isNaN(i.data[e]) || t.hidden || n++
                        }), n
                    },
                    calculateCircumference: function(t) {
                        var e = this.getMeta().count;
                        return 0 < e && !isNaN(t) ? 2 * Math.PI / e : 0
                    }
                })
            }
        }, {}],
        20: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var d = t.helpers;
                t.defaults.radar = {
                    aspectRatio: 1,
                    scale: {
                        type: "radialLinear"
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }, t.controllers.radar = t.DatasetController.extend({
                    datasetElementType: t.elements.Line,
                    dataElementType: t.elements.Point,
                    linkScales: d.noop,
                    update: function(i) {
                        var n = this,
                            t = n.getMeta(),
                            e = t.dataset,
                            o = t.data,
                            r = e.custom || {},
                            a = n.getDataset(),
                            s = n.chart.options.elements.line,
                            l = n.chart.scale;
                        void 0 !== a.tension && void 0 === a.lineTension && (a.lineTension = a.tension), d.extend(t.dataset, {
                            _datasetIndex: n.index,
                            _children: o,
                            _loop: !0,
                            _model: {
                                tension: r.tension ? r.tension : d.getValueOrDefault(a.lineTension, s.tension),
                                backgroundColor: r.backgroundColor ? r.backgroundColor : a.backgroundColor || s.backgroundColor,
                                borderWidth: r.borderWidth ? r.borderWidth : a.borderWidth || s.borderWidth,
                                borderColor: r.borderColor ? r.borderColor : a.borderColor || s.borderColor,
                                fill: r.fill ? r.fill : void 0 !== a.fill ? a.fill : s.fill,
                                borderCapStyle: r.borderCapStyle ? r.borderCapStyle : a.borderCapStyle || s.borderCapStyle,
                                borderDash: r.borderDash ? r.borderDash : a.borderDash || s.borderDash,
                                borderDashOffset: r.borderDashOffset ? r.borderDashOffset : a.borderDashOffset || s.borderDashOffset,
                                borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : a.borderJoinStyle || s.borderJoinStyle,
                                scaleTop: l.top,
                                scaleBottom: l.bottom,
                                scaleZero: l.getBasePosition()
                            }
                        }), t.dataset.pivot(), d.each(o, function(t, e) {
                            n.updateElement(t, e, i)
                        }, n), n.updateBezierControlPoints()
                    },
                    updateElement: function(t, e, i) {
                        var n = this,
                            o = t.custom || {},
                            r = n.getDataset(),
                            a = n.chart.scale,
                            s = n.chart.options.elements.point,
                            l = a.getPointPositionForValue(e, r.data[e]);
                        d.extend(t, {
                            _datasetIndex: n.index,
                            _index: e,
                            _scale: a,
                            _model: {
                                x: i ? a.xCenter : l.x,
                                y: i ? a.yCenter : l.y,
                                tension: o.tension ? o.tension : d.getValueOrDefault(r.tension, n.chart.options.elements.line.tension),
                                radius: o.radius ? o.radius : d.getValueAtIndexOrDefault(r.pointRadius, e, s.radius),
                                backgroundColor: o.backgroundColor ? o.backgroundColor : d.getValueAtIndexOrDefault(r.pointBackgroundColor, e, s.backgroundColor),
                                borderColor: o.borderColor ? o.borderColor : d.getValueAtIndexOrDefault(r.pointBorderColor, e, s.borderColor),
                                borderWidth: o.borderWidth ? o.borderWidth : d.getValueAtIndexOrDefault(r.pointBorderWidth, e, s.borderWidth),
                                pointStyle: o.pointStyle ? o.pointStyle : d.getValueAtIndexOrDefault(r.pointStyle, e, s.pointStyle),
                                hitRadius: o.hitRadius ? o.hitRadius : d.getValueAtIndexOrDefault(r.hitRadius, e, s.hitRadius)
                            }
                        }), t._model.skip = o.skip ? o.skip : isNaN(t._model.x) || isNaN(t._model.y)
                    },
                    updateBezierControlPoints: function() {
                        var o = this.chart.chartArea,
                            r = this.getMeta();
                        d.each(r.data, function(t, e) {
                            var i = t._model,
                                n = d.splineCurve(d.previousItem(r.data, e, !0)._model, i, d.nextItem(r.data, e, !0)._model, i.tension);
                            i.controlPointPreviousX = Math.max(Math.min(n.previous.x, o.right), o.left), i.controlPointPreviousY = Math.max(Math.min(n.previous.y, o.bottom), o.top), i.controlPointNextX = Math.max(Math.min(n.next.x, o.right), o.left), i.controlPointNextY = Math.max(Math.min(n.next.y, o.bottom), o.top), t.pivot()
                        })
                    },
                    draw: function(t) {
                        var e = this.getMeta(),
                            i = t || 1;
                        d.each(e.data, function(t) {
                            t.transition(i)
                        }), e.dataset.transition(i).draw(), d.each(e.data, function(t) {
                            t.draw()
                        })
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            o = t._model;
                        o.radius = i.hoverRadius ? i.hoverRadius : d.getValueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), o.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : d.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, n, d.getHoverColor(o.backgroundColor)), o.borderColor = i.hoverBorderColor ? i.hoverBorderColor : d.getValueAtIndexOrDefault(e.pointHoverBorderColor, n, d.getHoverColor(o.borderColor)), o.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : d.getValueAtIndexOrDefault(e.pointHoverBorderWidth, n, o.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            o = t._model,
                            r = this.chart.options.elements.point;
                        o.radius = i.radius ? i.radius : d.getValueAtIndexOrDefault(e.radius, n, r.radius), o.backgroundColor = i.backgroundColor ? i.backgroundColor : d.getValueAtIndexOrDefault(e.pointBackgroundColor, n, r.backgroundColor), o.borderColor = i.borderColor ? i.borderColor : d.getValueAtIndexOrDefault(e.pointBorderColor, n, r.borderColor), o.borderWidth = i.borderWidth ? i.borderWidth : d.getValueAtIndexOrDefault(e.pointBorderWidth, n, r.borderWidth)
                    }
                })
            }
        }, {}],
        21: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var i = t.helpers;
                t.defaults.global.animation = {
                    duration: 1e3,
                    easing: "easeOutQuart",
                    onProgress: i.noop,
                    onComplete: i.noop
                }, t.Animation = t.Element.extend({
                    currentStep: null,
                    numSteps: 60,
                    easing: "",
                    render: null,
                    onAnimationProgress: null,
                    onAnimationComplete: null
                }), t.animationService = {
                    frameDuration: 17,
                    animations: [],
                    dropFrames: 0,
                    request: null,
                    addAnimation: function(t, e, i, n) {
                        var o = this;
                        n || (t.animating = !0);
                        for (var r = 0; r < o.animations.length; ++r)
                            if (o.animations[r].chartInstance === t) return void(o.animations[r].animationObject = e);
                        o.animations.push({
                            chartInstance: t,
                            animationObject: e
                        }), 1 === o.animations.length && o.requestAnimationFrame()
                    },
                    cancelAnimation: function(e) {
                        var t = i.findIndex(this.animations, function(t) {
                            return t.chartInstance === e
                        }); - 1 !== t && (this.animations.splice(t, 1), e.animating = !1)
                    },
                    requestAnimationFrame: function() {
                        var t = this;
                        null === t.request && (t.request = i.requestAnimFrame.call(window, function() {
                            t.request = null, t.startDigest()
                        }))
                    },
                    startDigest: function() {
                        var t = this,
                            e = Date.now(),
                            i = 0;
                        1 < t.dropFrames && (i = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1);
                        for (var n = 0; n < t.animations.length;) null === t.animations[n].animationObject.currentStep && (t.animations[n].animationObject.currentStep = 0), t.animations[n].animationObject.currentStep += 1 + i, t.animations[n].animationObject.currentStep > t.animations[n].animationObject.numSteps && (t.animations[n].animationObject.currentStep = t.animations[n].animationObject.numSteps), t.animations[n].animationObject.render(t.animations[n].chartInstance, t.animations[n].animationObject), t.animations[n].animationObject.onAnimationProgress && t.animations[n].animationObject.onAnimationProgress.call && t.animations[n].animationObject.onAnimationProgress.call(t.animations[n].chartInstance, t.animations[n]), t.animations[n].animationObject.currentStep === t.animations[n].animationObject.numSteps ? (t.animations[n].animationObject.onAnimationComplete && t.animations[n].animationObject.onAnimationComplete.call && t.animations[n].animationObject.onAnimationComplete.call(t.animations[n].chartInstance, t.animations[n]), t.animations[n].chartInstance.animating = !1, t.animations.splice(n, 1)) : ++n;
                        var o = (Date.now() - e) / t.frameDuration;
                        t.dropFrames += o, 0 < t.animations.length && t.requestAnimationFrame()
                    }
                }
            }
        }, {}],
        22: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                (t.canvasHelpers = {}).drawPoint = function(t, e, i, n, o) {
                    var r, a, s, l, d, c;
                    if ("object" != typeof e || "[object HTMLImageElement]" !== (r = e.toString()) && "[object HTMLCanvasElement]" !== r) {
                        if (!(isNaN(i) || i <= 0)) {
                            switch (e) {
                                default: t.beginPath(),
                                t.arc(n, o, i, 0, 2 * Math.PI),
                                t.closePath(),
                                t.fill();
                                break;
                                case "triangle":
                                        t.beginPath(),
                                    d = (a = 3 * i / Math.sqrt(3)) * Math.sqrt(3) / 2,
                                    t.moveTo(n - a / 2, o + d / 3),
                                    t.lineTo(n + a / 2, o + d / 3),
                                    t.lineTo(n, o - 2 * d / 3),
                                    t.closePath(),
                                    t.fill();
                                    break;
                                case "rect":
                                        c = 1 / Math.SQRT2 * i,
                                    t.beginPath(),
                                    t.fillRect(n - c, o - c, 2 * c, 2 * c),
                                    t.strokeRect(n - c, o - c, 2 * c, 2 * c);
                                    break;
                                case "rectRot":
                                        c = 1 / Math.SQRT2 * i,
                                    t.beginPath(),
                                    t.moveTo(n - c, o),
                                    t.lineTo(n, o + c),
                                    t.lineTo(n + c, o),
                                    t.lineTo(n, o - c),
                                    t.closePath(),
                                    t.fill();
                                    break;
                                case "cross":
                                        t.beginPath(),
                                    t.moveTo(n, o + i),
                                    t.lineTo(n, o - i),
                                    t.moveTo(n - i, o),
                                    t.lineTo(n + i, o),
                                    t.closePath();
                                    break;
                                case "crossRot":
                                        t.beginPath(),
                                    s = Math.cos(Math.PI / 4) * i,
                                    l = Math.sin(Math.PI / 4) * i,
                                    t.moveTo(n - s, o - l),
                                    t.lineTo(n + s, o + l),
                                    t.moveTo(n - s, o + l),
                                    t.lineTo(n + s, o - l),
                                    t.closePath();
                                    break;
                                case "star":
                                        t.beginPath(),
                                    t.moveTo(n, o + i),
                                    t.lineTo(n, o - i),
                                    t.moveTo(n - i, o),
                                    t.lineTo(n + i, o),
                                    s = Math.cos(Math.PI / 4) * i,
                                    l = Math.sin(Math.PI / 4) * i,
                                    t.moveTo(n - s, o - l),
                                    t.lineTo(n + s, o + l),
                                    t.moveTo(n - s, o + l),
                                    t.lineTo(n + s, o - l),
                                    t.closePath();
                                    break;
                                case "line":
                                        t.beginPath(),
                                    t.moveTo(n - i, o),
                                    t.lineTo(n + i, o),
                                    t.closePath();
                                    break;
                                case "dash":
                                        t.beginPath(),
                                    t.moveTo(n, o),
                                    t.lineTo(n + i, o),
                                    t.closePath()
                            }
                            t.stroke()
                        }
                    } else t.drawImage(e, n - e.width / 2, o - e.height / 2)
                }
            }
        }, {}],
        23: [function(t, e, i) {
            "use strict";
            e.exports = function(c) {
                function s(t, e) {
                    var i = h.getStyle(t, e),
                        n = i && i.match(/(\d+)px/);
                    return n ? Number(n[1]) : void 0
                }

                function u(t, e) {
                    if ("string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t instanceof HTMLCanvasElement) {
                        var i = t.getContext && t.getContext("2d");
                        if (i instanceof CanvasRenderingContext2D) return function(t, e) {
                            var i = t.style,
                                n = t.getAttribute("height"),
                                o = t.getAttribute("width");
                            if (t._chartjs = {
                                    initial: {
                                        height: n,
                                        width: o,
                                        style: {
                                            display: i.display,
                                            height: i.height,
                                            width: i.width
                                        }
                                    }
                                }, i.display = i.display || "block", null === o || "" === o) {
                                var r = s(t, "width");
                                void 0 !== r && (t.width = r)
                            }
                            if (null === n || "" === n)
                                if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2);
                                else {
                                    var a = s(t, "height");
                                    void 0 !== r && (t.height = a)
                                }
                        }(t, e), i
                    }
                    return null
                }
                var h = c.helpers;
                c.types = {}, c.instances = {}, c.controllers = {}, c.Controller = function(t, e, i) {
                    var n, o, r = this;
                    (o = (n = (n = e) || {}).data = n.data || {}).datasets = o.datasets || [], o.labels = o.labels || [], n.options = h.configMerge(c.defaults.global, c.defaults[n.type], n.options || {});
                    var a = u(t, e = n),
                        s = a && a.canvas,
                        l = s && s.height,
                        d = s && s.width;
                    return i.ctx = a, i.canvas = s, i.config = e, i.width = d, i.height = l, i.aspectRatio = l ? d / l : null, r.id = h.uid(), r.chart = i, r.config = e, r.options = e.options, r._bufferedRender = !1, c.instances[r.id] = r, Object.defineProperty(r, "data", {
                        get: function() {
                            return r.config.data
                        }
                    }), a && s ? (h.retinaScale(i), r.options.responsive && (h.addResizeListener(s.parentNode, function() {
                        r.resize()
                    }), r.resize(!0)), r.initialize()) : console.error("Failed to create chart: can't acquire context from the given item"), r
                }, h.extend(c.Controller.prototype, {
                    initialize: function() {
                        var t = this;
                        return c.plugins.notify("beforeInit", [t]), t.bindEvents(), t.ensureScalesHaveIDs(), t.buildOrUpdateControllers(), t.buildScales(), t.updateLayout(), t.resetElements(), t.initToolTip(), t.update(), c.plugins.notify("afterInit", [t]), t
                    },
                    clear: function() {
                        return h.clear(this.chart), this
                    },
                    stop: function() {
                        return c.animationService.cancelAnimation(this), this
                    },
                    resize: function(t) {
                        var e = this,
                            i = e.chart,
                            n = e.options,
                            o = i.canvas,
                            r = n.maintainAspectRatio && i.aspectRatio || null,
                            a = Math.floor(h.getMaximumWidth(o)),
                            s = Math.floor(r ? a / r : h.getMaximumHeight(o));
                        if (i.width !== a || i.height !== s) {
                            o.width = i.width = a, o.height = i.height = s, o.style.width = a + "px", o.style.height = s + "px", h.retinaScale(i);
                            var l = {
                                width: a,
                                height: s
                            };
                            c.plugins.notify("resize", [e, l]), e.options.onResize && e.options.onResize(e, l), t || (e.stop(), e.update(e.options.responsiveAnimationDuration))
                        }
                    },
                    ensureScalesHaveIDs: function() {
                        var t = this.options,
                            e = t.scales || {},
                            i = t.scale;
                        h.each(e.xAxes, function(t, e) {
                            t.id = t.id || "x-axis-" + e
                        }), h.each(e.yAxes, function(t, e) {
                            t.id = t.id || "y-axis-" + e
                        }), i && (i.id = i.id || "scale")
                    },
                    buildScales: function() {
                        var r = this,
                            t = r.options,
                            a = r.scales = {},
                            e = [];
                        t.scales && (e = e.concat((t.scales.xAxes || []).map(function(t) {
                            return {
                                options: t,
                                dtype: "category"
                            }
                        }), (t.scales.yAxes || []).map(function(t) {
                            return {
                                options: t,
                                dtype: "linear"
                            }
                        }))), t.scale && e.push({
                            options: t.scale,
                            dtype: "radialLinear",
                            isDefault: !0
                        }), h.each(e, function(t) {
                            var e = t.options,
                                i = h.getValueOrDefault(e.type, t.dtype),
                                n = c.scaleService.getScaleConstructor(i);
                            if (n) {
                                var o = new n({
                                    id: e.id,
                                    options: e,
                                    ctx: r.chart.ctx,
                                    chart: r
                                });
                                a[o.id] = o, t.isDefault && (r.scale = o)
                            }
                        }), c.scaleService.addScalesToLayout(this)
                    },
                    updateLayout: function() {
                        c.layoutService.update(this, this.chart.width, this.chart.height)
                    },
                    buildOrUpdateControllers: function() {
                        var n = this,
                            o = [],
                            r = [];
                        if (h.each(n.data.datasets, function(t, e) {
                                var i = n.getDatasetMeta(e);
                                i.type || (i.type = t.type || n.config.type), o.push(i.type), i.controller ? i.controller.updateIndex(e) : (i.controller = new c.controllers[i.type](n, e), r.push(i.controller))
                            }, n), 1 < o.length)
                            for (var t = 1; t < o.length; t++)
                                if (o[t] !== o[t - 1]) {
                                    n.isCombo = !0;
                                    break
                                }
                        return r
                    },
                    resetElements: function() {
                        var i = this;
                        h.each(i.data.datasets, function(t, e) {
                            i.getDatasetMeta(e).controller.reset()
                        }, i)
                    },
                    reset: function() {
                        this.resetElements(), this.tooltip.initialize()
                    },
                    update: function(t, e) {
                        var i = this;
                        c.plugins.notify("beforeUpdate", [i]), i.tooltip._data = i.data;
                        var n = i.buildOrUpdateControllers();
                        h.each(i.data.datasets, function(t, e) {
                            i.getDatasetMeta(e).controller.buildOrUpdateElements()
                        }, i), c.layoutService.update(i, i.chart.width, i.chart.height), c.plugins.notify("afterScaleUpdate", [i]), h.each(n, function(t) {
                            t.reset()
                        }), i.updateDatasets(), c.plugins.notify("afterUpdate", [i]), i._bufferedRender ? i._bufferedRequest = {
                            lazy: e,
                            duration: t
                        } : i.render(t, e)
                    },
                    updateDatasets: function() {
                        var t, e;
                        if (c.plugins.notify("beforeDatasetsUpdate", [this])) {
                            for (t = 0, e = this.data.datasets.length; t < e; ++t) this.getDatasetMeta(t).controller.update();
                            c.plugins.notify("afterDatasetsUpdate", [this])
                        }
                    },
                    render: function(t, e) {
                        var i = this;
                        c.plugins.notify("beforeRender", [i]);
                        var n = i.options.animation;
                        if (n && (void 0 !== t && 0 !== t || void 0 === t && 0 !== n.duration)) {
                            var o = new c.Animation;
                            o.numSteps = (t || n.duration) / 16.66, o.easing = n.easing, o.render = function(t, e) {
                                var i = h.easingEffects[e.easing],
                                    n = e.currentStep / e.numSteps,
                                    o = i(n);
                                t.draw(o, n, e.currentStep)
                            }, o.onAnimationProgress = n.onProgress, o.onAnimationComplete = n.onComplete, c.animationService.addAnimation(i, o, t, e)
                        } else i.draw(), n && n.onComplete && n.onComplete.call && n.onComplete.call(i);
                        return i
                    },
                    draw: function(i) {
                        var n = this,
                            t = i || 1;
                        n.clear(), c.plugins.notify("beforeDraw", [n, t]), h.each(n.boxes, function(t) {
                            t.draw(n.chartArea)
                        }, n), n.scale && n.scale.draw(), c.plugins.notify("beforeDatasetsDraw", [n, t]), h.each(n.data.datasets, function(t, e) {
                            n.isDatasetVisible(e) && n.getDatasetMeta(e).controller.draw(i)
                        }, n, !0), c.plugins.notify("afterDatasetsDraw", [n, t]), n.tooltip.transition(t).draw(), c.plugins.notify("afterDraw", [n, t])
                    },
                    getElementAtEvent: function(t) {
                        return c.Interaction.modes.single(this, t)
                    },
                    getElementsAtEvent: function(t) {
                        return c.Interaction.modes.label(this, t, {
                            intersect: !0
                        })
                    },
                    getElementsAtXAxis: function(t) {
                        return c.Interaction.modes["x-axis"](this, t, {
                            intersect: !0
                        })
                    },
                    getElementsAtEventForMode: function(t, e, i) {
                        var n = c.Interaction.modes[e];
                        return "function" == typeof n ? n(this, t, i) : []
                    },
                    getDatasetAtEvent: function(t) {
                        return c.Interaction.modes.dataset(this, t)
                    },
                    getDatasetMeta: function(t) {
                        var e = this.data.datasets[t];
                        e._meta || (e._meta = {});
                        var i = e._meta[this.id];
                        return i || (i = e._meta[this.id] = {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null
                        }), i
                    },
                    getVisibleDatasetCount: function() {
                        for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e) this.isDatasetVisible(e) && t++;
                        return t
                    },
                    isDatasetVisible: function(t) {
                        var e = this.getDatasetMeta(t);
                        return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
                    },
                    generateLegend: function() {
                        return this.options.legendCallback(this)
                    },
                    destroy: function() {
                        var t, e, i, n = this,
                            o = n.chart.canvas;
                        for (n.stop(), e = 0, i = n.data.datasets.length; e < i; ++e)(t = n.getDatasetMeta(e)).controller && (t.controller.destroy(), t.controller = null);
                        o && (h.unbindEvents(n, n.events), h.removeResizeListener(o.parentNode), h.clear(n.chart), function(i) {
                            if (i._chartjs) {
                                var n = i._chartjs.initial;
                                ["height", "width"].forEach(function(t) {
                                    var e = n[t];
                                    null == e ? i.removeAttribute(t) : i.setAttribute(t, e)
                                }), h.each(n.style || {}, function(t, e) {
                                    i.style[e] = t
                                }), i.width = i.width, delete i._chartjs
                            }
                        }(o), n.chart.canvas = null, n.chart.ctx = null), c.plugins.notify("destroy", [n]), delete c.instances[n.id]
                    },
                    toBase64Image: function() {
                        return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
                    },
                    initToolTip: function() {
                        var t = this;
                        t.tooltip = new c.Tooltip({
                            _chart: t.chart,
                            _chartInstance: t,
                            _data: t.data,
                            _options: t.options.tooltips
                        }, t), t.tooltip.initialize()
                    },
                    bindEvents: function() {
                        var e = this;
                        h.bindEvents(e, e.options.events, function(t) {
                            e.eventHandler(t)
                        })
                    },
                    updateHoverStyle: function(t, e, i) {
                        var n, o, r, a = i ? "setHoverStyle" : "removeHoverStyle";
                        for (o = 0, r = t.length; o < r; ++o)(n = t[o]) && this.getDatasetMeta(n._datasetIndex).controller[a](n)
                    },
                    eventHandler: function(t) {
                        var e = this,
                            i = e.legend,
                            n = e.tooltip,
                            o = e.options.hover;
                        e._bufferedRender = !0, e._bufferedRequest = null;
                        var r = e.handleEvent(t);
                        r |= i && i.handleEvent(t), r |= n && n.handleEvent(t);
                        var a = e._bufferedRequest;
                        return a ? e.render(a.duration, a.lazy) : r && !e.animating && (e.stop(), e.render(o.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e
                    },
                    handleEvent: function(t) {
                        var e, i = this,
                            n = i.options || {},
                            o = n.hover;
                        return i.lastActive = i.lastActive || [], "mouseout" === t.type ? i.active = [] : i.active = i.getElementsAtEventForMode(t, o.mode, o), o.onHover && o.onHover.call(i, i.active), ("mouseup" === t.type || "click" === t.type) && n.onClick && n.onClick.call(i, t, i.active), i.lastActive.length && i.updateHoverStyle(i.lastActive, o.mode, !1), i.active.length && o.mode && i.updateHoverStyle(i.active, o.mode, !0), e = !h.arrayEquals(i.active, i.lastActive), i.lastActive = i.active, e
                    }
                })
            }
        }, {}],
        24: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                function r(e, t) {
                    var i = e._chartjs;
                    if (i) {
                        var n = i.listeners,
                            o = n.indexOf(t); - 1 !== o && n.splice(o, 1), 0 < n.length || (a.forEach(function(t) {
                            delete e[t]
                        }), delete e._chartjs)
                    }
                }
                var s = t.helpers,
                    a = ["push", "pop", "shift", "splice", "unshift"];
                t.DatasetController = function(t, e) {
                    this.initialize(t, e)
                }, s.extend(t.DatasetController.prototype, {
                    datasetElementType: null,
                    dataElementType: null,
                    initialize: function(t, e) {
                        this.chart = t, this.index = e, this.linkScales(), this.addElements()
                    },
                    updateIndex: function(t) {
                        this.index = t
                    },
                    linkScales: function() {
                        var t = this.getMeta(),
                            e = this.getDataset();
                        null === t.xAxisID && (t.xAxisID = e.xAxisID || this.chart.options.scales.xAxes[0].id), null === t.yAxisID && (t.yAxisID = e.yAxisID || this.chart.options.scales.yAxes[0].id)
                    },
                    getDataset: function() {
                        return this.chart.data.datasets[this.index]
                    },
                    getMeta: function() {
                        return this.chart.getDatasetMeta(this.index)
                    },
                    getScaleForId: function(t) {
                        return this.chart.scales[t]
                    },
                    reset: function() {
                        this.update(!0)
                    },
                    destroy: function() {
                        this._data && r(this._data, this)
                    },
                    createMetaDataset: function() {
                        var t = this.datasetElementType;
                        return t && new t({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index
                        })
                    },
                    createMetaData: function(t) {
                        var e = this.dataElementType;
                        return e && new e({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: t
                        })
                    },
                    addElements: function() {
                        var t, e, i = this.getMeta(),
                            n = this.getDataset().data || [],
                            o = i.data;
                        for (t = 0, e = n.length; t < e; ++t) o[t] = o[t] || this.createMetaData(t);
                        i.dataset = i.dataset || this.createMetaDataset()
                    },
                    addElementAndReset: function(t) {
                        var e = this.createMetaData(t);
                        this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
                    },
                    buildOrUpdateElements: function() {
                        var o, t, e = this,
                            i = e.getDataset(),
                            n = i.data || (i.data = []);
                        e._data !== n && (e._data && r(e._data, e), t = e, (o = n)._chartjs ? o._chartjs.listeners.push(t) : (Object.defineProperty(o, "_chartjs", {
                            configurable: !0,
                            enumerable: !1,
                            value: {
                                listeners: [t]
                            }
                        }), a.forEach(function(t) {
                            var i = "onData" + t.charAt(0).toUpperCase() + t.slice(1),
                                n = o[t];
                            Object.defineProperty(o, t, {
                                configurable: !0,
                                enumerable: !1,
                                value: function() {
                                    var e = Array.prototype.slice.call(arguments),
                                        t = n.apply(this, e);
                                    return s.each(o._chartjs.listeners, function(t) {
                                        "function" == typeof t[i] && t[i].apply(t, e)
                                    }), t
                                }
                            })
                        })), e._data = n), e.resyncElements()
                    },
                    update: s.noop,
                    draw: function(t) {
                        var e, i, n = t || 1,
                            o = this.getMeta().data;
                        for (e = 0, i = o.length; e < i; ++e) o[e].transition(n).draw()
                    },
                    removeHoverStyle: function(t, e) {
                        var i = this.chart.data.datasets[t._datasetIndex],
                            n = t._index,
                            o = t.custom || {},
                            r = s.getValueAtIndexOrDefault,
                            a = t._model;
                        a.backgroundColor = o.backgroundColor ? o.backgroundColor : r(i.backgroundColor, n, e.backgroundColor), a.borderColor = o.borderColor ? o.borderColor : r(i.borderColor, n, e.borderColor), a.borderWidth = o.borderWidth ? o.borderWidth : r(i.borderWidth, n, e.borderWidth)
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = s.getValueAtIndexOrDefault,
                            r = s.getHoverColor,
                            a = t._model;
                        a.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : o(e.hoverBackgroundColor, i, r(a.backgroundColor)), a.borderColor = n.hoverBorderColor ? n.hoverBorderColor : o(e.hoverBorderColor, i, r(a.borderColor)), a.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : o(e.hoverBorderWidth, i, a.borderWidth)
                    },
                    resyncElements: function() {
                        var t = this.getMeta(),
                            e = this.getDataset().data,
                            i = t.data.length,
                            n = e.length;
                        n < i ? t.data.splice(n, i - n) : i < n && this.insertElements(i, n - i)
                    },
                    insertElements: function(t, e) {
                        for (var i = 0; i < e; ++i) this.addElementAndReset(t + i)
                    },
                    onDataPush: function() {
                        this.insertElements(this.getDataset().data.length - 1, arguments.length)
                    },
                    onDataPop: function() {
                        this.getMeta().data.pop()
                    },
                    onDataShift: function() {
                        this.getMeta().data.shift()
                    },
                    onDataSplice: function(t, e) {
                        this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
                    },
                    onDataUnshift: function() {
                        this.insertElements(0, arguments.length)
                    }
                }), t.DatasetController.extend = s.inherits
            }
        }, {}],
        25: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var a = t.helpers;
                t.elements = {}, t.Element = function(t) {
                    a.extend(this, t), this.initialize.apply(this, arguments)
                }, a.extend(t.Element.prototype, {
                    initialize: function() {
                        this.hidden = !1
                    },
                    pivot: function() {
                        var t = this;
                        return t._view || (t._view = a.clone(t._model)), t._start = a.clone(t._view), t
                    },
                    transition: function(o) {
                        var r = this;
                        return r._view || (r._view = a.clone(r._model)), 1 === o ? (r._view = r._model, r._start = null) : (r._start || r.pivot(), a.each(r._model, function(e, i) {
                            if ("_" === i[0]);
                            else if (r._view.hasOwnProperty(i))
                                if (e === r._view[i]);
                                else if ("string" == typeof e) try {
                                var t = a.color(r._model[i]).mix(a.color(r._start[i]), o);
                                r._view[i] = t.rgbString()
                            } catch (t) {
                                r._view[i] = e
                            } else if ("number" == typeof e) {
                                var n = void 0 !== r._start[i] && !1 === isNaN(r._start[i]) ? r._start[i] : 0;
                                r._view[i] = (r._model[i] - n) * o + n
                            } else r._view[i] = e;
                            else "number" != typeof e || isNaN(r._view[i]) ? r._view[i] = e : r._view[i] = e * o
                        }, r)), r
                    },
                    tooltipPosition: function() {
                        return {
                            x: this._model.x,
                            y: this._model.y
                        }
                    },
                    hasValue: function() {
                        return a.isNumber(this._model.x) && a.isNumber(this._model.y)
                    }
                }), t.Element.extend = a.inherits
            }
        }, {}],
        26: [function(t, e, i) {
            "use strict";
            var n = t(3);
            e.exports = function(a) {
                function c(t, e, i) {
                    var n;
                    return "string" == typeof t ? (n = parseInt(t, 10), -1 !== t.indexOf("%") && (n = n / 100 * e.parentNode[i])) : n = t, n
                }

                function u(t) {
                    return null != t && "none" !== t
                }

                function e(t, e, i) {
                    var n = document.defaultView,
                        o = t.parentNode,
                        r = n.getComputedStyle(t)[e],
                        a = n.getComputedStyle(o)[e],
                        s = u(r),
                        l = u(a),
                        d = Number.POSITIVE_INFINITY;
                    return s || l ? Math.min(s ? c(r, t, i) : d, l ? c(a, o, i) : d) : "none"
                }
                var t, f = a.helpers = {};
                f.each = function(t, e, i, n) {
                    var o, r;
                    if (f.isArray(t))
                        if (r = t.length, n)
                            for (o = r - 1; 0 <= o; o--) e.call(i, t[o], o);
                        else
                            for (o = 0; o < r; o++) e.call(i, t[o], o);
                    else if ("object" == typeof t) {
                        var a = Object.keys(t);
                        for (r = a.length, o = 0; o < r; o++) e.call(i, t[a[o]], a[o])
                    }
                }, f.clone = function(t) {
                    var i = {};
                    return f.each(t, function(t, e) {
                        f.isArray(t) ? i[e] = t.slice(0) : i[e] = "object" == typeof t && null !== t ? f.clone(t) : t
                    }), i
                }, f.extend = function(i) {
                    for (var t = function(t, e) {
                            i[e] = t
                        }, e = 1, n = arguments.length; e < n; e++) f.each(arguments[e], t);
                    return i
                }, f.configMerge = function(t) {
                    var o = f.clone(t);
                    return f.each(Array.prototype.slice.call(arguments, 1), function(t) {
                        f.each(t, function(t, e) {
                            var i = o.hasOwnProperty(e),
                                n = i ? o[e] : {};
                            "scales" === e ? o[e] = f.scaleMerge(n, t) : "scale" === e ? o[e] = f.configMerge(n, a.scaleService.getScaleDefaults(t.type), t) : !i || "object" != typeof n || f.isArray(n) || null === n || "object" != typeof t || f.isArray(t) ? o[e] = t : o[e] = f.configMerge(n, t)
                        })
                    }), o
                }, f.scaleMerge = function(t, e) {
                    var r = f.clone(t);
                    return f.each(e, function(t, o) {
                        "xAxes" === o || "yAxes" === o ? r.hasOwnProperty(o) ? f.each(t, function(t, e) {
                            var i = f.getValueOrDefault(t.type, "xAxes" === o ? "category" : "linear"),
                                n = a.scaleService.getScaleDefaults(i);
                            e >= r[o].length || !r[o][e].type ? r[o].push(f.configMerge(n, t)) : t.type && t.type !== r[o][e].type ? r[o][e] = f.configMerge(r[o][e], n, t) : r[o][e] = f.configMerge(r[o][e], t)
                        }) : (r[o] = [], f.each(t, function(t) {
                            var e = f.getValueOrDefault(t.type, "xAxes" === o ? "category" : "linear");
                            r[o].push(f.configMerge(a.scaleService.getScaleDefaults(e), t))
                        })) : r.hasOwnProperty(o) && "object" == typeof r[o] && null !== r[o] && "object" == typeof t ? r[o] = f.configMerge(r[o], t) : r[o] = t
                    }), r
                }, f.getValueAtIndexOrDefault = function(t, e, i) {
                    return null == t ? i : f.isArray(t) ? e < t.length ? t[e] : i : t
                }, f.getValueOrDefault = function(t, e) {
                    return void 0 === t ? e : t
                }, f.indexOf = Array.prototype.indexOf ? function(t, e) {
                    return t.indexOf(e)
                } : function(t, e) {
                    for (var i = 0, n = t.length; i < n; ++i)
                        if (t[i] === e) return i;
                    return -1
                }, f.where = function(t, e) {
                    if (f.isArray(t) && Array.prototype.filter) return t.filter(e);
                    var i = [];
                    return f.each(t, function(t) {
                        e(t) && i.push(t)
                    }), i
                }, f.findIndex = Array.prototype.findIndex ? function(t, e, i) {
                    return t.findIndex(e, i)
                } : function(t, e, i) {
                    i = void 0 === i ? t : i;
                    for (var n = 0, o = t.length; n < o; ++n)
                        if (e.call(i, t[n], n, t)) return n;
                    return -1
                }, f.findNextWhere = function(t, e, i) {
                    null == i && (i = -1);
                    for (var n = i + 1; n < t.length; n++) {
                        var o = t[n];
                        if (e(o)) return o
                    }
                }, f.findPreviousWhere = function(t, e, i) {
                    null == i && (i = t.length);
                    for (var n = i - 1; 0 <= n; n--) {
                        var o = t[n];
                        if (e(o)) return o
                    }
                }, f.inherits = function(t) {
                    var e = this,
                        i = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                            return e.apply(this, arguments)
                        },
                        n = function() {
                            this.constructor = i
                        };
                    return n.prototype = e.prototype, i.prototype = new n, i.extend = f.inherits, t && f.extend(i.prototype, t), i.__super__ = e.prototype, i
                }, f.noop = function() {}, f.uid = (t = 0, function() {
                    return t++
                }), f.isNumber = function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                }, f.almostEquals = function(t, e, i) {
                    return Math.abs(t - e) < i
                }, f.max = function(t) {
                    return t.reduce(function(t, e) {
                        return isNaN(e) ? t : Math.max(t, e)
                    }, Number.NEGATIVE_INFINITY)
                }, f.min = function(t) {
                    return t.reduce(function(t, e) {
                        return isNaN(e) ? t : Math.min(t, e)
                    }, Number.POSITIVE_INFINITY)
                }, f.sign = Math.sign ? function(t) {
                    return Math.sign(t)
                } : function(t) {
                    return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1
                }, f.log10 = Math.log10 ? function(t) {
                    return Math.log10(t)
                } : function(t) {
                    return Math.log(t) / Math.LN10
                }, f.toRadians = function(t) {
                    return t * (Math.PI / 180)
                }, f.toDegrees = function(t) {
                    return t * (180 / Math.PI)
                }, f.getAngleFromPoint = function(t, e) {
                    var i = e.x - t.x,
                        n = e.y - t.y,
                        o = Math.sqrt(i * i + n * n),
                        r = Math.atan2(n, i);
                    return r < -.5 * Math.PI && (r += 2 * Math.PI), {
                        angle: r,
                        distance: o
                    }
                }, f.distanceBetweenPoints = function(t, e) {
                    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                }, f.aliasPixel = function(t) {
                    return t % 2 == 0 ? 0 : .5
                }, f.splineCurve = function(t, e, i, n) {
                    var o = t.skip ? e : t,
                        r = e,
                        a = i.skip ? e : i,
                        s = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
                        l = Math.sqrt(Math.pow(a.x - r.x, 2) + Math.pow(a.y - r.y, 2)),
                        d = s / (s + l),
                        c = l / (s + l),
                        u = n * (d = isNaN(d) ? 0 : d),
                        h = n * (c = isNaN(c) ? 0 : c);
                    return {
                        previous: {
                            x: r.x - u * (a.x - o.x),
                            y: r.y - u * (a.y - o.y)
                        },
                        next: {
                            x: r.x + h * (a.x - o.x),
                            y: r.y + h * (a.y - o.y)
                        }
                    }
                }, f.EPSILON = Number.EPSILON || 1e-14, f.splineCurveMonotone = function(t) {
                    var e, i, n, o, r, a, s, l, d, c = (t || []).map(function(t) {
                            return {
                                model: t._model,
                                deltaK: 0,
                                mK: 0
                            }
                        }),
                        u = c.length;
                    for (e = 0; e < u; ++e)(n = c[e]).model.skip || (i = 0 < e ? c[e - 1] : null, (o = e < u - 1 ? c[e + 1] : null) && !o.model.skip && (n.deltaK = (o.model.y - n.model.y) / (o.model.x - n.model.x)), !i || i.model.skip ? n.mK = n.deltaK : !o || o.model.skip ? n.mK = i.deltaK : this.sign(i.deltaK) !== this.sign(n.deltaK) ? n.mK = 0 : n.mK = (i.deltaK + n.deltaK) / 2);
                    for (e = 0; e < u - 1; ++e) n = c[e], o = c[e + 1], n.model.skip || o.model.skip || (f.almostEquals(n.deltaK, 0, this.EPSILON) ? n.mK = o.mK = 0 : (r = n.mK / n.deltaK, a = o.mK / n.deltaK, (l = Math.pow(r, 2) + Math.pow(a, 2)) <= 9 || (s = 3 / Math.sqrt(l), n.mK = r * s * n.deltaK, o.mK = a * s * n.deltaK)));
                    for (e = 0; e < u; ++e)(n = c[e]).model.skip || (i = 0 < e ? c[e - 1] : null, o = e < u - 1 ? c[e + 1] : null, i && !i.model.skip && (d = (n.model.x - i.model.x) / 3, n.model.controlPointPreviousX = n.model.x - d, n.model.controlPointPreviousY = n.model.y - d * n.mK), o && !o.model.skip && (d = (o.model.x - n.model.x) / 3, n.model.controlPointNextX = n.model.x + d, n.model.controlPointNextY = n.model.y + d * n.mK))
                }, f.nextItem = function(t, e, i) {
                    return i ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                }, f.previousItem = function(t, e, i) {
                    return i ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1]
                }, f.niceNum = function(t, e) {
                    var i = Math.floor(f.log10(t)),
                        n = t / Math.pow(10, i);
                    return (e ? n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10 : n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * Math.pow(10, i)
                };
                var i = f.easingEffects = {
                    linear: function(t) {
                        return t
                    },
                    easeInQuad: function(t) {
                        return t * t
                    },
                    easeOutQuad: function(t) {
                        return -1 * t * (t - 2)
                    },
                    easeInOutQuad: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                    },
                    easeInCubic: function(t) {
                        return t * t * t
                    },
                    easeOutCubic: function(t) {
                        return 1 * ((t = t / 1 - 1) * t * t + 1)
                    },
                    easeInOutCubic: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                    },
                    easeInQuart: function(t) {
                        return t * t * t * t
                    },
                    easeOutQuart: function(t) {
                        return -1 * ((t = t / 1 - 1) * t * t * t - 1)
                    },
                    easeInOutQuart: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                    },
                    easeInQuint: function(t) {
                        return 1 * (t /= 1) * t * t * t * t
                    },
                    easeOutQuint: function(t) {
                        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
                    },
                    easeInOutQuint: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                    },
                    easeInSine: function(t) {
                        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
                    },
                    easeOutSine: function(t) {
                        return 1 * Math.sin(t / 1 * (Math.PI / 2))
                    },
                    easeInOutSine: function(t) {
                        return -.5 * (Math.cos(Math.PI * t / 1) - 1)
                    },
                    easeInExpo: function(t) {
                        return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
                    },
                    easeOutExpo: function(t) {
                        return 1 === t ? 1 : 1 * (1 - Math.pow(2, -10 * t / 1))
                    },
                    easeInOutExpo: function(t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
                    },
                    easeInCirc: function(t) {
                        return 1 <= t ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                    },
                    easeOutCirc: function(t) {
                        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
                    },
                    easeInOutCirc: function(t) {
                        return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                    },
                    easeInElastic: function(t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i))
                    },
                    easeOutElastic: function(t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / i) + 1)
                    },
                    easeInOutElastic: function(t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (i || (i = .3 * 1.5 * 1), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i) * .5 + 1)
                    },
                    easeInBack: function(t) {
                        return 1 * (t /= 1) * t * (2.70158 * t - 1.70158)
                    },
                    easeOutBack: function(t) {
                        return 1 * ((t = t / 1 - 1) * t * (2.70158 * t + 1.70158) + 1)
                    },
                    easeInOutBack: function(t) {
                        var e = 1.70158;
                        return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                    },
                    easeInBounce: function(t) {
                        return 1 - i.easeOutBounce(1 - t)
                    },
                    easeOutBounce: function(t) {
                        return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t * 1 : t < 2 / 2.75 ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                    },
                    easeInOutBounce: function(t) {
                        return t < .5 ? .5 * i.easeInBounce(2 * t) : .5 * i.easeOutBounce(2 * t - 1) + .5
                    }
                };
                f.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    return window.setTimeout(t, 1e3 / 60)
                }, f.cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
                    return window.clearTimeout(t, 1e3 / 60)
                }, f.getRelativePosition = function(t, e) {
                    var i, n, o = t.originalEvent || t,
                        r = t.currentTarget || t.srcElement,
                        a = r.getBoundingClientRect(),
                        s = o.touches;
                    s && 0 < s.length ? (i = s[0].clientX, n = s[0].clientY) : (i = o.clientX, n = o.clientY);
                    var l = parseFloat(f.getStyle(r, "padding-left")),
                        d = parseFloat(f.getStyle(r, "padding-top")),
                        c = parseFloat(f.getStyle(r, "padding-right")),
                        u = parseFloat(f.getStyle(r, "padding-bottom")),
                        h = a.right - a.left - l - c,
                        p = a.bottom - a.top - d - u;
                    return {
                        x: i = Math.round((i - a.left - l) / h * r.width / e.currentDevicePixelRatio),
                        y: n = Math.round((n - a.top - d) / p * r.height / e.currentDevicePixelRatio)
                    }
                }, f.addEvent = function(t, e, i) {
                    t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
                }, f.removeEvent = function(t, e, i) {
                    t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = f.noop
                }, f.bindEvents = function(e, t, i) {
                    var n = e.events = e.events || {};
                    f.each(t, function(t) {
                        n[t] = function() {
                            i.apply(e, arguments)
                        }, f.addEvent(e.chart.canvas, t, n[t])
                    })
                }, f.unbindEvents = function(t, e) {
                    var i = t.chart.canvas;
                    f.each(e, function(t, e) {
                        f.removeEvent(i, e, t)
                    })
                }, f.getConstraintWidth = function(t) {
                    return e(t, "max-width", "clientWidth")
                }, f.getConstraintHeight = function(t) {
                    return e(t, "max-height", "clientHeight")
                }, f.getMaximumWidth = function(t) {
                    var e = t.parentNode,
                        i = parseInt(f.getStyle(e, "padding-left"), 10),
                        n = parseInt(f.getStyle(e, "padding-right"), 10),
                        o = e.clientWidth - i - n,
                        r = f.getConstraintWidth(t);
                    return isNaN(r) ? o : Math.min(o, r)
                }, f.getMaximumHeight = function(t) {
                    var e = t.parentNode,
                        i = parseInt(f.getStyle(e, "padding-top"), 10),
                        n = parseInt(f.getStyle(e, "padding-bottom"), 10),
                        o = e.clientHeight - i - n,
                        r = f.getConstraintHeight(t);
                    return isNaN(r) ? o : Math.min(o, r)
                }, f.getStyle = function(t, e) {
                    return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                }, f.retinaScale = function(t) {
                    var e = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
                    if (1 !== e) {
                        var i = t.canvas,
                            n = t.height,
                            o = t.width;
                        i.height = n * e, i.width = o * e, t.ctx.scale(e, e), i.style.height = n + "px", i.style.width = o + "px"
                    }
                }, f.clear = function(t) {
                    t.ctx.clearRect(0, 0, t.width, t.height)
                }, f.fontString = function(t, e, i) {
                    return e + " " + t + "px " + i
                }, f.longestText = function(e, t, i, n) {
                    var o = (n = n || {}).data = n.data || {},
                        r = n.garbageCollect = n.garbageCollect || [];
                    n.font !== t && (o = n.data = {}, r = n.garbageCollect = [], n.font = t), e.font = t;
                    var a = 0;
                    f.each(i, function(t) {
                        null != t && !0 !== f.isArray(t) ? a = f.measureText(e, o, r, a, t) : f.isArray(t) && f.each(t, function(t) {
                            null == t || f.isArray(t) || (a = f.measureText(e, o, r, a, t))
                        })
                    });
                    var s = r.length / 2;
                    if (s > i.length) {
                        for (var l = 0; l < s; l++) delete o[r[l]];
                        r.splice(0, s)
                    }
                    return a
                }, f.measureText = function(t, e, i, n, o) {
                    var r = e[o];
                    return r || (r = e[o] = t.measureText(o).width, i.push(o)), n < r && (n = r), n
                }, f.numberOfLabelLines = function(t) {
                    var e = 1;
                    return f.each(t, function(t) {
                        f.isArray(t) && t.length > e && (e = t.length)
                    }), e
                }, f.drawRoundedRectangle = function(t, e, i, n, o, r) {
                    t.beginPath(), t.moveTo(e + r, i), t.lineTo(e + n - r, i), t.quadraticCurveTo(e + n, i, e + n, i + r), t.lineTo(e + n, i + o - r), t.quadraticCurveTo(e + n, i + o, e + n - r, i + o), t.lineTo(e + r, i + o), t.quadraticCurveTo(e, i + o, e, i + o - r), t.lineTo(e, i + r), t.quadraticCurveTo(e, i, e + r, i), t.closePath()
                }, f.color = function(t) {
                    return n ? n(t instanceof CanvasGradient ? a.defaults.global.defaultColor : t) : (console.error("Color.js not found!"), t)
                }, f.addResizeListener = function(t, e) {
                    var i = document.createElement("iframe");
                    i.className = "chartjs-hidden-iframe", i.style.cssText = "display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;", i.tabIndex = -1;
                    var n = t._chartjs = {
                            resizer: i,
                            ticking: !1
                        },
                        o = function() {
                            n.ticking || (n.ticking = !0, f.requestAnimFrame.call(window, function() {
                                return n.resizer ? (n.ticking = !1, e()) : void 0
                            }))
                        };
                    f.addEvent(i, "load", function() {
                        f.addEvent(i.contentWindow || i, "resize", o), o()
                    }), t.insertBefore(i, t.firstChild)
                }, f.removeResizeListener = function(t) {
                    if (t && t._chartjs) {
                        var e = t._chartjs.resizer;
                        e && (e.parentNode.removeChild(e), t._chartjs.resizer = null), delete t._chartjs
                    }
                }, f.isArray = Array.isArray ? function(t) {
                    return Array.isArray(t)
                } : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }, f.arrayEquals = function(t, e) {
                    var i, n, o, r;
                    if (!t || !e || t.length !== e.length) return !1;
                    for (i = 0, n = t.length; i < n; ++i)
                        if (o = t[i], r = e[i], o instanceof Array && r instanceof Array) {
                            if (!f.arrayEquals(o, r)) return !1
                        } else if (o !== r) return !1;
                    return !0
                }, f.callCallback = function(t, e, i) {
                    t && "function" == typeof t.call && t.apply(i, e)
                }, f.getHoverColor = function(t) {
                    return t instanceof CanvasPattern ? t : f.color(t).saturate(.5).darken(.1).rgbString()
                }
            }
        }, {
            3: 3
        }],
        27: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                function l(t, e) {
                    var i, n, o, r, a;
                    for (n = 0, r = t.data.datasets.length; n < r; ++n)
                        if (t.isDatasetVisible(n))
                            for (o = 0, a = (i = t.getDatasetMeta(n)).data.length; o < a; ++o) {
                                var s = i.data[o];
                                s._view.skip || e(s)
                            }
                }

                function a(t, e) {
                    var i = [];
                    return l(t, function(t) {
                        t.inRange(e.x, e.y) && i.push(t)
                    }), i
                }

                function s(t, n, o, r) {
                    var a = Number.POSITIVE_INFINITY,
                        s = [];
                    return r || (r = d.distanceBetweenPoints), l(t, function(t) {
                        if (!o || t.inRange(n.x, n.y)) {
                            var e = t.getCenterPoint(),
                                i = r(n, e);
                            i < a ? (s = [t], a = i) : i === a && s.push(t)
                        }
                    }), s
                }

                function i(n, t, e) {
                    var i = d.getRelativePosition(t, n.chart),
                        o = e.intersect ? a(n, i) : s(n, i, !1, function(t, e) {
                            return Math.abs(t.x - e.x)
                        }),
                        r = [];
                    return o.length ? (n.data.datasets.forEach(function(t, e) {
                        if (n.isDatasetVisible(e)) {
                            var i = n.getDatasetMeta(e).data[o[0]._index];
                            i && !i._view.skip && r.push(i)
                        }
                    }), r) : []
                }
                var d = t.helpers;
                t.Interaction = {
                    modes: {
                        single: function(t, e) {
                            var i = d.getRelativePosition(e, t.chart),
                                n = [];
                            return l(t, function(t) {
                                return t.inRange(i.x, i.y) ? (n.push(t), n) : void 0
                            }), n.slice(0, 1)
                        },
                        label: i,
                        index: i,
                        dataset: function(t, e, i) {
                            var n = d.getRelativePosition(e, t.chart),
                                o = i.intersect ? a(t, n) : s(t, n, !1);
                            return 0 < o.length && (o = t.getDatasetMeta(o[0]._datasetIndex).data), o
                        },
                        "x-axis": function(t, e) {
                            return i(t, e, !0)
                        },
                        point: function(t, e) {
                            return a(t, d.getRelativePosition(e, t.chart))
                        },
                        nearest: function(t, e, i) {
                            var n = s(t, d.getRelativePosition(e, t.chart), i.intersect);
                            return 1 < n.length && n.sort(function(t, e) {
                                var i = t.getArea() - e.getArea();
                                return 0 === i && (i = t._datasetIndex - e._datasetIndex), i
                            }), n.slice(0, 1)
                        },
                        x: function(t, e, i) {
                            var n = d.getRelativePosition(e, t.chart),
                                o = [],
                                r = !1;
                            return l(t, function(t) {
                                t.inXRange(n.x) && o.push(t), t.inRange(n.x, n.y) && (r = !0)
                            }), i.intersect && !r && (o = []), o
                        },
                        y: function(t, e, i) {
                            var n = d.getRelativePosition(e, t.chart),
                                o = [],
                                r = !1;
                            return l(t, function(t) {
                                t.inYRange(n.y) && o.push(t), t.inRange(n.x, n.y) && (r = !0)
                            }), i.intersect && !r && (o = []), o
                        }
                    }
                }
            }
        }, {}],
        28: [function(t, e, i) {
            "use strict";
            e.exports = function() {
                var i = function(t, e) {
                    return this.controller = new i.Controller(t, e, this), this.controller
                };
                return i.defaults = {
                    global: {
                        responsive: !0,
                        responsiveAnimationDuration: 0,
                        maintainAspectRatio: !0,
                        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                        hover: {
                            onHover: null,
                            mode: "nearest",
                            intersect: !0,
                            animationDuration: 400
                        },
                        onClick: null,
                        defaultColor: "rgba(0,0,0,0.1)",
                        defaultFontColor: "#666",
                        defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        defaultFontSize: 12,
                        defaultFontStyle: "normal",
                        showLines: !0,
                        elements: {},
                        legendCallback: function(t) {
                            var e = [];
                            e.push('<ul class="' + t.id + '-legend">');
                            for (var i = 0; i < t.data.datasets.length; i++) e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '"></span>'), t.data.datasets[i].label && e.push(t.data.datasets[i].label), e.push("</li>");
                            return e.push("</ul>"), e.join("")
                        }
                    }
                }, i.Chart = i
            }
        }, {}],
        29: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var E = t.helpers;
                t.layoutService = {
                    defaults: {},
                    addBox: function(t, e) {
                        t.boxes || (t.boxes = []), t.boxes.push(e)
                    },
                    removeBox: function(t, e) {
                        t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1)
                    },
                    update: function(e, i, t) {
                        function n(e) {
                            var t = E.findNextWhere(S, function(t) {
                                return t.box === e
                            });
                            if (t)
                                if (e.isHorizontal()) {
                                    var i = {
                                        left: C,
                                        right: T,
                                        top: 0,
                                        bottom: 0
                                    };
                                    e.update(e.options.fullWidth ? m : k, v / 2, i)
                                } else e.update(t.minSize.width, w)
                        }

                        function o(t) {
                            t.isHorizontal() ? (t.left = t.options.fullWidth ? s : C, t.right = t.options.fullWidth ? i - l : C + k, t.top = D, t.bottom = D + t.height, D = t.bottom) : (t.left = A, t.right = A + t.width, t.top = I, t.bottom = I + w, A = t.right)
                        }
                        if (e) {
                            var r = e.options.layout,
                                a = r ? r.padding : null,
                                s = 0,
                                l = 0,
                                d = 0,
                                c = 0;
                            isNaN(a) ? (s = a.left || 0, l = a.right || 0, d = a.top || 0, c = a.bottom || 0) : c = d = l = s = a;
                            var u = E.where(e.boxes, function(t) {
                                    return "left" === t.options.position
                                }),
                                h = E.where(e.boxes, function(t) {
                                    return "right" === t.options.position
                                }),
                                p = E.where(e.boxes, function(t) {
                                    return "top" === t.options.position
                                }),
                                f = E.where(e.boxes, function(t) {
                                    return "bottom" === t.options.position
                                }),
                                g = E.where(e.boxes, function(t) {
                                    return "chartArea" === t.options.position
                                });
                            p.sort(function(t, e) {
                                return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0)
                            }), f.sort(function(t, e) {
                                return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0)
                            });
                            var m = i - s - l,
                                v = t - d - c,
                                y = v / 2,
                                b = (i - m / 2) / (u.length + h.length),
                                x = (t - y) / (p.length + f.length),
                                k = m,
                                w = v,
                                S = [];
                            E.each(u.concat(h, p, f), function(t) {
                                var e, i = t.isHorizontal();
                                i ? (e = t.update(t.options.fullWidth ? m : k, x), w -= e.height) : (e = t.update(b, y), k -= e.width), S.push({
                                    horizontal: i,
                                    minSize: e,
                                    box: t
                                })
                            });
                            var C = s,
                                T = l,
                                I = d,
                                _ = c;
                            E.each(u.concat(h), n), E.each(u, function(t) {
                                C += t.width
                            }), E.each(h, function(t) {
                                T += t.width
                            }), E.each(p.concat(f), n), E.each(p, function(t) {
                                I += t.height
                            }), E.each(f, function(t) {
                                _ += t.height
                            }), E.each(u.concat(h), function(e) {
                                var t = E.findNextWhere(S, function(t) {
                                        return t.box === e
                                    }),
                                    i = {
                                        left: 0,
                                        right: 0,
                                        top: I,
                                        bottom: _
                                    };
                                t && e.update(t.minSize.width, w, i)
                            }), C = s, T = l, I = d, _ = c, E.each(u, function(t) {
                                C += t.width
                            }), E.each(h, function(t) {
                                T += t.width
                            }), E.each(p, function(t) {
                                I += t.height
                            }), E.each(f, function(t) {
                                _ += t.height
                            });
                            var M = t - I - _,
                                P = i - C - T;
                            (P !== k || M !== w) && (E.each(u, function(t) {
                                t.height = M
                            }), E.each(h, function(t) {
                                t.height = M
                            }), E.each(p, function(t) {
                                t.options.fullWidth || (t.width = P)
                            }), E.each(f, function(t) {
                                t.options.fullWidth || (t.width = P)
                            }), w = M, k = P);
                            var A = s,
                                D = d;
                            E.each(u.concat(p), o), A += k, D += w, E.each(h, o), E.each(f, o), e.chartArea = {
                                left: C,
                                top: I,
                                right: C + k,
                                bottom: I + w
                            }, E.each(g, function(t) {
                                t.left = e.chartArea.left, t.top = e.chartArea.top, t.right = e.chartArea.right, t.bottom = e.chartArea.bottom, t.update(k, w)
                            })
                        }
                    }
                }
            }
        }, {}],
        30: [function(t, e, i) {
            "use strict";
            e.exports = function(T) {
                function I(t, e) {
                    return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth
                }
                var _ = T.helpers,
                    t = _.noop;
                T.defaults.global.legend = {
                    display: !0,
                    position: "top",
                    fullWidth: !0,
                    reverse: !1,
                    onClick: function(t, e) {
                        var i = e.datasetIndex,
                            n = this.chart,
                            o = n.getDatasetMeta(i);
                        o.hidden = null === o.hidden ? !n.data.datasets[i].hidden : null, n.update()
                    },
                    onHover: null,
                    labels: {
                        boxWidth: 40,
                        padding: 10,
                        generateLabels: function(i) {
                            var t = i.data;
                            return _.isArray(t.datasets) ? t.datasets.map(function(t, e) {
                                return {
                                    text: t.label,
                                    fillStyle: _.isArray(t.backgroundColor) ? t.backgroundColor[0] : t.backgroundColor,
                                    hidden: !i.isDatasetVisible(e),
                                    lineCap: t.borderCapStyle,
                                    lineDash: t.borderDash,
                                    lineDashOffset: t.borderDashOffset,
                                    lineJoin: t.borderJoinStyle,
                                    lineWidth: t.borderWidth,
                                    strokeStyle: t.borderColor,
                                    pointStyle: t.pointStyle,
                                    datasetIndex: e
                                }
                            }, this) : []
                        }
                    }
                }, T.Legend = T.Element.extend({
                    initialize: function(t) {
                        _.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
                    },
                    beforeUpdate: t,
                    update: function(t, e, i) {
                        var n = this;
                        return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
                    },
                    afterUpdate: t,
                    beforeSetDimensions: t,
                    setDimensions: function() {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                            width: 0,
                            height: 0
                        }
                    },
                    afterSetDimensions: t,
                    beforeBuildLabels: t,
                    buildLabels: function() {
                        var t = this;
                        t.legendItems = t.options.labels.generateLabels.call(t, t.chart), t.options.reverse && t.legendItems.reverse()
                    },
                    afterBuildLabels: t,
                    beforeFit: t,
                    fit: function() {
                        var n = this,
                            t = n.options,
                            o = t.labels,
                            e = t.display,
                            r = n.ctx,
                            i = T.defaults.global,
                            a = _.getValueOrDefault,
                            s = a(o.fontSize, i.defaultFontSize),
                            l = a(o.fontStyle, i.defaultFontStyle),
                            d = a(o.fontFamily, i.defaultFontFamily),
                            c = _.fontString(s, l, d),
                            u = n.legendHitBoxes = [],
                            h = n.minSize,
                            p = n.isHorizontal();
                        if (p ? (h.width = n.maxWidth, h.height = e ? 10 : 0) : (h.width = e ? 10 : 0, h.height = n.maxHeight), e)
                            if (r.font = c, p) {
                                var f = n.lineWidths = [0],
                                    g = n.legendItems.length ? s + o.padding : 0;
                                r.textAlign = "left", r.textBaseline = "top", _.each(n.legendItems, function(t, e) {
                                    var i = I(o, s) + s / 2 + r.measureText(t.text).width;
                                    f[f.length - 1] + i + o.padding >= n.width && (g += s + o.padding, f[f.length] = n.left), u[e] = {
                                        left: 0,
                                        top: 0,
                                        width: i,
                                        height: s
                                    }, f[f.length - 1] += i + o.padding
                                }), h.height += g
                            } else {
                                var m = o.padding,
                                    v = n.columnWidths = [],
                                    y = o.padding,
                                    b = 0,
                                    x = 0,
                                    k = s + m;
                                _.each(n.legendItems, function(t, e) {
                                    var i = I(o, s) + s / 2 + r.measureText(t.text).width;
                                    x + k > h.height && (y += b + o.padding, v.push(b), x = b = 0), b = Math.max(b, i), x += k, u[e] = {
                                        left: 0,
                                        top: 0,
                                        width: i,
                                        height: s
                                    }
                                }), y += b, v.push(b), h.width += y
                            }
                        n.width = h.width, n.height = h.height
                    },
                    afterFit: t,
                    isHorizontal: function() {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    draw: function() {
                        var c = this,
                            u = c.options,
                            h = u.labels,
                            p = T.defaults.global,
                            f = p.elements.line,
                            g = c.width,
                            m = c.lineWidths;
                        if (u.display) {
                            var v, y = c.ctx,
                                b = _.getValueOrDefault,
                                t = b(h.fontColor, p.defaultFontColor),
                                x = b(h.fontSize, p.defaultFontSize),
                                e = b(h.fontStyle, p.defaultFontStyle),
                                i = b(h.fontFamily, p.defaultFontFamily),
                                n = _.fontString(x, e, i);
                            y.textAlign = "left", y.textBaseline = "top", y.lineWidth = .5, y.strokeStyle = t, y.fillStyle = t, y.font = n;
                            var k = I(h, x),
                                w = c.legendHitBoxes,
                                S = c.isHorizontal();
                            v = S ? {
                                x: c.left + (g - m[0]) / 2,
                                y: c.top + h.padding,
                                line: 0
                            } : {
                                x: c.left + h.padding,
                                y: c.top + h.padding,
                                line: 0
                            };
                            var C = x + h.padding;
                            _.each(c.legendItems, function(t, e) {
                                var i, n, o, r, a = y.measureText(t.text).width,
                                    s = k + x / 2 + a,
                                    l = v.x,
                                    d = v.y;
                                S ? g <= l + s && (d = v.y += C, v.line++, l = v.x = c.left + (g - m[v.line]) / 2) : d + C > c.bottom && (l = v.x = l + c.columnWidths[v.line] + h.padding, d = v.y = c.top, v.line++),
                                    function(t, e, i) {
                                        if (!(isNaN(k) || k <= 0)) {
                                            y.save(), y.fillStyle = b(i.fillStyle, p.defaultColor), y.lineCap = b(i.lineCap, f.borderCapStyle), y.lineDashOffset = b(i.lineDashOffset, f.borderDashOffset), y.lineJoin = b(i.lineJoin, f.borderJoinStyle), y.lineWidth = b(i.lineWidth, f.borderWidth), y.strokeStyle = b(i.strokeStyle, p.defaultColor);
                                            var n = 0 === b(i.lineWidth, f.borderWidth);
                                            if (y.setLineDash && y.setLineDash(b(i.lineDash, f.borderDash)), u.labels && u.labels.usePointStyle) {
                                                var o = x * Math.SQRT2 / 2,
                                                    r = o / Math.SQRT2,
                                                    a = t + r,
                                                    s = e + r;
                                                T.canvasHelpers.drawPoint(y, i.pointStyle, o, a, s)
                                            } else n || y.strokeRect(t, e, k, x), y.fillRect(t, e, k, x);
                                            y.restore()
                                        }
                                    }(l, d, t), w[e].left = l, w[e].top = d, i = l, n = d, o = t, r = a, y.fillText(o.text, k + x / 2 + i, n), o.hidden && (y.beginPath(), y.lineWidth = 2, y.moveTo(k + x / 2 + i, n + x / 2), y.lineTo(k + x / 2 + i + r, n + x / 2), y.stroke()), S ? v.x += s + h.padding : v.y += C
                            })
                        }
                    },
                    handleEvent: function(t) {
                        var e = this,
                            i = e.options,
                            n = "mouseup" === t.type ? "click" : t.type,
                            o = !1;
                        if ("mousemove" === n) {
                            if (!i.onHover) return
                        } else {
                            if ("click" !== n) return;
                            if (!i.onClick) return
                        }
                        var r = _.getRelativePosition(t, e.chart.chart),
                            a = r.x,
                            s = r.y;
                        if (a >= e.left && a <= e.right && s >= e.top && s <= e.bottom)
                            for (var l = e.legendHitBoxes, d = 0; d < l.length; ++d) {
                                var c = l[d];
                                if (a >= c.left && a <= c.left + c.width && s >= c.top && s <= c.top + c.height) {
                                    if ("click" === n) {
                                        i.onClick.call(e, t, e.legendItems[d]), o = !0;
                                        break
                                    }
                                    if ("mousemove" === n) {
                                        i.onHover.call(e, t, e.legendItems[d]), o = !0;
                                        break
                                    }
                                }
                            }
                        return o
                    }
                }), T.plugins.register({
                    beforeInit: function(t) {
                        var e = t.options.legend;
                        e && (t.legend = new T.Legend({
                            ctx: t.chart.ctx,
                            options: e,
                            chart: t
                        }), T.layoutService.addBox(t, t.legend))
                    }
                })
            }
        }, {}],
        31: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers.noop;
                t.plugins = {
                    _plugins: [],
                    register: function(t) {
                        var e = this._plugins;
                        [].concat(t).forEach(function(t) {
                            -1 === e.indexOf(t) && e.push(t)
                        })
                    },
                    unregister: function(t) {
                        var i = this._plugins;
                        [].concat(t).forEach(function(t) {
                            var e = i.indexOf(t); - 1 !== e && i.splice(e, 1)
                        })
                    },
                    clear: function() {
                        this._plugins = []
                    },
                    count: function() {
                        return this._plugins.length
                    },
                    getAll: function() {
                        return this._plugins
                    },
                    notify: function(t, e) {
                        var i, n, o = this._plugins,
                            r = o.length;
                        for (i = 0; i < r; ++i)
                            if ("function" == typeof(n = o[i])[t] && !1 === n[t].apply(n, e || [])) return !1;
                        return !0
                    }
                }, t.PluginBase = t.Element.extend({
                    beforeInit: e,
                    afterInit: e,
                    beforeUpdate: e,
                    afterUpdate: e,
                    beforeDraw: e,
                    afterDraw: e,
                    destroy: e
                }), t.pluginService = t.plugins
            }
        }, {}],
        32: [function(t, e, i) {
            "use strict";
            e.exports = function(V) {
                var $ = V.helpers;
                V.defaults.scale = {
                    display: !0,
                    position: "left",
                    gridLines: {
                        display: !0,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1,
                        drawBorder: !0,
                        drawOnChartArea: !0,
                        drawTicks: !0,
                        tickMarkLength: 10,
                        zeroLineWidth: 1,
                        zeroLineColor: "rgba(0,0,0,0.25)",
                        offsetGridLines: !1,
                        borderDash: [],
                        borderDashOffset: 0
                    },
                    scaleLabel: {
                        labelString: "",
                        display: !1
                    },
                    ticks: {
                        beginAtZero: !1,
                        minRotation: 0,
                        maxRotation: 50,
                        mirror: !1,
                        padding: 10,
                        reverse: !1,
                        display: !0,
                        autoSkip: !0,
                        autoSkipPadding: 0,
                        labelOffset: 0,
                        callback: V.Ticks.formatters.values
                    }
                }, V.Scale = V.Element.extend({
                    beforeUpdate: function() {
                        $.callCallback(this.options.beforeUpdate, [this])
                    },
                    update: function(t, e, i) {
                        var n = this;
                        return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = $.extend({
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }, i), n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeDataLimits(), n.determineDataLimits(), n.afterDataLimits(), n.beforeBuildTicks(), n.buildTicks(), n.afterBuildTicks(), n.beforeTickToLabelConversion(), n.convertTicksToLabels(), n.afterTickToLabelConversion(), n.beforeCalculateTickRotation(), n.calculateTickRotation(), n.afterCalculateTickRotation(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
                    },
                    afterUpdate: function() {
                        $.callCallback(this.options.afterUpdate, [this])
                    },
                    beforeSetDimensions: function() {
                        $.callCallback(this.options.beforeSetDimensions, [this])
                    },
                    setDimensions: function() {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0
                    },
                    afterSetDimensions: function() {
                        $.callCallback(this.options.afterSetDimensions, [this])
                    },
                    beforeDataLimits: function() {
                        $.callCallback(this.options.beforeDataLimits, [this])
                    },
                    determineDataLimits: $.noop,
                    afterDataLimits: function() {
                        $.callCallback(this.options.afterDataLimits, [this])
                    },
                    beforeBuildTicks: function() {
                        $.callCallback(this.options.beforeBuildTicks, [this])
                    },
                    buildTicks: $.noop,
                    afterBuildTicks: function() {
                        $.callCallback(this.options.afterBuildTicks, [this])
                    },
                    beforeTickToLabelConversion: function() {
                        $.callCallback(this.options.beforeTickToLabelConversion, [this])
                    },
                    convertTicksToLabels: function() {
                        var t = this.options.ticks;
                        this.ticks = this.ticks.map(t.userCallback || t.callback)
                    },
                    afterTickToLabelConversion: function() {
                        $.callCallback(this.options.afterTickToLabelConversion, [this])
                    },
                    beforeCalculateTickRotation: function() {
                        $.callCallback(this.options.beforeCalculateTickRotation, [this])
                    },
                    calculateTickRotation: function() {
                        var t = this,
                            e = t.ctx,
                            i = V.defaults.global,
                            n = t.options.ticks,
                            o = $.getValueOrDefault(n.fontSize, i.defaultFontSize),
                            r = $.getValueOrDefault(n.fontStyle, i.defaultFontStyle),
                            a = $.getValueOrDefault(n.fontFamily, i.defaultFontFamily),
                            s = $.fontString(o, r, a);
                        e.font = s;
                        var l, d = e.measureText(t.ticks[0]).width,
                            c = e.measureText(t.ticks[t.ticks.length - 1]).width;
                        if (t.labelRotation = n.minRotation || 0, t.paddingRight = 0, t.paddingLeft = 0, t.options.display && t.isHorizontal()) {
                            t.paddingRight = c / 2 + 3, t.paddingLeft = d / 2 + 3, t.longestTextCache || (t.longestTextCache = {});
                            for (var u, h, p = $.longestText(e, s, t.ticks, t.longestTextCache), f = p, g = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; g < f && t.labelRotation < n.maxRotation;) {
                                if (u = Math.cos($.toRadians(t.labelRotation)), h = Math.sin($.toRadians(t.labelRotation)), (l = u * d) + o / 2 > t.yLabelWidth && (t.paddingLeft = l + o / 2), t.paddingRight = o / 2, h * p > t.maxHeight) {
                                    t.labelRotation--;
                                    break
                                }
                                t.labelRotation++, f = u * p
                            }
                        }
                        t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0))
                    },
                    afterCalculateTickRotation: function() {
                        $.callCallback(this.options.afterCalculateTickRotation, [this])
                    },
                    beforeFit: function() {
                        $.callCallback(this.options.beforeFit, [this])
                    },
                    fit: function() {
                        var t = this,
                            e = t.minSize = {
                                width: 0,
                                height: 0
                            },
                            i = t.options,
                            n = V.defaults.global,
                            o = i.ticks,
                            r = i.scaleLabel,
                            a = i.gridLines,
                            s = i.display,
                            l = t.isHorizontal(),
                            d = $.getValueOrDefault(o.fontSize, n.defaultFontSize),
                            c = $.getValueOrDefault(o.fontStyle, n.defaultFontStyle),
                            u = $.getValueOrDefault(o.fontFamily, n.defaultFontFamily),
                            h = $.fontString(d, c, u),
                            p = $.getValueOrDefault(r.fontSize, n.defaultFontSize),
                            f = i.gridLines.tickMarkLength;
                        if (e.width = l ? t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : s && a.drawTicks ? f : 0, e.height = l ? s && a.drawTicks ? f : 0 : t.maxHeight, r.display && s && (l ? e.height += 1.5 * p : e.width += 1.5 * p), o.display && s) {
                            t.longestTextCache || (t.longestTextCache = {});
                            var g = $.longestText(t.ctx, h, t.ticks, t.longestTextCache),
                                m = $.numberOfLabelLines(t.ticks),
                                v = .5 * d;
                            if (l) {
                                t.longestLabelWidth = g;
                                var y = Math.sin($.toRadians(t.labelRotation)) * t.longestLabelWidth + d * m + v * m;
                                e.height = Math.min(t.maxHeight, e.height + y), t.ctx.font = h;
                                var b = t.ctx.measureText(t.ticks[0]).width,
                                    x = t.ctx.measureText(t.ticks[t.ticks.length - 1]).width,
                                    k = Math.cos($.toRadians(t.labelRotation)),
                                    w = Math.sin($.toRadians(t.labelRotation));
                                t.paddingLeft = 0 !== t.labelRotation ? k * b + 3 : b / 2 + 3, t.paddingRight = 0 !== t.labelRotation ? w * (d / 2) + 3 : x / 2 + 3
                            } else {
                                var S = t.maxWidth - e.width;
                                o.mirror ? g = 0 : g += t.options.ticks.padding, g < S ? e.width += g : e.width = t.maxWidth, t.paddingTop = d / 2, t.paddingBottom = d / 2
                            }
                        }
                        t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0)), t.width = e.width, t.height = e.height
                    },
                    afterFit: function() {
                        $.callCallback(this.options.afterFit, [this])
                    },
                    isHorizontal: function() {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    isFullWidth: function() {
                        return this.options.fullWidth
                    },
                    getRightValue: function(t) {
                        return null == t ? NaN : "number" != typeof t || isFinite(t) ? "object" == typeof t ? t instanceof Date || t.isValid ? t : this.getRightValue(this.isHorizontal() ? t.x : t.y) : t : NaN
                    },
                    getLabelForIndex: $.noop,
                    getPixelForValue: $.noop,
                    getValueForPixel: $.noop,
                    getPixelForTick: function(t, e) {
                        var i = this;
                        if (i.isHorizontal()) {
                            var n = (i.width - (i.paddingLeft + i.paddingRight)) / Math.max(i.ticks.length - (i.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                o = n * t + i.paddingLeft;
                            return e && (o += n / 2), i.left + Math.round(o) + (i.isFullWidth() ? i.margins.left : 0)
                        }
                        var r = i.height - (i.paddingTop + i.paddingBottom);
                        return i.top + t * (r / (i.ticks.length - 1))
                    },
                    getPixelForDecimal: function(t) {
                        var e = this;
                        if (e.isHorizontal()) {
                            var i = (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft;
                            return e.left + Math.round(i) + (e.isFullWidth() ? e.margins.left : 0)
                        }
                        return e.top + t * e.height
                    },
                    getBasePixel: function() {
                        var t = this.min,
                            e = this.max;
                        return this.getPixelForValue(this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0)
                    },
                    draw: function(b) {
                        var x = this,
                            k = x.options;
                        if (k.display) {
                            var w, t, o = x.ctx,
                                e = V.defaults.global,
                                S = k.ticks,
                                C = k.gridLines,
                                i = k.scaleLabel,
                                T = 0 !== x.labelRotation,
                                n = S.autoSkip,
                                I = x.isHorizontal();
                            S.maxTicksLimit && (t = S.maxTicksLimit);
                            var r = $.getValueOrDefault(S.fontColor, e.defaultFontColor),
                                a = $.getValueOrDefault(S.fontSize, e.defaultFontSize),
                                s = $.getValueOrDefault(S.fontStyle, e.defaultFontStyle),
                                l = $.getValueOrDefault(S.fontFamily, e.defaultFontFamily),
                                d = $.fontString(a, s, l),
                                _ = C.tickMarkLength,
                                M = $.getValueOrDefault(C.borderDash, e.borderDash),
                                P = $.getValueOrDefault(C.borderDashOffset, e.borderDashOffset),
                                c = $.getValueOrDefault(i.fontColor, e.defaultFontColor),
                                u = $.getValueOrDefault(i.fontSize, e.defaultFontSize),
                                h = $.getValueOrDefault(i.fontStyle, e.defaultFontStyle),
                                p = $.getValueOrDefault(i.fontFamily, e.defaultFontFamily),
                                f = $.fontString(u, h, p),
                                A = $.toRadians(x.labelRotation),
                                g = Math.cos(A),
                                m = x.longestLabelWidth * g;
                            o.fillStyle = r;
                            var D = [];
                            if (I) {
                                if (w = !1, T && (m /= 2), (m + S.autoSkipPadding) * x.ticks.length > x.width - (x.paddingLeft + x.paddingRight) && (w = 1 + Math.floor((m + S.autoSkipPadding) * x.ticks.length / (x.width - (x.paddingLeft + x.paddingRight)))), t && x.ticks.length > t)
                                    for (; !w || x.ticks.length / (w || 1) > t;) w || (w = 1), w += 1;
                                n || (w = !1)
                            }
                            var E = "right" === k.position ? x.left : x.right - _,
                                O = "right" === k.position ? x.left + _ : x.right,
                                L = "bottom" === k.position ? x.top : x.bottom - _,
                                z = "bottom" === k.position ? x.top + _ : x.bottom;
                            if ($.each(x.ticks, function(t, e) {
                                    if (null != t) {
                                        var i = x.ticks.length === e + 1;
                                        if ((!(1 < w && 0 < e % w || e % w == 0 && e + w >= x.ticks.length) || i) && null != t) {
                                            var n, o;
                                            e === (void 0 !== x.zeroLineIndex ? x.zeroLineIndex : 0) ? (n = C.zeroLineWidth, o = C.zeroLineColor) : (n = $.getValueAtIndexOrDefault(C.lineWidth, e), o = $.getValueAtIndexOrDefault(C.color, e));
                                            var r, a, s, l, d, c, u, h, p, f, g = "middle",
                                                m = "middle";
                                            if (I) {
                                                T || (m = "top" === k.position ? "bottom" : "top"), g = T ? "right" : "center";
                                                var v = x.getPixelForTick(e) + $.aliasPixel(n);
                                                p = x.getPixelForTick(e, C.offsetGridLines) + S.labelOffset, f = T ? x.top + 12 : "top" === k.position ? x.bottom - _ : x.top + _, r = s = d = u = v, a = L, l = z, c = b.top, h = b.bottom
                                            } else {
                                                "left" === k.position ? S.mirror ? (p = x.right + S.padding, g = "left") : (p = x.right - S.padding, g = "right") : S.mirror ? (p = x.left - S.padding, g = "right") : (p = x.left + S.padding, g = "left");
                                                var y = x.getPixelForTick(e);
                                                y += $.aliasPixel(n), f = x.getPixelForTick(e, C.offsetGridLines), r = E, s = O, d = b.left, u = b.right, a = l = c = h = y
                                            }
                                            D.push({
                                                tx1: r,
                                                ty1: a,
                                                tx2: s,
                                                ty2: l,
                                                x1: d,
                                                y1: c,
                                                x2: u,
                                                y2: h,
                                                labelX: p,
                                                labelY: f,
                                                glWidth: n,
                                                glColor: o,
                                                glBorderDash: M,
                                                glBorderDashOffset: P,
                                                rotation: -1 * A,
                                                label: t,
                                                textBaseline: m,
                                                textAlign: g
                                            })
                                        }
                                    }
                                }), $.each(D, function(t) {
                                    if (C.display && (o.save(), o.lineWidth = t.glWidth, o.strokeStyle = t.glColor, o.setLineDash && (o.setLineDash(t.glBorderDash), o.lineDashOffset = t.glBorderDashOffset), o.beginPath(), C.drawTicks && (o.moveTo(t.tx1, t.ty1), o.lineTo(t.tx2, t.ty2)), C.drawOnChartArea && (o.moveTo(t.x1, t.y1), o.lineTo(t.x2, t.y2)), o.stroke(), o.restore()), S.display) {
                                        o.save(), o.translate(t.labelX, t.labelY), o.rotate(t.rotation), o.font = d, o.textBaseline = t.textBaseline, o.textAlign = t.textAlign;
                                        var e = t.label;
                                        if ($.isArray(e))
                                            for (var i = 0, n = -(e.length - 1) * a * .75; i < e.length; ++i) o.fillText("" + e[i], 0, n), n += 1.5 * a;
                                        else o.fillText(e, 0, 0);
                                        o.restore()
                                    }
                                }), i.display) {
                                var v, y, F = 0;
                                if (I) v = x.left + (x.right - x.left) / 2, y = "bottom" === k.position ? x.bottom - u / 2 : x.top + u / 2;
                                else {
                                    var R = "left" === k.position;
                                    v = R ? x.left + u / 2 : x.right - u / 2, y = x.top + (x.bottom - x.top) / 2, F = R ? -.5 * Math.PI : .5 * Math.PI
                                }
                                o.save(), o.translate(v, y), o.rotate(F), o.textAlign = "center", o.textBaseline = "middle", o.fillStyle = c, o.font = f, o.fillText(i.labelString, 0, 0), o.restore()
                            }
                            if (C.drawBorder) {
                                o.lineWidth = $.getValueAtIndexOrDefault(C.lineWidth, 0), o.strokeStyle = $.getValueAtIndexOrDefault(C.color, 0);
                                var B = x.left,
                                    W = x.right,
                                    N = x.top,
                                    j = x.bottom,
                                    H = $.aliasPixel(o.lineWidth);
                                I ? (N = j = "top" === k.position ? x.bottom : x.top, N += H, j += H) : (B = W = "left" === k.position ? x.right : x.left, B += H, W += H), o.beginPath(), o.moveTo(B, N), o.lineTo(W, j), o.stroke()
                            }
                        }
                    }
                })
            }
        }, {}],
        33: [function(t, e, i) {
            "use strict";
            e.exports = function(i) {
                var n = i.helpers;
                i.scaleService = {
                    constructors: {},
                    defaults: {},
                    registerScaleType: function(t, e, i) {
                        this.constructors[t] = e, this.defaults[t] = n.clone(i)
                    },
                    getScaleConstructor: function(t) {
                        return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                    },
                    getScaleDefaults: function(t) {
                        return this.defaults.hasOwnProperty(t) ? n.scaleMerge(i.defaults.scale, this.defaults[t]) : {}
                    },
                    updateScaleDefaults: function(t, e) {
                        var i = this.defaults;
                        i.hasOwnProperty(t) && (i[t] = n.extend(i[t], e))
                    },
                    addScalesToLayout: function(e) {
                        n.each(e.scales, function(t) {
                            i.layoutService.addBox(e, t)
                        })
                    }
                }
            }
        }, {}],
        34: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var d = t.helpers;
                t.Ticks = {
                    generators: {
                        linear: function(t, e) {
                            var i, n = [];
                            if (t.stepSize && 0 < t.stepSize) i = t.stepSize;
                            else {
                                var o = d.niceNum(e.max - e.min, !1);
                                i = d.niceNum(o / (t.maxTicks - 1), !0)
                            }
                            var r = Math.floor(e.min / i) * i,
                                a = Math.ceil(e.max / i) * i;
                            t.min && t.max && t.stepSize && ((t.max - t.min) % t.stepSize == 0 && (r = t.min, a = t.max));
                            var s = (a - r) / i;
                            s = d.almostEquals(s, Math.round(s), i / 1e3) ? Math.round(s) : Math.ceil(s), n.push(void 0 !== t.min ? t.min : r);
                            for (var l = 1; l < s; ++l) n.push(r + l * i);
                            return n.push(void 0 !== t.max ? t.max : a), n
                        },
                        logarithmic: function(t, e) {
                            for (var i = [], n = d.getValueOrDefault, o = n(t.min, Math.pow(10, Math.floor(d.log10(e.min)))); o < e.max;) {
                                var r, a;
                                i.push(o), 0 === o ? (r = Math.floor(d.log10(e.minNotZero)), a = Math.round(e.minNotZero / Math.pow(10, r))) : (r = Math.floor(d.log10(o)), a = Math.floor(o / Math.pow(10, r)) + 1), 10 === a && (a = 1, ++r), o = a * Math.pow(10, r)
                            }
                            var s = n(t.max, o);
                            return i.push(s), i
                        }
                    },
                    formatters: {
                        values: function(t) {
                            return d.isArray(t) ? t : "" + t
                        },
                        linear: function(t, e, i) {
                            var n = 3 < i.length ? i[2] - i[1] : i[1] - i[0];
                            1 < Math.abs(n) && t !== Math.floor(t) && (n = t - Math.floor(t));
                            var o = d.log10(Math.abs(n)),
                                r = "";
                            if (0 !== t) {
                                var a = -1 * Math.floor(o);
                                a = Math.max(Math.min(a, 20), 0), r = t.toFixed(a)
                            } else r = "0";
                            return r
                        },
                        logarithmic: function(t, e, i) {
                            var n = t / Math.pow(10, Math.floor(d.log10(t)));
                            return 0 === t ? "0" : 1 === n || 2 === n || 5 === n || 0 === e || e === i.length - 1 ? t.toExponential() : ""
                        }
                    }
                }
            }
        }, {}],
        35: [function(t, e, i) {
            "use strict";
            e.exports = function(m) {
                var v = m.helpers;
                m.defaults.global.title = {
                    display: !1,
                    position: "top",
                    fullWidth: !0,
                    fontStyle: "bold",
                    padding: 10,
                    text: ""
                };
                var t = v.noop;
                m.Title = m.Element.extend({
                    initialize: function(t) {
                        v.extend(this, t), this.options = v.configMerge(m.defaults.global.title, t.options), this.legendHitBoxes = []
                    },
                    beforeUpdate: function() {
                        var t = this.chart.options;
                        t && t.title && (this.options = v.configMerge(m.defaults.global.title, t.title))
                    },
                    update: function(t, e, i) {
                        var n = this;
                        return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
                    },
                    afterUpdate: t,
                    beforeSetDimensions: t,
                    setDimensions: function() {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                            width: 0,
                            height: 0
                        }
                    },
                    afterSetDimensions: t,
                    beforeBuildLabels: t,
                    buildLabels: t,
                    afterBuildLabels: t,
                    beforeFit: t,
                    fit: function() {
                        var t = v.getValueOrDefault,
                            e = this.options,
                            i = m.defaults.global,
                            n = e.display,
                            o = t(e.fontSize, i.defaultFontSize),
                            r = this.minSize;
                        this.isHorizontal() ? (r.width = this.maxWidth, r.height = n ? o + 2 * e.padding : 0) : (r.width = n ? o + 2 * e.padding : 0, r.height = this.maxHeight), this.width = r.width, this.height = r.height
                    },
                    afterFit: t,
                    isHorizontal: function() {
                        var t = this.options.position;
                        return "top" === t || "bottom" === t
                    },
                    draw: function() {
                        var t = this.ctx,
                            e = v.getValueOrDefault,
                            i = this.options,
                            n = m.defaults.global;
                        if (i.display) {
                            var o, r, a, s = e(i.fontSize, n.defaultFontSize),
                                l = e(i.fontStyle, n.defaultFontStyle),
                                d = e(i.fontFamily, n.defaultFontFamily),
                                c = v.fontString(s, l, d),
                                u = 0,
                                h = this.top,
                                p = this.left,
                                f = this.bottom,
                                g = this.right;
                            t.fillStyle = e(i.fontColor, n.defaultFontColor), t.font = c, this.isHorizontal() ? (o = p + (g - p) / 2, r = h + (f - h) / 2, a = g - p) : (o = "left" === i.position ? p + s / 2 : g - s / 2, r = h + (f - h) / 2, a = f - h, u = Math.PI * ("left" === i.position ? -.5 : .5)), t.save(), t.translate(o, r), t.rotate(u), t.textAlign = "center", t.textBaseline = "middle", t.fillText(i.text, 0, 0, a), t.restore()
                        }
                    }
                }), m.plugins.register({
                    beforeInit: function(t) {
                        var e = t.options.title;
                        e && (t.titleBlock = new m.Title({
                            ctx: t.chart.ctx,
                            options: e,
                            chart: t
                        }), m.layoutService.addBox(t, t.titleBlock))
                    }
                })
            }
        }, {}],
        36: [function(t, e, i) {
            "use strict";
            e.exports = function(O) {
                function b(t, e) {
                    var i = z.color(t);
                    return i.alpha(e * i.alpha()).rgbaString()
                }

                function a(t, e) {
                    return e && (z.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
                }

                function L(t) {
                    var e = O.defaults.global,
                        i = z.getValueOrDefault;
                    return {
                        xPadding: t.xPadding,
                        yPadding: t.yPadding,
                        xAlign: t.xAlign,
                        yAlign: t.yAlign,
                        bodyFontColor: t.bodyFontColor,
                        _bodyFontFamily: i(t.bodyFontFamily, e.defaultFontFamily),
                        _bodyFontStyle: i(t.bodyFontStyle, e.defaultFontStyle),
                        _bodyAlign: t.bodyAlign,
                        bodyFontSize: i(t.bodyFontSize, e.defaultFontSize),
                        bodySpacing: t.bodySpacing,
                        titleFontColor: t.titleFontColor,
                        _titleFontFamily: i(t.titleFontFamily, e.defaultFontFamily),
                        _titleFontStyle: i(t.titleFontStyle, e.defaultFontStyle),
                        titleFontSize: i(t.titleFontSize, e.defaultFontSize),
                        _titleAlign: t.titleAlign,
                        titleSpacing: t.titleSpacing,
                        titleMarginBottom: t.titleMarginBottom,
                        footerFontColor: t.footerFontColor,
                        _footerFontFamily: i(t.footerFontFamily, e.defaultFontFamily),
                        _footerFontStyle: i(t.footerFontStyle, e.defaultFontStyle),
                        footerFontSize: i(t.footerFontSize, e.defaultFontSize),
                        _footerAlign: t.footerAlign,
                        footerSpacing: t.footerSpacing,
                        footerMarginTop: t.footerMarginTop,
                        caretSize: t.caretSize,
                        cornerRadius: t.cornerRadius,
                        backgroundColor: t.backgroundColor,
                        opacity: 0,
                        legendColorBackground: t.multiKeyBackground,
                        displayColors: t.displayColors
                    }
                }
                var z = O.helpers;
                O.defaults.global.tooltips = {
                    enabled: !0,
                    custom: null,
                    mode: "nearest",
                    position: "average",
                    intersect: !0,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleFontStyle: "bold",
                    titleSpacing: 2,
                    titleMarginBottom: 6,
                    titleFontColor: "#fff",
                    titleAlign: "left",
                    bodySpacing: 2,
                    bodyFontColor: "#fff",
                    bodyAlign: "left",
                    footerFontStyle: "bold",
                    footerSpacing: 2,
                    footerMarginTop: 6,
                    footerFontColor: "#fff",
                    footerAlign: "left",
                    yPadding: 6,
                    xPadding: 6,
                    caretSize: 5,
                    cornerRadius: 6,
                    multiKeyBackground: "#fff",
                    displayColors: !0,
                    callbacks: {
                        beforeTitle: z.noop,
                        title: function(t, e) {
                            var i = "",
                                n = e.labels,
                                o = n ? n.length : 0;
                            if (0 < t.length) {
                                var r = t[0];
                                r.xLabel ? i = r.xLabel : 0 < o && r.index < o && (i = n[r.index])
                            }
                            return i
                        },
                        afterTitle: z.noop,
                        beforeBody: z.noop,
                        beforeLabel: z.noop,
                        label: function(t, e) {
                            return (e.datasets[t.datasetIndex].label || "") + ": " + t.yLabel
                        },
                        labelColor: function(t, e) {
                            var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                            return {
                                borderColor: i.borderColor,
                                backgroundColor: i.backgroundColor
                            }
                        },
                        afterLabel: z.noop,
                        afterBody: z.noop,
                        beforeFooter: z.noop,
                        footer: z.noop,
                        afterFooter: z.noop
                    }
                }, O.Tooltip = O.Element.extend({
                    initialize: function() {
                        this._model = L(this._options)
                    },
                    getTitle: function() {
                        var t = this._options.callbacks,
                            e = t.beforeTitle.apply(this, arguments),
                            i = t.title.apply(this, arguments),
                            n = t.afterTitle.apply(this, arguments),
                            o = [];
                        return a(o = a(o = a(o, e), i), n)
                    },
                    getBeforeBody: function() {
                        var t = this._options.callbacks.beforeBody.apply(this, arguments);
                        return z.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getBody: function(t, i) {
                        var n = this,
                            o = n._options.callbacks,
                            r = [];
                        return z.each(t, function(t) {
                            var e = {
                                before: [],
                                lines: [],
                                after: []
                            };
                            a(e.before, o.beforeLabel.call(n, t, i)), a(e.lines, o.label.call(n, t, i)), a(e.after, o.afterLabel.call(n, t, i)), r.push(e)
                        }), r
                    },
                    getAfterBody: function() {
                        var t = this._options.callbacks.afterBody.apply(this, arguments);
                        return z.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getFooter: function() {
                        var t = this._options.callbacks,
                            e = t.beforeFooter.apply(this, arguments),
                            i = t.footer.apply(this, arguments),
                            n = t.afterFooter.apply(this, arguments),
                            o = [];
                        return a(o = a(o = a(o, e), i), n)
                    },
                    update: function(t) {
                        var e, i, n, o, r, a, s, l, d, c, u, h, p, f, g, m, v, y, b, x = this,
                            k = x._options,
                            w = x._model,
                            S = x._model = L(k),
                            C = x._active,
                            T = x._data,
                            I = x._chartInstance,
                            _ = {
                                xAlign: w.xAlign,
                                yAlign: w.yAlign
                            },
                            M = {
                                x: w.x,
                                y: w.y
                            },
                            P = {
                                width: w.width,
                                height: w.height
                            },
                            A = {
                                x: w.caretX,
                                y: w.caretY
                            };
                        if (C.length) {
                            S.opacity = 1;
                            var D = [];
                            A = O.Tooltip.positioners[k.position](C, x._eventPosition);
                            var E = [];
                            for (e = 0, i = C.length; e < i; ++e) E.push((g = C[e], v = m = void 0, m = g._xScale, v = g._yScale || g._scale, y = g._index, b = g._datasetIndex, {
                                xLabel: m ? m.getLabelForIndex(y, b) : "",
                                yLabel: v ? v.getLabelForIndex(y, b) : "",
                                index: y,
                                datasetIndex: b,
                                x: g._model.x,
                                y: g._model.y
                            }));
                            k.filter && (E = E.filter(function(t) {
                                return k.filter(t, T)
                            })), k.itemSort && (E = E.sort(function(t, e) {
                                return k.itemSort(t, e, T)
                            })), z.each(E, function(t) {
                                D.push(k.callbacks.labelColor.call(x, t, I))
                            }), S.title = x.getTitle(E, T), S.beforeBody = x.getBeforeBody(E, T), S.body = x.getBody(E, T), S.afterBody = x.getAfterBody(E, T), S.footer = x.getFooter(E, T), S.x = Math.round(A.x), S.y = Math.round(A.y), S.caretPadding = z.getValueOrDefault(A.padding, 2), S.labelColors = D, S.dataPoints = E, _ = function(t, e) {
                                var i = t._model,
                                    n = t._chart,
                                    o = t._chartInstance.chartArea,
                                    r = "center",
                                    a = "center";
                                i.y < e.height ? a = "top" : i.y > n.height - e.height && (a = "bottom");
                                var s, l, d, c, u, h = (o.left + o.right) / 2,
                                    p = (o.top + o.bottom) / 2;
                                "center" === a ? (s = function(t) {
                                    return t <= h
                                }, l = function(t) {
                                    return h < t
                                }) : (s = function(t) {
                                    return t <= e.width / 2
                                }, l = function(t) {
                                    return t >= n.width - e.width / 2
                                }), d = function(t) {
                                    return t + e.width > n.width
                                }, c = function(t) {
                                    return t - e.width < 0
                                }, u = function(t) {
                                    return t <= p ? "top" : "bottom"
                                }, s(i.x) ? (r = "left", d(i.x) && (r = "center", a = u(i.y))) : l(i.x) && (r = "right", c(i.x) && (r = "center", a = u(i.y)));
                                var f = t._options;
                                return {
                                    xAlign: f.xAlign ? f.xAlign : r,
                                    yAlign: f.yAlign ? f.yAlign : a
                                }
                            }(this, P = function(t, e) {
                                var i = t._chart.ctx,
                                    n = 2 * e.yPadding,
                                    o = 0,
                                    r = e.body,
                                    a = r.reduce(function(t, e) {
                                        return t + e.before.length + e.lines.length + e.after.length
                                    }, 0);
                                a += e.beforeBody.length + e.afterBody.length;
                                var s = e.title.length,
                                    l = e.footer.length,
                                    d = e.titleFontSize,
                                    c = e.bodyFontSize,
                                    u = e.footerFontSize;
                                n += s * d, n += s ? (s - 1) * e.titleSpacing : 0, n += s ? e.titleMarginBottom : 0, n += a * c, n += a ? (a - 1) * e.bodySpacing : 0, n += l ? e.footerMarginTop : 0, n += l * u, n += l ? (l - 1) * e.footerSpacing : 0;
                                var h = 0,
                                    p = function(t) {
                                        o = Math.max(o, i.measureText(t).width + h)
                                    };
                                return i.font = z.fontString(d, e._titleFontStyle, e._titleFontFamily), z.each(e.title, p), i.font = z.fontString(c, e._bodyFontStyle, e._bodyFontFamily), z.each(e.beforeBody.concat(e.afterBody), p), h = e.displayColors ? c + 2 : 0, z.each(r, function(t) {
                                    z.each(t.before, p), z.each(t.lines, p), z.each(t.after, p)
                                }), h = 0, i.font = z.fontString(u, e._footerFontStyle, e._footerFontFamily), z.each(e.footer, p), {
                                    width: o += 2 * e.xPadding,
                                    height: n
                                }
                            }(this, S)), o = P, r = _, a = (n = S).x, s = n.y, l = n.caretSize, d = n.caretPadding, c = n.cornerRadius, u = r.xAlign, h = r.yAlign, p = l + d, f = c + d, "right" === u ? a -= o.width : "center" === u && (a -= o.width / 2), "top" === h ? s += p : s -= "bottom" === h ? o.height + p : o.height / 2, "center" === h ? "left" === u ? a += p : "right" === u && (a -= p) : "left" === u ? a -= f : "right" === u && (a += f), M = {
                                x: a,
                                y: s
                            }
                        } else S.opacity = 0;
                        return S.xAlign = _.xAlign, S.yAlign = _.yAlign, S.x = M.x, S.y = M.y, S.width = P.width, S.height = P.height, S.caretX = A.x, S.caretY = A.y, x._model = S, t && k.custom && k.custom.call(x, S), x
                    },
                    drawCaret: function(t, e, i) {
                        var n, o, r, a, s, l, d = this._view,
                            c = this._chart.ctx,
                            u = d.caretSize,
                            h = d.cornerRadius,
                            p = d.xAlign,
                            f = d.yAlign,
                            g = t.x,
                            m = t.y,
                            v = e.width,
                            y = e.height;
                        "center" === f ? ("left" === p ? o = (n = g) - u : o = (n = g + v) + u, r = n, a = (s = m + y / 2) - u, l = s + u) : ("left" === p ? r = (o = (n = g + h) + u) + u : "right" === p ? r = (o = (n = g + v - h) - u) - u : (n = (o = g + v / 2) - u, r = o + u), "top" === f ? s = (a = m) - u : s = (a = m + y) + u, l = a), c.fillStyle = b(d.backgroundColor, i), c.beginPath(), c.moveTo(n, a), c.lineTo(o, s), c.lineTo(r, l), c.closePath(), c.fill()
                    },
                    drawTitle: function(t, e, i, n) {
                        var o = e.title;
                        if (o.length) {
                            i.textAlign = e._titleAlign, i.textBaseline = "top";
                            var r, a, s = e.titleFontSize,
                                l = e.titleSpacing;
                            for (i.fillStyle = b(e.titleFontColor, n), i.font = z.fontString(s, e._titleFontStyle, e._titleFontFamily), r = 0, a = o.length; r < a; ++r) i.fillText(o[r], t.x, t.y), t.y += s + l, r + 1 === o.length && (t.y += e.titleMarginBottom - l)
                        }
                    },
                    drawBody: function(i, n, o, r) {
                        var a = n.bodyFontSize,
                            e = n.bodySpacing,
                            t = n.body;
                        o.textAlign = n._bodyAlign, o.textBaseline = "top";
                        var s = b(n.bodyFontColor, r);
                        o.fillStyle = s, o.font = z.fontString(a, n._bodyFontStyle, n._bodyFontFamily);
                        var l = 0,
                            d = function(t) {
                                o.fillText(t, i.x + l, i.y), i.y += a + e
                            };
                        z.each(n.beforeBody, d);
                        var c = n.displayColors;
                        l = c ? a + 2 : 0, z.each(t, function(t, e) {
                            z.each(t.before, d), z.each(t.lines, function(t) {
                                c && (o.fillStyle = b(n.legendColorBackground, r), o.fillRect(i.x, i.y, a, a), o.strokeStyle = b(n.labelColors[e].borderColor, r), o.strokeRect(i.x, i.y, a, a), o.fillStyle = b(n.labelColors[e].backgroundColor, r), o.fillRect(i.x + 1, i.y + 1, a - 2, a - 2), o.fillStyle = s), d(t)
                            }), z.each(t.after, d)
                        }), l = 0, z.each(n.afterBody, d), i.y -= e
                    },
                    drawFooter: function(e, i, n, t) {
                        var o = i.footer;
                        o.length && (e.y += i.footerMarginTop, n.textAlign = i._footerAlign, n.textBaseline = "top", n.fillStyle = b(i.footerFontColor, t), n.font = z.fontString(i.footerFontSize, i._footerFontStyle, i._footerFontFamily), z.each(o, function(t) {
                            n.fillText(t, e.x, e.y), e.y += i.footerFontSize + i.footerSpacing
                        }))
                    },
                    drawBackground: function(t, e, i, n, o) {
                        i.fillStyle = b(e.backgroundColor, o), z.drawRoundedRectangle(i, t.x, t.y, n.width, n.height, e.cornerRadius), i.fill()
                    },
                    draw: function() {
                        var t = this._chart.ctx,
                            e = this._view;
                        if (0 !== e.opacity) {
                            var i = {
                                    width: e.width,
                                    height: e.height
                                },
                                n = {
                                    x: e.x,
                                    y: e.y
                                },
                                o = Math.abs(e.opacity < .001) ? 0 : e.opacity;
                            this._options.enabled && (this.drawBackground(n, e, t, i, o), this.drawCaret(n, i, o), n.x += e.xPadding, n.y += e.yPadding, this.drawTitle(n, e, t, o), this.drawBody(n, e, t, o), this.drawFooter(n, e, t, o))
                        }
                    },
                    handleEvent: function(t) {
                        var e = this,
                            i = e._options,
                            n = !1;
                        if (e._lastActive = e._lastActive || [], "mouseout" === t.type ? e._active = [] : e._active = e._chartInstance.getElementsAtEventForMode(t, i.mode, i), n = !z.arrayEquals(e._active, e._lastActive), e._lastActive = e._active, i.enabled || i.custom) {
                            e._eventPosition = z.getRelativePosition(t, e._chart);
                            var o = e._model;
                            e.update(!0), e.pivot(), n |= o.x !== e._model.x || o.y !== e._model.y
                        }
                        return n
                    }
                }), O.Tooltip.positioners = {
                    average: function(t) {
                        if (!t.length) return !1;
                        var e, i, n = 0,
                            o = 0,
                            r = 0;
                        for (e = 0, i = t.length; e < i; ++e) {
                            var a = t[e];
                            if (a && a.hasValue()) {
                                var s = a.tooltipPosition();
                                n += s.x, o += s.y, ++r
                            }
                        }
                        return {
                            x: Math.round(n / r),
                            y: Math.round(o / r)
                        }
                    },
                    nearest: function(t, e) {
                        var i, n, o, r = e.x,
                            a = e.y,
                            s = Number.POSITIVE_INFINITY;
                        for (n = 0, o = t.length; n < o; ++n) {
                            var l = t[n];
                            if (l && l.hasValue()) {
                                var d = l.getCenterPoint(),
                                    c = z.distanceBetweenPoints(e, d);
                                c < s && (s = c, i = l)
                            }
                        }
                        if (i) {
                            var u = i.tooltipPosition();
                            r = u.x, a = u.y
                        }
                        return {
                            x: r,
                            y: a
                        }
                    }
                }
            }
        }, {}],
        37: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var c = t.helpers,
                    e = t.defaults.global;
                e.elements.arc = {
                    backgroundColor: e.defaultColor,
                    borderColor: "#fff",
                    borderWidth: 2
                }, t.elements.Arc = t.Element.extend({
                    inLabelRange: function(t) {
                        var e = this._view;
                        return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
                    },
                    inRange: function(t, e) {
                        var i = this._view;
                        if (i) {
                            for (var n = c.getAngleFromPoint(i, {
                                    x: t,
                                    y: e
                                }), o = n.angle, r = n.distance, a = i.startAngle, s = i.endAngle; s < a;) s += 2 * Math.PI;
                            for (; s < o;) o -= 2 * Math.PI;
                            for (; o < a;) o += 2 * Math.PI;
                            var l = a <= o && o <= s,
                                d = r >= i.innerRadius && r <= i.outerRadius;
                            return l && d
                        }
                        return !1
                    },
                    getCenterPoint: function() {
                        var t = this._view,
                            e = (t.startAngle + t.endAngle) / 2,
                            i = (t.innerRadius + t.outerRadius) / 2;
                        return {
                            x: t.x + Math.cos(e) * i,
                            y: t.y + Math.sin(e) * i
                        }
                    },
                    getArea: function() {
                        var t = this._view;
                        return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
                    },
                    tooltipPosition: function() {
                        var t = this._view,
                            e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                            i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                        return {
                            x: t.x + Math.cos(e) * i,
                            y: t.y + Math.sin(e) * i
                        }
                    },
                    draw: function() {
                        var t = this._chart.ctx,
                            e = this._view,
                            i = e.startAngle,
                            n = e.endAngle;
                        t.beginPath(), t.arc(e.x, e.y, e.outerRadius, i, n), t.arc(e.x, e.y, e.innerRadius, n, i, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
                    }
                })
            }
        }, {}],
        38: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var p = t.helpers,
                    f = t.defaults.global;
                t.defaults.global.elements.line = {
                    tension: .4,
                    backgroundColor: f.defaultColor,
                    borderWidth: 3,
                    borderColor: f.defaultColor,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0,
                    borderJoinStyle: "miter",
                    capBezierPoints: !0,
                    fill: !0
                }, t.elements.Line = t.Element.extend({
                    draw: function() {
                        function t(t, e) {
                            var i = e._view;
                            !0 === e._view.steppedLine ? (r.lineTo(i.x, t._view.y), r.lineTo(i.x, i.y)) : 0 === e._view.tension ? r.lineTo(i.x, i.y) : r.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, i.controlPointPreviousX, i.controlPointPreviousY, i.x, i.y)
                        }
                        var e = this._view,
                            i = e.spanGaps,
                            n = e.scaleZero,
                            o = this._loop;
                        o || ("top" === e.fill ? n = e.scaleTop : "bottom" === e.fill && (n = e.scaleBottom));
                        var r = this._chart.ctx;
                        r.save();
                        var a, s, l, d, c = this._children.slice(),
                            u = -1;
                        if (o && c.length && c.push(c[0]), c.length && e.fill) {
                            for (r.beginPath(), a = 0; a < c.length; ++a) s = c[a], l = p.previousItem(c, a), d = s._view, 0 === a ? (o ? r.moveTo(n.x, n.y) : r.moveTo(d.x, n), d.skip || (u = a, r.lineTo(d.x, d.y))) : (l = -1 === u ? l : c[u], d.skip ? i || u !== a - 1 || (o ? r.lineTo(n.x, n.y) : r.lineTo(l._view.x, n)) : (u !== a - 1 ? i && -1 !== u ? t(l, s) : (o || r.lineTo(d.x, n), r.lineTo(d.x, d.y)) : t(l, s), u = a));
                            o || -1 === u || r.lineTo(c[u]._view.x, n), r.fillStyle = e.backgroundColor || f.defaultColor, r.closePath(), r.fill()
                        }
                        var h = f.elements.line;
                        for (r.lineCap = e.borderCapStyle || h.borderCapStyle, r.setLineDash && r.setLineDash(e.borderDash || h.borderDash), r.lineDashOffset = e.borderDashOffset || h.borderDashOffset, r.lineJoin = e.borderJoinStyle || h.borderJoinStyle, r.lineWidth = e.borderWidth || h.borderWidth, r.strokeStyle = e.borderColor || f.defaultColor, r.beginPath(), u = -1, a = 0; a < c.length; ++a) s = c[a], l = p.previousItem(c, a), d = s._view, 0 === a ? d.skip || (r.moveTo(d.x, d.y), u = a) : (l = -1 === u ? l : c[u], d.skip || (u !== a - 1 && !i || -1 === u ? r.moveTo(d.x, d.y) : t(l, s), u = a));
                        r.stroke(), r.restore()
                    }
                })
            }
        }, {}],
        39: [function(t, e, i) {
            "use strict";
            e.exports = function(a) {
                function t(t) {
                    var e = this._view;
                    return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2)
                }
                var s = a.helpers,
                    l = a.defaults.global,
                    d = l.defaultColor;
                l.elements.point = {
                    radius: 3,
                    pointStyle: "circle",
                    backgroundColor: d,
                    borderWidth: 1,
                    borderColor: d,
                    hitRadius: 1,
                    hoverRadius: 4,
                    hoverBorderWidth: 1
                }, a.elements.Point = a.Element.extend({
                    inRange: function(t, e) {
                        var i = this._view;
                        return !!i && Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(i.hitRadius + i.radius, 2)
                    },
                    inLabelRange: t,
                    inXRange: t,
                    inYRange: function(t) {
                        var e = this._view;
                        return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2)
                    },
                    getCenterPoint: function() {
                        var t = this._view;
                        return {
                            x: t.x,
                            y: t.y
                        }
                    },
                    getArea: function() {
                        return Math.PI * Math.pow(this._view.radius, 2)
                    },
                    tooltipPosition: function() {
                        var t = this._view;
                        return {
                            x: t.x,
                            y: t.y,
                            padding: t.radius + t.borderWidth
                        }
                    },
                    draw: function() {
                        var t = this._view,
                            e = this._chart.ctx,
                            i = t.pointStyle,
                            n = t.radius,
                            o = t.x,
                            r = t.y;
                        t.skip || (e.strokeStyle = t.borderColor || d, e.lineWidth = s.getValueOrDefault(t.borderWidth, l.elements.point.borderWidth), e.fillStyle = t.backgroundColor || d, a.canvasHelpers.drawPoint(e, i, n, o, r))
                    }
                })
            }
        }, {}],
        40: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                function l(t) {
                    return void 0 !== t._view.width
                }

                function o(t) {
                    var e, i, n, o, r = t._view;
                    if (l(t)) {
                        var a = r.width / 2;
                        e = r.x - a, i = r.x + a, n = Math.min(r.y, r.base), o = Math.max(r.y, r.base)
                    } else {
                        var s = r.height / 2;
                        e = Math.min(r.x, r.base), i = Math.max(r.x, r.base), n = r.y - s, o = r.y + s
                    }
                    return {
                        left: e,
                        top: n,
                        right: i,
                        bottom: o
                    }
                }
                var e = t.defaults.global;
                e.elements.rectangle = {
                    backgroundColor: e.defaultColor,
                    borderWidth: 0,
                    borderColor: e.defaultColor,
                    borderSkipped: "bottom"
                }, t.elements.Rectangle = t.Element.extend({
                    draw: function() {
                        function t(t) {
                            return l[(d + t) % 4]
                        }
                        var e = this._chart.ctx,
                            i = this._view,
                            n = i.width / 2,
                            o = i.x - n,
                            r = i.x + n,
                            a = i.base - (i.base - i.y),
                            s = i.borderWidth / 2;
                        i.borderWidth && (o += s, r -= s, a += s), e.beginPath(), e.fillStyle = i.backgroundColor, e.strokeStyle = i.borderColor, e.lineWidth = i.borderWidth;
                        var l = [
                                [o, i.base],
                                [o, a],
                                [r, a],
                                [r, i.base]
                            ],
                            d = ["bottom", "left", "top", "right"].indexOf(i.borderSkipped, 0); - 1 === d && (d = 0);
                        var c = t(0);
                        e.moveTo(c[0], c[1]);
                        for (var u = 1; u < 4; u++) c = t(u), e.lineTo(c[0], c[1]);
                        e.fill(), i.borderWidth && e.stroke()
                    },
                    height: function() {
                        var t = this._view;
                        return t.base - t.y
                    },
                    inRange: function(t, e) {
                        var i = !1;
                        if (this._view) {
                            var n = o(this);
                            i = t >= n.left && t <= n.right && e >= n.top && e <= n.bottom
                        }
                        return i
                    },
                    inLabelRange: function(t, e) {
                        if (!this._view) return !1;
                        var i = o(this);
                        return l(this) ? t >= i.left && t <= i.right : e >= i.top && e <= i.bottom
                    },
                    inXRange: function(t) {
                        var e = o(this);
                        return t >= e.left && t <= e.right
                    },
                    inYRange: function(t) {
                        var e = o(this);
                        return t >= e.top && t <= e.bottom
                    },
                    getCenterPoint: function() {
                        var t, e, i = this._view;
                        return l(this) ? (t = i.x, e = (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, e = i.y), {
                            x: t,
                            y: e
                        }
                    },
                    getArea: function() {
                        var t = this._view;
                        return t.width * Math.abs(t.y - t.base)
                    },
                    tooltipPosition: function() {
                        var t = this._view;
                        return {
                            x: t.x,
                            y: t.y
                        }
                    }
                })
            }
        }, {}],
        41: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var n = t.helpers,
                    e = t.Scale.extend({
                        getLabels: function() {
                            var t = this.chart.data;
                            return (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                        },
                        determineDataLimits: function() {
                            var t, e = this,
                                i = e.getLabels();
                            e.minIndex = 0, e.maxIndex = i.length - 1, void 0 !== e.options.ticks.min && (t = n.indexOf(i, e.options.ticks.min), e.minIndex = -1 !== t ? t : e.minIndex), void 0 !== e.options.ticks.max && (t = n.indexOf(i, e.options.ticks.max), e.maxIndex = -1 !== t ? t : e.maxIndex), e.min = i[e.minIndex], e.max = i[e.maxIndex]
                        },
                        buildTicks: function() {
                            var t = this.getLabels();
                            this.ticks = 0 === this.minIndex && this.maxIndex === t.length - 1 ? t : t.slice(this.minIndex, this.maxIndex + 1)
                        },
                        getLabelForIndex: function(t, e) {
                            var i = this.chart.data,
                                n = this.isHorizontal();
                            return i.xLabels && n || i.yLabels && !n ? this.getRightValue(i.datasets[e].data[t]) : this.ticks[t]
                        },
                        getPixelForValue: function(t, e, i, n) {
                            var o = this,
                                r = Math.max(o.maxIndex + 1 - o.minIndex - (o.options.gridLines.offsetGridLines ? 0 : 1), 1);
                            if (void 0 !== t && isNaN(e)) {
                                var a = o.getLabels().indexOf(t);
                                e = -1 !== a ? a : e
                            }
                            if (o.isHorizontal()) {
                                var s = (o.width - (o.paddingLeft + o.paddingRight)) / r,
                                    l = s * (e - o.minIndex) + o.paddingLeft;
                                return (o.options.gridLines.offsetGridLines && n || o.maxIndex === o.minIndex && n) && (l += s / 2), o.left + Math.round(l)
                            }
                            var d = (o.height - (o.paddingTop + o.paddingBottom)) / r,
                                c = d * (e - o.minIndex) + o.paddingTop;
                            return o.options.gridLines.offsetGridLines && n && (c += d / 2), o.top + Math.round(c)
                        },
                        getPixelForTick: function(t, e) {
                            return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e)
                        },
                        getValueForPixel: function(t) {
                            var e = this,
                                i = Math.max(e.ticks.length - (e.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                n = e.isHorizontal(),
                                o = (n ? e.width - (e.paddingLeft + e.paddingRight) : e.height - (e.paddingTop + e.paddingBottom)) / i;
                            return t -= n ? e.left : e.top, e.options.gridLines.offsetGridLines && (t -= o / 2), (t -= n ? e.paddingLeft : e.paddingTop) <= 0 ? 0 : Math.round(t / o)
                        },
                        getBasePixel: function() {
                            return this.bottom
                        }
                    });
                t.scaleService.registerScaleType("category", e, {
                    position: "bottom"
                })
            }
        }, {}],
        42: [function(t, e, i) {
            "use strict";
            e.exports = function(n) {
                var c = n.helpers,
                    t = {
                        position: "left",
                        ticks: {
                            callback: n.Ticks.formatters.linear
                        }
                    },
                    e = n.LinearScaleBase.extend({
                        determineDataLimits: function() {
                            function i(t) {
                                return e ? t.xAxisID === a.id : t.yAxisID === a.id
                            }
                            var a = this,
                                s = a.options,
                                l = a.chart,
                                t = l.data.datasets,
                                e = a.isHorizontal();
                            if (a.min = null, a.max = null, s.stacked) {
                                var d = {};
                                c.each(t, function(t, e) {
                                    var n = l.getDatasetMeta(e);
                                    void 0 === d[n.type] && (d[n.type] = {
                                        positiveValues: [],
                                        negativeValues: []
                                    });
                                    var o = d[n.type].positiveValues,
                                        r = d[n.type].negativeValues;
                                    l.isDatasetVisible(e) && i(n) && c.each(t.data, function(t, e) {
                                        var i = +a.getRightValue(t);
                                        isNaN(i) || n.data[e].hidden || (o[e] = o[e] || 0, r[e] = r[e] || 0, s.relativePoints ? o[e] = 100 : i < 0 ? r[e] += i : o[e] += i)
                                    })
                                }), c.each(d, function(t) {
                                    var e = t.positiveValues.concat(t.negativeValues),
                                        i = c.min(e),
                                        n = c.max(e);
                                    a.min = null === a.min ? i : Math.min(a.min, i), a.max = null === a.max ? n : Math.max(a.max, n)
                                })
                            } else c.each(t, function(t, e) {
                                var n = l.getDatasetMeta(e);
                                l.isDatasetVisible(e) && i(n) && c.each(t.data, function(t, e) {
                                    var i = +a.getRightValue(t);
                                    isNaN(i) || n.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i))
                                })
                            });
                            this.handleTickRangeOptions()
                        },
                        getTickLimit: function() {
                            var t, e = this.options.ticks;
                            if (this.isHorizontal()) t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.width / 50));
                            else {
                                var i = c.getValueOrDefault(e.fontSize, n.defaults.global.defaultFontSize);
                                t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.height / (2 * i)))
                            }
                            return t
                        },
                        handleDirectionalChanges: function() {
                            this.isHorizontal() || this.ticks.reverse()
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForValue: function(t) {
                            var e, i, n = this,
                                o = n.paddingLeft,
                                r = n.paddingBottom,
                                a = n.start,
                                s = +n.getRightValue(t),
                                l = n.end - a;
                            return n.isHorizontal() ? (i = n.width - (o + n.paddingRight), e = n.left + i / l * (s - a), Math.round(e + o)) : (i = n.height - (n.paddingTop + r), e = n.bottom - r - i / l * (s - a), Math.round(e))
                        },
                        getValueForPixel: function(t) {
                            var e = this,
                                i = e.isHorizontal(),
                                n = e.paddingLeft,
                                o = e.paddingBottom,
                                r = i ? e.width - (n + e.paddingRight) : e.height - (e.paddingTop + o),
                                a = (i ? t - e.left - n : e.bottom - o - t) / r;
                            return e.start + (e.end - e.start) * a
                        },
                        getPixelForTick: function(t) {
                            return this.getPixelForValue(this.ticksAsNumbers[t])
                        }
                    });
                n.scaleService.registerScaleType("linear", e, t)
            }
        }, {}],
        43: [function(t, e, i) {
            "use strict";
            e.exports = function(r) {
                var a = r.helpers,
                    t = a.noop;
                r.LinearScaleBase = r.Scale.extend({
                    handleTickRangeOptions: function() {
                        var t = this,
                            e = t.options.ticks;
                        if (e.beginAtZero) {
                            var i = a.sign(t.min),
                                n = a.sign(t.max);
                            i < 0 && n < 0 ? t.max = 0 : 0 < i && 0 < n && (t.min = 0)
                        }
                        void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (t.max = Math.max(t.max, e.suggestedMax)), t.min === t.max && (t.max++, e.beginAtZero || t.min--)
                    },
                    getTickLimit: t,
                    handleDirectionalChanges: t,
                    buildTicks: function() {
                        var t = this,
                            e = t.options.ticks,
                            i = t.getTickLimit(),
                            n = {
                                maxTicks: i = Math.max(2, i),
                                min: e.min,
                                max: e.max,
                                stepSize: a.getValueOrDefault(e.fixedStepSize, e.stepSize)
                            },
                            o = t.ticks = r.Ticks.generators.linear(n, t);
                        t.handleDirectionalChanges(), t.max = a.max(o), t.min = a.min(o), e.reverse ? (o.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                    },
                    convertTicksToLabels: function() {
                        this.ticksAsNumbers = this.ticks.slice(), this.zeroLineIndex = this.ticks.indexOf(0), r.Scale.prototype.convertTicksToLabels.call(this)
                    }
                })
            }
        }, {}],
        44: [function(t, e, i) {
            "use strict";
            e.exports = function(o) {
                var u = o.helpers,
                    t = {
                        position: "left",
                        ticks: {
                            callback: o.Ticks.formatters.logarithmic
                        }
                    },
                    e = o.Scale.extend({
                        determineDataLimits: function() {
                            function i(t) {
                                return o ? t.xAxisID === r.id : t.yAxisID === r.id
                            }
                            var r = this,
                                a = r.options,
                                t = a.ticks,
                                s = r.chart,
                                e = s.data.datasets,
                                n = u.getValueOrDefault,
                                o = r.isHorizontal();
                            if (r.min = null, r.max = null, r.minNotZero = null, a.stacked) {
                                var l = {};
                                u.each(e, function(t, e) {
                                    var o = s.getDatasetMeta(e);
                                    s.isDatasetVisible(e) && i(o) && (void 0 === l[o.type] && (l[o.type] = []), u.each(t.data, function(t, e) {
                                        var i = l[o.type],
                                            n = +r.getRightValue(t);
                                        isNaN(n) || o.data[e].hidden || (i[e] = i[e] || 0, a.relativePoints ? i[e] = 100 : i[e] += n)
                                    }))
                                }), u.each(l, function(t) {
                                    var e = u.min(t),
                                        i = u.max(t);
                                    r.min = null === r.min ? e : Math.min(r.min, e), r.max = null === r.max ? i : Math.max(r.max, i)
                                })
                            } else u.each(e, function(t, e) {
                                var n = s.getDatasetMeta(e);
                                s.isDatasetVisible(e) && i(n) && u.each(t.data, function(t, e) {
                                    var i = +r.getRightValue(t);
                                    isNaN(i) || n.data[e].hidden || (null === r.min ? r.min = i : i < r.min && (r.min = i), null === r.max ? r.max = i : i > r.max && (r.max = i), 0 !== i && (null === r.minNotZero || i < r.minNotZero) && (r.minNotZero = i))
                                })
                            });
                            r.min = n(t.min, r.min), r.max = n(t.max, r.max), r.min === r.max && (0 !== r.min && null !== r.min ? (r.min = Math.pow(10, Math.floor(u.log10(r.min)) - 1), r.max = Math.pow(10, Math.floor(u.log10(r.max)) + 1)) : (r.min = 1, r.max = 10))
                        },
                        buildTicks: function() {
                            var t = this,
                                e = t.options.ticks,
                                i = {
                                    min: e.min,
                                    max: e.max
                                },
                                n = t.ticks = o.Ticks.generators.logarithmic(i, t);
                            t.isHorizontal() || n.reverse(), t.max = u.max(n), t.min = u.min(n), e.reverse ? (n.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                        },
                        convertTicksToLabels: function() {
                            this.tickValues = this.ticks.slice(), o.Scale.prototype.convertTicksToLabels.call(this)
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForTick: function(t) {
                            return this.getPixelForValue(this.tickValues[t])
                        },
                        getPixelForValue: function(t) {
                            var e, i, n, o = this,
                                r = o.start,
                                a = +o.getRightValue(t),
                                s = o.paddingTop,
                                l = o.paddingBottom,
                                d = o.paddingLeft,
                                c = o.options.ticks;
                            return o.isHorizontal() ? (n = u.log10(o.end) - u.log10(r), 0 === a ? i = o.left + d : (e = o.width - (d + o.paddingRight), i = o.left + e / n * (u.log10(a) - u.log10(r)), i += d)) : (e = o.height - (s + l), 0 !== r || c.reverse ? 0 === o.end && c.reverse ? (n = u.log10(o.start) - u.log10(o.minNotZero), i = a === o.end ? o.top + s : a === o.minNotZero ? o.top + s + .02 * e : o.top + s + .02 * e + .98 * e / n * (u.log10(a) - u.log10(o.minNotZero))) : (n = u.log10(o.end) - u.log10(r), e = o.height - (s + l), i = o.bottom - l - e / n * (u.log10(a) - u.log10(r))) : (n = u.log10(o.end) - u.log10(o.minNotZero), i = a === r ? o.bottom - l : a === o.minNotZero ? o.bottom - l - .02 * e : o.bottom - l - .02 * e - .98 * e / n * (u.log10(a) - u.log10(o.minNotZero)))), i
                        },
                        getValueForPixel: function(t) {
                            var e, i, n = this,
                                o = u.log10(n.end) - u.log10(n.start);
                            return n.isHorizontal() ? (i = n.width - (n.paddingLeft + n.paddingRight), e = n.start * Math.pow(10, (t - n.left - n.paddingLeft) * o / i)) : (i = n.height - (n.paddingTop + n.paddingBottom), e = Math.pow(10, (n.bottom - n.paddingBottom - t) * o / i) / n.start), e
                        }
                    });
                o.scaleService.registerScaleType("logarithmic", e, t)
            }
        }, {}],
        45: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var S = t.helpers,
                    C = t.defaults.global,
                    e = {
                        display: !0,
                        animate: !0,
                        lineArc: !1,
                        position: "chartArea",
                        angleLines: {
                            display: !0,
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1
                        },
                        ticks: {
                            showLabelBackdrop: !0,
                            backdropColor: "rgba(255,255,255,0.75)",
                            backdropPaddingY: 2,
                            backdropPaddingX: 2,
                            callback: t.Ticks.formatters.linear
                        },
                        pointLabels: {
                            fontSize: 10,
                            callback: function(t) {
                                return t
                            }
                        }
                    },
                    i = t.LinearScaleBase.extend({
                        getValueCount: function() {
                            return this.chart.data.labels.length
                        },
                        setDimensions: function() {
                            var t = this,
                                e = t.options,
                                i = e.ticks;
                            t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);
                            var n = S.min([t.height, t.width]),
                                o = S.getValueOrDefault(i.fontSize, C.defaultFontSize);
                            t.drawingArea = e.display ? n / 2 - (o / 2 + i.backdropPaddingY) : n / 2
                        },
                        determineDataLimits: function() {
                            var o = this,
                                i = o.chart;
                            o.min = null, o.max = null, S.each(i.data.datasets, function(t, e) {
                                if (i.isDatasetVisible(e)) {
                                    var n = i.getDatasetMeta(e);
                                    S.each(t.data, function(t, e) {
                                        var i = +o.getRightValue(t);
                                        isNaN(i) || n.data[e].hidden || (null === o.min ? o.min = i : i < o.min && (o.min = i), null === o.max ? o.max = i : i > o.max && (o.max = i))
                                    })
                                }
                            }), o.handleTickRangeOptions()
                        },
                        getTickLimit: function() {
                            var t = this.options.ticks,
                                e = S.getValueOrDefault(t.fontSize, C.defaultFontSize);
                            return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e)))
                        },
                        convertTicksToLabels: function() {
                            t.LinearScaleBase.prototype.convertTicksToLabels.call(this), this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this)
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        fit: function() {
                            var t, e, i, n, o, r, a, s, l, d, c, u, h = this.options.pointLabels,
                                p = S.getValueOrDefault(h.fontSize, C.defaultFontSize),
                                f = S.getValueOrDefault(h.fontStyle, C.defaultFontStyle),
                                g = S.getValueOrDefault(h.fontFamily, C.defaultFontFamily),
                                m = S.fontString(p, f, g),
                                v = S.min([this.height / 2 - p - 5, this.width / 2]),
                                y = this.width,
                                b = 0;
                            for (this.ctx.font = m, e = 0; e < this.getValueCount(); e++) {
                                t = this.getPointPosition(e, v), i = this.ctx.measureText(this.pointLabels[e] ? this.pointLabels[e] : "").width + 5;
                                var x = 360 * (this.getIndexAngle(e) + Math.PI / 2) / (2 * Math.PI) % 360;
                                0 === x || 180 === x ? (n = i / 2, t.x + n > y && (y = t.x + n, o = e), t.x - n < b && (b = t.x - n, a = e)) : x < 180 ? t.x + i > y && (y = t.x + i, o = e) : t.x - i < b && (b = t.x - i, a = e)
                            }
                            l = b, d = Math.ceil(y - this.width), r = this.getIndexAngle(o), s = this.getIndexAngle(a), c = d / Math.sin(r + Math.PI / 2), u = l / Math.sin(s + Math.PI / 2), c = S.isNumber(c) ? c : 0, u = S.isNumber(u) ? u : 0, this.drawingArea = Math.round(v - (u + c) / 2), this.setCenterPoint(u, c)
                        },
                        setCenterPoint: function(t, e) {
                            var i = this.width - e - this.drawingArea,
                                n = t + this.drawingArea;
                            this.xCenter = Math.round((n + i) / 2 + this.left), this.yCenter = Math.round(this.height / 2 + this.top)
                        },
                        getIndexAngle: function(t) {
                            var e = 2 * Math.PI / this.getValueCount(),
                                i = (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360;
                            return t * e - Math.PI / 2 + i
                        },
                        getDistanceFromCenterForValue: function(t) {
                            if (null === t) return 0;
                            var e = this.drawingArea / (this.max - this.min);
                            return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
                        },
                        getPointPosition: function(t, e) {
                            var i = this.getIndexAngle(t);
                            return {
                                x: Math.round(Math.cos(i) * e) + this.xCenter,
                                y: Math.round(Math.sin(i) * e) + this.yCenter
                            }
                        },
                        getPointPositionForValue: function(t, e) {
                            return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                        },
                        getBasePosition: function() {
                            var t = this.min,
                                e = this.max;
                            return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0)
                        },
                        draw: function() {
                            var l = this,
                                d = l.options,
                                c = d.gridLines,
                                u = d.ticks,
                                t = d.angleLines,
                                e = d.pointLabels,
                                h = S.getValueOrDefault;
                            if (d.display) {
                                var p = l.ctx,
                                    f = h(u.fontSize, C.defaultFontSize),
                                    i = h(u.fontStyle, C.defaultFontStyle),
                                    n = h(u.fontFamily, C.defaultFontFamily),
                                    g = S.fontString(f, i, n);
                                if (S.each(l.ticks, function(t, e) {
                                        if (0 < e || d.reverse) {
                                            var i = l.getDistanceFromCenterForValue(l.ticksAsNumbers[e]),
                                                n = l.yCenter - i;
                                            if (c.display && 0 !== e)
                                                if (p.strokeStyle = S.getValueAtIndexOrDefault(c.color, e - 1), p.lineWidth = S.getValueAtIndexOrDefault(c.lineWidth, e - 1), d.lineArc) p.beginPath(), p.arc(l.xCenter, l.yCenter, i, 0, 2 * Math.PI), p.closePath(), p.stroke();
                                                else {
                                                    p.beginPath();
                                                    for (var o = 0; o < l.getValueCount(); o++) {
                                                        var r = l.getPointPosition(o, i);
                                                        0 === o ? p.moveTo(r.x, r.y) : p.lineTo(r.x, r.y)
                                                    }
                                                    p.closePath(), p.stroke()
                                                }
                                            if (u.display) {
                                                var a = h(u.fontColor, C.defaultFontColor);
                                                if (p.font = g, u.showLabelBackdrop) {
                                                    var s = p.measureText(t).width;
                                                    p.fillStyle = u.backdropColor, p.fillRect(l.xCenter - s / 2 - u.backdropPaddingX, n - f / 2 - u.backdropPaddingY, s + 2 * u.backdropPaddingX, f + 2 * u.backdropPaddingY)
                                                }
                                                p.textAlign = "center", p.textBaseline = "middle", p.fillStyle = a, p.fillText(t, l.xCenter, n)
                                            }
                                        }
                                    }), !d.lineArc) {
                                    p.lineWidth = t.lineWidth, p.strokeStyle = t.color;
                                    for (var o = l.getDistanceFromCenterForValue(d.reverse ? l.min : l.max), r = h(e.fontSize, C.defaultFontSize), a = h(e.fontStyle, C.defaultFontStyle), s = h(e.fontFamily, C.defaultFontFamily), m = S.fontString(r, a, s), v = l.getValueCount() - 1; 0 <= v; v--) {
                                        if (t.display) {
                                            var y = l.getPointPosition(v, o);
                                            p.beginPath(), p.moveTo(l.xCenter, l.yCenter), p.lineTo(y.x, y.y), p.stroke(), p.closePath()
                                        }
                                        var b = l.getPointPosition(v, o + 5),
                                            x = h(e.fontColor, C.defaultFontColor);
                                        p.font = m, p.fillStyle = x;
                                        var k = l.pointLabels,
                                            w = 360 * (this.getIndexAngle(v) + Math.PI / 2) / (2 * Math.PI) % 360;
                                        p.textAlign = 0 === w || 180 === w ? "center" : w < 180 ? "left" : "right", p.textBaseline = 90 === w || 270 === w ? "middle" : 270 < w || w < 90 ? "bottom" : "top", p.fillText(k[v] ? k[v] : "", b.x, b.y)
                                    }
                                }
                            }
                        }
                    });
                t.scaleService.registerScaleType("radialLinear", i, e)
            }
        }, {}],
        46: [function(t, e, i) {
            "use strict";
            var a = t(1);
            a = "function" == typeof a ? a : window.moment, e.exports = function(b) {
                var x = b.helpers,
                    k = {
                        units: [{
                            name: "millisecond",
                            steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                        }, {
                            name: "second",
                            steps: [1, 2, 5, 10, 30]
                        }, {
                            name: "minute",
                            steps: [1, 2, 5, 10, 30]
                        }, {
                            name: "hour",
                            steps: [1, 2, 3, 6, 12]
                        }, {
                            name: "day",
                            steps: [1, 2, 5]
                        }, {
                            name: "week",
                            maxStep: 4
                        }, {
                            name: "month",
                            maxStep: 3
                        }, {
                            name: "quarter",
                            maxStep: 4
                        }, {
                            name: "year",
                            maxStep: !1
                        }]
                    },
                    t = b.Scale.extend({
                        initialize: function() {
                            if (!a) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                            b.Scale.prototype.initialize.call(this)
                        },
                        getLabelMoment: function(t, e) {
                            return null === t || null === e ? null : void 0 !== this.labelMoments[t] ? this.labelMoments[t][e] : null
                        },
                        getLabelDiff: function(t, e) {
                            return null === t || null === e ? null : (void 0 === this.labelDiffs && this.buildLabelDiffs(), void 0 !== this.labelDiffs[t] ? this.labelDiffs[t][e] : null)
                        },
                        getMomentStartOf: function(t) {
                            return "week" === this.options.time.unit && !1 !== this.options.time.isoWeekday ? t.clone().startOf("isoWeek").isoWeekday(this.options.time.isoWeekday) : t.clone().startOf(this.tickUnit)
                        },
                        determineDataLimits: function() {
                            var o = this;
                            o.labelMoments = [];
                            var r = [];
                            o.chart.data.labels && 0 < o.chart.data.labels.length ? (x.each(o.chart.data.labels, function(t) {
                                var e = o.parseTime(t);
                                e.isValid() && (o.options.time.round && e.startOf(o.options.time.round), r.push(e))
                            }, o), o.firstTick = a.min.call(o, r), o.lastTick = a.max.call(o, r)) : (o.firstTick = null, o.lastTick = null), x.each(o.chart.data.datasets, function(t, e) {
                                var i = [],
                                    n = o.chart.isDatasetVisible(e);
                                "object" == typeof t.data[0] && null !== t.data[0] ? x.each(t.data, function(t) {
                                    var e = o.parseTime(o.getRightValue(t));
                                    e.isValid() && (o.options.time.round && e.startOf(o.options.time.round), i.push(e), n && (o.firstTick = null !== o.firstTick ? a.min(o.firstTick, e) : e, o.lastTick = null !== o.lastTick ? a.max(o.lastTick, e) : e))
                                }, o) : i = r, o.labelMoments.push(i)
                            }, o), o.options.time.min && (o.firstTick = o.parseTime(o.options.time.min)), o.options.time.max && (o.lastTick = o.parseTime(o.options.time.max)), o.firstTick = (o.firstTick || a()).clone(), o.lastTick = (o.lastTick || a()).clone()
                        },
                        buildLabelDiffs: function() {
                            var n = this;
                            n.labelDiffs = [];
                            var o = [];
                            n.chart.data.labels && 0 < n.chart.data.labels.length && x.each(n.chart.data.labels, function(t) {
                                var e = n.parseTime(t);
                                e.isValid() && (n.options.time.round && e.startOf(n.options.time.round), o.push(e.diff(n.firstTick, n.tickUnit, !0)))
                            }, n), x.each(n.chart.data.datasets, function(t) {
                                var i = [];
                                "object" == typeof t.data[0] && null !== t.data[0] ? x.each(t.data, function(t) {
                                    var e = n.parseTime(n.getRightValue(t));
                                    e.isValid() && (n.options.time.round && e.startOf(n.options.time.round), i.push(e.diff(n.firstTick, n.tickUnit, !0)))
                                }, n) : i = o, n.labelDiffs.push(i)
                            }, n)
                        },
                        buildTicks: function() {
                            var t = this;
                            t.ctx.save();
                            var e, i = x.getValueOrDefault(t.options.ticks.fontSize, b.defaults.global.defaultFontSize),
                                n = x.getValueOrDefault(t.options.ticks.fontStyle, b.defaults.global.defaultFontStyle),
                                o = x.getValueOrDefault(t.options.ticks.fontFamily, b.defaults.global.defaultFontFamily),
                                r = x.fontString(i, n, o);
                            if (t.ctx.font = r, t.ticks = [], t.unitScale = 1, t.scaleSizeInUnits = 0, t.options.time.unit) t.tickUnit = t.options.time.unit || "day", t.displayFormat = t.options.time.displayFormats[t.tickUnit], t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0), t.unitScale = x.getValueOrDefault(t.options.time.unitStepSize, 1);
                            else {
                                var a = t.isHorizontal() ? t.width - (t.paddingLeft + t.paddingRight) : t.height - (t.paddingTop + t.paddingBottom),
                                    s = t.tickFormatFunction(t.firstTick, 0, []),
                                    l = t.ctx.measureText(s).width,
                                    d = a / (l = l * Math.cos(x.toRadians(t.options.ticks.maxRotation)) + i * Math.sin(x.toRadians(t.options.ticks.maxRotation)));
                                t.tickUnit = t.options.time.minUnit, t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0), t.displayFormat = t.options.time.displayFormats[t.tickUnit];
                                for (var c = 0, u = k.units[c]; c < k.units.length;) {
                                    if (t.unitScale = 1, x.isArray(u.steps) && Math.ceil(t.scaleSizeInUnits / d) < x.max(u.steps)) {
                                        for (var h = 0; h < u.steps.length; ++h)
                                            if (u.steps[h] >= Math.ceil(t.scaleSizeInUnits / d)) {
                                                t.unitScale = x.getValueOrDefault(t.options.time.unitStepSize, u.steps[h]);
                                                break
                                            }
                                        break
                                    }
                                    if (!1 === u.maxStep || Math.ceil(t.scaleSizeInUnits / d) < u.maxStep) {
                                        t.unitScale = x.getValueOrDefault(t.options.time.unitStepSize, Math.ceil(t.scaleSizeInUnits / d));
                                        break
                                    }
                                    u = k.units[++c], t.tickUnit = u.name;
                                    var p = t.firstTick.diff(t.getMomentStartOf(t.firstTick), t.tickUnit, !0),
                                        f = t.getMomentStartOf(t.lastTick.clone().add(1, t.tickUnit)).diff(t.lastTick, t.tickUnit, !0);
                                    t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0) + p + f, t.displayFormat = t.options.time.displayFormats[u.name]
                                }
                            }
                            if (t.options.time.min ? e = t.getMomentStartOf(t.firstTick) : (t.firstTick = t.getMomentStartOf(t.firstTick), e = t.firstTick), !t.options.time.max) {
                                var g = t.getMomentStartOf(t.lastTick),
                                    m = g.diff(t.lastTick, t.tickUnit, !0);
                                m < 0 ? t.lastTick = t.getMomentStartOf(t.lastTick.add(1, t.tickUnit)) : 0 <= m && (t.lastTick = g), t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0)
                            }
                            t.options.time.displayFormat && (t.displayFormat = t.options.time.displayFormat), t.ticks.push(t.firstTick.clone());
                            for (var v = 1; v <= t.scaleSizeInUnits; ++v) {
                                var y = e.clone().add(v, t.tickUnit);
                                if (t.options.time.max && 0 <= y.diff(t.lastTick, t.tickUnit, !0)) break;
                                v % t.unitScale == 0 && t.ticks.push(y)
                            }(0 !== t.ticks[t.ticks.length - 1].diff(t.lastTick, t.tickUnit) || 0 === t.scaleSizeInUnits) && (t.options.time.max ? (t.ticks.push(t.lastTick.clone()), t.scaleSizeInUnits = t.lastTick.diff(t.ticks[0], t.tickUnit, !0)) : (t.ticks.push(t.lastTick.clone()), t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0))), t.ctx.restore(), t.labelDiffs = void 0
                        },
                        getLabelForIndex: function(t, e) {
                            var i = this.chart.data.labels && t < this.chart.data.labels.length ? this.chart.data.labels[t] : "";
                            return "object" == typeof this.chart.data.datasets[e].data[0] && (i = this.getRightValue(this.chart.data.datasets[e].data[t])), this.options.time.tooltipFormat && (i = this.parseTime(i).format(this.options.time.tooltipFormat)), i
                        },
                        tickFormatFunction: function(t, e, i) {
                            var n = t.format(this.displayFormat),
                                o = this.options.ticks,
                                r = x.getValueOrDefault(o.callback, o.userCallback);
                            return r ? r(n, e, i) : n
                        },
                        convertTicksToLabels: function() {
                            this.tickMoments = this.ticks, this.ticks = this.ticks.map(this.tickFormatFunction, this)
                        },
                        getPixelForValue: function(t, e, i) {
                            var n = this,
                                o = null;
                            if (void 0 !== e && void 0 !== i && (o = n.getLabelDiff(i, e)), null === o && (t && t.isValid || (t = n.parseTime(n.getRightValue(t))), t && t.isValid && t.isValid() && (o = t.diff(n.firstTick, n.tickUnit, !0))), null !== o) {
                                var r = 0 !== o ? o / n.scaleSizeInUnits : o;
                                if (n.isHorizontal()) {
                                    var a = (n.width - (n.paddingLeft + n.paddingRight)) * r + n.paddingLeft;
                                    return n.left + Math.round(a)
                                }
                                var s = (n.height - (n.paddingTop + n.paddingBottom)) * r + n.paddingTop;
                                return n.top + Math.round(s)
                            }
                        },
                        getPixelForTick: function(t) {
                            return this.getPixelForValue(this.tickMoments[t], null, null)
                        },
                        getValueForPixel: function(t) {
                            var e = this,
                                i = e.isHorizontal() ? e.width - (e.paddingLeft + e.paddingRight) : e.height - (e.paddingTop + e.paddingBottom),
                                n = (t - (e.isHorizontal() ? e.left + e.paddingLeft : e.top + e.paddingTop)) / i;
                            return n *= e.scaleSizeInUnits, e.firstTick.clone().add(a.duration(n, e.tickUnit).asSeconds(), "seconds")
                        },
                        parseTime: function(t) {
                            return "string" == typeof this.options.time.parser ? a(t, this.options.time.parser) : "function" == typeof this.options.time.parser ? this.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? a(t) : t.isValid && t.isValid() ? t : "string" != typeof this.options.time.format && this.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), this.options.time.format(t)) : a(t, this.options.time.format)
                        }
                    });
                b.scaleService.registerScaleType("time", t, {
                    position: "bottom",
                    time: {
                        parser: !1,
                        format: !1,
                        unit: !1,
                        round: !1,
                        displayFormat: !1,
                        isoWeekday: !1,
                        minUnit: "millisecond",
                        displayFormats: {
                            millisecond: "h:mm:ss.SSS a",
                            second: "h:mm:ss a",
                            minute: "h:mm:ss a",
                            hour: "MMM D, hA",
                            day: "ll",
                            week: "ll",
                            month: "MMM YYYY",
                            quarter: "[Q]Q - YYYY",
                            year: "YYYY"
                        }
                    },
                    ticks: {
                        autoSkip: !1
                    }
                })
            }
        }, {
            1: 1
        }]
    }, {}, [7])(7)
}),
function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
}(function() {
    "use strict";

    function j(t, e) {
        var i = document.createElement("div");
        return $(i, e), t.appendChild(i), i
    }

    function o(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t)
    }

    function H(t, e, i) {
        0 < i && ($(t, e), setTimeout(function() {
            q(t, e)
        }, i))
    }

    function V(t) {
        return Array.isArray(t) ? t : [t]
    }

    function e(t) {
        var e = (t = String(t)).split(".");
        return 1 < e.length ? e[1].length : 0
    }

    function $(t, e) {
        t.classList ? t.classList.add(e) : t.className += " " + e
    }

    function q(t, e) {
        t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }

    function U() {
        var t = void 0 !== window.pageXOffset,
            e = "CSS1Compat" === (document.compatMode || "");
        return {
            x: t ? window.pageXOffset : e ? document.documentElement.scrollLeft : document.body.scrollLeft,
            y: t ? window.pageYOffset : e ? document.documentElement.scrollTop : document.body.scrollTop
        }
    }

    function c(t, e) {
        return 100 / (e - t)
    }

    function u(t, e) {
        return 100 * e / (t[1] - t[0])
    }

    function h(t, e) {
        for (var i = 1; t >= e[i];) i += 1;
        return i
    }

    function i(t, e, i) {
        if (i >= t.slice(-1)[0]) return 100;
        var n, o, r, a, s, l, d = h(i, t);
        return n = t[d - 1], o = t[d], r = e[d - 1], a = e[d], r + (l = i, u(s = [n, o], s[0] < 0 ? l + Math.abs(s[0]) : l - s[0]) / c(r, a))
    }

    function n(t, e, i, n) {
        if (100 === n) return n;
        var o, r, a, s, l = h(n, t);
        return i ? (o = t[l - 1], ((r = t[l]) - o) / 2 < n - o ? r : o) : e[l - 1] ? t[l - 1] + (a = n - t[l - 1], s = e[l - 1], Math.round(a / s) * s) : n
    }

    function a(t, e, i) {
        var n;
        if ("number" == typeof e && (e = [e]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider: 'range' contains invalid value.");
        if (!o(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !o(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
        i.xPct.push(n), i.xVal.push(e[0]), n ? i.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (i.xSteps[0] = e[1]), i.xHighestCompleteStep.push(0)
    }

    function s(t, e, i) {
        if (!e) return !0;
        i.xSteps[t] = u([i.xVal[t], i.xVal[t + 1]], e) / c(i.xPct[t], i.xPct[t + 1]);
        var n = (i.xVal[t + 1] - i.xVal[t]) / i.xNumSteps[t],
            o = Math.ceil(Number(n.toFixed(3)) - 1),
            r = i.xVal[t] + i.xNumSteps[t] * o;
        i.xHighestCompleteStep[t] = r
    }

    function r(t, e, i, n) {
        this.xPct = [], this.xVal = [], this.xSteps = [n || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e, this.direction = i;
        var o, r = [];
        for (o in t) t.hasOwnProperty(o) && r.push([t[o], o]);
        for (r.length && "object" == typeof r[0][0] ? r.sort(function(t, e) {
                return t[0][0] - e[0][0]
            }) : r.sort(function(t, e) {
                return t[0] - e[0]
            }), o = 0; o < r.length; o++) a(r[o][1], r[o][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), o = 0; o < this.xNumSteps.length; o++) s(o, this.xNumSteps[o], this)
    }

    function l(t, e) {
        if (!o(e)) throw new Error("noUiSlider: 'step' is not numeric.");
        t.singleStep = e
    }

    function d(t, e) {
        if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new r(e, t.snap, t.dir, t.singleStep)
    }

    function p(t, e) {
        if (e = V(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider: 'start' option is incorrect.");
        t.handles = e.length, t.start = e
    }

    function f(t, e) {
        if ("boolean" != typeof(t.snap = e)) throw new Error("noUiSlider: 'snap' option must be a boolean.")
    }

    function g(t, e) {
        if ("boolean" != typeof(t.animate = e)) throw new Error("noUiSlider: 'animate' option must be a boolean.")
    }

    function m(t, e) {
        if ("number" != typeof(t.animationDuration = e)) throw new Error("noUiSlider: 'animationDuration' option must be a number.")
    }

    function v(t, e) {
        var i, n = [!1];
        if (!0 === e || !1 === e) {
            for (i = 1; i < t.handles; i++) n.push(e);
            n.push(!1)
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
            n = e
        }
        t.connect = n
    }

    function y(t, e) {
        switch (e) {
            case "horizontal":
                t.ort = 0;
                break;
            case "vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider: 'orientation' option is invalid.")
        }
    }

    function b(t, e) {
        if (!o(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
        if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")
    }

    function x(t, e) {
        if (!o(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getMargin(e), !t.limit || t.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")
    }

    function k(t, e) {
        switch (e) {
            case "ltr":
                t.dir = 0;
                break;
            case "rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider: 'direction' option was not recognized.")
        }
    }

    function w(t, e) {
        if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        var i = 0 <= e.indexOf("tap"),
            n = 0 <= e.indexOf("drag"),
            o = 0 <= e.indexOf("fixed"),
            r = 0 <= e.indexOf("snap"),
            a = 0 <= e.indexOf("hover");
        if (o) {
            if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            b(t, t.start[1] - t.start[0])
        }
        t.events = {
            tap: i || r,
            drag: n,
            fixed: o,
            snap: r,
            hover: a
        }
    }

    function S(t, e) {
        if (!1 !== e)
            if (!0 === e) {
                t.tooltips = [];
                for (var i = 0; i < t.handles; i++) t.tooltips.push(!0)
            } else {
                if (t.tooltips = V(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                t.tooltips.forEach(function(t) {
                    if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")
                })
            }
    }

    function C(t, e) {
        if ("function" == typeof(t.format = e).to && "function" == typeof e.from) return !0;
        throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
    }

    function T(t, e) {
        if (void 0 !== e && "string" != typeof e && !1 !== e) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e
    }

    function I(t, e) {
        if (void 0 !== e && "object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix)
            for (var i in t.cssClasses = {}, e) e.hasOwnProperty(i) && (t.cssClasses[i] = t.cssPrefix + e[i]);
        else t.cssClasses = e
    }

    function _(t, e) {
        if (!0 !== e && !1 !== e) throw new Error("noUiSlider: 'useRequestAnimationFrame' option should be true (default) or false.");
        t.useRequestAnimationFrame = e
    }

    function Y(e) {
        var i, n = {
                margin: 0,
                limit: 0,
                animate: !0,
                animationDuration: 300,
                format: P
            },
            o = {
                connect: !(i = {
                    step: {
                        r: !1,
                        t: l
                    },
                    start: {
                        r: !0,
                        t: p
                    },
                    connect: {
                        r: !0,
                        t: v
                    },
                    direction: {
                        r: !0,
                        t: k
                    },
                    snap: {
                        r: !1,
                        t: f
                    },
                    animate: {
                        r: !1,
                        t: g
                    },
                    animationDuration: {
                        r: !1,
                        t: m
                    },
                    range: {
                        r: !0,
                        t: d
                    },
                    orientation: {
                        r: !1,
                        t: y
                    },
                    margin: {
                        r: !1,
                        t: b
                    },
                    limit: {
                        r: !1,
                        t: x
                    },
                    behaviour: {
                        r: !0,
                        t: w
                    },
                    format: {
                        r: !1,
                        t: C
                    },
                    tooltips: {
                        r: !1,
                        t: S
                    },
                    cssPrefix: {
                        r: !1,
                        t: T
                    },
                    cssClasses: {
                        r: !1,
                        t: I
                    },
                    useRequestAnimationFrame: {
                        r: !1,
                        t: _
                    }
                }),
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                },
                useRequestAnimationFrame: !0
            };
        Object.keys(i).forEach(function(t) {
            if (void 0 === e[t] && void 0 === o[t]) {
                if (i[t].r) throw new Error("noUiSlider: '" + t + "' is required.");
                return !0
            }
            i[t].t(n, void 0 === e[t] ? o[t] : e[t])
        }), n.pips = e.pips;
        var t = [
            ["left", "top"],
            ["right", "bottom"]
        ];
        return n.style = t[n.dir][n.ort], n.styleOposite = t[n.dir ? 0 : 1][n.ort], n
    }

    function M(t, h, r) {
        function a(t, e) {
            return !!e && j(t, h.cssClasses.connect)
        }

        function e(t, e) {
            return !!h.tooltips[e] && j(t.firstChild, h.cssClasses.tooltip)
        }

        function d(n, o, r) {
            function a(t, e, i) {
                return 'class="' + (n = i[1], r = (o = e) === h.cssClasses.value, a = r ? l : d, o + " " + (r ? c : u)[h.ort] + " " + a[n]) + '" style="' + h.style + ": " + t + '%"';
                var n, o, r, a
            }
            var t = document.createElement("div"),
                s = "",
                l = [h.cssClasses.valueNormal, h.cssClasses.valueLarge, h.cssClasses.valueSub],
                d = [h.cssClasses.markerNormal, h.cssClasses.markerLarge, h.cssClasses.markerSub],
                c = [h.cssClasses.valueHorizontal, h.cssClasses.valueVertical],
                u = [h.cssClasses.markerHorizontal, h.cssClasses.markerVertical];
            return $(t, h.cssClasses.pips), $(t, 0 === h.ort ? h.cssClasses.pipsHorizontal : h.cssClasses.pipsVertical), Object.keys(n).forEach(function(t) {
                var e, i;
                (i = n[e = t])[1] = i[1] && o ? o(i[0], i[1]) : i[1], s += "<div " + a(e, h.cssClasses.marker, i) + "></div>", i[1] && (s += "<div " + a(e, h.cssClasses.value, i) + ">" + r.to(i[0]) + "</div>")
            }), t.innerHTML = s, t
        }

        function i(t) {
            var p, f, g, m, e, i, v, y, b, n = t.mode,
                o = t.density || 1,
                r = t.filter || !1,
                a = function(t, e, i) {
                    if ("range" === t || "steps" === t) return B.xVal;
                    if ("count" === t) {
                        var n, o = 100 / (e - 1),
                            r = 0;
                        for (e = [];
                            (n = r++ * o) <= 100;) e.push(n);
                        t = "positions"
                    }
                    return "positions" === t ? e.map(function(t) {
                        return B.fromStepping(i ? B.getStep(t) : t)
                    }) : "values" === t ? i ? e.map(function(t) {
                        return B.fromStepping(B.getStep(B.toStepping(t)))
                    }) : e : void 0
                }(n, t.values || !1, t.stepped || !1),
                s = (p = o, f = n, g = a, m = {}, e = B.xVal[0], i = B.xVal[B.xVal.length - 1], y = v = !1, b = 0, (g = g.slice().sort(function(t, e) {
                    return t - e
                }).filter(function(t) {
                    return !this[t] && (this[t] = !0)
                }, {}))[0] !== e && (g.unshift(e), v = !0), g[g.length - 1] !== i && (g.push(i), y = !0), g.forEach(function(t, e) {
                    var i, n, o, r, a, s, l, d, c, u = t,
                        h = g[e + 1];
                    if ("steps" === f && (i = B.xNumSteps[e]), i || (i = h - u), !1 !== u && void 0 !== h)
                        for (i = Math.max(i, 1e-7), n = u; n <= h; n = (n + i).toFixed(7) / 1) {
                            for (l = (a = (r = B.toStepping(n)) - b) / p, c = a / (d = Math.round(l)), o = 1; o <= d; o += 1) m[(b + o * c).toFixed(5)] = ["x", 0];
                            s = -1 < g.indexOf(n) ? 1 : "steps" === f ? 2 : 0, !e && v && (s = 0), n === h && y || (m[r.toFixed(5)] = [n, s]), b = r
                        }
                }), m),
                l = t.format || {
                    to: Math.round
                };
            return z.appendChild(d(s, r, l))
        }

        function s() {
            var t = _.getBoundingClientRect(),
                e = "offset" + ["Width", "Height"][h.ort];
            return 0 === h.ort ? t.width || _[e] : t.height || _[e]
        }

        function l(n, e, o, r) {
            var i = function(t) {
                    return !z.hasAttribute("disabled") && (e = z, i = h.cssClasses.tap, !(e.classList ? e.classList.contains(i) : new RegExp("\\b" + i + "\\b").test(e.className)) && (t = function(t, e) {
                        t.preventDefault();
                        var i, n, o = 0 === t.type.indexOf("touch"),
                            r = 0 === t.type.indexOf("mouse"),
                            a = 0 === t.type.indexOf("pointer"),
                            s = t;
                        if (0 === t.type.indexOf("MSPointer") && (a = !0), o) {
                            if (1 < s.touches.length) return !1;
                            i = t.changedTouches[0].pageX, n = t.changedTouches[0].pageY
                        }
                        return e = e || U(), (r || a) && (i = t.clientX + e.x, n = t.clientY + e.y), s.pageOffset = e, s.points = [i, n], s.cursor = r || a, s
                    }(t, r.pageOffset), !(n === L.start && void 0 !== t.buttons && 1 < t.buttons) && (!r.hover || !t.buttons) && (t.calcPoint = t.points[h.ort], void o(t, r))));
                    var e, i
                },
                a = [];
            return n.split(" ").forEach(function(t) {
                e.addEventListener(t, i, !1), a.push([t, i])
            }), a
        }

        function c(t) {
            var e, i, n, o, r, a = 100 * (t - (e = _, i = h.ort, n = e.getBoundingClientRect(), o = e.ownerDocument.documentElement, r = U(), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (r.x = 0), i ? n.top + r.y - o.clientTop : n.left + r.x - o.clientLeft)) / s();
            return h.dir ? 100 - a : a
        }

        function n(t, n, i, e) {
            var o = i.slice(),
                r = [!t, t],
                a = [t, !t];
            e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach(function(t, e) {
                var i = y(o, t, o[t] + n, r[e], a[e]);
                !1 === i ? n = 0 : (n = i - o[t], o[t] = i)
            }) : r = a = [!0];
            var s = !1;
            e.forEach(function(t, e) {
                s = k(t, i[t] + n, r[e], a[e]) || s
            }), s && e.forEach(function(t) {
                u("update", t), u("slide", t)
            })
        }

        function u(i, n, o) {
            Object.keys(N).forEach(function(t) {
                var e = t.split(".")[0];
                i === e && N[t].forEach(function(t) {
                    t.call(A, W.map(h.format.to), n, W.slice(), o || !1, F.slice())
                })
            })
        }

        function p(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && g(t, e)
        }

        function f(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return g(t, e);
            var i = (h.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            n(0 < i, 100 * i / e.baseSize, e.locations, e.handleNumbers)
        }

        function g(t, e) {
            var i = _.querySelector("." + h.cssClasses.active);
            null !== i && q(i, h.cssClasses.active), t.cursor && (document.body.style.cursor = "", document.body.removeEventListener("selectstart", document.body.noUiListener)), document.documentElement.noUiListeners.forEach(function(t) {
                document.documentElement.removeEventListener(t[0], t[1])
            }), q(z, h.cssClasses.drag), x(), e.handleNumbers.forEach(function(t) {
                u("set", t), u("change", t), u("end", t)
            })
        }

        function m(t, e) {
            if (1 === e.handleNumbers.length) {
                var i = M[e.handleNumbers[0]];
                if (i.hasAttribute("disabled")) return !1;
                $(i.children[0], h.cssClasses.active)
            }
            t.preventDefault(), t.stopPropagation();
            var n = l(L.move, document.documentElement, f, {
                    startCalcPoint: t.calcPoint,
                    baseSize: s(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: F.slice()
                }),
                o = l(L.end, document.documentElement, g, {
                    handleNumbers: e.handleNumbers
                }),
                r = l("mouseout", document.documentElement, p, {
                    handleNumbers: e.handleNumbers
                });
            if (document.documentElement.noUiListeners = n.concat(o, r), t.cursor) {
                document.body.style.cursor = getComputedStyle(t.target).cursor, 1 < M.length && $(z, h.cssClasses.drag);
                var a = function() {
                    return !1
                };
                document.body.noUiListener = a, document.body.addEventListener("selectstart", a, !1)
            }
            e.handleNumbers.forEach(function(t) {
                u("start", t)
            })
        }

        function o(t) {
            t.stopPropagation();
            var n, o, r, e = c(t.calcPoint),
                i = (n = e, r = !(o = 100), M.forEach(function(t, e) {
                    if (!t.hasAttribute("disabled")) {
                        var i = Math.abs(F[e] - n);
                        i < o && (r = e, o = i)
                    }
                }), r);
            return !1 !== i && (h.events.snap || H(z, h.cssClasses.tap, h.animationDuration), k(i, e, !0, !0), x(), u("slide", i, !0), u("set", i, !0), u("change", i, !0), u("update", i, !0), void(h.events.snap && m(t, {
                handleNumbers: [i]
            })))
        }

        function v(t) {
            var e = c(t.calcPoint),
                i = B.getStep(e),
                n = B.fromStepping(i);
            Object.keys(N).forEach(function(t) {
                "hover" === t.split(".")[0] && N[t].forEach(function(t) {
                    t.call(A, n)
                })
            })
        }

        function y(t, e, i, n, o) {
            return 1 < M.length && (n && 0 < e && (i = Math.max(i, t[e - 1] + h.margin)), o && e < M.length - 1 && (i = Math.min(i, t[e + 1] - h.margin))), 1 < M.length && h.limit && (n && 0 < e && (i = Math.min(i, t[e - 1] + h.limit)), o && e < M.length - 1 && (i = Math.max(i, t[e + 1] - h.limit))), i = B.getStep(i), r = i, (i = Math.max(Math.min(r, 100), 0)) !== t[e] && i;
            var r
        }

        function b(t) {
            return t + "%"
        }

        function x() {
            R.forEach(function(t) {
                var e = 50 < F[t] ? -1 : 1,
                    i = 3 + (M.length + e * t);
                M[t].childNodes[0].style.zIndex = i
            })
        }

        function k(t, e, i, n) {
            return !1 !== (e = y(F, t, e, i, n)) && (function(t, e) {
                F[t] = e, W[t] = B.fromStepping(e);
                var i = function() {
                    M[t].style[h.style] = b(e), w(t), w(t + 1)
                };
                window.requestAnimationFrame && h.useRequestAnimationFrame ? window.requestAnimationFrame(i) : i()
            }(t, e), !0)
        }

        function w(t) {
            if (P[t]) {
                var e = 0,
                    i = 100;
                0 !== t && (e = F[t - 1]), t !== P.length - 1 && (i = F[t]), P[t].style[h.style] = b(e), P[t].style[h.styleOposite] = b(100 - i)
            }
        }

        function S(t, e) {
            null !== t && !1 !== t && ("number" == typeof t && (t = String(t)), !1 === (t = h.format.from(t)) || isNaN(t) || k(e, B.toStepping(t), !1, !1))
        }

        function C(t, e) {
            var i = V(t),
                n = void 0 === F[0];
            e = void 0 === e || !!e, i.forEach(S), h.animate && !n && H(z, h.cssClasses.tap, h.animationDuration), R.forEach(function(t) {
                k(t, F[t], !0, !1)
            }), x(), R.forEach(function(t) {
                u("update", t), null !== i[t] && e && u("set", t)
            })
        }

        function T() {
            var t = W.map(h.format.to);
            return 1 === t.length ? t[0] : t
        }

        function I(t, e) {
            N[t] = N[t] || [], N[t].push(e), "update" === t.split(".")[0] && M.forEach(function(t, e) {
                u("update", e)
            })
        }
        var _, M, P, A, D, E, O, L = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            },
            z = t,
            F = [],
            R = [],
            B = h.spectrum,
            W = [],
            N = {};
        if (z.noUiSlider) throw new Error("Slider was already initialized.");
        return $(O = z, h.cssClasses.target), 0 === h.dir ? $(O, h.cssClasses.ltr) : $(O, h.cssClasses.rtl), 0 === h.ort ? $(O, h.cssClasses.horizontal) : $(O, h.cssClasses.vertical), _ = j(O, h.cssClasses.base),
            function(t, e) {
                M = [], (P = []).push(a(e, t[0]));
                for (var i = 0; i < h.handles; i++) M.push((n = i, j(o = j(e, h.cssClasses.origin), h.cssClasses.handle).setAttribute("data-handle", n), o)), R[i] = i, P.push(a(e, t[i + 1]));
                var n, o
            }(h.connect, _), A = {
                destroy: function() {
                    for (var t in h.cssClasses) h.cssClasses.hasOwnProperty(t) && q(z, h.cssClasses[t]);
                    for (; z.firstChild;) z.removeChild(z.firstChild);
                    delete z.noUiSlider
                },
                steps: function() {
                    return F.map(function(t, e) {
                        var i = B.getNearbySteps(t),
                            n = W[e],
                            o = i.thisStep.step,
                            r = null;
                        !1 !== o && n + o > i.stepAfter.startValue && (o = i.stepAfter.startValue - n), r = n > i.thisStep.startValue ? i.thisStep.step : !1 !== i.stepBefore.step && n - i.stepBefore.highestStep, 100 === t ? o = null : 0 === t && (r = null);
                        var a = B.countStepDecimals();
                        return null !== o && !1 !== o && (o = Number(o.toFixed(a))), null !== r && !1 !== r && (r = Number(r.toFixed(a))), [r, o]
                    })
                },
                on: I,
                off: function(t) {
                    var n = t && t.split(".")[0],
                        o = n && t.substring(n.length);
                    Object.keys(N).forEach(function(t) {
                        var e = t.split(".")[0],
                            i = t.substring(e.length);
                        n && n !== e || o && o !== i || delete N[t]
                    })
                },
                get: T,
                set: C,
                reset: function(t) {
                    C(h.start, t)
                },
                __moveHandles: function(t, e, i) {
                    n(t, e, F, i)
                },
                options: r,
                updateOptions: function(e, t) {
                    var i = T(),
                        n = ["margin", "limit", "range", "animate", "snap", "step", "format"];
                    n.forEach(function(t) {
                        void 0 !== e[t] && (r[t] = e[t])
                    });
                    var o = Y(r);
                    n.forEach(function(t) {
                        void 0 !== e[t] && (h[t] = o[t])
                    }), o.spectrum.direction = B.direction, B = o.spectrum, h.margin = o.margin, h.limit = o.limit, F = [], C(e.start || i, t)
                },
                target: z,
                pips: i
            }, (E = h.events).fixed || M.forEach(function(t, e) {
                l(L.start, t.children[0], m, {
                    handleNumbers: [e]
                })
            }), E.tap && l(L.start, _, o, {}), E.hover && l(L.move, _, v, {
                hover: !0
            }), E.drag && P.forEach(function(t, e) {
                if (!1 !== t && 0 !== e && e !== P.length - 1) {
                    var i = M[e - 1],
                        n = M[e],
                        o = [t];
                    $(t, h.cssClasses.draggable), E.fixed && (o.push(i.children[0]), o.push(n.children[0])), o.forEach(function(t) {
                        l(L.start, t, m, {
                            handles: [i, n],
                            handleNumbers: [e - 1, e]
                        })
                    })
                }
            }), C(h.start), h.pips && i(h.pips), h.tooltips && (D = M.map(e), I("update", function(t, e, i) {
                if (D[e]) {
                    var n = t[e];
                    !0 !== h.tooltips[e] && (n = h.tooltips[e].to(i[e])), D[e].innerHTML = n
                }
            })), A
    }
    r.prototype.getMargin = function(t) {
        var e = this.xNumSteps[0];
        if (e && t % e) throw new Error("noUiSlider: 'limit' and 'margin' must be divisible by step.");
        return 2 === this.xPct.length && u(this.xVal, t)
    }, r.prototype.toStepping = function(t) {
        return i(this.xVal, this.xPct, t)
    }, r.prototype.fromStepping = function(t) {
        return function(t, e, i) {
            if (100 <= i) return t.slice(-1)[0];
            var n, o, r, a, s, l = h(i, e);
            return n = t[l - 1], o = t[l], r = e[l - 1], a = e[l], s = [n, o], (i - r) * c(r, a) * (s[1] - s[0]) / 100 + s[0]
        }(this.xVal, this.xPct, t)
    }, r.prototype.getStep = function(t) {
        return n(this.xPct, this.xSteps, this.snap, t)
    }, r.prototype.getNearbySteps = function(t) {
        var e = h(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: {
                startValue: this.xVal[e - 0],
                step: this.xNumSteps[e - 0],
                highestStep: this.xHighestCompleteStep[e - 0]
            }
        }
    }, r.prototype.countStepDecimals = function() {
        var t = this.xNumSteps.map(e);
        return Math.max.apply(null, t)
    }, r.prototype.convert = function(t) {
        return this.getStep(this.toStepping(t))
    };
    var P = {
        to: function(t) {
            return void 0 !== t && t.toFixed(2)
        },
        from: Number
    };
    return {
        create: function(t, e) {
            if (!t.nodeName) throw new Error("noUiSlider.create requires a single element.");
            var i = M(t, Y(e), e);
            return t.noUiSlider = i
        }
    }
}),
function() {
    var t, e, i;
    t = function() {
        function n(t, e) {
            var i, n;
            if (this.options = {
                    target: "instafeed",
                    get: "popular",
                    resolution: "thumbnail",
                    sortBy: "none",
                    links: !0,
                    mock: !1,
                    useHttp: !1
                }, "object" == typeof t)
                for (i in t) n = t[i], this.options[i] = n;
            this.context = null != e ? e : this, this.unique = this._genKey()
        }
        return n.prototype.hasNext = function() {
            return "string" == typeof this.context.nextUrl && 0 < this.context.nextUrl.length
        }, n.prototype.next = function() {
            return !!this.hasNext() && this.run(this.context.nextUrl)
        }, n.prototype.run = function(t) {
            var e, i;
            if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
            if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
            return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && ((i = document.createElement("script")).id = "instafeed-fetcher", i.src = t || this._buildUrl(), document.getElementsByTagName("head")[0].appendChild(i), e = "instafeedCache" + this.unique, window[e] = new n(this.options, this), window[e].unique = this.unique), !0
        }, n.prototype.parse = function(t) {
            var e, i, n, o, r, a, s, l, d, c, u, h, p, f, g, m, v, y, b, x, k, w, S, C, T, I, _, M;
            if ("object" != typeof t) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                throw new Error("Invalid JSON response")
            }
            if (200 !== t.meta.code) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, t.meta.error_message), !1;
                throw new Error("Error from Instagram: " + t.meta.error_message)
            }
            if (0 === t.data.length) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                throw new Error("No images were returned from Instagram")
            }
            if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, t), this.context.nextUrl = "", null != t.pagination && (this.context.nextUrl = t.pagination.next_url), "none" !== this.options.sortBy) switch (T = "least" === (I = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"))[0], I[1]) {
                case "random":
                    t.data.sort(function() {
                        return .5 - Math.random()
                    });
                    break;
                case "recent":
                    t.data = this._sortBy(t.data, "created_time", T);
                    break;
                case "liked":
                    t.data = this._sortBy(t.data, "likes.count", T);
                    break;
                case "commented":
                    t.data = this._sortBy(t.data, "comments.count", T);
                    break;
                default:
                    throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
            }
            if ("undefined" != typeof document && null !== document && !1 === this.options.mock) {
                if (h = t.data, C = parseInt(this.options.limit, 10), null != this.options.limit && h.length > C && (h = h.slice(0, C)), a = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (h = this._filter(h, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                    for (s = "", M = document.createElement("div"), l = 0, x = h.length; l < x; l++) {
                        if ("object" != typeof(c = (d = h[l]).images[this.options.resolution])) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                        m = c.width, g = "square", (f = c.height) < m && (g = "landscape"), m < f && (g = "portrait"), u = c.url, 0 <= window.location.protocol.indexOf("http") && !this.options.useHttp && (u = u.replace(/https?:\/\//, "//")), s += this._makeTemplate(this.options.template, {
                            model: d,
                            id: d.id,
                            link: d.link,
                            type: d.type,
                            image: u,
                            width: m,
                            height: f,
                            orientation: g,
                            caption: this._getObjectProperty(d, "caption.text"),
                            likes: d.likes.count,
                            comments: d.comments.count,
                            location: this._getObjectProperty(d, "location.name")
                        })
                    }
                    for (M.innerHTML = s, o = [], n = 0, i = M.childNodes.length; n < i;) o.push(M.childNodes[n]), n += 1;
                    for (y = 0, k = o.length; y < k; y++) S = o[y], a.appendChild(S)
                } else
                    for (b = 0, w = h.length; b < w; b++) {
                        if (d = h[b], p = document.createElement("img"), "object" != typeof(c = d.images[this.options.resolution])) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                        u = c.url, 0 <= window.location.protocol.indexOf("http") && !this.options.useHttp && (u = u.replace(/https?:\/\//, "//")), p.src = u, !0 === this.options.links ? ((e = document.createElement("a")).href = d.link, e.appendChild(p), a.appendChild(e)) : a.appendChild(p)
                    }
                if ("string" == typeof(_ = this.options.target) && (_ = document.getElementById(_)), null == _) throw r = 'No element with id="' + this.options.target + '" on page.', new Error(r);
                _.appendChild(a), document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")), v = "instafeedCache" + this.unique, window[v] = void 0;
                try {
                    delete window[v]
                } catch (t) {
                    t
                }
            }
            return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
        }, n.prototype._buildUrl = function() {
            var t, e;
            switch ("https://api.instagram.com/v1", this.options.get) {
                case "popular":
                    t = "media/popular";
                    break;
                case "tagged":
                    if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                    t = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case "location":
                    if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                    t = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case "user":
                    if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                    t = "users/" + this.options.userId + "/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return e = "https://api.instagram.com/v1/" + t, null != this.options.accessToken ? e += "?access_token=" + this.options.accessToken : e += "?client_id=" + this.options.clientId, null != this.options.limit && (e += "&count=" + this.options.limit), e += "&callback=instafeedCache" + this.unique + ".parse"
        }, n.prototype._genKey = function() {
            var t;
            return "" + (t = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            })() + t() + t() + t()
        }, n.prototype._makeTemplate = function(t, e) {
            var i, n, o, r, a;
            for (n = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, i = t; n.test(i);) r = i.match(n)[1], a = null != (o = this._getObjectProperty(e, r)) ? o : "", i = i.replace(n, function() {
                return "" + a
            });
            return i
        }, n.prototype._getObjectProperty = function(t, e) {
            var i, n;
            for (n = (e = e.replace(/\[(\w+)\]/g, ".$1")).split("."); n.length;) {
                if (i = n.shift(), !(null != t && i in t)) return null;
                t = t[i]
            }
            return t
        }, n.prototype._sortBy = function(t, o, r) {
            var e;
            return e = function(t, e) {
                var i, n;
                return i = this._getObjectProperty(t, o), n = this._getObjectProperty(e, o), r ? n < i ? 1 : -1 : i < n ? 1 : -1
            }, t.sort(e.bind(this)), t
        }, n.prototype._filter = function(t, e) {
            var i, n, o, r;
            for (i = [], n = function(t) {
                    if (e(t)) return i.push(t)
                }, o = 0, r = t.length; o < r; o++) n(t[o]);
            return i
        }, n
    }(), e = this, i = function() {
        return t
    }, "function" == typeof define && define.amd ? define([], i) : "object" == typeof module && module.exports ? module.exports = i() : e.Instafeed = i()
}.call(this),
    function(o) {
        o.fn.SocialCounter = function(t) {
            var i = o.extend({
                facebook_user: "",
                facebook_token: "",
                instagram_user: "",
                instagram_user_sandbox: "",
                instagram_token: "",
                google_plus_id: "",
                google_plus_key: ""
            }, t);

            function n(t) {
                return 999 < t ? (t / 1e3).toFixed(1) + "k" : t
            }
            o.fn.digits = function() {
                return this.each(function() {
                    o(this).text(o(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                })
            }, "" != i.facebook_user && "" != i.facebook_token && o.ajax({
                url: "https://graph.facebook.com/v2.8/" + i.facebook_user,
                dataType: "json",
                type: "GET",
                data: {
                    access_token: i.facebook_token,
                    fields: "fan_count"
                },
                success: function(t) {
                    var e = n(parseInt(t.fan_count));
                    o(".btn-social-counter--fb .btn-social-counter__count-num").append(e), o(".btn-social-counter--fb").attr("href", "https://facebook.com/" + i.facebook_user)
                }
            }), "" != i.instagram_user && "" != i.instagram_token && o.ajax({
                url: "https://api.instagram.com/v1/users/self/",
                dataType: "jsonp",
                type: "GET",
                data: {
                    access_token: i.instagram_token
                },
                success: function(t) {
                    var e = n(parseInt(t.data.counts.followed_by));
                    o(".btn-social-counter--instagram .btn-social-counter__count-num").append(e), o(".btn-social-counter--instagram").attr("href", "https://instagram.com/" + i.instagram_user)
                }
            }), "" != i.twitter_user && o.ajax({
                url: "php/twitter/index.php",
                dataType: "json",
                type: "GET",
                data: {
                    user: i.twitter_user
                },
                success: function(t) {
                    var e = parseInt(t.followers);
                    o(".btn-social-counter--twitter .btn-social-counter__count-num").append(e).digits(), o(".btn-social-counter--twitter").attr("href", "https://twitter.com/" + i.twitter_user)
                }
            }), "" != i.instagram_user_sandbox && "" != i.instagram_token && o.ajax({
                url: "https://api.instagram.com/v1/users/search?q=" + i.instagram_user_sandbox,
                dataType: "jsonp",
                type: "GET",
                data: {
                    access_token: i.instagram_token
                },
                success: function(t) {
                    o.each(t.data, function(t, e) {
                        i.instagram_user_sandbox == e.username && o.ajax({
                            url: "https://api.instagram.com/v1/users/" + e.id,
                            dataType: "jsonp",
                            type: "GET",
                            data: {
                                access_token: i.instagram_token
                            },
                            success: function(t) {
                                var e = n(parseInt(t.data.counts.followed_by));
                                o(".btn-social-counter--instagram .btn-social-counter__count-num").append(e), o(".btn-social-counter--instagram").attr("href", "https://instagram.com/" + i.instagram_user_sandbox)
                            }
                        })
                    })
                }
            }), "" != i.google_plus_id && "" != i.google_plus_key && o.ajax({
                url: "https://www.googleapis.com/plus/v1/people/" + i.google_plus_id,
                type: "GET",
                dataType: "json",
                data: {
                    key: i.google_plus_key
                },
                success: function(t) {
                    var e = n(parseInt(t.circledByCount));
                    o(".btn-social-counter--gplus .btn-social-counter__count-num").append(e), o(".btn-social-counter--gplus").attr("href", "https://plus.google.com/" + i.google_plus_id)
                }
            })
        }
    }(jQuery);
