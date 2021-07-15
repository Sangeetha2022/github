! function (e) {
  var t = {};

  function n(i) {
    if (t[i]) return t[i].exports;
    var o = t[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
  }
  n.m = e, n.c = t, n.d = function (e, t, i) {
    n.o(e, t) || Object.defineProperty(e, t, {
      configurable: !1,
      enumerable: !0,
      get: i
    })
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "/", n(n.s = 3)
}({
  3: function (e, t, n) {
    e.exports = n("uE3l")
  },
  AaJZ: function (e, t, n) {
    "use strict";
    e.exports = n("DOtM")
  },
  DOtM: function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    ! function (global) {
      var qq = function (e) {
          "use strict";
          return {
            hide: function () {
              return e.style.display = "none", this
            },
            attach: function (t, n) {
              return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n),
                function () {
                  qq(e).detach(t, n)
                }
            },
            detach: function (t, n) {
              return e.removeEventListener ? e.removeEventListener(t, n, !1) : e.attachEvent && e.detachEvent("on" + t, n), this
            },
            contains: function (t) {
              return !!t && (e === t || (e.contains ? e.contains(t) : !!(8 & t.compareDocumentPosition(e))))
            },
            insertBefore: function (t) {
              return t.parentNode.insertBefore(e, t), this
            },
            remove: function () {
              return e.parentNode.removeChild(e), this
            },
            css: function (t) {
              if (null == e.style) throw new qq.Error("Can't apply style to node as it is not on the HTMLElement prototype chain!");
              return null != t.opacity && "string" != typeof e.style.opacity && void 0 !== e.filters && (t.filter = "alpha(opacity=" + Math.round(100 * t.opacity) + ")"), qq.extend(e.style, t), this
            },
            hasClass: function (t, n) {
              var i = new RegExp("(^| )" + t + "( |$)");
              return i.test(e.className) || !(!n || !i.test(e.parentNode.className))
            },
            addClass: function (t) {
              return qq(e).hasClass(t) || (e.className += " " + t), this
            },
            removeClass: function (t) {
              var n = new RegExp("(^| )" + t + "( |$)");
              return e.className = e.className.replace(n, " ").replace(/^\s+|\s+$/g, ""), this
            },
            getByClass: function (t, n) {
              var i, o = [];
              return n && e.querySelector ? e.querySelector("." + t) : e.querySelectorAll ? e.querySelectorAll("." + t) : (i = e.getElementsByTagName("*"), qq.each(i, function (e, n) {
                qq(n).hasClass(t) && o.push(n)
              }), n ? o[0] : o)
            },
            getFirstByClass: function (t) {
              return qq(e).getByClass(t, !0)
            },
            children: function () {
              for (var t = [], n = e.firstChild; n;) 1 === n.nodeType && t.push(n), n = n.nextSibling;
              return t
            },
            setText: function (t) {
              return e.innerText = t, e.textContent = t, this
            },
            clearText: function () {
              return qq(e).setText("")
            },
            hasAttribute: function (t) {
              var n;
              return e.hasAttribute ? !!e.hasAttribute(t) && null == /^false$/i.exec(e.getAttribute(t)) : void 0 !== (n = e[t]) && null == /^false$/i.exec(n)
            }
          }
        },
        ExifRestorer;
      ! function () {
        "use strict";
        var div;
        qq.canvasToBlob = function (e, t, n) {
          return qq.dataUriToBlob(e.toDataURL(t, n))
        }, qq.dataUriToBlob = function (e) {
          var t, n, i, o, r, a, s, l;
          return n = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURI(e.split(",")[1]), o = e.split(",")[0].split(":")[1].split(";")[0], t = new ArrayBuffer(n.length), i = new Uint8Array(t), qq.each(n, function (e, t) {
            i[e] = t.charCodeAt(0)
          }), r = t, a = o, s = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, (l = s && new s) ? (l.append(r), l.getBlob(a)) : new Blob([r], {
            type: a
          })
        }, qq.log = function (e, t) {
          window.console && (t && "info" !== t ? window.console[t] ? window.console[t](e) : window.console.log("<" + t + "> " + e) : window.console.log(e))
        }, qq.isObject = function (e) {
          return e && !e.nodeType && "[object Object]" === Object.prototype.toString.call(e)
        }, qq.isFunction = function (e) {
          return "function" == typeof e
        }, qq.isArray = function (e) {
          return "[object Array]" === Object.prototype.toString.call(e) || e && window.ArrayBuffer && e.buffer && e.buffer.constructor === ArrayBuffer
        }, qq.isItemList = function (e) {
          return "[object DataTransferItemList]" === Object.prototype.toString.call(e)
        }, qq.isNodeList = function (e) {
          return "[object NodeList]" === Object.prototype.toString.call(e) || e.item && e.namedItem
        }, qq.isString = function (e) {
          return "[object String]" === Object.prototype.toString.call(e)
        }, qq.trimStr = function (e) {
          return String.prototype.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }, qq.format = function (e) {
          var t = Array.prototype.slice.call(arguments, 1),
            n = e,
            i = n.indexOf("{}");
          return qq.each(t, function (e, t) {
            var o = n.substring(0, i),
              r = n.substring(i + 2);
            if ((i = (n = o + t + r).indexOf("{}", i + t.length)) < 0) return !1
          }), n
        }, qq.isFile = function (e) {
          return window.File && "[object File]" === Object.prototype.toString.call(e)
        }, qq.isFileList = function (e) {
          return window.FileList && "[object FileList]" === Object.prototype.toString.call(e)
        }, qq.isFileOrInput = function (e) {
          return qq.isFile(e) || qq.isInput(e)
        }, qq.isInput = function (e, t) {
          var n = function (e) {
            var n = e.toLowerCase();
            return t ? "file" !== n : "file" === n
          };
          return !!(window.HTMLInputElement && "[object HTMLInputElement]" === Object.prototype.toString.call(e) && e.type && n(e.type)) || !!(e.tagName && "input" === e.tagName.toLowerCase() && e.type && n(e.type))
        }, qq.isBlob = function (e) {
          if (window.Blob && "[object Blob]" === Object.prototype.toString.call(e)) return !0
        }, qq.isXhrUploadSupported = function () {
          var e = document.createElement("input");
          return e.type = "file", void 0 !== e.multiple && "undefined" != typeof File && "undefined" != typeof FormData && void 0 !== qq.createXhrInstance().upload
        }, qq.createXhrInstance = function () {
          if (window.XMLHttpRequest) return new XMLHttpRequest;
          try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
          } catch (e) {
            return qq.log("Neither XHR or ActiveX are supported!", "error"), null
          }
        }, qq.isFolderDropSupported = function (e) {
          return e.items && e.items.length > 0 && e.items[0].webkitGetAsEntry
        }, qq.isFileChunkingSupported = function () {
          return !qq.androidStock() && qq.isXhrUploadSupported() && (void 0 !== File.prototype.slice || void 0 !== File.prototype.webkitSlice || void 0 !== File.prototype.mozSlice)
        }, qq.sliceBlob = function (e, t, n) {
          return (e.slice || e.mozSlice || e.webkitSlice).call(e, t, n)
        }, qq.arrayBufferToHex = function (e) {
          var t = "",
            n = new Uint8Array(e);
          return qq.each(n, function (e, n) {
            var i = n.toString(16);
            i.length < 2 && (i = "0" + i), t += i
          }), t
        }, qq.readBlobToHex = function (e, t, n) {
          var i = qq.sliceBlob(e, t, t + n),
            o = new FileReader,
            r = new qq.Promise;
          return o.onload = function () {
            r.success(qq.arrayBufferToHex(o.result))
          }, o.onerror = r.failure, o.readAsArrayBuffer(i), r
        }, qq.extend = function (e, t, n) {
          return qq.each(t, function (t, i) {
            n && qq.isObject(i) ? (void 0 === e[t] && (e[t] = {}), qq.extend(e[t], i, !0)) : e[t] = i
          }), e
        }, qq.override = function (e, t) {
          var n = {},
            i = t(n);
          return qq.each(i, function (t, i) {
            void 0 !== e[t] && (n[t] = e[t]), e[t] = i
          }), e
        }, qq.indexOf = function (e, t, n) {
          if (e.indexOf) return e.indexOf(t, n);
          n = n || 0;
          var i = e.length;
          for (n < 0 && (n += i); n < i; n += 1)
            if (e.hasOwnProperty(n) && e[n] === t) return n;
          return -1
        }, qq.getUniqueId = function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
          })
        }, qq.ie = function () {
          return -1 !== navigator.userAgent.indexOf("MSIE") || -1 !== navigator.userAgent.indexOf("Trident")
        }, qq.ie7 = function () {
          return -1 !== navigator.userAgent.indexOf("MSIE 7")
        }, qq.ie8 = function () {
          return -1 !== navigator.userAgent.indexOf("MSIE 8")
        }, qq.ie10 = function () {
          return -1 !== navigator.userAgent.indexOf("MSIE 10")
        }, qq.ie11 = function () {
          return qq.ie() && -1 !== navigator.userAgent.indexOf("rv:11")
        }, qq.edge = function () {
          return navigator.userAgent.indexOf("Edge") >= 0
        }, qq.safari = function () {
          return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Apple")
        }, qq.chrome = function () {
          return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Google")
        }, qq.opera = function () {
          return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Opera")
        }, qq.firefox = function () {
          return !qq.edge() && !qq.ie11() && -1 !== navigator.userAgent.indexOf("Mozilla") && void 0 !== navigator.vendor && "" === navigator.vendor
        }, qq.windows = function () {
          return "Win32" === navigator.platform
        }, qq.android = function () {
          return -1 !== navigator.userAgent.toLowerCase().indexOf("android")
        }, qq.androidStock = function () {
          return qq.android() && navigator.userAgent.toLowerCase().indexOf("chrome") < 0
        }, qq.ios6 = function () {
          return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 6_")
        }, qq.ios7 = function () {
          return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 7_")
        }, qq.ios8 = function () {
          return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 8_")
        }, qq.ios800 = function () {
          return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 8_0 ")
        }, qq.ios = function () {
          return -1 !== navigator.userAgent.indexOf("iPad") || -1 !== navigator.userAgent.indexOf("iPod") || -1 !== navigator.userAgent.indexOf("iPhone")
        }, qq.iosChrome = function () {
          return qq.ios() && -1 !== navigator.userAgent.indexOf("CriOS")
        }, qq.iosSafari = function () {
          return qq.ios() && !qq.iosChrome() && -1 !== navigator.userAgent.indexOf("Safari")
        }, qq.iosSafariWebView = function () {
          return qq.ios() && !qq.iosChrome() && !qq.iosSafari()
        }, qq.preventDefault = function (e) {
          e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }, qq.toElement = (div = document.createElement("div"), function (e) {
          div.innerHTML = e;
          var t = div.firstChild;
          return div.removeChild(t), t
        }), qq.each = function (e, t) {
          var n;
          if (e)
            if (window.Storage && e.constructor === window.Storage)
              for (n = 0; n < e.length && !1 !== t(e.key(n), e.getItem(e.key(n))); n++);
            else if (qq.isArray(e) || qq.isItemList(e) || qq.isNodeList(e))
            for (n = 0; n < e.length && !1 !== t(n, e[n]); n++);
          else if (qq.isString(e))
            for (n = 0; n < e.length && !1 !== t(n, e.charAt(n)); n++);
          else
            for (n in e)
              if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t(n, e[n])) break
        }, qq.bind = function (e, t) {
          if (qq.isFunction(e)) {
            var n = Array.prototype.slice.call(arguments, 2);
            return function () {
              var i = qq.extend([], n);
              return arguments.length && (i = i.concat(Array.prototype.slice.call(arguments))), e.apply(t, i)
            }
          }
          throw new Error("first parameter must be a function!")
        }, qq.obj2url = function (e, t, n) {
          var i = [],
            o = "&",
            r = function (e, n) {
              var o = t ? /\[\]$/.test(t) ? t : t + "[" + n + "]" : n;
              "undefined" !== o && "undefined" !== n && i.push("object" == typeof e ? qq.obj2url(e, o, !0) : "[object Function]" === Object.prototype.toString.call(e) ? encodeURIComponent(o) + "=" + encodeURIComponent(e()) : encodeURIComponent(o) + "=" + encodeURIComponent(e))
            };
          return !n && t ? (o = /\?/.test(t) ? /\?$/.test(t) ? "" : "&" : "?", i.push(t), i.push(qq.obj2url(e))) : "[object Array]" === Object.prototype.toString.call(e) && void 0 !== e ? qq.each(e, function (e, t) {
            r(t, e)
          }) : void 0 !== e && null !== e && "object" == typeof e ? qq.each(e, function (e, t) {
            r(t, e)
          }) : i.push(encodeURIComponent(t) + "=" + encodeURIComponent(e)), t ? i.join(o) : i.join(o).replace(/^&/, "").replace(/%20/g, "+")
        }, qq.obj2FormData = function (e, t, n) {
          return t || (t = new FormData), qq.each(e, function (e, i) {
            e = n ? n + "[" + e + "]" : e, qq.isObject(i) ? qq.obj2FormData(i, t, e) : qq.isFunction(i) ? t.append(e, i()) : t.append(e, i)
          }), t
        }, qq.obj2Inputs = function (e, t) {
          var n;
          return t || (t = document.createElement("form")), qq.obj2FormData(e, {
            append: function (e, i) {
              (n = document.createElement("input")).setAttribute("name", e), n.setAttribute("value", i), t.appendChild(n)
            }
          }), t
        }, qq.parseJson = function (json) {
          return window.JSON && qq.isFunction(JSON.parse) ? JSON.parse(json) : eval("(" + json + ")")
        }, qq.getExtension = function (e) {
          var t = e.lastIndexOf(".") + 1;
          if (t > 0) return e.substr(t, e.length - t)
        }, qq.getFilename = function (e) {
          return qq.isInput(e) ? e.value.replace(/.*(\/|\\)/, "") : qq.isFile(e) && null !== e.fileName && void 0 !== e.fileName ? e.fileName : e.name
        }, qq.DisposeSupport = function () {
          var e = [];
          return {
            dispose: function () {
              var t;
              do {
                (t = e.shift()) && t()
              } while (t)
            },
            attach: function () {
              var e = arguments;
              this.addDisposer(qq(e[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)))
            },
            addDisposer: function (t) {
              e.push(t)
            }
          }
        }
      }(),
      function () {
        "use strict";
        void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          return qq
        }.call(exports, __webpack_require__, exports, module)) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
      }(),
      function () {
        "use strict";
        qq.Error = function (e) {
          this.message = "[Fine Uploader " + qq.version + "] " + e
        }, qq.Error.prototype = new Error
      }(), qq.version = "5.16.2", qq.supportedFeatures = function () {
          "use strict";
          var e, t, n, i, o, r, a, s, l, u, c, d, p, h, q, f, m;

          function g() {
            return !!window.XMLHttpRequest && void 0 !== qq.createXhrInstance().withCredentials
          }

          function _() {
            return void 0 !== window.XDomainRequest
          }
          return e = function () {
            var e, t = !0;
            try {
              (e = document.createElement("input")).type = "file", qq(e).hide(), e.disabled && (t = !1)
            } catch (e) {
              t = !1
            }
            return t
          }(), t = (i = e && qq.isXhrUploadSupported()) && !qq.androidStock(), o = (n = i && (("draggable" in (f = document.createElement("span")) || "ondragstart" in f && "ondrop" in f) && !qq.android() && !qq.ios())) && ((m = document.createElement("input")).type = "file", !!("webkitdirectory" in (m || document.querySelectorAll("input[type=file]")[0]))), r = i && qq.isFileChunkingSupported(), a = i && r && function () {
            try {
              return !!window.localStorage && qq.isFunction(window.localStorage.setItem)
            } catch (e) {
              return !1
            }
          }(), s = i && (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[1][4-9]|Chrome\/[2-9][0-9]/), l = e && (void 0 !== window.postMessage || i), c = g(), u = _(), d = !!g() || _(), p = void 0 !== document.createElement("input").webkitdirectory, h = i && void 0 !== window.FileReader, q = !!i && !qq.androidStock() && !qq.iosChrome(), {
            ajaxUploading: i,
            blobUploading: t,
            canDetermineSize: i,
            chunking: r,
            deleteFileCors: d,
            deleteFileCorsXdr: u,
            deleteFileCorsXhr: c,
            dialogElement: !!window.HTMLDialogElement,
            fileDrop: n,
            folderDrop: o,
            folderSelection: p,
            imagePreviews: h,
            imageValidation: h,
            itemSizeValidation: i,
            pause: r,
            progressBar: q,
            resume: a,
            scaling: h && t,
            tiffPreviews: qq.safari(),
            unlimitedScaledImageSize: !qq.ios(),
            uploading: e,
            uploadCors: l,
            uploadCustomHeaders: i,
            uploadNonMultipart: i,
            uploadViaPaste: s
          }
        }(), qq.isGenericPromise = function (e) {
          "use strict";
          return !!(e && e.then && qq.isFunction(e.then))
        }, qq.Promise = function () {
          "use strict";
          var e, t, n = [],
            i = [],
            o = [],
            r = 0;
          qq.extend(this, {
            then: function (o, a) {
              return 0 === r ? (o && n.push(o), a && i.push(a)) : -1 === r ? a && a.apply(null, t) : o && o.apply(null, e), this
            },
            done: function (n) {
              return 0 === r ? o.push(n) : n.apply(null, void 0 === t ? e : t), this
            },
            success: function () {
              return r = 1, e = arguments, n.length && qq.each(n, function (t, n) {
                n.apply(null, e)
              }), o.length && qq.each(o, function (t, n) {
                n.apply(null, e)
              }), this
            },
            failure: function () {
              return r = -1, t = arguments, i.length && qq.each(i, function (e, n) {
                n.apply(null, t)
              }), o.length && qq.each(o, function (e, n) {
                n.apply(null, t)
              }), this
            }
          })
        }, qq.BlobProxy = function (e, t) {
          "use strict";
          qq.extend(this, {
            referenceBlob: e,
            create: function () {
              return t(e)
            }
          })
        }, qq.UploadButton = function (e) {
          "use strict";
          var t, n, i = this,
            o = new qq.DisposeSupport,
            r = {
              acceptFiles: null,
              element: null,
              focusClass: "qq-upload-button-focus",
              folders: !1,
              hoverClass: "qq-upload-button-hover",
              ios8BrowserCrashWorkaround: !1,
              multiple: !1,
              name: "qqfile",
              onChange: function (e) {},
              title: null
            };

          function a() {
            var e = document.createElement("input");
            return e.setAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME, n), e.setAttribute("title", r.title), i.setMultiple(r.multiple, e), r.folders && qq.supportedFeatures.folderSelection && e.setAttribute("webkitdirectory", ""), r.acceptFiles && e.setAttribute("accept", r.acceptFiles), e.setAttribute("type", "file"), e.setAttribute("name", r.name), qq(e).css({
              position: "absolute",
              right: 0,
              top: 0,
              fontFamily: "Arial",
              fontSize: qq.ie() && !qq.ie8() ? "3500px" : "118px",
              margin: 0,
              padding: 0,
              cursor: "pointer",
              opacity: 0
            }), !qq.ie7() && qq(e).css({
              height: "100%"
            }), r.element.appendChild(e), o.attach(e, "change", function () {
              r.onChange(e)
            }), o.attach(e, "mouseover", function () {
              qq(r.element).addClass(r.hoverClass)
            }), o.attach(e, "mouseout", function () {
              qq(r.element).removeClass(r.hoverClass)
            }), o.attach(e, "focus", function () {
              qq(r.element).addClass(r.focusClass)
            }), o.attach(e, "blur", function () {
              qq(r.element).removeClass(r.focusClass)
            }), e
          }
          qq.extend(r, e), n = qq.getUniqueId(), qq(r.element).css({
            position: "relative",
            overflow: "hidden",
            direction: "ltr"
          }), qq.extend(this, {
            getInput: function () {
              return t
            },
            getButtonId: function () {
              return n
            },
            setMultiple: function (e, t) {
              var n = t || this.getInput();
              r.ios8BrowserCrashWorkaround && qq.ios8() && (qq.iosChrome() || qq.iosSafariWebView()) ? n.setAttribute("multiple", "") : e ? n.setAttribute("multiple", "") : n.removeAttribute("multiple")
            },
            setAcceptFiles: function (e) {
              e !== r.acceptFiles && t.setAttribute("accept", e)
            },
            reset: function () {
              t.parentNode && qq(t).remove(), qq(r.element).removeClass(r.focusClass), t = null, t = a()
            }
          }), t = a()
        }, qq.UploadButton.BUTTON_ID_ATTR_NAME = "qq-button-id", qq.UploadData = function (e) {
          "use strict";
          var t = [],
            n = {},
            i = {},
            o = {},
            r = {};

          function a(e) {
            if (qq.isArray(e)) {
              var n = [];
              return qq.each(e, function (e, i) {
                n.push(t[i])
              }), n
            }
            return t[e]
          }
          qq.extend(this, {
            addFile: function (a) {
              var s = a.status || qq.status.SUBMITTING,
                l = t.push({
                  name: a.name,
                  originalName: a.name,
                  uuid: a.uuid,
                  size: null == a.size ? -1 : a.size,
                  status: s,
                  file: a.file
                }) - 1;
              return a.batchId && (t[l].batchId = a.batchId, void 0 === r[a.batchId] && (r[a.batchId] = []), r[a.batchId].push(l)), a.proxyGroupId && (t[l].proxyGroupId = a.proxyGroupId, void 0 === o[a.proxyGroupId] && (o[a.proxyGroupId] = []), o[a.proxyGroupId].push(l)), t[l].id = l, n[a.uuid] = l, void 0 === i[s] && (i[s] = []), i[s].push(l), a.onBeforeStatusChange && a.onBeforeStatusChange(l), e.onStatusChange(l, null, s), l
            },
            retrieve: function (e) {
              return qq.isObject(e) && t.length ? void 0 !== e.id ? a(e.id) : void 0 !== e.uuid ? function (e) {
                if (qq.isArray(e)) {
                  var i = [];
                  return qq.each(e, function (e, o) {
                    i.push(t[n[o]])
                  }), i
                }
                return t[n[e]]
              }(e.uuid) : e.status ? (o = e.status, r = [], s = [].concat(o), qq.each(s, function (e, n) {
                var o = i[n];
                void 0 !== o && qq.each(o, function (e, n) {
                  r.push(t[n])
                })
              }), r) : void 0 : qq.extend([], t, !0);
              var o, r, s
            },
            removeFileRef: function (e) {
              var t = a(e);
              t && delete t.file
            },
            reset: function () {
              t = [], n = {}, i = {}, r = {}
            },
            setStatus: function (n, o) {
              var r = t[n].status,
                a = qq.indexOf(i[r], n);
              i[r].splice(a, 1), t[n].status = o, void 0 === i[o] && (i[o] = []), i[o].push(n), e.onStatusChange(n, r, o)
            },
            uuidChanged: function (e, i) {
              var o = t[e].uuid;
              t[e].uuid = i, n[i] = e, delete n[o]
            },
            updateName: function (e, n) {
              t[e].name = n
            },
            updateSize: function (e, n) {
              t[e].size = n
            },
            setParentId: function (e, n) {
              t[e].parentId = n
            },
            getIdsInProxyGroup: function (e) {
              var n = t[e].proxyGroupId;
              return n ? o[n] : []
            },
            getIdsInBatch: function (e) {
              var n = t[e].batchId;
              return r[n]
            }
          })
        }, qq.status = {
          SUBMITTING: "submitting",
          SUBMITTED: "submitted",
          REJECTED: "rejected",
          QUEUED: "queued",
          CANCELED: "canceled",
          PAUSED: "paused",
          UPLOADING: "uploading",
          UPLOAD_FINALIZING: "upload finalizing",
          UPLOAD_RETRYING: "retrying upload",
          UPLOAD_SUCCESSFUL: "upload successful",
          UPLOAD_FAILED: "upload failed",
          DELETE_FAILED: "delete failed",
          DELETING: "deleting",
          DELETED: "deleted"
        },
        function () {
          "use strict";
          qq.basePublicApi = {
            addBlobs: function (e, t, n) {
              this.addFiles(e, t, n)
            },
            addInitialFiles: function (e) {
              var t = this;
              qq.each(e, function (e, n) {
                t._addCannedFile(n)
              })
            },
            addFiles: function (e, t, n) {
              this._maybeHandleIos8SafariWorkaround();
              var i = 0 === this._storedIds.length ? qq.getUniqueId() : this._currentBatchId,
                o = qq.bind(function (e) {
                  this._handleNewFile({
                    blob: e,
                    name: this._options.blobs.defaultName
                  }, i, c)
                }, this),
                r = qq.bind(function (e) {
                  this._handleNewFile(e, i, c)
                }, this),
                a = qq.bind(function (e) {
                  var t = qq.canvasToBlob(e);
                  this._handleNewFile({
                    blob: t,
                    name: this._options.blobs.defaultName + ".png"
                  }, i, c)
                }, this),
                s = qq.bind(function (e) {
                  var t = e.quality && e.quality / 100,
                    n = qq.canvasToBlob(e.canvas, e.type, t);
                  this._handleNewFile({
                    blob: n,
                    name: e.name
                  }, i, c)
                }, this),
                l = qq.bind(function (e) {
                  if (qq.isInput(e) && qq.supportedFeatures.ajaxUploading) {
                    var t = Array.prototype.slice.call(e.files),
                      n = this;
                    qq.each(t, function (e, t) {
                      n._handleNewFile(t, i, c)
                    })
                  } else this._handleNewFile(e, i, c)
                }, this),
                u = this,
                c = [];
              this._currentBatchId = i, e && (qq.isFileList(e) && (e = Array.prototype.slice.call(e)), e = [].concat(e), qq.each(e, function (e, t) {
                qq.isFileOrInput(t) ? l(t) : qq.isBlob(t) ? o(t) : qq.isObject(t) ? t.blob && t.name ? r(t) : t.canvas && t.name && s(t) : t.tagName && "canvas" === t.tagName.toLowerCase() ? a(t) : u.log(t + " is not a valid file container!  Ignoring!", "warn")
              }), this.log("Received " + c.length + " files."), this._prepareItemsForUpload(c, t, n))
            },
            cancel: function (e) {
              var t = this._uploadData.retrieve({
                id: e
              });
              t && t.status === qq.status.UPLOAD_FINALIZING ? this.log(qq.format("Ignoring cancel for file ID {} ({}).  Finalizing upload.", e, this.getName(e)), "error") : this._handler.cancel(e)
            },
            cancelAll: function () {
              var e = [],
                t = this;
              qq.extend(e, this._storedIds), qq.each(e, function (e, n) {
                t.cancel(n)
              }), this._handler.cancelAll()
            },
            clearStoredFiles: function () {
              this._storedIds = []
            },
            continueUpload: function (e) {
              var t = this._uploadData.retrieve({
                id: e
              });
              return !(!qq.supportedFeatures.pause || !this._options.chunking.enabled) && (t.status === qq.status.PAUSED ? (this.log(qq.format("Paused file ID {} ({}) will be continued.  Not paused.", e, this.getName(e))), this._uploadFile(e), !0) : (this.log(qq.format("Ignoring continue for file ID {} ({}).  Not paused.", e, this.getName(e)), "error"), !1))
            },
            deleteFile: function (e) {
              return this._onSubmitDelete(e)
            },
            doesExist: function (e) {
              return this._handler.isValid(e)
            },
            drawThumbnail: function (e, t, n, i, o) {
              var r, a, s = new qq.Promise;
              return this._imageGenerator ? (r = this._thumbnailUrls[e], a = {
                customResizeFunction: o,
                maxSize: n > 0 ? n : null,
                scale: n > 0
              }, !i && qq.supportedFeatures.imagePreviews && (r = this.getFile(e)), null == r ? s.failure({
                container: t,
                error: "File or URL not found."
              }) : this._imageGenerator.generate(r, t, a).then(function (e) {
                s.success(e)
              }, function (e, t) {
                s.failure({
                  container: e,
                  error: t || "Problem generating thumbnail"
                })
              })) : s.failure({
                container: t,
                error: "Missing image generator module"
              }), s
            },
            getButton: function (e) {
              return this._getButton(this._buttonIdsForFileIds[e])
            },
            getEndpoint: function (e) {
              return this._endpointStore.get(e)
            },
            getFile: function (e) {
              var t, n = this._handler.getFile(e);
              return n || (t = this._uploadData.retrieve({
                id: e
              })) && (n = t.file), n || null
            },
            getInProgress: function () {
              return this._uploadData.retrieve({
                status: [qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED]
              }).length
            },
            getName: function (e) {
              return this._uploadData.retrieve({
                id: e
              }).name
            },
            getParentId: function (e) {
              var t = this.getUploads({
                  id: e
                }),
                n = null;
              return t && void 0 !== t.parentId && (n = t.parentId), n
            },
            getResumableFilesData: function () {
              return this._handler.getResumableFilesData()
            },
            getSize: function (e) {
              return this._uploadData.retrieve({
                id: e
              }).size
            },
            getNetUploads: function () {
              return this._netUploaded
            },
            getRemainingAllowedItems: function () {
              var e = this._currentItemLimit;
              return e > 0 ? e - this._netUploadedOrQueued : null
            },
            getUploads: function (e) {
              return this._uploadData.retrieve(e)
            },
            getUuid: function (e) {
              return this._uploadData.retrieve({
                id: e
              }).uuid
            },
            isResumable: function (e) {
              return this._handler.hasResumeRecord(e)
            },
            log: function (e, t) {
              !this._options.debug || t && "info" !== t ? t && "info" !== t && qq.log("[Fine Uploader " + qq.version + "] " + e, t) : qq.log("[Fine Uploader " + qq.version + "] " + e)
            },
            pauseUpload: function (e) {
              var t = this._uploadData.retrieve({
                id: e
              });
              if (!qq.supportedFeatures.pause || !this._options.chunking.enabled) return !1;
              if (qq.indexOf([qq.status.UPLOADING, qq.status.UPLOAD_RETRYING], t.status) >= 0) {
                if (this._handler.pause(e)) return this._uploadData.setStatus(e, qq.status.PAUSED), !0;
                this.log(qq.format("Unable to pause file ID {} ({}).", e, this.getName(e)), "error")
              } else this.log(qq.format("Ignoring pause for file ID {} ({}).  Not in progress.", e, this.getName(e)), "error");
              return !1
            },
            removeFileRef: function (e) {
              this._handler.expunge(e), this._uploadData.removeFileRef(e)
            },
            reset: function () {
              this.log("Resetting uploader..."), this._handler.reset(), this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], qq.each(this._buttons, function (e, t) {
                t.reset()
              }), this._paramsStore.reset(), this._endpointStore.reset(), this._netUploadedOrQueued = 0, this._netUploaded = 0, this._uploadData.reset(), this._buttonIdsForFileIds = [], this._pasteHandler && this._pasteHandler.reset(), this._options.session.refreshOnReset && this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], this._totalProgress && this._totalProgress.reset(), this._customResumeDataStore.reset()
            },
            retry: function (e) {
              return this._manualRetry(e)
            },
            scaleImage: function (e, t) {
              return qq.Scaler.prototype.scaleImage(e, t, {
                log: qq.bind(this.log, this),
                getFile: qq.bind(this.getFile, this),
                uploadData: this._uploadData
              })
            },
            setCustomHeaders: function (e, t) {
              this._customHeadersStore.set(e, t)
            },
            setCustomResumeData: function (e, t) {
              this._customResumeDataStore.set(t, e)
            },
            setDeleteFileCustomHeaders: function (e, t) {
              this._deleteFileCustomHeadersStore.set(e, t)
            },
            setDeleteFileEndpoint: function (e, t) {
              this._deleteFileEndpointStore.set(e, t)
            },
            setDeleteFileParams: function (e, t) {
              this._deleteFileParamsStore.set(e, t)
            },
            setEndpoint: function (e, t) {
              this._endpointStore.set(e, t)
            },
            setForm: function (e) {
              this._updateFormSupportAndParams(e)
            },
            setItemLimit: function (e) {
              this._currentItemLimit = e
            },
            setName: function (e, t) {
              this._uploadData.updateName(e, t)
            },
            setParams: function (e, t) {
              this._paramsStore.set(e, t)
            },
            setUuid: function (e, t) {
              return this._uploadData.uuidChanged(e, t)
            },
            setStatus: function (e, t) {
              if (!this.getUploads({
                  id: e
                })) throw new qq.Error(e + " is not a valid file ID.");
              switch (t) {
                case qq.status.DELETED:
                  this._onDeleteComplete(e, null, !1);
                  break;
                case qq.status.DELETE_FAILED:
                  this._onDeleteComplete(e, null, !0);
                  break;
                default:
                  var n = "Method setStatus called on '" + name + "' not implemented yet for " + t;
                  throw this.log(n), new qq.Error(n)
              }
            },
            uploadStoredFiles: function () {
              0 === this._storedIds.length ? this._itemError("noFilesError") : this._uploadStoredFiles()
            }
          }, qq.basePrivateApi = {
            _addCannedFile: function (e) {
              var t = this;
              return this._uploadData.addFile({
                uuid: e.uuid,
                name: e.name,
                size: e.size,
                status: qq.status.UPLOAD_SUCCESSFUL,
                onBeforeStatusChange: function (n) {
                  e.deleteFileEndpoint && t.setDeleteFileEndpoint(e.deleteFileEndpoint, n), e.deleteFileParams && t.setDeleteFileParams(e.deleteFileParams, n), e.thumbnailUrl && (t._thumbnailUrls[n] = e.thumbnailUrl), t._netUploaded++, t._netUploadedOrQueued++
                }
              })
            },
            _annotateWithButtonId: function (e, t) {
              qq.isFile(e) && (e.qqButtonId = this._getButtonId(t))
            },
            _batchError: function (e) {
              this._options.callbacks.onError(null, null, e, void 0)
            },
            _createDeleteHandler: function () {
              var e = this;
              return new qq.DeleteFileAjaxRequester({
                method: this._options.deleteFile.method.toUpperCase(),
                maxConnections: this._options.maxConnections,
                uuidParamName: this._options.request.uuidName,
                customHeaders: this._deleteFileCustomHeadersStore,
                paramsStore: this._deleteFileParamsStore,
                endpointStore: this._deleteFileEndpointStore,
                cors: this._options.cors,
                log: qq.bind(e.log, e),
                onDelete: function (t) {
                  e._onDelete(t), e._options.callbacks.onDelete(t)
                },
                onDeleteComplete: function (t, n, i) {
                  e._onDeleteComplete(t, n, i), e._options.callbacks.onDeleteComplete(t, n, i)
                }
              })
            },
            _createPasteHandler: function () {
              var e = this;
              return new qq.PasteSupport({
                targetElement: this._options.paste.targetElement,
                callbacks: {
                  log: qq.bind(e.log, e),
                  pasteReceived: function (t) {
                    e._handleCheckedCallback({
                      name: "onPasteReceived",
                      callback: qq.bind(e._options.callbacks.onPasteReceived, e, t),
                      onSuccess: qq.bind(e._handlePasteSuccess, e, t),
                      identifier: "pasted image"
                    })
                  }
                }
              })
            },
            _createStore: function (e, t) {
              var n = {},
                i = e,
                o = {},
                r = t,
                a = function (e) {
                  return qq.isObject(e) ? qq.extend({}, e) : e
                },
                s = function (e, t) {
                  r && qq.isObject(t) && qq.extend(t, qq.isFunction(r) ? r() : r), o[e] && qq.extend(t, o[e])
                };
              return {
                set: function (e, t) {
                  null == t ? (n = {}, i = a(e)) : n[t] = a(e)
                },
                get: function (e) {
                  var t;
                  return t = null != e && n[e] ? n[e] : a(i), s(e, t), a(t)
                },
                addReadOnly: function (e, t) {
                  qq.isObject(n) && (null === e ? qq.isFunction(t) ? r = t : (r = r || {}, qq.extend(r, t)) : (o[e] = o[e] || {}, qq.extend(o[e], t)))
                },
                remove: function (e) {
                  return delete n[e]
                },
                reset: function () {
                  n = {}, o = {}, i = e
                }
              }
            },
            _createUploadDataTracker: function () {
              var e = this;
              return new qq.UploadData({
                getName: function (t) {
                  return e.getName(t)
                },
                getUuid: function (t) {
                  return e.getUuid(t)
                },
                getSize: function (t) {
                  return e.getSize(t)
                },
                onStatusChange: function (t, n, i) {
                  e._onUploadStatusChange(t, n, i), e._options.callbacks.onStatusChange(t, n, i), e._maybeAllComplete(t, i), e._totalProgress && setTimeout(function () {
                    e._totalProgress.onStatusChange(t, n, i)
                  }, 0)
                }
              })
            },
            _createUploadButton: function (e) {
              var t, n = this,
                i = e.accept || this._options.validation.acceptFiles,
                o = e.allowedExtensions || this._options.validation.allowedExtensions;
              return t = new qq.UploadButton({
                acceptFiles: i,
                element: e.element,
                focusClass: this._options.classes.buttonFocus,
                folders: e.folders,
                hoverClass: this._options.classes.buttonHover,
                ios8BrowserCrashWorkaround: this._options.workarounds.ios8BrowserCrash,
                multiple: !!qq.supportedFeatures.ajaxUploading && !(n._options.workarounds.iosEmptyVideos && qq.ios() && !qq.ios6() && n._isAllowedExtension(o, ".mov")) && (void 0 === e.multiple ? n._options.multiple : e.multiple),
                name: this._options.request.inputName,
                onChange: function (e) {
                  n._onInputChange(e)
                },
                title: null == e.title ? this._options.text.fileInputTitle : e.title
              }), this._disposeSupport.addDisposer(function () {
                t.dispose()
              }), n._buttons.push(t), t
            },
            _createUploadHandler: function (e, t) {
              var n = this,
                i = {},
                o = {
                  debug: this._options.debug,
                  maxConnections: this._options.maxConnections,
                  cors: this._options.cors,
                  paramsStore: this._paramsStore,
                  endpointStore: this._endpointStore,
                  chunking: this._options.chunking,
                  resume: this._options.resume,
                  blobs: this._options.blobs,
                  log: qq.bind(n.log, n),
                  preventRetryParam: this._options.retry.preventRetryResponseProperty,
                  onProgress: function (e, t, o, r) {
                    o < 0 || r < 0 || (i[e] && i[e].loaded === o && i[e].total === r || (n._onProgress(e, t, o, r), n._options.callbacks.onProgress(e, t, o, r)), i[e] = {
                      loaded: o,
                      total: r
                    })
                  },
                  onComplete: function (e, t, o, r) {
                    delete i[e];
                    var a, s = n.getUploads({
                      id: e
                    }).status;
                    s !== qq.status.UPLOAD_SUCCESSFUL && s !== qq.status.UPLOAD_FAILED && ((a = n._onComplete(e, t, o, r)) instanceof qq.Promise ? a.done(function () {
                      n._options.callbacks.onComplete(e, t, o, r)
                    }) : n._options.callbacks.onComplete(e, t, o, r))
                  },
                  onCancel: function (e, t, i) {
                    var o = new qq.Promise;
                    return n._handleCheckedCallback({
                      name: "onCancel",
                      callback: qq.bind(n._options.callbacks.onCancel, n, e, t),
                      onFailure: o.failure,
                      onSuccess: function () {
                        i.then(function () {
                          n._onCancel(e, t)
                        }), o.success()
                      },
                      identifier: e
                    }), o
                  },
                  onUploadPrep: qq.bind(this._onUploadPrep, this),
                  onUpload: function (e, t) {
                    n._onUpload(e, t);
                    var i = n._options.callbacks.onUpload(e, t);
                    return qq.isGenericPromise(i) ? (n.log(qq.format("onUpload for {} returned a Promise - waiting for resolution.", e)), i) : (new qq.Promise).success()
                  },
                  onUploadChunk: function (e, t, i) {
                    n._onUploadChunk(e, i);
                    var o = n._options.callbacks.onUploadChunk(e, t, i);
                    return qq.isGenericPromise(o) ? (n.log(qq.format("onUploadChunk for {}.{} returned a Promise - waiting for resolution.", e, i.partIndex)), o) : (new qq.Promise).success()
                  },
                  onUploadChunkSuccess: function (e, t, i, o) {
                    n._onUploadChunkSuccess(e, t), n._options.callbacks.onUploadChunkSuccess.apply(n, arguments)
                  },
                  onResume: function (e, t, i, o) {
                    return n._options.callbacks.onResume(e, t, i, o)
                  },
                  onAutoRetry: function (e, t, i, o) {
                    return n._onAutoRetry.apply(n, arguments)
                  },
                  onUuidChanged: function (e, t) {
                    n.log("Server requested UUID change from '" + n.getUuid(e) + "' to '" + t + "'"), n.setUuid(e, t)
                  },
                  getName: qq.bind(n.getName, n),
                  getUuid: qq.bind(n.getUuid, n),
                  getSize: qq.bind(n.getSize, n),
                  setSize: qq.bind(n._setSize, n),
                  getDataByUuid: function (e) {
                    return n.getUploads({
                      uuid: e
                    })
                  },
                  isQueued: function (e) {
                    var t = n.getUploads({
                      id: e
                    }).status;
                    return t === qq.status.QUEUED || t === qq.status.SUBMITTED || t === qq.status.UPLOAD_RETRYING || t === qq.status.PAUSED
                  },
                  getIdsInProxyGroup: n._uploadData.getIdsInProxyGroup,
                  getIdsInBatch: n._uploadData.getIdsInBatch,
                  isInProgress: function (e) {
                    return n.getUploads({
                      id: e
                    }).status === qq.status.UPLOADING
                  },
                  getCustomResumeData: qq.bind(n._getCustomResumeData, n),
                  setStatus: function (e, t) {
                    n._uploadData.setStatus(e, t)
                  }
                };
              return qq.each(this._options.request, function (e, t) {
                o[e] = t
              }), o.customHeaders = this._customHeadersStore, e && qq.each(e, function (e, t) {
                o[e] = t
              }), new qq.UploadHandlerController(o, t)
            },
            _fileOrBlobRejected: function (e) {
              this._netUploadedOrQueued--, this._uploadData.setStatus(e, qq.status.REJECTED)
            },
            _formatSize: function (e) {
              if (0 === e) return e + this._options.text.sizeSymbols[0];
              var t = -1;
              do {
                e /= 1e3, t++
              } while (e > 999);
              return Math.max(e, .1).toFixed(1) + this._options.text.sizeSymbols[t]
            },
            _generateExtraButtonSpecs: function () {
              var e = this;
              this._extraButtonSpecs = {}, qq.each(this._options.extraButtons, function (t, n) {
                var i = n.multiple,
                  o = qq.extend({}, e._options.validation, !0),
                  r = qq.extend({}, n);
                void 0 === i && (i = e._options.multiple), r.validation && qq.extend(o, n.validation, !0), qq.extend(r, {
                  multiple: i,
                  validation: o
                }, !0), e._initExtraButton(r)
              })
            },
            _getButton: function (e) {
              var t = this._extraButtonSpecs[e];
              return t ? t.element : e === this._defaultButtonId ? this._options.button : void 0
            },
            _getButtonId: function (e) {
              var t, n, i = e;
              if (i instanceof qq.BlobProxy && (i = i.referenceBlob), i && !qq.isBlob(i)) {
                if (qq.isFile(i)) return i.qqButtonId;
                if ("input" === i.tagName.toLowerCase() && "file" === i.type.toLowerCase()) return i.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                if (t = i.getElementsByTagName("input"), qq.each(t, function (e, t) {
                    if ("file" === t.getAttribute("type")) return n = t, !1
                  }), n) return n.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME)
              }
            },
            _getCustomResumeData: function (e) {
              return this._customResumeDataStore.get(e)
            },
            _getNotFinished: function () {
              return this._uploadData.retrieve({
                status: [qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED, qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED]
              }).length
            },
            _getValidationBase: function (e) {
              var t = this._extraButtonSpecs[e];
              return t ? t.validation : this._options.validation
            },
            _getValidationDescriptor: function (e) {
              return e.file instanceof qq.BlobProxy ? {
                name: qq.getFilename(e.file.referenceBlob),
                size: e.file.referenceBlob.size
              } : {
                name: this.getUploads({
                  id: e.id
                }).name,
                size: this.getUploads({
                  id: e.id
                }).size
              }
            },
            _getValidationDescriptors: function (e) {
              var t = this,
                n = [];
              return qq.each(e, function (e, i) {
                n.push(t._getValidationDescriptor(i))
              }), n
            },
            _handleCameraAccess: function () {
              if (this._options.camera.ios && qq.ios()) {
                var e = this._options.camera.button,
                  t = e ? this._getButtonId(e) : this._defaultButtonId,
                  n = this._options;
                t && t !== this._defaultButtonId && (n = this._extraButtonSpecs[t]), n.multiple = !1, null === n.validation.acceptFiles ? n.validation.acceptFiles = "image/*;capture=camera" : n.validation.acceptFiles += ",image/*;capture=camera", qq.each(this._buttons, function (e, i) {
                  if (i.getButtonId() === t) return i.setMultiple(n.multiple), i.setAcceptFiles(n.acceptFiles), !1
                })
              }
            },
            _handleCheckedCallback: function (e) {
              var t = this,
                n = e.callback();
              return qq.isGenericPromise(n) ? (this.log(e.name + " - waiting for " + e.name + " promise to be fulfilled for " + e.identifier), n.then(function (n) {
                t.log(e.name + " promise success for " + e.identifier), e.onSuccess(n)
              }, function () {
                e.onFailure ? (t.log(e.name + " promise failure for " + e.identifier), e.onFailure()) : t.log(e.name + " promise failure for " + e.identifier)
              })) : (!1 !== n ? e.onSuccess(n) : e.onFailure ? (this.log(e.name + " - return value was 'false' for " + e.identifier + ".  Invoking failure callback."), e.onFailure()) : this.log(e.name + " - return value was 'false' for " + e.identifier + ".  Will not proceed."), n)
            },
            _handleNewFile: function (e, t, n) {
              var i = this,
                o = qq.getUniqueId(),
                r = -1,
                a = qq.getFilename(e),
                s = e.blob || e,
                l = this._customNewFileHandler ? this._customNewFileHandler : qq.bind(i._handleNewFileGeneric, i);
              !qq.isInput(s) && s.size >= 0 && (r = s.size), l(s, a, o, r, n, t, this._options.request.uuidName, {
                uploadData: i._uploadData,
                paramsStore: i._paramsStore,
                addFileToHandler: function (e, t) {
                  i._handler.add(e, t), i._netUploadedOrQueued++, i._trackButton(e)
                }
              })
            },
            _handleNewFileGeneric: function (e, t, n, i, o, r) {
              var a = this._uploadData.addFile({
                uuid: n,
                name: t,
                size: i,
                batchId: r,
                file: e
              });
              this._handler.add(a, e), this._trackButton(a), this._netUploadedOrQueued++, o.push({
                id: a,
                file: e
              })
            },
            _handlePasteSuccess: function (e, t) {
              var n = e.type.split("/")[1],
                i = t;
              null == i && (i = this._options.paste.defaultName), i += "." + n, this.addFiles({
                name: i,
                blob: e
              })
            },
            _handleDeleteSuccess: function (e) {
              if (this.getUploads({
                  id: e
                }).status !== qq.status.DELETED) {
                var t = this.getName(e);
                this._netUploadedOrQueued--, this._netUploaded--, this._handler.expunge(e), this._uploadData.setStatus(e, qq.status.DELETED), this.log("Delete request for '" + t + "' has succeeded.")
              }
            },
            _handleDeleteFailed: function (e, t) {
              var n = this.getName(e);
              this._uploadData.setStatus(e, qq.status.DELETE_FAILED), this.log("Delete request for '" + n + "' has failed.", "error"), t && void 0 !== t.withCredentials ? this._options.callbacks.onError(e, n, "Delete request failed with response code " + t.status, t) : this._options.callbacks.onError(e, n, "Delete request failed", t)
            },
            _initExtraButton: function (e) {
              var t = this._createUploadButton({
                accept: e.validation.acceptFiles,
                allowedExtensions: e.validation.allowedExtensions,
                element: e.element,
                folders: e.folders,
                multiple: e.multiple,
                title: e.fileInputTitle
              });
              this._extraButtonSpecs[t.getButtonId()] = e
            },
            _initFormSupportAndParams: function () {
              this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this)), this._formSupport && this._formSupport.attachedToForm ? (this._paramsStore = this._createStore(this._options.request.params, this._formSupport.getFormInputsAsObject), this._options.autoUpload = this._formSupport.newAutoUpload, this._formSupport.newEndpoint && (this._options.request.endpoint = this._formSupport.newEndpoint)) : this._paramsStore = this._createStore(this._options.request.params)
            },
            _isDeletePossible: function () {
              return !(!qq.DeleteFileAjaxRequester || !this._options.deleteFile.enabled) && (!this._options.cors.expected || (!!qq.supportedFeatures.deleteFileCorsXhr || !(!qq.supportedFeatures.deleteFileCorsXdr || !this._options.cors.allowXdr)))
            },
            _isAllowedExtension: function (e, t) {
              var n = !1;
              return !e.length || (qq.each(e, function (e, i) {
                if (qq.isString(i)) {
                  var o = new RegExp("\\." + i + "$", "i");
                  if (null != t.match(o)) return n = !0, !1
                }
              }), n)
            },
            _itemError: function (e, t, n) {
              var i, o, r = this._options.messages[e],
                a = [],
                s = [].concat(t),
                l = s[0],
                u = this._getButtonId(n),
                c = this._getValidationBase(u);

              function d(e, t) {
                r = r.replace(e, t)
              }
              return qq.each(c.allowedExtensions, function (e, t) {
                qq.isString(t) && a.push(t)
              }), i = a.join(", ").toLowerCase(), d("{file}", this._options.formatFileName(l)), d("{extensions}", i), d("{sizeLimit}", this._formatSize(c.sizeLimit)), d("{minSizeLimit}", this._formatSize(c.minSizeLimit)), null !== (o = r.match(/(\{\w+\})/g)) && qq.each(o, function (e, t) {
                d(t, s[e])
              }), this._options.callbacks.onError(null, l, r, void 0), r
            },
            _manualRetry: function (e, t) {
              if (this._onBeforeManualRetry(e)) return this._netUploadedOrQueued++, this._uploadData.setStatus(e, qq.status.UPLOAD_RETRYING), t ? t(e) : this._handler.retry(e), !0
            },
            _maybeAllComplete: function (e, t) {
              var n = this,
                i = this._getNotFinished();
              t === qq.status.UPLOAD_SUCCESSFUL ? this._succeededSinceLastAllComplete.push(e) : t === qq.status.UPLOAD_FAILED && this._failedSinceLastAllComplete.push(e), 0 === i && (this._succeededSinceLastAllComplete.length || this._failedSinceLastAllComplete.length) && setTimeout(function () {
                n._onAllComplete(n._succeededSinceLastAllComplete, n._failedSinceLastAllComplete)
              }, 0)
            },
            _maybeHandleIos8SafariWorkaround: function () {
              var e = this;
              if (this._options.workarounds.ios8SafariUploads && qq.ios800() && qq.iosSafari()) throw setTimeout(function () {
                window.alert(e._options.messages.unsupportedBrowserIos8Safari)
              }, 0), new qq.Error(this._options.messages.unsupportedBrowserIos8Safari)
            },
            _maybeParseAndSendUploadError: function (e, t, n, i) {
              if (!n.success)
                if (i && 200 !== i.status && !n.error) this._options.callbacks.onError(e, t, "XHR returned response code " + i.status, i);
                else {
                  var o = n.error ? n.error : this._options.text.defaultResponseError;
                  this._options.callbacks.onError(e, t, o, i)
                }
            },
            _maybeProcessNextItemAfterOnValidateCallback: function (e, t, n, i, o) {
              var r = this;
              if (t.length > n)
                if (e || !this._options.validation.stopOnFirstInvalidFile) setTimeout(function () {
                  var e = r._getValidationDescriptor(t[n]),
                    a = r._getButtonId(t[n].file),
                    s = r._getButton(a);
                  r._handleCheckedCallback({
                    name: "onValidate",
                    callback: qq.bind(r._options.callbacks.onValidate, r, e, s),
                    onSuccess: qq.bind(r._onValidateCallbackSuccess, r, t, n, i, o),
                    onFailure: qq.bind(r._onValidateCallbackFailure, r, t, n, i, o),
                    identifier: "Item '" + e.name + "', size: " + e.size
                  })
                }, 0);
                else if (!e)
                for (; n < t.length; n++) r._fileOrBlobRejected(t[n].id)
            },
            _onAllComplete: function (e, t) {
              this._totalProgress && this._totalProgress.onAllComplete(e, t, this._preventRetries), this._options.callbacks.onAllComplete(qq.extend([], e), qq.extend([], t)), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = []
            },
            _onAutoRetry: function (e, t, n, i, o) {
              var r = this;
              if (r._preventRetries[e] = n[r._options.retry.preventRetryResponseProperty], r._shouldAutoRetry(e)) {
                var a = 1e3 * r._options.retry.autoAttemptDelay;
                return r._maybeParseAndSendUploadError.apply(r, arguments), r._options.callbacks.onAutoRetry(e, t, r._autoRetries[e]), r._onBeforeAutoRetry(e, t), r._uploadData.setStatus(e, qq.status.UPLOAD_RETRYING), r._retryTimeouts[e] = setTimeout(function () {
                  r.log("Starting retry for " + t + "..."), o ? o(e) : r._handler.retry(e)
                }, a), !0
              }
            },
            _onBeforeAutoRetry: function (e, t) {
              this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + t + "...")
            },
            _onBeforeManualRetry: function (e) {
              var t, n = this._currentItemLimit;
              return this._preventRetries[e] ? (this.log("Retries are forbidden for id " + e, "warn"), !1) : this._handler.isValid(e) ? (t = this.getName(e), !1 !== this._options.callbacks.onManualRetry(e, t) && (n > 0 && this._netUploadedOrQueued + 1 > n ? (this._itemError("retryFailTooManyItems"), !1) : (this.log("Retrying upload for '" + t + "' (id: " + e + ")..."), !0))) : (this.log("'" + e + "' is not a valid file ID", "error"), !1)
            },
            _onCancel: function (e, t) {
              this._netUploadedOrQueued--, clearTimeout(this._retryTimeouts[e]);
              var n = qq.indexOf(this._storedIds, e);
              !this._options.autoUpload && n >= 0 && this._storedIds.splice(n, 1), this._uploadData.setStatus(e, qq.status.CANCELED)
            },
            _onComplete: function (e, t, n, i) {
              return n.success ? (n.thumbnailUrl && (this._thumbnailUrls[e] = n.thumbnailUrl), this._netUploaded++, this._uploadData.setStatus(e, qq.status.UPLOAD_SUCCESSFUL)) : (this._netUploadedOrQueued--, this._uploadData.setStatus(e, qq.status.UPLOAD_FAILED), !0 === n[this._options.retry.preventRetryResponseProperty] && (this._preventRetries[e] = !0)), this._maybeParseAndSendUploadError(e, t, n, i), !!n.success
            },
            _onDelete: function (e) {
              this._uploadData.setStatus(e, qq.status.DELETING)
            },
            _onDeleteComplete: function (e, t, n) {
              this.getName(e);
              n ? this._handleDeleteFailed(e, t) : this._handleDeleteSuccess(e)
            },
            _onInputChange: function (e) {
              var t;
              if (qq.supportedFeatures.ajaxUploading) {
                for (t = 0; t < e.files.length; t++) this._annotateWithButtonId(e.files[t], e);
                this.addFiles(e.files)
              } else e.value.length > 0 && this.addFiles(e);
              qq.each(this._buttons, function (e, t) {
                t.reset()
              })
            },
            _onProgress: function (e, t, n, i) {
              this._totalProgress && this._totalProgress.onIndividualProgress(e, n, i)
            },
            _onSubmit: function (e, t) {},
            _onSubmitCallbackSuccess: function (e, t) {
              this._onSubmit.apply(this, arguments), this._uploadData.setStatus(e, qq.status.SUBMITTED), this._onSubmitted.apply(this, arguments), this._options.autoUpload ? (this._options.callbacks.onSubmitted.apply(this, arguments), this._uploadFile(e)) : (this._storeForLater(e), this._options.callbacks.onSubmitted.apply(this, arguments))
            },
            _onSubmitDelete: function (e, t, n) {
              var i, o = this.getUuid(e);
              return t && (i = qq.bind(t, this, e, o, n)), this._isDeletePossible() ? (this._handleCheckedCallback({
                name: "onSubmitDelete",
                callback: qq.bind(this._options.callbacks.onSubmitDelete, this, e),
                onSuccess: i || qq.bind(this._deleteHandler.sendDelete, this, e, o, n),
                identifier: e
              }), !0) : (this.log("Delete request ignored for ID " + e + ", delete feature is disabled or request not possible due to CORS on a user agent that does not support pre-flighting.", "warn"), !1)
            },
            _onSubmitted: function (e) {},
            _onTotalProgress: function (e, t) {
              this._options.callbacks.onTotalProgress(e, t)
            },
            _onUploadPrep: function (e) {},
            _onUpload: function (e, t) {
              this._uploadData.setStatus(e, qq.status.UPLOADING)
            },
            _onUploadChunk: function (e, t) {},
            _onUploadChunkSuccess: function (e, t) {
              !this._preventRetries[e] && this._options.retry.enableAuto && (this._autoRetries[e] = 0)
            },
            _onUploadStatusChange: function (e, t, n) {
              n === qq.status.PAUSED && clearTimeout(this._retryTimeouts[e])
            },
            _onValidateBatchCallbackFailure: function (e) {
              var t = this;
              qq.each(e, function (e, n) {
                t._fileOrBlobRejected(n.id)
              })
            },
            _onValidateBatchCallbackSuccess: function (e, t, n, i, o) {
              var r, a = this._currentItemLimit,
                s = this._netUploadedOrQueued;
              0 === a || s <= a ? t.length > 0 ? this._handleCheckedCallback({
                name: "onValidate",
                callback: qq.bind(this._options.callbacks.onValidate, this, e[0], o),
                onSuccess: qq.bind(this._onValidateCallbackSuccess, this, t, 0, n, i),
                onFailure: qq.bind(this._onValidateCallbackFailure, this, t, 0, n, i),
                identifier: "Item '" + t[0].file.name + "', size: " + t[0].file.size
              }) : this._itemError("noFilesError") : (this._onValidateBatchCallbackFailure(t), r = this._options.messages.tooManyItemsError.replace(/\{netItems\}/g, s).replace(/\{itemLimit\}/g, a), this._batchError(r))
            },
            _onValidateCallbackFailure: function (e, t, n, i) {
              var o = t + 1;
              this._fileOrBlobRejected(e[t].id, e[t].file.name), this._maybeProcessNextItemAfterOnValidateCallback(!1, e, o, n, i)
            },
            _onValidateCallbackSuccess: function (e, t, n, i) {
              var o = this,
                r = t + 1,
                a = this._getValidationDescriptor(e[t]);
              this._validateFileOrBlobData(e[t], a).then(function () {
                o._upload(e[t].id, n, i), o._maybeProcessNextItemAfterOnValidateCallback(!0, e, r, n, i)
              }, function () {
                o._maybeProcessNextItemAfterOnValidateCallback(!1, e, r, n, i)
              })
            },
            _prepareItemsForUpload: function (e, t, n) {
              if (0 !== e.length) {
                var i = this._getValidationDescriptors(e),
                  o = this._getButtonId(e[0].file),
                  r = this._getButton(o);
                this._handleCheckedCallback({
                  name: "onValidateBatch",
                  callback: qq.bind(this._options.callbacks.onValidateBatch, this, i, r),
                  onSuccess: qq.bind(this._onValidateBatchCallbackSuccess, this, i, e, t, n, r),
                  onFailure: qq.bind(this._onValidateBatchCallbackFailure, this, e),
                  identifier: "batch validation"
                })
              } else this._itemError("noFilesError")
            },
            _preventLeaveInProgress: function () {
              var e = this;
              this._disposeSupport.attach(window, "beforeunload", function (t) {
                if (e.getInProgress()) return (t = t || window.event).returnValue = e._options.messages.onLeave, e._options.messages.onLeave
              })
            },
            _refreshSessionData: function () {
              var e = this,
                t = this._options.session;
              qq.Session && null != this._options.session.endpoint && (this._session || (qq.extend(t, {
                cors: this._options.cors
              }), t.log = qq.bind(this.log, this), t.addFileRecord = qq.bind(this._addCannedFile, this), this._session = new qq.Session(t)), setTimeout(function () {
                e._session.refresh().then(function (t, n) {
                  e._sessionRequestComplete(), e._options.callbacks.onSessionRequestComplete(t, !0, n)
                }, function (t, n) {
                  e._options.callbacks.onSessionRequestComplete(t, !1, n)
                })
              }, 0))
            },
            _sessionRequestComplete: function () {},
            _setSize: function (e, t) {
              this._uploadData.updateSize(e, t), this._totalProgress && this._totalProgress.onNewSize(e)
            },
            _shouldAutoRetry: function (e) {
              var t = this._uploadData.retrieve({
                id: e
              });
              return !!(!this._preventRetries[e] && this._options.retry.enableAuto && t.status !== qq.status.PAUSED && (void 0 === this._autoRetries[e] && (this._autoRetries[e] = 0), this._autoRetries[e] < this._options.retry.maxAutoAttempts)) && (this._autoRetries[e] += 1, !0)
            },
            _storeForLater: function (e) {
              this._storedIds.push(e)
            },
            _trackButton: function (e) {
              var t;
              (t = qq.supportedFeatures.ajaxUploading ? this._handler.getFile(e).qqButtonId : this._getButtonId(this._handler.getInput(e))) && (this._buttonIdsForFileIds[e] = t)
            },
            _updateFormSupportAndParams: function (e) {
              this._options.form.element = e, this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this)), this._formSupport && this._formSupport.attachedToForm && (this._paramsStore.addReadOnly(null, this._formSupport.getFormInputsAsObject), this._options.autoUpload = this._formSupport.newAutoUpload, this._formSupport.newEndpoint && this.setEndpoint(this._formSupport.newEndpoint))
            },
            _upload: function (e, t, n) {
              var i = this.getName(e);
              t && this.setParams(t, e), n && this.setEndpoint(n, e), this._handleCheckedCallback({
                name: "onSubmit",
                callback: qq.bind(this._options.callbacks.onSubmit, this, e, i),
                onSuccess: qq.bind(this._onSubmitCallbackSuccess, this, e, i),
                onFailure: qq.bind(this._fileOrBlobRejected, this, e, i),
                identifier: e
              })
            },
            _uploadFile: function (e) {
              this._handler.upload(e) || this._uploadData.setStatus(e, qq.status.QUEUED)
            },
            _uploadStoredFiles: function () {
              for (var e, t, n = this; this._storedIds.length;) e = this._storedIds.shift(), this._uploadFile(e);
              (t = this.getUploads({
                status: qq.status.SUBMITTING
              }).length) && (qq.log("Still waiting for " + t + " files to clear submit queue. Will re-parse stored IDs array shortly."), setTimeout(function () {
                n._uploadStoredFiles()
              }, 1e3))
            },
            _validateFileOrBlobData: function (e, t) {
              var n = this,
                i = e.file instanceof qq.BlobProxy ? e.file.referenceBlob : e.file,
                o = t.name,
                r = t.size,
                a = this._getButtonId(e.file),
                s = this._getValidationBase(a),
                l = new qq.Promise;
              return l.then(function () {}, function () {
                n._fileOrBlobRejected(e.id, o)
              }), qq.isFileOrInput(i) && !this._isAllowedExtension(s.allowedExtensions, o) ? (this._itemError("typeError", o, i), l.failure()) : this._options.validation.allowEmpty || 0 !== r ? r > 0 && s.sizeLimit && r > s.sizeLimit ? (this._itemError("sizeError", o, i), l.failure()) : r > 0 && r < s.minSizeLimit ? (this._itemError("minSizeError", o, i), l.failure()) : (qq.ImageValidation && qq.supportedFeatures.imagePreviews && qq.isFile(i) ? new qq.ImageValidation(i, qq.bind(n.log, n)).validate(s.image).then(l.success, function (e) {
                n._itemError(e + "ImageError", o, i), l.failure()
              }) : l.success(), l) : (this._itemError("emptyError", o, i), l.failure())
            },
            _wrapCallbacks: function () {
              var e, t, n;
              for (n in e = this, t = function (t, n, i) {
                  var o;
                  try {
                    return n.apply(e, i)
                  } catch (n) {
                    o = n.message || n.toString(), e.log("Caught exception in '" + t + "' callback - " + o, "error")
                  }
                }, this._options.callbacks) ! function () {
                var i, o;
                i = n, o = e._options.callbacks[i], e._options.callbacks[i] = function () {
                  return t(i, o, arguments)
                }
              }()
            }
          }
        }(),
        function () {
          "use strict";
          qq.FineUploaderBasic = function (e) {
            var t = this;
            this._options = {
              debug: !1,
              button: null,
              multiple: !0,
              maxConnections: 3,
              disableCancelForFormUploads: !1,
              autoUpload: !0,
              warnBeforeUnload: !0,
              request: {
                customHeaders: {},
                endpoint: "/server/upload",
                filenameParam: "qqfilename",
                forceMultipart: !0,
                inputName: "qqfile",
                method: "POST",
                omitDefaultParams: !1,
                params: {},
                paramsInBody: !0,
                requireSuccessJson: !0,
                totalFileSizeName: "qqtotalfilesize",
                uuidName: "qquuid"
              },
              validation: {
                allowedExtensions: [],
                sizeLimit: 0,
                minSizeLimit: 0,
                itemLimit: 0,
                stopOnFirstInvalidFile: !0,
                acceptFiles: null,
                image: {
                  maxHeight: 0,
                  maxWidth: 0,
                  minHeight: 0,
                  minWidth: 0
                },
                allowEmpty: !1
              },
              callbacks: {
                onSubmit: function (e, t) {},
                onSubmitted: function (e, t) {},
                onComplete: function (e, t, n, i) {},
                onAllComplete: function (e, t) {},
                onCancel: function (e, t) {},
                onUpload: function (e, t) {},
                onUploadChunk: function (e, t, n) {},
                onUploadChunkSuccess: function (e, t, n, i) {},
                onResume: function (e, t, n, i) {},
                onProgress: function (e, t, n, i) {},
                onTotalProgress: function (e, t) {},
                onError: function (e, t, n, i) {},
                onAutoRetry: function (e, t, n) {},
                onManualRetry: function (e, t) {},
                onValidateBatch: function (e) {},
                onValidate: function (e) {},
                onSubmitDelete: function (e) {},
                onDelete: function (e) {},
                onDeleteComplete: function (e, t, n) {},
                onPasteReceived: function (e) {},
                onStatusChange: function (e, t, n) {},
                onSessionRequestComplete: function (e, t, n) {}
              },
              messages: {
                typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
                sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
                minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
                emptyError: "{file} is empty, please select files again without it.",
                noFilesError: "No files to upload.",
                tooManyItemsError: "Too many items ({netItems}) would be uploaded.  Item limit is {itemLimit}.",
                maxHeightImageError: "Image is too tall.",
                maxWidthImageError: "Image is too wide.",
                minHeightImageError: "Image is not tall enough.",
                minWidthImageError: "Image is not wide enough.",
                retryFailTooManyItems: "Retry failed - you have reached your file limit.",
                onLeave: "The files are being uploaded, if you leave now the upload will be canceled.",
                unsupportedBrowserIos8Safari: "Unrecoverable error - this browser does not permit file uploading of any kind due to serious bugs in iOS8 Safari.  Please use iOS8 Chrome until Apple fixes these issues."
              },
              retry: {
                enableAuto: !1,
                maxAutoAttempts: 3,
                autoAttemptDelay: 5,
                preventRetryResponseProperty: "preventRetry"
              },
              classes: {
                buttonHover: "qq-upload-button-hover",
                buttonFocus: "qq-upload-button-focus"
              },
              chunking: {
                enabled: !1,
                concurrent: {
                  enabled: !1
                },
                mandatory: !1,
                paramNames: {
                  partIndex: "qqpartindex",
                  partByteOffset: "qqpartbyteoffset",
                  chunkSize: "qqchunksize",
                  totalFileSize: "qqtotalfilesize",
                  totalParts: "qqtotalparts"
                },
                partSize: function (e) {
                  return 2e6
                },
                success: {
                  endpoint: null,
                  headers: function (e) {
                    return null
                  },
                  jsonPayload: !1,
                  method: "POST",
                  params: function (e) {
                    return null
                  },
                  resetOnStatus: []
                }
              },
              resume: {
                enabled: !1,
                recordsExpireIn: 7,
                paramNames: {
                  resuming: "qqresume"
                },
                customKeys: function (e) {
                  return []
                }
              },
              formatFileName: function (e) {
                return e
              },
              text: {
                defaultResponseError: "Upload failure reason unknown",
                fileInputTitle: "file input",
                sizeSymbols: ["kB", "MB", "GB", "TB", "PB", "EB"]
              },
              deleteFile: {
                enabled: !1,
                method: "DELETE",
                endpoint: "/server/upload",
                customHeaders: {},
                params: {}
              },
              cors: {
                expected: !1,
                sendCredentials: !1,
                allowXdr: !1
              },
              blobs: {
                defaultName: "misc_data"
              },
              paste: {
                targetElement: null,
                defaultName: "pasted_image"
              },
              camera: {
                ios: !1,
                button: null
              },
              extraButtons: [],
              session: {
                endpoint: null,
                params: {},
                customHeaders: {},
                refreshOnReset: !0
              },
              form: {
                element: "qq-form",
                autoUpload: !1,
                interceptSubmit: !0
              },
              scaling: {
                customResizer: null,
                sendOriginal: !0,
                orient: !0,
                defaultType: null,
                defaultQuality: 80,
                failureText: "Failed to scale",
                includeExif: !1,
                sizes: []
              },
              workarounds: {
                iosEmptyVideos: !0,
                ios8SafariUploads: !0,
                ios8BrowserCrash: !1
              }
            }, qq.extend(this._options, e, !0), this._buttons = [], this._extraButtonSpecs = {}, this._buttonIdsForFileIds = [], this._wrapCallbacks(), this._disposeSupport = new qq.DisposeSupport, this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], this._netUploadedOrQueued = 0, this._netUploaded = 0, this._uploadData = this._createUploadDataTracker(), this._initFormSupportAndParams(), this._customHeadersStore = this._createStore(this._options.request.customHeaders), this._deleteFileCustomHeadersStore = this._createStore(this._options.deleteFile.customHeaders), this._deleteFileParamsStore = this._createStore(this._options.deleteFile.params), this._endpointStore = this._createStore(this._options.request.endpoint), this._deleteFileEndpointStore = this._createStore(this._options.deleteFile.endpoint), this._handler = this._createUploadHandler(), this._deleteHandler = qq.DeleteFileAjaxRequester && this._createDeleteHandler(), this._options.button && (this._defaultButtonId = this._createUploadButton({
              element: this._options.button,
              title: this._options.text.fileInputTitle
            }).getButtonId()), this._generateExtraButtonSpecs(), this._handleCameraAccess(), this._options.paste.targetElement && (qq.PasteSupport ? this._pasteHandler = this._createPasteHandler() : this.log("Paste support module not found", "error")), this._options.warnBeforeUnload && this._preventLeaveInProgress(), this._imageGenerator = qq.ImageGenerator && new qq.ImageGenerator(qq.bind(this.log, this)), this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], this._scaler = qq.Scaler && new qq.Scaler(this._options.scaling, qq.bind(this.log, this)) || {}, this._scaler.enabled && (this._customNewFileHandler = qq.bind(this._scaler.handleNewFile, this._scaler)), qq.TotalProgress && qq.supportedFeatures.progressBar && (this._totalProgress = new qq.TotalProgress(qq.bind(this._onTotalProgress, this), function (e) {
              var n = t._uploadData.retrieve({
                id: e
              });
              return n && n.size || 0
            })), this._currentItemLimit = this._options.validation.itemLimit, this._customResumeDataStore = this._createStore()
          }, qq.FineUploaderBasic.prototype = qq.basePublicApi, qq.extend(qq.FineUploaderBasic.prototype, qq.basePrivateApi)
        }(), qq.AjaxRequester = function (e) {
          "use strict";
          var t, n, i = [],
            o = {},
            r = {
              acceptHeader: null,
              validMethods: ["PATCH", "POST", "PUT"],
              method: "POST",
              contentType: "application/x-www-form-urlencoded",
              maxConnections: 3,
              customHeaders: {},
              endpointStore: {},
              paramsStore: {},
              mandatedParams: {},
              allowXRequestedWithAndCacheControl: !0,
              successfulResponseCodes: {
                DELETE: [200, 202, 204],
                PATCH: [200, 201, 202, 203, 204],
                POST: [200, 201, 202, 203, 204],
                PUT: [200, 201, 202, 203, 204],
                GET: [200]
              },
              cors: {
                expected: !1,
                sendCredentials: !1
              },
              log: function (e, t) {},
              onSend: function (e) {},
              onComplete: function (e, t, n) {},
              onProgress: null
            };
          if (qq.extend(r, e), t = r.log, qq.indexOf(r.validMethods, r.method) < 0) throw new Error("'" + r.method + "' is not a supported method for this type of request!");

          function a(e) {
            return r.cors.expected && void 0 === e.withCredentials
          }

          function s(e, t) {
            var n = o[e] && o[e].xhr;
            return n || (n = t || (r.cors.expected ? function () {
              var e;
              return (window.XMLHttpRequest || window.ActiveXObject) && void 0 === (e = qq.createXhrInstance()).withCredentials && ((e = new XDomainRequest).onload = function () {}, e.onerror = function () {}, e.ontimeout = function () {}, e.onprogress = function () {}), e
            }() : qq.createXhrInstance()), o[e].xhr = n), n
          }

          function l(e) {
            var t = qq.indexOf(i, e),
              n = r.maxConnections;
            delete o[e], i.splice(t, 1), i.length >= n && t < n && c(i[n - 1])
          }

          function u(e, n) {
            var i, o = s(e),
              u = r.method,
              c = !0 === n;
            l(e), c ? t(u + " request for " + e + " has failed", "error") : a(o) || (i = o.status, qq.indexOf(r.successfulResponseCodes[r.method], i) >= 0) || (c = !0, t(u + " request for " + e + " has failed - response code " + o.status, "error")), r.onComplete(e, o, c)
          }

          function c(e, i) {
            var l, c = s(e, i),
              d = r.method,
              p = function (e) {
                var t, n = o[e].additionalParams,
                  i = r.mandatedParams;
                return r.paramsStore.get && (t = r.paramsStore.get(e)), n && qq.each(n, function (e, n) {
                  (t = t || {})[e] = n
                }), i && qq.each(i, function (e, n) {
                  (t = t || {})[e] = n
                }), t
              }(e),
              h = o[e].payload;
            return r.onSend(e), l = function (e, t, i) {
                var a = r.endpointStore.get(e),
                  s = o[e].addToPath;
                void 0 != s && (a += "/" + s);
                n && t && (a = qq.obj2url(t, a));
                i && (a = qq.obj2url(i, a));
                return a
              }(e, p, o[e].additionalQueryParams), a(c) ? (c.onload = function (e) {
                return function () {
                  u(e)
                }
              }(e), c.onerror = function (e) {
                return function () {
                  u(e, !0)
                }
              }(e)) : c.onreadystatechange = function (e) {
                return function () {
                  4 === s(e).readyState && u(e)
                }
              }(e),
              function (e) {
                var t = r.onProgress;
                t && (s(e).upload.onprogress = function (n) {
                  n.lengthComputable && t(e, n.loaded, n.total)
                })
              }(e), c.open(d, l, !0), r.cors.expected && r.cors.sendCredentials && !a(c) && (c.withCredentials = !0),
              function (e) {
                var t = s(e),
                  n = r.customHeaders,
                  i = o[e].additionalHeaders || {},
                  l = r.method,
                  u = {};
                a(t) || (r.acceptHeader && t.setRequestHeader("Accept", r.acceptHeader), r.allowXRequestedWithAndCacheControl && (r.cors.expected && qq.indexOf(["GET", "POST", "HEAD"], r.method) >= 0 && (c = !1, qq.each(c, function (e, t) {
                  if (qq.indexOf(["Accept", "Accept-Language", "Content-Language", "Content-Type"], t) < 0) return c = !0, !1
                }), !c) || (t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), t.setRequestHeader("Cache-Control", "no-cache"))), !r.contentType || "POST" !== l && "PUT" !== l || t.setRequestHeader("Content-Type", r.contentType), qq.extend(u, qq.isFunction(n) ? n(e) : n), qq.extend(u, i), qq.each(u, function (e, n) {
                  t.setRequestHeader(e, n)
                }));
                var c
              }(e), t("Sending " + d + " request for " + e), h ? c.send(h) : n || !p ? c.send() : p && r.contentType && r.contentType.toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0 ? c.send(qq.obj2url(p, "")) : p && r.contentType && r.contentType.toLowerCase().indexOf("application/json") >= 0 ? c.send(JSON.stringify(p)) : c.send(p), c
          }
          n = "GET" === r.method || "DELETE" === r.method, qq.extend(this, {
            initTransport: function (e) {
              var t, n, a, s, l, u;
              return {
                withPath: function (e) {
                  return t = e, this
                },
                withParams: function (e) {
                  return n = e, this
                },
                withQueryParams: function (e) {
                  return u = e, this
                },
                withHeaders: function (e) {
                  return a = e, this
                },
                withPayload: function (e) {
                  return s = e, this
                },
                withCacheBuster: function () {
                  return l = !0, this
                },
                send: function (d) {
                  return l && qq.indexOf(["GET", "DELETE"], r.method) >= 0 && (n.qqtimestamp = (new Date).getTime()),
                    function (e, t, n, a, s, l, u) {
                      if (o[e] = {
                          addToPath: n,
                          additionalParams: a,
                          additionalQueryParams: s,
                          additionalHeaders: l,
                          payload: u
                        }, i.push(e) <= r.maxConnections) return c(e, t)
                    }(e, d, t, n, u, a, s)
                }
              }
            },
            canceled: function (e) {
              l(e)
            }
          })
        }, qq.UploadHandler = function (e) {
          "use strict";
          var t = e.proxy,
            n = {},
            i = t.onCancel,
            o = t.getName;
          qq.extend(this, {
            add: function (e, t) {
              n[e] = t, n[e].temp = {}
            },
            cancel: function (e) {
              var t = this,
                r = new qq.Promise;
              i(e, o(e), r).then(function () {
                t.isValid(e) && (n[e].canceled = !0, t.expunge(e)), r.success()
              })
            },
            expunge: function (e) {
              delete n[e]
            },
            getThirdPartyFileId: function (e) {
              return n[e].key
            },
            isValid: function (e) {
              return void 0 !== n[e]
            },
            reset: function () {
              n = {}
            },
            _getFileState: function (e) {
              return n[e]
            },
            _setThirdPartyFileId: function (e, t) {
              n[e].key = t
            },
            _wasCanceled: function (e) {
              return !!n[e].canceled
            }
          })
        }, qq.UploadHandlerController = function (e, t) {
          "use strict";
          var n, i, o, r, a = this,
            s = !1,
            l = !1,
            u = {
              paramsStore: {},
              maxConnections: 3,
              chunking: {
                enabled: !1,
                multiple: {
                  enabled: !1
                }
              },
              log: function (e, t) {},
              onProgress: function (e, t, n, i) {},
              onComplete: function (e, t, n, i) {},
              onCancel: function (e, t) {},
              onUploadPrep: function (e) {},
              onUpload: function (e, t) {},
              onUploadChunk: function (e, t, n) {},
              onUploadChunkSuccess: function (e, t, n, i) {},
              onAutoRetry: function (e, t, n, i) {},
              onResume: function (e, t, n, i) {},
              onUuidChanged: function (e, t) {},
              getName: function (e) {},
              setSize: function (e, t) {},
              isQueued: function (e) {},
              getIdsInProxyGroup: function (e) {},
              getIdsInBatch: function (e) {},
              isInProgress: function (e) {}
            },
            c = {
              done: function (e, t, n, i) {
                var r = o._getChunkData(e, t);
                o._getFileState(e).attemptingResume = !1, delete o._getFileState(e).temp.chunkProgress[t], o._getFileState(e).loaded += r.size, u.onUploadChunkSuccess(e, o._getChunkDataForCallback(r), n, i)
              },
              finalize: function (e) {
                var t = u.getSize(e),
                  n = u.getName(e);
                i("All chunks have been uploaded for " + e + " - finalizing...."), o.finalizeChunks(e).then(function (r, a) {
                  i("Finalize successful for " + e);
                  var s = h.normalizeResponse(r, !0);
                  u.onProgress(e, n, t, t), o._maybeDeletePersistedChunkData(e), h.cleanup(e, s, a)
                }, function (t, o) {
                  var r = h.normalizeResponse(t, !1);
                  i("Problem finalizing chunks for file ID " + e + " - " + r.error, "error"), (r.reset || o && u.chunking.success.resetOnStatus.indexOf(o.status) >= 0) && c.reset(e), u.onAutoRetry(e, n, r, o) || h.cleanup(e, r, o)
                })
              },
              handleFailure: function (e, t, n, r) {
                var a = u.getName(t);
                i("Chunked upload request failed for " + t + ", chunk " + e), o.clearCachedChunk(t, e);
                var s, p = h.normalizeResponse(n, !1);
                if (p.reset) c.reset(t);
                else {
                  var q = o._getFileState(t).chunking.inProgress;
                  (s = q ? qq.indexOf(q, e) : -1) >= 0 && (o._getFileState(t).chunking.inProgress.splice(s, 1), o._getFileState(t).chunking.remaining.unshift(e))
                }
                o._getFileState(t).temp.ignoreFailure || (l && (o._getFileState(t).temp.ignoreFailure = !0, i(qq.format("Going to attempt to abort these chunks: {}. These are currently in-progress: {}.", JSON.stringify(Object.keys(o._getXhrs(t))), JSON.stringify(o._getFileState(t).chunking.inProgress))), qq.each(o._getXhrs(t), function (e, n) {
                  i(qq.format("Attempting to abort file {}.{}. XHR readyState {}. ", t, e, n.readyState)), n.abort(), n._cancelled = !0
                }), o.moveInProgressToRemaining(t), d.free(t, !0)), u.onAutoRetry(t, a, p, r) || h.cleanup(t, p, r))
              },
              hasMoreParts: function (e) {
                return !!o._getFileState(e).chunking.remaining.length
              },
              nextPart: function (e) {
                var t = o._getFileState(e).chunking.remaining.shift();
                return t >= o._getTotalChunks(e) && (t = null), t
              },
              reset: function (e) {
                i("Server or callback has ordered chunking effort to be restarted on next attempt for item ID " + e, "error"), o._maybeDeletePersistedChunkData(e), o.reevaluateChunking(e), o._getFileState(e).loaded = 0, o._getFileState(e).attemptingResume = !1
              },
              sendNext: function (e) {
                var t = u.getSize(e),
                  n = u.getName(e),
                  r = c.nextPart(e),
                  a = o._getChunkData(e, r),
                  s = o._getFileState(e),
                  p = s.attemptingResume,
                  q = s.chunking.inProgress || [];
                (null == s.loaded && (s.loaded = 0), p && !1 === u.onResume(e, n, a, s.customResumeData) && (c.reset(e), r = c.nextPart(e), a = o._getChunkData(e, r), p = !1), null == r && 0 === q.length) ? c.finalize(e): (q.push(r), o._getFileState(e).chunking.inProgress = q, l && d.open(e, r), l && d.available() && o._getFileState(e).chunking.remaining.length && c.sendNext(e), 0 === a.blob.size && (i(qq.format("Chunk {} for file {} will not be uploaded, zero sized chunk.", r, e), "error"), c.handleFailure(r, e, "File is no longer available", null)), u.onUploadChunk(e, n, o._getChunkDataForCallback(a)).then(function (n) {
                  if (u.isInProgress(e)) {
                    i(qq.format("Sending chunked upload request for item {}.{}, bytes {}-{} of {}.", e, r, a.start + 1, a.end, t));
                    var s = {
                      chunkIdx: r,
                      id: e,
                      overrides: n,
                      resuming: p
                    };
                    o.uploadChunk(s).then(function (t, n) {
                      i("Chunked upload request succeeded for " + e + ", chunk " + r), o.clearCachedChunk(e, r);
                      var a = o._getFileState(e).chunking.inProgress || [],
                        s = h.normalizeResponse(t, !0),
                        l = qq.indexOf(a, r);
                      i(qq.format("Chunk {} for file {} uploaded successfully.", r, e)), c.done(e, r, s, n), l >= 0 && a.splice(l, 1), o._maybePersistChunkedState(e), c.hasMoreParts(e) || 0 !== a.length ? c.hasMoreParts(e) ? c.sendNext(e) : i(qq.format("File ID {} has no more chunks to send and these chunk indexes are still marked as in-progress: {}", e, JSON.stringify(a))) : c.finalize(e)
                    }, function (t, n) {
                      c.handleFailure(r, e, t, n)
                    }).done(function () {
                      o.clearXhr(e, r)
                    })
                  } else i(qq.format("Not sending chunked upload request for item {}.{} - no longer in progress.", e, r))
                }, function (t) {
                  c.handleFailure(r, e, t, null)
                }))
              }
            },
            d = {
              _open: [],
              _openChunks: {},
              _waiting: [],
              available: function () {
                var e = u.maxConnections,
                  t = 0,
                  n = 0;
                return qq.each(d._openChunks, function (e, i) {
                  t++, n += i.length
                }), e - (d._open.length - t + n)
              },
              free: function (e, t) {
                var n, r = !t,
                  a = qq.indexOf(d._waiting, e),
                  s = qq.indexOf(d._open, e);
                delete d._openChunks[e], h.getProxyOrBlob(e) instanceof qq.BlobProxy && (i("Generated blob upload has ended for " + e + ", disposing generated blob."), delete o._getFileState(e).file), a >= 0 ? d._waiting.splice(a, 1) : r && s >= 0 && (d._open.splice(s, 1), (n = d._waiting.shift()) >= 0 && (d._open.push(n), h.start(n)))
              },
              getWaitingOrConnected: function () {
                var e = [];
                return qq.each(d._openChunks, function (t, n) {
                  n && n.length && e.push(parseInt(t))
                }), qq.each(d._open, function (t, n) {
                  d._openChunks[n] || e.push(parseInt(n))
                }), e = e.concat(d._waiting)
              },
              isUsingConnection: function (e) {
                return qq.indexOf(d._open, e) >= 0
              },
              open: function (e, t) {
                return null == t && d._waiting.push(e), !!d.available() && (null == t ? (d._waiting.pop(), d._open.push(e)) : ((n = d._openChunks[e] || []).push(t), d._openChunks[e] = n), !0);
                var n
              },
              reset: function () {
                d._waiting = [], d._open = []
              }
            },
            p = function (e, t) {
              var n = o._getFileState(e);
              n ? (n.loaded = 0, i("Sending simple upload request for " + e), o.uploadFile(e).then(function (n, o) {
                i("Simple upload request succeeded for " + e);
                var r = h.normalizeResponse(n, !0),
                  a = u.getSize(e);
                u.onProgress(e, t, a, a), h.maybeNewUuid(e, r), h.cleanup(e, r, o)
              }, function (n, o) {
                i("Simple upload request failed for " + e);
                var r = h.normalizeResponse(n, !1);
                u.onAutoRetry(e, t, r, o) || h.cleanup(e, r, o)
              })) : i("Ignoring send request as this upload may have been cancelled, File ID " + e, "warn")
            },
            h = {
              cancel: function (e) {
                i("Cancelling " + e), u.paramsStore.remove(e), d.free(e)
              },
              cleanup: function (e, t, n) {
                var i = u.getName(e);
                u.onComplete(e, i, t, n), o._getFileState(e) && o._clearXhrs && o._clearXhrs(e), d.free(e)
              },
              getProxyOrBlob: function (e) {
                return o.getProxy && o.getProxy(e) || o.getFile && o.getFile(e)
              },
              initHandler: function () {
                var e = t ? qq[t] : qq.traditional,
                  n = qq.supportedFeatures.ajaxUploading ? "Xhr" : "Form";
                (o = new e[n + "UploadHandler"](u, {
                  getCustomResumeData: u.getCustomResumeData,
                  getDataByUuid: u.getDataByUuid,
                  getName: u.getName,
                  getSize: u.getSize,
                  getUuid: u.getUuid,
                  log: i,
                  onCancel: u.onCancel,
                  onProgress: u.onProgress,
                  onUuidChanged: u.onUuidChanged,
                  onFinalizing: function (e) {
                    u.setStatus(e, qq.status.UPLOAD_FINALIZING)
                  }
                }))._removeExpiredChunkingRecords && o._removeExpiredChunkingRecords()
              },
              isDeferredEligibleForUpload: function (e) {
                return u.isQueued(e)
              },
              maybeDefer: function (e, t) {
                return t && !o.getFile(e) && t instanceof qq.BlobProxy ? (u.onUploadPrep(e), i("Attempting to generate a blob on-demand for " + e), t.create().then(function (t) {
                  i("Generated an on-demand blob for " + e), o.updateBlob(e, t), u.setSize(e, t.size), o.reevaluateChunking(e), h.maybeSendDeferredFiles(e)
                }, function (t) {
                  var o = {};
                  t && (o.error = t), i(qq.format("Failed to generate blob for ID {}.  Error message: {}.", e, t), "error"), u.onComplete(e, u.getName(e), qq.extend(o, n), null), h.maybeSendDeferredFiles(e), d.free(e)
                }), !1) : h.maybeSendDeferredFiles(e)
              },
              maybeSendDeferredFiles: function (e) {
                var t = u.getIdsInProxyGroup(e),
                  n = !1;
                return t && t.length ? (i("Maybe ready to upload proxy group file " + e), qq.each(t, function (t, i) {
                  if (h.isDeferredEligibleForUpload(i) && o.getFile(i)) n = i === e, h.now(i);
                  else if (h.isDeferredEligibleForUpload(i)) return !1
                })) : (n = !0, h.now(e)), n
              },
              maybeNewUuid: function (e, t) {
                void 0 !== t.newUuid && u.onUuidChanged(e, t.newUuid)
              },
              normalizeResponse: function (e, t) {
                var n = e;
                return qq.isObject(e) || (n = {}, qq.isString(e) && !t && (n.error = e)), n.success = t, n
              },
              now: function (e) {
                var t = u.getName(e);
                if (!a.isValid(e)) throw new qq.Error(e + " is not a valid file ID to upload!");
                u.onUpload(e, t).then(function (n) {
                  n && n.pause ? (u.setStatus(e, qq.status.PAUSED), o.pause(e), d.free(e)) : s && o._shouldChunkThisFile(e) ? c.sendNext(e) : p(e, t)
                }, function (n) {
                  if (i(e + " upload start aborted due to rejected onUpload Promise - details: " + (n = n || {}), "error"), !u.onAutoRetry(e, t, n.responseJSON || {})) {
                    var o = h.normalizeResponse(n.responseJSON, !1);
                    h.cleanup(e, o)
                  }
                })
              },
              start: function (e) {
                var t = h.getProxyOrBlob(e);
                return t ? h.maybeDefer(e, t) : (h.now(e), !0)
              }
            };
          qq.extend(this, {
            add: function (e, t) {
              o.add.apply(this, arguments)
            },
            upload: function (e) {
              return !!d.open(e) && h.start(e)
            },
            retry: function (e) {
              return l && (o._getFileState(e).temp.ignoreFailure = !1), d.isUsingConnection(e) ? h.start(e) : a.upload(e)
            },
            cancel: function (e) {
              var t = o.cancel(e);
              qq.isGenericPromise(t) ? t.then(function () {
                h.cancel(e)
              }) : !1 !== t && h.cancel(e)
            },
            cancelAll: function () {
              var e, t = d.getWaitingOrConnected();
              if (t.length)
                for (e = t.length - 1; e >= 0; e--) a.cancel(t[e]);
              d.reset()
            },
            getFile: function (e) {
              return o.getProxy && o.getProxy(e) ? o.getProxy(e).referenceBlob : o.getFile && o.getFile(e)
            },
            isProxied: function (e) {
              return !(!o.getProxy || !o.getProxy(e))
            },
            getInput: function (e) {
              if (o.getInput) return o.getInput(e)
            },
            reset: function () {
              i("Resetting upload handler"), a.cancelAll(), d.reset(), o.reset()
            },
            expunge: function (e) {
              if (a.isValid(e)) return o.expunge(e)
            },
            isValid: function (e) {
              return o.isValid(e)
            },
            hasResumeRecord: function (e) {
              var t = o.isValid(e) && o._getLocalStorageId && o._getLocalStorageId(e);
              return !!t && !!localStorage.getItem(t)
            },
            getResumableFilesData: function () {
              return o.getResumableFilesData ? o.getResumableFilesData() : []
            },
            getThirdPartyFileId: function (e) {
              if (a.isValid(e)) return o.getThirdPartyFileId(e)
            },
            pause: function (e) {
              return !!(a.isResumable(e) && o.pause && a.isValid(e) && o.pause(e)) && (d.free(e), o.moveInProgressToRemaining(e), !0)
            },
            isAttemptingResume: function (e) {
              return !!o.isAttemptingResume && o.isAttemptingResume(e)
            },
            isResumable: function (e) {
              return !!o.isResumable && o.isResumable(e)
            }
          }), qq.extend(u, e), i = u.log, s = u.chunking.enabled && qq.supportedFeatures.chunking, l = s && u.chunking.concurrent.enabled, (r = {})[u.preventRetryParam] = !0, n = r, h.initHandler()
        }, qq.WindowReceiveMessage = function (e) {
          "use strict";
          var t = {};
          qq.extend({
            log: function (e, t) {}
          }, e), qq.extend(this, {
            receiveMessage: function (e, n) {
              window.postMessage ? t[e] = qq(window).attach("message", function (e) {
                n(e.data)
              }) : log("iframe message passing not supported in this browser!", "error")
            },
            stopReceivingMessages: function (e) {
              if (window.postMessage) {
                var n = t[e];
                n && n()
              }
            }
          })
        }, qq.FormUploadHandler = function (e) {
          "use strict";
          var t = e.options,
            n = this,
            i = e.proxy,
            o = qq.getUniqueId(),
            r = {},
            a = {},
            s = {},
            l = t.isCors,
            u = t.inputName,
            c = i.getUuid,
            d = i.log,
            p = new qq.WindowReceiveMessage({
              log: d
            });

          function h(e) {
            return e.split("_")[0]
          }
          qq.extend(this, new qq.UploadHandler(e)), qq.override(this, function (e) {
            return {
              add: function (t, n) {
                e.add(t, {
                  input: n
                }), n.setAttribute("name", u), n.parentNode && qq(n).remove()
              },
              expunge: function (t) {
                ! function (e) {
                  delete a[e], l && (clearTimeout(s[e]), delete s[e], p.stopReceivingMessages(e));
                  var t = document.getElementById(n._getIframeName(e));
                  t && (t.setAttribute("src", "javascript:false;"), qq(t).remove())
                }(t), e.expunge(t)
              },
              isValid: function (t) {
                return e.isValid(t) && void 0 !== n._getFileState(t).input
              }
            }
          }), qq.extend(this, {
            getInput: function (e) {
              return n._getFileState(e).input
            },
            _attachLoadEvent: function (e, t) {
              var i;
              l ? function (e, t) {
                var i = e.id,
                  o = h(i),
                  l = c(o);
                r[l] = t, a[o] = qq(e).attach("load", function () {
                  n.getInput(o) && (d("Received iframe load event for CORS upload request (iframe name " + i + ")"), s[i] = setTimeout(function () {
                    var e = "No valid message received from loaded iframe for iframe name " + i;
                    d(e, "error"), t({
                      error: e
                    })
                  }, 1e3))
                }), p.receiveMessage(i, function (e) {
                  d("Received the following window message: '" + e + "'"), h(i);
                  var t, o = n._parseJsonResponse(e),
                    a = o.uuid;
                  a && r[a] ? (d("Handling response for iframe name " + i), clearTimeout(s[i]), delete s[i], n._detachLoadEvent(i), t = r[a], delete r[a], p.stopReceivingMessages(i), t(o)) : a || d("'" + e + "' does not contain a UUID - ignoring.")
                })
              }(e, t) : a[e.id] = qq(e).attach("load", function () {
                if (d("Received response for " + e.id), e.parentNode) {
                  try {
                    if (e.contentDocument && e.contentDocument.body && "false" == e.contentDocument.body.innerHTML) return
                  } catch (e) {
                    d("Error when attempting to access iframe during handling of upload response (" + e.message + ")", "error"), i = {
                      success: !1
                    }
                  }
                  t(i)
                }
              })
            },
            _createIframe: function (e) {
              var t, i, o = n._getIframeName(e);
              return t = o, (i = qq.toElement("<iframe src='javascript:false;' name='" + t + "' />")).setAttribute("id", t), i.style.display = "none", document.body.appendChild(i), i
            },
            _detachLoadEvent: function (e) {
              void 0 !== a[e] && (a[e](), delete a[e])
            },
            _getIframeName: function (e) {
              return e + "_" + o
            },
            _initFormForUpload: function (e) {
              var t = e.method,
                n = e.endpoint,
                i = e.params,
                o = e.paramsInBody,
                r = e.targetName,
                a = qq.toElement("<form method='" + t + "' enctype='multipart/form-data'></form>"),
                s = n;
              return o ? qq.obj2Inputs(i, a) : s = qq.obj2url(i, n), a.setAttribute("action", s), a.setAttribute("target", r), a.style.display = "none", document.body.appendChild(a), a
            },
            _parseJsonResponse: function (e) {
              var t = {};
              try {
                t = qq.parseJson(e)
              } catch (e) {
                d("Error when attempting to parse iframe upload response (" + e.message + ")", "error")
              }
              return t
            }
          })
        }, qq.XhrUploadHandler = function (e) {
          "use strict";
          var t = this,
            n = e.options.namespace,
            i = e.proxy,
            o = e.options.chunking,
            r = function (e) {
              var n = t._getFileState(e);
              if (n.chunkSize) return n.chunkSize;
              var i = o.partSize;
              return qq.isFunction(i) && (i = i(e, c(e))), n.chunkSize = i, i
            },
            a = e.options.resume,
            s = o && e.options.chunking.enabled && qq.supportedFeatures.chunking,
            l = a && e.options.resume.enabled && s && qq.supportedFeatures.resume,
            u = i.getName,
            c = i.getSize,
            d = i.getUuid,
            p = i.getEndpoint,
            h = i.getDataByUuid,
            q = i.onUuidChanged,
            f = i.onProgress,
            m = i.log,
            g = i.getCustomResumeData;

          function _(e) {
            qq.each(t._getXhrs(e), function (n, i) {
              var o = t._getAjaxRequester(e, n);
              i.onreadystatechange = null, i.upload.onprogress = null, i.abort(), o && o.canceled && o.canceled(e)
            })
          }
          qq.extend(this, new qq.UploadHandler(e)), qq.override(this, function (e) {
            return {
              add: function (n, i) {
                if (qq.isFile(i) || qq.isBlob(i)) e.add(n, {
                  file: i
                });
                else {
                  if (!(i instanceof qq.BlobProxy)) throw new Error("Passed obj is not a File, Blob, or proxy");
                  e.add(n, {
                    proxy: i
                  })
                }
                t._initTempState(n), l && t._maybePrepareForResume(n)
              },
              expunge: function (n) {
                _(n), t._maybeDeletePersistedChunkData(n), t._clearXhrs(n), e.expunge(n)
              }
            }
          }), qq.extend(this, {
            clearCachedChunk: function (e, n) {
              var i = t._getFileState(e);
              i && delete i.temp.cachedChunks[n]
            },
            clearXhr: function (e, n) {
              var i = t._getFileState(e).temp;
              i.xhrs && delete i.xhrs[n], i.ajaxRequesters && delete i.ajaxRequesters[n]
            },
            finalizeChunks: function (e, n) {
              var i = t._getTotalChunks(e) - 1,
                o = t._getXhr(e, i);
              return n ? (new qq.Promise).success(n(o), o) : (new qq.Promise).success({}, o)
            },
            getFile: function (e) {
              return t.isValid(e) && t._getFileState(e).file
            },
            getProxy: function (e) {
              return t.isValid(e) && t._getFileState(e).proxy
            },
            getResumableFilesData: function () {
              var e = [];
              return t._iterateResumeRecords(function (n, i) {
                t.moveInProgressToRemaining(null, i.chunking.inProgress, i.chunking.remaining);
                var o = {
                  name: i.name,
                  remaining: i.chunking.remaining,
                  size: i.size,
                  uuid: i.uuid
                };
                i.key && (o.key = i.key), i.customResumeData && (o.customResumeData = i.customResumeData), e.push(o)
              }), e
            },
            isAttemptingResume: function (e) {
              return t._getFileState(e).attemptingResume
            },
            isResumable: function (e) {
              return !!o && t.isValid(e) && !t._getFileState(e).notResumable
            },
            moveInProgressToRemaining: function (e, n, i) {
              var o = (t._getFileState(e) || {}).chunking || {},
                r = n || o.inProgress,
                a = i || o.remaining;
              r && (m(qq.format("Moving these chunks from in-progress {}, to remaining.", JSON.stringify(r))), r.reverse(), qq.each(r, function (e, t) {
                a.unshift(t)
              }), r.length = 0)
            },
            pause: function (e) {
              if (t.isValid(e)) return m(qq.format("Aborting XHR upload for {} '{}' due to pause instruction.", e, u(e))), t._getFileState(e).paused = !0, _(e), !0
            },
            reevaluateChunking: function (e) {
              if (o && t.isValid(e)) {
                var n, i, r = t._getFileState(e);
                if (delete r.chunking, r.chunking = {}, (n = t._getTotalChunks(e)) > 1 || o.mandatory) {
                  for (r.chunking.enabled = !0, r.chunking.parts = n, r.chunking.remaining = [], i = 0; i < n; i++) r.chunking.remaining.push(i);
                  t._initTempState(e)
                } else r.chunking.enabled = !1
              }
            },
            updateBlob: function (e, n) {
              t.isValid(e) && (t._getFileState(e).file = n)
            },
            _clearXhrs: function (e) {
              var n = t._getFileState(e).temp;
              qq.each(n.ajaxRequesters, function (e) {
                delete n.ajaxRequesters[e]
              }), qq.each(n.xhrs, function (e) {
                delete n.xhrs[e]
              })
            },
            _createXhr: function (e, n) {
              return t._registerXhr(e, n, qq.createXhrInstance())
            },
            _getAjaxRequester: function (e, n) {
              var i = null == n ? -1 : n;
              return t._getFileState(e).temp.ajaxRequesters[i]
            },
            _getChunkData: function (e, n) {
              var i = r(e),
                o = c(e),
                a = t.getFile(e),
                s = i * n,
                l = s + i >= o ? o : s + i,
                u = t._getTotalChunks(e),
                d = this._getFileState(e).temp.cachedChunks,
                p = d[n] || qq.sliceBlob(a, s, l);
              return d[n] = p, {
                part: n,
                start: s,
                end: l,
                count: u,
                blob: p,
                size: l - s
              }
            },
            _getChunkDataForCallback: function (e) {
              return {
                partIndex: e.part,
                startByte: e.start + 1,
                endByte: e.end,
                totalParts: e.count
              }
            },
            _getLocalStorageId: function (e) {
              var t = u(e),
                i = c(e),
                o = r(e),
                s = p(e),
                l = a.customKeys(e),
                d = qq.format("qq{}resume{}-{}-{}-{}-{}", n, "5.0", t, i, o, s);
              return l.forEach(function (e) {
                d += "-" + e
              }), d
            },
            _getMimeType: function (e) {
              return t.getFile(e).type
            },
            _getPersistableData: function (e) {
              return t._getFileState(e).chunking
            },
            _getTotalChunks: function (e) {
              if (o) {
                var t = c(e),
                  n = r(e);
                return Math.ceil(t / n)
              }
            },
            _getXhr: function (e, n) {
              var i = null == n ? -1 : n;
              return t._getFileState(e).temp.xhrs[i]
            },
            _getXhrs: function (e) {
              return t._getFileState(e).temp.xhrs
            },
            _iterateResumeRecords: function (e) {
              l && qq.each(localStorage, function (t, i) {
                if (0 === t.indexOf(qq.format("qq{}resume", n))) {
                  var o = JSON.parse(i);
                  e(t, o)
                }
              })
            },
            _initTempState: function (e) {
              t._getFileState(e).temp = {
                ajaxRequesters: {},
                chunkProgress: {},
                xhrs: {},
                cachedChunks: {}
              }
            },
            _markNotResumable: function (e) {
              t._getFileState(e).notResumable = !0
            },
            _maybeDeletePersistedChunkData: function (e) {
              var n;
              return !!(l && t.isResumable(e) && (n = t._getLocalStorageId(e)) && localStorage.getItem(n)) && (localStorage.removeItem(n), !0)
            },
            _maybePrepareForResume: function (e) {
              var n, i, o = t._getFileState(e);
              l && void 0 === o.key && (n = t._getLocalStorageId(e), (i = localStorage.getItem(n)) && (i = JSON.parse(i), h(i.uuid) ? t._markNotResumable(e) : (m(qq.format("Identified file with ID {} and name of {} as resumable.", e, u(e))), q(e, i.uuid), o.key = i.key, o.chunking = i.chunking, o.loaded = i.loaded, o.customResumeData = i.customResumeData, o.attemptingResume = !0, t.moveInProgressToRemaining(e))))
            },
            _maybePersistChunkedState: function (e) {
              var n, i, o = t._getFileState(e);
              if (l && t.isResumable(e)) {
                var r = g(e);
                n = t._getLocalStorageId(e), i = {
                  name: u(e),
                  size: c(e),
                  uuid: d(e),
                  key: o.key,
                  chunking: o.chunking,
                  loaded: o.loaded,
                  lastUpdated: Date.now()
                }, r && (i.customResumeData = r);
                try {
                  localStorage.setItem(n, JSON.stringify(i))
                } catch (t) {
                  m(qq.format("Unable to save resume data for '{}' due to error: '{}'.", e, t.toString()), "warn")
                }
              }
            },
            _registerProgressHandler: function (e, n, i) {
              var o = t._getXhr(e, n),
                r = u(e),
                a = {
                  simple: function (t, n) {
                    var i = c(e);
                    f(e, r, t === n ? i : t >= i ? i - 1 : t, i)
                  },
                  chunked: function (o, a) {
                    var s = t._getFileState(e).temp.chunkProgress,
                      l = t._getFileState(e).loaded,
                      u = o,
                      d = a,
                      p = c(e),
                      h = u - (d - i),
                      q = l;
                    s[n] = h, qq.each(s, function (e, t) {
                      q += t
                    }), f(e, r, q, p)
                  }
                };
              o.upload.onprogress = function (e) {
                e.lengthComputable && a[null == i ? "simple" : "chunked"](e.loaded, e.total)
              }
            },
            _registerXhr: function (e, n, i, o) {
              var r = null == n ? -1 : n,
                a = t._getFileState(e).temp;
              return a.xhrs = a.xhrs || {}, a.ajaxRequesters = a.ajaxRequesters || {}, a.xhrs[r] = i, o && (a.ajaxRequesters[r] = o), i
            },
            _removeExpiredChunkingRecords: function () {
              var e = a.recordsExpireIn;
              t._iterateResumeRecords(function (t, n) {
                var i = new Date(n.lastUpdated);
                i.setDate(i.getDate() + e), i.getTime() <= Date.now() && (m("Removing expired resume record with key " + t), localStorage.removeItem(t))
              })
            },
            _shouldChunkThisFile: function (e) {
              var n = t._getFileState(e);
              if (n) return n.chunking || t.reevaluateChunking(e), n.chunking.enabled
            }
          })
        }, qq.DeleteFileAjaxRequester = function (e) {
          "use strict";
          var t, n = {
            method: "DELETE",
            uuidParamName: "qquuid",
            endpointStore: {},
            maxConnections: 3,
            customHeaders: function (e) {
              return {}
            },
            paramsStore: {},
            cors: {
              expected: !1,
              sendCredentials: !1
            },
            log: function (e, t) {},
            onDelete: function (e) {},
            onDeleteComplete: function (e, t, n) {}
          };
          qq.extend(n, e), t = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: ["POST", "DELETE"],
            method: n.method,
            endpointStore: n.endpointStore,
            paramsStore: n.paramsStore,
            mandatedParams: "POST" === n.method.toUpperCase() ? {
              _method: "DELETE"
            } : {},
            maxConnections: n.maxConnections,
            customHeaders: function (e) {
              return n.customHeaders.get(e)
            },
            log: n.log,
            onSend: n.onDelete,
            onComplete: n.onDeleteComplete,
            cors: n.cors
          })), qq.extend(this, {
            sendDelete: function (e, i, o) {
              var r = o || {};
              n.log("Submitting delete file request for " + e), "DELETE" === n.method ? t.initTransport(e).withPath(i).withParams(r).send() : (r[n.uuidParamName] = i, t.initTransport(e).withParams(r).send())
            }
          })
        },
        function () {
          function e(e, n, i, o, r) {
            var a, s = e.naturalWidth,
              l = e.naturalHeight,
              u = o.width,
              c = o.height,
              d = i.getContext("2d"),
              p = new qq.Promise;
            return d.save(), o.resize ? function (e) {
              var n = e.blob,
                i = e.image,
                o = e.imageHeight,
                r = e.imageWidth,
                a = e.orientation,
                s = new qq.Promise,
                l = e.resize,
                u = document.createElement("canvas"),
                c = u.getContext("2d"),
                d = e.canvas,
                p = e.targetHeight,
                h = e.targetWidth;
              return t(u, r, o, a), d.height = p, d.width = h, c.drawImage(i, 0, 0), l({
                blob: n,
                height: p,
                image: i,
                sourceCanvas: u,
                targetCanvas: d,
                width: h
              }).then(function () {
                d.qqImageRendered && d.qqImageRendered(), s.success()
              }, s.failure), s
            }({
              blob: n,
              canvas: i,
              image: e,
              imageHeight: l,
              imageWidth: s,
              orientation: o.orientation,
              resize: o.resize,
              targetHeight: c,
              targetWidth: u
            }) : (qq.supportedFeatures.unlimitedScaledImageSize || (a = function (e) {
              if (!qq.ios()) throw new qq.Error("Downsampled dimensions can only be reliably calculated for iOS!");
              if (e.origHeight * e.origWidth > 5241e3) return {
                newHeight: Math.round(Math.sqrt(e.origHeight / e.origWidth * 5241e3)),
                newWidth: Math.round(Math.sqrt(e.origWidth / e.origHeight * 5241e3))
              }
            }({
              origWidth: u,
              origHeight: c
            })) && (qq.log(qq.format("Had to reduce dimensions due to device limitations from {}w / {}h to {}w / {}h", u, c, a.newWidth, a.newHeight), "warn"), u = a.newWidth, c = a.newHeight), t(i, u, c, o.orientation), qq.ios() ? function () {
              (function (e) {
                var t, n = e.naturalWidth,
                  i = e.naturalHeight,
                  o = document.createElement("canvas");
                return n * i > 1048576 && (o.width = o.height = 1, (t = o.getContext("2d")).drawImage(e, 1 - n, 0), 0 === t.getImageData(0, 0, 1, 1).data[3])
              })(e) && (s /= 2, l /= 2);
              var t, n, i, o = 1024,
                a = document.createElement("canvas"),
                p = r ? function (e, t, n) {
                  var i, o, r, a = document.createElement("canvas"),
                    s = 0,
                    l = n,
                    u = n;
                  for (a.width = 1, a.height = n, (i = a.getContext("2d")).drawImage(e, 0, 0), o = i.getImageData(0, 0, 1, n).data; u > s;) 0 === o[4 * (u - 1) + 3] ? l = u : s = u, u = l + s >> 1;
                  return 0 == (r = u / n) ? 1 : r
                }(e, 0, l) : 1,
                h = Math.ceil(o * u / s),
                q = Math.ceil(o * c / l / p),
                f = 0,
                m = 0;
              for (a.width = a.height = o, t = a.getContext("2d"); f < l;) {
                for (n = 0, i = 0; n < s;) t.clearRect(0, 0, o, o), t.drawImage(e, -n, -f), d.drawImage(a, 0, 0, o, o, i, m, h, q), n += o, i += h;
                f += o, m += q
              }
              d.restore(), a = t = null
            }() : d.drawImage(e, 0, 0, u, c), i.qqImageRendered && i.qqImageRendered(), p.success(), p)
          }

          function t(e, t, n, i) {
            switch (i) {
              case 5:
              case 6:
              case 7:
              case 8:
                e.width = n, e.height = t;
                break;
              default:
                e.width = t, e.height = n
            }
            var o = e.getContext("2d");
            switch (i) {
              case 2:
                o.translate(t, 0), o.scale(-1, 1);
                break;
              case 3:
                o.translate(t, n), o.rotate(Math.PI);
                break;
              case 4:
                o.translate(0, n), o.scale(1, -1);
                break;
              case 5:
                o.rotate(.5 * Math.PI), o.scale(1, -1);
                break;
              case 6:
                o.rotate(.5 * Math.PI), o.translate(0, -n);
                break;
              case 7:
                o.rotate(.5 * Math.PI), o.translate(t, -n), o.scale(-1, 1);
                break;
              case 8:
                o.rotate(-.5 * Math.PI), o.translate(-t, 0)
            }
          }

          function n(e, t) {
            var n = this;
            window.Blob && e instanceof Blob && function () {
              var t = new Image,
                i = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
              if (!i) throw Error("No createObjectURL function found to create blob url");
              t.src = i.createObjectURL(e), n.blob = e, e = t
            }(), e.naturalWidth || e.naturalHeight || (e.onload = function () {
              var e = n.imageLoadListeners;
              e && (n.imageLoadListeners = null, setTimeout(function () {
                for (var t = 0, n = e.length; t < n; t++) e[t]()
              }, 0))
            }, e.onerror = t, this.imageLoadListeners = []), this.srcImage = e
          }
          n.prototype.render = function (t, n) {
            alert('n prototype render function called')
            n = n || {};
            var i, o, r = this,
              a = this.srcImage.naturalWidth,
              s = this.srcImage.naturalHeight,
              l = n.width,
              u = n.height,
              c = n.maxWidth,
              d = n.maxHeight,
              p = !this.blob || "image/jpeg" === this.blob.type,
              h = t.tagName.toLowerCase();
            this.imageLoadListeners ? this.imageLoadListeners.push(function () {
              r.render(t, n)
            }) : (l && !u ? u = s * l / a << 0 : u && !l ? l = a * u / s << 0 : (l = a, u = s), c && l > c && (u = s * (l = c) / a << 0), d && u > d && (l = a * (u = d) / s << 0), i = {
              width: l,
              height: u
            }, qq.each(n, function (e, t) {
              i[e] = t
            }), "img" === h ? (o = t.src, function (t, n, i, o) {
              var r = document.createElement("canvas"),
                a = i.mime || "image/jpeg",
                s = new qq.Promise;
              return e(t, n, r, i, o).then(function () {
                s.success(r.toDataURL(a, i.quality || .8))
              }), s
            }(r.srcImage, r.blob, i, p).then(function (e) {
              t.src = e, o === t.src && t.onload()
            })) : "canvas" === h && e(this.srcImage, this.blob, t, i, p), "function" == typeof this.onrender && this.onrender(t))
          }, qq.MegaPixImage = n
        }(), qq.ImageGenerator = function (e) {
          "use strict";

          function t(e) {
            return "img" === e.tagName.toLowerCase()
          }

          function n(e) {
            return "canvas" === e.tagName.toLowerCase()
          }

          function i(e) {
            var t = e.split("/"),
              n = t[t.length - 1].split("?")[0],
              i = qq.getExtension(n);
            switch (i = i && i.toLowerCase()) {
              case "jpeg":
              case "jpg":
                return "image/jpeg";
              case "png":
                return "image/png";
              case "bmp":
                return "image/bmp";
              case "gif":
                return "image/gif";
              case "tiff":
              case "tif":
                return "image/tiff"
            }
          }

          function o(e) {
            var t, n, i, o = document.createElement("a");
            return o.href = e, t = o.protocol, i = o.port, n = o.hostname, t.toLowerCase() !== window.location.protocol.toLowerCase() || (n.toLowerCase() !== window.location.hostname.toLowerCase() || i !== window.location.port && !qq.ie())
          }

          function r(i, o) {
            var r = t(i) || n(i);
            return t(i) ? function (t, n) {
              t.onload = function () {
                t.onload = null, t.onerror = null, n.success(t)
              }, t.onerror = function () {
                t.onload = null, t.onerror = null, e("Problem drawing thumbnail!", "error"), n.failure(t, "Problem drawing thumbnail!")
              }
            }(i, o) : n(i) ? function (e, t) {
              e.qqImageRendered = function () {
                t.success(e)
              }
            }(i, o) : (o.failure(i), e(qq.format("Element container of type {} is not supported!", i.tagName), "error")), r
          }

          function a(e, t, n, a, s) {
            var l = new Image,
              u = new qq.Promise;
            r(l, u), o(e) && (l.crossOrigin = "anonymous"), l.src = e, u.then(function () {
              r(t, n), new qq.MegaPixImage(l).render(t, {
                maxWidth: a,
                maxHeight: a,
                mime: i(e),
                resize: s
              })
            }, n.failure)
          }

          function s(e, t, n, i) {
            r(t, n), qq(t).css({
              maxWidth: i + "px",
              maxHeight: i + "px"
            }), t.src = e
          }

          function l(e, i, l) {
            var u, c = new qq.Promise,
              d = l.scale,
              p = d ? l.maxSize : null;
            return d && t(i) ? (u = document.createElement("canvas")).getContext && u.getContext("2d") ? o(e) && void 0 === (new Image).crossOrigin ? s(e, i, c, p) : a(e, i, c, p) : s(e, i, c, p) : n(i) ? a(e, i, c, p) : r(i, c) && (i.src = e), c
          }
          qq.extend(this, {
            generate: function (t, n, i) {
              return qq.isString(t) ? (e("Attempting to update thumbnail based on server response."), l(t, n, i || {})) : (e("Attempting to draw client-side image preview."), function (t, n, i) {
                var o = new qq.Promise,
                  a = new qq.Identify(t, e),
                  s = i.maxSize,
                  l = null == i.orient || i.orient,
                  u = function () {
                    n.onerror = null, n.onload = null, e("Could not render preview, file may be too large!", "error"), o.failure(n, "Browser cannot render image!")
                  };
                return a.isPreviewable().then(function (a) {
                  var c = {
                      parse: function () {
                        return (new qq.Promise).success()
                      }
                    },
                    d = l ? new qq.Exif(t, e) : c,
                    p = new qq.MegaPixImage(t, u);
                  r(n, o) && d.parse().then(function (e) {
                    var t = e && e.Orientation;
                    p.render(n, {
                      maxWidth: s,
                      maxHeight: s,
                      orientation: t,
                      mime: a,
                      resize: i.customResizeFunction
                    })
                  }, function (t) {
                    e(qq.format("EXIF data could not be parsed ({}).  Assuming orientation = 1.", t)), p.render(n, {
                      maxWidth: s,
                      maxHeight: s,
                      mime: a,
                      resize: i.customResizeFunction
                    })
                  })
                }, function () {
                  e("Not previewable"), o.failure(n, "Not previewable")
                }), o
              }(t, n, i || {}))
            }
          }), this._testing = {}, this._testing.isImg = t, this._testing.isCanvas = n, this._testing.isCrossOrigin = o, this._testing.determineMimeOfFileName = i
        }, qq.Exif = function (e, t) {
          "use strict";
          var n = [274],
            i = {
              274: {
                name: "Orientation",
                bytes: 2
              }
            };

          function o(e) {
            for (var t = 0, n = 0; e.length > 0;) t += parseInt(e.substring(0, 2), 16) * Math.pow(2, n), e = e.substring(2, e.length), n += 8;
            return t
          }

          function r() {
            var t = new qq.Promise;
            return qq.readBlobToHex(e, 0, 6).then(function (n) {
              0 !== n.indexOf("ffd8") ? t.failure("Not a valid JPEG!") : function t(n, i) {
                var o = n,
                  r = i;
                return void 0 === o && (o = 2, r = new qq.Promise), qq.readBlobToHex(e, o, 4).then(function (e) {
                  var n, i = /^ffe([0-9])/.exec(e);
                  i ? "1" !== i[1] ? (n = parseInt(e.slice(4, 8), 16), t(o + n + 2, r)) : r.success(o) : r.failure("No EXIF header to be found!")
                }), r
              }().then(function (e) {
                t.success(e)
              }, function (e) {
                t.failure(e)
              })
            }), t
          }
          qq.extend(this, {
            parse: function () {
              var a = new qq.Promise,
                s = function (e) {
                  t(qq.format("EXIF header parse failed: '{}' ", e)), a.failure(e)
                };
              return r().then(function (r) {
                var l, u;
                t(qq.format("Moving forward with EXIF header parsing for '{}'", void 0 === e.name ? "blob" : e.name)), (l = r, u = new qq.Promise, qq.readBlobToHex(e, l + 10, 2).then(function (e) {
                  u.success("4949" === e)
                }), u).then(function (l) {
                  t(qq.format("EXIF Byte order is {} endian", l ? "little" : "big")),
                    function (t, n) {
                      var i = new qq.Promise;
                      return qq.readBlobToHex(e, t + 18, 2).then(function (e) {
                        if (n) return i.success(o(e));
                        i.success(parseInt(e, 16))
                      }), i
                    }(r, l).then(function (u) {
                      var c, d, p, h;
                      t(qq.format("Found {} APP1 directory entries", u)), (c = r, d = u, p = c + 20, h = 12 * d, qq.readBlobToHex(e, p, h)).then(function (e) {
                        var r = function (e) {
                            for (var t = [], n = 0; n + 24 <= e.length;) t.push(e.slice(n, n + 24)), n += 24;
                            return t
                          }(e),
                          s = function (e, t) {
                            var r = qq.extend([], n),
                              a = {};
                            return qq.each(t, function (t, n) {
                              var s, l, u, c = n.slice(0, 4),
                                d = e ? o(c) : parseInt(c, 16),
                                p = r.indexOf(d);
                              if (p >= 0 && (l = i[d].name, u = i[d].bytes, s = n.slice(16, 16 + 2 * u), a[l] = e ? o(s) : parseInt(s, 16), r.splice(p, 1)), 0 === r.length) return !1
                            }), a
                          }(l, r);
                        t("Successfully parsed some EXIF tags"), a.success(s)
                      }, s)
                    }, s)
                }, s)
              }, s), a
            }
          }), this._testing = {}, this._testing.parseLittleEndian = o
        }, qq.Identify = function (e, t) {
          "use strict";
          qq.extend(this, {
            isPreviewable: function () {
              var n = this,
                i = new qq.Promise,
                o = !1,
                r = void 0 === e.name ? "blob" : e.name;
              return t(qq.format("Attempting to determine if {} can be rendered in this browser", r)), t("First pass: check type attribute of blob object."), this.isPreviewableSync() ? (t("Second pass: check for magic bytes in file header."), qq.readBlobToHex(e, 0, 4).then(function (e) {
                qq.each(n.PREVIEWABLE_MIME_TYPES, function (t, n) {
                  if (r = e, a = !1, s = [].concat(n), qq.each(s, function (e, t) {
                      if (0 === r.indexOf(t)) return a = !0, !1
                    }), a) return ("image/tiff" !== t || qq.supportedFeatures.tiffPreviews) && (o = !0, i.success(t)), !1;
                  var r, a, s
                }), t(qq.format("'{}' is {} able to be rendered in this browser", r, o ? "" : "NOT")), o || i.failure()
              }, function () {
                t("Error reading file w/ name '" + r + "'.  Not able to be rendered in this browser."), i.failure()
              })) : i.failure(), i
            },
            isPreviewableSync: function () {
              var n = e.type,
                i = qq.indexOf(Object.keys(this.PREVIEWABLE_MIME_TYPES), n) >= 0,
                o = !1,
                r = void 0 === e.name ? "blob" : e.name;
              return i && (o = "image/tiff" !== n || qq.supportedFeatures.tiffPreviews), !o && t(r + " is not previewable in this browser per the blob's type attr"), o
            }
          })
        }, qq.Identify.prototype.PREVIEWABLE_MIME_TYPES = {
          "image/jpeg": "ffd8ff",
          "image/gif": "474946",
          "image/png": "89504e",
          "image/bmp": "424d",
          "image/tiff": ["49492a00", "4d4d002a"]
        }, qq.ImageValidation = function (e, t) {
          "use strict";
          this.validate = function (n) {
            var i, o = new qq.Promise;
            return t("Attempting to validate image."), ! function (e) {
              var t = !1;
              return qq.each(e, function (e, n) {
                if (n > 0) return t = !0, !1
              }), t
            }(n) ? o.success() : (i = new qq.Promise, new qq.Identify(e, t).isPreviewable().then(function () {
              var n = new Image,
                o = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
              o ? (n.onerror = function () {
                t("Cannot determine dimensions for image.  May be too large.", "error"), i.failure()
              }, n.onload = function () {
                i.success({
                  width: this.width,
                  height: this.height
                })
              }, n.src = o.createObjectURL(e)) : (t("No createObjectURL function available to generate image URL!", "error"), i.failure())
            }, i.failure), i).then(function (e) {
              var t = function (e, t) {
                var n;
                return qq.each(e, function (e, i) {
                  if (i > 0) {
                    var o = /(max|min)(Width|Height)/.exec(e),
                      r = o[2].charAt(0).toLowerCase() + o[2].slice(1),
                      a = t[r];
                    switch (o[1]) {
                      case "min":
                        if (a < i) return n = e, !1;
                        break;
                      case "max":
                        if (a > i) return n = e, !1
                    }
                  }
                }), n
              }(n, e);
              t ? o.failure(t) : o.success()
            }, o.success), o
          }
        }, qq.Session = function (e) {
          "use strict";
          var t = {
            endpoint: null,
            params: {},
            customHeaders: {},
            cors: {},
            addFileRecord: function (e) {},
            log: function (e, t) {}
          };

          function n(e, n, i, o) {
            var r = !1;
            (n = n && function (e) {
              if (qq.isArray(e)) return !0;
              t.log("Session response is not an array.", "error")
            }(e)) && qq.each(e, function (e, n) {
              if (null == n.uuid) r = !0, t.log(qq.format("Session response item {} did not include a valid UUID - ignoring.", e), "error");
              else if (null == n.name) r = !0, t.log(qq.format("Session response item {} did not include a valid name - ignoring.", e), "error");
              else try {
                return t.addFileRecord(n), !0
              } catch (e) {
                r = !0, t.log(e.message, "error")
              }
              return !1
            }), o[n && !r ? "success" : "failure"](e, i)
          }
          qq.extend(t, e, !0), this.refresh = function () {
            var e = new qq.Promise,
              i = qq.extend({}, t);
            return new qq.SessionAjaxRequester(qq.extend(i, {
              onComplete: function (t, i, o) {
                n(t, i, o, e)
              }
            })).queryServer(), e
          }
        }, qq.SessionAjaxRequester = function (e) {
          "use strict";
          var t, n = {
            endpoint: null,
            customHeaders: {},
            params: {},
            cors: {
              expected: !1,
              sendCredentials: !1
            },
            onComplete: function (e, t, n) {},
            log: function (e, t) {}
          };
          qq.extend(n, e), t = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: ["GET"],
            method: "GET",
            endpointStore: {
              get: function () {
                return n.endpoint
              }
            },
            customHeaders: n.customHeaders,
            log: n.log,
            onComplete: function (e, t, i) {
              var o = null;
              if (null != t.responseText) try {
                o = qq.parseJson(t.responseText)
              } catch (e) {
                n.log("Problem parsing session response: " + e.message, "error"), i = !0
              }
              n.onComplete(o, !i, t)
            },
            cors: n.cors
          })), qq.extend(this, {
            queryServer: function () {
              var e = qq.extend({}, n.params);
              n.log("Session query request."), t.initTransport("sessionRefresh").withParams(e).withCacheBuster().send()
            }
          })
        }, qq.Scaler = function (e, t) {
          "use strict";
          var n = e.customResizer,
            i = e.sendOriginal,
            o = e.orient,
            r = e.defaultType,
            a = e.defaultQuality / 100,
            s = e.failureText,
            l = e.includeExif,
            u = this._getSortedSizes(e.sizes);
          qq.extend(this, {
            enabled: qq.supportedFeatures.scaling && u.length > 0,
            getFileRecords: function (e, c, d) {
              var p = this,
                h = [],
                q = d.blob ? d.blob : d;
              return new qq.Identify(q, t).isPreviewableSync() ? (qq.each(u, function (e, i) {
                var u = p._determineOutputType({
                  defaultType: r,
                  requestedType: i.type,
                  refType: q.type
                });
                h.push({
                  uuid: qq.getUniqueId(),
                  name: p._getName(c, {
                    name: i.name,
                    type: u,
                    refType: q.type
                  }),
                  blob: new qq.BlobProxy(q, qq.bind(p._generateScaledImage, p, {
                    customResizeFunction: n,
                    maxSize: i.maxSize,
                    orient: o,
                    type: u,
                    quality: a,
                    failedText: s,
                    includeExif: l,
                    log: t
                  }))
                })
              }), h.push({
                uuid: e,
                name: c,
                size: q.size,
                blob: i ? q : null
              })) : h.push({
                uuid: e,
                name: c,
                size: q.size,
                blob: q
              }), h
            },
            handleNewFile: function (e, t, n, i, o, r, a, s) {
              e.qqButtonId || e.blob && e.blob.qqButtonId;
              var l, u = [],
                c = null,
                d = s.addFileToHandler,
                p = s.uploadData,
                h = s.paramsStore,
                q = qq.getUniqueId();
              qq.each(this.getFileRecords(n, t, e), function (e, t) {
                var n, i = t.size;
                t.blob instanceof qq.BlobProxy && (i = -1), n = p.addFile({
                  uuid: t.uuid,
                  name: t.name,
                  size: i,
                  batchId: r,
                  proxyGroupId: q
                }), t.blob instanceof qq.BlobProxy ? u.push(n) : c = n, t.blob ? (d(n, t.blob), o.push({
                  id: n,
                  file: t.blob
                })) : p.setStatus(n, qq.status.REJECTED)
              }), null !== c && (qq.each(u, function (e, t) {
                var n = {
                  qqparentuuid: p.retrieve({
                    id: c
                  }).uuid,
                  qqparentsize: p.retrieve({
                    id: c
                  }).size
                };
                n[a] = p.retrieve({
                  id: t
                }).uuid, p.setParentId(t, c), h.addReadOnly(t, n)
              }), u.length && ((l = {})[a] = p.retrieve({
                id: c
              }).uuid, h.addReadOnly(c, l)))
            }
          })
        }, qq.extend(qq.Scaler.prototype, {
          scaleImage: function (e, t, n) {
            "use strict";
            if (!qq.supportedFeatures.scaling) throw new qq.Error("Scaling is not supported in this browser!");
            var i = new qq.Promise,
              o = n.log,
              r = n.getFile(e),
              a = n.uploadData.retrieve({
                id: e
              }),
              s = a && a.name,
              l = a && a.uuid,
              u = {
                customResizer: t.customResizer,
                sendOriginal: !1,
                orient: t.orient,
                defaultType: t.type || null,
                defaultQuality: t.quality,
                failedToScaleText: "Unable to scale",
                sizes: [{
                  name: "",
                  maxSize: t.maxSize
                }]
              },
              c = new qq.Scaler(u, o);
            return qq.Scaler && qq.supportedFeatures.imagePreviews && r ? qq.bind(function () {
              var t = c.getFileRecords(l, s, r)[0];
              t && t.blob instanceof qq.BlobProxy ? t.blob.create().then(i.success, i.failure) : (o(e + " is not a scalable image!", "error"), i.failure())
            }, this)() : (i.failure(), o("Could not generate requested scaled image for " + e + ".  Scaling is either not possible in this browser, or the file could not be located.", "error")), i
          },
          _determineOutputType: function (e) {
            "use strict";
            var t = e.requestedType,
              n = e.defaultType,
              i = e.refType;
            return n || t ? t && qq.indexOf(Object.keys(qq.Identify.prototype.PREVIEWABLE_MIME_TYPES), t) >= 0 ? "image/tiff" === t ? qq.supportedFeatures.tiffPreviews ? t : n : t : n : "image/jpeg" !== i ? "image/png" : i
          },
          _getName: function (e, t) {
            "use strict";
            var n = e.lastIndexOf("."),
              i = t.type || "image/png",
              o = t.refType,
              r = "",
              a = qq.getExtension(e),
              s = "";
            return t.name && t.name.trim().length && (s = " (" + t.name + ")"), n >= 0 ? (r = e.substr(0, n), o !== i && (a = i.split("/")[1]), r += s + "." + a) : r = e + s, r
          },
          _getSortedSizes: function (e) {
            "use strict";
            return (e = qq.extend([], e)).sort(function (e, t) {
              return e.maxSize > t.maxSize ? 1 : e.maxSize < t.maxSize ? -1 : 0
            })
          },
          _generateScaledImage: function (e, t) {
            "use strict";
            var n = this,
              i = e.customResizeFunction,
              o = e.log,
              r = e.maxSize,
              a = e.orient,
              s = e.type,
              l = e.quality,
              u = e.failedText,
              c = e.includeExif && "image/jpeg" === t.type && "image/jpeg" === s,
              d = new qq.Promise,
              p = new qq.ImageGenerator(o),
              h = document.createElement("canvas");
            return o("Attempting to generate scaled version for " + t.name), p.generate(t, h, {
              maxSize: r,
              orient: a,
              customResizeFunction: i
            }).then(function () {
              var e = h.toDataURL(s, l),
                i = function () {
                  o("Success generating scaled version for " + t.name);
                  var n = qq.dataUriToBlob(e);
                  d.success(n)
                };
              c ? n._insertExifHeader(t, e, o).then(function (t) {
                e = t, i()
              }, function () {
                o("Problem inserting EXIF header into scaled image.  Using scaled image w/out EXIF data.", "error"), i()
              }) : i()
            }, function () {
              o("Failed attempt to generate scaled version for " + t.name, "error"), d.failure(u)
            }), d
          },
          _insertExifHeader: function (e, t, n) {
            "use strict";
            var i = new FileReader,
              o = new qq.Promise,
              r = "";
            return i.onload = function () {
              r = i.result, o.success(qq.ExifRestorer.restore(r, t))
            }, i.onerror = function () {
              n("Problem reading " + e.name + " during attempt to transfer EXIF data to scaled version.", "error"), o.failure()
            }, i.readAsDataURL(e), o
          },
          _dataUriToBlob: function (e) {
            "use strict";
            var t, n, i, o;
            return t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURI(e.split(",")[1]), n = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i), qq.each(t, function (e, t) {
              o[e] = t.charCodeAt(0)
            }), this._createBlob(i, n)
          },
          _createBlob: function (e, t) {
            "use strict";
            var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
              i = n && new n;
            return i ? (i.append(e), i.getBlob(t)) : new Blob([e], {
              type: t
            })
          }
        }), qq.ExifRestorer = (ExifRestorer = {
          KEY_STR: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          encode64: function (e) {
            var t, n, i, o, r, a = "",
              s = "",
              l = "",
              u = 0;
            do {
              i = (t = e[u++]) >> 2, o = (3 & t) << 4 | (n = e[u++]) >> 4, r = (15 & n) << 2 | (s = e[u++]) >> 6, l = 63 & s, isNaN(n) ? r = l = 64 : isNaN(s) && (l = 64), a = a + this.KEY_STR.charAt(i) + this.KEY_STR.charAt(o) + this.KEY_STR.charAt(r) + this.KEY_STR.charAt(l), t = n = s = "", i = o = r = l = ""
            } while (u < e.length);
            return a
          },
          restore: function (e, t) {
            if (!e.match("data:image/jpeg;base64,")) return t;
            var n = this.decode64(e.replace("data:image/jpeg;base64,", "")),
              i = this.slice2Segments(n),
              o = this.exifManipulation(t, i);
            return "data:image/jpeg;base64," + this.encode64(o)
          },
          exifManipulation: function (e, t) {
            var n = this.getExifArray(t),
              i = this.insertExif(e, n);
            return new Uint8Array(i)
          },
          getExifArray: function (e) {
            for (var t, n = 0; n < e.length; n++)
              if (255 == (t = e[n])[0] & 225 == t[1]) return t;
            return []
          },
          insertExif: function (e, t) {
            var n = e.replace("data:image/jpeg;base64,", ""),
              i = this.decode64(n),
              o = i.indexOf(255, 3),
              r = i.slice(0, o),
              a = i.slice(o),
              s = r;
            return s = (s = s.concat(t)).concat(a)
          },
          slice2Segments: function (e) {
            for (var t = 0, n = []; !(255 == e[t] & 218 == e[t + 1]);) {
              if (255 == e[t] & 216 == e[t + 1]) t += 2;
              else {
                var i = t + (256 * e[t + 2] + e[t + 3]) + 2,
                  o = e.slice(t, i);
                n.push(o), t = i
              }
              if (t > e.length) break
            }
            return n
          },
          decode64: function (e) {
            var t, n, i, o, r = "",
              a = "",
              s = 0,
              l = [];
            if (/[^A-Za-z0-9\+\/\=]/g.exec(e)) throw new Error("There were invalid base64 characters in the input text.  Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='");
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
              t = this.KEY_STR.indexOf(e.charAt(s++)) << 2 | (i = this.KEY_STR.indexOf(e.charAt(s++))) >> 4, n = (15 & i) << 4 | (o = this.KEY_STR.indexOf(e.charAt(s++))) >> 2, r = (3 & o) << 6 | (a = this.KEY_STR.indexOf(e.charAt(s++))), l.push(t), 64 != o && l.push(n), 64 != a && l.push(r), t = n = r = "", i = o = a = ""
            } while (s < e.length);
            return l
          }
        }, ExifRestorer), qq.TotalProgress = function (e, t) {
          "use strict";
          var n = {},
            i = 0,
            o = 0,
            r = -1,
            a = -1,
            s = function (t, n) {
              t === r && n === a || e(t, n), r = t, a = n
            },
            l = function (e) {
              var i = t(e);
              i > 0 && (u(e, 0, i), n[e] = {
                loaded: 0,
                total: i
              })
            },
            u = function (e, t, r) {
              var a = n[e] ? n[e].loaded : 0,
                l = n[e] ? n[e].total : 0; - 1 === t && -1 === r ? (i -= a, o -= l) : (t && (i += t - a), r && (o += r - l)), s(i, o)
            };
          qq.extend(this, {
            onAllComplete: function (e, t, n) {
              (0 === t.length || function (e, t) {
                var n = !0;
                return qq.each(e, function (e, i) {
                  if (qq.indexOf(t, i) >= 0) return n = !1, !1
                }), n
              }(t, n)) && (s(o, o), this.reset())
            },
            onStatusChange: function (e, t, i) {
              i === qq.status.CANCELED || i === qq.status.REJECTED ? function (e) {
                u(e, -1, -1), delete n[e]
              }(e) : i === qq.status.SUBMITTING && l(e)
            },
            onIndividualProgress: function (e, t, i) {
              u(e, t, i), n[e] = {
                loaded: t,
                total: i
              }
            },
            onNewSize: function (e) {
              l(e)
            },
            reset: function () {
              n = {}, i = 0, o = 0
            }
          })
        }, qq.PasteSupport = function (e) {
          "use strict";
          var t, n;
          t = {
            targetElement: null,
            callbacks: {
              log: function (e, t) {},
              pasteReceived: function (e) {}
            }
          }, qq.extend(t, e), n = qq(t.targetElement).attach("paste", function (e) {
            var n = e.clipboardData;
            n && qq.each(n.items, function (e, n) {
              if (function (e) {
                  return e.type && 0 === e.type.indexOf("image/")
                }(n)) {
                var i = n.getAsFile();
                t.callbacks.pasteReceived(i)
              }
            })
          }), qq.extend(this, {
            reset: function () {
              n && n()
            }
          })
        }, qq.FormSupport = function (e, t, n) {
          "use strict";
          var i = this,
            o = e.interceptSubmit,
            r = e.element,
            a = e.autoUpload;

          function s(e, t) {
            if (!e.checkValidity || e.checkValidity()) return !0;
            n("Form did not pass validation checks - will not upload.", "error"), t()
          }
          qq.extend(this, {
            newEndpoint: null,
            newAutoUpload: a,
            attachedToForm: !1,
            getFormInputsAsObject: function () {
              return null == r ? null : i._form2Obj(r)
            }
          }), r = function (e) {
            return e && (qq.isString(e) && (e = document.getElementById(e)), e && (n("Attaching to form element."), function (e) {
              e.getAttribute("action") && (i.newEndpoint = e.getAttribute("action"))
            }(e), o && function (e) {
              var n = e.submit;
              qq(e).attach("submit", function (i) {
                (i = i || window.event).preventDefault ? i.preventDefault() : i.returnValue = !1, s(e, n) && t()
              }), e.submit = function () {
                s(e, n) && t()
              }
            }(e))), e
          }(r), this.attachedToForm = !!r
        }, qq.extend(qq.FormSupport.prototype, {
          _form2Obj: function (e) {
            "use strict";
            var t = {},
              n = function (e) {
                return t = e.type, qq.indexOf(["checkbox", "radio"], t.toLowerCase()) >= 0 && !e.checked || e.disabled && "hidden" !== e.type.toLowerCase();
                var t
              };
            return qq.each(e.elements, function (e, i) {
              if ((qq.isInput(i, !0) || "textarea" === i.tagName.toLowerCase()) && (r = i.type, qq.indexOf(["button", "image", "reset", "submit"], r.toLowerCase()) < 0) && !n(i)) t[i.name] = i.value;
              else if ("select" === i.tagName.toLowerCase() && !n(i)) {
                var o = function (e) {
                  var t = null;
                  return qq.each(qq(e).children(), function (e, n) {
                    if ("option" === n.tagName.toLowerCase() && n.selected) return t = n.value, !1
                  }), t
                }(i);
                null !== o && (t[i.name] = o)
              }
              var r
            }), t
          }
        }), qq.traditional = qq.traditional || {}, qq.traditional.FormUploadHandler = function (e, t) {
          "use strict";
          var n = this,
            i = t.getName,
            o = t.getUuid,
            r = t.log;
          this.uploadFile = function (t) {
            var a, s = n.getInput(t),
              l = n._createIframe(t),
              u = new qq.Promise;
            return (a = function (t, r) {
              var a = e.paramsStore.get(t),
                s = "get" === e.method.toLowerCase() ? "GET" : "POST",
                l = e.endpointStore.get(t),
                u = i(t);
              return a[e.uuidName] = o(t), a[e.filenameParam] = u, n._initFormForUpload({
                method: s,
                endpoint: l,
                params: a,
                paramsInBody: e.paramsInBody,
                targetName: r.name
              })
            }(t, l)).appendChild(s), n._attachLoadEvent(l, function (i) {
              r("iframe loaded");
              var o = i || function (e, t) {
                var i, o, a;
                try {
                  a = (o = t.contentDocument || t.contentWindow.document).body.innerHTML, r("converting iframe's innerHTML to JSON"), r("innerHTML = " + a), a && a.match(/^<pre/i) && (a = o.body.firstChild.firstChild.nodeValue), i = n._parseJsonResponse(a)
                } catch (e) {
                  r("Error when attempting to parse form upload response (" + e.message + ")", "error"), i = {
                    success: !1
                  }
                }
                return i
              }(0, l);
              n._detachLoadEvent(t), e.cors.expected || qq(l).remove(), o.success ? u.success(o) : u.failure(o)
            }), r("Sending upload request for " + t), a.submit(), qq(a).remove(), u
          }, qq.extend(this, new qq.FormUploadHandler({
            options: {
              isCors: e.cors.expected,
              inputName: e.inputName
            },
            proxy: {
              onCancel: e.onCancel,
              getName: i,
              getUuid: o,
              log: r
            }
          }))
        }, qq.traditional = qq.traditional || {}, qq.traditional.XhrUploadHandler = function (e, t) {
          "use strict";
          var n = this,
            i = t.getName,
            o = t.getSize,
            r = t.getUuid,
            a = t.log,
            s = e.forceMultipart || e.paramsInBody,
            l = new qq.traditional.AllChunksDoneAjaxRequester({
              cors: e.cors,
              endpoint: e.chunking.success.endpoint,
              headers: e.chunking.success.headers,
              jsonPayload: e.chunking.success.jsonPayload,
              log: a,
              method: e.chunking.success.method,
              params: e.chunking.success.params
            }),
            u = function (e, t) {
              var n = new qq.Promise;
              return t.onreadystatechange = function () {
                if (4 === t.readyState) {
                  var i = c(e, t);
                  i.success ? n.success(i.response, t) : n.failure(i.response, t)
                }
              }, n
            },
            c = function (t, n) {
              var i;
              return a("xhr - server response received for " + t), a("responseText = " + n.responseText), {
                success: ! function (t, n) {
                  return qq.indexOf([200, 201, 202, 203, 204], t.status) < 0 || e.requireSuccessJson && !n.success || n.reset
                }(n, i = d(!0, n)),
                response: i
              }
            },
            d = function (t, n) {
              var i = {};
              try {
                a(qq.format("Received response status {} with body: {}", n.status, n.responseText)), i = qq.parseJson(n.responseText)
              } catch (n) {
                t && e.requireSuccessJson && a("Error when attempting to parse xhr response text (" + n.message + ")", "error")
              }
              return i
            },
            p = function (t) {
              var a = new qq.Promise;
              return l.complete(t, n._createXhr(t), function (t) {
                var a = e.paramsStore.get(t),
                  s = i(t),
                  l = o(t);
                return a[e.uuidName] = r(t), a[e.filenameParam] = s, a[e.totalFileSizeName] = l, a[e.chunking.paramNames.totalParts] = n._getTotalChunks(t), a
              }(t), e.customHeaders.get(t)).then(function (e) {
                a.success(d(!1, e), e)
              }, function (e) {
                a.failure(d(!1, e), e)
              }), a
            },
            h = function (t) {
              var n, a = t.fileOrBlob,
                l = t.id,
                u = t.xhr,
                c = t.xhrOverrides || {},
                d = t.customParams || {},
                p = t.params || {},
                h = c.params || {},
                q = s ? new FormData : null,
                f = c.method || e.method,
                m = c.endpoint || e.endpointStore.get(l),
                g = i(l),
                _ = o(l);
              return e.omitDefaultParams ? (n = qq.extend({}, d), qq.extend(n, h)) : (n = qq.extend({}, d), qq.extend(n, h), qq.extend(n, p), n[e.uuidName] = r(l), n[e.filenameParam] = g, s ? n[e.totalFileSizeName] = _ : e.paramsInBody || (n[e.inputName] = g)), e.paramsInBody || (m = qq.obj2url(n, m)), u.open(f, m, !0), e.cors.expected && e.cors.sendCredentials && (u.withCredentials = !0), s ? (e.paramsInBody && qq.obj2FormData(n, q), q.append(e.inputName, a), q) : a
            },
            q = function (t) {
              var i = t.headerOverrides,
                o = t.id,
                r = t.xhr;
              if (i) qq.each(i, function (e, t) {
                r.setRequestHeader(e, t)
              });
              else {
                var a = e.customHeaders.get(o),
                  l = n.getFile(o);
                r.setRequestHeader("Accept", "application/json"), r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.setRequestHeader("Cache-Control", "no-cache"), s || (r.setRequestHeader("Content-Type", "application/octet-stream"), r.setRequestHeader("X-Mime-Type", l.type)), qq.each(a, function (e, t) {
                  r.setRequestHeader(e, t)
                })
              }
            };
          qq.extend(this, {
            uploadChunk: function (t) {
              var r, a, l, c = t.id,
                d = t.chunkIdx,
                p = t.overrides || {},
                f = t.resuming,
                m = n._getChunkData(c, d),
                g = n._createXhr(c, d),
                _ = {};
              return r = u(c, g), n._registerProgressHandler(c, d, m.size), l = e.paramsStore.get(c),
                function (t, n, r) {
                  var a = o(t),
                    l = i(t);
                  e.omitDefaultParams || (n[e.chunking.paramNames.partIndex] = r.part, n[e.chunking.paramNames.partByteOffset] = r.start, n[e.chunking.paramNames.chunkSize] = r.size, n[e.chunking.paramNames.totalParts] = r.count, n[e.totalFileSizeName] = a), s && !e.omitDefaultParams && (n[e.filenameParam] = l)
                }(c, _, m), f && (_[e.resume.paramNames.resuming] = !0), a = h({
                  fileOrBlob: m.blob,
                  id: c,
                  customParams: l,
                  params: _,
                  xhr: g,
                  xhrOverrides: p
                }), q({
                  headerOverrides: p.headers,
                  id: c,
                  xhr: g
                }), g.send(a), r
            },
            uploadFile: function (t) {
              var i, o, r, a, s = n.getFile(t);
              return o = n._createXhr(t), n._registerProgressHandler(t), i = u(t, o), r = e.paramsStore.get(t), a = h({
                fileOrBlob: s,
                id: t,
                customParams: r,
                xhr: o
              }), q({
                id: t,
                xhr: o
              }), o.send(a), i
            }
          }), qq.extend(this, new qq.XhrUploadHandler({
            options: qq.extend({
              namespace: "traditional"
            }, e),
            proxy: qq.extend({
              getEndpoint: e.endpointStore.get
            }, t)
          })), qq.override(this, function (n) {
            return {
              finalizeChunks: function (i) {
                return t.onFinalizing(i), e.chunking.success.endpoint ? p(i) : n.finalizeChunks(i, qq.bind(d, this, !0))
              }
            }
          })
        }, qq.traditional.AllChunksDoneAjaxRequester = function (e) {
          "use strict";
          var t, n = {
              cors: {
                allowXdr: !1,
                expected: !1,
                sendCredentials: !1
              },
              endpoint: null,
              log: function (e, t) {},
              method: "POST"
            },
            i = {},
            o = {
              get: function (e) {
                return qq.isFunction(n.endpoint) ? n.endpoint(e) : n.endpoint
              }
            };
          qq.extend(n, e), t = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            contentType: n.jsonPayload ? "application/json" : "application/x-www-form-urlencoded",
            validMethods: [n.method],
            method: n.method,
            endpointStore: o,
            allowXRequestedWithAndCacheControl: !1,
            cors: n.cors,
            log: n.log,
            onComplete: function (e, t, n) {
              var o = i[e];
              delete i[e], n ? o.failure(t) : o.success(t)
            }
          })), qq.extend(this, {
            complete: function (e, o, r, a) {
              var s = new qq.Promise;
              return n.log("Submitting All Chunks Done request for " + e), i[e] = s, t.initTransport(e).withParams(n.params(e) || r).withHeaders(n.headers(e) || a).send(o), s
            }
          })
        }, qq.DragAndDrop = function (e) {
          "use strict";
          var t, n, i, o = "qq-hidezones",
            r = "qq-hide-dropzone",
            a = [],
            s = [],
            l = new qq.DisposeSupport;

          function u(e) {
            var n = new qq.Promise;
            return e.isFile ? e.file(function (t) {
              t.qqPath = c(e), s.push(t), n.success()
            }, function (i) {
              t.callbacks.dropLog("Problem parsing '" + e.fullPath + "'.  FileError code " + i.code + ".", "error"), n.failure()
            }) : e.isDirectory && function e(t, n, i, o) {
              var r = o || new qq.Promise,
                a = n || t.createReader();
              a.readEntries(function (n) {
                var o = i ? i.concat(n) : n;
                n.length ? setTimeout(function () {
                  e(t, a, o, r)
                }, 0) : r.success(o)
              }, r.failure);
              return r
            }(e).then(function (e) {
              var t = e.length;
              qq.each(e, function (e, i) {
                u(i).done(function () {
                  0 === (t -= 1) && n.success()
                })
              }), e.length || n.success()
            }, function (i) {
              t.callbacks.dropLog("Problem parsing '" + e.fullPath + "'.  FileError code " + i.code + ".", "error"), n.failure()
            }), n
          }

          function c(e) {
            var t = e.name,
              n = e.fullPath,
              i = n.lastIndexOf(t);
            return "/" === (n = n.substr(0, i)).charAt(0) && (n = n.substr(1)), n
          }

          function d(e) {
            var n = new qq.UploadDropZone({
              HIDE_ZONES_EVENT_NAME: o,
              element: e,
              onEnter: function (n) {
                qq(e).addClass(t.classes.dropActive), n.stopPropagation()
              },
              onLeaveNotDescendants: function (n) {
                qq(e).removeClass(t.classes.dropActive)
              },
              onDrop: function (e) {
                var i, o, r, a;
                (i = e.dataTransfer, o = n, r = [], a = new qq.Promise, t.callbacks.processingDroppedFiles(), o.dropDisabled(!0), i.files.length > 1 && !t.allowMultipleItems ? (t.callbacks.processingDroppedFilesComplete([]), t.callbacks.dropError("tooManyFilesError", ""), o.dropDisabled(!1), a.failure()) : (s = [], qq.isFolderDropSupported(i) ? qq.each(i.items, function (e, t) {
                  var n = t.webkitGetAsEntry();
                  n && (n.isFile ? s.push(t.getAsFile()) : r.push(u(n).done(function () {
                    r.pop(), 0 === r.length && a.success()
                  })))
                }) : s = i.files, 0 === r.length && a.success()), a).then(function () {
                  var e, i, o;
                  e = s, i = n, o = Array.prototype.slice.call(e), t.callbacks.dropLog("Grabbed " + e.length + " dropped files."), i.dropDisabled(!1), t.callbacks.processingDroppedFilesComplete(o, i.getElement())
                }, function () {
                  t.callbacks.dropLog("Drop event DataTransfer parsing failed.  No files will be uploaded.", "error")
                })
              }
            });
            return l.addDisposer(function () {
              n.dispose()
            }), qq(e).hasAttribute(r) && qq(e).hide(), a.push(n), n
          }

          function p(e) {
            var t;
            return qq.each(e.dataTransfer.types, function (e, n) {
              if ("Files" === n) return t = !0, !1
            }), t
          }
          t = {
            dropZoneElements: [],
            allowMultipleItems: !0,
            classes: {
              dropActive: null
            },
            callbacks: new qq.DragAndDrop.callbacks
          }, qq.extend(t, e, !0), n = t.dropZoneElements, i = function () {
            setTimeout(function () {
              qq.each(n, function (e, n) {
                qq(n).hasAttribute(r) && qq(n).hide(), qq(n).removeClass(t.classes.dropActive)
              })
            }, 10)
          }, qq.each(n, function (e, t) {
            var i = d(t);
            n.length && qq.supportedFeatures.fileDrop && l.attach(document, "dragenter", function (e) {
              !i.dropDisabled() && p(e) && qq.each(n, function (e, t) {
                t instanceof HTMLElement && qq(t).hasAttribute(r) && qq(t).css({
                  display: "block"
                })
              })
            })
          }), l.attach(document, "dragleave", function (e) {
            (function (e) {
              return qq.safari() ? e.x < 0 || e.y < 0 : 0 === e.x && 0 === e.y
            })(e) && i()
          }), l.attach(qq(document).children()[0], "mouseenter", function (e) {
            i()
          }), l.attach(document, "drop", function (e) {
            p(e) && (e.preventDefault(), i())
          }), l.attach(document, o, i), qq.extend(this, {
            setupExtraDropzone: function (e) {
              t.dropZoneElements.push(e), d(e)
            },
            removeDropzone: function (e) {
              var n, i = t.dropZoneElements;
              for (n in i)
                if (i[n] === e) return i.splice(n, 1)
            },
            dispose: function () {
              l.dispose(), qq.each(a, function (e, t) {
                t.dispose()
              })
            }
          }), this._testing = {}, this._testing.extractDirectoryPath = c
        }, qq.DragAndDrop.callbacks = function () {
          "use strict";
          return {
            processingDroppedFiles: function () {},
            processingDroppedFilesComplete: function (e, t) {},
            dropError: function (e, t) {
              qq.log("Drag & drop error code '" + e + " with these specifics: '" + t + "'", "error")
            },
            dropLog: function (e, t) {
              qq.log(e, t)
            }
          }
        }, qq.UploadDropZone = function (e) {
          "use strict";
          var t, n, i, o, r = new qq.DisposeSupport;

          function a(e) {
            if (!qq.supportedFeatures.fileDrop) return !1;
            var t, n = e.dataTransfer,
              i = qq.safari();
            return t = !(!qq.ie() || !qq.supportedFeatures.fileDrop) || "none" !== n.effectAllowed, n && t && (n.files && n.files.length || !i && n.types.contains && n.types.contains("Files") || n.types.includes && n.types.includes("Files"))
          }

          function s(e) {
            return void 0 !== e && (i = e), i
          }
          t = {
            element: null,
            onEnter: function (e) {},
            onLeave: function (e) {},
            onLeaveNotDescendants: function (e) {},
            onDrop: function (e) {}
          }, qq.extend(t, e), n = t.element, o || (function () {
            return qq.safari() || qq.firefox() && qq.windows()
          } ? r.attach(document, "dragover", function (e) {
            e.preventDefault()
          }) : r.attach(document, "dragover", function (e) {
            e.dataTransfer && (e.dataTransfer.dropEffect = "none", e.preventDefault())
          }), o = !0), r.attach(n, "dragover", function (e) {
            if (a(e)) {
              var t = qq.ie() && qq.supportedFeatures.fileDrop ? null : e.dataTransfer.effectAllowed;
              e.dataTransfer.dropEffect = "move" === t || "linkMove" === t ? "move" : "copy", e.stopPropagation(), e.preventDefault()
            }
          }), r.attach(n, "dragenter", function (e) {
            if (!s()) {
              if (!a(e)) return;
              t.onEnter(e)
            }
          }), r.attach(n, "dragleave", function (e) {
            if (a(e)) {
              t.onLeave(e);
              var n = document.elementFromPoint(e.clientX, e.clientY);
              qq(this).contains(n) || t.onLeaveNotDescendants(e)
            }
          }), r.attach(n, "drop", function (e) {
            if (!s()) {
              if (!a(e)) return;
              e.preventDefault(), e.stopPropagation(), t.onDrop(e),
                function () {
                  var e;

                  function n() {
                    (e = document.createEvent("Event")).initEvent(t.HIDE_ZONES_EVENT_NAME, !0, !0)
                  }
                  if (window.CustomEvent) try {
                    e = new CustomEvent(t.HIDE_ZONES_EVENT_NAME)
                  } catch (e) {
                    n()
                  } else n();
                  document.dispatchEvent(e)
                }()
            }
          }), qq.extend(this, {
            dropDisabled: function (e) {
              return s(e)
            },
            dispose: function () {
              r.dispose()
            },
            getElement: function () {
              return n
            }
          }), this._testing = {}, this._testing.isValidFileDrag = a
        },
        function () {
          "use strict";
          qq.uiPublicApi = {
            addInitialFiles: function (e) {
              this._parent.prototype.addInitialFiles.apply(this, arguments), this._templating.addCacheToDom()
            },
            clearStoredFiles: function () {
              this._parent.prototype.clearStoredFiles.apply(this, arguments), this._templating.clearFiles()
            },
            addExtraDropzone: function (e) {
              this._dnd && this._dnd.setupExtraDropzone(e)
            },
            removeExtraDropzone: function (e) {
              if (this._dnd) return this._dnd.removeDropzone(e)
            },
            getItemByFileId: function (e) {
              if (!this._templating.isHiddenForever(e)) return this._templating.getFileContainer(e)
            },
            reset: function () {
              this._parent.prototype.reset.apply(this, arguments), this._templating.reset(), !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({
                element: this._templating.getButton(),
                title: this._options.text.fileInputTitle
              }).getButtonId()), this._dnd && (this._dnd.dispose(), this._dnd = this._setupDragAndDrop()), this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0, this._setupClickAndEditEventHandlers()
            },
            setName: function (e, t) {
              var n = this._options.formatFileName(t);
              this._parent.prototype.setName.apply(this, arguments), this._templating.updateFilename(e, n)
            },
            pauseUpload: function (e) {
              var t = this._parent.prototype.pauseUpload.apply(this, arguments);
              return t && this._templating.uploadPaused(e), t
            },
            continueUpload: function (e) {
              var t = this._parent.prototype.continueUpload.apply(this, arguments);
              return t && this._templating.uploadContinued(e), t
            },
            getId: function (e) {
              return this._templating.getFileId(e)
            },
            getDropTarget: function (e) {
              return this.getFile(e).qqDropTarget
            }
          }, qq.uiPrivateApi = {
            _getButton: function (e) {
              var t = this._parent.prototype._getButton.apply(this, arguments);
              return t || e === this._defaultButtonId && (t = this._templating.getButton()), t
            },
            _removeFileItem: function (e) {
              this._templating.removeFile(e)
            },
            _setupClickAndEditEventHandlers: function () {
              this._fileButtonsClickHandler = qq.FileButtonsClickHandler && this._bindFileButtonsClickEvent(), this._focusinEventSupported = !qq.firefox(), this._isEditFilenameEnabled() && (this._filenameClickHandler = this._bindFilenameClickEvent(), this._filenameInputFocusInHandler = this._bindFilenameInputFocusInEvent(), this._filenameInputFocusHandler = this._bindFilenameInputFocusEvent())
            },
            _setupDragAndDrop: function () {
              var e = this,
                t = this._options.dragAndDrop.extraDropzones,
                n = this._templating,
                i = n.getDropZone();
              return i && t.push(i), new qq.DragAndDrop({
                dropZoneElements: t,
                allowMultipleItems: this._options.multiple,
                classes: {
                  dropActive: this._options.classes.dropActive
                },
                callbacks: {
                  processingDroppedFiles: function () {
                    n.showDropProcessing()
                  },
                  processingDroppedFilesComplete: function (t, i) {
                    n.hideDropProcessing(), qq.each(t, function (e, t) {
                      t.qqDropTarget = i
                    }), t.length && e.addFiles(t, null, null)
                  },
                  dropError: function (t, n) {
                    e._itemError(t, n)
                  },
                  dropLog: function (t, n) {
                    e.log(t, n)
                  }
                }
              })
            },
            _bindFileButtonsClickEvent: function () {
              var e = this;
              return new qq.FileButtonsClickHandler({
                templating: this._templating,
                log: function (t, n) {
                  e.log(t, n)
                },
                onDeleteFile: function (t) {
                  e.deleteFile(t)
                },
                onCancel: function (t) {
                  e.cancel(t)
                },
                onRetry: function (t) {
                  e.retry(t)
                },
                onPause: function (t) {
                  e.pauseUpload(t)
                },
                onContinue: function (t) {
                  e.continueUpload(t)
                },
                onGetName: function (t) {
                  return e.getName(t)
                }
              })
            },
            _isEditFilenameEnabled: function () {
              return this._templating.isEditFilenamePossible() && !this._options.autoUpload && qq.FilenameClickHandler && qq.FilenameInputFocusHandler && qq.FilenameInputFocusHandler
            },
            _filenameEditHandler: function () {
              var e = this,
                t = this._templating;
              return {
                templating: t,
                log: function (t, n) {
                  e.log(t, n)
                },
                onGetUploadStatus: function (t) {
                  return e.getUploads({
                    id: t
                  }).status
                },
                onGetName: function (t) {
                  return e.getName(t)
                },
                onSetName: function (t, n) {
                  e.setName(t, n)
                },
                onEditingStatusChange: function (e, n) {
                  var i = qq(t.getEditInput(e)),
                    o = qq(t.getFileContainer(e));
                  n ? (i.addClass("qq-editing"), t.hideFilename(e), t.hideEditIcon(e)) : (i.removeClass("qq-editing"), t.showFilename(e), t.showEditIcon(e)), o.addClass("qq-temp").removeClass("qq-temp")
                }
              }
            },
            _onUploadStatusChange: function (e, t, n) {
              this._parent.prototype._onUploadStatusChange.apply(this, arguments), this._isEditFilenameEnabled() && this._templating.getFileContainer(e) && n !== qq.status.SUBMITTED && (this._templating.markFilenameEditable(e), this._templating.hideEditIcon(e)), t === qq.status.UPLOAD_RETRYING && n === qq.status.UPLOADING ? (this._templating.hideRetry(e), this._templating.setStatusText(e), qq(this._templating.getFileContainer(e)).removeClass(this._classes.retrying)) : n === qq.status.UPLOAD_FAILED && this._templating.hidePause(e)
            },
            _bindFilenameInputFocusInEvent: function () {
              var e = qq.extend({}, this._filenameEditHandler());
              return new qq.FilenameInputFocusInHandler(e)
            },
            _bindFilenameInputFocusEvent: function () {
              var e = qq.extend({}, this._filenameEditHandler());
              return new qq.FilenameInputFocusHandler(e)
            },
            _bindFilenameClickEvent: function () {
              var e = qq.extend({}, this._filenameEditHandler());
              return new qq.FilenameClickHandler(e)
            },
            _storeForLater: function (e) {
              this._parent.prototype._storeForLater.apply(this, arguments), this._templating.hideSpinner(e)
            },
            _onAllComplete: function (e, t) {
              this._parent.prototype._onAllComplete.apply(this, arguments), this._templating.resetTotalProgress()
            },
            _onSubmit: function (e, t) {
              var n = this.getFile(e);
              n && n.qqPath && this._options.dragAndDrop.reportDirectoryPaths && this._paramsStore.addReadOnly(e, {
                qqpath: n.qqPath
              }), this._parent.prototype._onSubmit.apply(this, arguments), this._addToList(e, t)
            },
            _onSubmitted: function (e) {
              this._isEditFilenameEnabled() && (this._templating.markFilenameEditable(e), this._templating.showEditIcon(e), this._focusinEventSupported || this._filenameInputFocusHandler.addHandler(this._templating.getEditInput(e)))
            },
            _onProgress: function (e, t, n, i) {
              this._parent.prototype._onProgress.apply(this, arguments), this._templating.updateProgress(e, n, i), 0 === i || 100 === Math.round(n / i * 100) ? (this._templating.hideCancel(e), this._templating.hidePause(e), this._templating.hideProgress(e), this._templating.setStatusText(e, this._options.text.waitingForResponse), this._displayFileSize(e)) : this._displayFileSize(e, n, i)
            },
            _onTotalProgress: function (e, t) {
              this._parent.prototype._onTotalProgress.apply(this, arguments), this._templating.updateTotalProgress(e, t)
            },
            _onComplete: function (e, t, n, i) {
              var o = this._parent.prototype._onComplete.apply(this, arguments),
                r = this._templating,
                a = r.getFileContainer(e),
                s = this;

              function l(t) {
                a && (r.setStatusText(e), qq(a).removeClass(s._classes.retrying), r.hideProgress(e), s.getUploads({
                  id: e
                }).status !== qq.status.UPLOAD_FAILED && r.hideCancel(e), r.hideSpinner(e), t.success ? s._markFileAsSuccessful(e) : (qq(a).addClass(s._classes.fail), r.showCancel(e), r.isRetryPossible() && !s._preventRetries[e] && (qq(a).addClass(s._classes.retryable), r.showRetry(e)), s._controlFailureTextDisplay(e, t)))
              }
              return o instanceof qq.Promise ? o.done(function (e) {
                l(e)
              }) : l(n), o
            },
            _markFileAsSuccessful: function (e) {
              var t = this._templating;
              this._isDeletePossible() && t.showDeleteButton(e), qq(t.getFileContainer(e)).addClass(this._classes.success), this._maybeUpdateThumbnail(e)
            },
            _onUploadPrep: function (e) {
              this._parent.prototype._onUploadPrep.apply(this, arguments), this._templating.showSpinner(e)
            },
            _onUpload: function (e, t) {
              var n = this._parent.prototype._onUpload.apply(this, arguments);
              return this._templating.showSpinner(e), n
            },
            _onUploadChunk: function (e, t) {
              this._parent.prototype._onUploadChunk.apply(this, arguments), t.partIndex > 0 && this._handler.isResumable(e) && this._templating.allowPause(e)
            },
            _onCancel: function (e, t) {
              this._parent.prototype._onCancel.apply(this, arguments), this._removeFileItem(e), 0 === this._getNotFinished() && this._templating.resetTotalProgress()
            },
            _onBeforeAutoRetry: function (e) {
              var t, n, i;
              this._parent.prototype._onBeforeAutoRetry.apply(this, arguments), this._showCancelLink(e), this._options.retry.showAutoRetryNote && (t = this._autoRetries[e], n = this._options.retry.maxAutoAttempts, i = (i = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, t)).replace(/\{maxAuto\}/g, n), this._templating.setStatusText(e, i), qq(this._templating.getFileContainer(e)).addClass(this._classes.retrying))
            },
            _onBeforeManualRetry: function (e) {
              return this._parent.prototype._onBeforeManualRetry.apply(this, arguments) ? (this._templating.resetProgress(e), qq(this._templating.getFileContainer(e)).removeClass(this._classes.fail), this._templating.setStatusText(e), this._templating.showSpinner(e), this._showCancelLink(e), !0) : (qq(this._templating.getFileContainer(e)).addClass(this._classes.retryable), this._templating.showRetry(e), !1)
            },
            _onSubmitDelete: function (e) {
              var t = qq.bind(this._onSubmitDeleteSuccess, this);
              this._parent.prototype._onSubmitDelete.call(this, e, t)
            },
            _onSubmitDeleteSuccess: function (e, t, n) {
              this._options.deleteFile.forceConfirm ? this._showDeleteConfirm.apply(this, arguments) : this._sendDeleteRequest.apply(this, arguments)
            },
            _onDeleteComplete: function (e, t, n) {
              this._parent.prototype._onDeleteComplete.apply(this, arguments), this._templating.hideSpinner(e), n ? (this._templating.setStatusText(e, this._options.deleteFile.deletingFailedText), this._templating.showDeleteButton(e)) : this._removeFileItem(e)
            },
            _sendDeleteRequest: function (e, t, n) {
              this._templating.hideDeleteButton(e), this._templating.showSpinner(e), this._templating.setStatusText(e, this._options.deleteFile.deletingStatusText), this._deleteHandler.sendDelete.apply(this, arguments)
            },
            _showDeleteConfirm: function (e, t, n) {
              var i, o = this.getName(e),
                r = this._options.deleteFile.confirmMessage.replace(/\{filename\}/g, o),
                a = (this.getUuid(e), arguments),
                s = this;
              i = this._options.showConfirm(r), qq.isGenericPromise(i) ? i.then(function () {
                s._sendDeleteRequest.apply(s, a)
              }) : !1 !== i && s._sendDeleteRequest.apply(s, a)
            },
            _addToList: function (e, t, n) {
              var i, o, r = 0,
                a = this._handler.isProxied(e) && this._options.scaling.hideScaled;
              this._options.display.prependFiles && (this._totalFilesInBatch > 1 && this._filesInBatchAddedToUi > 0 && (r = this._filesInBatchAddedToUi - 1), i = {
                index: r
              }), n || (this._options.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading && this._templating.disableCancel(), this._options.multiple || (o = this.getUploads({
                id: e
              }), this._handledProxyGroup = this._handledProxyGroup || o.proxyGroupId, o.proxyGroupId === this._handledProxyGroup && o.proxyGroupId || (this._handler.cancelAll(), this._clearList(), this._handledProxyGroup = null))), n ? (this._templating.addFileToCache(e, this._options.formatFileName(t), i, a), this._templating.updateThumbnail(e, this._thumbnailUrls[e], !0, this._options.thumbnails.customResizer)) : (this._templating.addFile(e, this._options.formatFileName(t), i, a), this._templating.generatePreview(e, this.getFile(e), this._options.thumbnails.customResizer)), this._filesInBatchAddedToUi += 1, (n || this._options.display.fileSizeOnSubmit && qq.supportedFeatures.ajaxUploading) && this._displayFileSize(e)
            },
            _clearList: function () {
              this._templating.clearFiles(), this.clearStoredFiles()
            },
            _displayFileSize: function (e, t, n) {
              var i = this.getSize(e),
                o = this._formatSize(i);
              i >= 0 && (void 0 !== t && void 0 !== n && (o = this._formatProgress(t, n)), this._templating.updateSize(e, o))
            },
            _formatProgress: function (e, t) {
              var n = this._options.text.formatProgress;

              function i(e, t) {
                n = n.replace(e, t)
              }
              return i("{percent}", Math.round(e / t * 100)), i("{total_size}", this._formatSize(t)), n
            },
            _controlFailureTextDisplay: function (e, t) {
              var n, i, o;
              n = this._options.failedUploadTextDisplay.mode, i = this._options.failedUploadTextDisplay.responseProperty, "custom" === n ? ((o = t[i]) || (o = this._options.text.failUpload), this._templating.setStatusText(e, o), this._options.failedUploadTextDisplay.enableTooltip && this._showTooltip(e, o)) : "default" === n ? this._templating.setStatusText(e, this._options.text.failUpload) : "none" !== n && this.log("failedUploadTextDisplay.mode value of '" + n + "' is not valid", "warn")
            },
            _showTooltip: function (e, t) {
              this._templating.getFileContainer(e).title = t
            },
            _showCancelLink: function (e) {
              this._options.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading || this._templating.showCancel(e)
            },
            _itemError: function (e, t, n) {
              var i = this._parent.prototype._itemError.apply(this, arguments);
              this._options.showMessage(i)
            },
            _batchError: function (e) {
              this._parent.prototype._batchError.apply(this, arguments), this._options.showMessage(e)
            },
            _setupPastePrompt: function () {
              var e = this;
              this._options.callbacks.onPasteReceived = function () {
                var t = e._options.paste.namePromptMessage,
                  n = e._options.paste.defaultName;
                return e._options.showPrompt(t, n)
              }
            },
            _fileOrBlobRejected: function (e, t) {
              this._totalFilesInBatch -= 1, this._parent.prototype._fileOrBlobRejected.apply(this, arguments)
            },
            _prepareItemsForUpload: function (e, t, n) {
              this._totalFilesInBatch = e.length, this._filesInBatchAddedToUi = 0, this._parent.prototype._prepareItemsForUpload.apply(this, arguments)
            },
            _maybeUpdateThumbnail: function (e) {
              var t = this._thumbnailUrls[e];
              this.getUploads({
                id: e
              }).status === qq.status.DELETED || !t && !this._options.thumbnails.placeholders.waitUntilResponse && qq.supportedFeatures.imagePreviews || this._templating.updateThumbnail(e, t, this._options.thumbnails.customResizer)
            },
            _addCannedFile: function (e) {
              var t = this._parent.prototype._addCannedFile.apply(this, arguments);
              return this._addToList(t, this.getName(t), !0), this._templating.hideSpinner(t), this._templating.hideCancel(t), this._markFileAsSuccessful(t), t
            },
            _setSize: function (e, t) {
              this._parent.prototype._setSize.apply(this, arguments), this._templating.updateSize(e, this._formatSize(t))
            },
            _sessionRequestComplete: function () {
              this._templating.addCacheToDom(), this._parent.prototype._sessionRequestComplete.apply(this, arguments)
            }
          }
        }(), qq.FineUploader = function (e, t) {
          "use strict";
          var n = this;
          this._parent = t ? qq[t].FineUploaderBasic : qq.FineUploaderBasic, this._parent.apply(this, arguments), qq.extend(this._options, {
            element: null,
            button: null,
            listElement: null,
            dragAndDrop: {
              extraDropzones: [],
              reportDirectoryPaths: !1
            },
            text: {
              formatProgress: "{percent}% of {total_size}",
              failUpload: "Upload failed",
              waitingForResponse: "Processing...",
              paused: "Paused"
            },
            template: "qq-template",
            classes: {
              retrying: "qq-upload-retrying",
              retryable: "qq-upload-retryable",
              success: "qq-upload-success",
              fail: "qq-upload-fail",
              editable: "qq-editable",
              hide: "qq-hide",
              dropActive: "qq-upload-drop-area-active"
            },
            failedUploadTextDisplay: {
              mode: "default",
              responseProperty: "error",
              enableTooltip: !0
            },
            messages: {
              tooManyFilesError: "You may only drop one file",
              unsupportedBrowser: "Unrecoverable error - this browser does not permit file uploading of any kind."
            },
            retry: {
              showAutoRetryNote: !0,
              autoRetryNote: "Retrying {retryNum}/{maxAuto}..."
            },
            deleteFile: {
              forceConfirm: !1,
              confirmMessage: "Are you sure you want to delete {filename}?",
              deletingStatusText: "Deleting...",
              deletingFailedText: "Delete failed"
            },
            display: {
              fileSizeOnSubmit: !1,
              prependFiles: !1
            },
            paste: {
              promptForName: !1,
              namePromptMessage: "Please name this image"
            },
            thumbnails: {
              customResizer: null,
              maxCount: 0,
              placeholders: {
                waitUntilResponse: !1,
                notAvailablePath: null,
                waitingPath: null
              },
              timeBetweenThumbs: 750
            },
            scaling: {
              hideScaled: !1
            },
            showMessage: function (e) {
              if (n._templating.hasDialog("alert")) return n._templating.showDialog("alert", e);
              setTimeout(function () {
                window.alert(e)
              }, 0)
            },
            showConfirm: function (e) {
              return n._templating.hasDialog("confirm") ? n._templating.showDialog("confirm", e) : window.confirm(e)
            },
            showPrompt: function (e, t) {
              return n._templating.hasDialog("prompt") ? n._templating.showDialog("prompt", e, t) : window.prompt(e, t)
            }
          }, !0), qq.extend(this._options, e, !0), this._templating = new qq.Templating({
            log: qq.bind(this.log, this),
            templateIdOrEl: this._options.template,
            containerEl: this._options.element,
            fileContainerEl: this._options.listElement,
            button: this._options.button,
            imageGenerator: this._imageGenerator,
            classes: {
              hide: this._options.classes.hide,
              editable: this._options.classes.editable
            },
            limits: {
              maxThumbs: this._options.thumbnails.maxCount,
              timeBetweenThumbs: this._options.thumbnails.timeBetweenThumbs
            },
            placeholders: {
              waitUntilUpdate: this._options.thumbnails.placeholders.waitUntilResponse,
              thumbnailNotAvailable: this._options.thumbnails.placeholders.notAvailablePath,
              waitingForThumbnail: this._options.thumbnails.placeholders.waitingPath
            },
            text: this._options.text
          }), this._options.workarounds.ios8SafariUploads && qq.ios800() && qq.iosSafari() ? this._templating.renderFailure(this._options.messages.unsupportedBrowserIos8Safari) : !qq.supportedFeatures.uploading || this._options.cors.expected && !qq.supportedFeatures.uploadCors ? this._templating.renderFailure(this._options.messages.unsupportedBrowser) : (this._wrapCallbacks(), this._templating.render(), this._classes = this._options.classes, !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({
            element: this._templating.getButton(),
            title: this._options.text.fileInputTitle
          }).getButtonId()), this._setupClickAndEditEventHandlers(), qq.DragAndDrop && qq.supportedFeatures.fileDrop && (this._dnd = this._setupDragAndDrop()), this._options.paste.targetElement && this._options.paste.promptForName && (qq.PasteSupport ? this._setupPastePrompt() : this.log("Paste support module not found.", "error")), this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0)
        }, qq.extend(qq.FineUploader.prototype, qq.basePublicApi), qq.extend(qq.FineUploader.prototype, qq.basePrivateApi), qq.extend(qq.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.FineUploader.prototype, qq.uiPrivateApi), qq.Templating = function (e) {
          "use strict";
          var t, n, i, o, r, a, s, l, u = {
              content: document.createDocumentFragment(),
              map: {}
            },
            c = !1,
            d = 0,
            p = !1,
            h = [],
            q = -1,
            f = {
              log: null,
              limits: {
                maxThumbs: 0,
                timeBetweenThumbs: 750
              },
              templateIdOrEl: "qq-template",
              containerEl: null,
              fileContainerEl: null,
              button: null,
              imageGenerator: null,
              classes: {
                hide: "qq-hide",
                editable: "qq-editable"
              },
              placeholders: {
                waitUntilUpdate: !1,
                thumbnailNotAvailable: null,
                waitingForThumbnail: null
              },
              text: {
                paused: "Paused"
              }
            },
            m = {
              button: "qq-upload-button-selector",
              alertDialog: "qq-alert-dialog-selector",
              dialogCancelButton: "qq-cancel-button-selector",
              confirmDialog: "qq-confirm-dialog-selector",
              dialogMessage: "qq-dialog-message-selector",
              dialogOkButton: "qq-ok-button-selector",
              promptDialog: "qq-prompt-dialog-selector",
              uploader: "qq-uploader-selector",
              drop: "qq-upload-drop-area-selector",
              list: "qq-upload-list-selector",
              progressBarContainer: "qq-progress-bar-container-selector",
              progressBar: "qq-progress-bar-selector",
              totalProgressBarContainer: "qq-total-progress-bar-container-selector",
              totalProgressBar: "qq-total-progress-bar-selector",
              file: "qq-upload-file-selector",
              spinner: "qq-upload-spinner-selector",
              size: "qq-upload-size-selector",
              cancel: "qq-upload-cancel-selector",
              pause: "qq-upload-pause-selector",
              continueButton: "qq-upload-continue-selector",
              deleteButton: "qq-upload-delete-selector",
              retry: "qq-upload-retry-selector",
              statusText: "qq-upload-status-text-selector",
              editFilenameInput: "qq-edit-filename-selector",
              editNameIcon: "qq-edit-filename-icon-selector",
              dropText: "qq-upload-drop-area-text-selector",
              dropProcessing: "qq-drop-processing-selector",
              dropProcessingSpinner: "qq-drop-processing-spinner-selector",
              thumbnail: "qq-thumbnail-selector"
            },
            g = {},
            _ = new qq.Promise,
            v = new qq.Promise,
            b = function (e) {
              var t = new qq.Promise;
              return v.then(function (n) {
                O(n, e), e.src ? t.success() : (e.src = n.src, e.onload = function () {
                  e.onload = null, j(e), t.success()
                })
              }, function () {
                N(e), t.success()
              }), t
            },
            y = function () {
              if (h.length) {
                p = !0;
                var e = h.shift();
                e.update ? H(e) : z(e)
              } else p = !1
            },
            S = function (e) {
              return A(I(e), m.cancel)
            },
            w = function (e) {
              return A(I(e), m.continueButton)
            },
            F = function (e) {
              return A(r, m[e + "Dialog"])
            },
            x = function (e) {
              return A(I(e), m.deleteButton)
            },
            C = function () {
              return A(r, m.dropProcessing)
            },
            E = function (e) {
              return A(I(e), m.editNameIcon)
            },
            I = function (e) {
              return u.map[e] || qq(a).getFirstByClass("qq-file-id-" + e)
            },
            D = function (e) {
              return A(I(e), m.file)
            },
            P = function (e) {
              return A(I(e), m.pause)
            },
            U = function (e) {
              return null == e ? A(r, m.totalProgressBarContainer) || A(r, m.totalProgressBar) : A(I(e), m.progressBarContainer) || A(I(e), m.progressBar)
            },
            T = function (e) {
              return A(I(e), m.retry)
            },
            R = function (e) {
              return A(I(e), m.size)
            },
            k = function (e) {
              return A(I(e), m.spinner)
            },
            A = function (e, t) {
              return e && qq(e).getFirstByClass(t)
            },
            B = function (e) {
              return s && A(I(e), m.thumbnail)
            },
            N = function (e) {
              e && qq(e).addClass(f.classes.hide)
            },
            O = function (e, t) {
              var n = e.style.maxWidth,
                i = e.style.maxHeight;
              i && n && !t.style.maxWidth && !t.style.maxHeight && qq(t).css({
                maxWidth: n,
                maxHeight: i
              })
            },
            L = function (e, t) {
              var n = g[e] || (new qq.Promise).failure(),
                i = new qq.Promise;
              return _.then(function (e) {
                n.then(function () {
                  i.success()
                }, function () {
                  O(e, t), t.onload = function () {
                    t.onload = null, i.success()
                  }, t.src = e.src, j(t)
                })
              }), i
            },
            z = function (e) {
              var n = e.id,
                i = e.optFileOrBlob,
                o = i && i.qqThumbnailId,
                r = B(n),
                a = {
                  customResizeFunction: e.customResizeFunction,
                  maxSize: q,
                  orient: !0,
                  scale: !0
                };
              qq.supportedFeatures.imagePreviews ? r ? f.limits.maxThumbs && f.limits.maxThumbs <= d ? (L(n, r), y()) : b(r).done(function () {
                g[n] = new qq.Promise, g[n].done(function () {
                  setTimeout(y, f.limits.timeBetweenThumbs)
                }), null != o ? G(n, o) : function (e, n, i) {
                  var o = B(e);
                  t("Generating new thumbnail for " + e), n.qqThumbnailId = e, f.imageGenerator.generate(n, o, i).then(function () {
                    d++, j(o), g[e].success()
                  }, function () {
                    g[e].failure(), f.placeholders.waitUntilUpdate || L(e, o)
                  })
                }(n, i, a)
              }) : y() : r && (b(r), y())
            },
            H = function (e) {
              var t = e.id,
                n = e.thumbnailUrl,
                i = e.showWaitingImg,
                o = B(t),
                r = {
                  customResizeFunction: e.customResizeFunction,
                  scale: l,
                  maxSize: q
                };
              if (o)
                if (n) {
                  if (!(f.limits.maxThumbs && f.limits.maxThumbs <= d)) return i && b(o), f.imageGenerator.generate(n, o, r).then(function () {
                    j(o), d++, setTimeout(y, f.limits.timeBetweenThumbs)
                  }, function () {
                    L(t, o), setTimeout(y, f.limits.timeBetweenThumbs)
                  });
                  L(t, o), y()
                } else L(t, o), y()
            },
            M = function (e, t) {
              var n = U(e),
                i = null == e ? m.totalProgressBar : m.progressBar;
              n && !qq(n).hasClass(i) && (n = qq(n).getFirstByClass(i)), n && (qq(n).css({
                width: t + "%"
              }), n.setAttribute("aria-valuenow", t))
            },
            j = function (e) {
              e && qq(e).removeClass(f.classes.hide)
            },
            G = function (e, n) {
              var i = B(e),
                o = B(n);
              t(qq.format("ID {} is the same file as ID {}.  Will use generated thumbnail from ID {} instead.", e, n, n)), g[n].then(function () {
                d++, g[e].success(), t(qq.format("Now using previously generated thumbnail created for ID {} on ID {}.", n, e)), i.src = o.src, j(i)
              }, function () {
                g[e].failure(), f.placeholders.waitUntilUpdate || L(e, i)
              })
            };
          qq.extend(f, e), t = f.log, qq.supportedFeatures.imagePreviews || (f.limits.timeBetweenThumbs = 0, f.limits.maxThumbs = 0), r = f.containerEl, s = void 0 !== f.imageGenerator, o = function () {
              var e, o, r, a, u, c, d, p, h, g, _;
              if (t("Parsing template"), null == f.templateIdOrEl) throw new Error("You MUST specify either a template element or ID!");
              if (qq.isString(f.templateIdOrEl)) {
                if (null === (e = document.getElementById(f.templateIdOrEl))) throw new Error(qq.format("Cannot find template script at ID '{}'!", f.templateIdOrEl));
                o = e.innerHTML
              } else {
                if (void 0 === f.templateIdOrEl.innerHTML) throw new Error("You have specified an invalid value for the template option!  It must be an ID or an Element.");
                o = f.templateIdOrEl.innerHTML
              }
              if (o = qq.trimStr(o), (a = document.createElement("div")).appendChild(qq.toElement(o)), _ = qq(a).getFirstByClass(m.uploader), f.button && (c = qq(a).getFirstByClass(m.button)) && qq(c).remove(), qq.DragAndDrop && qq.supportedFeatures.fileDrop || (h = qq(a).getFirstByClass(m.dropProcessing)) && qq(h).remove(), (d = qq(a).getFirstByClass(m.drop)) && !qq.DragAndDrop && (t("DnD module unavailable.", "info"), qq(d).remove()), qq.supportedFeatures.fileDrop ? qq(_).hasAttribute("qq-drop-area-text") && d && (g = qq(d).getFirstByClass(m.dropText)) && qq(g).remove() : (_.removeAttribute("qq-drop-area-text"), d && qq(d).hasAttribute("qq-hide-dropzone") && qq(d).css({
                  display: "none"
                })), p = qq(a).getFirstByClass(m.thumbnail), s ? p && (q = (q = parseInt(p.getAttribute("qq-max-size"))) > 0 ? q : null, l = qq(p).hasAttribute("qq-server-scale")) : p && qq(p).remove(), s = s && p, n = qq(a).getByClass(m.editFilenameInput).length > 0, i = qq(a).getByClass(m.retry).length > 0, null == (r = qq(a).getFirstByClass(m.list))) throw new Error("Could not find the file list container in the template!");
              return u = r.children[0].cloneNode(!0), r.innerHTML = "", a.getElementsByTagName("DIALOG").length && document.createElement("dialog"), t("Template parsing complete"), {
                template: a,
                fileTemplate: u
              }
            }(),
            function () {
              var e = f.placeholders.thumbnailNotAvailable,
                n = f.placeholders.waitingForThumbnail,
                i = {
                  maxSize: q,
                  scale: l
                };
              s && (e ? f.imageGenerator.generate(e, new Image, i).then(function (e) {
                _.success(e)
              }, function () {
                _.failure(), t("Problem loading 'not available' placeholder image at " + e, "error")
              }) : _.failure(), n ? f.imageGenerator.generate(n, new Image, i).then(function (e) {
                v.success(e)
              }, function () {
                v.failure(), t("Problem loading 'waiting for thumbnail' placeholder image at " + n, "error")
              }) : v.failure())
            }(), qq.extend(this, {
              render: function () {
                t("Rendering template in DOM."), d = 0, r.appendChild(o.template.cloneNode(!0)), N(C()), this.hideTotalProgress(), a = f.fileContainerEl || A(r, m.list), t("Template rendering complete")
              },
              renderFailure: function (e) {
                var t = qq.toElement(e);
                r.innerHTML = "", r.appendChild(t)
              },
              reset: function () {
                r.innerHTML = "", this.render()
              },
              clearFiles: function () {
                a.innerHTML = ""
              },
              disableCancel: function () {
                c = !0
              },
              addFile: function (e, t, n, i, s) {
                var l, d = o.fileTemplate.cloneNode(!0),
                  p = A(d, m.file),
                  h = A(r, m.uploader),
                  q = s ? u.content : a;
                s && (u.map[e] = d), qq(d).addClass("qq-file-id-" + e), h.removeAttribute("qq-drop-area-text"), p && (qq(p).setText(t), p.setAttribute("title", t)), d.setAttribute("qq-file-id", e), n ? function (e, t, n) {
                  var i = n,
                    o = i.firstChild;
                  t > 0 && (o = qq(i).children()[t].nextSibling), i.insertBefore(e, o)
                }(d, n.index, q) : q.appendChild(d), i ? (d.style.display = "none", qq(d).addClass("qq-hidden-forever")) : (N(U(e)), N(R(e)), N(x(e)), N(T(e)), N(P(e)), N(w(e)), c && this.hideCancel(e), (l = B(e)) && !l.src && v.then(function (e) {
                  l.src = e.src, e.style.maxHeight && e.style.maxWidth && qq(l).css({
                    maxHeight: e.style.maxHeight,
                    maxWidth: e.style.maxWidth
                  }), j(l)
                }))
              },
              addFileToCache: function (e, t, n, i) {
                this.addFile(e, t, n, i, !0)
              },
              addCacheToDom: function () {
                a.appendChild(u.content), u.content = document.createDocumentFragment(), u.map = {}
              },
              removeFile: function (e) {
                qq(I(e)).remove()
              },
              getFileId: function (e) {
                var t = e;
                if (t) {
                  for (; null == t.getAttribute("qq-file-id");) t = t.parentNode;
                  return parseInt(t.getAttribute("qq-file-id"))
                }
              },
              getFileList: function () {
                return a
              },
              markFilenameEditable: function (e) {
                var t = D(e);
                t && qq(t).addClass(f.classes.editable)
              },
              updateFilename: function (e, t) {
                var n = D(e);
                n && (qq(n).setText(t), n.setAttribute("title", t))
              },
              hideFilename: function (e) {
                N(D(e))
              },
              showFilename: function (e) {
                j(D(e))
              },
              isFileName: function (e) {
                return qq(e).hasClass(m.file)
              },
              getButton: function () {
                return f.button || A(r, m.button)
              },
              hideDropProcessing: function () {
                N(C())
              },
              showDropProcessing: function () {
                j(C())
              },
              getDropZone: function () {
                return A(r, m.drop)
              },
              isEditFilenamePossible: function () {
                return n
              },
              hideRetry: function (e) {
                N(T(e))
              },
              isRetryPossible: function () {
                return i
              },
              showRetry: function (e) {
                j(T(e))
              },
              getFileContainer: function (e) {
                return I(e)
              },
              showEditIcon: function (e) {
                var t = E(e);
                t && qq(t).addClass(f.classes.editable)
              },
              isHiddenForever: function (e) {
                return qq(I(e)).hasClass("qq-hidden-forever")
              },
              hideEditIcon: function (e) {
                var t = E(e);
                t && qq(t).removeClass(f.classes.editable)
              },
              isEditIcon: function (e) {
                return qq(e).hasClass(m.editNameIcon, !0)
              },
              getEditInput: function (e) {
                return A(I(e), m.editFilenameInput)
              },
              isEditInput: function (e) {
                return qq(e).hasClass(m.editFilenameInput, !0)
              },
              updateProgress: function (e, t, n) {
                var i, o = U(e);
                o && n > 0 && (100 === (i = Math.round(t / n * 100)) ? N(o) : j(o), M(e, i))
              },
              updateTotalProgress: function (e, t) {
                this.updateProgress(null, e, t)
              },
              hideProgress: function (e) {
                var t = U(e);
                t && N(t)
              },
              hideTotalProgress: function () {
                this.hideProgress()
              },
              resetProgress: function (e) {
                M(e, 0), this.hideTotalProgress(e)
              },
              resetTotalProgress: function () {
                this.resetProgress()
              },
              showCancel: function (e) {
                if (!c) {
                  var t = S(e);
                  t && qq(t).removeClass(f.classes.hide)
                }
              },
              hideCancel: function (e) {
                N(S(e))
              },
              isCancel: function (e) {
                return qq(e).hasClass(m.cancel, !0)
              },
              allowPause: function (e) {
                j(P(e)), N(w(e))
              },
              uploadPaused: function (e) {
                this.setStatusText(e, f.text.paused), this.allowContinueButton(e), N(k(e))
              },
              hidePause: function (e) {
                N(P(e))
              },
              isPause: function (e) {
                return qq(e).hasClass(m.pause, !0)
              },
              isContinueButton: function (e) {
                return qq(e).hasClass(m.continueButton, !0)
              },
              allowContinueButton: function (e) {
                j(w(e)), N(P(e))
              },
              uploadContinued: function (e) {
                this.setStatusText(e, ""), this.allowPause(e), j(k(e))
              },
              showDeleteButton: function (e) {
                j(x(e))
              },
              hideDeleteButton: function (e) {
                N(x(e))
              },
              isDeleteButton: function (e) {
                return qq(e).hasClass(m.deleteButton, !0)
              },
              isRetry: function (e) {
                return qq(e).hasClass(m.retry, !0)
              },
              updateSize: function (e, t) {
                var n = R(e);
                n && (j(n), qq(n).setText(t))
              },
              setStatusText: function (e, t) {
                var n = A(I(e), m.statusText);
                n && (null == t ? qq(n).clearText() : qq(n).setText(t))
              },
              hideSpinner: function (e) {
                qq(I(e)).removeClass("qq-in-progress"), N(k(e))
              },
              showSpinner: function (e) {
                qq(I(e)).addClass("qq-in-progress"), j(k(e))
              },
              generatePreview: function (e, t, n) {
                this.isHiddenForever(e) || (h.push({
                  id: e,
                  customResizeFunction: n,
                  optFileOrBlob: t
                }), !p && y())
              },
              updateThumbnail: function (e, t, n, i) {
                this.isHiddenForever(e) || (h.push({
                  customResizeFunction: i,
                  update: !0,
                  id: e,
                  thumbnailUrl: t,
                  showWaitingImg: n
                }), !p && y())
              },
              hasDialog: function (e) {
                return qq.supportedFeatures.dialogElement && !!F(e)
              },
              showDialog: function (e, t, n) {
                var i = F(e),
                  o = A(i, m.dialogMessage),
                  r = i.getElementsByTagName("INPUT")[0],
                  a = A(i, m.dialogCancelButton),
                  s = A(i, m.dialogOkButton),
                  l = new qq.Promise,
                  u = function () {
                    a.removeEventListener("click", c), s && s.removeEventListener("click", d), l.failure()
                  },
                  c = function () {
                    a.removeEventListener("click", c), i.close()
                  },
                  d = function () {
                    i.removeEventListener("close", u), s.removeEventListener("click", d), i.close(), l.success(r && r.value)
                  };
                return i.addEventListener("close", u), a.addEventListener("click", c), s && s.addEventListener("click", d), r && (r.value = n), o.textContent = t, i.showModal(), l
              }
            })
        }, qq.UiEventHandler = function (e, t) {
          "use strict";
          var n = new qq.DisposeSupport,
            i = {
              eventType: "click",
              attachTo: null,
              onHandled: function (e, t) {}
            };

          function o(e) {
            n.attach(e, i.eventType, function (e) {
              var t = (e = e || window.event).target || e.srcElement;
              i.onHandled(t, e)
            })
          }
          qq.extend(this, {
            addHandler: function (e) {
              o(e)
            },
            dispose: function () {
              n.dispose()
            }
          }), qq.extend(t, {
            getFileIdFromItem: function (e) {
              return e.qqFileId
            },
            getDisposeSupport: function () {
              return n
            }
          }), qq.extend(i, e), i.attachTo && o(i.attachTo)
        }, qq.FileButtonsClickHandler = function (e) {
          "use strict";
          var t = {
              templating: null,
              log: function (e, t) {},
              onDeleteFile: function (e) {},
              onCancel: function (e) {},
              onRetry: function (e) {},
              onPause: function (e) {},
              onContinue: function (e) {},
              onGetName: function (e) {}
            },
            n = {
              cancel: function (e) {
                t.onCancel(e)
              },
              retry: function (e) {
                t.onRetry(e)
              },
              deleteButton: function (e) {
                t.onDeleteFile(e)
              },
              pause: function (e) {
                t.onPause(e)
              },
              continueButton: function (e) {
                t.onContinue(e)
              }
            };
          qq.extend(t, e), t.eventType = "click", t.onHandled = function (e, i) {
            qq.each(n, function (n, o) {
              var r, a = n.charAt(0).toUpperCase() + n.slice(1);
              if (t.templating["is" + a](e)) return r = t.templating.getFileId(e), qq.preventDefault(i), t.log(qq.format("Detected valid file button click event on file '{}', ID: {}.", t.onGetName(r), r)), o(r), !1
            })
          }, t.attachTo = t.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(t, {}))
        }, qq.FilenameClickHandler = function (e) {
          "use strict";
          var t = {},
            n = {
              templating: null,
              log: function (e, t) {},
              classes: {
                file: "qq-upload-file",
                editNameIcon: "qq-edit-filename-icon"
              },
              onGetUploadStatus: function (e) {},
              onGetName: function (e) {}
            };
          qq.extend(n, e), n.eventType = "click", n.onHandled = function (e, i) {
            if (n.templating.isFileName(e) || n.templating.isEditIcon(e)) {
              var o = n.templating.getFileId(e);
              n.onGetUploadStatus(o) === qq.status.SUBMITTED && (n.log(qq.format("Detected valid filename click event on file '{}', ID: {}.", n.onGetName(o), o)), qq.preventDefault(i), t.handleFilenameEdit(o, e, !0))
            }
          }, qq.extend(this, new qq.FilenameEditHandler(n, t))
        }, qq.FilenameInputFocusInHandler = function (e, t) {
          "use strict";
          var n = {
            templating: null,
            onGetUploadStatus: function (e) {},
            log: function (e, t) {}
          };
          t || (t = {}), n.eventType = "focusin", n.onHandled = function (e, i) {
            if (n.templating.isEditInput(e)) {
              var o = n.templating.getFileId(e);
              n.onGetUploadStatus(o) === qq.status.SUBMITTED && (n.log(qq.format("Detected valid filename input focus event on file '{}', ID: {}.", n.onGetName(o), o)), t.handleFilenameEdit(o, e))
            }
          }, qq.extend(n, e), qq.extend(this, new qq.FilenameEditHandler(n, t))
        }, qq.FilenameInputFocusHandler = function (e) {
          "use strict";
          e.eventType = "focus", e.attachTo = null, qq.extend(this, new qq.FilenameInputFocusInHandler(e, {}))
        }, qq.FilenameEditHandler = function (e, t) {
          "use strict";
          var n = {
            templating: null,
            log: function (e, t) {},
            onGetUploadStatus: function (e) {},
            onGetName: function (e) {},
            onSetName: function (e, t) {},
            onEditingStatusChange: function (e, t) {}
          };

          function i(e, t) {
            var i, o = e.value;
            void 0 !== o && qq.trimStr(o).length > 0 && (void 0 !== (i = function (e) {
              var t = n.onGetName(e);
              return qq.getExtension(t)
            }(t)) && (o = o + "." + i), n.onSetName(t, o)), n.onEditingStatusChange(t, !1)
          }
          qq.extend(n, e), n.attachTo = n.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(n, t)), qq.extend(t, {
            handleFilenameEdit: function (e, o, r) {
              var a, s, l, u = n.templating.getEditInput(e);
              n.onEditingStatusChange(e, !0), u.value = (a = e, s = n.onGetName(a), (l = s.lastIndexOf(".")) > 0 && (s = s.substr(0, l)), s), r && u.focus(),
                function (e, n) {
                  t.getDisposeSupport().attach(e, "blur", function () {
                    i(e, n)
                  })
                }(u, e),
                function (e, n) {
                  t.getDisposeSupport().attach(e, "keyup", function (t) {
                    13 === (t.keyCode || t.which) && i(e, n)
                  })
                }(u, e)
            }
          })
        }
    }(window)
  },
  uE3l: function (e, t, n) {
    n("AaJZ")
  }
});
