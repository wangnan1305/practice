! function(e) {
	"object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : "undefined" != typeof window ? window.Promise = e() : "undefined" != typeof global ? global.Promise = e() : "undefined" != typeof self && (self.Promise = e())
}(function() {
	var e;
	return function t(e, n, o) {
		function r(a, s) {
			if (!n[a]) {
				if (!e[a]) {
					var u = "function" == typeof require && require;
					if (!s && u) return u(a, !0);
					if (i) return i(a, !0);
					throw new Error("Cannot find module '" + a + "'")
				}
				var l = n[a] = {
					exports: {}
				};
				e[a][0].call(l.exports, function(t) {
					var n = e[a][1][t];
					return r(n ? n : t)
				}, l, l.exports, t, e, n, o)
			}
			return n[a].exports
		}
		for (var i = "function" == typeof require && require, a = 0; a < o.length; a++) r(o[a]);
		return r
	}({
		1: [function(e, t) {
			var n = e("../lib/decorators/unhandledRejection"),
				o = n(e("../lib/Promise"));
			t.exports = "undefined" != typeof global ? global.Promise = o : "undefined" != typeof self ? self.Promise = o : o
		}, {
			"../lib/Promise": 2,
			"../lib/decorators/unhandledRejection": 4
		}],
		2: [function(t, n) {
			! function(e) {
				"use strict";
				e(function(e) {
					var t = e("./makePromise"),
						n = e("./Scheduler"),
						o = e("./env").asap;
					return t({
						scheduler: new n(o)
					})
				})
			}("function" == typeof e && e.amd ? e : function(e) {
				n.exports = e(t)
			})
		}, {
			"./Scheduler": 3,
			"./env": 5,
			"./makePromise": 7
		}],
		3: [function(t, n) {
			! function(e) {
				"use strict";
				e(function() {
					function e(e) {
						this._async = e, this._running = !1, this._queue = this, this._queueLen = 0, this._afterQueue = {}, this._afterQueueLen = 0;
						var t = this;
						this.drain = function() {
							t._drain()
						}
					}
					return e.prototype.enqueue = function(e) {
						this._queue[this._queueLen++] = e, this.run()
					}, e.prototype.afterQueue = function(e) {
						this._afterQueue[this._afterQueueLen++] = e, this.run()
					}, e.prototype.run = function() {
						this._running || (this._running = !0, this._async(this.drain))
					}, e.prototype._drain = function() {
						for (var e = 0; e < this._queueLen; ++e) this._queue[e].run(), this._queue[e] = void 0;
						for (this._queueLen = 0, this._running = !1, e = 0; e < this._afterQueueLen; ++e) this._afterQueue[e].run(), this._afterQueue[e] = void 0;
						this._afterQueueLen = 0
					}, e
				})
			}("function" == typeof e && e.amd ? e : function(e) {
				n.exports = e()
			})
		}, {}],
		4: [function(t, n) {
			! function(e) {
				"use strict";
				e(function(e) {
					function t(e) {
						throw e
					}

					function n() {}
					var o = e("../env").setTimer,
						r = e("../format");
					return function(e) {
						function i(e) {
							e.handled || (p.push(e), c("Potentially unhandled rejection [" + e.id + "] " + r.formatError(e.value)))
						}

						function a(e) {
							var t = p.indexOf(e);
							t >= 0 && (p.splice(t, 1), d("Handled previous rejection [" + e.id + "] " + r.formatObject(e.value)))
						}

						function s(e, t) {
							f.push(e, t), null === h && (h = o(u, 0))
						}

						function u() {
							for (h = null; f.length > 0;) f.shift()(f.shift())
						}
						var l, c = n,
							d = n;
						"undefined" != typeof console && (l = console, c = "undefined" != typeof l.error ? function(e) {
							l.error(e)
						} : function(e) {
							l.log(e)
						}, d = "undefined" != typeof l.info ? function(e) {
							l.info(e)
						} : function(e) {
							l.log(e)
						}), e.onPotentiallyUnhandledRejection = function(e) {
							s(i, e)
						}, e.onPotentiallyUnhandledRejectionHandled = function(e) {
							s(a, e)
						}, e.onFatalRejection = function(e) {
							s(t, e.value)
						};
						var f = [],
							p = [],
							h = null;
						return e
					}
				})
			}("function" == typeof e && e.amd ? e : function(e) {
				n.exports = e(t)
			})
		}, {
			"../env": 5,
			"../format": 6
		}],
		5: [function(t, n) {
			! function(e) {
				"use strict";
				e(function(e) {
					function t() {
						return "undefined" != typeof process && null !== process && "function" == typeof process.nextTick
					}

					function n() {
						return "function" == typeof MutationObserver && MutationObserver || "function" == typeof WebKitMutationObserver && WebKitMutationObserver
					}

					function o(e) {
						function t() {
							var e = n;
							n = void 0, e()
						}
						var n, o = document.createTextNode(""),
							r = new e(t);
						r.observe(o, {
							characterData: !0
						});
						var i = 0;
						return function(e) {
							n = e, o.data = i ^= 1
						}
					}
					var r, i = "undefined" != typeof setTimeout && setTimeout,
						a = function(e, t) {
							return setTimeout(e, t)
						},
						s = function(e) {
							return clearTimeout(e)
						},
						u = function(e) {
							return i(e, 0)
						};
					if (t()) u = function(e) {
						return process.nextTick(e)
					};
					else if (r = n()) u = o(r);
					else if (!i) {
						var l = e,
							c = l("vertx");
						a = function(e, t) {
							return c.setTimer(t, e)
						}, s = c.cancelTimer, u = c.runOnLoop || c.runOnContext
					}
					return {
						setTimer: a,
						clearTimer: s,
						asap: u
					}
				})
			}("function" == typeof e && e.amd ? e : function(e) {
				n.exports = e(t)
			})
		}, {}],
		6: [function(t, n) {
			! function(e) {
				"use strict";
				e(function() {
					function e(e) {
						var n = "object" == typeof e && null !== e && e.stack ? e.stack : t(e);
						return e instanceof Error ? n : n + " (WARNING: non-Error used)"
					}

					function t(e) {
						var t = String(e);
						return "[object Object]" === t && "undefined" != typeof JSON && (t = n(e, t)), t
					}

					function n(e, t) {
						try {
							return JSON.stringify(e)
						} catch (n) {
							return t
						}
					}
					return {
						formatError: e,
						formatObject: t,
						tryStringify: n
					}
				})
			}("function" == typeof e && e.amd ? e : function(e) {
				n.exports = e()
			})
		}, {}],
		7: [function(t, n) {
			! function(e) {
				"use strict";
				e(function() {
					return function(e) {
						function t(e, t) {
							this._handler = e === g ? t : n(e)
						}

						function n(e) {
							function t(e) {
								r.resolve(e)
							}

							function n(e) {
								r.reject(e)
							}

							function o(e) {
								r.notify(e)
							}
							var r = new w;
							try {
								e(t, n, o)
							} catch (i) {
								n(i)
							}
							return r
						}

						function o(e) {
							return M(e) ? e : new t(g, new j(v(e)))
						}

						function r(e) {
							return new t(g, new j(new E(e)))
						}

						function i() {
							return Z
						}

						function a() {
							return new t(g, new w)
						}

						function s(e, t) {
							var n = new w(e.receiver, e.join().context);
							return new t(g, n)
						}

						function u(e) {
							return c(F, null, e)
						}

						function l(e, t) {
							return c(A, e, t)
						}

						function c(e, n, o) {
							function r(t, r, a) {
								a.resolved || d(o, i, t, e(n, r, t), a)
							}

							function i(e, t, n) {
								c[e] = t, 0 === --l && n.become(new O(c))
							}
							for (var a, s = "function" == typeof n ? r : i, u = new w, l = o.length >>> 0, c = new Array(l), f = 0; f < o.length && !u.resolved; ++f) a = o[f], void 0 !== a || f in o ? d(o, s, f, a, u) : --l;
							return 0 === l && u.become(new O(c)), new t(g, u)
						}

						function d(e, t, n, o, r) {
							if (C(o)) {
								var i = y(o),
									a = i.state();
								0 === a ? i.fold(t, n, void 0, r) : a > 0 ? t(n, i.value, r) : (r.become(i), f(e, n + 1, i))
							} else t(n, o, r)
						}

						function f(e, t, n) {
							for (var o = t; o < e.length; ++o) p(v(e[o]), n)
						}

						function p(e, t) {
							if (e !== t) {
								var n = e.state();
								0 === n ? e.visit(e, void 0, e._unreport) : 0 > n && e._unreport()
							}
						}

						function h(e) {
							return "object" != typeof e || null === e ? r(new TypeError("non-iterable passed to race()")) : 0 === e.length ? i() : 1 === e.length ? o(e[0]) : m(e)
						}

						function m(e) {
							var n, o, r, i = new w;
							for (n = 0; n < e.length; ++n)
								if (o = e[n], void 0 !== o || n in e) {
									if (r = v(o), 0 !== r.state()) {
										i.become(r), f(e, n + 1, r);
										break
									}
									r.visit(i, i.resolve, i.reject)
								}
							return new t(g, i)
						}

						function v(e) {
							return M(e) ? e._handler.join() : C(e) ? _(e) : new O(e)
						}

						function y(e) {
							return M(e) ? e._handler.join() : _(e)
						}

						function _(e) {
							try {
								var t = e.then;
								return "function" == typeof t ? new x(t, e) : new O(e)
							} catch (n) {
								return new E(n)
							}
						}

						function g() {}

						function b() {}

						function w(e, n) {
							t.createContext(this, n), this.consumers = void 0, this.receiver = e, this.handler = void 0, this.resolved = !1
						}

						function j(e) {
							this.handler = e
						}

						function x(e, t) {
							w.call(this), W.enqueue(new S(e, t, this))
						}

						function O(e) {
							t.createContext(this), this.value = e
						}

						function E(e) {
							t.createContext(this), this.id = ++V, this.value = e, this.handled = !1, this.reported = !1, this._report()
						}

						function P(e, t) {
							this.rejection = e, this.context = t
						}

						function k(e) {
							this.rejection = e
						}

						function R() {
							return new E(new TypeError("Promise cycle"))
						}

						function L(e, t) {
							this.continuation = e, this.handler = t
						}

						function T(e, t) {
							this.handler = t, this.value = e
						}

						function S(e, t, n) {
							this._then = e, this.thenable = t, this.resolver = n
						}

						function $(e, t, n, o, r) {
							try {
								e.call(t, n, o, r)
							} catch (i) {
								o(i)
							}
						}

						function q(e, t, n, o) {
							this.f = e, this.z = t, this.c = n, this.to = o, this.resolver = K, this.receiver = this
						}

						function M(e) {
							return e instanceof t
						}

						function C(e) {
							return ("object" == typeof e || "function" == typeof e) && null !== e
						}

						function I(e, n, o, r) {
							return "function" != typeof e ? r.become(n) : (t.enterContext(n), D(e, n.value, o, r), void t.exitContext())
						}

						function N(e, n, o, r, i) {
							return "function" != typeof e ? i.become(o) : (t.enterContext(o), H(e, n, o.value, r, i), void t.exitContext())
						}

						function U(e, n, o, r, i) {
							return "function" != typeof e ? i.notify(n) : (t.enterContext(o), Q(e, n, r, i), void t.exitContext())
						}

						function A(e, t, n) {
							try {
								return e(t, n)
							} catch (o) {
								return r(o)
							}
						}

						function D(e, t, n, o) {
							try {
								o.become(v(e.call(n, t)))
							} catch (r) {
								o.become(new E(r))
							}
						}

						function H(e, t, n, o, r) {
							try {
								e.call(o, t, n, r)
							} catch (i) {
								r.become(new E(i))
							}
						}

						function Q(e, t, n, o) {
							try {
								o.notify(e.call(n, t))
							} catch (r) {
								o.notify(r)
							}
						}

						function z(e, t) {
							t.prototype = J(e.prototype), t.prototype.constructor = t
						}

						function F(e, t) {
							return t
						}

						function X() {}

						function B() {
							return "undefined" != typeof process && null !== process && "function" == typeof process.emit ? function(e, t) {
								return "unhandledRejection" === e ? process.emit(e, t.value, t) : process.emit(e, t)
							} : "undefined" != typeof self && "function" == typeof CustomEvent ? function(e, t, n) {
								var o = !1;
								try {
									var r = new n("unhandledRejection");
									o = r instanceof n
								} catch (i) {}
								return o ? function(e, o) {
									var r = new n(e, {
										detail: {
											reason: o.value,
											key: o
										},
										bubbles: !1,
										cancelable: !0
									});
									return !t.dispatchEvent(r)
								} : e
							}(X, self, CustomEvent) : X
						}
						var W = e.scheduler,
							G = B(),
							J = Object.create || function(e) {
								function t() {}
								return t.prototype = e, new t
							};
						t.resolve = o, t.reject = r, t.never = i, t._defer = a, t._handler = v, t.prototype.then = function(e, t, n) {
							var o = this._handler,
								r = o.join().state();
							if ("function" != typeof e && r > 0 || "function" != typeof t && 0 > r) return new this.constructor(g, o);
							var i = this._beget(),
								a = i._handler;
							return o.chain(a, o.receiver, e, t, n), i
						}, t.prototype["catch"] = function(e) {
							return this.then(void 0, e)
						}, t.prototype._beget = function() {
							return s(this._handler, this.constructor)
						}, t.all = u, t.race = h, t._traverse = l, t._visitRemaining = f, g.prototype.when = g.prototype.become = g.prototype.notify = g.prototype.fail = g.prototype._unreport = g.prototype._report = X, g.prototype._state = 0, g.prototype.state = function() {
							return this._state
						}, g.prototype.join = function() {
							for (var e = this; void 0 !== e.handler;) e = e.handler;
							return e
						}, g.prototype.chain = function(e, t, n, o, r) {
							this.when({
								resolver: e,
								receiver: t,
								fulfilled: n,
								rejected: o,
								progress: r
							})
						}, g.prototype.visit = function(e, t, n, o) {
							this.chain(K, e, t, n, o)
						}, g.prototype.fold = function(e, t, n, o) {
							this.when(new q(e, t, n, o))
						}, z(g, b), b.prototype.become = function(e) {
							e.fail()
						};
						var K = new b;
						z(g, w), w.prototype._state = 0, w.prototype.resolve = function(e) {
							this.become(v(e))
						}, w.prototype.reject = function(e) {
							this.resolved || this.become(new E(e))
						}, w.prototype.join = function() {
							if (!this.resolved) return this;
							for (var e = this; void 0 !== e.handler;)
								if (e = e.handler, e === this) return this.handler = R();
							return e
						}, w.prototype.run = function() {
							var e = this.consumers,
								t = this.handler;
							this.handler = this.handler.join(), this.consumers = void 0;
							for (var n = 0; n < e.length; ++n) t.when(e[n])
						}, w.prototype.become = function(e) {
							this.resolved || (this.resolved = !0, this.handler = e, void 0 !== this.consumers && W.enqueue(this), void 0 !== this.context && e._report(this.context))
						}, w.prototype.when = function(e) {
							this.resolved ? W.enqueue(new L(e, this.handler)) : void 0 === this.consumers ? this.consumers = [e] : this.consumers.push(e)
						}, w.prototype.notify = function(e) {
							this.resolved || W.enqueue(new T(e, this))
						}, w.prototype.fail = function(e) {
							var t = "undefined" == typeof e ? this.context : e;
							this.resolved && this.handler.join().fail(t)
						}, w.prototype._report = function(e) {
							this.resolved && this.handler.join()._report(e)
						}, w.prototype._unreport = function() {
							this.resolved && this.handler.join()._unreport()
						}, z(g, j), j.prototype.when = function(e) {
							W.enqueue(new L(e, this))
						}, j.prototype._report = function(e) {
							this.join()._report(e)
						}, j.prototype._unreport = function() {
							this.join()._unreport()
						}, z(w, x), z(g, O), O.prototype._state = 1, O.prototype.fold = function(e, t, n, o) {
							N(e, t, this, n, o)
						}, O.prototype.when = function(e) {
							I(e.fulfilled, this, e.receiver, e.resolver)
						};
						var V = 0;
						z(g, E), E.prototype._state = -1, E.prototype.fold = function(e, t, n, o) {
							o.become(this)
						}, E.prototype.when = function(e) {
							"function" == typeof e.rejected && this._unreport(), I(e.rejected, this, e.receiver, e.resolver)
						}, E.prototype._report = function(e) {
							W.afterQueue(new P(this, e))
						}, E.prototype._unreport = function() {
							this.handled || (this.handled = !0, W.afterQueue(new k(this)))
						}, E.prototype.fail = function(e) {
							this.reported = !0, G("unhandledRejection", this), t.onFatalRejection(this, void 0 === e ? this.context : e)
						}, P.prototype.run = function() {
							this.rejection.handled || this.rejection.reported || (this.rejection.reported = !0, G("unhandledRejection", this.rejection) || t.onPotentiallyUnhandledRejection(this.rejection, this.context))
						}, k.prototype.run = function() {
							this.rejection.reported && (G("rejectionHandled", this.rejection) || t.onPotentiallyUnhandledRejectionHandled(this.rejection))
						}, t.createContext = t.enterContext = t.exitContext = t.onPotentiallyUnhandledRejection = t.onPotentiallyUnhandledRejectionHandled = t.onFatalRejection = X;
						var Y = new g,
							Z = new t(g, Y);
						return L.prototype.run = function() {
							this.handler.join().when(this.continuation)
						}, T.prototype.run = function() {
							var e = this.handler.consumers;
							if (void 0 !== e)
								for (var t, n = 0; n < e.length; ++n) t = e[n], U(t.progress, this.value, this.handler, t.receiver, t.resolver)
						}, S.prototype.run = function() {
							function e(e) {
								o.resolve(e)
							}

							function t(e) {
								o.reject(e)
							}

							function n(e) {
								o.notify(e)
							}
							var o = this.resolver;
							$(this._then, this.thenable, e, t, n)
						}, q.prototype.fulfilled = function(e) {
							this.f.call(this.c, this.z, e, this.to)
						}, q.prototype.rejected = function(e) {
							this.to.reject(e)
						}, q.prototype.progress = function(e) {
							this.to.notify(e)
						}, t
					}
				})
			}("function" == typeof e && e.amd ? e : function(e) {
				n.exports = e()
			})
		}, {}]
	}, {}, [1])(1)
}),
function(__global) {
	function __eval(__source, __global, __load) {
		try {
			eval('(function() { var __moduleName = "' + (__load.name || "").replace('"', '"') + '"; ' + __source + " \n }).call(__global);")
		} catch (e) {
			throw ("SyntaxError" == e.name || "TypeError" == e.name) && (e.message = "Evaluating " + (__load.name || load.address) + "\n	" + e.message), e
		}
	}
	$__Object$getPrototypeOf = Object.getPrototypeOf || function(e) {
		return e.__proto__
	};
	var $__Object$defineProperty;
	! function() {
		try {
			Object.defineProperty({}, "a", {}) && ($__Object$defineProperty = Object.defineProperty)
		} catch (e) {
			$__Object$defineProperty = function(e, t, n) {
				try {
					e[t] = n.value || n.get.call(e)
				} catch (o) {}
			}
		}
	}(), $__Object$create = Object.create || function(e, t) {
			function n() {}
			if (n.prototype = e, "object" == typeof t)
				for (prop in t) t.hasOwnProperty(prop) && (n[prop] = t[prop]);
			return new n
		},
		function() {
			function e(e) {
				return {
					status: "loading",
					name: e,
					linkSets: [],
					dependencies: [],
					metadata: {}
				}
			}

			function t(e, t, n) {
				return new P(a({
					step: n.address ? "fetch" : "locate",
					loader: e,
					moduleName: t,
					moduleMetadata: n && n.metadata || {},
					moduleSource: n.source,
					moduleAddress: n.address
				}))
			}

			function n(t, n, r, i) {
				return new P(function(e) {
					e(t.loaderObj.normalize(n, r, i))
				}).then(function(n) {
					var r;
					if (t.modules[n]) return r = e(n), r.status = "linked", r.module = t.modules[n], r;
					for (var i = 0, a = t.loads.length; a > i; i++)
						if (r = t.loads[i], r.name == n) return console.assert("loading" == r.status || "loaded" == r.status, "loading or loaded"), r;
					return r = e(n), t.loads.push(r), o(t, r), r
				})
			}

			function o(e, t) {
				r(e, t, P.resolve().then(function() {
					return e.loaderObj.locate({
						name: t.name,
						metadata: t.metadata
					})
				}))
			}

			function r(e, t, n) {
				i(e, t, n.then(function(n) {
					return "loading" == t.status ? (t.address = n, e.loaderObj.fetch({
						name: t.name,
						metadata: t.metadata,
						address: n
					})) : void 0
				}))
			}

			function i(e, t, o) {
				o.then(function(o) {
					return "loading" == t.status ? P.resolve(e.loaderObj.translate({
						name: t.name,
						metadata: t.metadata,
						address: t.address,
						source: o
					})).then(function(n) {
						return t.source = n, e.loaderObj.instantiate({
							name: t.name,
							metadata: t.metadata,
							address: t.address,
							source: n
						})
					}).then(function(n) {
						if (void 0 === n) return t.address = t.address || "<Anonymous Module " + ++L + ">", t.isDeclarative = !0, e.loaderObj.transpile(t).then(function(e) {
							var n = __global.System,
								o = n.register;
							n.register = function(e, n, o) {
								"string" != typeof e && (o = n, n = e), t.declare = o, t.depsList = n
							}, __eval(e, __global, t), n.register = o
						});
						if ("object" != typeof n) throw TypeError("Invalid instantiate return value");
						t.depsList = n.deps || [], t.execute = n.execute, t.isDeclarative = !1
					}).then(function() {
						t.dependencies = [];
						for (var o = t.depsList, r = [], i = 0, a = o.length; a > i; i++)(function(o, i) {
							r.push(n(e, o, t.name, t.address).then(function(e) {
								if (t.dependencies[i] = {
										key: o,
										value: e.name
									}, "linked" != e.status)
									for (var n = t.linkSets.concat([]), r = 0, a = n.length; a > r; r++) u(n[r], e)
							}))
						})(o[i], i);
						return P.all(r)
					}).then(function() {
						console.assert("loading" == t.status, "is loading"), t.status = "loaded";
						for (var e = t.linkSets.concat([]), n = 0, o = e.length; o > n; n++) c(e[n], t)
					}) : void 0
				})["catch"](function(e) {
					t.status = "failed", t.exception = e;
					for (var n = t.linkSets.concat([]), o = 0, r = n.length; r > o; o++) d(n[o], t, e);
					console.assert(0 == t.linkSets.length, "linkSets not removed")
				})
			}

			function a(t) {
				return function(n) {
					var a = t.loader,
						u = t.moduleName,
						l = t.step;
					if (a.modules[u]) throw new TypeError('"' + u + '" already exists in the module table');
					for (var c, d = 0, f = a.loads.length; f > d; d++)
						if (a.loads[d].name == u) return c = a.loads[d], "translate" != l || c.source || (c.address = t.moduleAddress, i(a, c, P.resolve(t.moduleSource))), c.linkSets[0].done.then(function() {
							n(c)
						});
					var p = e(u);
					p.metadata = t.moduleMetadata;
					var h = s(a, p);
					a.loads.push(p), n(h.done), "locate" == l ? o(a, p) : "fetch" == l ? r(a, p, P.resolve(t.moduleAddress)) : (console.assert("translate" == l, "translate step"), p.address = t.moduleAddress, i(a, p, P.resolve(t.moduleSource)))
				}
			}

			function s(e, t) {
				var n = {
					loader: e,
					loads: [],
					startingLoad: t,
					loadingCount: 0
				};
				return n.done = new P(function(e, t) {
					n.resolve = e, n.reject = t
				}), u(n, t), n
			}

			function u(e, t) {
				console.assert("loading" == t.status || "loaded" == t.status, "loading or loaded on link set");
				for (var n = 0, o = e.loads.length; o > n; n++)
					if (e.loads[n] == t) return;
				e.loads.push(t), t.linkSets.push(e), "loaded" != t.status && e.loadingCount++;
				for (var r = e.loader, n = 0, o = t.dependencies.length; o > n; n++) {
					var i = t.dependencies[n].value;
					if (!r.modules[i])
						for (var a = 0, s = r.loads.length; s > a; a++)
							if (r.loads[a].name == i) {
								u(e, r.loads[a]);
								break
							}
				}
			}

			function l(e) {
				var t = !1;
				try {
					m(e, function(n, o) {
						d(e, n, o), t = !0
					})
				} catch (n) {
					d(e, null, n), t = !0
				}
				return t
			}

			function c(e, t) {
				if (console.assert("loaded" == t.status || "linked" == t.status, "loaded or linked"), e.loadingCount--, !(e.loadingCount > 0)) {
					var n = e.startingLoad;
					if (e.loader.loaderObj.execute === !1) {
						for (var o = [].concat(e.loads), r = 0, i = o.length; i > r; r++) {
							var t = o[r];
							t.module = t.isDeclarative ? {
								name: t.name,
								module: T({}),
								evaluated: !0
							} : {
								module: T({})
							}, t.status = "linked", f(e.loader, t)
						}
						return e.resolve(n)
					}
					var a = l(e);
					a || (console.assert(0 == e.loads.length, "loads cleared"), e.resolve(n))
				}
			}

			function d(e, t, n) {
				var o = e.loader;
				t && e.loads[0].name != t.name && (n = j(n, 'Error loading "' + t.name + '" from "' + e.loads[0].name + '" at ' + (e.loads[0].address || "<unknown>") + "\n")), t && (n = j(n, 'Error loading "' + t.name + '" at ' + (t.address || "<unknown>") + "\n"));
				for (var r = e.loads.concat([]), i = 0, a = r.length; a > i; i++) {
					var t = r[i];
					o.loaderObj.failed = o.loaderObj.failed || [], -1 == k.call(o.loaderObj.failed, t) && o.loaderObj.failed.push(t);
					var s = k.call(t.linkSets, e);
					if (console.assert(-1 != s, "link not present"), t.linkSets.splice(s, 1), 0 == t.linkSets.length) {
						var u = k.call(e.loader.loads, t); - 1 != u && e.loader.loads.splice(u, 1)
					}
				}
				e.reject(n)
			}

			function f(e, t) {
				if (e.loaderObj.trace) {
					e.loaderObj.loads || (e.loaderObj.loads = {});
					var n = {};
					t.dependencies.forEach(function(e) {
						n[e.key] = e.value
					}), e.loaderObj.loads[t.name] = {
						name: t.name,
						deps: t.dependencies.map(function(e) {
							return e.key
						}),
						depMap: n,
						address: t.address,
						metadata: t.metadata,
						source: t.source,
						kind: t.isDeclarative ? "declarative" : "dynamic"
					}
				}
				t.name && (console.assert(!e.modules[t.name], "load not in module table"), e.modules[t.name] = t.module);
				var o = k.call(e.loads, t); - 1 != o && e.loads.splice(o, 1);
				for (var r = 0, i = t.linkSets.length; i > r; r++) o = k.call(t.linkSets[r].loads, t), -1 != o && t.linkSets[r].loads.splice(o, 1);
				t.linkSets.splice(0, t.linkSets.length)
			}

			function p(e, t, n) {
				if (n[e.groupIndex] = n[e.groupIndex] || [], -1 == k.call(n[e.groupIndex], e)) {
					n[e.groupIndex].push(e);
					for (var o = 0, r = t.length; r > o; o++)
						for (var i = t[o], a = 0; a < e.dependencies.length; a++)
							if (i.name == e.dependencies[a].value) {
								console.assert("loaded" == i.status, "Load in linkSet not loaded!");
								var s = e.groupIndex + (i.isDeclarative != e.isDeclarative);
								if (void 0 === i.groupIndex || i.groupIndex < s) {
									if (void 0 !== i.groupIndex && (n[i.groupIndex].splice(k.call(n[i.groupIndex], i), 1), 0 == n[i.groupIndex].length)) throw new TypeError("Mixed dependency cycle detected");
									i.groupIndex = s
								}
								p(i, t, n)
							}
				}
			}

			function h(e, t, n) {
				try {
					var o = t.execute()
				} catch (r) {
					return void n(t, r)
				}
				return o && o instanceof O ? o : void n(t, new TypeError("Execution must define a Module instance"))
			}

			function m(e, t) {
				var n = e.loader;
				if (e.loads.length) {
					var o = [],
						r = e.loads[0];
					r.groupIndex = 0, p(r, e.loads, o);
					for (var i = r.isDeclarative == o.length % 2, a = o.length - 1; a >= 0; a--) {
						for (var s = o[a], u = 0; u < s.length; u++) {
							var l = s[u];
							if (i) y(l, e.loads, n);
							else {
								var c = h(e, l, t);
								if (!c) return;
								l.module = {
									name: l.name,
									module: c
								}, l.status = "linked"
							}
							f(n, l)
						}
						i = !i
					}
				}
			}

			function v(e, t) {
				var n = t.moduleRecords;
				return n[e] || (n[e] = {
					name: e,
					dependencies: [],
					module: new O,
					importers: []
				})
			}

			function y(e, t, n) {
				if (!e.module) {
					var o = e.module = v(e.name, n),
						r = e.module.module,
						i = e.declare.call(__global, function(e, t) {
							o.locked = !0, r[e] = t;
							for (var n = 0, i = o.importers.length; i > n; n++) {
								var a = o.importers[n];
								if (!a.locked) {
									var s = k.call(a.dependencies, o);
									a.setters[s](r)
								}
							}
							return o.locked = !1, t
						});
					o.setters = i.setters, o.execute = i.execute;
					for (var a = 0, s = e.dependencies.length; s > a; a++) {
						var u = e.dependencies[a].value,
							l = n.modules[u];
						if (!l)
							for (var c = 0; c < t.length; c++) t[c].name == u && (t[c].module ? l = v(u, n) : (y(t[c], t, n), l = t[c].module));
						l.importers ? (o.dependencies.push(l), l.importers.push(o)) : o.dependencies.push(null), o.setters[a] && o.setters[a](l.module)
					}
					e.status = "linked"
				}
			}

			function _(e, t) {
				return console.assert("linked" == t.status, "is linked " + t.name), b(t.module, [], e), t.module.module
			}

			function g(e) {
				try {
					e.execute.call(__global)
				} catch (t) {
					return t
				}
			}

			function b(e, t, n) {
				var o = w(e, t, n);
				if (o) throw o
			}

			function w(e, t, n) {
				if (!e.evaluated && e.dependencies) {
					t.push(e);
					for (var o, r = e.dependencies, i = 0, a = r.length; a > i; i++) {
						var s = r[i];
						if (s && -1 == k.call(t, s) && (o = w(s, t, n))) return o = j(o, "Error evaluating " + s.name + "\n")
					}
					if (e.failed) return new Error("Module failed execution.");
					if (!e.evaluated) return e.evaluated = !0, o = g(e), o ? e.failed = !0 : Object.preventExtensions && Object.preventExtensions(e.module), e.execute = void 0, o
				}
			}

			function j(e, t) {
				return e instanceof Error ? e.message = t + e.message : e = t + e, e
			}

			function x(e) {
				if ("object" != typeof e) throw new TypeError("Options must be an object");
				e.normalize && (this.normalize = e.normalize), e.locate && (this.locate = e.locate), e.fetch && (this.fetch = e.fetch), e.translate && (this.translate = e.translate), e.instantiate && (this.instantiate = e.instantiate), this._loader = {
					loaderObj: this,
					loads: [],
					modules: {},
					importPromises: {},
					moduleRecords: {}
				}, R(this, "global", {
					get: function() {
						return __global
					}
				})
			}

			function O() {}

			function E(e, t, n) {
				var o = e._loader.importPromises;
				return o[t] = n.then(function(e) {
					return o[t] = void 0, e
				}, function(e) {
					throw o[t] = void 0, e
				})
			}
			var P = __global.Promise || require("when/es6-shim/Promise");
			__global.console && (console.assert = console.assert || function() {});
			var k = Array.prototype.indexOf || function(e) {
					for (var t = 0, n = this.length; n > t; t++)
						if (this[t] === e) return t;
					return -1
				},
				R = $__Object$defineProperty,
				L = 0;
			x.prototype = {
				constructor: x,
				define: function(e, t, n) {
					if (this._loader.importPromises[e]) throw new TypeError("Module is already loading.");
					return E(this, e, new P(a({
						step: "translate",
						loader: this._loader,
						moduleName: e,
						moduleMetadata: n && n.metadata || {},
						moduleSource: t,
						moduleAddress: n && n.address
					})))
				},
				"delete": function(e) {
					var t = this._loader;
					return delete t.importPromises[e], delete t.moduleRecords[e], t.modules[e] ? delete t.modules[e] : !1
				},
				get: function(e) {
					return this._loader.modules[e] ? (b(this._loader.modules[e], [], this), this._loader.modules[e].module) : void 0
				},
				has: function(e) {
					return !!this._loader.modules[e]
				},
				"import": function(e, n) {
					var o = this;
					return P.resolve(o.normalize(e, n && n.name, n && n.address)).then(function(e) {
						var r = o._loader;
						return r.modules[e] ? (b(r.modules[e], [], r._loader), r.modules[e].module) : r.importPromises[e] || E(o, e, t(r, e, n || {}).then(function(t) {
							return delete r.importPromises[e], _(r, t)
						}))
					})
				},
				load: function(e) {
					return this._loader.modules[e] ? (b(this._loader.modules[e], [], this._loader), P.resolve(this._loader.modules[e].module)) : this._loader.importPromises[e] || E(this, e, t(this._loader, e, {}))
				},
				module: function(t, n) {
					var o = e();
					o.address = n && n.address;
					var r = s(this._loader, o),
						a = P.resolve(t),
						u = this._loader,
						l = r.done.then(function() {
							return _(u, o)
						});
					return i(u, o, a), l
				},
				newModule: function(e) {
					if ("object" != typeof e) throw new TypeError("Expected object");
					var t, n = new O;
					if (Object.getOwnPropertyNames && null != e) t = Object.getOwnPropertyNames(e);
					else {
						t = [];
						for (var o in e) t.push(o)
					}
					for (var r = 0; r < t.length; r++)(function(t) {
						R(n, t, {
							configurable: !1,
							enumerable: !0,
							get: function() {
								return e[t]
							}
						})
					})(t[r]);
					return Object.preventExtensions && Object.preventExtensions(n), n
				},
				set: function(e, t) {
					if (!(t instanceof O)) throw new TypeError("Loader.set(" + e + ", module) must be a module");
					this._loader.modules[e] = {
						module: t
					}
				},
				normalize: function(e) {
					return e
				},
				locate: function(e) {
					return e.name
				},
				fetch: function() {
					throw new TypeError("Fetch not implemented")
				},
				translate: function(e) {
					return e.source
				},
				instantiate: function() {}
			};
			var T = x.prototype.newModule;
			"object" == typeof exports && (module.exports = x), __global.Reflect = __global.Reflect || {}, __global.Reflect.Loader = __global.Reflect.Loader || x, __global.Reflect.global = __global.Reflect.global || __global, __global.LoaderPolyfill = x
		}(),
		function(e) {
			function t(e, t) {
				return e.newModule({
					"default": i[t],
					__useDefault: !0
				})
			}

			function n(e, t) {
				var n = this.traceurOptions || {};
				n.modules = "instantiate", n.script = !1, n.sourceMaps = "inline", n.filename = e.address, n.inputSourceMap = e.metadata.sourceMap, n.moduleName = !1;
				var r = new t.Compiler(n),
					i = o(e.source, r, n.filename);
				return i + "\n//# sourceURL=" + e.address + "!eval"
			}

			function o(e, t, n) {
				try {
					return t.compile(e, n)
				} catch (o) {
					throw o[0]
				}
			}

			function r(e, t) {
				var n = this.babelOptions || {};
				n.modules = "system", n.sourceMap = "inline", n.filename = e.address, n.code = !0, n.ast = !1, n.blacklist || (n.blacklist = ["react"]);
				var o = t.transform(e.source, n).code;
				return o + "\n//# sourceURL=" + e.address + "!eval"
			}
			var i = __global;
			e.prototype.transpiler = "traceur", e.prototype.transpile = function(e) {
				var o = this;
				return o.transpilerHasRun || (i.traceur && !o.has("traceur") && o.set("traceur", t(o, "traceur")), i.babel && !o.has("babel") && o.set("babel", t(o, "babel")), o.transpilerHasRun = !0), o["import"](o.transpiler).then(function(t) {
					return t.__useDefault && (t = t["default"]), 'var __moduleAddress = "' + e.address + '";' + (t.Compiler ? n : r).call(o, e, t)
				})
			}, e.prototype.instantiate = function(e) {
				var n = this;
				return Promise.resolve(n.normalize(n.transpiler)).then(function(o) {
					return e.name === o ? {
						deps: [],
						execute: function() {
							var o = i.System,
								r = i.Reflect.Loader;
							return __eval("(function(require,exports,module){" + e.source + "})();", i, e), i.System = o, i.Reflect.Loader = r, t(n, e.name)
						}
					} : void 0
				})
			}
		}(__global.LoaderPolyfill),
		function() {
			function e(e) {
				var t = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/?#]*(?::[^:@\/?#]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
				return t ? {
					href: t[0] || "",
					protocol: t[1] || "",
					authority: t[2] || "",
					host: t[3] || "",
					hostname: t[4] || "",
					port: t[5] || "",
					pathname: t[6] || "",
					search: t[7] || "",
					hash: t[8] || ""
				} : null
			}

			function t(e) {
				var t = [];
				return e.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(e) {
					"/.." === e ? t.pop() : t.push(e)
				}), t.join("").replace(/^\//, "/" === e.charAt(0) ? "/" : "")
			}

			function n(n, o) {
				return s && (o = o.replace(/\\/g, "/")), o = e(o || ""), n = e(n || ""), o && n ? (o.protocol || n.protocol) + (o.protocol || o.authority ? o.authority : n.authority) + t(o.protocol || o.authority || "/" === o.pathname.charAt(0) ? o.pathname : o.pathname ? (n.authority && !n.pathname ? "/" : "") + n.pathname.slice(0, n.pathname.lastIndexOf("/") + 1) + o.pathname : n.pathname) + (o.protocol || o.authority || o.pathname ? o.search : o.search || n.search) + o.hash : null
			}

			function o() {
				document.removeEventListener("DOMContentLoaded", o, !1), window.removeEventListener("load", o, !1), r()
			}

			function r() {
				for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
					var n = e[t];
					if ("module" == n.type) {
						var o = n.innerHTML.substr(1);
						__global.System.module(o)["catch"](function(e) {
							setTimeout(function() {
								throw e
							})
						})
					}
				}
			}
			var i, a = "undefined" != typeof window && "undefined" != typeof document,
				s = "undefined" != typeof process && !!process.platform.match(/^win/),
				u = __global.Promise || require("when/es6-shim/Promise");
			if ("undefined" != typeof XMLHttpRequest) i = function(e, t, n) {
				function o() {
					t(i.responseText)
				}

				function r() {
					n(i.statusText + ": " + e || "XHR error")
				}
				var i = new XMLHttpRequest,
					a = !0,
					s = !1;
				if (!("withCredentials" in i)) {
					var u = /^(\w+:)?\/\/([^\/]+)/.exec(e);
					u && (a = u[2] === window.location.host, u[1] && (a &= u[1] === window.location.protocol))
				}
				a || "undefined" == typeof XDomainRequest || (i = new XDomainRequest, i.onload = o, i.onerror = r, i.ontimeout = r, i.onprogress = function() {}, i.timeout = 0, s = !0), i.onreadystatechange = function() {
					4 === i.readyState && (200 === i.status || 0 == i.status && i.responseText ? o() : r())
				}, i.open("GET", e, !0), s && setTimeout(function() {
					i.send()
				}, 0)
			};
			else {
				if ("undefined" == typeof require) throw new TypeError("No environment fetch API available.");
				var l;
				i = function(e, t, n) {
					if ("file:" != e.substr(0, 5)) throw "Only file URLs of the form file: allowed running in Node.";
					return l = l || require("fs"), e = e.substr(5), s && (e = e.replace(/\//g, "\\")), l.readFile(e, function(e, o) {
						return e ? n(e) : void t(o + "")
					})
				}
			}
			var c = function(e) {
					function t(t) {
						if (e.call(this, t || {}), "undefined" != typeof location && location.href) {
							var n = __global.location.href.split("#")[0].split("?")[0];
							this.baseURL = n.substring(0, n.lastIndexOf("/") + 1)
						} else {
							if ("undefined" == typeof process || !process.cwd) throw new TypeError("No environment baseURL");
							this.baseURL = "file:" + process.cwd() + "/", s && (this.baseURL = this.baseURL.replace(/\\/g, "/"))
						}
						this.paths = {
							"*": "*.js"
						}
					}
					return t.__proto__ = null !== e ? e : Function.prototype, t.prototype = $__Object$create(null !== e ? e.prototype : null), $__Object$defineProperty(t.prototype, "constructor", {
						value: t
					}), $__Object$defineProperty(t.prototype, "global", {
						get: function() {
							return __global
						},
						enumerable: !1
					}), $__Object$defineProperty(t.prototype, "strict", {
						get: function() {
							return !0
						},
						enumerable: !1
					}), $__Object$defineProperty(t.prototype, "normalize", {
						value: function(e, t) {
							if ("string" != typeof e) throw new TypeError("Module name must be a string");
							var n = e.split("/");
							if (0 == n.length) throw new TypeError("No module name provided");
							var o = 0,
								r = !1,
								i = 0;
							if ("." == n[0]) {
								if (o++, o == n.length) throw new TypeError('Illegal module name "' + e + '"');
								r = !0
							} else {
								for (;
									".." == n[o];)
									if (o++, o == n.length) throw new TypeError('Illegal module name "' + e + '"');
								o && (r = !0), i = o
							}
							for (var a = o; a < n.length; a++) {
								var s = n[a];
								if ("" == s || "." == s || ".." == s) throw new TypeError('Illegal module name "' + e + '"')
							}
							if (!r) return e; {
								var u = [],
									l = (t || "").split("/");
								l.length - 1 - i
							}
							return u = u.concat(l.splice(0, l.length - 1 - i)), u = u.concat(n.splice(o, n.length - o)), u.join("/")
						},
						enumerable: !1,
						writable: !0
					}), $__Object$defineProperty(t.prototype, "locate", {
						value: function(e) {
							var t, o = e.name,
								r = "";
							for (var i in this.paths) {
								var s = i.split("*");
								if (s.length > 2) throw new TypeError("Only one wildcard in a path is permitted");
								if (1 == s.length) {
									if (o == i && i.length > r.length) {
										r = i;
										break
									}
								} else o.substr(0, s[0].length) == s[0] && o.substr(o.length - s[1].length) == s[1] && (r = i, t = o.substr(s[0].length, o.length - s[1].length - s[0].length))
							}
							var u = this.paths[r];
							return t && (u = u.replace("*", t)), a && (u = u.replace(/#/g, "%23")), n(this.baseURL, u)
						},
						enumerable: !1,
						writable: !0
					}), $__Object$defineProperty(t.prototype, "fetch", {
						value: function(e) {
							var t = this;
							return new u(function(o, r) {
								i(n(t.baseURL, e.address), function(e) {
									o(e)
								}, r)
							})
						},
						enumerable: !1,
						writable: !0
					}), t
				}(__global.LoaderPolyfill),
				d = new c;
			if ("object" == typeof exports && (module.exports = d), __global.System = d, a && document.getElementsByTagName) {
				var f = document.getElementsByTagName("script");
				f = f[f.length - 1], "complete" === document.readyState ? setTimeout(r) : document.addEventListener && (document.addEventListener("DOMContentLoaded", o, !1), window.addEventListener("load", o, !1)), f.getAttribute("data-init") && window[f.getAttribute("data-init")]()
			}
		}()
}("undefined" != typeof window ? window : "undefined" != typeof global ? global : self);
//# sourceMappingURL=es6-module-loader@0.16.6.js.map