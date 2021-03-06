/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2020 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.4", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.options.container ? a(this.options.container) : this.$element.parent(),
                    p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.4", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = a(document.body).height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
/**
 * File: awemenu.min.js
 * Version: 1.0
 * Author: MegaDrupal
 * Website: http://megadrupal.com/
 */
! function(e) {
    "use strict";
    var t = function(t, i) {
        this.default_opts = {
            trigger: "hover",
            style: "awemenu-default",
            position: "standard",
            hoverTime: 500,
            sticky: !0,
            enableAnimation: !0,
            desktopDurationDefault: 400,
            mobileTrigger: "click",
            mobileStyle: "awemenu-mobile-default",
            mobilePosition: "standard",
            mobileAnimationDuration: 500,
            responsiveWidth: 780,
            customMenuBar: '<span class="fa fa-bars"></span>',
            showArrow: !0,
            showMobileArrow: !0,
            arrows: {
                up: "fa fa-angle-up",
                down: "fa fa-angle-down",
                left: "fa fa-angle-left",
                right: "fa fa-angle-right",
                mobileClose: "fa fa-close"
            },
            initialize: function(e) {},
            ready: function(e) {},
            beforeActive: function(e, t) {},
            active: function(e, t) {},
            beforeDeactive: function(e, t) {},
            deactive: function(e, t) {},
            destroy: function(e) {}
        }, this.$el = t, i.arrows = e.extend({}, this.default_opts.arrows, i.arrows), this.options = e.extend({}, this.default_opts, i), this.validateOptions(), this.initialize()
    };
    t.prototype = {
        constructor: t,
        initialize: function() {
            this.isMobile = -1, this.stickyActivated = !1, this.initializedTrigger = !1, this.menuTop = e("ul.awemenu", this.$el).offset().top, this.classes = [], this.itemsReady = 0, this.createStickyReplacerID(), this.initMenu(), this.initTrigger()
        },
        initMenu: function() {
            var t = this,
                i = this.options;
            if (!e(".awemenu-bars", this.$el).length) {
                var s = e('<div class="awemenu-bars" />').html(i.customMenuBar);
                e(".awemenu", this.$el).before(s)
            }
            this.detectDevice(), e("i.awemenu-arrow", this.$el).hide(), this.$el.bind("windowResize", function(e, i) {
                t.onResize(i)
            }), e(window).resize(function(e) {
                t.$el.trigger("windowResize", e)
            }), e(window).trigger("resize"), this.$el.bind("windowScroll", function(e, i) {
                t.onScroll(i)
            }), e(window).scroll(function(e, i) {
                i ? t.$el.trigger("windowScroll", i) : t.$el.trigger("windowScroll", e)
            }), this.$el.bind("documentClick", function(e, i) {
                t.onDocumentClick(i)
            }), e(document).click(function(e) {
                t.$el.trigger("documentClick", e)
            }), this.isTouchDevice && this.initDocumentTouch(), e(".awemenu-bars", this.$el).click(function(e) {
                e.preventDefault(), t.isReady && t.onMenuBarClick()
            }), this.options.initialize(this)
        },
        setOption: function(t) {
            "object" == e.type(t) && (this.options = e.extend({}, this.options, this.validateOptions(t)), this.destroy(), this.initialize(), this.$el.data("awe-menu", this))
        },
        getObjectProperties: function(t) {
            var i = [];
            return t && "object" == e.type(t) && e.each(t, function(e, t) {
                i.push(e)
            }), i
        },
        validateOptions: function(t) {
            var i = this,
                s = this.getObjectProperties(this.default_opts);
            return t && "object" === e.type(t) || (t = this.options), e.each(t, function(a, n) {
                if (-1 === !e.inArray(a, s)) delete t[a];
                else switch (a) {
                    case "trigger":
                        -1 === e.inArray(n, ["click", "hover", "toggle"]) && (t[a] = "hover");
                        break;
                    case "mobileTrigger":
                        -1 === e.inArray(n, ["click", "toggle"]) && (t[a] = "click");
                        break;
                    case "position":
                    case "mobilePosition":
                        e.inArray(n), -1 === ["standard", "top", "left", "bottom", "right", "outleft", "outright"] && (t[a] = "standard");
                        break;
                    case "hoverTime":
                    case "desktopDurationDefault":
                    case "mobileAnimationDuration":
                    case "responsiveWidth":
                        n = parseInt(n), t[a] = n, isNaN(n) && (t[a] = i.default_opts[a]);
                        break;
                    case "initialize":
                    case "ready":
                    case "beforeActive":
                    case "active":
                    case "beforeDeactive":
                    case "deactive":
                    case "destroy":
                        "function" == e.type(n) && (t[a] = i.default_opts[a]);
                        break;
                    case "mobileStyle":
                    case "style":
                        "" == n && (t[a] = i.default_opts[a])
                }
            }), t && "object" === e.type(t) || (this.options = t), t
        },
        getOption: function(e) {
            return e ? this.options[e] : this.options
        },
        destroy: function() {
            this.itemsReady = 0, this.isMobile = -1, this.stickyActivated = !1, this.initializedTrigger = !1, this.$el.data("awe-menu", !1), e("#" + this.stickyReplacerID).remove(), this.$el.removeClass(this.classes.join(" ")), this.classes = [], e(".awemenu-item", this.$el).unbind("mouseenter").unbind("mouseleave"), e(".awemenu-item > a", this.$el).unbind("click"), e(".awemenu-item > a > .awemenu-arrow", this.$el).unbind("click"), e(".awemenu-submenu", this.$el).each(function() {
                var t = e(this),
                    i = t.data("animation");
                i && t.parent().removeClass("awemenu-" + i), t.removeAttr("style")
            }), this.$el.unbind("windowResize").unbind("documentClick").unbind("windowScroll").unbind("aweMenuReady").undelegate(".awemenu-arrow", "click"), e(".awemenu-bars", this.$el).unbind("click").remove(), this.options.destroy(this)
        },
        detectDevice: function() {
            var t = e(window).width(),
                i = this.options;
            e('<div class="awemenu-bars"><span class="fa fa-bars"></span></div>');
            this.isTouchDevice = navigator.userAgent.match(/Androi|WebOS|iPod|iPad|Blackberry|Windows Phone/i) ? !0 : !1, this.isTouchDevice && "hover" == this.options.trigger && (this.options.trigger = "click"), t < this.options.responsiveWidth ? this.isMobile && -1 !== this.isMobile || (this.isMobile = !0, this.addMenuClasses(["awemenu-mobile", i.mobileStyle, "awemenu-mobile-" + i.mobilePosition]), this.removeMenuClasses([i.style, "awemenu-" + i.position])) : (this.isMobile || -1 === this.isMobile) && (this.isMobile = !1, this.removeMenuClasses(["awemenu-mobile", i.mobileStyle, "awemenu-mobile-" + i.mobilePosition]), this.addMenuClasses([i.style, "awemenu-" + i.position])), !this.isMobile && this.options.enableAnimation ? this.addMenuClasses("animation") : this.removeMenuClasses("animation")
        },
        resetMenu: function() {
            var t = this;
            e(".awemenu-item.awemenu-active", this.$el).each(function() {
                t.deactiveSubMenu(e(this))
            }), this.$el.hasClass("awemenu-active") && (this.isMobile || e.inArray(this.options.position, ["outleft", "outright"]) > -1) && t.onMenuBarClick()
        },
        onMenuBarClick: function() {
            var t = this,
                i = this.options;
            if (e("body").toggleClass("awemenu-mobile-active"), -1 === e.inArray(i.mobilePosition, ["outleft", "outright"]) && -1 === e.inArray(i.position, ["outleft", "outright"])) {
                var s = e("ul.awemenu", t.$el);
                t.$el.hasClass("awemenu-active") ? s.slideUp(i.mobileAnimationDuration, function() {
                    t.$el.removeClass("awemenu-active")
                }) : s.slideDown(i.mobileAnimationDuration, function() {
                    t.$el.addClass("awemenu-active")
                })
            } else t.$el.toggleClass("awemenu-active")
        },
        initTrigger: function() {
            var t = this;
            this.$el.bind("aweMenuReady", function() {
                "hover" === t.options.trigger && t.initTriggerHover(e(this)), t.initTriggerClick(e(this)), t.initializedTrigger = !0, t.options.ready(t)
            })
        },
        initTriggerHover: function() {
            var t = this;
            e("li.awemenu-item", this.$el).bind("mouseenter", function() {
                var i = e(this),
                    s = i.data("hide-submenu");
                !t.isMobile && t.isReady && (i.data("hover-out", !1), s && (clearTimeout(s), i.data("hide-submenu")), e("> a", i).length && setTimeout(function() {
                    i.data("hover-out") || t.activeSubMenu(i)
                }, t.options.hoverTime))
            }).bind("mouseleave", function() {
                var i = e(this);
                !t.isMobile && t.isReady && (i.data("hover-out", !0), t.deactiveSubMenu(i))
            })
        },
        initTriggerClick: function() {
            var t = this,
                i = this.options;
            e("li.awemenu-item > a", this.$el).click(function(s) {
                var a = e(this).parent();
                if (!t.isReady) return void s.preventDefault();
                if (t.isMobile || "hover" !== i.trigger) {
                    if (a.hasClass("awemenu-active")) {
                        if (t.deactiveSubMenu(a), !t.isMobile && "toggle" == i.trigger || t.isMobile && "toggle" == i.mobileTrigger) return void s.preventDefault()
                    } else if (e("> .awemenu-submenu", a).length) return s.preventDefault(), void t.activeSubMenu(a);
                    t.resetMenu()
                }
            }), e("i.awemenu-arrow", this.$el).click(function(i) {
                var s = e(this).parents("li.awemenu-item:first");
                t.isMobile && s.hasClass("awemenu-active") && (i.preventDefault(), i.stopPropagation(), t.deactiveSubMenu(s))
            })
        },
        initDocumentTouch: function() {
            var t = this,
                i = !1;
            e(document).bind("touchstart", function() {
                i = !0
            }), e(document).bind("touchmove", function() {
                i = !1
            }), e(document).bind("touchend", function(e) {
                i && t.onDocumentClick(e)
            })
        },
        initMenuItems: function() {
            var t = this,
                i = 0;
            this.isReady = !1, this.itemsReady = 0, this.totalItems = 0, this.stickyReplacer && (this.stickyReplacer.remove(), this.stickyReplacer = null), this.removeMenuClasses("animation"), e(".awemenu-submenu", this.$el).removeAttr("style").css({
                display: "block",
                opacity: 0,
                visibility: "hidden"
            }), e("ul.awemenu", this.$el).removeAttr("style"), e.inArray(this.options.position, ["outleft", "outright"]) > -1 && (e("ul.awemenu", this.$el).css({
                transition: "none",
                opacity: 0,
                visibility: "hidden"
            }), this.$el.addClass("awemenu-active")), e(".awemenu-item > a", this.$el).css("transition", "none"), e("ul.awemenu > li.awemenu-item", t.$el).each(function() {
                if (!e(this).parent().hasClass("awemenu-megamenu")) {
                    var i = e(this);
                    t.totalItems++, t.initMenuItem(i)
                }
            });
            var s = setInterval(function() {
                t.itemsReady >= i && (clearInterval(s), e(".awemenu-submenu", t.$el).css({
                    display: "",
                    opacity: "",
                    visibility: ""
                }), e.inArray(t.options.position, ["outleft", "outright"]) > -1 && (t.$el.removeClass("awemenu-active"), e("ul.awemenu", t.$el).css({
                    transition: "",
                    opacity: "",
                    visibility: ""
                })), e(".awemenu-item > a", this.$el).css("transition", ""), !t.isMobile && t.options.enableAnimation && setTimeout(function() {
                    t.addMenuClasses("animation")
                }, 50), t.initializedTrigger || t.$el.trigger("aweMenuReady"), t.isMobile && (e.inArray(t.options.mobilePosition, ["top", "bottom"]) > -1 || t.stickyActivated) && t.setMenuMaxHeight(), t.isReady = !0)
            }, 100)
        },
        initMenuItem: function(t) {
            t.data("right-item") && !e.inArray(this.options.position, ["left", "right", "outright", "outleft"]) > -1 && t.addClass("awemenu-item-right"), e("> .awemenu-submenu", t).length && t.addClass("awemenu-has-children"), this.initItemArrow(t), this.initSubMenu(t), this.options.enableAnimation && this.initSubmenuAnimation(t), this.itemsReady++
        },
        initItemArrow: function(t) {
            if ((!this.isMobile && this.options.showArrow || this.isMobile && this.options.showMobileArrow) && e("> .awemenu-submenu", t).length) {
                var i, s = this.options,
                    a = t.parents(".awemenu-item").length ? !1 : !0,
                    n = (e.inArray(s.position, ["left", "right", "outleft", "outright"]) > -1, e.inArray(s.position, ["right", "outright"]) > -1),
                    o = (e.inArray(s.position, ["left", "outleft"]) > -1, s.arrows.right);
                if (e("> a > .awemenu-arrow", t).length || e("> a", t).append('<i class="awemenu-arrow"></i>'), i = e("> a > .awemenu-arrow", t).removeClass().show(), this.isMobile) o = s.arrows.down;
                else if (n) o = s.arrows.left;
                else if (a) switch (s.position) {
                    case "standard":
                    case "top":
                        o = s.arrows.down;
                        break;
                    case "right":
                        o = s.arrows.left;
                        break;
                    case "bottom":
                        o = s.arrows.up
                }
                i.addClass("awemenu-arrow").addClass(o)
            } else e(".awemenu-arrow", t).hide()
        },
        initSubmenuAnimation: function(t) {
            if (!this.isMobile && e("> .awemenu-submenu", t).length) {
                var i = e("> .awemenu-submenu", t),
                    s = i.attr("data-animation"),
                    a = i.attr("data-duration");
                s && (t.addClass("awemenu-" + s), a || (a = this.options.desktopDurationDefault), isNaN(parseInt(a)) || (a = parseInt(a) + "ms", i.css("transition-duration", a)))
            }
        },
        initSubMenu: function(t) {
            if (t.removeClass("awemenu-invert awemenu-vertical-invert"), e("> .awemenu-submenu", t).length) {
                var i, s = this,
                    a = this.options,
                    n = e(window).width(),
                    o = e.inArray(a.position, ["left", "right", "outleft", "outright"]) > -1,
                    r = e.inArray(a.position, ["right", "outright"]) > -1,
                    u = e.inArray(a.position, ["left", "outleft"]) > -1,
                    l = o ? e("ul.awemenu", this.$el) : e(".awemenu-container", this.$el),
                    h = l.width(),
                    c = r ? n - (l.offset().left + h) : l.offset().left,
                    m = l.offset().top,
                    d = u ? n - c : l.offset().left + h,
                    w = t.parents(".awemenu-item:first"),
                    f = e("> .awemenu-submenu", t),
                    p = f.hasClass("awemenu-megamenu"),
                    v = f.width(),
                    b = f.data("width"),
                    g = 1 == f.parents(".awemenu-item").length ? !0 : !1;
                t.parents(".awemenu-item-right").length;
                if (!this.isMobile) {
                    switch (a.position) {
                        case "right":
                        case "outright":
                            i = t.offset().left - v;
                            break;
                        case "left":
                        case "outleft":
                            i = t.offset().left + t.width();
                            break;
                        default:
                            i = t.offset().left
                    }
                    switch (e.type(b)) {
                        case "string":
                            b = isNaN(parseInt(b)) ? v : b.indexOf("%") > -1 ? parseInt(b) < 100 ? Math.round(parseInt(b) * h / 100) : o ? v : h : parseInt(b);
                            break;
                        case "number":
                            break;
                        default:
                            b = v
                    }
                    if (g && !o) {
                        var y = f.attr("data-hoz-align") ? f.attr("data-hoz-align") : !1;
                        b >= h ? (b = h, f.css({
                            left: 0
                        })) : y !== !1 && e.inArray(y, ["left", "center", "right"]) > -1 ? ("center" === y ? (i = i + t.width() / 2 - b / 2, c > i ? i = c : i + b > d && (i = d - b)) : "right" === y && (i = i + t.width() - b, c > i && (i = c)), f.offset({
                            left: i
                        })) : i + b > d && f.offset({
                            left: d - b
                        }), b !== v && f.width(b)
                    } else {
                        var M, k = e("> a > .awemenu-arrow", t),
                            C = r && !w.hasClass("awemenu-invert") || w.hasClass("awemenu-invert") && !r,
                            $ = t.offset().left,
                            A = $ + t.width(),
                            i = C ? $ : A,
                            D = p && b === v && (o || !g),
                            T = f.attr("data-position");
                        if (k.removeClass(a.arrows.up + " " + a.arrows.down + " " + a.arrows.left + " " + a.arrows.right + " " + a.arrows.mobileClose), C) {
                            var R = p ? n - d : 0,
                                z = i - R,
                                I = p ? d - A : n - A,
                                S = !r && (i - b > R || T && "left" == T),
                                x = r && (R > i - b && I > z || T && "right" == T);
                            (S || x) && t.addClass("awemenu-invert")
                        } else {
                            var R = p ? n - c : n,
                                z = p ? i - t.width() - c : i - t.width(),
                                I = R - i,
                                S = !r && (i + b > R && z > I || T && "left" == T),
                                x = r && (T && "right" == T || R > i + b);
                            (S || x || w.hasClass("awemenu-item-right") && !u) && t.addClass("awemenu-invert")
                        }
                        t.hasClass("awemenu-invert") ? (M = r ? a.arrows.right : a.arrows.left, (p || !p && !T) && (r ? (b > I || D) && (b = I) : (b > z || D) && (b = z))) : (M = r ? a.arrows.left : a.arrows.right, (p || !p && !T) && (r ? (b > z || D) && (b = z) : (b > I || D) && (b = I))), k.addClass(M), b !== v && f.width(b);
                        var y = f.attr("data-vert-align") ? f.attr("data-vert-align") : !1;
                        if (y !== !1 && e.inArray(y, ["top", "midle", "bottom"]) > -1) {
                            var P, O = 0,
                                j = o || "bottom" == a.position ? 0 : m + l.height();
                            "midle" == y ? (O = t.height() / 2 - f.height() / 2, f.css({
                                top: O + "px",
                                bottom: "auto"
                            })) : "bottom" == y && (O = t.height() - f.height(), f.css({
                                top: O + "px",
                                bottom: "auto"
                            })), P = f.offset().top, j > P && (O += j - P, f.css({
                                top: O + "px",
                                bottom: "auto"
                            })), P = f.offset().top, "bottom" == a.position && P + f.height() >= m && (O -= P + f.height() - m, f.css({
                                top: O + "px",
                                bottom: "auto"
                            }))
                        }
                    }
                    if ("bottom" === a.position) {
                        var N = f.height(),
                            H = e(window).height();
                        (f.offset().top < 0 || w.hasClass("awemenu-vertical-invert")) && (t.addClass("awemenu-vertical-invert"), f.offset().top + N > m && (t.removeClass("awemenu-vertical-invert"), N > H && f.offset({
                            top: 0
                        }).css("max-height", H - l.height())))
                    }
                }
                p || e("> li.awemenu-item", f).each(function() {
                    if (!e(this).parent().hasClass("awemenu-megamenu")) {
                        var t = e(this);
                        s.totalItems++, s.initMenuItem(t)
                    }
                })
            }
        },
        onDocumentClick: function(t) {
            var i = this.$el.hasClass("awemenu-active") || e(".awemenu-active", this.$el).length,
                s = !this.isMobile && !e(t.target).closest(e("ul.awemenu", this.$el)).length && !e(t.target).closest(e(".awemenu-bars", this.$el)).length,
                a = this.isMobile && !e(t.target).closest(this.$el).length;
            i && (s || a) && this.resetMenu()
        },
        onResize: function(t) {
            var i = this,
                s = e(window).width();
            this.detectDevice(), s != this.ww && (this.ww = s, this.resetMenu(), this.resizeTimeout && clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                i.initMenuItems(), e(window).trigger("scroll", t), i.resizeTimeout = 0
            }, 300))
        },
        onScroll: function(t) {
            var i = this,
                s = this.options,
                a = e(window).scrollTop(),
                n = !1,
                o = "awemenu-sticky",
                r = (e(document).height() - window.outerHeight, s.sticky && e.inArray(s.position, ["outleft", "outright", "standard"]) > -1 && !this.isMobile),
                u = s.sticky && e.inArray(s.mobilePosition, ["outleft", "outright", "standard"]) > -1 && this.isMobile,
                l = a - this.$el.height() > this.menuTop;
            l && (r || u) ? this.stickyActivated && "resize" !== t.type || (this.stickyReplacer || (this.stickyReplacer = e('<div class="awemenu-scticky-replacer"></div>').height(this.$el.height()).attr("id", this.stickyReplacerID), this.$el.before(this.stickyReplacer)), i.addMenuClasses(o), this.stickyActivated = !0, n = !0, this.isMobile && -1 === e.inArray(this.options.mobilePosition, ["outleft", "outright"]) && this.setMenuMaxHeight()) : (this.stickyActivated || "resize" === t.isTrigger) && (e("#" + this.stickyReplacerID).remove(), this.stickyReplacer = null, this.removeMenuClasses(o), this.stickyActivated = !1, n = !0, this.setMenuMaxHeight(!0))
        },
        activeSubMenu: function(t) {
            var i = this,
                s = t.data("hide-submenu");
            if (s && (clearTimeout(s), t.data("hide-submenu", !1)), this.options.beforeActive(t, this), e("> .awemenu-submenu", t).css({
                    display: "block",
                    "z-index": ""
                }), e(".awemenu-item.awemenu-active", i.$el).data("parent-active", !1), t.parents(".awemenu-item").data("parent-active", !0), e(".awemenu-item.awemenu-active", i.$el).each(function() {
                    e(this).data("parent-active") || i.deactiveSubMenu(e(this))
                }), this.options.enableAnimation ? setTimeout(function() {
                    t.addClass("awemenu-active")
                }, 50) : t.addClass("awemenu-active"), this.isMobile) {
                var a = this.options.arrows;
                e("> .awemenu-submenu", t).css("display", "none"), e("> .awemenu-submenu", t).slideDown(this.options.mobileAnimationDuration), e("> a > .awemenu-arrow", t).removeClass(a.down).addClass(a.mobileClose)
            }
            this.options.active(t, this)
        },
        deactiveSubMenu: function(t) {
            var i = parseInt(e("> .awemenu-submenu", t).attr("data-duration"));
            isNaN(i) ? this.options.desktopDurationDefault : i;
            if (this.options.beforeDeactive(t, this), this.isMobile) {
                var s = this.options.arrows;
                e("> .awemenu-submenu", t).slideUp(this.options.mobileAnimationDuration, function() {
                    t.removeClass("awemenu-active")
                }), e("> a > .awemenu-arrow", t).removeClass(s.mobileClose).addClass(s.down)
            } else e("> .awemenu-submenu", t).css("z-index", -1), t.removeClass("awemenu-active");
            this.options.deactive(t, this)
        },
        addMenuClasses: function(t) {
            function i(t) {
                -1 === e.inArray(t, s.classes) && s.classes.push(t)
            }
            var s = this;
            "string" === e.type(t) ? i(t) : "array" === e.type(t) && e.each(t, function() {
                i(this)
            }), this.$el.addClass(this.classes.join(" "))
        },
        removeMenuClasses: function(t) {
            function i(t) {
                var i = e.inArray(t, s.classes);
                i > -1 && (s.classes.splice(i, 1), s.$el.removeClass(t))
            }
            var s = this;
            switch (e.type(t)) {
                case "array":
                    e.each(t, function() {
                        i(this)
                    });
                    break;
                case "string":
                    i(t)
            }
        },
        setMenuMaxHeight: function(t) {
            var i = this.$el.height(),
                s = e(window).height();
            t ? e("ul.awemenu", this.$el).css("max-height", "") : e("ul.awemenu", this.$el).css("max-height", s - i)
        },
        createStickyReplacerID: function() {
            var t = e(".awemenu-nav").index(this.$el);
            this.stickyReplacerID = "awemenu-sticky-replacer-" + (t + 1)
        }
    }, e.fn.aweMenu = function(i) {
        var s = Array.prototype.slice.call(arguments, 1),
            a = this;
        return this.each(function() {
            var n = e(this),
                o = n.data("awe-menu");
            switch (e.type(i)) {
                case "string":
                    var r = ["option", "destroy"];
                    if (!o) throw Error("Error: cannot call methods on awrMenu prior to initialization;");
                    if (!(e.inArray(i, r) > -1)) throw Error('Error: method "' + i + '" does not exist on aweMenu');
                    switch (i) {
                        case "option":
                            var u = {};
                            "object" == e.type(s[0]) ? (u = s[0], o.setOption(u)) : "string" == e.type(s[0]) && (void 0 !== s[1] ? (u[s[0]] = s[1], o.setOption(u)) : a = o.getOption(s[0]));
                            break;
                        case "destroy":
                            o.destroy()
                    }
                    break;
                case "object":
                    o ? o.setOption(i) : (o = new t(n, i), n.data("awe-menu", o));
                    break;
                default:
                    o || (o = new t(n, {}), n.data("awe-menu", o))
            }
        }), a
    }
}(jQuery);
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

! function(a, b) {
    "use strict";

    function c(a) {
        this.callback = a, this.ticking = !1
    }

    function d(b) {
        return b && "undefined" != typeof a && (b === a || b.nodeType)
    }

    function e(a) {
        if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
        var b, c, f = a || {};
        for (c = 1; c < arguments.length; c++) {
            var g = arguments[c] || {};
            for (b in g) f[b] = "object" != typeof f[b] || d(f[b]) ? f[b] || g[b] : e(f[b], g[b])
        }
        return f
    }

    function f(a) {
        return a === Object(a) ? a : {
            down: a,
            up: a
        }
    }

    function g(a, b) {
        b = e(b, g.options), this.lastKnownScrollY = 0, this.elem = a, this.debouncer = new c(this.update.bind(this)), this.tolerance = f(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop
    }
    var h = {
        bind: !! function() {}.bind,
        classList: "classList" in b.documentElement,
        rAF: !!(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame)
    };
    a.requestAnimationFrame = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, c.prototype = {
        constructor: c,
        update: function() {
            this.callback && this.callback(), this.ticking = !1
        },
        requestTick: function() {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
        },
        handleEvent: function() {
            this.requestTick()
        }
    }, g.prototype = {
        constructor: g,
        init: function() {
            return g.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
        },
        destroy: function() {
            var a = this.classes;
            this.initialised = !1, this.elem.classList.remove(a.unpinned, a.pinned, a.top, a.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
        },
        attachEvent: function() {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
        },
        unpin: function() {
            var a = this.elem.classList,
                b = this.classes;
            (a.contains(b.pinned) || !a.contains(b.unpinned)) && (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
        },
        pin: function() {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
        },
        top: function() {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
        },
        notTop: function() {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
        },
        getScrollY: function() {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (b.documentElement || b.body.parentNode || b.body).scrollTop
        },
        getViewportHeight: function() {
            return a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight
        },
        getDocumentHeight: function() {
            var a = b.body,
                c = b.documentElement;
            return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight)
        },
        getElementHeight: function(a) {
            return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
        },
        getScrollerHeight: function() {
            return this.scroller === a || this.scroller === b.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        },
        isOutOfBounds: function(a) {
            var b = 0 > a,
                c = a + this.getViewportHeight() > this.getScrollerHeight();
            return b || c
        },
        toleranceExceeded: function(a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
        },
        shouldUnpin: function(a, b) {
            var c = a > this.lastKnownScrollY,
                d = a >= this.offset;
            return c && d && b
        },
        shouldPin: function(a, b) {
            var c = a < this.lastKnownScrollY,
                d = a <= this.offset;
            return c && b || d
        },
        update: function() {
            var a = this.getScrollY(),
                b = a > this.lastKnownScrollY ? "down" : "up",
                c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
        }
    }, g.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: a,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            initial: "headroom"
        }
    }, g.cutsTheMustard = "undefined" != typeof h && h.rAF && h.bind && h.classList, a.Headroom = g
}(window, document);

/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

! function(a) {
    a && (a.fn.headroom = function(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("headroom"),
                e = "object" == typeof b && b;
            e = a.extend(!0, {}, Headroom.options, e), d || (d = new Headroom(this, e), d.init(), c.data("headroom", d)), "string" == typeof b && d[b]()
        })
    }, a("[data-headroom]").each(function() {
        var b = a(this);
        b.headroom(b.data())
    }))
}(window.Zepto || window.jQuery);

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else if (typeof exports === "object") {
        factory(require("jquery"))
    } else {
        factory(jQuery)
    }
})(function($, undef) {
    var dataKey = "plugin_hideShowPassword",
        shorthandArgs = ["show", "innerToggle"],
        SPACE = 32,
        ENTER = 13;
    var canSetInputAttribute = function() {
        var body = document.body,
            input = document.createElement("input"),
            result = true;
        if (!body) {
            body = document.createElement("body")
        }
        input = body.appendChild(input);
        try {
            input.setAttribute("type", "text")
        } catch (e) {
            result = false
        }
        body.removeChild(input);
        return result
    }();
    var defaults = {
        show: "infer",
        innerToggle: false,
        enable: canSetInputAttribute,
        className: "hideShowPassword-field",
        initEvent: "hideShowPasswordInit",
        changeEvent: "passwordVisibilityChange",
        props: {
            autocapitalize: "off",
            autocomplete: "off",
            autocorrect: "off",
            spellcheck: "false"
        },
        toggle: {
            element: '<button type="button">',
            className: "hideShowPassword-toggle",
            touchSupport: typeof Modernizr === "undefined" ? false : Modernizr.touch,
            attachToEvent: "click.hideShowPassword",
            attachToTouchEvent: "touchstart.hideShowPassword mousedown.hideShowPassword",
            attachToKeyEvent: "keyup",
            attachToKeyCodes: true,
            styles: {
                position: "absolute"
            },
            touchStyles: {
                pointerEvents: "none"
            },
            position: "infer",
            verticalAlign: "middle",
            offset: 0,
            attr: {
                role: "button",
                "aria-label": "Show Password",
                tabIndex: 0
            }
        },
        wrapper: {
            element: "<div>",
            className: "hideShowPassword-wrapper",
            enforceWidth: true,
            styles: {
                position: "relative"
            },
            inheritStyles: ["display", "verticalAlign", "marginTop", "marginRight", "marginBottom", "marginLeft"],
            innerElementStyles: {
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }
        },
        states: {
            shown: {
                className: "hideShowPassword-shown",
                changeEvent: "passwordShown",
                props: {
                    type: "text"
                },
                toggle: {
                    className: "hideShowPassword-toggle-hide",
                    content: "Hide",
                    attr: {
                        "aria-pressed": "true"
                    }
                }
            },
            hidden: {
                className: "hideShowPassword-hidden",
                changeEvent: "passwordHidden",
                props: {
                    type: "password"
                },
                toggle: {
                    className: "hideShowPassword-toggle-show",
                    content: "Show",
                    attr: {
                        "aria-pressed": "false"
                    }
                }
            }
        }
    };

    function HideShowPassword(element, options) {
        this.element = $(element);
        this.wrapperElement = $();
        this.toggleElement = $();
        this.init(options)
    }
    HideShowPassword.prototype = {
        init: function(options) {
            if (this.update(options, defaults)) {
                this.element.addClass(this.options.className);
                if (this.options.innerToggle) {
                    this.wrapElement(this.options.wrapper);
                    this.initToggle(this.options.toggle);
                    if (typeof this.options.innerToggle === "string") {
                        this.toggleElement.hide();
                        this.element.one(this.options.innerToggle, $.proxy(function() {
                            this.toggleElement.show()
                        }, this))
                    }
                }
                this.element.trigger(this.options.initEvent, [this])
            }
        },
        update: function(options, base) {
            this.options = this.prepareOptions(options, base);
            if (this.updateElement()) {
                this.element.trigger(this.options.changeEvent, [this]).trigger(this.state().changeEvent, [this])
            }
            return this.options.enable
        },
        toggle: function(showVal) {
            showVal = showVal || "toggle";
            return this.update({
                show: showVal
            })
        },
        prepareOptions: function(options, base) {
            var keyCodes = [],
                testElement;
            base = base || this.options;
            options = $.extend(true, {}, base, options);
            if (options.enable) {
                if (options.show === "toggle") {
                    options.show = this.isType("hidden", options.states)
                } else if (options.show === "infer") {
                    options.show = this.isType("shown", options.states)
                }
                if (options.toggle.position === "infer") {
                    options.toggle.position = this.element.css("text-direction") === "rtl" ? "left" : "right"
                }
                if (!$.isArray(options.toggle.attachToKeyCodes)) {
                    if (options.toggle.attachToKeyCodes === true) {
                        testElement = $(options.toggle.element);
                        switch (testElement.prop("tagName").toLowerCase()) {
                            case "button":
                            case "input":
                                break;
                            case "a":
                                if (testElement.filter("[href]").length) {
                                    keyCodes.push(SPACE);
                                    break
                                }
                            default:
                                keyCodes.push(SPACE, ENTER);
                                break
                        }
                    }
                    options.toggle.attachToKeyCodes = keyCodes
                }
            }
            return options
        },
        updateElement: function() {
            if (!this.options.enable || this.isType()) return false;
            this.element.prop($.extend({}, this.options.props, this.state().props)).addClass(this.state().className).removeClass(this.otherState().className);
            this.updateToggle();
            return true
        },
        isType: function(comparison, states) {
            states = states || this.options.states;
            comparison = comparison || this.state(undef, undef, states).props.type;
            if (states[comparison]) {
                comparison = states[comparison].props.type
            }
            return this.element.prop("type") === comparison
        },
        state: function(key, invert, states) {
            states = states || this.options.states;
            if (key === undef) {
                key = this.options.show
            }
            if (typeof key === "boolean") {
                key = key ? "shown" : "hidden"
            }
            if (invert) {
                key = key === "shown" ? "hidden" : "shown"
            }
            return states[key]
        },
        otherState: function(key) {
            return this.state(key, true)
        },
        wrapElement: function(options) {
            var enforceWidth = options.enforceWidth,
                targetWidth;
            if (!this.wrapperElement.length) {
                targetWidth = this.element.outerWidth();
                $.each(options.inheritStyles, $.proxy(function(index, prop) {
                    options.styles[prop] = this.element.css(prop)
                }, this));
                this.element.css(options.innerElementStyles).wrap($(options.element).addClass(options.className).css(options.styles));
                this.wrapperElement = this.element.parent();
                if (enforceWidth === true) {
                    enforceWidth = this.wrapperElement.outerWidth() === targetWidth ? false : targetWidth
                }
                if (enforceWidth !== false) {
                    this.wrapperElement.css("width", enforceWidth)
                }
            }
            return this.wrapperElement
        },
        initToggle: function(options) {
            if (!this.toggleElement.length) {
                this.toggleElement = $(options.element).attr(options.attr).addClass(options.className).css(options.styles).appendTo(this.wrapperElement);
                this.updateToggle();
                this.positionToggle(options.position, options.verticalAlign, options.offset);
                if (options.touchSupport) {
                    this.toggleElement.css(options.touchStyles);
                    this.element.on(options.attachToTouchEvent, $.proxy(this.toggleTouchEvent, this))
                } else {
                    this.toggleElement.on(options.attachToEvent, $.proxy(this.toggleEvent, this))
                }
                if (options.attachToKeyCodes.length) {
                    this.toggleElement.on(options.attachToKeyEvent, $.proxy(this.toggleKeyEvent, this))
                }
            }
            return this.toggleElement
        },
        positionToggle: function(position, verticalAlign, offset) {
            var styles = {};
            styles[position] = offset;
            switch (verticalAlign) {
                case "top":
                case "bottom":
                    styles[verticalAlign] = offset;
                    break;
                case "middle":
                    styles.top = "50%";
                    styles.marginTop = this.toggleElement.outerHeight() / -2;
                    break
            }
            return this.toggleElement.css(styles)
        },
        updateToggle: function(state, otherState) {
            var paddingProp, targetPadding;
            if (this.toggleElement.length) {
                paddingProp = "padding-" + this.options.toggle.position;
                state = state || this.state().toggle;
                otherState = otherState || this.otherState().toggle;
                this.toggleElement.attr(state.attr).addClass(state.className).removeClass(otherState.className).html(state.content);
                targetPadding = this.toggleElement.outerWidth() + this.options.toggle.offset * 2;
                if (this.element.css(paddingProp) !== targetPadding) {
                    this.element.css(paddingProp, targetPadding)
                }
            }
            return this.toggleElement
        },
        toggleEvent: function(event) {
            event.preventDefault();
            this.toggle()
        },
        toggleKeyEvent: function(event) {
            $.each(this.options.toggle.attachToKeyCodes, $.proxy(function(index, keyCode) {
                if (event.which === keyCode) {
                    this.toggleEvent(event);
                    return false
                }
            }, this))
        },
        toggleTouchEvent: function(event) {
            var toggleX = this.toggleElement.offset().left,
                eventX, lesser, greater;
            if (toggleX) {
                eventX = event.pageX || event.originalEvent.pageX;
                if (this.options.toggle.position === "left") {
                    toggleX += this.toggleElement.outerWidth();
                    lesser = eventX;
                    greater = toggleX
                } else {
                    lesser = toggleX;
                    greater = eventX
                }
                if (greater >= lesser) {
                    this.toggleEvent(event)
                }
            }
        }
    };
    $.fn.hideShowPassword = function() {
        var options = {};
        $.each(arguments, function(index, value) {
            var newOptions = {};
            if (typeof value === "object") {
                newOptions = value
            } else if (shorthandArgs[index]) {
                newOptions[shorthandArgs[index]] = value
            } else {
                return false
            }
            $.extend(true, options, newOptions)
        });
        return this.each(function() {
            var $this = $(this),
                data = $this.data(dataKey);
            if (data) {
                data.update(options)
            } else {
                $this.data(dataKey, new HideShowPassword(this, options))
            }
        })
    };
    $.each({
        show: true,
        hide: false,
        toggle: "toggle"
    }, function(verb, showVal) {
        $.fn[verb + "Password"] = function(innerToggle, options) {
            return this.hideShowPassword(showVal, innerToggle, options)
        }
    })
});
/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/
! function(n) {
    var t = n(window),
        e = t.height();
    t.resize(function() {
        e = t.height()
    }), n.fn.parallax = function(o, i, r) {
        function u() {
            var r = t.scrollTop();
            a.each(function() {
                var t = n(this),
                    u = t.offset().top,
                    c = h(t);
                r > u + c || u > r + e || a.css("backgroundPosition", o + " " + Math.round((l - r) * i) + "px")
            })
        }
        var h, l, a = n(this);
        a.each(function() {
            l = a.offset().top
        }), h = r ? function(n) {
            return n.outerHeight(!0)
        } : function(n) {
            return n.height()
        }, (arguments.length < 1 || null === o) && (o = "50%"), (arguments.length < 2 || null === i) && (i = .1), (arguments.length < 3 || null === r) && (r = !0), t.bind("scroll", u).resize(u), u()
    }
}(jQuery);

/*! Magnific Popup - v1.0.0 - 2014-12-12
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2014 Dmitry Semenov; */
(function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
})(function(e) {
    var t, n, i, o, r, a, s, l = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        u = "BeforeAppend",
        p = "MarkupParse",
        f = "Open",
        m = "Change",
        g = "mfp",
        h = "." + g,
        v = "mfp-ready",
        C = "mfp-removing",
        y = "mfp-prevent-close",
        w = function() {},
        b = !!window.jQuery,
        I = e(window),
        x = function(e, n) {
            t.ev.on(g + e + h, n)
        },
        k = function(t, n, i, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        T = function(n, i) {
            t.ev.triggerHandler(g + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        E = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
        },
        _ = function() {
            e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
        },
        S = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    w.prototype = {
        constructor: w,
        init: function() {
            var n = navigator.appVersion;
            t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
        },
        open: function(n) {
            i || (i = e(document.body));
            var r;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var s, l = n.items;
                for (r = 0; l.length > r; r++)
                    if (s = l[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
                        t.index = r;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return t.updateItemHTML(), void 0;
            t.types = [], a = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + h, function() {
                t.close()
            }), t.wrap = k("wrap").attr("tabindex", -1).on("click" + h, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
            var c = e.magnificPopup.modules;
            for (r = 0; c.length > r; r++) {
                var d = c[r];
                d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
            }
            T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function(e, t, n, i) {
                n.close_replaceWith = E(i.type)
            }), a += " mfp-close-btn-in") : t.wrap.append(E())), t.st.alignTop && (a += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: I.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: o.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && o.on("keyup" + h, function(e) {
                27 === e.keyCode && t.close()
            }), I.on("resize" + h, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
            var u = t.wH = I.height(),
                m = {};
            if (t.fixedContentPos && t._hasScrollBar(u)) {
                var g = t._getScrollbarSize();
                g && (m.marginRight = g)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var C = t.st.mainClass;
            return t.isIE7 && (C += " mfp-ie7"), C && t._addClassToMFP(C), t.updateItemHTML(), T("BuildControls"), e("html").css(m), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), o.on("focusin" + h, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(u), T(f), n
        },
        close: function() {
            t.isOpen && (T(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(C), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            T(l);
            var n = C + " " + v + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var i = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
            }
            o.off("keyup" + h + " focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T(d)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || I.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var o = t.st[i] ? t.st[i].markup : !1;
                T("FirstMarkupParse", o), t.currTemplate[i] = o ? e(o) : !0
            }
            r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i), n.preloaded = !0, T(m, n), r = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "", T(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = {
                    el: e(o)
                } : (i = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var r = t.types, a = 0; r.length > a; a++)
                    if (o.el.hasClass("mfp-" + r[a])) {
                        i = r[a];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, T("ElementParse", o), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0
                    } else if (a > I.width()) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(y)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i) return !0
                } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), T(p, [t, n, i]), e.each(n, function(e, n) {
                if (void 0 === n || n === !1) return !0;
                if (o = e.split("_"), o.length > 1) {
                    var i = t.find(h + "-" + o[0]);
                    if (i.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
                    }
                } else t.find(h + "-" + e).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: w.prototype,
        modules: [],
        open: function(t, n) {
            return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
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
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function(n) {
        _();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
                    mfpEl: o
                }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var P, O, z, M = "inline",
        B = function() {
            z && (O.after(z.addClass(P)).detach(), z = null)
        };
    e.magnificPopup.registerModule(M, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(M), x(l + "." + M, function() {
                    B()
                })
            },
            getInline: function(n, i) {
                if (B(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (O || (P = o.hiddenClass, O = k(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var F, H = "ajax",
        L = function() {
            F && i.removeClass(F)
        },
        A = function() {
            L(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(H), F = t.st.ajax.cursor, x(l + "." + H, A), x("BeforeChange." + H, A)
            },
            getAjax: function(n) {
                F && i.addClass(F), t.updateStatus("loading");
                var o = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var a = {
                            data: i,
                            xhr: r
                        };
                        T("ParseAjax", a), t.appendContent(e(a.data), H), n.finished = !0, L(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(v)
                        }, 16), t.updateStatus("ready"), T("AjaxContentAdded")
                    },
                    error: function() {
                        L(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o), ""
            }
        }
    });
    var j, N = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = t.st.image,
                    n = ".image";
                t.types.push("image"), x(f + n, function() {
                    "image" === t.currItem.type && e.cursor && i.addClass(e.cursor)
                }), x(l + n, function() {
                    e.cursor && i.removeClass(e.cursor), I.off("resize" + h)
                }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) {
                        j && clearInterval(j), j = setInterval(function() {
                            return i.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(j), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0)
                        }, r)
                    };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
                    },
                    a = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: N(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var W, R = function() {
        return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, a = n.duration,
                        s = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        d = function() {
                            t.content.css("visibility", "visible")
                        };
                    x("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return d(), void 0;
                            r = s(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() {
                                r.css(t._getOffset(!0)), o = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        r.remove(), e = r = null, T("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), x(c + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = s(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), x(l + i, function() {
                        t._allowZoom() && (d(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = {
                    width: i.width(),
                    height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r
                };
                return R() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var Z = "iframe",
        q = "//about:blank",
        D = function(e) {
            if (t.currTemplate[Z]) {
                var n = t.currTemplate[Z].find("iframe");
                n.length && (e || (n[0].src = q), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(Z, {
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
                t.types.push(Z), x("BeforeChange", function(e, t, n) {
                    t !== n && (t === Z ? D() : n === Z && D(!0))
                }), x(l + "." + Z, function() {
                    D()
                })
            },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
            }
        }
    });
    var K = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : 0 > e ? n + e : e
        },
        Y = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
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
                var n = t.st.gallery,
                    i = ".mfp-gallery",
                    r = Boolean(e.fn.mfpFastClick);
                return t.direction = !0, n && n.enabled ? (a += " mfp-gallery", x(f + i, function() {
                    n.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), o.on("keydown" + i, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), x("UpdateStatus" + i, function(e, n) {
                    n.text && (n.text = Y(n.text, t.currItem.index, t.items.length))
                }), x(p + i, function(e, i, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ""
                }), x("BuildControls" + i, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            a = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = r ? "mfpFastClick" : "click";
                        o[s](function() {
                            t.prev()
                        }), a[s](function() {
                            t.next()
                        }), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", a[0], !1, !0), k("a", a[0], !1, !0)), t.container.append(o.add(a))
                    }
                }), x(m + i, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), x(l + i, function() {
                    o.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
                }), void 0) : !1
            },
            next: function() {
                t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1;
                    (t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e);
                for (e = 1;
                    (t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = K(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    e.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(e) {
                    return e.src.replace(/\.\w+$/, function(e) {
                        return "@2x" + e
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var e = t.st.retina,
                            n = e.ratio;
                        n = isNaN(n) ? n() : n, n > 1 && (x("ImageHasSize." + U, function(e, t) {
                            t.img.css({
                                "max-width": t.img[0].naturalWidth / n,
                                width: "100%"
                            })
                        }), x("ElementParse." + U, function(t, i) {
                            i.src = e.replaceSrc(i, n)
                        }))
                    }
                }
            }
        }),
        function() {
            var t = 1e3,
                n = "ontouchstart" in window,
                i = function() {
                    I.off("touchmove" + r + " touchend" + r)
                },
                o = "mfpFastClick",
                r = "." + o;
            e.fn.mfpFastClick = function(o) {
                return e(this).each(function() {
                    var a, s = e(this);
                    if (n) {
                        var l, c, d, u, p, f;
                        s.on("touchstart" + r, function(e) {
                            u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, I.on("touchmove" + r, function(e) {
                                p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i())
                            }).on("touchend" + r, function(e) {
                                i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function() {
                                    a = !1
                                }, t), o())
                            })
                        })
                    }
                    s.on("click" + r, function() {
                        a || o()
                    })
                })
            }, e.fn.destroyMfpFastClick = function() {
                e(this).off("touchstart" + r + " click" + r), n && I.off("touchmove" + r + " touchend" + r)
            }
        }(), _()
});
/*! nanoScrollerJS - v0.8.7 - (c) 2015 James Florentino; Licensed MIT */

! function(a) {
    return "function" == typeof define && define.amd ? define(["jquery"], function(b) {
        return a(b, window, document)
    }) : "object" == typeof exports ? module.exports = a(require("jquery"), window, document) : a(jQuery, window, document)
}(function(a, b, c) {
    "use strict";
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    z = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function() {
        var a, b, c, d, e, f;
        for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)
            if (c = d[a], b = d[a] + "ransform", b in F) return d[a].substr(0, d[a].length - 1);
        return !1
    }(), G = function(a) {
        return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
    }, E = G("transform"), B = E !== !1, A = function() {
        var a, b, d;
        return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
    }, C = function() {
        var a, c, d;
        return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
    }, q = function() {
        function j(d, f) {
            this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + this.options.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }
        return j.prototype.preventScrolling = function(a, b) {
            if (this.isActive)
                if (a.type === f)(b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault();
                else if (a.type === p) {
                if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
                (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
            }
        }, j.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }), this.iOSNativeScrolling = !0, this.isActive = !0
        }, j.prototype.updateScrollValues = function() {
            var a, b;
            a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: b
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, j.prototype.setOnScrollStyles = function() {
            var a;
            B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {
                top: this.sliderTop
            }, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function(b) {
                return function() {
                    return b.scrollRAF = null, b.slider.css(a)
                }
            }(this))) : this.slider.css(a)
        }, j.prototype.createEvents = function() {
            this.events = {
                down: function(a) {
                    return function(b) {
                        return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
                    }
                }(this),
                drag: function(a) {
                    return function(b) {
                        return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                    }
                }(this),
                up: function(a) {
                    return function(b) {
                        return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
                    }
                }(this),
                resize: function(a) {
                    return function(b) {
                        a.reset()
                    }
                }(this),
                panedown: function(a) {
                    return function(b) {
                        return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                    }
                }(this),
                scroll: function(a) {
                    return function(b) {
                        a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                    }
                }(this),
                wheel: function(a) {
                    return function(b) {
                        var c;
                        if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                    }
                }(this),
                enter: function(a) {
                    return function(b) {
                        var c;
                        if (a.isBeingDragged) return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
                    }
                }(this)
            }
        }, j.prototype.addEvents = function() {
            var a;
            this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.removeEvents = function() {
            var a;
            a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.generate = function() {
            var a, c, d, f, g, h, i;
            return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
                right: -14,
                paddingRight: +d + 14
            }) : e && (c = {
                right: -e
            }, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
        }, j.prototype.restore = function() {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, j.prototype.reset = function() {
            var a, b, c, f, g, h, i, j, k, l, m, n;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({
                height: this.$content.height()
            }), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * i), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                right: "",
                marginRight: m
            })), this)
        }, j.prototype.scroll = function() {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        }, j.prototype.scrollBottom = function(a) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTop = function(a) {
            return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTo = function(a) {
            return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
        }, j.prototype.stop = function() {
            return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, j.prototype.destroy = function() {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                right: ""
            })), this
        }, j.prototype.flash = function() {
            return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(a) {
                return function() {
                    a.pane.removeClass("flashed")
                }
            }(this), this.options.flashDelay), this) : void 0
        }, j
    }(), a.fn.nanoScroller = function(b) {
        return this.each(function() {
            var c, d;
            if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
                if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
                if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
                if (b.scrollTo) return d.scrollTo(b.scrollTo);
                if ("bottom" === b.scroll) return d.scrollBottom(0);
                if ("top" === b.scroll) return d.scrollTop(0);
                if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
                if (b.stop) return d.stop();
                if (b.destroy) return d.destroy();
                if (b.flash) return d.flash()
            }
            return d.reset()
        })
    }, a.fn.nanoScroller.Constructor = q
});
//# sourceMappingURL=jquery.nanoscroller.min.js.map
/**
 * Swiper 3.1.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: July 14, 2015
 */
! function() {
    "use strict";

    function e(e) {
        e.fn.swiper = function(a) {
            var r;
            return e(this).each(function() {
                var e = new t(this, a);
                r || (r = e)
            }), r
        }
    }
    var a, t = function(e, s) {
        function i() {
            return "horizontal" === w.params.direction
        }

        function n(e) {
            return Math.floor(e)
        }

        function o() {
            w.autoplayTimeoutId = setTimeout(function() {
                w.params.loop ? (w.fixLoop(), w._slideNext()) : w.isEnd ? s.autoplayStopOnLast ? w.stopAutoplay() : w._slideTo(0) : w._slideNext()
            }, w.params.autoplay)
        }

        function l(e, t) {
            var r = a(e.target);
            if (!r.is(t))
                if ("string" == typeof t) r = r.parents(t);
                else if (t.nodeType) {
                var s;
                return r.parents().each(function(e, a) {
                    a === t && (s = t)
                }), s ? t : void 0
            }
            return 0 === r.length ? void 0 : r[0]
        }

        function d(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                r = new t(function(e) {
                    e.forEach(function(e) {
                        w.onResize(!0), w.emit("onObserverUpdate", w, e)
                    })
                });
            r.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), w.observers.push(r)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!w.params.allowSwipeToNext && (i() && 39 === a || !i() && 40 === a)) return !1;
            if (!w.params.allowSwipeToPrev && (i() && 37 === a || !i() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (w.container.parents(".swiper-slide").length > 0 && 0 === w.container.parents(".swiper-slide-active").length) return;
                    var r = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                        s = window.innerWidth,
                        n = window.innerHeight,
                        o = w.container.offset();
                    w.rtl && (o.left = o.left - w.container[0].scrollLeft);
                    for (var l = [
                            [o.left, o.top],
                            [o.left + w.width, o.top],
                            [o.left, o.top + w.height],
                            [o.left + w.width, o.top + w.height]
                        ], d = 0; d < l.length; d++) {
                        var p = l[d];
                        p[0] >= r.left && p[0] <= r.left + s && p[1] >= r.top && p[1] <= r.top + n && (t = !0)
                    }
                    if (!t) return
                }
                i() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !w.rtl || 37 === a && w.rtl) && w.slideNext(), (37 === a && !w.rtl || 39 === a && w.rtl) && w.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && w.slideNext(), 38 === a && w.slidePrev())
            }
        }

        function u(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = w.mousewheel.event,
                t = 0;
            if (e.detail) t = -e.detail;
            else if ("mousewheel" === a)
                if (w.params.mousewheelForceToAxis)
                    if (i()) {
                        if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                        t = e.wheelDeltaX
                    } else {
                        if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                        t = e.wheelDeltaY
                    } else t = e.wheelDelta;
            else if ("DOMMouseScroll" === a) t = -e.detail;
            else if ("wheel" === a)
                if (w.params.mousewheelForceToAxis)
                    if (i()) {
                        if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                        t = -e.deltaX
                    } else {
                        if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                        t = -e.deltaY
                    } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
            if (w.params.mousewheelInvert && (t = -t), w.params.freeMode) {
                var r = w.getWrapperTranslate() + t;
                if (r > 0 && (r = 0), r < w.maxTranslate() && (r = w.maxTranslate()), w.setWrapperTransition(0), w.setWrapperTranslate(r), w.updateProgress(), w.updateActiveIndex(), w.params.freeModeSticky && (clearTimeout(w.mousewheel.timeout), w.mousewheel.timeout = setTimeout(function() {
                        w.slideReset()
                    }, 300)), 0 === r || r === w.maxTranslate()) return
            } else {
                if ((new window.Date).getTime() - w.mousewheel.lastScrollTime > 60)
                    if (0 > t)
                        if (w.isEnd) {
                            if (w.params.mousewheelReleaseOnEdges) return !0
                        } else w.slideNext();
                else if (w.isBeginning) {
                    if (w.params.mousewheelReleaseOnEdges) return !0
                } else w.slidePrev();
                w.mousewheel.lastScrollTime = (new window.Date).getTime()
            }
            return w.params.autoplay && w.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }

        function c(e, t) {
            e = a(e);
            var r, s, n;
            r = e.attr("data-swiper-parallax") || "0", s = e.attr("data-swiper-parallax-x"), n = e.attr("data-swiper-parallax-y"), s || n ? (s = s || "0", n = n || "0") : i() ? (s = r, n = "0") : (n = r, s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t + "%" : n * t + "px", e.transform("translate3d(" + s + ", " + n + ",0px)")
        }

        function m(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof t)) return new t(e, s);
        var f = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                scrollbar: null,
                scrollbarHide: !0,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                hashnav: !1,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slidePrevClass: "swiper-slide-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationHiddenClass: "swiper-pagination-hidden",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            h = s && s.virtualTranslate;
        s = s || {};
        for (var g in f)
            if ("undefined" == typeof s[g]) s[g] = f[g];
            else if ("object" == typeof s[g])
            for (var v in f[g]) "undefined" == typeof s[g][v] && (s[g][v] = f[g][v]);
        var w = this;
        if (w.version = "3.1.0", w.params = s, w.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (w.$ = a, w.container = a(e), 0 !== w.container.length)) {
            if (w.container.length > 1) return void w.container.each(function() {
                new t(this, s)
            });
            w.container[0].swiper = w, w.container.data("swiper", w), w.classNames.push("swiper-container-" + w.params.direction), w.params.freeMode && w.classNames.push("swiper-container-free-mode"), w.support.flexbox || (w.classNames.push("swiper-container-no-flexbox"), w.params.slidesPerColumn = 1), (w.params.parallax || w.params.watchSlidesVisibility) && (w.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(w.params.effect) >= 0 && (w.support.transforms3d ? (w.params.watchSlidesProgress = !0, w.classNames.push("swiper-container-3d")) : w.params.effect = "slide"), "slide" !== w.params.effect && w.classNames.push("swiper-container-" + w.params.effect), "cube" === w.params.effect && (w.params.resistanceRatio = 0, w.params.slidesPerView = 1, w.params.slidesPerColumn = 1, w.params.slidesPerGroup = 1, w.params.centeredSlides = !1, w.params.spaceBetween = 0, w.params.virtualTranslate = !0, w.params.setWrapperSize = !1), "fade" === w.params.effect && (w.params.slidesPerView = 1, w.params.slidesPerColumn = 1, w.params.slidesPerGroup = 1, w.params.watchSlidesProgress = !0, w.params.spaceBetween = 0, "undefined" == typeof h && (w.params.virtualTranslate = !0)), w.params.grabCursor && w.support.touch && (w.params.grabCursor = !1), w.wrapper = w.container.children("." + w.params.wrapperClass), w.params.pagination && (w.paginationContainer = a(w.params.pagination), w.params.paginationClickable && w.paginationContainer.addClass("swiper-pagination-clickable")), w.rtl = i() && ("rtl" === w.container[0].dir.toLowerCase() || "rtl" === w.container.css("direction")), w.rtl && w.classNames.push("swiper-container-rtl"), w.rtl && (w.wrongRTL = "-webkit-box" === w.wrapper.css("display")), w.params.slidesPerColumn > 1 && w.classNames.push("swiper-container-multirow"), w.device.android && w.classNames.push("swiper-container-android"), w.container.addClass(w.classNames.join(" ")), w.translate = 0, w.progress = 0, w.velocity = 0, w.lockSwipeToNext = function() {
                w.params.allowSwipeToNext = !1
            }, w.lockSwipeToPrev = function() {
                w.params.allowSwipeToPrev = !1
            }, w.lockSwipes = function() {
                w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !1
            }, w.unlockSwipeToNext = function() {
                w.params.allowSwipeToNext = !0
            }, w.unlockSwipeToPrev = function() {
                w.params.allowSwipeToPrev = !0
            }, w.unlockSwipes = function() {
                w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !0
            }, w.params.grabCursor && (w.container[0].style.cursor = "move", w.container[0].style.cursor = "-webkit-grab", w.container[0].style.cursor = "-moz-grab", w.container[0].style.cursor = "grab"), w.imagesToLoad = [], w.imagesLoaded = 0, w.loadImage = function(e, a, t, r) {
                function s() {
                    r && r()
                }
                var i;
                e.complete && t ? s() : a ? (i = new window.Image, i.onload = s, i.onerror = s, i.src = a) : s()
            }, w.preloadImages = function() {
                function e() {
                    "undefined" != typeof w && null !== w && (void 0 !== w.imagesLoaded && w.imagesLoaded++, w.imagesLoaded === w.imagesToLoad.length && (w.params.updateOnImagesReady && w.update(), w.emit("onImagesReady", w)))
                }
                w.imagesToLoad = w.container.find("img");
                for (var a = 0; a < w.imagesToLoad.length; a++) w.loadImage(w.imagesToLoad[a], w.imagesToLoad[a].currentSrc || w.imagesToLoad[a].getAttribute("src"), !0, e)
            }, w.autoplayTimeoutId = void 0, w.autoplaying = !1, w.autoplayPaused = !1, w.startAutoplay = function() {
                return "undefined" != typeof w.autoplayTimeoutId ? !1 : w.params.autoplay ? w.autoplaying ? !1 : (w.autoplaying = !0, w.emit("onAutoplayStart", w), void o()) : !1
            }, w.stopAutoplay = function(e) {
                w.autoplayTimeoutId && (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId), w.autoplaying = !1, w.autoplayTimeoutId = void 0, w.emit("onAutoplayStop", w))
            }, w.pauseAutoplay = function(e) {
                w.autoplayPaused || (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId), w.autoplayPaused = !0, 0 === e ? (w.autoplayPaused = !1, o()) : w.wrapper.transitionEnd(function() {
                    w && (w.autoplayPaused = !1, w.autoplaying ? o() : w.stopAutoplay())
                }))
            }, w.minTranslate = function() {
                return -w.snapGrid[0]
            }, w.maxTranslate = function() {
                return -w.snapGrid[w.snapGrid.length - 1]
            }, w.updateContainerSize = function() {
                var e, a;
                e = "undefined" != typeof w.params.width ? w.params.width : w.container[0].clientWidth, a = "undefined" != typeof w.params.height ? w.params.height : w.container[0].clientHeight, 0 === e && i() || 0 === a && !i() || (e = e - parseInt(w.container.css("padding-left"), 10) - parseInt(w.container.css("padding-right"), 10), a = a - parseInt(w.container.css("padding-top"), 10) - parseInt(w.container.css("padding-bottom"), 10), w.width = e, w.height = a, w.size = i() ? w.width : w.height)
            }, w.updateSlidesSize = function() {
                w.slides = w.wrapper.children("." + w.params.slideClass), w.snapGrid = [], w.slidesGrid = [], w.slidesSizesGrid = [];
                var e, a = w.params.spaceBetween,
                    t = -w.params.slidesOffsetBefore,
                    r = 0,
                    s = 0;
                "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * w.size), w.virtualSize = -a, w.slides.css(w.rtl ? {
                    marginLeft: "",
                    marginTop: ""
                } : {
                    marginRight: "",
                    marginBottom: ""
                });
                var o;
                w.params.slidesPerColumn > 1 && (o = Math.floor(w.slides.length / w.params.slidesPerColumn) === w.slides.length / w.params.slidesPerColumn ? w.slides.length : Math.ceil(w.slides.length / w.params.slidesPerColumn) * w.params.slidesPerColumn);
                var l, d = w.params.slidesPerColumn,
                    p = o / d,
                    u = p - (w.params.slidesPerColumn * p - w.slides.length);
                for (e = 0; e < w.slides.length; e++) {
                    l = 0;
                    var c = w.slides.eq(e);
                    if (w.params.slidesPerColumn > 1) {
                        var m, f, h;
                        "column" === w.params.slidesPerColumnFill ? (f = Math.floor(e / d), h = e - f * d, (f > u || f === u && h === d - 1) && ++h >= d && (h = 0, f++), m = f + h * o / d, c.css({
                            "-webkit-box-ordinal-group": m,
                            "-moz-box-ordinal-group": m,
                            "-ms-flex-order": m,
                            "-webkit-order": m,
                            order: m
                        })) : (h = Math.floor(e / p), f = e - h * p), c.css({
                            "margin-top": 0 !== h && w.params.spaceBetween && w.params.spaceBetween + "px"
                        }).attr("data-swiper-column", f).attr("data-swiper-row", h)
                    }
                    "none" !== c.css("display") && ("auto" === w.params.slidesPerView ? (l = i() ? c.outerWidth(!0) : c.outerHeight(!0), w.params.roundLengths && (l = n(l))) : (l = (w.size - (w.params.slidesPerView - 1) * a) / w.params.slidesPerView, w.params.roundLengths && (l = n(l)), i() ? w.slides[e].style.width = l + "px" : w.slides[e].style.height = l + "px"), w.slides[e].swiperSlideSize = l, w.slidesSizesGrid.push(l), w.params.centeredSlides ? (t = t + l / 2 + r / 2 + a, 0 === e && (t = t - w.size / 2 - a), Math.abs(t) < .001 && (t = 0), s % w.params.slidesPerGroup === 0 && w.snapGrid.push(t), w.slidesGrid.push(t)) : (s % w.params.slidesPerGroup === 0 && w.snapGrid.push(t), w.slidesGrid.push(t), t = t + l + a), w.virtualSize += l + a, r = l, s++)
                }
                w.virtualSize = Math.max(w.virtualSize, w.size) + w.params.slidesOffsetAfter;
                var g;
                if (w.rtl && w.wrongRTL && ("slide" === w.params.effect || "coverflow" === w.params.effect) && w.wrapper.css({
                        width: w.virtualSize + w.params.spaceBetween + "px"
                    }), (!w.support.flexbox || w.params.setWrapperSize) && w.wrapper.css(i() ? {
                        width: w.virtualSize + w.params.spaceBetween + "px"
                    } : {
                        height: w.virtualSize + w.params.spaceBetween + "px"
                    }), w.params.slidesPerColumn > 1 && (w.virtualSize = (l + w.params.spaceBetween) * o, w.virtualSize = Math.ceil(w.virtualSize / w.params.slidesPerColumn) - w.params.spaceBetween, w.wrapper.css({
                        width: w.virtualSize + w.params.spaceBetween + "px"
                    }), w.params.centeredSlides)) {
                    for (g = [], e = 0; e < w.snapGrid.length; e++) w.snapGrid[e] < w.virtualSize + w.snapGrid[0] && g.push(w.snapGrid[e]);
                    w.snapGrid = g
                }
                if (!w.params.centeredSlides) {
                    for (g = [], e = 0; e < w.snapGrid.length; e++) w.snapGrid[e] <= w.virtualSize - w.size && g.push(w.snapGrid[e]);
                    w.snapGrid = g, Math.floor(w.virtualSize - w.size) > Math.floor(w.snapGrid[w.snapGrid.length - 1]) && w.snapGrid.push(w.virtualSize - w.size)
                }
                0 === w.snapGrid.length && (w.snapGrid = [0]), 0 !== w.params.spaceBetween && w.slides.css(i() ? w.rtl ? {
                    marginLeft: a + "px"
                } : {
                    marginRight: a + "px"
                } : {
                    marginBottom: a + "px"
                }), w.params.watchSlidesProgress && w.updateSlidesOffset()
            }, w.updateSlidesOffset = function() {
                for (var e = 0; e < w.slides.length; e++) w.slides[e].swiperSlideOffset = i() ? w.slides[e].offsetLeft : w.slides[e].offsetTop
            }, w.updateSlidesProgress = function(e) {
                if ("undefined" == typeof e && (e = w.translate || 0), 0 !== w.slides.length) {
                    "undefined" == typeof w.slides[0].swiperSlideOffset && w.updateSlidesOffset();
                    var a = w.params.centeredSlides ? -e + w.size / 2 : -e;
                    w.rtl && (a = w.params.centeredSlides ? e - w.size / 2 : e); {
                        w.container[0].getBoundingClientRect(), i() ? "left" : "top", i() ? "right" : "bottom"
                    }
                    w.slides.removeClass(w.params.slideVisibleClass);
                    for (var t = 0; t < w.slides.length; t++) {
                        var r = w.slides[t],
                            s = w.params.centeredSlides === !0 ? r.swiperSlideSize / 2 : 0,
                            n = (a - r.swiperSlideOffset - s) / (r.swiperSlideSize + w.params.spaceBetween);
                        if (w.params.watchSlidesVisibility) {
                            var o = -(a - r.swiperSlideOffset - s),
                                l = o + w.slidesSizesGrid[t],
                                d = o >= 0 && o < w.size || l > 0 && l <= w.size || 0 >= o && l >= w.size;
                            d && w.slides.eq(t).addClass(w.params.slideVisibleClass)
                        }
                        r.progress = w.rtl ? -n : n
                    }
                }
            }, w.updateProgress = function(e) {
                "undefined" == typeof e && (e = w.translate || 0);
                var a = w.maxTranslate() - w.minTranslate();
                0 === a ? (w.progress = 0, w.isBeginning = w.isEnd = !0) : (w.progress = (e - w.minTranslate()) / a, w.isBeginning = w.progress <= 0, w.isEnd = w.progress >= 1), w.isBeginning && w.emit("onReachBeginning", w), w.isEnd && w.emit("onReachEnd", w), w.params.watchSlidesProgress && w.updateSlidesProgress(e), w.emit("onProgress", w, w.progress)
            }, w.updateActiveIndex = function() {
                var e, a, t, r = w.rtl ? w.translate : -w.translate;
                for (a = 0; a < w.slidesGrid.length; a++) "undefined" != typeof w.slidesGrid[a + 1] ? r >= w.slidesGrid[a] && r < w.slidesGrid[a + 1] - (w.slidesGrid[a + 1] - w.slidesGrid[a]) / 2 ? e = a : r >= w.slidesGrid[a] && r < w.slidesGrid[a + 1] && (e = a + 1) : r >= w.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / w.params.slidesPerGroup), t >= w.snapGrid.length && (t = w.snapGrid.length - 1), e !== w.activeIndex && (w.snapIndex = t, w.previousIndex = w.activeIndex, w.activeIndex = e, w.updateClasses())
            }, w.updateClasses = function() {
                w.slides.removeClass(w.params.slideActiveClass + " " + w.params.slideNextClass + " " + w.params.slidePrevClass);
                var e = w.slides.eq(w.activeIndex);
                if (e.addClass(w.params.slideActiveClass), e.next("." + w.params.slideClass).addClass(w.params.slideNextClass), e.prev("." + w.params.slideClass).addClass(w.params.slidePrevClass), w.bullets && w.bullets.length > 0) {
                    w.bullets.removeClass(w.params.bulletActiveClass);
                    var t;
                    w.params.loop ? (t = Math.ceil(w.activeIndex - w.loopedSlides) / w.params.slidesPerGroup, t > w.slides.length - 1 - 2 * w.loopedSlides && (t -= w.slides.length - 2 * w.loopedSlides), t > w.bullets.length - 1 && (t -= w.bullets.length)) : t = "undefined" != typeof w.snapIndex ? w.snapIndex : w.activeIndex || 0, w.paginationContainer.length > 1 ? w.bullets.each(function() {
                        a(this).index() === t && a(this).addClass(w.params.bulletActiveClass)
                    }) : w.bullets.eq(t).addClass(w.params.bulletActiveClass)
                }
                w.params.loop || (w.params.prevButton && (w.isBeginning ? (a(w.params.prevButton).addClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.disable(a(w.params.prevButton))) : (a(w.params.prevButton).removeClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.enable(a(w.params.prevButton)))), w.params.nextButton && (w.isEnd ? (a(w.params.nextButton).addClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.disable(a(w.params.nextButton))) : (a(w.params.nextButton).removeClass(w.params.buttonDisabledClass), w.params.a11y && w.a11y && w.a11y.enable(a(w.params.nextButton)))))
            }, w.updatePagination = function() {
                if (w.params.pagination && w.paginationContainer && w.paginationContainer.length > 0) {
                    for (var e = "", a = w.params.loop ? Math.ceil((w.slides.length - 2 * w.loopedSlides) / w.params.slidesPerGroup) : w.snapGrid.length, t = 0; a > t; t++) e += w.params.paginationBulletRender ? w.params.paginationBulletRender(t, w.params.bulletClass) : "<" + w.params.paginationElement + ' class="' + w.params.bulletClass + '"></' + w.params.paginationElement + ">";
                    w.paginationContainer.html(e), w.bullets = w.paginationContainer.find("." + w.params.bulletClass), w.params.paginationClickable && w.params.a11y && w.a11y && w.a11y.initPagination()
                }
            }, w.update = function(e) {
                function a() {
                    r = Math.min(Math.max(w.translate, w.maxTranslate()), w.minTranslate()), w.setWrapperTranslate(r), w.updateActiveIndex(), w.updateClasses()
                }
                if (w.updateContainerSize(), w.updateSlidesSize(), w.updateProgress(), w.updatePagination(), w.updateClasses(), w.params.scrollbar && w.scrollbar && w.scrollbar.set(), e) {
                    var t, r;
                    w.controller && w.controller.spline && (w.controller.spline = void 0), w.params.freeMode ? a() : (t = ("auto" === w.params.slidesPerView || w.params.slidesPerView > 1) && w.isEnd && !w.params.centeredSlides ? w.slideTo(w.slides.length - 1, 0, !1, !0) : w.slideTo(w.activeIndex, 0, !1, !0), t || a())
                }
            }, w.onResize = function(e) {
                var a = w.params.allowSwipeToPrev,
                    t = w.params.allowSwipeToNext;
                if (w.params.allowSwipeToPrev = w.params.allowSwipeToNext = !0, w.updateContainerSize(), w.updateSlidesSize(), ("auto" === w.params.slidesPerView || w.params.freeMode || e) && w.updatePagination(), w.params.scrollbar && w.scrollbar && w.scrollbar.set(), w.controller && w.controller.spline && (w.controller.spline = void 0), w.params.freeMode) {
                    var r = Math.min(Math.max(w.translate, w.maxTranslate()), w.minTranslate());
                    w.setWrapperTranslate(r), w.updateActiveIndex(), w.updateClasses()
                } else w.updateClasses(), ("auto" === w.params.slidesPerView || w.params.slidesPerView > 1) && w.isEnd && !w.params.centeredSlides ? w.slideTo(w.slides.length - 1, 0, !1, !0) : w.slideTo(w.activeIndex, 0, !1, !0);
                w.params.allowSwipeToPrev = a, w.params.allowSwipeToNext = t
            };
            var y = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? y = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (y = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), w.touchEvents = {
                start: w.support.touch || !w.params.simulateTouch ? "touchstart" : y[0],
                move: w.support.touch || !w.params.simulateTouch ? "touchmove" : y[1],
                end: w.support.touch || !w.params.simulateTouch ? "touchend" : y[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === w.params.touchEventsTarget ? w.container : w.wrapper).addClass("swiper-wp8-" + w.params.direction), w.initEvents = function(e) {
                var t = e ? "off" : "on",
                    r = e ? "removeEventListener" : "addEventListener",
                    i = "container" === w.params.touchEventsTarget ? w.container[0] : w.wrapper[0],
                    n = w.support.touch ? i : document,
                    o = w.params.nested ? !0 : !1;
                w.browser.ie ? (i[r](w.touchEvents.start, w.onTouchStart, !1), n[r](w.touchEvents.move, w.onTouchMove, o), n[r](w.touchEvents.end, w.onTouchEnd, !1)) : (w.support.touch && (i[r](w.touchEvents.start, w.onTouchStart, !1), i[r](w.touchEvents.move, w.onTouchMove, o), i[r](w.touchEvents.end, w.onTouchEnd, !1)), !s.simulateTouch || w.device.ios || w.device.android || (i[r]("mousedown", w.onTouchStart, !1), document[r]("mousemove", w.onTouchMove, o), document[r]("mouseup", w.onTouchEnd, !1))), window[r]("resize", w.onResize), w.params.nextButton && (a(w.params.nextButton)[t]("click", w.onClickNext), w.params.a11y && w.a11y && a(w.params.nextButton)[t]("keydown", w.a11y.onEnterKey)), w.params.prevButton && (a(w.params.prevButton)[t]("click", w.onClickPrev), w.params.a11y && w.a11y && a(w.params.prevButton)[t]("keydown", w.a11y.onEnterKey)), w.params.pagination && w.params.paginationClickable && (a(w.paginationContainer)[t]("click", "." + w.params.bulletClass, w.onClickIndex), w.params.a11y && w.a11y && a(w.paginationContainer)[t]("keydown", "." + w.params.bulletClass, w.a11y.onEnterKey)), (w.params.preventClicks || w.params.preventClicksPropagation) && i[r]("click", w.preventClicks, !0)
            }, w.attachEvents = function(e) {
                w.initEvents()
            }, w.detachEvents = function() {
                w.initEvents(!0)
            }, w.allowClick = !0, w.preventClicks = function(e) {
                w.allowClick || (w.params.preventClicks && e.preventDefault(), w.params.preventClicksPropagation && w.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, w.onClickNext = function(e) {
                e.preventDefault(), (!w.isEnd || w.params.loop) && w.slideNext()
            }, w.onClickPrev = function(e) {
                e.preventDefault(), (!w.isBeginning || w.params.loop) && w.slidePrev()
            }, w.onClickIndex = function(e) {
                e.preventDefault();
                var t = a(this).index() * w.params.slidesPerGroup;
                w.params.loop && (t += w.loopedSlides), w.slideTo(t)
            }, w.updateClickedSlide = function(e) {
                var t = l(e, "." + w.params.slideClass),
                    r = !1;
                if (t)
                    for (var s = 0; s < w.slides.length; s++) w.slides[s] === t && (r = !0);
                if (!t || !r) return w.clickedSlide = void 0, void(w.clickedIndex = void 0);
                if (w.clickedSlide = t, w.clickedIndex = a(t).index(), w.params.slideToClickedSlide && void 0 !== w.clickedIndex && w.clickedIndex !== w.activeIndex) {
                    var i, n = w.clickedIndex;
                    if (w.params.loop)
                        if (i = a(w.clickedSlide).attr("data-swiper-slide-index"), n > w.slides.length - w.params.slidesPerView) w.fixLoop(), n = w.wrapper.children("." + w.params.slideClass + '[data-swiper-slide-index="' + i + '"]').eq(0).index(), setTimeout(function() {
                            w.slideTo(n)
                        }, 0);
                        else if (n < w.params.slidesPerView - 1) {
                        w.fixLoop();
                        var o = w.wrapper.children("." + w.params.slideClass + '[data-swiper-slide-index="' + i + '"]');
                        n = o.eq(o.length - 1).index(), setTimeout(function() {
                            w.slideTo(n)
                        }, 0)
                    } else w.slideTo(n);
                    else w.slideTo(n)
                }
            };
            var b, x, T, S, C, M, E, P, z, I = "input, select, textarea, button",
                k = Date.now(),
                L = [];
            w.animating = !1, w.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var D, B;
            if (w.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), D = "touchstart" === e.type, D || !("which" in e) || 3 !== e.which) {
                        if (w.params.noSwiping && l(e, "." + w.params.noSwipingClass)) return void(w.allowClick = !0);
                        if (!w.params.swipeHandler || l(e, w.params.swipeHandler)) {
                            if (b = !0, x = !1, S = void 0, B = void 0, w.touches.startX = w.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, w.touches.startY = w.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, T = Date.now(), w.allowClick = !0, w.updateContainerSize(), w.swipeDirection = void 0, w.params.threshold > 0 && (E = !1), "touchstart" !== e.type) {
                                var t = !0;
                                a(e.target).is(I) && (t = !1), document.activeElement && a(document.activeElement).is(I) && document.activeElement.blur(), t && e.preventDefault()
                            }
                            w.emit("onTouchStart", w, e)
                        }
                    }
                }, w.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !(D && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                        if (w.params.onlyExternal) return w.allowClick = !1, void(b && (w.touches.startX = w.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, w.touches.startY = w.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, T = Date.now()));
                        if (D && document.activeElement && e.target === document.activeElement && a(e.target).is(I)) return x = !0, void(w.allowClick = !1);
                        if (w.emit("onTouchMove", w, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (w.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, w.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof S) {
                                var t = 180 * Math.atan2(Math.abs(w.touches.currentY - w.touches.startY), Math.abs(w.touches.currentX - w.touches.startX)) / Math.PI;
                                S = i() ? t > w.params.touchAngle : 90 - t > w.params.touchAngle
                            }
                            if (S && w.emit("onTouchMoveOpposite", w, e), "undefined" == typeof B && w.browser.ieTouch && (w.touches.currentX !== w.touches.startX || w.touches.currentY !== w.touches.startY) && (B = !0), b) {
                                if (S) return void(b = !1);
                                if (B || !w.browser.ieTouch) {
                                    w.allowClick = !1, w.emit("onSliderMove", w, e), e.preventDefault(), w.params.touchMoveStopPropagation && !w.params.nested && e.stopPropagation(), x || (s.loop && w.fixLoop(), M = w.getWrapperTranslate(), w.setWrapperTransition(0), w.animating && w.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), w.params.autoplay && w.autoplaying && (w.params.autoplayDisableOnInteraction ? w.stopAutoplay() : w.pauseAutoplay()), z = !1, w.params.grabCursor && (w.container[0].style.cursor = "move", w.container[0].style.cursor = "-webkit-grabbing", w.container[0].style.cursor = "-moz-grabbin", w.container[0].style.cursor = "grabbing")), x = !0;
                                    var r = w.touches.diff = i() ? w.touches.currentX - w.touches.startX : w.touches.currentY - w.touches.startY;
                                    r *= w.params.touchRatio, w.rtl && (r = -r), w.swipeDirection = r > 0 ? "prev" : "next", C = r + M;
                                    var n = !0;
                                    if (r > 0 && C > w.minTranslate() ? (n = !1, w.params.resistance && (C = w.minTranslate() - 1 + Math.pow(-w.minTranslate() + M + r, w.params.resistanceRatio))) : 0 > r && C < w.maxTranslate() && (n = !1, w.params.resistance && (C = w.maxTranslate() + 1 - Math.pow(w.maxTranslate() - M - r, w.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !0), !w.params.allowSwipeToNext && "next" === w.swipeDirection && M > C && (C = M), !w.params.allowSwipeToPrev && "prev" === w.swipeDirection && C > M && (C = M), w.params.followFinger) {
                                        if (w.params.threshold > 0) {
                                            if (!(Math.abs(r) > w.params.threshold || E)) return void(C = M);
                                            if (!E) return E = !0, w.touches.startX = w.touches.currentX, w.touches.startY = w.touches.currentY, C = M, void(w.touches.diff = i() ? w.touches.currentX - w.touches.startX : w.touches.currentY - w.touches.startY)
                                        }(w.params.freeMode || w.params.watchSlidesProgress) && w.updateActiveIndex(), w.params.freeMode && (0 === L.length && L.push({
                                            position: w.touches[i() ? "startX" : "startY"],
                                            time: T
                                        }), L.push({
                                            position: w.touches[i() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), w.updateProgress(C), w.setWrapperTranslate(C)
                                    }
                                }
                            }
                        }
                    }
                }, w.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), w.emit("onTouchEnd", w, e), b) {
                        w.params.grabCursor && x && b && (w.container[0].style.cursor = "move", w.container[0].style.cursor = "-webkit-grab", w.container[0].style.cursor = "-moz-grab", w.container[0].style.cursor = "grab");
                        var t = Date.now(),
                            r = t - T;
                        if (w.allowClick && (w.updateClickedSlide(e), w.emit("onTap", w, e), 300 > r && t - k > 300 && (P && clearTimeout(P), P = setTimeout(function() {
                                w && (w.params.paginationHide && w.paginationContainer.length > 0 && !a(e.target).hasClass(w.params.bulletClass) && w.paginationContainer.toggleClass(w.params.paginationHiddenClass), w.emit("onClick", w, e))
                            }, 300)), 300 > r && 300 > t - k && (P && clearTimeout(P), w.emit("onDoubleTap", w, e))), k = Date.now(), setTimeout(function() {
                                w && (w.allowClick = !0)
                            }, 0), !b || !x || !w.swipeDirection || 0 === w.touches.diff || C === M) return void(b = x = !1);
                        b = x = !1;
                        var s;
                        if (s = w.params.followFinger ? w.rtl ? w.translate : -w.translate : -C, w.params.freeMode) {
                            if (s < -w.minTranslate()) return void w.slideTo(w.activeIndex);
                            if (s > -w.maxTranslate()) return void w.slideTo(w.slides.length < w.snapGrid.length ? w.snapGrid.length - 1 : w.slides.length - 1);
                            if (w.params.freeModeMomentum) {
                                if (L.length > 1) {
                                    var i = L.pop(),
                                        n = L.pop(),
                                        o = i.position - n.position,
                                        l = i.time - n.time;
                                    w.velocity = o / l, w.velocity = w.velocity / 2, Math.abs(w.velocity) < .02 && (w.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (w.velocity = 0)
                                } else w.velocity = 0;
                                L.length = 0;
                                var d = 1e3 * w.params.freeModeMomentumRatio,
                                    p = w.velocity * d,
                                    u = w.translate + p;
                                w.rtl && (u = -u);
                                var c, m = !1,
                                    f = 20 * Math.abs(w.velocity) * w.params.freeModeMomentumBounceRatio;
                                if (u < w.maxTranslate()) w.params.freeModeMomentumBounce ? (u + w.maxTranslate() < -f && (u = w.maxTranslate() - f), c = w.maxTranslate(), m = !0, z = !0) : u = w.maxTranslate();
                                else if (u > w.minTranslate()) w.params.freeModeMomentumBounce ? (u - w.minTranslate() > f && (u = w.minTranslate() + f), c = w.minTranslate(), m = !0, z = !0) : u = w.minTranslate();
                                else if (w.params.freeModeSticky) {
                                    var h, g = 0;
                                    for (g = 0; g < w.snapGrid.length; g += 1)
                                        if (w.snapGrid[g] > -u) {
                                            h = g;
                                            break
                                        }
                                    u = Math.abs(w.snapGrid[h] - u) < Math.abs(w.snapGrid[h - 1] - u) || "next" === w.swipeDirection ? w.snapGrid[h] : w.snapGrid[h - 1], w.rtl || (u = -u)
                                }
                                if (0 !== w.velocity) d = Math.abs(w.rtl ? (-u - w.translate) / w.velocity : (u - w.translate) / w.velocity);
                                else if (w.params.freeModeSticky) return void w.slideReset();
                                w.params.freeModeMomentumBounce && m ? (w.updateProgress(c), w.setWrapperTransition(d), w.setWrapperTranslate(u), w.onTransitionStart(), w.animating = !0, w.wrapper.transitionEnd(function() {
                                    w && z && (w.emit("onMomentumBounce", w), w.setWrapperTransition(w.params.speed), w.setWrapperTranslate(c), w.wrapper.transitionEnd(function() {
                                        w && w.onTransitionEnd()
                                    }))
                                })) : w.velocity ? (w.updateProgress(u), w.setWrapperTransition(d), w.setWrapperTranslate(u), w.onTransitionStart(), w.animating || (w.animating = !0, w.wrapper.transitionEnd(function() {
                                    w && w.onTransitionEnd()
                                }))) : w.updateProgress(u), w.updateActiveIndex()
                            }
                            return void((!w.params.freeModeMomentum || r >= w.params.longSwipesMs) && (w.updateProgress(), w.updateActiveIndex()))
                        }
                        var v, y = 0,
                            S = w.slidesSizesGrid[0];
                        for (v = 0; v < w.slidesGrid.length; v += w.params.slidesPerGroup) "undefined" != typeof w.slidesGrid[v + w.params.slidesPerGroup] ? s >= w.slidesGrid[v] && s < w.slidesGrid[v + w.params.slidesPerGroup] && (y = v, S = w.slidesGrid[v + w.params.slidesPerGroup] - w.slidesGrid[v]) : s >= w.slidesGrid[v] && (y = v, S = w.slidesGrid[w.slidesGrid.length - 1] - w.slidesGrid[w.slidesGrid.length - 2]);
                        var E = (s - w.slidesGrid[y]) / S;
                        if (r > w.params.longSwipesMs) {
                            if (!w.params.longSwipes) return void w.slideTo(w.activeIndex);
                            "next" === w.swipeDirection && w.slideTo(E >= w.params.longSwipesRatio ? y + w.params.slidesPerGroup : y), "prev" === w.swipeDirection && w.slideTo(E > 1 - w.params.longSwipesRatio ? y + w.params.slidesPerGroup : y)
                        } else {
                            if (!w.params.shortSwipes) return void w.slideTo(w.activeIndex);
                            "next" === w.swipeDirection && w.slideTo(y + w.params.slidesPerGroup), "prev" === w.swipeDirection && w.slideTo(y)
                        }
                    }
                }, w._slideTo = function(e, a) {
                    return w.slideTo(e, a, !0, !0)
                }, w.slideTo = function(e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), w.snapIndex = Math.floor(e / w.params.slidesPerGroup), w.snapIndex >= w.snapGrid.length && (w.snapIndex = w.snapGrid.length - 1);
                    var s = -w.snapGrid[w.snapIndex];
                    if (!w.params.allowSwipeToNext && s < w.translate && s < w.minTranslate()) return !1;
                    if (!w.params.allowSwipeToPrev && s > w.translate && s > w.maxTranslate()) return !1;
                    w.params.autoplay && w.autoplaying && (r || !w.params.autoplayDisableOnInteraction ? w.pauseAutoplay(a) : w.stopAutoplay()), w.updateProgress(s);
                    for (var n = 0; n < w.slidesGrid.length; n++) - Math.floor(100 * s) >= Math.floor(100 * w.slidesGrid[n]) && (e = n);
                    if ("undefined" == typeof a && (a = w.params.speed), w.previousIndex = w.activeIndex || 0, w.activeIndex = e, s === w.translate) return w.updateClasses(), !1;
                    w.updateClasses(), w.onTransitionStart(t);
                    i() ? s : 0, i() ? 0 : s;
                    return 0 === a ? (w.setWrapperTransition(0), w.setWrapperTranslate(s), w.onTransitionEnd(t)) : (w.setWrapperTransition(a), w.setWrapperTranslate(s), w.animating || (w.animating = !0, w.wrapper.transitionEnd(function() {
                        w && w.onTransitionEnd(t)
                    }))), !0
                }, w.onTransitionStart = function(e) {
                    "undefined" == typeof e && (e = !0), w.lazy && w.lazy.onTransitionStart(), e && (w.emit("onTransitionStart", w), w.activeIndex !== w.previousIndex && w.emit("onSlideChangeStart", w))
                }, w.onTransitionEnd = function(e) {
                    w.animating = !1, w.setWrapperTransition(0), "undefined" == typeof e && (e = !0), w.lazy && w.lazy.onTransitionEnd(), e && (w.emit("onTransitionEnd", w), w.activeIndex !== w.previousIndex && w.emit("onSlideChangeEnd", w)), w.params.hashnav && w.hashnav && w.hashnav.setHash()
                }, w.slideNext = function(e, a, t) {
                    if (w.params.loop) {
                        if (w.animating) return !1;
                        w.fixLoop(); {
                            w.container[0].clientLeft
                        }
                        return w.slideTo(w.activeIndex + w.params.slidesPerGroup, a, e, t)
                    }
                    return w.slideTo(w.activeIndex + w.params.slidesPerGroup, a, e, t)
                }, w._slideNext = function(e) {
                    return w.slideNext(!0, e, !0)
                }, w.slidePrev = function(e, a, t) {
                    if (w.params.loop) {
                        if (w.animating) return !1;
                        w.fixLoop(); {
                            w.container[0].clientLeft
                        }
                        return w.slideTo(w.activeIndex - 1, a, e, t)
                    }
                    return w.slideTo(w.activeIndex - 1, a, e, t)
                }, w._slidePrev = function(e) {
                    return w.slidePrev(!0, e, !0)
                }, w.slideReset = function(e, a, t) {
                    return w.slideTo(w.activeIndex, a, e)
                }, w.setWrapperTransition = function(e, a) {
                    w.wrapper.transition(e), "slide" !== w.params.effect && w.effects[w.params.effect] && w.effects[w.params.effect].setTransition(e), w.params.parallax && w.parallax && w.parallax.setTransition(e), w.params.scrollbar && w.scrollbar && w.scrollbar.setTransition(e), w.params.control && w.controller && w.controller.setTransition(e, a), w.emit("onSetTransition", w, e)
                }, w.setWrapperTranslate = function(e, a, t) {
                    var r = 0,
                        s = 0,
                        n = 0;
                    i() ? r = w.rtl ? -e : e : s = e, w.params.virtualTranslate || w.wrapper.transform(w.support.transforms3d ? "translate3d(" + r + "px, " + s + "px, " + n + "px)" : "translate(" + r + "px, " + s + "px)"), w.translate = i() ? r : s, a && w.updateActiveIndex(), "slide" !== w.params.effect && w.effects[w.params.effect] && w.effects[w.params.effect].setTranslate(w.translate), w.params.parallax && w.parallax && w.parallax.setTranslate(w.translate), w.params.scrollbar && w.scrollbar && w.scrollbar.setTranslate(w.translate), w.params.control && w.controller && w.controller.setTranslate(w.translate, t), w.emit("onSetTranslate", w, w.translate)
                }, w.getTranslate = function(e, a) {
                    var t, r, s, i;
                    return "undefined" == typeof a && (a = "x"), w.params.virtualTranslate ? w.rtl ? -w.translate : w.translate : (s = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? i = new window.WebKitCSSMatrix("none" === s.webkitTransform ? "" : s.webkitTransform) : (i = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? i.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === a && (r = window.WebKitCSSMatrix ? i.m42 : parseFloat(16 === t.length ? t[13] : t[5])), w.rtl && r && (r = -r), r || 0)
                }, w.getWrapperTranslate = function(e) {
                    return "undefined" == typeof e && (e = i() ? "x" : "y"), w.getTranslate(w.wrapper[0], e)
                }, w.observers = [], w.initObservers = function() {
                    if (w.params.observeParents)
                        for (var e = w.container.parents(), a = 0; a < e.length; a++) d(e[a]);
                    d(w.container[0], {
                        childList: !1
                    }), d(w.wrapper[0], {
                        attributes: !1
                    })
                }, w.disconnectObservers = function() {
                    for (var e = 0; e < w.observers.length; e++) w.observers[e].disconnect();
                    w.observers = []
                }, w.createLoop = function() {
                    w.wrapper.children("." + w.params.slideClass + "." + w.params.slideDuplicateClass).remove();
                    var e = w.wrapper.children("." + w.params.slideClass);
                    w.loopedSlides = parseInt(w.params.loopedSlides || w.params.slidesPerView, 10), w.loopedSlides = w.loopedSlides + w.params.loopAdditionalSlides, w.loopedSlides > e.length && (w.loopedSlides = e.length);
                    var t, r = [],
                        s = [];
                    for (e.each(function(t, i) {
                            var n = a(this);
                            t < w.loopedSlides && s.push(i), t < e.length && t >= e.length - w.loopedSlides && r.push(i), n.attr("data-swiper-slide-index", t)
                        }), t = 0; t < s.length; t++) w.wrapper.append(a(s[t].cloneNode(!0)).addClass(w.params.slideDuplicateClass));
                    for (t = r.length - 1; t >= 0; t--) w.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(w.params.slideDuplicateClass))
                }, w.destroyLoop = function() {
                    w.wrapper.children("." + w.params.slideClass + "." + w.params.slideDuplicateClass).remove(), w.slides.removeAttr("data-swiper-slide-index")
                }, w.fixLoop = function() {
                    var e;
                    w.activeIndex < w.loopedSlides ? (e = w.slides.length - 3 * w.loopedSlides + w.activeIndex, e += w.loopedSlides, w.slideTo(e, 0, !1, !0)) : ("auto" === w.params.slidesPerView && w.activeIndex >= 2 * w.loopedSlides || w.activeIndex > w.slides.length - 2 * w.params.slidesPerView) && (e = -w.slides.length + w.activeIndex + w.loopedSlides, e += w.loopedSlides, w.slideTo(e, 0, !1, !0))
                }, w.appendSlide = function(e) {
                    if (w.params.loop && w.destroyLoop(), "object" == typeof e && e.length)
                        for (var a = 0; a < e.length; a++) e[a] && w.wrapper.append(e[a]);
                    else w.wrapper.append(e);
                    w.params.loop && w.createLoop(), w.params.observer && w.support.observer || w.update(!0)
                }, w.prependSlide = function(e) {
                    w.params.loop && w.destroyLoop();
                    var a = w.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && w.wrapper.prepend(e[t]);
                        a = w.activeIndex + e.length
                    } else w.wrapper.prepend(e);
                    w.params.loop && w.createLoop(), w.params.observer && w.support.observer || w.update(!0), w.slideTo(a, 0, !1)
                }, w.removeSlide = function(e) {
                    w.params.loop && (w.destroyLoop(), w.slides = w.wrapper.children("." + w.params.slideClass));
                    var a, t = w.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++) a = e[r], w.slides[a] && w.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, w.slides[a] && w.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    w.params.loop && w.createLoop(), w.params.observer && w.support.observer || w.update(!0), w.params.loop ? w.slideTo(t + w.loopedSlides, 0, !1) : w.slideTo(t, 0, !1)
                }, w.removeAllSlides = function() {
                    for (var e = [], a = 0; a < w.slides.length; a++) e.push(a);
                    w.removeSlide(e)
                }, w.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < w.slides.length; e++) {
                                var a = w.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    r = -t;
                                w.params.virtualTranslate || (r -= w.translate);
                                var s = 0;
                                i() || (s = r, r = 0);
                                var n = w.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({
                                    opacity: n
                                }).transform("translate3d(" + r + "px, " + s + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            if (w.slides.transition(e), w.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                w.slides.transitionEnd(function() {
                                    if (!a && w) {
                                        a = !0, w.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) w.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            w.params.cube.shadow && (i() ? (e = w.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), w.wrapper.append(e)), e.css({
                                height: w.width + "px"
                            })) : (e = w.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), w.container.append(e))));
                            for (var r = 0; r < w.slides.length; r++) {
                                var s = w.slides.eq(r),
                                    n = 90 * r,
                                    o = Math.floor(n / 360);
                                w.rtl && (n = -n, o = Math.floor(-n / 360));
                                var l = Math.max(Math.min(s[0].progress, 1), -1),
                                    d = 0,
                                    p = 0,
                                    u = 0;
                                r % 4 === 0 ? (d = 4 * -o * w.size, u = 0) : (r - 1) % 4 === 0 ? (d = 0, u = 4 * -o * w.size) : (r - 2) % 4 === 0 ? (d = w.size + 4 * o * w.size, u = w.size) : (r - 3) % 4 === 0 && (d = -w.size, u = 3 * w.size + 4 * w.size * o), w.rtl && (d = -d), i() || (p = d, d = 0);
                                var c = "rotateX(" + (i() ? 0 : -n) + "deg) rotateY(" + (i() ? n : 0) + "deg) translate3d(" + d + "px, " + p + "px, " + u + "px)";
                                if (1 >= l && l > -1 && (t = 90 * r + 90 * l, w.rtl && (t = 90 * -r - 90 * l)), s.transform(c), w.params.cube.slideShadows) {
                                    var m = s.find(i() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        f = s.find(i() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") + '"></div>'), s.append(m)), 0 === f.length && (f = a('<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'), s.append(f)); {
                                        s[0].progress
                                    }
                                    m.length && (m[0].style.opacity = -s[0].progress), f.length && (f[0].style.opacity = s[0].progress)
                                }
                            }
                            if (w.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + w.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + w.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + w.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + w.size / 2 + "px"
                                }), w.params.cube.shadow)
                                if (i()) e.transform("translate3d(0px, " + (w.width / 2 + w.params.cube.shadowOffset) + "px, " + -w.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + w.params.cube.shadowScale + ")");
                                else {
                                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                        v = w.params.cube.shadowScale,
                                        y = w.params.cube.shadowScale / g,
                                        b = w.params.cube.shadowOffset;
                                    e.transform("scale3d(" + v + ", 1, " + y + ") translate3d(0px, " + (w.height / 2 + b) + "px, " + -w.height / 2 / y + "px) rotateX(-90deg)")
                                }
                            var x = w.isSafari || w.isUiWebView ? -w.size / 2 : 0;
                            w.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (i() ? 0 : t) + "deg) rotateY(" + (i() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            w.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), w.params.cube.shadow && !i() && w.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = w.translate, t = i() ? -e + w.width / 2 : -e + w.height / 2, r = i() ? w.params.coverflow.rotate : -w.params.coverflow.rotate, s = w.params.coverflow.depth, n = 0, o = w.slides.length; o > n; n++) {
                                var l = w.slides.eq(n),
                                    d = w.slidesSizesGrid[n],
                                    p = l[0].swiperSlideOffset,
                                    u = (t - p - d / 2) / d * w.params.coverflow.modifier,
                                    c = i() ? r * u : 0,
                                    m = i() ? 0 : r * u,
                                    f = -s * Math.abs(u),
                                    h = i() ? 0 : w.params.coverflow.stretch * u,
                                    g = i() ? w.params.coverflow.stretch * u : 0;
                                Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f = 0), Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0);
                                var v = "translate3d(" + g + "px," + h + "px," + f + "px)  rotateX(" + m + "deg) rotateY(" + c + "deg)";
                                if (l.transform(v), l[0].style.zIndex = -Math.abs(Math.round(u)) + 1, w.params.coverflow.slideShadows) {
                                    var y = l.find(i() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        b = l.find(i() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === y.length && (y = a('<div class="swiper-slide-shadow-' + (i() ? "left" : "top") + '"></div>'), l.append(y)), 0 === b.length && (b = a('<div class="swiper-slide-shadow-' + (i() ? "right" : "bottom") + '"></div>'), l.append(b)), y.length && (y[0].style.opacity = u > 0 ? u : 0), b.length && (b[0].style.opacity = -u > 0 ? -u : 0)
                                }
                            }
                            if (w.browser.ie) {
                                var x = w.wrapper[0].style;
                                x.perspectiveOrigin = t + "px 50%"
                            }
                        },
                        setTransition: function(e) {
                            w.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, w.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== w.slides.length)) {
                            var r = w.slides.eq(e),
                                s = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || s.add(r[0]), 0 !== s.length && s.each(function() {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var s = e.attr("data-background"),
                                    i = e.attr("data-src");
                                w.loadImage(e[0], i || s, !1, function() {
                                    if (s ? (e.css("background-image", "url(" + s + ")"), e.removeAttr("data-background")) : (e.attr("src", i), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), w.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(w.params.slideDuplicateClass)) {
                                            var n = w.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + w.params.slideDuplicateClass + ")");
                                            w.lazy.loadImageInSlide(n.index(), !1)
                                        } else {
                                            var o = w.wrapper.children("." + w.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            w.lazy.loadImageInSlide(o.index(), !1)
                                        }
                                    }
                                    w.emit("onLazyImageReady", w, r[0], e[0])
                                }), w.emit("onLazyImageLoad", w, r[0], e[0])
                            })
                        }
                    },
                    load: function() {
                        var e;
                        if (w.params.watchSlidesVisibility) w.wrapper.children("." + w.params.slideVisibleClass).each(function() {
                            w.lazy.loadImageInSlide(a(this).index())
                        });
                        else if (w.params.slidesPerView > 1)
                            for (e = w.activeIndex; e < w.activeIndex + w.params.slidesPerView; e++) w.slides[e] && w.lazy.loadImageInSlide(e);
                        else w.lazy.loadImageInSlide(w.activeIndex);
                        if (w.params.lazyLoadingInPrevNext)
                            if (w.params.slidesPerView > 1) {
                                for (e = w.activeIndex + w.params.slidesPerView; e < w.activeIndex + w.params.slidesPerView + w.params.slidesPerView; e++) w.slides[e] && w.lazy.loadImageInSlide(e);
                                for (e = w.activeIndex - w.params.slidesPerView; e < w.activeIndex; e++) w.slides[e] && w.lazy.loadImageInSlide(e)
                            } else {
                                var t = w.wrapper.children("." + w.params.slideNextClass);
                                t.length > 0 && w.lazy.loadImageInSlide(t.index());
                                var r = w.wrapper.children("." + w.params.slidePrevClass);
                                r.length > 0 && w.lazy.loadImageInSlide(r.index())
                            }
                    },
                    onTransitionStart: function() {
                        w.params.lazyLoading && (w.params.lazyLoadingOnTransitionStart || !w.params.lazyLoadingOnTransitionStart && !w.lazy.initialImageLoaded) && w.lazy.load()
                    },
                    onTransitionEnd: function() {
                        w.params.lazyLoading && !w.params.lazyLoadingOnTransitionStart && w.lazy.load()
                    }
                }, w.scrollbar = {
                    set: function() {
                        if (w.params.scrollbar) {
                            var e = w.scrollbar;
                            e.track = a(w.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = i() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = w.size / w.virtualSize, e.moveDivider = e.divider * (e.trackSize / w.size), e.dragSize = e.trackSize * e.divider, i() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", w.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (w.params.scrollbar) {
                            var e, a = w.scrollbar,
                                t = (w.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * w.progress, w.rtl && i() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), i() ? (a.drag.transform(w.support.transforms3d ? "translate3d(" + e + "px, 0, 0)" : "translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (a.drag.transform(w.support.transforms3d ? "translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), w.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function(e) {
                        w.params.scrollbar && w.scrollbar.drag.transition(e)
                    }
                }, w.controller = {
                    LinearSpline: function(e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1; {
                            var t, r;
                            this.x.length
                        }
                        this.interpolate = function(e) {
                            return e ? (r = s(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0
                        };
                        var s = function() {
                            var e, a, t;
                            return function(r, s) {
                                for (a = -1, e = r.length; e - a > 1;) r[t = e + a >> 1] <= s ? a = t : e = t;
                                return e
                            }
                        }()
                    },
                    getInterpolateFunction: function(e) {
                        w.controller.spline || (w.controller.spline = w.params.loop ? new w.controller.LinearSpline(w.slidesGrid, e.slidesGrid) : new w.controller.LinearSpline(w.snapGrid, e.snapGrid))
                    },
                    setTranslate: function(e, a) {
                        function r(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -w.translate : w.translate, "slide" === w.params.controlBy && (w.controller.getInterpolateFunction(a), i = -w.controller.spline.interpolate(-e)), i && "container" !== w.params.controlBy || (s = (a.maxTranslate() - a.minTranslate()) / (w.maxTranslate() - w.minTranslate()), i = (e - w.minTranslate()) * s + a.minTranslate()), w.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, w), a.updateActiveIndex()
                        }
                        var s, i, n = w.params.control;
                        if (w.isArray(n))
                            for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && r(n[o]);
                        else n instanceof t && a !== n && r(n)
                    },
                    setTransition: function(e, a) {
                        function r(a) {
                            a.setWrapperTransition(e, w), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                                i && (a.params.loop && "slide" === w.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }
                        var s, i = w.params.control;
                        if (w.isArray(i))
                            for (s = 0; s < i.length; s++) i[s] !== a && i[s] instanceof t && r(i[s]);
                        else i instanceof t && a !== i && r(i)
                    }
                }, w.hashnav = {
                    init: function() {
                        if (w.params.hashnav) {
                            w.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var a = 0, t = 0, r = w.slides.length; r > t; t++) {
                                    var s = w.slides.eq(t),
                                        i = s.attr("data-hash");
                                    if (i === e && !s.hasClass(w.params.slideDuplicateClass)) {
                                        var n = s.index();
                                        w.slideTo(n, a, w.params.runCallbacksOnInit, !0)
                                    }
                                }
                        }
                    },
                    setHash: function() {
                        w.hashnav.initialized && w.params.hashnav && (document.location.hash = w.slides.eq(w.activeIndex).attr("data-hash") || "")
                    }
                }, w.disableKeyboardControl = function() {
                    a(document).off("keydown", p)
                }, w.enableKeyboardControl = function() {
                    a(document).on("keydown", p)
                }, w.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, w.params.mousewheelControl) {
                if (void 0 !== document.onmousewheel && (w.mousewheel.event = "mousewheel"), !w.mousewheel.event) try {
                    new window.WheelEvent("wheel"), w.mousewheel.event = "wheel"
                } catch (G) {}
                w.mousewheel.event || (w.mousewheel.event = "DOMMouseScroll")
            }
            w.disableMousewheelControl = function() {
                return w.mousewheel.event ? (w.container.off(w.mousewheel.event, u), !0) : !1
            }, w.enableMousewheelControl = function() {
                return w.mousewheel.event ? (w.container.on(w.mousewheel.event, u), !0) : !1
            }, w.parallax = {
                setTranslate: function() {
                    w.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        c(this, w.progress)
                    }), w.slides.each(function() {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            c(this, a)
                        })
                    })
                },
                setTransition: function(e) {
                    "undefined" == typeof e && (e = w.params.speed), w.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = a(this),
                            r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r)
                    })
                }
            }, w._plugins = [];
            for (var O in w.plugins) {
                var A = w.plugins[O](w, w.params[O]);
                A && w._plugins.push(A)
            }
            return w.callPlugins = function(e) {
                for (var a = 0; a < w._plugins.length; a++) e in w._plugins[a] && w._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, w.emitterEventListeners = {}, w.emit = function(e) {
                w.params[e] && w.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (w.emitterEventListeners[e])
                    for (a = 0; a < w.emitterEventListeners[e].length; a++) w.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                w.callPlugins && w.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, w.on = function(e, a) {
                return e = m(e), w.emitterEventListeners[e] || (w.emitterEventListeners[e] = []), w.emitterEventListeners[e].push(a), w
            }, w.off = function(e, a) {
                var t;
                if (e = m(e), "undefined" == typeof a) return w.emitterEventListeners[e] = [], w;
                if (w.emitterEventListeners[e] && 0 !== w.emitterEventListeners[e].length) {
                    for (t = 0; t < w.emitterEventListeners[e].length; t++) w.emitterEventListeners[e][t] === a && w.emitterEventListeners[e].splice(t, 1);
                    return w
                }
            }, w.once = function(e, a) {
                e = m(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), w.off(e, t)
                };
                return w.on(e, t), w
            }, w.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(e) {
                    13 === e.keyCode && (a(e.target).is(w.params.nextButton) ? (w.onClickNext(e), w.a11y.notify(w.isEnd ? w.params.lastSlideMessage : w.params.nextSlideMessage)) : a(e.target).is(w.params.prevButton) && (w.onClickPrev(e), w.a11y.notify(w.isBeginning ? w.params.firstSlideMessage : w.params.prevSlideMessage)), a(e.target).is("." + w.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = w.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() {
                    if (w.params.nextButton) {
                        var e = a(w.params.nextButton);
                        w.a11y.makeFocusable(e), w.a11y.addRole(e, "button"), w.a11y.addLabel(e, w.params.nextSlideMessage)
                    }
                    if (w.params.prevButton) {
                        var t = a(w.params.prevButton);
                        w.a11y.makeFocusable(t), w.a11y.addRole(t, "button"), w.a11y.addLabel(t, w.params.prevSlideMessage)
                    }
                    a(w.container).append(w.a11y.liveRegion)
                },
                initPagination: function() {
                    w.params.pagination && w.params.paginationClickable && w.bullets && w.bullets.length && w.bullets.each(function() {
                        var e = a(this);
                        w.a11y.makeFocusable(e), w.a11y.addRole(e, "button"), w.a11y.addLabel(e, w.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function() {
                    w.a11y.liveRegion && w.a11y.liveRegion.length > 0 && w.a11y.liveRegion.remove()
                }
            }, w.init = function() {
                w.params.loop && w.createLoop(), w.updateContainerSize(), w.updateSlidesSize(), w.updatePagination(), w.params.scrollbar && w.scrollbar && w.scrollbar.set(), "slide" !== w.params.effect && w.effects[w.params.effect] && (w.params.loop || w.updateProgress(), w.effects[w.params.effect].setTranslate()), w.params.loop ? w.slideTo(w.params.initialSlide + w.loopedSlides, 0, w.params.runCallbacksOnInit) : (w.slideTo(w.params.initialSlide, 0, w.params.runCallbacksOnInit), 0 === w.params.initialSlide && (w.parallax && w.params.parallax && w.parallax.setTranslate(), w.lazy && w.params.lazyLoading && (w.lazy.load(), w.lazy.initialImageLoaded = !0))), w.attachEvents(), w.params.observer && w.support.observer && w.initObservers(), w.params.preloadImages && !w.params.lazyLoading && w.preloadImages(), w.params.autoplay && w.startAutoplay(), w.params.keyboardControl && w.enableKeyboardControl && w.enableKeyboardControl(), w.params.mousewheelControl && w.enableMousewheelControl && w.enableMousewheelControl(), w.params.hashnav && w.hashnav && w.hashnav.init(), w.params.a11y && w.a11y && w.a11y.init(), w.emit("onInit", w)
            }, w.cleanupStyles = function() {
                w.container.removeClass(w.classNames.join(" ")).removeAttr("style"), w.wrapper.removeAttr("style"), w.slides && w.slides.length && w.slides.removeClass([w.params.slideVisibleClass, w.params.slideActiveClass, w.params.slideNextClass, w.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), w.paginationContainer && w.paginationContainer.length && w.paginationContainer.removeClass(w.params.paginationHiddenClass), w.bullets && w.bullets.length && w.bullets.removeClass(w.params.bulletActiveClass), w.params.prevButton && a(w.params.prevButton).removeClass(w.params.buttonDisabledClass), w.params.nextButton && a(w.params.nextButton).removeClass(w.params.buttonDisabledClass), w.params.scrollbar && w.scrollbar && (w.scrollbar.track && w.scrollbar.track.length && w.scrollbar.track.removeAttr("style"), w.scrollbar.drag && w.scrollbar.drag.length && w.scrollbar.drag.removeAttr("style"))
            }, w.destroy = function(e, a) {
                w.detachEvents(), w.stopAutoplay(), w.params.loop && w.destroyLoop(), a && w.cleanupStyles(), w.disconnectObservers(), w.params.keyboardControl && w.disableKeyboardControl && w.disableKeyboardControl(), w.params.mousewheelControl && w.disableMousewheelControl && w.disableMousewheelControl(), w.params.a11y && w.a11y && w.a11y.destroy(), w.emit("onDestroy"), e !== !1 && (w = null)
            }, w.init(), w
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var e = navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                s = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: t || s || r,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var r = (function() {
            var e = function(e) {
                    var a = this,
                        t = 0;
                    for (t = 0; t < e.length; t++) a[t] = e[t];
                    return a.length = e.length, this
                },
                a = function(a, t) {
                    var r = [],
                        s = 0;
                    if (a && !t && a instanceof e) return a;
                    if (a)
                        if ("string" == typeof a) {
                            var i, n, o = a.trim();
                            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                                var l = "div";
                                for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, s = 0; s < n.childNodes.length; s++) r.push(n.childNodes[s])
                            } else
                                for (i = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], s = 0; s < i.length; s++) i[s] && r.push(i[s])
                        } else if (a.nodeType || a === window || a === document) r.push(a);
                    else if (a.length > 0 && a[0].nodeType)
                        for (s = 0; s < a.length; s++) r.push(a[s]);
                    return new e(r)
                };
            return e.prototype = {
                addClass: function(e) {
                    if ("undefined" == typeof e) return this;
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var r = 0; r < this.length; r++) this[r].classList.add(a[t]);
                    return this
                },
                removeClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var r = 0; r < this.length; r++) this[r].classList.remove(a[t]);
                    return this
                },
                hasClass: function(e) {
                    return this[0] ? this[0].classList.contains(e) : !1
                },
                toggleClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var r = 0; r < this.length; r++) this[r].classList.toggle(a[t]);
                    return this
                },
                attr: function(e, a) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var t = 0; t < this.length; t++)
                        if (2 === arguments.length) this[t].setAttribute(e, a);
                        else
                            for (var r in e) this[t][r] = e[r], this[t].setAttribute(r, e[r]);
                    return this
                },
                removeAttr: function(e) {
                    for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                    return this
                },
                data: function(e, a) {
                    if ("undefined" == typeof a) {
                        if (this[0]) {
                            var t = this[0].getAttribute("data-" + e);
                            return t ? t : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                        }
                        return void 0
                    }
                    for (var r = 0; r < this.length; r++) {
                        var s = this[r];
                        s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = a
                    }
                    return this
                },
                transform: function(e) {
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                    }
                    return this
                },
                transition: function(e) {
                    "string" != typeof e && (e += "ms");
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                    }
                    return this
                },
                on: function(e, t, r, s) {
                    function i(e) {
                        var s = e.target;
                        if (a(s).is(t)) r.call(s, e);
                        else
                            for (var i = a(s).parents(), n = 0; n < i.length; n++) a(i[n]).is(t) && r.call(i[n], e)
                    }
                    var n, o, l = e.split(" ");
                    for (n = 0; n < this.length; n++)
                        if ("function" == typeof t || t === !1)
                            for ("function" == typeof t && (r = arguments[1], s = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], r, s);
                        else
                            for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                                listener: r,
                                liveListener: i
                            }), this[n].addEventListener(l[o], i, s);
                    return this
                },
                off: function(e, a, t, r) {
                    for (var s = e.split(" "), i = 0; i < s.length; i++)
                        for (var n = 0; n < this.length; n++)
                            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(s[i], t, r);
                            else if (this[n].dom7LiveListeners)
                        for (var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(s[i], this[n].dom7LiveListeners[o].liveListener, r);
                    return this
                },
                once: function(e, a, t, r) {
                    function s(n) {
                        t(n), i.off(e, a, s, r)
                    }
                    var i = this;
                    "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), i.on(e, a, s, r)
                },
                trigger: function(e, a) {
                    for (var t = 0; t < this.length; t++) {
                        var r;
                        try {
                            r = new window.CustomEvent(e, {
                                detail: a,
                                bubbles: !0,
                                cancelable: !0
                            })
                        } catch (s) {
                            r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a
                        }
                        this[t].dispatchEvent(r)
                    }
                    return this
                },
                transitionEnd: function(e) {
                    function a(i) {
                        if (i.target === this)
                            for (e.call(this, i), t = 0; t < r.length; t++) s.off(r[t], a)
                    }
                    var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        s = this;
                    if (e)
                        for (t = 0; t < r.length; t++) s.on(r[t], a);
                    return this
                },
                width: function() {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                },
                outerWidth: function(e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                },
                height: function() {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                },
                outerHeight: function(e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                },
                offset: function() {
                    if (this.length > 0) {
                        var e = this[0],
                            a = e.getBoundingClientRect(),
                            t = document.body,
                            r = e.clientTop || t.clientTop || 0,
                            s = e.clientLeft || t.clientLeft || 0,
                            i = window.pageYOffset || e.scrollTop,
                            n = window.pageXOffset || e.scrollLeft;
                        return {
                            top: a.top + i - r,
                            left: a.left + n - s
                        }
                    }
                    return null
                },
                css: function(e, a) {
                    var t;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (t = 0; t < this.length; t++)
                                for (var r in e) this[t].style[r] = e[r];
                            return this
                        }
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (t = 0; t < this.length; t++) this[t].style[e] = a;
                        return this
                    }
                    return this
                },
                each: function(e) {
                    for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                    return this
                },
                html: function(e) {
                    if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                    for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                    return this
                },
                is: function(t) {
                    if (!this[0]) return !1;
                    var r, s;
                    if ("string" == typeof t) {
                        var i = this[0];
                        if (i === document) return t === document;
                        if (i === window) return t === window;
                        if (i.matches) return i.matches(t);
                        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
                        if (i.mozMatchesSelector) return i.mozMatchesSelector(t);
                        if (i.msMatchesSelector) return i.msMatchesSelector(t);
                        for (r = a(t), s = 0; s < r.length; s++)
                            if (r[s] === this[0]) return !0;
                        return !1
                    }
                    if (t === document) return this[0] === document;
                    if (t === window) return this[0] === window;
                    if (t.nodeType || t instanceof e) {
                        for (r = t.nodeType ? [t] : t, s = 0; s < r.length; s++)
                            if (r[s] === this[0]) return !0;
                        return !1
                    }
                    return !1
                },
                index: function() {
                    if (this[0]) {
                        for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
                        return a
                    }
                    return void 0
                },
                eq: function(a) {
                    if ("undefined" == typeof a) return this;
                    var t, r = this.length;
                    return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
                },
                append: function(a) {
                    var t, r;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof a) {
                            var s = document.createElement("div");
                            for (s.innerHTML = a; s.firstChild;) this[t].appendChild(s.firstChild)
                        } else if (a instanceof e)
                        for (r = 0; r < a.length; r++) this[t].appendChild(a[r]);
                    else this[t].appendChild(a);
                    return this
                },
                prepend: function(a) {
                    var t, r;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof a) {
                            var s = document.createElement("div");
                            for (s.innerHTML = a, r = s.childNodes.length - 1; r >= 0; r--) this[t].insertBefore(s.childNodes[r], this[t].childNodes[0])
                        } else if (a instanceof e)
                        for (r = 0; r < a.length; r++) this[t].insertBefore(a[r], this[t].childNodes[0]);
                    else this[t].insertBefore(a, this[t].childNodes[0]);
                    return this
                },
                insertBefore: function(e) {
                    for (var t = a(e), r = 0; r < this.length; r++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]);
                        else if (t.length > 1)
                        for (var s = 0; s < t.length; s++) t[s].parentNode.insertBefore(this[r].cloneNode(!0), t[s])
                },
                insertAfter: function(e) {
                    for (var t = a(e), r = 0; r < this.length; r++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling);
                        else if (t.length > 1)
                        for (var s = 0; s < t.length; s++) t[s].parentNode.insertBefore(this[r].cloneNode(!0), t[s].nextSibling)
                },
                next: function(t) {
                    return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                },
                nextAll: function(t) {
                    var r = [],
                        s = this[0];
                    if (!s) return new e([]);
                    for (; s.nextElementSibling;) {
                        var i = s.nextElementSibling;
                        t ? a(i).is(t) && r.push(i) : r.push(i), s = i
                    }
                    return new e(r)
                },
                prev: function(t) {
                    return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : []);

                },
                prevAll: function(t) {
                    var r = [],
                        s = this[0];
                    if (!s) return new e([]);
                    for (; s.previousElementSibling;) {
                        var i = s.previousElementSibling;
                        t ? a(i).is(t) && r.push(i) : r.push(i), s = i
                    }
                    return new e(r)
                },
                parent: function(e) {
                    for (var t = [], r = 0; r < this.length; r++) e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
                    return a(a.unique(t))
                },
                parents: function(e) {
                    for (var t = [], r = 0; r < this.length; r++)
                        for (var s = this[r].parentNode; s;) e ? a(s).is(e) && t.push(s) : t.push(s), s = s.parentNode;
                    return a(a.unique(t))
                },
                find: function(a) {
                    for (var t = [], r = 0; r < this.length; r++)
                        for (var s = this[r].querySelectorAll(a), i = 0; i < s.length; i++) t.push(s[i]);
                    return new e(t)
                },
                children: function(t) {
                    for (var r = [], s = 0; s < this.length; s++)
                        for (var i = this[s].childNodes, n = 0; n < i.length; n++) t ? 1 === i[n].nodeType && a(i[n]).is(t) && r.push(i[n]) : 1 === i[n].nodeType && r.push(i[n]);
                    return new e(a.unique(r))
                },
                remove: function() {
                    for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                },
                add: function() {
                    var e, t, r = this;
                    for (e = 0; e < arguments.length; e++) {
                        var s = a(arguments[e]);
                        for (t = 0; t < s.length; t++) r[r.length] = s[t], r.length++
                    }
                    return r
                }
            }, a.fn = e.prototype, a.unique = function(e) {
                for (var a = [], t = 0; t < e.length; t++) - 1 === a.indexOf(e[t]) && a.push(e[t]);
                return a
            }, a
        }()), s = ["jQuery", "Zepto", "Dom7"], i = 0; i < s.length; i++) window[s[i]] && e(window[s[i]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this)
                for (e.call(this, i), t = 0; t < r.length; t++) s.off(r[t], a)
        }
        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            s = this;
        if (e)
            for (t = 0; t < r.length; t++) s.on(r[t], a);
        return this
    }), "transform" in n.fn || (n.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
});
//# sourceMappingURL=maps/swiper.min.js.map
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.$element.is(":visible") ? (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized"))) : !1 : !1
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), c = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
            return b > h - e && h + e > b ? d = a : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), -1 === d
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
        var e = this._items.length,
            f = c ? 0 : this._clones.length;
        return !a.isNumeric(b) || 1 > e ? b = d : (0 > b || b >= e + f) && (b = ((b - f / 2) % e + e) % e + f / 2), b
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c = this.settings,
            d = this._coordinates.length,
            e = Math.abs(this._coordinates[d - 1]) - this._width,
            f = -1;
        if (c.loop) d = this._clones.length / 2 + this._items.length - 1;
        else if (c.autoWidth || c.merge)
            for (; d - f > 1;) Math.abs(this._coordinates[b = d + f >> 1]) < e ? f = b : d = b;
        else d = c.center ? this._items.length - 1 : this._items.length - c.items;
        return a && (d -= this._clones.length / 2), Math.max(d, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (0 > e),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && i >= d - e && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.leave("animating"), void this.trigger("translated"))
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f)), h), f++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c);
        heights = [], maxheight = 0, a.each(d, function(b, c) {
            heights.push(a(c).height())
        }), maxheight = Math.max.apply(null, heights), this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="http://www.youtube.com/embed/' + f.id + "?autoplay=1&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type && (c = '<iframe src="http://player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name && (this._core.settings.autoplay ? this.play() : this.stop())
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function(d, e) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._interval = b.setInterval(a.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout))
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (b.clearInterval(this._interval), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; e > a; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : 0 > b && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            return g[b] !== d ? (e = c ? b : !0, !1) : void 0
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
/*!
 * The Final Countdown for jQuery v2.0.4 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2014 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";

    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(h)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);
        throw new Error("Couldn't cast `" + a + "` to a date object.")
    }

    function c(a) {
        var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(b)
    }

    function d(a) {
        return function(b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d)
                for (var f = 0, g = d.length; g > f; ++f) {
                    var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        j = c(h[0]),
                        k = h[1] || "",
                        l = h[3] || "",
                        m = null;
                    h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && 10 > m && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
                }
            return b = b.replace(/%%/, "%")
        }
    }

    function e(a, b) {
        var c = "s",
            d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), 1 === Math.abs(b) ? d : c
    }
    var f = 100,
        g = [],
        h = [];
    h.push(/^[0-9]*$/.source), h.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), h.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), h = new RegExp(h.join("|"));
    var i = {
            Y: "years",
            m: "months",
            w: "weeks",
            d: "days",
            D: "totalDays",
            H: "hours",
            M: "minutes",
            S: "seconds"
        },
        j = function(b, c, d) {
            this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.instanceNumber = g.length, g.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)), this.setFinalDate(c), this.start()
        };
    a.extend(j.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(), this.interval = setInterval(function() {
                a.update.call(a)
            }, f)
        },
        stop: function() {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        },
        toggle: function() {
            this.interval ? this.stop() : this.start()
        },
        pause: function() {
            this.stop()
        },
        resume: function() {
            this.start()
        },
        remove: function() {
            this.stop.call(this), g[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        },
        setFinalDate: function(a) {
            this.finalDate = b(a)
        },
        update: function() {
            return 0 === this.$el.closest("html").length ? void this.remove() : (this.totalSecsLeft = this.finalDate.getTime() - (new Date).getTime(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
            }, void(0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update")))
        },
        dispatchEvent: function(b) {
            var c = a.Event(b + ".countdown");
            c.finalDate = this.finalDate, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
        }
    }), a.fn.countdown = function() {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = g[c],
                    e = b[0];
                j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else new j(this, b[0], b[1])
        })
    }
});
/*!
 * @name        image-zoom
 * @author      Matt Hinchliffe <http://maketea.co.uk>
 * @modified    Monday, March 16th, 2015
 * @version     2.3.0
 */
! function(a) {
    "use strict";

    function b(b, c) {
        this.$target = a(b), this.opts = a.extend({}, i, c, this.$target.data()), void 0 === this.isOpen && this._init()
    }
    var c, d, e, f, g, h, i = {
        loadingNotice: "Loading image",
        errorNotice: "The image could not be loaded",
        errorDuration: 2500,
        preventClicks: !0,
        onShow: a.noop,
        onHide: a.noop,
        onMove: a.noop
    };
    b.prototype._init = function() {
        this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = a('<div class="easyzoom-flyout" />'), this.$notice = a('<div class="easyzoom-notice" />'), this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": a.proxy(this._onMove, this),
            "mouseleave.easyzoom touchend.easyzoom": a.proxy(this._onLeave, this),
            "mouseenter.easyzoom touchstart.easyzoom": a.proxy(this._onEnter, this)
        }), this.opts.preventClicks && this.$target.on("click.easyzoom", function(a) {
            a.preventDefault()
        })
    }, b.prototype.show = function(a, b) {
        var g, h, i, j, k = this;
        return this.isReady ? (this.$target.append(this.$flyout), g = this.$target.width(), h = this.$target.height(), i = this.$flyout.width(), j = this.$flyout.height(), c = this.$zoom.width() - i, d = this.$zoom.height() - j, e = c / g, f = d / h, this.isOpen = !0, this.opts.onShow.call(this), void(a && this._move(a))) : this._loadImage(this.$link.attr("href"), function() {
            (k.isMouseOver || !b) && k.show(a)
        })
    }, b.prototype._onEnter = function(a) {
        var b = a.originalEvent.touches;
        this.isMouseOver = !0, b && 1 != b.length || (a.preventDefault(), this.show(a, !0))
    }, b.prototype._onMove = function(a) {
        this.isOpen && (a.preventDefault(), this._move(a))
    }, b.prototype._onLeave = function() {
        this.isMouseOver = !1, this.isOpen && this.hide()
    }, b.prototype._onLoad = function(a) {
        a.target.width && (this.isReady = !0, this.$notice.detach(), this.$flyout.html(this.$zoom), this.$target.removeClass("is-loading").addClass("is-ready"), a.data.call && a.data())
    }, b.prototype._onError = function() {
        var a = this;
        this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), this.detachNotice = setTimeout(function() {
            a.$notice.detach(), a.detachNotice = null
        }, this.opts.errorDuration)
    }, b.prototype._loadImage = function(b, c) {
        var d = new Image;
        this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), this.$zoom = a(d).on("error", a.proxy(this._onError, this)).on("load", c, a.proxy(this._onLoad, this)), d.style.position = "absolute", d.src = b
    }, b.prototype._move = function(a) {
        if (0 === a.type.indexOf("touch")) {
            var b = a.touches || a.originalEvent.touches;
            g = b[0].pageX, h = b[0].pageY
        } else g = a.pageX || g, h = a.pageY || h;
        var i = this.$target.offset(),
            j = h - i.top,
            k = g - i.left,
            l = Math.ceil(j * f),
            m = Math.ceil(k * e);
        if (0 > m || 0 > l || m > c || l > d) this.hide();
        else {
            var n = -1 * l,
                o = -1 * m;
            this.$zoom.css({
                top: n,
                left: o
            }), this.opts.onMove.call(this, n, o)
        }
    }, b.prototype.hide = function() {
        this.isOpen && (this.$flyout.detach(), this.isOpen = !1, this.opts.onHide.call(this))
    }, b.prototype.swap = function(b, c, d) {
        this.hide(), this.isReady = !1, this.detachNotice && clearTimeout(this.detachNotice), this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), this.$image.attr({
            src: b,
            srcset: a.isArray(d) ? d.join() : d
        }), this.$link.attr("href", c)
    }, b.prototype.teardown = function() {
        this.hide(), this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"), this.detachNotice && clearTimeout(this.detachNotice), delete this.$link, delete this.$zoom, delete this.$image, delete this.$notice, delete this.$flyout, delete this.isOpen, delete this.isReady
    }, a.fn.easyZoom = function(c) {
        return this.each(function() {
            var d = a.data(this, "easyZoom");
            d ? void 0 === d.isOpen && d._init() : a.data(this, "easyZoom", new b(this, c))
        })
    }, "function" == typeof define && define.amd ? define(function() {
        return b
    }) : "undefined" != typeof module && module.exports && (module.exports = b)
}(jQuery);
/*!
 * Masonry PACKAGED v3.3.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

! function(a) {
    function b() {}

    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function(b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
            })
        }

        function e(b, c) {
            a.fn[b] = function(e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h],
                            k = a.data(j, b);
                        if (k)
                            if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                                var l = k[e].apply(k, g);
                                if (void 0 !== l) return l
                            } else f("no such method '" + e + "' for " + b + " instance");
                        else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
                })
            }
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function(a) {
                console.error(a)
            };
            return a.bridget = function(a, b) {
                c(b), e(a, b)
            }, a.bridget
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
}(window),
function(a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b, c
    }
    var c = document.documentElement,
        d = function() {};
    c.addEventListener ? d = function(a, b, c) {
        a.addEventListener(b, c, !1)
    } : c.attachEvent && (d = function(a, c, d) {
        a[c + d] = d.handleEvent ? function() {
            var c = b(a);
            d.handleEvent.call(d, c)
        } : function() {
            var c = b(a);
            d.call(a, c)
        }, a.attachEvent("on" + c, a[c + d])
    });
    var e = function() {};
    c.removeEventListener ? e = function(a, b, c) {
        a.removeEventListener(b, c, !1)
    } : c.detachEvent && (e = function(a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c]
        } catch (d) {
            a[b + c] = void 0
        }
    });
    var f = {
        bind: d,
        unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
}(window),
function() {
    function a() {}

    function b(a, b) {
        for (var c = a.length; c--;)
            if (a[c].listener === b) return c;
        return -1
    }

    function c(a) {
        return function() {
            return this[a].apply(this, arguments)
        }
    }
    var d = a.prototype,
        e = this,
        f = e.EventEmitter;
    d.getListeners = function(a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
        } else b = d[a] || (d[a] = []);
        return b
    }, d.flattenListeners = function(a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c
    }, d.getListenersAsObject = function(a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c
    }, d.addListener = function(a, c) {
        var d, e = this.getListenersAsObject(a),
            f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        })
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
        return this.getListeners(a), this
    }, d.defineEvents = function(a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this
    }, d.removeListener = function(a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
        return this.manipulateListeners(!1, a, b)
    }, d.removeListeners = function(a, b) {
        return this.manipulateListeners(!0, a, b)
    }, d.manipulateListeners = function(a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener,
            g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
            for (d = c.length; d--;) f.call(this, b, c[d]);
        else
            for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this
    }, d.removeEvent = function(a) {
        var b, c = typeof a,
            d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
            for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g)
            if (g.hasOwnProperty(e))
                for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b)
    }, d.setOnceReturnValue = function(a) {
        return this._onceReturnValue = a, this
    }, d._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, d._getEvents = function() {
        return this._events || (this._events = {})
    }, a.noConflict = function() {
        return e.EventEmitter = f, a
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call(this),
    function(a) {
        function b(a) {
            if (a) {
                if ("string" == typeof d[a]) return a;
                a = a.charAt(0).toUpperCase() + a.slice(1);
                for (var b, e = 0, f = c.length; f > e; e++)
                    if (b = c[e] + a, "string" == typeof d[b]) return b
            }
        }
        var c = "Webkit Moz ms Ms O".split(" "),
            d = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return b
        }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
    }(window),
    function(a) {
        function b(a) {
            var b = parseFloat(a),
                c = -1 === a.indexOf("%") && !isNaN(b);
            return c && b
        }

        function c() {}

        function d() {
            for (var a = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, b = 0, c = g.length; c > b; b++) {
                var d = g[b];
                a[d] = 0
            }
            return a
        }

        function e(c) {
            function e() {
                if (!m) {
                    m = !0;
                    var d = a.getComputedStyle;
                    if (j = function() {
                            var a = d ? function(a) {
                                return d(a, null)
                            } : function(a) {
                                return a.currentStyle
                            };
                            return function(b) {
                                var c = a(b);
                                return c || f("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
                            }
                        }(), k = c("boxSizing")) {
                        var e = document.createElement("div");
                        e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                        var g = document.body || document.documentElement;
                        g.appendChild(e);
                        var h = j(e);
                        l = 200 === b(h.width), g.removeChild(e)
                    }
                }
            }

            function h(a) {
                if (e(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                    var c = j(a);
                    if ("none" === c.display) return d();
                    var f = {};
                    f.width = a.offsetWidth, f.height = a.offsetHeight;
                    for (var h = f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k]), m = 0, n = g.length; n > m; m++) {
                        var o = g[m],
                            p = c[o];
                        p = i(a, p);
                        var q = parseFloat(p);
                        f[o] = isNaN(q) ? 0 : q
                    }
                    var r = f.paddingLeft + f.paddingRight,
                        s = f.paddingTop + f.paddingBottom,
                        t = f.marginLeft + f.marginRight,
                        u = f.marginTop + f.marginBottom,
                        v = f.borderLeftWidth + f.borderRightWidth,
                        w = f.borderTopWidth + f.borderBottomWidth,
                        x = h && l,
                        y = b(c.width);
                    y !== !1 && (f.width = y + (x ? 0 : r + v));
                    var z = b(c.height);
                    return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
                }
            }

            function i(b, c) {
                if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
                var d = b.style,
                    e = d.left,
                    f = b.runtimeStyle,
                    g = f && f.left;
                return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
            }
            var j, k, l, m = !1;
            return h
        }
        var f = "undefined" == typeof console ? c : function(a) {
                console.error(a)
            },
            g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property")) : a.getSize = e(a.getStyleProperty)
    }(window),
    function(a) {
        function b(a) {
            "function" == typeof a && (b.isReady ? a() : g.push(a))
        }

        function c(a) {
            var c = "readystatechange" === a.type && "complete" !== f.readyState;
            b.isReady || c || d()
        }

        function d() {
            b.isReady = !0;
            for (var a = 0, c = g.length; c > a; a++) {
                var d = g[a];
                d()
            }
        }

        function e(e) {
            return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b
        }
        var f = a.document,
            g = [];
        b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie)
    }(window),
    function(a) {
        function b(a, b) {
            return a[g](b)
        }

        function c(a) {
            if (!a.parentNode) {
                var b = document.createDocumentFragment();
                b.appendChild(a)
            }
        }

        function d(a, b) {
            c(a);
            for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++)
                if (d[e] === a) return !0;
            return !1
        }

        function e(a, d) {
            return c(a), b(a, d)
        }
        var f, g = function() {
            if (a.matches) return "matches";
            if (a.matchesSelector) return "matchesSelector";
            for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
                var e = b[c],
                    f = e + "MatchesSelector";
                if (a[f]) return f
            }
        }();
        if (g) {
            var h = document.createElement("div"),
                i = b(h, "div");
            f = i ? b : e
        } else f = d;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return f
        }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
    }(Element.prototype),
    function(a, b) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(c, d) {
            return b(a, c, d)
        }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
    }(window, function(a, b, c) {
        var d = {};
        d.extend = function(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }, d.modulo = function(a, b) {
            return (a % b + b) % b
        };
        var e = Object.prototype.toString;
        d.isArray = function(a) {
            return "[object Array]" == e.call(a)
        }, d.makeArray = function(a) {
            var b = [];
            if (d.isArray(a)) b = a;
            else if (a && "number" == typeof a.length)
                for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
            else b.push(a);
            return b
        }, d.indexOf = Array.prototype.indexOf ? function(a, b) {
            return a.indexOf(b)
        } : function(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b) return c;
            return -1
        }, d.removeFrom = function(a, b) {
            var c = d.indexOf(a, b); - 1 != c && a.splice(c, 1)
        }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
            return a instanceof HTMLElement
        } : function(a) {
            return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
        }, d.setText = function() {
            function a(a, c) {
                b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c
            }
            var b;
            return a
        }(), d.getParent = function(a, b) {
            for (; a != document.body;)
                if (a = a.parentNode, c(a, b)) return a
        }, d.getQueryElement = function(a) {
            return "string" == typeof a ? document.querySelector(a) : a
        }, d.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, d.filterFindElements = function(a, b) {
            a = d.makeArray(a);
            for (var e = [], f = 0, g = a.length; g > f; f++) {
                var h = a[f];
                if (d.isElement(h))
                    if (b) {
                        c(h, b) && e.push(h);
                        for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
                    } else e.push(h)
            }
            return e
        }, d.debounceMethod = function(a, b, c) {
            var d = a.prototype[b],
                e = b + "Timeout";
            a.prototype[b] = function() {
                var a = this[e];
                a && clearTimeout(a);
                var b = arguments,
                    f = this;
                this[e] = setTimeout(function() {
                    d.apply(f, b), delete f[e]
                }, c || 100)
            }
        }, d.toDashed = function(a) {
            return a.replace(/(.)([A-Z])/g, function(a, b, c) {
                return b + "-" + c
            }).toLowerCase()
        };
        var f = a.console;
        return d.htmlInit = function(c, e) {
            b(function() {
                for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
                    var k, l = g[i],
                        m = l.getAttribute(h);
                    try {
                        k = m && JSON.parse(m)
                    } catch (n) {
                        f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
                        continue
                    }
                    var o = new c(l, k),
                        p = a.jQuery;
                    p && p.data(l, e, o)
                }
            })
        }, d
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(c, d, e, f) {
            return b(a, c, d, e, f)
        }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
    }(window, function(a, b, c, d, e) {
        function f(a) {
            for (var b in a) return !1;
            return b = null, !0
        }

        function g(a, b) {
            a && (this.element = a, this.layout = b, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }
        var h = a.getComputedStyle,
            i = h ? function(a) {
                return h(a, null)
            } : function(a) {
                return a.currentStyle
            },
            j = d("transition"),
            k = d("transform"),
            l = j && k,
            m = !!d("perspective"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[j],
            o = ["transform", "transition", "transitionDuration", "transitionProperty"],
            p = function() {
                for (var a = {}, b = 0, c = o.length; c > b; b++) {
                    var e = o[b],
                        f = d(e);
                    f && f !== e && (a[e] = f)
                }
                return a
            }();
        e.extend(g.prototype, b.prototype), g.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, g.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, g.prototype.getSize = function() {
            this.size = c(this.element)
        }, g.prototype.css = function(a) {
            var b = this.element.style;
            for (var c in a) {
                var d = p[c] || c;
                b[d] = a[c]
            }
        }, g.prototype.getPosition = function() {
            var a = i(this.element),
                b = this.layout.options,
                c = b.isOriginLeft,
                d = b.isOriginTop,
                e = parseInt(a[c ? "left" : "right"], 10),
                f = parseInt(a[d ? "top" : "bottom"], 10);
            e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
            var g = this.layout.size;
            e -= c ? g.paddingLeft : g.paddingRight, f -= d ? g.paddingTop : g.paddingBottom, this.position.x = e, this.position.y = f
        }, g.prototype.layoutPosition = function() {
            var a = this.layout.size,
                b = this.layout.options,
                c = {},
                d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
                e = b.isOriginLeft ? "left" : "right",
                f = b.isOriginLeft ? "right" : "left",
                g = this.position.x + a[d];
            g = b.percentPosition && !b.isHorizontal ? g / a.width * 100 + "%" : g + "px", c[e] = g, c[f] = "";
            var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
                i = b.isOriginTop ? "top" : "bottom",
                j = b.isOriginTop ? "bottom" : "top",
                k = this.position.y + a[h];
            k = b.percentPosition && b.isHorizontal ? k / a.height * 100 + "%" : k + "px", c[i] = k, c[j] = "", this.css(c), this.emitEvent("layout", [this])
        };
        var q = m ? function(a, b) {
            return "translate3d(" + a + "px, " + b + "px, 0)"
        } : function(a, b) {
            return "translate(" + a + "px, " + b + "px)"
        };
        g.prototype._transitionTo = function(a, b) {
            this.getPosition();
            var c = this.position.x,
                d = this.position.y,
                e = parseInt(a, 10),
                f = parseInt(b, 10),
                g = e === this.position.x && f === this.position.y;
            if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
            var h = a - c,
                i = b - d,
                j = {},
                k = this.layout.options;
            h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = q(h, i), this.transition({
                to: j,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, g.prototype.goTo = function(a, b) {
            this.setPosition(a, b), this.layoutPosition()
        }, g.prototype.moveTo = l ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function(a, b) {
            this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
        }, g.prototype._nonTransition = function(a) {
            this.css(a.to), a.isCleaning && this._removeStyles(a.to);
            for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
        }, g.prototype._transition = function(a) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
            var b = this._transn;
            for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
            for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
            if (a.from) {
                this.css(a.from);
                var d = this.element.offsetHeight;
                d = null
            }
            this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
        };
        var r = k && e.toDashed(k) + ",opacity";
        g.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: r,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(n, this, !1))
        }, g.prototype.transition = g.prototype[j ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function(a) {
            this.ontransitionend(a)
        }, g.prototype.onotransitionend = function(a) {
            this.ontransitionend(a)
        };
        var s = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        g.prototype.ontransitionend = function(a) {
            if (a.target === this.element) {
                var b = this._transn,
                    c = s[a.propertyName] || a.propertyName;
                if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
                    var d = b.onEnd[c];
                    d.call(this), delete b.onEnd[c]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, g.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(n, this, !1), this.isTransitioning = !1
        }, g.prototype._removeStyles = function(a) {
            var b = {};
            for (var c in a) b[c] = "";
            this.css(b)
        };
        var t = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return g.prototype.removeTransitionStyles = function() {
            this.css(t)
        }, g.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, g.prototype.remove = function() {
            if (!j || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var a = this;
            this.once("transitionEnd", function() {
                a.removeElem()
            }), this.hide()
        }, g.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var a = this.layout.options,
                b = {},
                c = this.getHideRevealTransitionEndProperty("visibleStyle");
            b[c] = this.onRevealTransitionEnd, this.transition({
                from: a.hiddenStyle,
                to: a.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: b
            })
        }, g.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, g.prototype.getHideRevealTransitionEndProperty = function(a) {
            var b = this.layout.options[a];
            if (b.opacity) return "opacity";
            for (var c in b) return c
        }, g.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var a = this.layout.options,
                b = {},
                c = this.getHideRevealTransitionEndProperty("hiddenStyle");
            b[c] = this.onHideTransitionEnd, this.transition({
                from: a.visibleStyle,
                to: a.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: b
            })
        }, g.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, g.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, g
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(c, d, e, f, g) {
            return b(a, c, d, e, f, g)
        }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
    }(window, function(a, b, c, d, e, f) {
        function g(a, b) {
            var c = e.getQueryElement(a);
            if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
            this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);
            var d = ++k;
            this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var h = a.console,
            i = a.jQuery,
            j = function() {},
            k = 0,
            l = {};
        return g.namespace = "outlayer", g.Item = f, g.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, e.extend(g.prototype, c.prototype), g.prototype.option = function(a) {
            e.extend(this.options, a)
        }, g.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, g.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, g.prototype._itemize = function(a) {
            for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
                var g = b[e],
                    h = new c(g, this);
                d.push(h)
            }
            return d
        }, g.prototype._filterFindItemElements = function(a) {
            return e.filterFindElements(a, this.options.itemSelector)
        }, g.prototype.getItemElements = function() {
            for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
            return a
        }, g.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, a), this._isLayoutInited = !0
        }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
            this.getSize()
        }, g.prototype.getSize = function() {
            this.size = d(this.element)
        }, g.prototype._getMeasurement = function(a, b) {
            var c, f = this.options[a];
            f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0
        }, g.prototype.layoutItems = function(a, b) {
            a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
        }, g.prototype._getItemsForLayout = function(a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                e.isIgnored || b.push(e)
            }
            return b
        }, g.prototype._layoutItems = function(a, b) {
            if (this._emitCompleteOnItems("layout", a), a && a.length) {
                for (var c = [], d = 0, e = a.length; e > d; d++) {
                    var f = a[d],
                        g = this._getItemLayoutPosition(f);
                    g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g)
                }
                this._processLayoutQueue(c)
            }
        }, g.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, g.prototype._processLayoutQueue = function(a) {
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                this._positionItem(d.item, d.x, d.y, d.isInstant)
            }
        }, g.prototype._positionItem = function(a, b, c, d) {
            d ? a.goTo(b, c) : a.moveTo(b, c)
        }, g.prototype._postLayout = function() {
            this.resizeContainer()
        }, g.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var a = this._getContainerSize();
                a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
            }
        }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function(a, b) {
            if (void 0 !== a) {
                var c = this.size;
                c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
            }
        }, g.prototype._emitCompleteOnItems = function(a, b) {
            function c() {
                e.emitEvent(a + "Complete", [b])
            }

            function d() {
                g++, g === f && c()
            }
            var e = this,
                f = b.length;
            if (!b || !f) return void c();
            for (var g = 0, h = 0, i = b.length; i > h; h++) {
                var j = b[h];
                j.once(a, d)
            }
        }, g.prototype.ignore = function(a) {
            var b = this.getItem(a);
            b && (b.isIgnored = !0)
        }, g.prototype.unignore = function(a) {
            var b = this.getItem(a);
            b && delete b.isIgnored
        }, g.prototype.stamp = function(a) {
            if (a = this._find(a)) {
                this.stamps = this.stamps.concat(a);
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    this.ignore(d)
                }
            }
        }, g.prototype.unstamp = function(a) {
            if (a = this._find(a))
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    e.removeFrom(this.stamps, d), this.unignore(d)
                }
        }, g.prototype._find = function(a) {
            return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
        }, g.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var a = 0, b = this.stamps.length; b > a; a++) {
                    var c = this.stamps[a];
                    this._manageStamp(c)
                }
            }
        }, g.prototype._getBoundingRect = function() {
            var a = this.element.getBoundingClientRect(),
                b = this.size;
            this._boundingRect = {
                left: a.left + b.paddingLeft + b.borderLeftWidth,
                top: a.top + b.paddingTop + b.borderTopWidth,
                right: a.right - (b.paddingRight + b.borderRightWidth),
                bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
            }
        }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function(a) {
            var b = a.getBoundingClientRect(),
                c = this._boundingRect,
                e = d(a),
                f = {
                    left: b.left - c.left - e.marginLeft,
                    top: b.top - c.top - e.marginTop,
                    right: c.right - b.right - e.marginRight,
                    bottom: c.bottom - b.bottom - e.marginBottom
                };
            return f
        }, g.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a)
        }, g.prototype.bindResize = function() {
            this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0)
        }, g.prototype.unbindResize = function() {
            this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1
        }, g.prototype.onresize = function() {
            function a() {
                b.resize(), delete b.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var b = this;
            this.resizeTimeout = setTimeout(a, 100)
        }, g.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, g.prototype.needsResizeLayout = function() {
            var a = d(this.element),
                b = this.size && a;
            return b && a.innerWidth !== this.size.innerWidth
        }, g.prototype.addItems = function(a) {
            var b = this._itemize(a);
            return b.length && (this.items = this.items.concat(b)), b
        }, g.prototype.appended = function(a) {
            var b = this.addItems(a);
            b.length && (this.layoutItems(b, !0), this.reveal(b))
        }, g.prototype.prepended = function(a) {
            var b = this._itemize(a);
            if (b.length) {
                var c = this.items.slice(0);
                this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
            }
        }, g.prototype.reveal = function(a) {
            this._emitCompleteOnItems("reveal", a);
            for (var b = a && a.length, c = 0; b && b > c; c++) {
                var d = a[c];
                d.reveal()
            }
        }, g.prototype.hide = function(a) {
            this._emitCompleteOnItems("hide", a);
            for (var b = a && a.length, c = 0; b && b > c; c++) {
                var d = a[c];
                d.hide()
            }
        }, g.prototype.revealItemElements = function(a) {
            var b = this.getItems(a);
            this.reveal(b)
        }, g.prototype.hideItemElements = function(a) {
            var b = this.getItems(a);
            this.hide(b)
        }, g.prototype.getItem = function(a) {
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                if (d.element === a) return d
            }
        }, g.prototype.getItems = function(a) {
            a = e.makeArray(a);
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var f = a[c],
                    g = this.getItem(f);
                g && b.push(g)
            }
            return b
        }, g.prototype.remove = function(a) {
            var b = this.getItems(a);
            if (this._emitCompleteOnItems("remove", b), b && b.length)
                for (var c = 0, d = b.length; d > c; c++) {
                    var f = b[c];
                    f.remove(), e.removeFrom(this.items, f)
                }
        }, g.prototype.destroy = function() {
            var a = this.element.style;
            a.height = "", a.position = "", a.width = "";
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                d.destroy()
            }
            this.unbindResize();
            var e = this.element.outlayerGUID;
            delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
        }, g.data = function(a) {
            a = e.getQueryElement(a);
            var b = a && a.outlayerGUID;
            return b && l[b]
        }, g.create = function(a, b) {
            function c() {
                g.apply(this, arguments)
            }
            return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function() {
                f.apply(this, arguments)
            }, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
        }, g.Item = f, g
    }),
    function(a, b) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
    }(window, function(a, b, c) {
        var d = a.create("masonry");
        return d.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var a = this.cols;
            for (this.colYs = []; a--;) this.colYs.push(0);
            this.maxY = 0
        }, d.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var a = this.items[0],
                    c = a && a.element;
                this.columnWidth = c && b(c).outerWidth || this.containerWidth
            }
            var d = this.columnWidth += this.gutter,
                e = this.containerWidth + this.gutter,
                f = e / d,
                g = d - e % d,
                h = g && 1 > g ? "round" : "floor";
            f = Math[h](f), this.cols = Math.max(f, 1)
        }, d.prototype.getContainerWidth = function() {
            var a = this.options.isFitWidth ? this.element.parentNode : this.element,
                c = b(a);
            this.containerWidth = c && c.innerWidth
        }, d.prototype._getItemLayoutPosition = function(a) {
            a.getSize();
            var b = a.size.outerWidth % this.columnWidth,
                d = b && 1 > b ? "round" : "ceil",
                e = Math[d](a.size.outerWidth / this.columnWidth);
            e = Math.min(e, this.cols);
            for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
                    x: this.columnWidth * h,
                    y: g
                }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
            return i
        }, d.prototype._getColGroup = function(a) {
            if (2 > a) return this.colYs;
            for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
                var e = this.colYs.slice(d, d + a);
                b[d] = Math.max.apply(Math, e)
            }
            return b
        }, d.prototype._manageStamp = function(a) {
            var c = b(a),
                d = this._getElementOffset(a),
                e = this.options.isOriginLeft ? d.left : d.right,
                f = e + c.outerWidth,
                g = Math.floor(e / this.columnWidth);
            g = Math.max(0, g);
            var h = Math.floor(f / this.columnWidth);
            h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
            for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
        }, d.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var a = {
                height: this.maxY
            };
            return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        }, d.prototype._getContainerFitWidth = function() {
            for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
            return (this.cols - a) * this.columnWidth - this.gutter
        }, d.prototype.needsResizeLayout = function() {
            var a = this.containerWidth;
            return this.getContainerWidth(), a !== this.containerWidth
        }, d
    });
/*!
 * Isotope PACKAGED v2.2.0
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

(function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function n(e, i) {
            t.fn[e] = function(n) {
                if ("string" == typeof n) {
                    for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                        var p = this[a],
                            h = t.data(p, e);
                        if (h)
                            if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
                                var f = h[n].apply(h, s);
                                if (void 0 !== f) return f
                            } else r("no such method '" + n + "' for " + e + " instance");
                        else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var o = t.data(this, e);
                    o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
                })
            }
        }
        if (t) {
            var r = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), n(t, e)
            }, t.bridget
        }
    }
    var o = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : "object" == typeof exports ? i(require("jquery")) : i(t.jQuery)
})(window),
function(t) {
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        o = function() {};
    i.addEventListener ? o = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (o = function(t, i, o) {
        t[i + o] = o.handleEvent ? function() {
            var i = e(t);
            o.handleEvent.call(o, i)
        } : function() {
            var i = e(t);
            o.call(t, i)
        }, t.attachEvent("on" + i, t[i + o])
    });
    var n = function() {};
    i.removeEventListener ? n = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (n = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (o) {
            t[e + i] = void 0
        }
    });
    var r = {
        bind: o,
        unbind: n
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(window),
function() {
    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var o = t.prototype,
        n = this,
        r = n.EventEmitter;
    o.getListeners = function(t) {
        var e, i, o = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
        } else e = o[t] || (o[t] = []);
        return e
    }, o.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, o.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, o.addListener = function(t, i) {
        var o, n = this.getListenersAsObject(t),
            r = "object" == typeof i;
        for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
            listener: i,
            once: !1
        });
        return this
    }, o.on = i("addListener"), o.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, o.once = i("addOnceListener"), o.defineEvent = function(t) {
        return this.getListeners(t), this
    }, o.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, o.removeListener = function(t, i) {
        var o, n, r = this.getListenersAsObject(t);
        for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
        return this
    }, o.off = i("removeListener"), o.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, o.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, o.manipulateListeners = function(t, e, i) {
        var o, n, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--;) r.call(this, e, i[o]);
        else
            for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
        return this
    }, o.removeEvent = function(t) {
        var e, i = typeof t,
            o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
            for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this
    }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
        var i, o, n, r, s = this.getListenersAsObject(t);
        for (n in s)
            if (s.hasOwnProperty(n))
                for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, o.trigger = i("emitEvent"), o.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, o.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, o._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, o._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return n.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : n.EventEmitter = t
}.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof o[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, n = 0, r = i.length; r > n; n++)
                    if (e = i[n] + t, "string" == typeof o[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            o = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t) {
        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function i() {}

        function o() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = s.length; i > e; e++) {
                var o = s[e];
                t[o] = 0
            }
            return t
        }

        function n(i) {
            function n() {
                if (!d) {
                    d = !0;
                    var o = t.getComputedStyle;
                    if (p = function() {
                            var t = o ? function(t) {
                                return o(t, null)
                            } : function(t) {
                                return t.currentStyle
                            };
                            return function(e) {
                                var i = t(e);
                                return i || r("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? " + "See http://bit.ly/getsizebug1"), i
                            }
                        }(), h = i("boxSizing")) {
                        var n = document.createElement("div");
                        n.style.width = "200px", n.style.padding = "1px 2px 3px 4px", n.style.borderStyle = "solid", n.style.borderWidth = "1px 2px 3px 4px", n.style[h] = "border-box";
                        var s = document.body || document.documentElement;
                        s.appendChild(n);
                        var a = p(n);
                        f = 200 === e(a.width), s.removeChild(n)
                    }
                }
            }

            function a(t) {
                if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var i = p(t);
                    if ("none" === i.display) return o();
                    var r = {};
                    r.width = t.offsetWidth, r.height = t.offsetHeight;
                    for (var a = r.isBorderBox = !(!h || !i[h] || "border-box" !== i[h]), d = 0, l = s.length; l > d; d++) {
                        var c = s[d],
                            m = i[c];
                        m = u(t, m);
                        var y = parseFloat(m);
                        r[c] = isNaN(y) ? 0 : y
                    }
                    var g = r.paddingLeft + r.paddingRight,
                        v = r.paddingTop + r.paddingBottom,
                        _ = r.marginLeft + r.marginRight,
                        I = r.marginTop + r.marginBottom,
                        z = r.borderLeftWidth + r.borderRightWidth,
                        L = r.borderTopWidth + r.borderBottomWidth,
                        x = a && f,
                        E = e(i.width);
                    E !== !1 && (r.width = E + (x ? 0 : g + z));
                    var b = e(i.height);
                    return b !== !1 && (r.height = b + (x ? 0 : v + L)), r.innerWidth = r.width - (g + z), r.innerHeight = r.height - (v + L), r.outerWidth = r.width + _, r.outerHeight = r.height + I, r
                }
            }

            function u(e, i) {
                if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
                var o = e.style,
                    n = o.left,
                    r = e.runtimeStyle,
                    s = r && r.left;
                return s && (r.left = e.currentStyle.left), o.left = i, i = o.pixelLeft, o.left = n, s && (r.left = s), i
            }
            var p, h, f, d = !1;
            return a
        }
        var r = "undefined" == typeof console ? i : function(t) {
                console.error(t)
            },
            s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("desandro-get-style-property")) : t.getSize = n(t.getStyleProperty)
    }(window),
    function(t) {
        function e(t) {
            "function" == typeof t && (e.isReady ? t() : s.push(t))
        }

        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== r.readyState;
            e.isReady || i || o()
        }

        function o() {
            e.isReady = !0;
            for (var t = 0, i = s.length; i > t; t++) {
                var o = s[t];
                o()
            }
        }

        function n(n) {
            return "complete" === r.readyState ? o() : (n.bind(r, "DOMContentLoaded", i), n.bind(r, "readystatechange", i), n.bind(t, "load", i)), e
        }
        var r = t.document,
            s = [];
        e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], n) : "object" == typeof exports ? module.exports = n(require("eventie")) : t.docReady = n(t.eventie)
    }(window),
    function(t) {
        function e(t, e) {
            return t[s](e)
        }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function o(t, e) {
            i(t);
            for (var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length; r > n; n++)
                if (o[n] === t) return !0;
            return !1
        }

        function n(t, o) {
            return i(t), e(t, o)
        }
        var r, s = function() {
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, o = e.length; o > i; i++) {
                var n = e[i],
                    r = n + "MatchesSelector";
                if (t[r]) return r
            }
        }();
        if (s) {
            var a = document.createElement("div"),
                u = e(a, "div");
            r = u ? e : n
        } else r = o;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return r
        }) : "object" == typeof exports ? module.exports = r : window.matchesSelector = r
    }(Element.prototype),
    function(t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(i, o) {
            return e(t, i, o)
        }) : "object" == typeof exports ? module.exports = e(t, require("doc-ready"), require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector)
    }(window, function(t, e, i) {
        var o = {};
        o.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }, o.modulo = function(t, e) {
            return (t % e + e) % e
        };
        var n = Object.prototype.toString;
        o.isArray = function(t) {
            return "[object Array]" == n.call(t)
        }, o.makeArray = function(t) {
            var e = [];
            if (o.isArray(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }, o.indexOf = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; o > i; i++)
                if (t[i] === e) return i;
            return -1
        }, o.removeFrom = function(t, e) {
            var i = o.indexOf(t, e); - 1 != i && t.splice(i, 1)
        }, o.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
            return t instanceof HTMLElement
        } : function(t) {
            return t && "object" == typeof t && 1 == t.nodeType && "string" == typeof t.nodeName
        }, o.setText = function() {
            function t(t, i) {
                e = e || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), t[e] = i
            }
            var e;
            return t
        }(), o.getParent = function(t, e) {
            for (; t != document.body;)
                if (t = t.parentNode, i(t, e)) return t
        }, o.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, o.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, o.filterFindElements = function(t, e) {
            t = o.makeArray(t);
            for (var n = [], r = 0, s = t.length; s > r; r++) {
                var a = t[r];
                if (o.isElement(a))
                    if (e) {
                        i(a, e) && n.push(a);
                        for (var u = a.querySelectorAll(e), p = 0, h = u.length; h > p; p++) n.push(u[p])
                    } else n.push(a)
            }
            return n
        }, o.debounceMethod = function(t, e, i) {
            var o = t.prototype[e],
                n = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[n];
                t && clearTimeout(t);
                var e = arguments,
                    r = this;
                this[n] = setTimeout(function() {
                    o.apply(r, e), delete r[n]
                }, i || 100)
            }
        }, o.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var r = t.console;
        return o.htmlInit = function(i, n) {
            e(function() {
                for (var e = o.toDashed(n), s = document.querySelectorAll(".js-" + e), a = "data-" + e + "-options", u = 0, p = s.length; p > u; u++) {
                    var h, f = s[u],
                        d = f.getAttribute(a);
                    try {
                        h = d && JSON.parse(d)
                    } catch (l) {
                        r && r.error("Error parsing " + a + " on " + f.nodeName.toLowerCase() + (f.id ? "#" + f.id : "") + ": " + l);
                        continue
                    }
                    var c = new i(f, h),
                        m = t.jQuery;
                    m && m.data(f, n, c)
                }
            })
        }, o
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(i, o, n, r) {
            return e(t, i, o, n, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (t.Outlayer = {}, t.Outlayer.Item = e(t, t.EventEmitter, t.getSize, t.getStyleProperty, t.fizzyUIUtils))
    }(window, function(t, e, i, o, n) {
        function r(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function s(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }
        var a = t.getComputedStyle,
            u = a ? function(t) {
                return a(t, null)
            } : function(t) {
                return t.currentStyle
            },
            p = o("transition"),
            h = o("transform"),
            f = p && h,
            d = !!o("perspective"),
            l = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[p],
            c = ["transform", "transition", "transitionDuration", "transitionProperty"],
            m = function() {
                for (var t = {}, e = 0, i = c.length; i > e; e++) {
                    var n = c[e],
                        r = o(n);
                    r && r !== n && (t[n] = r)
                }
                return t
            }();
        n.extend(s.prototype, e.prototype), s.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, s.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, s.prototype.getSize = function() {
            this.size = i(this.element)
        }, s.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var o = m[i] || i;
                e[o] = t[i]
            }
        }, s.prototype.getPosition = function() {
            var t = u(this.element),
                e = this.layout.options,
                i = e.isOriginLeft,
                o = e.isOriginTop,
                n = parseInt(t[i ? "left" : "right"], 10),
                r = parseInt(t[o ? "top" : "bottom"], 10);
            n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
            var s = this.layout.size;
            n -= i ? s.paddingLeft : s.paddingRight, r -= o ? s.paddingTop : s.paddingBottom, this.position.x = n, this.position.y = r
        }, s.prototype.layoutPosition = function() {
            var t = this.layout.size,
                e = this.layout.options,
                i = {},
                o = e.isOriginLeft ? "paddingLeft" : "paddingRight",
                n = e.isOriginLeft ? "left" : "right",
                r = e.isOriginLeft ? "right" : "left",
                s = this.position.x + t[o];
            s = e.percentPosition && !e.isHorizontal ? 100 * (s / t.width) + "%" : s + "px", i[n] = s, i[r] = "";
            var a = e.isOriginTop ? "paddingTop" : "paddingBottom",
                u = e.isOriginTop ? "top" : "bottom",
                p = e.isOriginTop ? "bottom" : "top",
                h = this.position.y + t[a];
            h = e.percentPosition && e.isHorizontal ? 100 * (h / t.height) + "%" : h + "px", i[u] = h, i[p] = "", this.css(i), this.emitEvent("layout", [this])
        };
        var y = d ? function(t, e) {
            return "translate3d(" + t + "px, " + e + "px, 0)"
        } : function(t, e) {
            return "translate(" + t + "px, " + e + "px)"
        };
        s.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                o = this.position.y,
                n = parseInt(t, 10),
                r = parseInt(e, 10),
                s = n === this.position.x && r === this.position.y;
            if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
            var a = t - i,
                u = e - o,
                p = {},
                h = this.layout.options;
            a = h.isOriginLeft ? a : -a, u = h.isOriginTop ? u : -u, p.transform = y(a, u), this.transition({
                to: p,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, s.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, s.prototype.moveTo = f ? s.prototype._transitionTo : s.prototype.goTo, s.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, s.prototype._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, s.prototype._transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var o = this.element.offsetHeight;
                o = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var g = h && n.toDashed(h) + ",opacity";
        s.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: g,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(l, this, !1))
        }, s.prototype.transition = s.prototype[p ? "_transition" : "_nonTransition"], s.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, s.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var v = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        s.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = v[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], r(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                    var o = e.onEnd[i];
                    o.call(this), delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, s.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
        }, s.prototype._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var _ = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return s.prototype.removeTransitionStyles = function() {
            this.css(_)
        }, s.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, s.prototype.remove = function() {
            if (!p || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
            var t = this;
            this.once("transitionEnd", function() {
                t.removeElem()
            }), this.hide()
        }, s.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            e[i] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, s.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, s.prototype.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i
        }, s.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            e[i] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, s.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, s.prototype.destroy = function() {
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
    function(t, e) {
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, r, s) {
            return e(t, i, o, n, r, s)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.eventie, t.EventEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, function(t, e, i, o, n, r) {
        function s(t, e) {
            var i = n.getQueryElement(t);
            if (!i) return a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t)), void 0;
            this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
            var o = ++h;
            this.element.outlayerGUID = o, f[o] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var a = t.console,
            u = t.jQuery,
            p = function() {},
            h = 0,
            f = {};
        return s.namespace = "outlayer", s.Item = r, s.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, n.extend(s.prototype, i.prototype), s.prototype.option = function(t) {
            n.extend(this.options, t)
        }, s.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, s.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, s.prototype._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
                var s = e[n],
                    a = new i(s, this);
                o.push(a)
            }
            return o
        }, s.prototype._filterFindItemElements = function(t) {
            return n.filterFindElements(t, this.options.itemSelector)
        }, s.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
            return t
        }, s.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, s.prototype._init = s.prototype.layout, s.prototype._resetLayout = function() {
            this.getSize()
        }, s.prototype.getSize = function() {
            this.size = o(this.element)
        }, s.prototype._getMeasurement = function(t, e) {
            var i, r = this.options[t];
            r ? ("string" == typeof r ? i = this.element.querySelector(r) : n.isElement(r) && (i = r), this[t] = i ? o(i)[e] : r) : this[t] = 0
        }, s.prototype.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, s.prototype._getItemsForLayout = function(t) {
            for (var e = [], i = 0, o = t.length; o > i; i++) {
                var n = t[i];
                n.isIgnored || e.push(n)
            }
            return e
        }, s.prototype._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                for (var i = [], o = 0, n = t.length; n > o; o++) {
                    var r = t[o],
                        s = this._getItemLayoutPosition(r);
                    s.item = r, s.isInstant = e || r.isLayoutInstant, i.push(s)
                }
                this._processLayoutQueue(i)
            }
        }, s.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, s.prototype._processLayoutQueue = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var o = t[e];
                this._positionItem(o.item, o.x, o.y, o.isInstant)
            }
        }, s.prototype._positionItem = function(t, e, i, o) {
            o ? t.goTo(e, i) : t.moveTo(e, i)
        }, s.prototype._postLayout = function() {
            this.resizeContainer()
        }, s.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, s.prototype._getContainerSize = p, s.prototype._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, s.prototype._emitCompleteOnItems = function(t, e) {
            function i() {
                n.emitEvent(t + "Complete", [e])
            }

            function o() {
                s++, s === r && i()
            }
            var n = this,
                r = e.length;
            if (!e || !r) return i(), void 0;
            for (var s = 0, a = 0, u = e.length; u > a; a++) {
                var p = e[a];
                p.once(t, o)
            }
        }, s.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, s.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, s.prototype.stamp = function(t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    this.ignore(o)
                }
            }
        }, s.prototype.unstamp = function(t) {
            if (t = this._find(t))
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    n.removeFrom(this.stamps, o), this.unignore(o)
                }
        }, s.prototype._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
        }, s.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, s.prototype._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(),
                e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, s.prototype._manageStamp = p, s.prototype._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(),
                i = this._boundingRect,
                n = o(t),
                r = {
                    left: e.left - i.left - n.marginLeft,
                    top: e.top - i.top - n.marginTop,
                    right: i.right - e.right - n.marginRight,
                    bottom: i.bottom - e.bottom - n.marginBottom
                };
            return r
        }, s.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, s.prototype.bindResize = function() {
            this.isResizeBound || (e.bind(t, "resize", this), this.isResizeBound = !0)
        }, s.prototype.unbindResize = function() {
            this.isResizeBound && e.unbind(t, "resize", this), this.isResizeBound = !1
        }, s.prototype.onresize = function() {
            function t() {
                e.resize(), delete e.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, s.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, s.prototype.needsResizeLayout = function() {
            var t = o(this.element),
                e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, s.prototype.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, s.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, s.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, s.prototype.reveal = function(t) {
            this._emitCompleteOnItems("reveal", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var o = t[i];
                o.reveal()
            }
        }, s.prototype.hide = function(t) {
            this._emitCompleteOnItems("hide", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var o = t[i];
                o.hide()
            }
        }, s.prototype.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, s.prototype.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e)
        }, s.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var o = this.items[e];
                if (o.element === t) return o
            }
        }, s.prototype.getItems = function(t) {
            t = n.makeArray(t);
            for (var e = [], i = 0, o = t.length; o > i; i++) {
                var r = t[i],
                    s = this.getItem(r);
                s && e.push(s)
            }
            return e
        }, s.prototype.remove = function(t) {
            var e = this.getItems(t);
            if (this._emitCompleteOnItems("remove", e), e && e.length)
                for (var i = 0, o = e.length; o > i; i++) {
                    var r = e[i];
                    r.remove(), n.removeFrom(this.items, r)
                }
        }, s.prototype.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var o = this.items[e];
                o.destroy()
            }
            this.unbindResize();
            var n = this.element.outlayerGUID;
            delete f[n], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
        }, s.data = function(t) {
            t = n.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && f[e]
        }, s.create = function(t, e) {
            function i() {
                s.apply(this, arguments)
            }
            return Object.create ? i.prototype = Object.create(s.prototype) : n.extend(i.prototype, s.prototype), i.prototype.constructor = i, i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.prototype.settings = {}, i.namespace = t, i.data = s.data, i.Item = function() {
                r.apply(this, arguments)
            }, i.Item.prototype = new r, n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
        }, s.Item = r, s
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window, function(t) {
        function e() {
            t.Item.apply(this, arguments)
        }
        e.prototype = new t.Item, e.prototype._create = function() {
            this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
        }, e.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var t = this.layout.options.getSortData,
                    e = this.layout._sorters;
                for (var i in t) {
                    var o = e[i];
                    this.sortData[i] = o(this.element, this)
                }
            }
        };
        var i = e.prototype.destroy;
        return e.prototype.destroy = function() {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window, function(t, e) {
        function i(t) {
            this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
        }
        return function() {
            function t(t) {
                return function() {
                    return e.prototype[t].apply(this.isotope, arguments)
                }
            }
            for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
                var s = o[n];
                i.prototype[s] = t(s)
            }
        }(), i.prototype.needsVerticalResizeLayout = function() {
            var e = t(this.isotope.element),
                i = this.isotope.size && e;
            return i && e.innerHeight != this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function(t, e) {
            var i = t + e,
                o = "outer" + e;
            if (this._getMeasurement(i, o), !this[i]) {
                var n = this.getFirstItemSize();
                this[i] = n && n[o] || this.isotope.size["inner" + e]
            }
        }, i.prototype.getFirstItemSize = function() {
            var e = this.isotope.filteredItems[0];
            return e && e.element && t(e.element)
        }, i.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(t, e) {
            function o() {
                i.apply(this, arguments)
            }
            return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
        }, i
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils)
    }(window, function(t, e, i) {
        var o = t.create("masonry");
        return o.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;) this.colYs.push(0);
            this.maxY = 0
        }, o.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0],
                    i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var o = this.columnWidth += this.gutter,
                n = this.containerWidth + this.gutter,
                r = n / o,
                s = o - n % o,
                a = s && 1 > s ? "round" : "floor";
            r = Math[a](r), this.cols = Math.max(r, 1)
        }, o.prototype.getContainerWidth = function() {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = e(t);
            this.containerWidth = i && i.innerWidth
        }, o.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                o = e && 1 > e ? "round" : "ceil",
                n = Math[o](t.size.outerWidth / this.columnWidth);
            n = Math.min(n, this.cols);
            for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i.indexOf(r, s), u = {
                    x: this.columnWidth * a,
                    y: s
                }, p = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = p;
            return u
        }, o.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                var n = this.colYs.slice(o, o + t);
                e[o] = Math.max.apply(Math, n)
            }
            return e
        }, o.prototype._manageStamp = function(t) {
            var i = e(t),
                o = this._getElementOffset(t),
                n = this.options.isOriginLeft ? o.left : o.right,
                r = n + i.outerWidth,
                s = Math.floor(n / this.columnWidth);
            s = Math.max(0, s);
            var a = Math.floor(r / this.columnWidth);
            a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(u, this.colYs[p])
        }, o.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, o.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, o.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, o
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window, function(t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }
        var o = t.create("masonry"),
            n = o.prototype._getElementOffset,
            r = o.prototype.layout,
            s = o.prototype._getMeasurement;
        i(o.prototype, e.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
        var a = o.prototype.measureColumns;
        o.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, a.call(this)
        };
        var u = o.prototype._manageStamp;
        return o.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
        }, o
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        var e = t.create("fitRows");
        return e.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
            var o = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        var e = t.create("vertical", {
            horizontalAlignment: 0
        });
        return e.prototype._resetLayout = function() {
            this.y = 0
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += t.size.outerHeight, {
                x: e,
                y: i
            }
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, o, n, r, s, a) {
            return e(t, i, o, n, r, s, a)
        }) : "object" == typeof exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window, function(t, e, i, o, n, r, s) {
        function a(t, e) {
            return function(i, o) {
                for (var n = 0, r = t.length; r > n; n++) {
                    var s = t[n],
                        a = i.sortData[s],
                        u = o.sortData[s];
                    if (a > u || u > a) {
                        var p = void 0 !== e[s] ? e[s] : e,
                            h = p ? 1 : -1;
                        return (a > u ? 1 : -1) * h
                    }
                }
                return 0
            }
        }
        var u = t.jQuery,
            p = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            h = document.documentElement,
            f = h.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            d = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        d.Item = r, d.LayoutMode = s, d.prototype._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var t in s.modes) this._initLayoutMode(t)
        }, d.prototype.reloadItems = function() {
            this.itemGUID = 0, e.prototype.reloadItems.call(this)
        }, d.prototype._itemize = function() {
            for (var t = e.prototype._itemize.apply(this, arguments), i = 0, o = t.length; o > i; i++) {
                var n = t[i];
                n.id = this.itemGUID++
            }
            return this._updateItemsSortData(t), t
        }, d.prototype._initLayoutMode = function(t) {
            var e = s.modes[t],
                i = this.options[t] || {};
            this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
        }, d.prototype.layout = function() {
            return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
        }, d.prototype._layout = function() {
            var t = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
        }, d.prototype.arrange = function(t) {
            function e() {
                o.reveal(i.needReveal), o.hide(i.needHide)
            }
            this.option(t), this._getIsInstant();
            var i = this._filter(this.items);
            this.filteredItems = i.matches;
            var o = this;
            this._bindArrangeComplete(), this._isInstant ? this._noTransition(e) : e(), this._sort(), this._layout()
        }, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function() {
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = t, t
        }, d.prototype._bindArrangeComplete = function() {
            function t() {
                e && i && o && n.emitEvent("arrangeComplete", [n.filteredItems])
            }
            var e, i, o, n = this;
            this.once("layoutComplete", function() {
                e = !0, t()
            }), this.once("hideComplete", function() {
                i = !0, t()
            }), this.once("revealComplete", function() {
                o = !0, t()
            })
        }, d.prototype._filter = function(t) {
            var e = this.options.filter;
            e = e || "*";
            for (var i = [], o = [], n = [], r = this._getFilterTest(e), s = 0, a = t.length; a > s; s++) {
                var u = t[s];
                if (!u.isIgnored) {
                    var p = r(u);
                    p && i.push(u), p && u.isHidden ? o.push(u) : p || u.isHidden || n.push(u)
                }
            }
            return {
                matches: i,
                needReveal: o,
                needHide: n
            }
        }, d.prototype._getFilterTest = function(t) {
            return u && this.options.isJQueryFiltering ? function(e) {
                return u(e.element).is(t)
            } : "function" == typeof t ? function(e) {
                return t(e.element)
            } : function(e) {
                return o(e.element, t)
            }
        }, d.prototype.updateSortData = function(t) {
            var e;
            t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
        }, d.prototype._getSorters = function() {
            var t = this.options.getSortData;
            for (var e in t) {
                var i = t[e];
                this._sorters[e] = l(i)
            }
        }, d.prototype._updateItemsSortData = function(t) {
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var o = t[i];
                o.updateSortData()
            }
        };
        var l = function() {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = p(t).split(" "),
                    o = i[0],
                    n = o.match(/^\[(.+)\]$/),
                    r = n && n[1],
                    s = e(r, o),
                    a = d.sortDataParsers[i[1]];
                return t = a ? function(t) {
                    return t && a(s(t))
                } : function(t) {
                    return t && s(t)
                }
            }

            function e(t, e) {
                var i;
                return i = t ? function(e) {
                    return e.getAttribute(t)
                } : function(t) {
                    var i = t.querySelector(e);
                    return i && f(i)
                }
            }
            return t
        }();
        d.sortDataParsers = {
            parseInt: function(t) {
                return parseInt(t, 10)
            },
            parseFloat: function(t) {
                return parseFloat(t)
            }
        }, d.prototype._sort = function() {
            var t = this.options.sortBy;
            if (t) {
                var e = [].concat.apply(t, this.sortHistory),
                    i = a(e, this.options.sortAscending);
                this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
            }
        }, d.prototype._mode = function() {
            var t = this.options.layoutMode,
                e = this.modes[t];
            if (!e) throw Error("No layout mode: " + t);
            return e.options = this.options[t], e
        }, d.prototype._resetLayout = function() {
            e.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, d.prototype._getItemLayoutPosition = function(t) {
            return this._mode()._getItemLayoutPosition(t)
        }, d.prototype._manageStamp = function(t) {
            this._mode()._manageStamp(t)
        }, d.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, d.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, d.prototype.appended = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i = this._filterRevealAdded(e);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, d.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(e);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
            }
        }, d.prototype._filterRevealAdded = function(t) {
            var e = this._filter(t);
            return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
        }, d.prototype.insert = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i, o, n = e.length;
                for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
                var r = this._filter(e).matches;
                for (i = 0; n > i; i++) e[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
                this.reveal(r)
            }
        };
        var c = d.prototype.remove;
        return d.prototype.remove = function(t) {
            t = n.makeArray(t);
            var e = this.getItems(t);
            c.call(this, t);
            var i = e && e.length;
            if (i)
                for (var o = 0; i > o; o++) {
                    var r = e[o];
                    n.removeFrom(this.filteredItems, r)
                }
        }, d.prototype.shuffle = function() {
            for (var t = 0, e = this.items.length; e > t; t++) {
                var i = this.items[t];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, d.prototype._noTransition = function(t) {
            var e = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = t.call(this);
            return this.options.transitionDuration = e, i
        }, d.prototype.getFilteredItemElements = function() {
            for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
            return t
        }, d
    });
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function() {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function(e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
        return this.getListeners(e), this
    }, i.defineEvents = function(e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function(e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, e.noConflict = function() {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function(e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function(e, n, i) {
            e[n + i] = i.handleEvent ? function() {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function() {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function() {};
        n.removeEventListener ? r = function(e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function(e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function(e, t, n) {
        function i(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === d.call(e)
        }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var r = this;
            setTimeout(function() {
                r.check()
            })
        }

        function f(e) {
            this.img = e
        }

        function c(e) {
            this.src = e, v[e] = this
        }
        var a = e.jQuery,
            u = e.console,
            h = u !== void 0,
            d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                        var f = r[o];
                        this.addImage(f)
                    }
            }
        }, s.prototype.addImage = function(e) {
            var t = new f(e);
            this.images.push(t)
        }, s.prototype.check = function() {
            function e(e, r) {
                return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, s.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function() {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, s.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function() {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, a && (a.fn.imagesLoaded = function(e, t) {
            var n = new s(this, e, t);
            return n.jqDeferred.promise(a(this))
        }), f.prototype = new t, f.prototype.check = function() {
            var e = v[this.img.src] || new c(this.img.src);
            if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
            if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this;
            e.on("confirm", function(e, n) {
                return t.confirm(e.isLoaded, n), !0
            }), e.check()
        }, f.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var v = {};
        return c.prototype = new t, c.prototype.check = function() {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, c.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, c.prototype.onload = function(e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, c.prototype.onerror = function(e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, c.prototype.confirm = function(e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, c.prototype.unbindProxyEvents = function(e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, s
    });
"use strict";
! function(a, b) {
    "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd && define("GMaps", [], b), a.GMaps = b()
}(this, function() {
    if ("object" != typeof window.google || !window.google.maps) throw "Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.";
    var a = function(a, b) {
            var c;
            if (a === b) return a;
            for (c in b) a[c] = b[c];
            return a
        },
        b = function(a, b) {
            var c, d = Array.prototype.slice.call(arguments, 2),
                e = [],
                f = a.length;
            if (Array.prototype.map && a.map === Array.prototype.map) e = Array.prototype.map.call(a, function(a) {
                var c = d.slice(0);
                return c.splice(0, 0, a), b.apply(this, c)
            });
            else
                for (c = 0; f > c; c++) callback_params = d, callback_params.splice(0, 0, a[c]), e.push(b.apply(this, callback_params));
            return e
        },
        c = function(a) {
            var b, c = [];
            for (b = 0; b < a.length; b++) c = c.concat(a[b]);
            return c
        },
        d = function(a, b) {
            var c = a[0],
                d = a[1];
            return b && (c = a[1], d = a[0]), new google.maps.LatLng(c, d)
        },
        f = function(a, b) {
            var c;
            for (c = 0; c < a.length; c++) a[c] instanceof google.maps.LatLng || (a[c].length > 0 && "object" == typeof a[c][0] ? a[c] = f(a[c], b) : a[c] = d(a[c], b));
            return a
        },
        g = function(a, b) {
            var c, d = a.replace(".", "");
            return c = "jQuery" in this && b ? $("." + d, b)[0] : document.getElementsByClassName(d)[0]
        },
        h = function(a, b) {
            var c, a = a.replace("#", "");
            return c = "jQuery" in window && b ? $("#" + a, b)[0] : document.getElementById(a)
        },
        i = function(a) {
            var b = 0,
                c = 0;
            if (a.offsetParent)
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
            return [b, c]
        },
        j = function(b) {
            var c = document,
                d = function(b) {
                    if (!this) return new d(b);
                    b.zoom = b.zoom || 15, b.mapType = b.mapType || "roadmap";
                    var e, f = this,
                        j = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed"],
                        k = ["mousemove", "mouseout", "mouseover"],
                        l = ["el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle"],
                        m = b.el || b.div,
                        n = b.markerClusterer,
                        o = google.maps.MapTypeId[b.mapType.toUpperCase()],
                        p = new google.maps.LatLng(b.lat, b.lng),
                        q = b.zoomControl || !0,
                        r = b.zoomControlOpt || {
                            style: "DEFAULT",
                            position: "TOP_LEFT"
                        },
                        s = r.style || "DEFAULT",
                        t = r.position || "TOP_LEFT",
                        u = b.panControl || !0,
                        v = b.mapTypeControl || !0,
                        w = b.scaleControl || !0,
                        x = b.streetViewControl || !0,
                        y = y || !0,
                        z = {},
                        A = {
                            zoom: this.zoom,
                            center: p,
                            mapTypeId: o
                        },
                        B = {
                            panControl: u,
                            zoomControl: q,
                            zoomControlOptions: {
                                style: google.maps.ZoomControlStyle[s],
                                position: google.maps.ControlPosition[t]
                            },
                            mapTypeControl: v,
                            scaleControl: w,
                            streetViewControl: x,
                            overviewMapControl: y
                        };
                    if ("string" == typeof b.el || "string" == typeof b.div ? m.indexOf("#") > -1 ? this.el = h(m, b.context) : this.el = g.apply(this, [m, b.context]) : this.el = m, "undefined" == typeof this.el || null === this.el) throw "No element defined.";
                    for (window.context_menu = window.context_menu || {}, window.context_menu[f.el.id] = {}, this.controls = [], this.overlays = [], this.layers = [], this.singleLayers = {}, this.markers = [], this.polylines = [], this.routes = [], this.polygons = [], this.infoWindow = null, this.overlay_el = null, this.zoom = b.zoom, this.registered_events = {}, this.el.style.width = b.width || this.el.scrollWidth || this.el.offsetWidth, this.el.style.height = b.height || this.el.scrollHeight || this.el.offsetHeight, google.maps.visualRefresh = b.enableNewStyle, e = 0; e < l.length; e++) delete b[l[e]];
                    for (1 != b.disableDefaultUI && (A = a(A, B)), z = a(A, b), e = 0; e < j.length; e++) delete z[j[e]];
                    for (e = 0; e < k.length; e++) delete z[k[e]];
                    this.map = new google.maps.Map(this.el, z), n && (this.markerClusterer = n.apply(this, [this.map]));
                    var C = function(a, b) {
                        var c = "",
                            d = window.context_menu[f.el.id][a];
                        for (var e in d)
                            if (d.hasOwnProperty(e)) {
                                var g = d[e];
                                c += '<li><a id="' + a + "_" + e + '" href="#">' + g.title + "</a></li>"
                            }
                        if (h("gmaps_context_menu")) {
                            var j = h("gmaps_context_menu");
                            j.innerHTML = c;
                            var e, k = j.getElementsByTagName("a"),
                                l = k.length;
                            for (e = 0; l > e; e++) {
                                var m = k[e],
                                    n = function(c) {
                                        c.preventDefault(), d[this.id.replace(a + "_", "")].action.apply(f, [b]), f.hideContextMenu()
                                    };
                                google.maps.event.clearListeners(m, "click"), google.maps.event.addDomListenerOnce(m, "click", n, !1)
                            }
                            var o = i.apply(this, [f.el]),
                                p = o[0] + b.pixel.x - 15,
                                q = o[1] + b.pixel.y - 15;
                            j.style.left = p + "px", j.style.top = q + "px", j.style.display = "block"
                        }
                    };
                    this.buildContextMenu = function(a, b) {
                        if ("marker" === a) {
                            b.pixel = {};
                            var c = new google.maps.OverlayView;
                            c.setMap(f.map), c.draw = function() {
                                var d = c.getProjection(),
                                    e = b.marker.getPosition();
                                b.pixel = d.fromLatLngToContainerPixel(e), C(a, b)
                            }
                        } else C(a, b)
                    }, this.setContextMenu = function(a) {
                        window.context_menu[f.el.id][a.control] = {};
                        var b, d = c.createElement("ul");
                        for (b in a.options)
                            if (a.options.hasOwnProperty(b)) {
                                var e = a.options[b];
                                window.context_menu[f.el.id][a.control][e.name] = {
                                    title: e.title,
                                    action: e.action
                                }
                            }
                        d.id = "gmaps_context_menu", d.style.display = "none", d.style.position = "absolute", d.style.minWidth = "100px", d.style.background = "white", d.style.listStyle = "none", d.style.padding = "8px", d.style.boxShadow = "2px 2px 6px #ccc", c.body.appendChild(d);
                        var g = h("gmaps_context_menu");
                        google.maps.event.addDomListener(g, "mouseout", function(a) {
                            a.relatedTarget && this.contains(a.relatedTarget) || window.setTimeout(function() {
                                g.style.display = "none"
                            }, 400)
                        }, !1)
                    }, this.hideContextMenu = function() {
                        var a = h("gmaps_context_menu");
                        a && (a.style.display = "none")
                    };
                    var D = function(a, c) {
                        google.maps.event.addListener(a, c, function(a) {
                            void 0 == a && (a = this), b[c].apply(this, [a]), f.hideContextMenu()
                        })
                    };
                    google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
                    for (var E = 0; E < j.length; E++) {
                        var F = j[E];
                        F in b && D(this.map, F)
                    }
                    for (var E = 0; E < k.length; E++) {
                        var F = k[E];
                        F in b && D(this.map, F)
                    }
                    google.maps.event.addListener(this.map, "rightclick", function(a) {
                        b.rightclick && b.rightclick.apply(this, [a]), void 0 != window.context_menu[f.el.id].map && f.buildContextMenu("map", a)
                    }), this.refresh = function() {
                        google.maps.event.trigger(this.map, "resize")
                    }, this.fitZoom = function() {
                        var a, b = [],
                            c = this.markers.length;
                        for (a = 0; c > a; a++) "boolean" == typeof this.markers[a].visible && this.markers[a].visible && b.push(this.markers[a].getPosition());
                        this.fitLatLngBounds(b)
                    }, this.fitLatLngBounds = function(a) {
                        var b, c = a.length,
                            d = new google.maps.LatLngBounds;
                        for (b = 0; c > b; b++) d.extend(a[b]);
                        this.map.fitBounds(d)
                    }, this.setCenter = function(a, b, c) {
                        this.map.panTo(new google.maps.LatLng(a, b)), c && c()
                    }, this.getElement = function() {
                        return this.el
                    }, this.zoomIn = function(a) {
                        a = a || 1, this.zoom = this.map.getZoom() + a, this.map.setZoom(this.zoom)
                    }, this.zoomOut = function(a) {
                        a = a || 1, this.zoom = this.map.getZoom() - a, this.map.setZoom(this.zoom)
                    };
                    var G, H = [];
                    for (G in this.map) "function" != typeof this.map[G] || this[G] || H.push(G);
                    for (e = 0; e < H.length; e++) ! function(a, b, c) {
                        a[c] = function() {
                            return b[c].apply(b, arguments)
                        }
                    }(this, this.map, H[e])
                };
            return d
        }(this);
    j.prototype.createControl = function(a) {
        var b = document.createElement("div");
        b.style.cursor = "pointer", a.disableDefaultStyles !== !0 && (b.style.fontFamily = "Roboto, Arial, sans-serif", b.style.fontSize = "11px", b.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px");
        for (var c in a.style) b.style[c] = a.style[c];
        a.id && (b.id = a.id), a.classes && (b.className = a.classes), a.content && ("string" == typeof a.content ? b.innerHTML = a.content : a.content instanceof HTMLElement && b.appendChild(a.content)), a.position && (b.position = google.maps.ControlPosition[a.position.toUpperCase()]);
        for (var d in a.events) ! function(b, c) {
            google.maps.event.addDomListener(b, c, function() {
                a.events[c].apply(this, [this])
            })
        }(b, d);
        return b.index = 1, b
    }, j.prototype.addControl = function(a) {
        var b = this.createControl(a);
        return this.controls.push(b), this.map.controls[b.position].push(b), b
    }, j.prototype.removeControl = function(a) {
        var b, c = null;
        for (b = 0; b < this.controls.length; b++) this.controls[b] == a && (c = this.controls[b].position, this.controls.splice(b, 1));
        if (c)
            for (b = 0; b < this.map.controls.length; b++) {
                var d = this.map.controls[a.position];
                if (d.getAt(b) == a) {
                    d.removeAt(b);
                    break
                }
            }
        return a
    }, j.prototype.createMarker = function(b) {
        if (void 0 == b.lat && void 0 == b.lng && void 0 == b.position) throw "No latitude or longitude defined.";
        var c = this,
            d = b.details,
            e = b.fences,
            f = b.outside,
            g = {
                position: new google.maps.LatLng(b.lat, b.lng),
                map: null
            },
            h = a(g, b);
        delete h.lat, delete h.lng, delete h.fences, delete h.outside;
        var i = new google.maps.Marker(h);
        if (i.fences = e, b.infoWindow) {
            i.infoWindow = new google.maps.InfoWindow(b.infoWindow);
            for (var j = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"], k = 0; k < j.length; k++) ! function(a, c) {
                b.infoWindow[c] && google.maps.event.addListener(a, c, function(a) {
                    b.infoWindow[c].apply(this, [a])
                })
            }(i.infoWindow, j[k])
        }
        for (var l = ["animation_changed", "clickable_changed", "cursor_changed", "draggable_changed", "flat_changed", "icon_changed", "position_changed", "shadow_changed", "shape_changed", "title_changed", "visible_changed", "zindex_changed"], m = ["dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup"], k = 0; k < l.length; k++) ! function(a, c) {
            b[c] && google.maps.event.addListener(a, c, function() {
                b[c].apply(this, [this])
            })
        }(i, l[k]);
        for (var k = 0; k < m.length; k++) ! function(a, c, d) {
            b[d] && google.maps.event.addListener(c, d, function(c) {
                c.pixel || (c.pixel = a.getProjection().fromLatLngToPoint(c.latLng)), b[d].apply(this, [c])
            })
        }(this.map, i, m[k]);
        return google.maps.event.addListener(i, "click", function() {
            this.details = d, b.click && b.click.apply(this, [this]), i.infoWindow && (c.hideInfoWindows(), i.infoWindow.open(c.map, i))
        }), google.maps.event.addListener(i, "rightclick", function(a) {
            a.marker = this, b.rightclick && b.rightclick.apply(this, [a]), void 0 != window.context_menu[c.el.id].marker && c.buildContextMenu("marker", a)
        }), i.fences && google.maps.event.addListener(i, "dragend", function() {
            c.checkMarkerGeofence(i, function(a, b) {
                f(a, b)
            })
        }), i
    }, j.prototype.addMarker = function(a) {
        var b;
        if (a.hasOwnProperty("gm_accessors_")) b = a;
        else {
            if (!(a.hasOwnProperty("lat") && a.hasOwnProperty("lng") || a.position)) throw "No latitude or longitude defined.";
            b = this.createMarker(a)
        }
        return b.setMap(this.map), this.markerClusterer && this.markerClusterer.addMarker(b), this.markers.push(b), j.fire("marker_added", b, this), b
    }, j.prototype.addMarkers = function(a) {
        for (var b, c = 0; b = a[c]; c++) this.addMarker(b);
        return this.markers
    }, j.prototype.hideInfoWindows = function() {
        for (var a, b = 0; a = this.markers[b]; b++) a.infoWindow && a.infoWindow.close()
    }, j.prototype.removeMarker = function(a) {
        for (var b = 0; b < this.markers.length; b++)
            if (this.markers[b] === a) {
                this.markers[b].setMap(null), this.markers.splice(b, 1), this.markerClusterer && this.markerClusterer.removeMarker(a), j.fire("marker_removed", a, this);
                break
            }
        return a
    }, j.prototype.removeMarkers = function(a) {
        var b = [];
        if ("undefined" == typeof a) {
            for (var c = 0; c < this.markers.length; c++) {
                var d = this.markers[c];
                d.setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(d), j.fire("marker_removed", d, this)
            }
            this.markers = b
        } else {
            for (var c = 0; c < a.length; c++) {
                var e = this.markers.indexOf(a[c]);
                if (e > -1) {
                    var d = this.markers[e];
                    d.setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(d), j.fire("marker_removed", d, this)
                }
            }
            for (var c = 0; c < this.markers.length; c++) {
                var d = this.markers[c];
                null != d.getMap() && b.push(d)
            }
            this.markers = b
        }
    }, j.prototype.drawOverlay = function(a) {
        var b = new google.maps.OverlayView,
            c = !0;
        return b.setMap(this.map), null != a.auto_show && (c = a.auto_show), b.onAdd = function() {
            var c = document.createElement("div");
            c.style.borderStyle = "none", c.style.borderWidth = "0px", c.style.position = "absolute", c.style.zIndex = 100, c.innerHTML = a.content, b.el = c, a.layer || (a.layer = "overlayLayer");
            var d = this.getPanes(),
                e = d[a.layer],
                f = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
            e.appendChild(c);
            for (var g = 0; g < f.length; g++) ! function(a, b) {
                google.maps.event.addDomListener(a, b, function(a) {
                    -1 != navigator.userAgent.toLowerCase().indexOf("msie") && document.all ? (a.cancelBubble = !0, a.returnValue = !1) : a.stopPropagation()
                })
            }(c, f[g]);
            a.click && (d.overlayMouseTarget.appendChild(b.el), google.maps.event.addDomListener(b.el, "click", function() {
                a.click.apply(b, [b])
            })), google.maps.event.trigger(this, "ready")
        }, b.draw = function() {
            var d = this.getProjection(),
                e = d.fromLatLngToDivPixel(new google.maps.LatLng(a.lat, a.lng));
            a.horizontalOffset = a.horizontalOffset || 0, a.verticalOffset = a.verticalOffset || 0;
            var f = b.el,
                g = f.children[0],
                h = g.clientHeight,
                i = g.clientWidth;
            switch (a.verticalAlign) {
                case "top":
                    f.style.top = e.y - h + a.verticalOffset + "px";
                    break;
                default:
                case "middle":
                    f.style.top = e.y - h / 2 + a.verticalOffset + "px";
                    break;
                case "bottom":
                    f.style.top = e.y + a.verticalOffset + "px"
            }
            switch (a.horizontalAlign) {
                case "left":
                    f.style.left = e.x - i + a.horizontalOffset + "px";
                    break;
                default:
                case "center":
                    f.style.left = e.x - i / 2 + a.horizontalOffset + "px";
                    break;
                case "right":
                    f.style.left = e.x + a.horizontalOffset + "px"
            }
            f.style.display = c ? "block" : "none", c || a.show.apply(this, [f])
        }, b.onRemove = function() {
            var c = b.el;
            a.remove ? a.remove.apply(this, [c]) : (b.el.parentNode.removeChild(b.el), b.el = null)
        }, this.overlays.push(b), b
    }, j.prototype.removeOverlay = function(a) {
        for (var b = 0; b < this.overlays.length; b++)
            if (this.overlays[b] === a) {
                this.overlays[b].setMap(null), this.overlays.splice(b, 1);
                break
            }
    }, j.prototype.removeOverlays = function() {
        for (var a, b = 0; a = this.overlays[b]; b++) a.setMap(null);
        this.overlays = []
    }, j.prototype.drawPolyline = function(a) {
        var b = [],
            c = a.path;
        if (c.length)
            if (void 0 === c[0][0]) b = c;
            else
                for (var d, e = 0; d = c[e]; e++) b.push(new google.maps.LatLng(d[0], d[1]));
        var f = {
            map: this.map,
            path: b,
            strokeColor: a.strokeColor,
            strokeOpacity: a.strokeOpacity,
            strokeWeight: a.strokeWeight,
            geodesic: a.geodesic,
            clickable: !0,
            editable: !1,
            visible: !0
        };
        a.hasOwnProperty("clickable") && (f.clickable = a.clickable), a.hasOwnProperty("editable") && (f.editable = a.editable), a.hasOwnProperty("icons") && (f.icons = a.icons), a.hasOwnProperty("zIndex") && (f.zIndex = a.zIndex);
        for (var g = new google.maps.Polyline(f), h = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], i = 0; i < h.length; i++) ! function(b, c) {
            a[c] && google.maps.event.addListener(b, c, function(b) {
                a[c].apply(this, [b])
            })
        }(g, h[i]);
        return this.polylines.push(g), j.fire("polyline_added", g, this), g
    }, j.prototype.removePolyline = function(a) {
        for (var b = 0; b < this.polylines.length; b++)
            if (this.polylines[b] === a) {
                this.polylines[b].setMap(null), this.polylines.splice(b, 1), j.fire("polyline_removed", a, this);
                break
            }
    }, j.prototype.removePolylines = function() {
        for (var a, b = 0; a = this.polylines[b]; b++) a.setMap(null);
        this.polylines = []
    }, j.prototype.drawCircle = function(b) {
        b = a({
            map: this.map,
            center: new google.maps.LatLng(b.lat, b.lng)
        }, b), delete b.lat, delete b.lng;
        for (var c = new google.maps.Circle(b), d = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], e = 0; e < d.length; e++) ! function(a, c) {
            b[c] && google.maps.event.addListener(a, c, function(a) {
                b[c].apply(this, [a])
            })
        }(c, d[e]);
        return this.polygons.push(c), c
    }, j.prototype.drawRectangle = function(b) {
        b = a({
            map: this.map
        }, b);
        var c = new google.maps.LatLngBounds(new google.maps.LatLng(b.bounds[0][0], b.bounds[0][1]), new google.maps.LatLng(b.bounds[1][0], b.bounds[1][1]));
        b.bounds = c;
        for (var d = new google.maps.Rectangle(b), e = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], f = 0; f < e.length; f++) ! function(a, c) {
            b[c] && google.maps.event.addListener(a, c, function(a) {
                b[c].apply(this, [a])
            })
        }(d, e[f]);
        return this.polygons.push(d), d
    }, j.prototype.drawPolygon = function(d) {
        var e = !1;
        d.hasOwnProperty("useGeoJSON") && (e = d.useGeoJSON), delete d.useGeoJSON, d = a({
            map: this.map
        }, d), 0 == e && (d.paths = [d.paths.slice(0)]), d.paths.length > 0 && d.paths[0].length > 0 && (d.paths = c(b(d.paths, f, e)));
        for (var g = new google.maps.Polygon(d), h = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], i = 0; i < h.length; i++) ! function(a, b) {
            d[b] && google.maps.event.addListener(a, b, function(a) {
                d[b].apply(this, [a])
            })
        }(g, h[i]);
        return this.polygons.push(g), j.fire("polygon_added", g, this), g
    }, j.prototype.removePolygon = function(a) {
        for (var b = 0; b < this.polygons.length; b++)
            if (this.polygons[b] === a) {
                this.polygons[b].setMap(null), this.polygons.splice(b, 1), j.fire("polygon_removed", a, this);
                break
            }
    }, j.prototype.removePolygons = function() {
        for (var a, b = 0; a = this.polygons[b]; b++) a.setMap(null);
        this.polygons = []
    }, j.prototype.getFromFusionTables = function(a) {
        var b = a.events;
        delete a.events;
        var c = a,
            d = new google.maps.FusionTablesLayer(c);
        for (var e in b) ! function(a, c) {
            google.maps.event.addListener(a, c, function(a) {
                b[c].apply(this, [a])
            })
        }(d, e);
        return this.layers.push(d), d
    }, j.prototype.loadFromFusionTables = function(a) {
        var b = this.getFromFusionTables(a);
        return b.setMap(this.map), b
    }, j.prototype.getFromKML = function(a) {
        var b = a.url,
            c = a.events;
        delete a.url, delete a.events;
        var d = a,
            e = new google.maps.KmlLayer(b, d);
        for (var f in c) ! function(a, b) {
            google.maps.event.addListener(a, b, function(a) {
                c[b].apply(this, [a])
            })
        }(e, f);
        return this.layers.push(e), e
    }, j.prototype.loadFromKML = function(a) {
        var b = this.getFromKML(a);
        return b.setMap(this.map), b
    }, j.prototype.addLayer = function(a, b) {
        b = b || {};
        var c;
        switch (a) {
            case "weather":
                this.singleLayers.weather = c = new google.maps.weather.WeatherLayer;
                break;
            case "clouds":
                this.singleLayers.clouds = c = new google.maps.weather.CloudLayer;
                break;
            case "traffic":
                this.singleLayers.traffic = c = new google.maps.TrafficLayer;
                break;
            case "transit":
                this.singleLayers.transit = c = new google.maps.TransitLayer;
                break;
            case "bicycling":
                this.singleLayers.bicycling = c = new google.maps.BicyclingLayer;
                break;
            case "panoramio":
                this.singleLayers.panoramio = c = new google.maps.panoramio.PanoramioLayer, c.setTag(b.filter), delete b.filter, b.click && google.maps.event.addListener(c, "click", function(a) {
                    b.click(a), delete b.click
                });
                break;
            case "places":
                if (this.singleLayers.places = c = new google.maps.places.PlacesService(this.map), b.search || b.nearbySearch || b.radarSearch) {
                    var d = {
                        bounds: b.bounds || null,
                        keyword: b.keyword || null,
                        location: b.location || null,
                        name: b.name || null,
                        radius: b.radius || null,
                        rankBy: b.rankBy || null,
                        types: b.types || null
                    };
                    b.radarSearch && c.radarSearch(d, b.radarSearch), b.search && c.search(d, b.search), b.nearbySearch && c.nearbySearch(d, b.nearbySearch)
                }
                if (b.textSearch) {
                    var e = {
                        bounds: b.bounds || null,
                        location: b.location || null,
                        query: b.query || null,
                        radius: b.radius || null
                    };
                    c.textSearch(e, b.textSearch)
                }
        }
        return void 0 !== c ? ("function" == typeof c.setOptions && c.setOptions(b), "function" == typeof c.setMap && c.setMap(this.map), c) : void 0
    }, j.prototype.removeLayer = function(a) {
        if ("string" == typeof a && void 0 !== this.singleLayers[a]) this.singleLayers[a].setMap(null), delete this.singleLayers[a];
        else
            for (var b = 0; b < this.layers.length; b++)
                if (this.layers[b] === a) {
                    this.layers[b].setMap(null), this.layers.splice(b, 1);
                    break
                }
    };
    var k, l;
    return j.prototype.getRoutes = function(b) {
        switch (b.travelMode) {
            case "bicycling":
                k = google.maps.TravelMode.BICYCLING;
                break;
            case "transit":
                k = google.maps.TravelMode.TRANSIT;
                break;
            case "driving":
                k = google.maps.TravelMode.DRIVING;
                break;
            default:
                k = google.maps.TravelMode.WALKING
        }
        l = "imperial" === b.unitSystem ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
        var c = {
                avoidHighways: !1,
                avoidTolls: !1,
                optimizeWaypoints: !1,
                waypoints: []
            },
            d = a(c, b);
        d.origin = /string/.test(typeof b.origin) ? b.origin : new google.maps.LatLng(b.origin[0], b.origin[1]), d.destination = /string/.test(typeof b.destination) ? b.destination : new google.maps.LatLng(b.destination[0], b.destination[1]), d.travelMode = k, d.unitSystem = l, delete d.callback, delete d.error;
        var e = this,
            f = new google.maps.DirectionsService;
        f.route(d, function(a, c) {
            if (c === google.maps.DirectionsStatus.OK) {
                for (var d in a.routes) a.routes.hasOwnProperty(d) && e.routes.push(a.routes[d]);
                b.callback && b.callback(e.routes)
            } else b.error && b.error(a, c)
        })
    }, j.prototype.removeRoutes = function() {
        this.routes = []
    }, j.prototype.getElevations = function(d) {
        d = a({
            locations: [],
            path: !1,
            samples: 256
        }, d), d.locations.length > 0 && d.locations[0].length > 0 && (d.locations = c(b([d.locations], f, !1)));
        var e = d.callback;
        delete d.callback;
        var g = new google.maps.ElevationService;
        if (d.path) {
            var h = {
                path: d.locations,
                samples: d.samples
            };
            g.getElevationAlongPath(h, function(a, b) {
                e && "function" == typeof e && e(a, b)
            })
        } else delete d.path, delete d.samples, g.getElevationForLocations(d, function(a, b) {
            e && "function" == typeof e && e(a, b)
        })
    }, j.prototype.cleanRoute = j.prototype.removePolylines, j.prototype.drawRoute = function(a) {
        var b = this;
        this.getRoutes({
            origin: a.origin,
            destination: a.destination,
            travelMode: a.travelMode,
            waypoints: a.waypoints,
            unitSystem: a.unitSystem,
            error: a.error,
            callback: function(c) {
                if (c.length > 0) {
                    var d = {
                        path: c[c.length - 1].overview_path,
                        strokeColor: a.strokeColor,
                        strokeOpacity: a.strokeOpacity,
                        strokeWeight: a.strokeWeight
                    };
                    a.hasOwnProperty("icons") && (d.icons = a.icons), b.drawPolyline(d), a.callback && a.callback(c[c.length - 1])
                }
            }
        })
    }, j.prototype.travelRoute = function(a) {
        if (a.origin && a.destination) this.getRoutes({
            origin: a.origin,
            destination: a.destination,
            travelMode: a.travelMode,
            waypoints: a.waypoints,
            unitSystem: a.unitSystem,
            error: a.error,
            callback: function(b) {
                if (b.length > 0 && a.start && a.start(b[b.length - 1]), b.length > 0 && a.step) {
                    var c = b[b.length - 1];
                    if (c.legs.length > 0)
                        for (var d, e = c.legs[0].steps, f = 0; d = e[f]; f++) d.step_number = f, a.step(d, c.legs[0].steps.length - 1)
                }
                b.length > 0 && a.end && a.end(b[b.length - 1])
            }
        });
        else if (a.route && a.route.legs.length > 0)
            for (var b, c = a.route.legs[0].steps, d = 0; b = c[d]; d++) b.step_number = d, a.step(b)
    }, j.prototype.drawSteppedRoute = function(a) {
        var b = this;
        if (a.origin && a.destination) this.getRoutes({
            origin: a.origin,
            destination: a.destination,
            travelMode: a.travelMode,
            waypoints: a.waypoints,
            error: a.error,
            callback: function(c) {
                if (c.length > 0 && a.start && a.start(c[c.length - 1]), c.length > 0 && a.step) {
                    var d = c[c.length - 1];
                    if (d.legs.length > 0)
                        for (var e, f = d.legs[0].steps, g = 0; e = f[g]; g++) {
                            e.step_number = g;
                            var h = {
                                path: e.path,
                                strokeColor: a.strokeColor,
                                strokeOpacity: a.strokeOpacity,
                                strokeWeight: a.strokeWeight
                            };
                            a.hasOwnProperty("icons") && (h.icons = a.icons), b.drawPolyline(h), a.step(e, d.legs[0].steps.length - 1)
                        }
                }
                c.length > 0 && a.end && a.end(c[c.length - 1])
            }
        });
        else if (a.route && a.route.legs.length > 0)
            for (var c, d = a.route.legs[0].steps, e = 0; c = d[e]; e++) {
                c.step_number = e;
                var f = {
                    path: c.path,
                    strokeColor: a.strokeColor,
                    strokeOpacity: a.strokeOpacity,
                    strokeWeight: a.strokeWeight
                };
                a.hasOwnProperty("icons") && (f.icons = a.icons), b.drawPolyline(f), a.step(c)
            }
    }, j.Route = function(a) {
        this.origin = a.origin, this.destination = a.destination, this.waypoints = a.waypoints, this.map = a.map, this.route = a.route, this.step_count = 0, this.steps = this.route.legs[0].steps, this.steps_length = this.steps.length;
        var b = {
            path: new google.maps.MVCArray,
            strokeColor: a.strokeColor,
            strokeOpacity: a.strokeOpacity,
            strokeWeight: a.strokeWeight
        };
        a.hasOwnProperty("icons") && (b.icons = a.icons), this.polyline = this.map.drawPolyline(b).getPath()
    }, j.Route.prototype.getRoute = function(a) {
        var b = this;
        this.map.getRoutes({
            origin: this.origin,
            destination: this.destination,
            travelMode: a.travelMode,
            waypoints: this.waypoints || [],
            error: a.error,
            callback: function() {
                b.route = e[0], a.callback && a.callback.call(b)
            }
        })
    }, j.Route.prototype.back = function() {
        if (this.step_count > 0) {
            this.step_count--;
            var a = this.route.legs[0].steps[this.step_count].path;
            for (var b in a) a.hasOwnProperty(b) && this.polyline.pop()
        }
    }, j.Route.prototype.forward = function() {
        if (this.step_count < this.steps_length) {
            var a = this.route.legs[0].steps[this.step_count].path;
            for (var b in a) a.hasOwnProperty(b) && this.polyline.push(a[b]);
            this.step_count++
        }
    }, j.prototype.checkGeofence = function(a, b, c) {
        return c.containsLatLng(new google.maps.LatLng(a, b))
    }, j.prototype.checkMarkerGeofence = function(a, b) {
        if (a.fences)
            for (var c, d = 0; c = a.fences[d]; d++) {
                var e = a.getPosition();
                this.checkGeofence(e.lat(), e.lng(), c) || b(a, c)
            }
    }, j.prototype.toImage = function(a) {
        var a = a || {},
            b = {};
        if (b.size = a.size || [this.el.clientWidth, this.el.clientHeight], b.lat = this.getCenter().lat(), b.lng = this.getCenter().lng(), this.markers.length > 0) {
            b.markers = [];
            for (var c = 0; c < this.markers.length; c++) b.markers.push({
                lat: this.markers[c].getPosition().lat(),
                lng: this.markers[c].getPosition().lng()
            })
        }
        if (this.polylines.length > 0) {
            var d = this.polylines[0];
            b.polyline = {}, b.polyline.path = google.maps.geometry.encoding.encodePath(d.getPath()), b.polyline.strokeColor = d.strokeColor, b.polyline.strokeOpacity = d.strokeOpacity, b.polyline.strokeWeight = d.strokeWeight
        }
        return j.staticMapURL(b)
    }, j.staticMapURL = function(a) {
        function b(a, b) {
            if ("#" === a[0] && (a = a.replace("#", "0x"), b)) {
                if (b = parseFloat(b), b = Math.min(1, Math.max(b, 0)), 0 === b) return "0x00000000";
                b = (255 * b).toString(16), 1 === b.length && (b += b), a = a.slice(0, 8) + b
            }
            return a
        }
        var c, d = [],
            e = ("file:" === location.protocol ? "http:" : location.protocol) + "//maps.googleapis.com/maps/api/staticmap";
        a.url && (e = a.url, delete a.url), e += "?";
        var f = a.markers;
        delete a.markers, !f && a.marker && (f = [a.marker], delete a.marker);
        var g = a.styles;
        delete a.styles;
        var h = a.polyline;
        if (delete a.polyline, a.center) d.push("center=" + a.center), delete a.center;
        else if (a.address) d.push("center=" + a.address), delete a.address;
        else if (a.lat) d.push(["center=", a.lat, ",", a.lng].join("")), delete a.lat, delete a.lng;
        else if (a.visible) {
            var i = encodeURI(a.visible.join("|"));
            d.push("visible=" + i)
        }
        var j = a.size;
        j ? (j.join && (j = j.join("x")), delete a.size) : j = "630x300", d.push("size=" + j), a.zoom || a.zoom === !1 || (a.zoom = 15);
        var k = a.hasOwnProperty("sensor") ? !!a.sensor : !0;
        delete a.sensor, d.push("sensor=" + k);
        for (var l in a) a.hasOwnProperty(l) && d.push(l + "=" + a[l]);
        if (f)
            for (var m, n, o = 0; c = f[o]; o++) {
                m = [], c.size && "normal" !== c.size ? (m.push("size:" + c.size), delete c.size) : c.icon && (m.push("icon:" + encodeURI(c.icon)), delete c.icon), c.color && (m.push("color:" + c.color.replace("#", "0x")), delete c.color), c.label && (m.push("label:" + c.label[0].toUpperCase()), delete c.label), n = c.address ? c.address : c.lat + "," + c.lng, delete c.address, delete c.lat, delete c.lng;
                for (var l in c) c.hasOwnProperty(l) && m.push(l + ":" + c[l]);
                m.length || 0 === o ? (m.push(n), m = m.join("|"), d.push("markers=" + encodeURI(m))) : (m = d.pop() + encodeURI("|" + n), d.push(m))
            }
        if (g)
            for (var o = 0; o < g.length; o++) {
                var p = [];
                g[o].featureType && p.push("feature:" + g[o].featureType.toLowerCase()), g[o].elementType && p.push("element:" + g[o].elementType.toLowerCase());
                for (var q = 0; q < g[o].stylers.length; q++)
                    for (var r in g[o].stylers[q]) {
                        var s = g[o].stylers[q][r];
                        ("hue" == r || "color" == r) && (s = "0x" + s.substring(1)), p.push(r + ":" + s)
                    }
                var t = p.join("|");
                "" != t && d.push("style=" + t)
            }
        if (h) {
            if (c = h, h = [], c.strokeWeight && h.push("weight:" + parseInt(c.strokeWeight, 10)), c.strokeColor) {
                var u = b(c.strokeColor, c.strokeOpacity);
                h.push("color:" + u)
            }
            if (c.fillColor) {
                var v = b(c.fillColor, c.fillOpacity);
                h.push("fillcolor:" + v)
            }
            var w = c.path;
            if (w.join)
                for (var x, q = 0; x = w[q]; q++) h.push(x.join(","));
            else h.push("enc:" + w);
            h = h.join("|"), d.push("path=" + encodeURI(h))
        }
        var y = window.devicePixelRatio || 1;
        return d.push("scale=" + y), d = d.join("&"), e + d
    }, j.prototype.addMapType = function(a, b) {
        if (!b.hasOwnProperty("getTileUrl") || "function" != typeof b.getTileUrl) throw "'getTileUrl' function required.";
        b.tileSize = b.tileSize || new google.maps.Size(256, 256);
        var c = new google.maps.ImageMapType(b);
        this.map.mapTypes.set(a, c)
    }, j.prototype.addOverlayMapType = function(a) {
        if (!a.hasOwnProperty("getTile") || "function" != typeof a.getTile) throw "'getTile' function required.";
        var b = a.index;
        delete a.index, this.map.overlayMapTypes.insertAt(b, a)
    }, j.prototype.removeOverlayMapType = function(a) {
        this.map.overlayMapTypes.removeAt(a)
    }, j.prototype.addStyle = function(a) {
        var b = new google.maps.StyledMapType(a.styles, {
            name: a.styledMapName
        });
        this.map.mapTypes.set(a.mapTypeId, b)
    }, j.prototype.setStyle = function(a) {
        this.map.setMapTypeId(a)
    }, j.prototype.createPanorama = function(a) {
        return a.hasOwnProperty("lat") && a.hasOwnProperty("lng") || (a.lat = this.getCenter().lat(), a.lng = this.getCenter().lng()), this.panorama = j.createPanorama(a), this.map.setStreetView(this.panorama), this.panorama
    }, j.createPanorama = function(b) {
        var c = h(b.el, b.context);
        b.position = new google.maps.LatLng(b.lat, b.lng), delete b.el, delete b.context, delete b.lat, delete b.lng;
        for (var d = ["closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed"], e = a({
                visible: !0
            }, b), f = 0; f < d.length; f++) delete e[d[f]];
        for (var g = new google.maps.StreetViewPanorama(c, e), f = 0; f < d.length; f++) ! function(a, c) {
            b[c] && google.maps.event.addListener(a, c, function() {
                b[c].apply(this)
            })
        }(g, d[f]);
        return g
    }, j.prototype.on = function(a, b) {
        return j.on(a, this, b)
    }, j.prototype.off = function(a) {
        j.off(a, this)
    }, j.custom_events = ["marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed"], j.on = function(a, b, c) {
        if (-1 == j.custom_events.indexOf(a)) return b instanceof j && (b = b.map), google.maps.event.addListener(b, a, c);
        var d = {
            handler: c,
            eventName: a
        };
        return b.registered_events[a] = b.registered_events[a] || [], b.registered_events[a].push(d), d
    }, j.off = function(a, b) {
        -1 == j.custom_events.indexOf(a) ? (b instanceof j && (b = b.map), google.maps.event.clearListeners(b, a)) : b.registered_events[a] = []
    }, j.fire = function(a, b, c) {
        if (-1 == j.custom_events.indexOf(a)) google.maps.event.trigger(b, a, Array.prototype.slice.apply(arguments).slice(2));
        else if (a in c.registered_events)
            for (var d = c.registered_events[a], e = 0; e < d.length; e++) ! function(a, b, c) {
                a.apply(b, [c])
            }(d[e].handler, c, b)
    }, j.geolocate = function(a) {
        var b = a.always || a.complete;
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(c) {
            a.success(c), b && b()
        }, function(c) {
            a.error(c), b && b()
        }, a.options) : (a.not_supported(), b && b())
    }, j.geocode = function(a) {
        this.geocoder = new google.maps.Geocoder;
        var b = a.callback;
        a.hasOwnProperty("lat") && a.hasOwnProperty("lng") && (a.latLng = new google.maps.LatLng(a.lat, a.lng)), delete a.lat, delete a.lng, delete a.callback, this.geocoder.geocode(a, function(a, c) {
            b(a, c)
        })
    }, google.maps.Polygon.prototype.getBounds || (google.maps.Polygon.prototype.getBounds = function(a) {
        for (var b, c = new google.maps.LatLngBounds, d = this.getPaths(), e = 0; e < d.getLength(); e++) {
            b = d.getAt(e);
            for (var f = 0; f < b.getLength(); f++) c.extend(b.getAt(f))
        }
        return c
    }), google.maps.Polygon.prototype.containsLatLng || (google.maps.Polygon.prototype.containsLatLng = function(a) {
        var b = this.getBounds();
        if (null !== b && !b.contains(a)) return !1;
        for (var c = !1, d = this.getPaths().getLength(), e = 0; d > e; e++)
            for (var f = this.getPaths().getAt(e), g = f.getLength(), h = g - 1, i = 0; g > i; i++) {
                var j = f.getAt(i),
                    k = f.getAt(h);
                (j.lng() < a.lng() && k.lng() >= a.lng() || k.lng() < a.lng() && j.lng() >= a.lng()) && j.lat() + (a.lng() - j.lng()) / (k.lng() - j.lng()) * (k.lat() - j.lat()) < a.lat() && (c = !c), h = i
            }
        return c
    }), google.maps.Circle.prototype.containsLatLng || (google.maps.Circle.prototype.containsLatLng = function(a) {
        return google.maps.geometry ? google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), a) <= this.getRadius() : !0
    }), google.maps.LatLngBounds.prototype.containsLatLng = function(a) {
        return this.contains(a)
    }, google.maps.Marker.prototype.setFences = function(a) {
        this.fences = a
    }, google.maps.Marker.prototype.addFence = function(a) {
        this.fences.push(a)
    }, google.maps.Marker.prototype.getId = function() {
        return this.__gm_id
    }, Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        if (null == this) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (0 === c) return -1;
        var d = 0;
        if (arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && d != 1 / 0 && d != -(1 / 0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c) return -1;
        for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)
            if (e in b && b[e] === a) return e;
        return -1
    }), j
});
//# sourceMappingURL=gmaps.min.js.map