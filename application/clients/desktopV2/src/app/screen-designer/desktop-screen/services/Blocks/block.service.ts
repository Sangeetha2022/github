import { Injectable } from '@angular/core';
import { TraitsService } from '../Traits/traits.service';

@Injectable
({
  providedIn: 'root'
})
export class BlockService 
{
  constructor(private traitService:TraitsService) { }

  addHeadingTag(editor:any) 
  {
    editor.BlockManager.add('heading', 
    {
      id:'Heading',
      label:'Heading',
      category: 'Basic',
      content: `<div>
                  <h1>Heading Tag</h1>
                </div>`,
      draggable: true,
      removable: true,
      attributes: 
      {
        class:'fa fa-header'
      }
    });
  }

  addCKeditor5(editor:any) 
  {
    // working fine
    editor.BlockManager.add('ckeditor', 
    {
      id: 'ckeditor',
      label: `<div>
                <img src="./assets/images/ckeditor.svg"/>
                   <div class="my-label-block mt-1">CkEditor</div>
              </div>`,
      category: 'Basic',
      content: `<div style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                  <span id="ckeditorspan" style="display: unset;" data-gjs-type="ckeditor5">
                     <textarea name="content" id="ckeditortextarea">This is some sample content.</textarea>
                  </span>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addCKEditorTraits(editor, 'ckeditor5');
  }

  addDynamicDropdown(editor:any) 
  {
    editor.BlockManager.add('dynamicDropdown', 
    {
      id: 'dynamicDropdown',
      label: `\n  <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n
             <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,
              16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero">
             </path> \n
             <polygon class="gjs-block-svg-path" transform="translate(18.500000,12.000000) scale(1, -1) translate(-18.500000, -12.000000)"
              points = "18.5 11 20 13 17 13"> </polygon>\n
             </svg>\n  <div class="gjs-block-label"> Dynamic Dropdown </div>`,
      category: 'Special',
      content: `<div  style="padding-top:0px; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
                   <select data-gjs-type="dynamicdropdown-type">
                     <option value="1">1</option>
                   </select>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.dynamicDropdownTraits(editor, 'dynamicdropdown-type');
  }

  addTagManager(editor:any) 
  {
    editor.BlockManager.add('tagmanager', 
    {
      id: 'tagmanager',
      label: `\n  <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n
              <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,
               16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero">
              </path> \n
              <polygon class="gjs-block-svg-path" transform="translate(18.500000,12.000000) scale(1, -1) translate(-18.500000, -12.000000)"
               points = "18.5 11 20 13 17 13"> </polygon>\n
              <rect class="gjs-block-svg-path" x="4" y="11.5" width ="11" height="1"></rect>\n
              </svg>\n  
              <div class="gjs-block-label"> Tag Manager </div>`,
      category: 'Special',
      content: `<div  style="padding-top:0px; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
                  <select data-gjs-type="tagmanager-type">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                  </select>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.tagManagerTraits(editor, 'tagmanager-type');
  }

  addMultiSelectDropdown(editor:any) 
  {
    editor.BlockManager.add('multiselect', 
    {
      id: 'multiselect',
      label:'Multi-select Dropdown',
      category: 'Special',
      content: `<div style="padding-top:0px; padding-right: 0px; padding-left: 0px; padding-bottom: 0px">
                   <select data-gjs-type="multiselect-type">
                      <option value="1">Chennai</option>
                      <option value="2">Bengaluru</option>
                      <option value="3">Trivandrum</option>
                   </select>
                </div>`,
      draggable: true,
      removable: true,
      attributes:{class:'fa fa-tasks'}
    });
  }

  addSpecialCharts(editor:any) 
  {
    editor.BlockManager.add('highcharts', 
    {
      id: 'highcharts',
      label: ` <div class="gjs-block-label"> High charts </div>`,
      category: 'Extra',
      content: `<div style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                  <div id="highchart4" data-gjs-type="highcharts-type" style="width:100%; height:400px;"></div>
                </div>`,
      attributes:
      {
        class:'fa fa-bar-chart'
      }
    });
    this.traitService.addHighChartTraits(editor, 'highcharts-type');
  }

  addSectionTag(editor:any) 
  {
    editor.BlockManager.add('section', 
    {
      id: 'section',
      category: 'Extra',
      attributes:
      {
        class:'fa fa-hand-lizard-o'
      },
      label: `<div class="gjs-block-label"> Section Block </div>`,
      content: `
            <section class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
              <div class="row-cell" data-gjs-draggable=".row"></div>
            </section>
            <style>
              .row {
                display: flex;
                justify-content: flex-start;
                align-items: stretch;
                flex-wrap: nowrap;
                padding: 50px;
                min-height: 75px;
              }
              .row-cell {
                flex-grow: 1;
                flex-basis: 100%;
                padding: 50px;
              }
            </style>
          `,
          draggable: true,
          removable: true,
    });
    // this.traitService.addHighChartTraits(editor, 'highcharts-type');
  }

  addFooterTag(editor:any) 
  {
    editor.BlockManager.add('footer', 
    {
      id: 'footer',
      category: 'Extra',
      attributes:
      {
        class:'fa fa-hand-lizard-o'
      },
      label: `<div class="gjs-block-label"> Footer Block </div>`,
      content: `
            <footer class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
              <div class="row-cell" data-gjs-draggable=".row"></div>
            </footer>
            <style>
              .row {
                display: flex;
                justify-content: flex-start;
                align-items: stretch;
                flex-wrap: nowrap;
                padding: 0px;
                min-height: 0px;
              }
              .row-cell {
                flex-grow: 1;
                flex-basis: 100%;
                padding: 0px;
              }
            </style>
          `,
          draggable: true,
          removable: true,
    });
    // this.traitService.addHighChartTraits(editor, 'highcharts-type');
  }

  addNavTag(editor:any) 
  {
    editor.BlockManager.add('sidenav', 
    {
      id: 'sidenav',
      category: 'Extra',
      attributes:
      {
        class:'fa fa-hand-lizard-o'
      },
      label: `<div class="gjs-block-label"> SideNav Block </div>`,
      content: `
      <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  
  
      <meta name="description" content="">
      <meta name="generator" content="Grapedrop">
  
      <!-- Apple Stuff -->
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
  
      <!-- Google / Search Engine Tags -->
      <meta itemprop="description" content="">
      <meta itemprop="image" content="">
  
      <!-- MS Tile - for Microsoft apps-->
      <meta name="msapplication-TileImage" content="">
  
      <!-- Facebook Meta Tags -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="">
      <meta property="og:description" content="">
      <meta property="og:image" content="">
      <meta property="og:url" content="http://c272303.grapedrop.net">
  
      <!-- Twitter Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="">
      <meta name="twitter:description" content="">
      <meta name="twitter:image" content="">
  
      <link rel="preconnect" href="https://fonts.gstatic.com">
  
      <link rel="icon" type="image/png" href="images/favicon.png">
  
      <script type="application/ld+json">
          {
              "@context": "http://schema.org",
              "@type": "WebPage",
              "url": "http://c272303.grapedrop.net",
              "description": "",
              "name": "",
              "image": ""
          }
      </script>
  
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:regular,100,100italic,200,200italic,300,300italic,italic,500,500italic,600,600italic,900italic,900,800italic,800,700italic,700&amp;subset=latin,cyrillic,cyrillic-ext,latin-ext,vietnamese&amp;display=swap"
      />
  
      <script>
          window._formUrl = "";
          window.__gRecapKey = "";
          window.postJQCnt = [];
          window.postJQ = function() {
              window._jqloaded = 1;
              postJQCnt.forEach(function(fn) {
                  fn && fn()
              })
          }
      </script>
  
      <style>
          body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
          }
      </style>
      <style data-css-anim>
          [data-anim-type]:not([data-anim-done]) {
              opacity: 0;
          }
      </style>
  
  
      <link rel="stylesheet" href="styles/base.css">
      <link rel="stylesheet" href="styles/index-style.css">
  </head>
  <nav id="template-i090p" class="">
      <div id="i8k8l" class="container"></div>
      <div id="ighf" class="gdp-row gpd-grid sticky">
          <div id="ik48" class="cell gpd-clm">
              <div id="ij0o8m" class="gdp-row gpd-grid">
                  <span onclick="openNav()" id="template-i2uji" class="">
                      <div id="i8h3sg" class="cell gpd-clm">
                          <img id="igjp1x" src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/8762113d99a84fa5baf2345306d4f0c3_hamburger3.png" />
                      </div>
                      </span>
                  <div id="ip9j7w" class="cell gpd-clm"><img id="i4dr2" src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/dad97ef59d704ea0b66e4e5416c67f0a_new_logo_gep.png" /></div>
              </div>
          </div>
          <div id="mySidenav" class="sidenav">
              <a [routerLink]="['javascript:void(0)']" onclick="closeNav()" id="template-if7ki" class="closebtn">
                  <div id="ibuiwl" class="cell gpd-clm">
                      <img id="imvflv" src="https://cdn.grapedrop.com/uf9ef8595751c4d1f87c91168f5d51a8c/cdca723990474ba9ba33337d35ef399d_close.png" class="" />
                  </div>
              </a>
  
              <div id="MainMenu" class="">
  
              </div>
          </div>
      </div>
  </nav>
  <script id='template-i29cx'>
      function openNav() {
          document.getElementById("mySidenav").style.width = "250px";
          document.getElementById("main").style.marginLeft = "250px";
          document.getElementById("foot").style.marginLeft = "250px";
          document.getElementById("mySidenav").style.backgroundColor = "#1E1E1E";
      }
  
      function closeNav() {
          document.getElementById("mySidenav").style.width = "0";
          document.getElementById("main").style.marginLeft = "0%";
          document.getElementById("foot").style.marginLeft = "0%";
      }
  </script>
  <script>
      var items = document.querySelectorAll('#i5hbo');
      for (var i = 0, len = items.length; i < len; i++) {
          (function() {
              var t, e = 0,
                  n = 'gjs-collapse',
                  r = 'max-height',
                  o = 'ease-in-out',
                  i = .25,
                  a = function() {
                      var t, e = document.createElement('void'),
                          n = {
                              transition: 'transitionend',
                              OTransition: 'oTransitionEnd',
                              MozTransition: 'transitionend',
                              WebkitTransition: 'webkitTransitionEnd'
                          };
                      for (t in n)
                          if (void 0 !== e.style[t]) return n[t]
                  }(),
                  s = function(t) {
                      e = 1;
                      var n = function(t) {
                              var e = window.getComputedStyle(t),
                                  n = e.display,
                                  o = parseInt(e[r]);
                              if ('none' !== n && '0' !== o) return t.offsetHeight;
                              t.style.height = 'auto', t.style.display = 'block', t.style.position = 'absolute', t.style.visibility = 'hidden';
                              var i = t.offsetHeight;
                              return t.style.height = '', t.style.display = '', t.style.position = '', t.style.visibility = '', i
                          }(t),
                          a = t.style;
                      a.display = 'block', a.transition = r + ' ' + i + 's ' + o, a.overflowY = 'hidden', '' == a[r] && (a[r] = 0), 0 == parseInt(a[r]) ? (a[r] = '0', setTimeout(function() {
                          a[r] = n + 'px'
                      }, 10)) : a[r] = '0'
                  };
              n in this || this.addEventListener('click', function(n) {
                  if (n.preventDefault(), !e) {
                      var o = this.closest('.gpd-navbar').querySelector(".gpd-navbar__items");
                      s(o), t || (o.addEventListener(a, function() {
                          e = 0;
                          var t = o.style;
                          0 == parseInt(t[r]) && (t.display = '', t[r] = '')
                      }), t = 1)
                  }
              }), this[n] = 1
          }.bind(items[i]))();
      }
  </script>
  
  <script>
      ! function(t) {
          var e = {};
  
          function n(r) {
              if (e[r]) return e[r].exports;
              var o = e[r] = {
                  i: r,
                  l: !1,
                  exports: {}
              };
              return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
          }
          return n.m = t, n.c = e, n.d = function(t, e, r) {
              n.o(t, e) || Object.defineProperty(t, e, {
                  enumerable: !0,
                  get: r
              })
          }, n.r = function(t) {
              'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                  value: 'Module'
              }), Object.defineProperty(t, '__esModule', {
                  value: !0
              })
          }, n.t = function(t, e) {
              if (1 & e && (t = n(t)), 8 & e) return t;
              if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
              var r = Object.create(null);
              if (n.r(r), Object.defineProperty(r, 'default', {
                      enumerable: !0,
                      value: t
                  }), 2 & e && 'string' != typeof t)
                  for (var o in t) n.d(r, o, function(e) {
                      return t[e]
                  }.bind(null, o));
              return r
          }, n.n = function(t) {
              var e = t && t.__esModule ? function() {
                  return t['default']
              } : function() {
                  return t
              };
              return n.d(e, 'a', e), e
          }, n.o = function(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e)
          }, n.p = "/", n(n.s = 8)
      }({
          8: function(t, e, n) {
              t.exports = n("85F9")
          },
          "85F9": function(t, e) {
              var n = window,
                  r = void 0 !== document.body.style.animationName,
                  o = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
                  i = function(t, e, n, r) {
                      return t.addEventListener(e, n, r)
                  },
                  a = function(t, e) {
                      for (var n = 0, r = (t || []).length; n < r; n++) e(t[n])
                  },
                  u = !1;
              try {
                  i(n, 'e', null, {get passive() {
                          u = !0
                      }
                  })
              } catch (t) {}
              setTimeout(function() {
                  var t = 'data-anim-type',
                      e = 'data-anim-br',
                      n = 'data-anim-done',
                      a = 'animationstart',
                      d = 100,
                      c = window.requestAnimationFrame || function(t) {
                          return window.setTimeout(t, 16.66)
                      },
                      f = document.querySelectorAll("[".concat(t, "]")),
                      l = function(t) {
                          var e = t.getBoundingClientRect(),
                              n = e.top,
                              r = e.bottom,
                              o = window.innerHeight,
                              i = document.documentElement.clientHeight,
                              a = o || i;
                          return n <= 0 && r >= d || r >= a && n <= a - d || n >= 0 && r <= a
                      },
                      m = function t(e) {
                          var r = e.target;
                          r.setAttribute(n, 1),
                              function(t, e, n, r) {
                                  t.removeEventListener(e, n, r)
                              }(r, a, t)
                      };
  
                  function s() {
                      for (var r = 0, u = f.length; r < u; r++) {
                          var d = f[r],
                              c = d.getAttribute(n);
                          if (!c) {
                              var s = d.getAttribute(e),
                                  p = s && o <= parseFloat(s);
                              c || p || !l(d) ? !c && p && d.setAttribute(n, 1) : (d.style.animationName = d.getAttribute(t), i(d, a, m))
                          }
                      }
                  }
                  if (r) window.addEventListener('scroll', function() {
                      return c(s)
                  }, !!u && {
                      passive: !0
                  }), s();
                  else {
                      var p = document.querySelector('style[data-css-anim]');
                      p && (p.innerHTML = '')
                  }
              });
              var d;
              d = function() {
                  var t = 'data-form-state',
                      e = $("[".concat(t, "]"));
                  e.hide();
                  var n = function(n, r) {
                      n && n.preventDefault();
                      var o = $(r),
                          i = (r.getAttribute('action') || window._formUrl || '').trim(),
                          a = new FormData(r),
                          u = {},
                          d = r.getAttribute('name'),
                          c = r.getAttribute('data-redirect');
                      for (var f in d && a.append('__name', d), a.append('__meta', JSON.stringify(r.__meta || {})), a.append('__ua', navigator.userAgent), a.append('__lang', navigator.language || navigator.userLanguage), a.append('__tz', Intl && Intl.DateTimeFormat().resolvedOptions().timeZone), o.find('[type=radio], [type=checkbox]').each(function() {
                              var t = this.name;
                              if (this.checked || u[t]) return u[t] = 1, void 0;
                              u[t] = 0
                          }), u) u[f] || a.append(f, '');
                      $.ajax({
                          url: i,
                          method: 'POST',
                          processData: !1,
                          contentType: !1,
                          data: a
                      }).done(function() {
                          e.hide(), o.find('> *').fadeOut(), o.find("[".concat(t, "=success]")).stop(1).fadeIn(), c && setTimeout(function() {
                              window.location.href = c
                          }, 1e3)
                      }).fail(function() {
                          e.hide(), o.find("[".concat(t, "=error]")).stop(1).fadeIn().delay(3e3).fadeOut()
                      })
                  };
                  window.__formSubmit = n, a(document.querySelectorAll('form'), function(t) {
                      var e = {};
                      a(t.elements, function(t) {
                          t.name && (e[t.name] = {
                              type: t.type || 'text',
                              required: t.required
                          })
                      }), t.__meta = e, t.onsubmit = function(e) {
                          return n(e, t)
                      }
                  })
              }, window._jqloaded ? d() : window.postJQCnt.push(d)
          }
      });
  </script>
  
  <script async src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" onload="postJQ()"></script>
  <script async src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
          `,
          draggable: true,
          removable: true,
    });
    // this.traitService.addHighChartTraits(editor, 'highcharts-type');
  }

  addAgGrid(ds:any) 
  {
    // editor ag-grid custom blocks added
    ds.editor.BlockManager.add('agGrid', 
    {
      id: 'agGrid',
      label: 'AgGrid',
      category: 'Basic',
      //disable:true,
      attributes: 
      {
        class: 'fa fa-table'
      },
      content: `<div data-gjs-type="grid-type" style="padding-top: 10px;padding-right: 2px;padding-left: 2px;padding-bottom: 10px">
                   <div id="myGrid" style="width: auto; height: 50%" class="ag-theme-alpine"></div>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addGridTraits(ds, 'grid-type');
  }

  addUpload(editor:any)
  {
    // editor upload custom blocks added
    editor.BlockManager.add('upload',
    {
      id: 'upload',
      label: 'upload',
      category: 'Basic',
      attributes:
      {
        class: 'fa fa-paperclip'
      },
      content: `<div style="color:#d983a6;display:inline-block;vertical-align:top;padding:10px;max-width:100%;">
                <button data-gjs-type="upload"><i class="fa fa-paperclip" aria-hidden="true"></i>
                </button>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addUpload(editor, 'upload');
  }

  addDownload(editor:any)
  {
    // editor upload custom blocks added
    editor.BlockManager.add('download',
    {
      id: 'download',
      label: 'download',
      category: 'Basic',
      attributes:
      {
        class: 'fa fa-download'
      },
      content: `<div style="color:#d983a6;display:inline-block;vertical-align:top;padding:10px;max-width:100%;">
                <button data-gjs-type="download"><i class="fa fa-download" aria-hidden="true"></i>
                </button>
                </div>`,
      draggable: true,
      removable: true
    });
    this.traitService.addDownload(editor, 'download');
  }
}
