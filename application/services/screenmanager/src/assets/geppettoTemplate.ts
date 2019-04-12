export const geppettoTemplate = [
    {
        "name": "geppettoTemplate1",
        "scripts": [
            {
                src: "https://cdn.ckeditor.com/4.5.11/full/ckeditor.js",
                file: null,
                is_angular: false
            }, {
                src: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
                file: null,
                is_angular: false
            }, {
                src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
                file: null,
                is_angular: false
            }, {
                src: "assets/js/template.js",
                filename: `template.js`,
                file: `function openNav() {
                    document.getElementById("mySidenav").style.width = "auto";
                  }
                
                  function closeNav() {
                    document.getElementById("mySidenav").style.width = "0";
                  }`,
                is_angular: false
            }
        ],
        "stylesheets": [
            {
                href: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css`,
                file: null,
                is_angular: false
            },{
                href: `https://cdn.datatables.net/colreorder/1.5.0/css/colReorder.bootstrap4.min.css`,
                file: null,
                is_angular: false
            },{
                href: `http://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css`,
                file: null,
                is_angular: false
            },{
                href: `assets/css/gjs-base.css`,
                filename: `gjs-base.css`,
                file: `*,
                :after,
                :before {
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box
                }
                
                .gpd-container {
                  width: 90%;
                  padding: 25px 0;
                  margin: 0 auto;
                  max-width: 1200px
                }
                
                .gpd-section {
                  padding: 50px 0
                }
                
                .gpd-image-block {
                  height: 200px;
                  background-color: #ccc;
                  width: auto
                }
                
                .gpd-icon {
                  display: inline-block;
                  text-decoration: none;
                  color: inherit;
                  fill: currentColor;
                  width: 64px;
                  height: 64px
                }
                
                .gpd-icon,
                img {
                  vertical-align: middle
                }
                
                img {
                  max-width: 100%
                }
                
                h1 {
                  font-size: 2rem
                }
                
                a,
                b,
                i,
                img,
                label,
                small,
                span,
                strong,
                u {
                  display: inline-block
                }
                
                .container {
                  width: 90%;
                  max-width: 1200px;
                  margin-left: auto;
                  margin-right: auto
                }
                
                .card {
                  border-radius: 3px;
                  background-color: #fff;
                  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);
                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);
                  padding: 15px;
                  margin-bottom: 15px
                }
                
                .form-group,
                .form-group-gut {
                  min-height: 10px;
                  padding-bottom: 7px
                }
                
                .form-group-gut {
                  padding-right: 10px
                }
                
                @media (max-width:768px) {
                  .form-group-gut {
                    padding-right: 0
                  }
                }
                
                .button,
                .button-full,
                .input,
                .input-padding,
                .label-group,
                .select,
                .textarea {
                  padding: 7px 10px
                }
                
                .button,
                .button-full,
                .form,
                .input,
                .input-radius,
                .label-group,
                .select,
                .textarea {
                  border-radius: 3px
                }
                
                .input,
                .input-border,
                .select,
                .textarea {
                  border: 1px solid rgba(0, 0, 0, .15)
                }
                
                .svg-link {
                  display: inline-block
                }
                
                .link {
                  color: #dc659b
                }
                
                .link,
                .link-svg {
                  text-decoration: none
                }
                
                .link-svg {
                  padding: 5px;
                  display: inline-block;
                  color: inherit;
                  opacity: .7;
                  -webkit-transition: color .25s;
                  transition: color .25s;
                  height: 28px;
                  width: 28px;
                  margin: 0 7.5px
                }
                
                .link-svg:hover {
                  color: #dc659b;
                  opacity: 1
                }
                
                .input,
                .select,
                .textarea {
                  height: 36px;
                  background-color: #fff;
                  width: 100%;
                  color: #555;
                  display: block;
                  font-size: 14px
                }
                
                .input-group {
                  height: 36px;
                  display: table;
                  border-collapse: separate
                }
                
                .input-group .button,
                .input-group .button-full,
                .input-group .input,
                .input-group .select,
                .input-group .textarea {
                  display: table-cell;
                  vertical-align: middle
                }
                
                .textarea {
                  height: auto
                }
                
                .label-group {
                  border: 1px solid rgba(0, 0, 0, .15);
                  background-color: rgba(0, 0, 0, .05)
                }
                
                .form {
                  background-color: #fff;
                  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);
                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);
                  padding: 20px
                }
                
                .label {
                  display: inline-block;
                  padding: 5px 0
                }
                
                .label-checkbox {
                  vertical-align: middle;
                  line-height: 2rem
                }
                
                .checkbox,
                .checkbox-label,
                .radio,
                .radio-label {
                  margin-right: 10px
                }
                
                .button,
                .button-full {
                  display: inline-block;
                  background-color: #dc659b;
                  color: #fff;
                  border: none;
                  cursor: pointer;
                  -webkit-transition: all .2s;
                  transition: all .2s
                }
                
                .button-full {
                  width: 100%
                }
                
                .input-group {
                  min-height: 10px;
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex
                }
                
                .input-group :not(:first-child):not(:last-child) {
                  border-radius: 0
                }
                
                .input-group :first-child:not(:last-child) {
                  border-bottom-right-radius: 0;
                  border-top-right-radius: 0
                }
                
                .input-group :last-child:not(:first-child) {
                  border-bottom-left-radius: 0;
                  border-top-left-radius: 0
                }
                
                .input-group .input-group-addon,
                .input-group .input-group-btn {
                  -webkit-box-flex: 1;
                  -ms-flex: 1 0 auto;
                  flex: 1 0 auto
                }
                
                .state,
                .state-error,
                .state-success {
                  color: #fff;
                  padding: 10px;
                  text-align: center;
                  border-radius: 3px
                }
                
                .state-success {
                  display: none;
                  background-color: #4ba74b
                }
                
                .state-error {
                  display: none;
                  background-color: #de5454
                }
                
                .nav-items {
                  display: inline-block;
                  float: right
                }
                
                .navbar {
                  background-color: #222;
                  color: #ddd;
                  min-height: 50px;
                  width: 100%
                }
                
                .navbar-container {
                  max-width: 950px;
                  margin: 0 auto;
                  width: 95%
                }
                
                .navbar-container:after {
                  content: "";
                  clear: both;
                  display: block
                }
                
                .navbar-brand {
                  vertical-align: top;
                  display: inline-block;
                  padding: 5px;
                  min-height: 50px;
                  min-width: 50px;
                  color: inherit;
                  text-decoration: none
                }
                
                .navbar-items {
                  padding: 10px 0;
                  display: block;
                  float: right;
                  margin: 0
                }
                
                .navbar-item {
                  margin: 0;
                  color: inherit;
                  text-decoration: none;
                  display: inline-block;
                  padding: 10px 15px
                }
                
                .burger {
                  margin: 10px 0;
                  width: 45px;
                  padding: 5px 10px;
                  display: none;
                  float: right;
                  cursor: pointer
                }
                
                .burger-line {
                  padding: 1px;
                  background-color: #fff;
                  margin: 5px 0
                }
                
                .quote {
                  line-height: 1.5rem
                }
                
                .footer-copyright {
                  text-align: center;
                  padding-top: 20px;
                  opacity: .7
                }
                
                .footer-link,
                .footer-link-svg,
                .header-link,
                .header-link-svg {
                  padding: 7px 5px;
                  display: inline-block;
                  text-decoration: none;
                  color: inherit;
                  opacity: .7;
                  -webkit-transition: color .25s;
                  transition: color .25s
                }
                
                .footer-link-svg,
                .header-link-svg {
                  height: 28px;
                  width: 28px;
                  margin: 0 15px 0 0
                }
                
                .footer-link-svg:hover,
                .footer-link:hover,
                .header-link-svg:hover,
                .header-link:hover {
                  color: #dc659b;
                  opacity: 1
                }
                
                .footer-details {
                  padding: 5px;
                  line-height: 1.5rem
                }
                
                .footer-socials {
                  padding: 10px 0
                }
                
                .footer-form {
                  padding-top: 10px
                }
                
                .header-link-svg {
                  margin: 0 5px
                }
                
                .header-socials {
                  margin-left: 25px;
                  display: inline-block;
                  vertical-align: middle
                }
                
                .row {
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-pack: start;
                  -ms-flex-pack: start;
                  justify-content: flex-start;
                  -webkit-box-align: stretch;
                  -ms-flex-align: stretch;
                  align-items: stretch;
                  -ms-flex-wrap: nowrap;
                  flex-wrap: nowrap;
                  padding: 10px;
                  min-height: 75px;
                  -webkit-box-orient: horizontal;
                  -webkit-box-direction: normal;
                  -ms-flex-direction: row;
                  flex-direction: row
                }
                
                table {
                  border-collapse: collapse;
                  border-spacing: 0;
                  width: 100%;
                  border: 1px solid #ddd;
                }
                
                th, td {
                  text-align: left;
                  padding: 8px;
                }
                
                tr:nth-child(even){background-color: #f2f2f2}
                
                @media (max-width:768px) {
                  .row {
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap
                  }
                }
                
                .cell,
                .cell-gut {
                  -webkit-box-flex: 1;
                  -ms-flex-positive: 1;
                  flex-grow: 1;
                  -ms-flex-preferred-size: 100%;
                  flex-basis: 100%;
                  padding: 5px
                }
                
                .cell-gut {
                  padding-right: 15px
                }
                
                @media (max-width:768px) {
                  .cell-gut {
                    padding-right: 0
                  }
                }
                
                @media (max-width:768px) {
                  .burger {
                    display: block
                  }
                
                  .nav-items {
                    display: none;
                    width: 100%
                  }
                
                  .navbar-items {
                    width: 100%
                  }
                
                  .navbar-item {
                    display: block
                  }
                }
                `,
                is_angular: false
            },{
                href: `assets/css/bootstrap.min.css`,
                filename: `bootstrap.min.css`,
                file: `/*!
                * Bootstrap v3.3.7 (http://getbootstrap.com)
                * Copyright 2011-2016 Twitter, Inc.
                * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
                */
               /*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
               /* html {
                 font-family: sans-serif;
                 -webkit-text-size-adjust: 100%;
                 -ms-text-size-adjust: 100%
               }
               
               /*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
               @media print {
               
                 *,
                 :after,
                 :before {
                   color: #000 !important;
                   text-shadow: none !important;
                   background: 0 0 !important;
                   -webkit-box-shadow: none !important;
                   box-shadow: none !important
                 }
               
                 a,
                 a:visited {
                   text-decoration: underline
                 }
               
                 a[href]:after {
                   content: " ("attr(href) ")"
                 }
               
                 abbr[title]:after {
                   content: " ("attr(title) ")"
                 }
               
                 a[href^="javascript:"]:after,
                 a[href^="#"]:after {
                   content: ""
                 }
               
                 blockquote,
                 pre {
                   border: 1px solid #999;
                   page-break-inside: avoid
                 }
               
                 thead {
                   display: table-header-group
                 }
               
                 img,
                 tr {
                   page-break-inside: avoid
                 }
               
                 img {
                   max-width: 100% !important
                 }
               
                 h2,
                 h3,
                 p {
                   orphans: 3;
                   widows: 3
                 }
               
                 h2,
                 h3 {
                   page-break-after: avoid
                 }
               
                 .navbar {
                   display: none
                 }
               
                 .btn>.caret,
                 .dropup>.btn>.caret {
                   border-top-color: #000 !important
                 }
               
                 
                 .table {
                   border-collapse: collapse !important
                 }
               
                 .table td,
                 .table th {
                   background-color: #fff !important
                 }
               
                 .table-bordered td,
                 .table-bordered th {
                   border: 1px solid #ddd !important
                 }
               }
               
               @font-face {
                 font-family: 'Glyphicons Halflings';
                 src: url(../fonts/glyphicons-halflings-regular.eot);
                 src: url(../fonts/glyphicons-halflings-regular.eot?#iefix) format('embedded-opentype'), url(../fonts/glyphicons-halflings-regular.woff2) format('woff2'), url(../fonts/glyphicons-halflings-regular.woff) format('woff'), url(../fonts/glyphicons-halflings-regular.ttf) format('truetype'), url(../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format('svg')
               }
               
               .glyphicon {
                 position: relative;
                 top: 1px;
                 display: inline-block;
                 font-family: 'Glyphicons Halflings';
                 font-style: normal;
                 font-weight: 400;
                 line-height: 1;
                 -webkit-font-smoothing: antialiased;
                 -moz-osx-font-smoothing: grayscale
               }
               
               .glyphicon-asterisk:before {
                 content: "\\002a"
               }
               
               .glyphicon-plus:before {
                 content: "\\002b"
               }
               
               .glyphicon-eur:before,
               .glyphicon-euro:before {
                 content: "\\20ac"
               }
               
               .glyphicon-minus:before {
                 content: "\\2212"
               }
               
               .glyphicon-cloud:before {
                 content: "\\2601"
               }
               
               .glyphicon-envelope:before {
                 content: "\\2709"
               }
               
               .glyphicon-pencil:before {
                 content: "\\270f"
               }
               
               .glyphicon-glass:before {
                 content: "\\e001"
               }
               
               .glyphicon-music:before {
                 content: "\e002"
               }
               
               .glyphicon-search:before {
                 content: "\e003"
               }
               
               .glyphicon-heart:before {
                 content: "\e005"
               }
               
               .glyphicon-star:before {
                 content: "\e006"
               }
               
               .glyphicon-star-empty:before {
                 content: "\e007"
               }
               
               .glyphicon-user:before {
                 content: "\e008"
               }
               
               .glyphicon-film:before {
                 content: "\e009"
               }
               
               .glyphicon-th-large:before {
                 content: "\e010"
               }
               
               .glyphicon-th:before {
                 content: "\e011"
               }
               
               .glyphicon-th-list:before {
                 content: "\e012"
               }
               
               .glyphicon-ok:before {
                 content: "\e013"
               }
               
               .glyphicon-remove:before {
                 content: "\e014"
               }
               
               .glyphicon-zoom-in:before {
                 content: "\e015"
               }
               
               .glyphicon-zoom-out:before {
                 content: "\e016"
               }
               
               .glyphicon-off:before {
                 content: "\e017"
               }
               
               .glyphicon-signal:before {
                 content: "\e018"
               }
               
               .glyphicon-cog:before {
                 content: "\e019"
               }
               
               .glyphicon-trash:before {
                 content: "\e020"
               }
               
               .glyphicon-home:before {
                 content: "\e021"
               }
               
               .glyphicon-file:before {
                 content: "\e022"
               }
               
               .glyphicon-time:before {
                 content: "\e023"
               }
               
               .glyphicon-road:before {
                 content: "\e024"
               }
               
               .glyphicon-download-alt:before {
                 content: "\e025"
               }
               
               .glyphicon-download:before {
                 content: "\e026"
               }
               
               .glyphicon-upload:before {
                 content: "\e027"
               }
               
               .glyphicon-inbox:before {
                 content: "\e028"
               }
               
               .glyphicon-play-circle:before {
                 content: "\e029"
               }
               
               .glyphicon-repeat:before {
                 content: "\e030"
               }
               
               .glyphicon-refresh:before {
                 content: "\e031"
               }
               
               .glyphicon-list-alt:before {
                 content: "\e032"
               }
               
               .glyphicon-lock:before {
                 content: "\e033"
               }
               
               .glyphicon-flag:before {
                 content: "\e034"
               }
               
               .glyphicon-headphones:before {
                 content: "\e035"
               }
               
               .glyphicon-volume-off:before {
                 content: "\e036"
               }
               
               .glyphicon-volume-down:before {
                 content: "\e037"
               }
               
               .glyphicon-volume-up:before {
                 content: "\e038"
               }
               
               .glyphicon-qrcode:before {
                 content: "\e039"
               }
               
               .glyphicon-barcode:before {
                 content: "\e040"
               }
               
               .glyphicon-tag:before {
                 content: "\e041"
               }
               
               .glyphicon-tags:before {
                 content: "\e042"
               }
               
               .glyphicon-book:before {
                 content: "\e043"
               }
               
               .glyphicon-bookmark:before {
                 content: "\e044"
               }
               
               .glyphicon-print:before {
                 content: "\e045"
               }
               
               .glyphicon-camera:before {
                 content: "\e046"
               }
               
               .glyphicon-font:before {
                 content: "\e047"
               }
               
               .glyphicon-bold:before {
                 content: "\e048"
               }
               
               .glyphicon-italic:before {
                 content: "\e049"
               }
               
               .glyphicon-text-height:before {
                 content: "\e050"
               }
               
               .glyphicon-text-width:before {
                 content: "\e051"
               }
               
               .glyphicon-align-left:before {
                 content: "\e052"
               }
               
               .glyphicon-align-center:before {
                 content: "\e053"
               }
               
               .glyphicon-align-right:before {
                 content: "\e054"
               }
               
               .glyphicon-align-justify:before {
                 content: "\e055"
               }
               
               .glyphicon-list:before {
                 content: "\e056"
               }
               
               .glyphicon-indent-left:before {
                 content: "\e057"
               }
               
               .glyphicon-indent-right:before {
                 content: "\e058"
               }
               
               .glyphicon-facetime-video:before {
                 content: "\e059"
               }
               
               .glyphicon-picture:before {
                 content: "\e060"
               }
               
               .glyphicon-map-marker:before {
                 content: "\e062"
               }
               
               .glyphicon-adjust:before {
                 content: "\e063"
               }
               
               .glyphicon-tint:before {
                 content: "\e064"
               }
               
               .glyphicon-edit:before {
                 content: "\e065"
               }
               
               .glyphicon-share:before {
                 content: "\e066"
               }
               
               .glyphicon-check:before {
                 content: "\e067"
               }
               
               .glyphicon-move:before {
                 content: "\e068"
               }
               
               .glyphicon-step-backward:before {
                 content: "\e069"
               }
               
               .glyphicon-fast-backward:before {
                 content: "\e070"
               }
               
               .glyphicon-backward:before {
                 content: "\e071"
               }
               
               .glyphicon-play:before {
                 content: "\e072"
               }
               
               .glyphicon-pause:before {
                 content: "\e073"
               }
               
               .glyphicon-stop:before {
                 content: "\e074"
               }
               
               .glyphicon-forward:before {
                 content: "\e075"
               }
               
               .glyphicon-fast-forward:before {
                 content: "\e076"
               }
               
               .glyphicon-step-forward:before {
                 content: "\e077"
               }
               
               .glyphicon-eject:before {
                 content: "\e078"
               }
               
               .glyphicon-chevron-left:before {
                 content: "\e079"
               }
               
               .glyphicon-chevron-right:before {
                 content: "\e080"
               }
               
               .glyphicon-plus-sign:before {
                 content: "\e081"
               }
               
               .glyphicon-minus-sign:before {
                 content: "\e082"
               }
               
               .glyphicon-remove-sign:before {
                 content: "\e083"
               }
               
               .glyphicon-ok-sign:before {
                 content: "\e084"
               }
               
               .glyphicon-question-sign:before {
                 content: "\e085"
               }
               
               .glyphicon-info-sign:before {
                 content: "\e086"
               }
               
               .glyphicon-screenshot:before {
                 content: "\e087"
               }
               
               .glyphicon-remove-circle:before {
                 content: "\e088"
               }
               
               .glyphicon-ok-circle:before {
                 content: "\e089"
               }
               
               .glyphicon-ban-circle:before {
                 content: "\e090"
               }
               
               .glyphicon-arrow-left:before {
                 content: "\e091"
               }
               
               .glyphicon-arrow-right:before {
                 content: "\e092"
               }
               
               .glyphicon-arrow-up:before {
                 content: "\e093"
               }
               
               .glyphicon-arrow-down:before {
                 content: "\e094"
               }
               
               .glyphicon-share-alt:before {
                 content: "\e095"
               }
               
               .glyphicon-resize-full:before {
                 content: "\e096"
               }
               
               .glyphicon-resize-small:before {
                 content: "\e097"
               }
               
               .glyphicon-exclamation-sign:before {
                 content: "\e101"
               }
               
               .glyphicon-gift:before {
                 content: "\e102"
               }
               
               .glyphicon-leaf:before {
                 content: "\e103"
               }
               
               .glyphicon-fire:before {
                 content: "\e104"
               }
               
               .glyphicon-eye-open:before {
                 content: "\e105"
               }
               
               .glyphicon-eye-close:before {
                 content: "\e106"
               }
               
               .glyphicon-warning-sign:before {
                 content: "\e107"
               }
               
               .glyphicon-plane:before {
                 content: "\e108"
               }
               
               .glyphicon-calendar:before {
                 content: "\e109"
               }
               
               .glyphicon-random:before {
                 content: "\e110"
               }
               
               .glyphicon-comment:before {
                 content: "\e111"
               }
               
               .glyphicon-magnet:before {
                 content: "\e112"
               }
               
               .glyphicon-chevron-up:before {
                 content: "\e113"
               }
               
               .glyphicon-chevron-down:before {
                 content: "\e114"
               }
               
               .glyphicon-retweet:before {
                 content: "\e115"
               }
               
               .glyphicon-shopping-cart:before {
                 content: "\e116"
               }
               
               .glyphicon-folder-close:before {
                 content: "\e117"
               }
               
               .glyphicon-folder-open:before {
                 content: "\e118"
               }
               
               .glyphicon-resize-vertical:before {
                 content: "\e119"
               }
               
               .glyphicon-resize-horizontal:before {
                 content: "\e120"
               }
               
               .glyphicon-hdd:before {
                 content: "\e121"
               }
               
               .glyphicon-bullhorn:before {
                 content: "\e122"
               }
               
               .glyphicon-bell:before {
                 content: "\e123"
               }
               
               .glyphicon-certificate:before {
                 content: "\e124"
               }
               
               .glyphicon-thumbs-up:before {
                 content: "\e125"
               }
               
               .glyphicon-thumbs-down:before {
                 content: "\e126"
               }
               
               .glyphicon-hand-right:before {
                 content: "\e127"
               }
               
               .glyphicon-hand-left:before {
                 content: "\e128"
               }
               
               .glyphicon-hand-up:before {
                 content: "\e129"
               }
               
               .glyphicon-hand-down:before {
                 content: "\e130"
               }
               
               .glyphicon-circle-arrow-right:before {
                 content: "\e131"
               }
               
               .glyphicon-circle-arrow-left:before {
                 content: "\e132"
               }
               
               .glyphicon-circle-arrow-up:before {
                 content: "\e133"
               }
               
               .glyphicon-circle-arrow-down:before {
                 content: "\e134"
               }
               
               .glyphicon-globe:before {
                 content: "\e135"
               }
               
               .glyphicon-wrench:before {
                 content: "\e136"
               }
               
               .glyphicon-tasks:before {
                 content: "\e137"
               }
               
               .glyphicon-filter:before {
                 content: "\e138"
               }
               
               .glyphicon-briefcase:before {
                 content: "\e139"
               }
               
               .glyphicon-fullscreen:before {
                 content: "\e140"
               }
               
               .glyphicon-dashboard:before {
                 content: "\e141"
               }
               
               .glyphicon-paperclip:before {
                 content: "\e142"
               }
               
               .glyphicon-heart-empty:before {
                 content: "\e143"
               }
               
               .glyphicon-link:before {
                 content: "\e144"
               }
               
               .glyphicon-phone:before {
                 content: "\e145"
               }
               
               .glyphicon-pushpin:before {
                 content: "\e146"
               }
               
               .glyphicon-usd:before {
                 content: "\e148"
               }
               
               .glyphicon-gbp:before {
                 content: "\e149"
               }
               
               .glyphicon-sort:before {
                 content: "\e150"
               }
               
               .glyphicon-sort-by-alphabet:before {
                 content: "\e151"
               }
               
               .glyphicon-sort-by-alphabet-alt:before {
                 content: "\e152"
               }
               
               .glyphicon-sort-by-order:before {
                 content: "\e153"
               }
               
               .glyphicon-sort-by-order-alt:before {
                 content: "\e154"
               }
               
               .glyphicon-sort-by-attributes:before {
                 content: "\e155"
               }
               
               .glyphicon-sort-by-attributes-alt:before {
                 content: "\e156"
               }
               
               .glyphicon-unchecked:before {
                 content: "\e157"
               }
               
               .glyphicon-expand:before {
                 content: "\e158"
               }
               
               .glyphicon-collapse-down:before {
                 content: "\e159"
               }
               
               .glyphicon-collapse-up:before {
                 content: "\e160"
               }
               
               .glyphicon-log-in:before {
                 content: "\e161"
               }
               
               .glyphicon-flash:before {
                 content: "\e162"
               }
               
               .glyphicon-log-out:before {
                 content: "\e163"
               }
               
               .glyphicon-new-window:before {
                 content: "\e164"
               }
               
               .glyphicon-record:before {
                 content: "\e165"
               }
               
               .glyphicon-save:before {
                 content: "\e166"
               }
               
               .glyphicon-open:before {
                 content: "\e167"
               }
               
               .glyphicon-saved:before {
                 content: "\e168"
               }
               
               .glyphicon-import:before {
                 content: "\e169"
               }
               
               .glyphicon-export:before {
                 content: "\e170"
               }
               
               .glyphicon-send:before {
                 content: "\e171"
               }
               
               .glyphicon-floppy-disk:before {
                 content: "\e172"
               }
               
               .glyphicon-floppy-saved:before {
                 content: "\e173"
               }
               
               .glyphicon-floppy-remove:before {
                 content: "\e174"
               }
               
               .glyphicon-floppy-save:before {
                 content: "\e175"
               }
               
               .glyphicon-floppy-open:before {
                 content: "\e176"
               }
               
               .glyphicon-credit-card:before {
                 content: "\e177"
               }
               
               .glyphicon-transfer:before {
                 content: "\e178"
               }
               
               .glyphicon-cutlery:before {
                 content: "\e179"
               }
               
               .glyphicon-header:before {
                 content: "\e180"
               }
               
               .glyphicon-compressed:before {
                 content: "\e181"
               }
               
               .glyphicon-earphone:before {
                 content: "\e182"
               }
               
               .glyphicon-phone-alt:before {
                 content: "\e183"
               }
               
               .glyphicon-tower:before {
                 content: "\e184"
               }
               
               .glyphicon-stats:before {
                 content: "\e185"
               }
               
               .glyphicon-sd-video:before {
                 content: "\e186"
               }
               
               .glyphicon-hd-video:before {
                 content: "\e187"
               }
               
               .glyphicon-subtitles:before {
                 content: "\e188"
               }
               
               .glyphicon-sound-stereo:before {
                 content: "\e189"
               }
               
               .glyphicon-sound-dolby:before {
                 content: "\e190"
               }
               
               .glyphicon-sound-5-1:before {
                 content: "\e191"
               }
               
               .glyphicon-sound-6-1:before {
                 content: "\e192"
               }
               
               .glyphicon-sound-7-1:before {
                 content: "\e193"
               }
               
               .glyphicon-copyright-mark:before {
                 content: "\e194"
               }
               
               .glyphicon-registration-mark:before {
                 content: "\e195"
               }
               
               .glyphicon-cloud-download:before {
                 content: "\e197"
               }
               
               .glyphicon-cloud-upload:before {
                 content: "\e198"
               }
               
               .glyphicon-tree-conifer:before {
                 content: "\e199"
               }
               
               .glyphicon-tree-deciduous:before {
                 content: "\e200"
               }
               
               .glyphicon-cd:before {
                 content: "\e201"
               }
               
               .glyphicon-save-file:before {
                 content: "\e202"
               }
               
               .glyphicon-open-file:before {
                 content: "\e203"
               }
               
               .glyphicon-level-up:before {
                 content: "\e204"
               }
               
               .glyphicon-copy:before {
                 content: "\e205"
               }
               
               .glyphicon-paste:before {
                 content: "\e206"
               }
               
               .glyphicon-alert:before {
                 content: "\e209"
               }
               
               .glyphicon-equalizer:before {
                 content: "\e210"
               }
               
               .glyphicon-king:before {
                 content: "\e211"
               }
               
               .glyphicon-queen:before {
                 content: "\e212"
               }
               
               .glyphicon-pawn:before {
                 content: "\e213"
               }
               
               .glyphicon-bishop:before {
                 content: "\e214"
               }
               
               .glyphicon-knight:before {
                 content: "\e215"
               }
               
               .glyphicon-baby-formula:before {
                 content: "\e216"
               }
               
               .glyphicon-tent:before {
                 content: "\\26fa"
               }
               
               .glyphicon-blackboard:before {
                 content: "\e218"
               }
               
               .glyphicon-bed:before {
                 content: "\e219"
               }
               
               .glyphicon-apple:before {
                 content: "\f8ff"
               }
               
               .glyphicon-erase:before {
                 content: "\e221"
               }
               
               .glyphicon-hourglass:before {
                 content: "\\231b"
               }
               
               .glyphicon-lamp:before {
                 content: "\e223"
               }
               
               .glyphicon-duplicate:before {
                 content: "\e224"
               }
               
               .glyphicon-piggy-bank:before {
                 content: "\e225"
               }
               
               .glyphicon-scissors:before {
                 content: "\e226"
               }
               
               .glyphicon-bitcoin:before {
                 content: "\e227"
               }
               
               .glyphicon-btc:before {
                 content: "\e227"
               }
               
               .glyphicon-xbt:before {
                 content: "\e227"
               }
               
               .glyphicon-yen:before {
                 content: "\\00a5"
               }
               
               .glyphicon-jpy:before {
                 content: "\\00a5"
               }
               
               .glyphicon-ruble:before {
                 content: "\\20bd"
               }
               
               .glyphicon-rub:before {
                 content: "\\20bd"
               }
               
               .glyphicon-scale:before {
                 content: "\e230"
               }
               
               .glyphicon-ice-lolly:before {
                 content: "\e231"
               }
               
               .glyphicon-ice-lolly-tasted:before {
                 content: "\e232"
               }
               
               .glyphicon-education:before {
                 content: "\e233"
               }
               
               .glyphicon-option-horizontal:before {
                 content: "\e234"
               }
               
               .glyphicon-option-vertical:before {
                 content: "\e235"
               }
               
               .glyphicon-menu-hamburger:before {
                 content: "\e236"
               }
               
               .glyphicon-modal-window:before {
                 content: "\e237"
               }
               
               .glyphicon-oil:before {
                 content: "\e238"
               }
               
               .glyphicon-grain:before {
                 content: "\e239"
               }
               
               .glyphicon-sunglasses:before {
                 content: "\e240"
               }
               
               .glyphicon-text-size:before {
                 content: "\e241"
               }
               
               .glyphicon-text-color:before {
                 content: "\e242"
               }
               
               .glyphicon-text-background:before {
                 content: "\e243"
               }
               
               .glyphicon-object-align-top:before {
                 content: "\e244"
               }
               
               .glyphicon-object-align-bottom:before {
                 content: "\e245"
               }
               
               .glyphicon-object-align-horizontal:before {
                 content: "\e246"
               }
               
               .glyphicon-object-align-left:before {
                 content: "\e247"
               }
               
               .glyphicon-object-align-vertical:before {
                 content: "\e248"
               }
               
               .glyphicon-object-align-right:before {
                 content: "\e249"
               }
               
               .glyphicon-triangle-right:before {
                 content: "\e250"
               }
               
               .glyphicon-triangle-left:before {
                 content: "\e251"
               }
               
               .glyphicon-triangle-bottom:before {
                 content: "\e252"
               }
               
               .glyphicon-triangle-top:before {
                 content: "\e253"
               }
               
               .glyphicon-console:before {
                 content: "\e254"
               }
               
               .glyphicon-superscript:before {
                 content: "\e255"
               }
               
               .glyphicon-subscript:before {
                 content: "\e256"
               }
               
               .glyphicon-menu-left:before {
                 content: "\e257"
               }
               
               .glyphicon-menu-right:before {
                 content: "\e258"
               }
               
               .glyphicon-menu-down:before {
                 content: "\e259"
               }
               
               .glyphicon-menu-up:before {
                 content: "\e260"
               }
               
               * {
                 -webkit-box-sizing: border-box;
                 -moz-box-sizing: border-box;
                 box-sizing: border-box
               }
               
               :after,
               :before {
                 -webkit-box-sizing: border-box;
                 -moz-box-sizing: border-box;
                 box-sizing: border-box
               }
               
               html {
                 /* font-size: 10px; */
                 -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
               }
               
               body {
                 font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                 /* font-size: 14px; */
                 line-height: 1.42857143;
                 color: #333;
                 background-color: #fff
               }
               
               /* button,
               input,
               select,
               textarea {
                 font-family: inherit;
                 font-size: inherit;
                 line-height: inherit
               } */
               
               a {
                 color: #337ab7;
                 text-decoration: none
               }
               
               a:focus,
               a:hover {
                 color: #23527c;
                 text-decoration: underline
               }
               
               a:focus {
                 outline: 5px auto -webkit-focus-ring-color;
                 outline-offset: -2px
               }
               
               figure {
                 margin: 0
               }
               
               img {
                 vertical-align: middle
               }
               
               .carousel-inner>.item>a>img,
               .carousel-inner>.item>img,
               .img-responsive,
               .thumbnail a>img,
               .thumbnail>img {
                 display: block;
                 max-width: 100%;
                 height: auto
               }
               
               .img-rounded {
                 border-radius: 6px
               }
               
               .img-thumbnail {
                 display: inline-block;
                 max-width: 100%;
                 height: auto;
                 padding: 4px;
                 line-height: 1.42857143;
                 background-color: #fff;
                 border: 1px solid #ddd;
                 border-radius: 4px;
                 -webkit-transition: all .2s ease-in-out;
                 -o-transition: all .2s ease-in-out;
                 transition: all .2s ease-in-out
               }
               
               .img-circle {
                 border-radius: 50%
               }
               
               hr {
                 margin-top: 20px;
                 margin-bottom: 20px;
                 border: 0;
                 border-top: 1px solid #eee
               }
               
               .sr-only {
                 position: absolute;
                 width: 1px;
                 height: 1px;
                 padding: 0;
                 margin: -1px;
                 overflow: hidden;
                 clip: rect(0, 0, 0, 0);
                 border: 0
               }
               
               .sr-only-focusable:active,
               .sr-only-focusable:focus {
                 position: static;
                 width: auto;
                 height: auto;
                 margin: 0;
                 overflow: visible;
                 clip: auto
               }
               
               [role=button] {
                 cursor: pointer
               }
               
               .h1,
               .h2,
               .h3,
               .h4,
               .h5,
               .h6,
               h1,
               h2,
               h3,
               h4,
               h5,
               h6 {
                 font-family: inherit;
                 font-weight: 500;
                 line-height: 1.1;
                 color: inherit
               }
               
               .h1 .small,
               .h1 small,
               .h2 .small,
               .h2 small,
               .h3 .small,
               .h3 small,
               .h4 .small,
               .h4 small,
               .h5 .small,
               .h5 small,
               .h6 .small,
               .h6 small,
               h1 .small,
               h1 small,
               h2 .small,
               h2 small,
               h3 .small,
               h3 small,
               h4 .small,
               h4 small,
               h5 .small,
               h5 small,
               h6 .small,
               h6 small {
                 font-weight: 400;
                 line-height: 1;
                 color: #777
               }
               
               .h1,
               .h2,
               .h3,
               h1,
               h2,
               h3 {
                 margin-top: 20px;
                 margin-bottom: 10px
               }
               
               .h1 .small,
               .h1 small,
               .h2 .small,
               .h2 small,
               .h3 .small,
               .h3 small,
               h1 .small,
               h1 small,
               h2 .small,
               h2 small,
               h3 .small,
               h3 small {
                 font-size: 65%
               }
               
               .h4,
               .h5,
               .h6,
               h4,
               h5,
               h6 {
                 margin-top: 10px;
                 margin-bottom: 10px
               }
               
               .h4 .small,
               .h4 small,
               .h5 .small,
               .h5 small,
               .h6 .small,
               .h6 small,
               h4 .small,
               h4 small,
               h5 .small,
               h5 small,
               h6 .small,
               h6 small {
                 font-size: 75%
               }
               
               .h1,
               h1 {
                 font-size: 36px
               }
               
               .h2,
               h2 {
                 font-size: 30px
               }
               
               .h3,
               h3 {
                 font-size: 24px
               }
               
               .h4,
               h4 {
                 font-size: 18px
               }
               
               .h5,
               h5 {
                 font-size: 14px
               }
               
               .h6,
               h6 {
                 font-size: 12px
               }
               
               p {
                 margin: 0 0 10px
               }
               
               .lead {
                 margin-bottom: 20px;
                 font-size: 16px;
                 font-weight: 300;
                 line-height: 1.4
               }
               
               @media (min-width:768px) {
                 .lead {
                   font-size: 21px
                 }
               }
               
               .small,
               small {
                 font-size: 85%
               }
               
               .mark,
               mark {
                 padding: .2em;
                 background-color: #fcf8e3
               }
               
               .text-left {
                 text-align: left
               }
               
               .text-right {
                 text-align: right
               }
               
               .text-center {
                 text-align: center
               }
               
               .text-justify {
                 text-align: justify
               }
               
               .text-nowrap {
                 white-space: nowrap
               }
               
               .text-lowercase {
                 text-transform: lowercase
               }
               
               .text-uppercase {
                 text-transform: uppercase
               }
               
               .text-capitalize {
                 text-transform: capitalize
               }
               
               .text-muted {
                 color: #777
               }
               
               .text-primary {
                 color: #337ab7
               }
               
               a.text-primary:focus,
               a.text-primary:hover {
                 color: #286090
               }
               
               .text-success {
                 color: #3c763d
               }
               
               a.text-success:focus,
               a.text-success:hover {
                 color: #2b542c
               }
               
               .text-info {
                 color: #31708f
               }
               
               a.text-info:focus,
               a.text-info:hover {
                 color: #245269
               }
               
               .text-warning {
                 color: #8a6d3b
               }
               
               a.text-warning:focus,
               a.text-warning:hover {
                 color: #66512c
               }
               
               .text-danger {
                 color: #a94442
               }
               
               a.text-danger:focus,
               a.text-danger:hover {
                 color: #843534
               }
               
               .bg-primary {
                 color: #fff;
                 background-color: #337ab7
               }
               
               a.bg-primary:focus,
               a.bg-primary:hover {
                 background-color: #286090
               }
               
               .bg-success {
                 background-color: #dff0d8
               }
               
               a.bg-success:focus,
               a.bg-success:hover {
                 background-color: #c1e2b3
               }
               
               .bg-info {
                 background-color: #d9edf7
               }
               
               a.bg-info:focus,
               a.bg-info:hover {
                 background-color: #afd9ee
               }
               
               .bg-warning {
                 background-color: #fcf8e3
               }
               
               a.bg-warning:focus,
               a.bg-warning:hover {
                 background-color: #f7ecb5
               }
               
               .bg-danger {
                 background-color: #f2dede
               }
               
               a.bg-danger:focus,
               a.bg-danger:hover {
                 background-color: #e4b9b9
               }
               
               .page-header {
                 padding-bottom: 9px;
                 margin: 40px 0 20px;
                 border-bottom: 1px solid #eee
               }
               
               ol,
               ul {
                 margin-top: 0;
                 margin-bottom: 10px
               }
               
               ol ol,
               ol ul,
               ul ol,
               ul ul {
                 margin-bottom: 0
               }
               
               .list-unstyled {
                 padding-left: 0;
                 list-style: none
               }
               
               .list-inline {
                 padding-left: 0;
                 margin-left: -5px;
                 list-style: none
               }
               
               .list-inline>li {
                 display: inline-block;
                 padding-right: 5px;
                 padding-left: 5px
               }
               
               dl {
                 margin-top: 0;
                 margin-bottom: 20px
               }
               
               dd,
               dt {
                 line-height: 1.42857143
               }
               
               dt {
                 font-weight: 700
               }
               
               dd {
                 margin-left: 0
               }
               
               @media (min-width:768px) {
                 .dl-horizontal dt {
                   float: left;
                   width: 160px;
                   overflow: hidden;
                   clear: left;
                   text-align: right;
                   text-overflow: ellipsis;
                   white-space: nowrap
                 }
               
                 .dl-horizontal dd {
                   margin-left: 180px
                 }
               }
               
               abbr[data-original-title],
               abbr[title] {
                 cursor: help;
                 border-bottom: 1px dotted #777
               }
               
               .initialism {
                 font-size: 90%;
                 text-transform: uppercase
               }
               
               blockquote {
                 padding: 10px 20px;
                 margin: 0 0 20px;
                 font-size: 17.5px;
                 border-left: 5px solid #eee
               }
               
               blockquote ol:last-child,
               blockquote p:last-child,
               blockquote ul:last-child {
                 margin-bottom: 0
               }
               
               blockquote .small,
               blockquote footer,
               blockquote small {
                 display: block;
                 font-size: 80%;
                 line-height: 1.42857143;
                 color: #777
               }
               
               blockquote .small:before,
               blockquote footer:before,
               blockquote small:before {
                 content: '\\2014 \\00A0'
               }
               
               .blockquote-reverse,
               blockquote.pull-right {
                 padding-right: 15px;
                 padding-left: 0;
                 text-align: right;
                 border-right: 5px solid #eee;
                 border-left: 0
               }
               
               .blockquote-reverse .small:before,
               .blockquote-reverse footer:before,
               .blockquote-reverse small:before,
               blockquote.pull-right .small:before,
               blockquote.pull-right footer:before,
               blockquote.pull-right small:before {
                 content: ''
               }
               
               .blockquote-reverse .small:after,
               .blockquote-reverse footer:after,
               .blockquote-reverse small:after,
               blockquote.pull-right .small:after,
               blockquote.pull-right footer:after,
               blockquote.pull-right small:after {
                 content: '\\00A0 \\2014'
               }
               
               address {
                 margin-bottom: 20px;
                 font-style: normal;
                 line-height: 1.42857143
               }
               
               code,
               kbd,
               pre,
               samp {
                 font-family: Menlo, Monaco, Consolas, "Courier New", monospace
               }
               
               code {
                 padding: 2px 4px;
                 font-size: 90%;
                 color: #c7254e;
                 background-color: #f9f2f4;
                 border-radius: 4px
               }
               
               kbd {
                 padding: 2px 4px;
                 font-size: 90%;
                 color: #fff;
                 background-color: #333;
                 border-radius: 3px;
                 -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
                 box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25)
               }
               
               kbd kbd {
                 padding: 0;
                 font-size: 100%;
                 font-weight: 700;
                 -webkit-box-shadow: none;
                 box-shadow: none
               }
               
               pre {
                 display: block;
                 padding: 9.5px;
                 margin: 0 0 10px;
                 font-size: 13px;
                 line-height: 1.42857143;
                 color: #333;
                 word-break: break-all;
                 word-wrap: break-word;
                 background-color: #f5f5f5;
                 border: 1px solid #ccc;
                 border-radius: 4px
               }
               
               pre code {
                 padding: 0;
                 font-size: inherit;
                 color: inherit;
                 white-space: pre-wrap;
                 background-color: transparent;
                 border-radius: 0
               }
               
               .pre-scrollable {
                 max-height: 340px;
                 overflow-y: scroll
               }
               
               .container {
                 padding-right: 15px;
                 padding-left: 15px;
                 margin-right: auto;
                 margin-left: auto
               }
               
               @media (min-width:768px) {
                 .container {
                   width: 750px
                 }
               }
               
               @media (min-width:992px) {
                 .container {
                   width: 970px
                 }
               }
               
               @media (min-width:1200px) {
                 .container {
                   width: 1170px
                 }
               }
               
               .container-fluid {
                 padding-right: 15px;
                 padding-left: 15px;
                 margin-right: auto;
                 margin-left: auto
               }
               
               .row {
                 margin-right: -15px;
                 margin-left: -15px
               }
               
               .col-lg-1,
               .col-lg-10,
               .col-lg-11,
               .col-lg-12,
               .col-lg-2,
               .col-lg-3,
               .col-lg-4,
               .col-lg-5,
               .col-lg-6,
               .col-lg-7,
               .col-lg-8,
               .col-lg-9,
               .col-md-1,
               .col-md-10,
               .col-md-11,
               .col-md-12,
               .col-md-2,
               .col-md-3,
               .col-md-4,
               .col-md-5,
               .col-md-6,
               .col-md-7,
               .col-md-8,
               .col-md-9,
               .col-sm-1,
               .col-sm-10,
               .col-sm-11,
               .col-sm-12,
               .col-sm-2,
               .col-sm-3,
               .col-sm-4,
               .col-sm-5,
               .col-sm-6,
               .col-sm-7,
               .col-sm-8,
               .col-sm-9,
               .col-xs-1,
               .col-xs-10,
               .col-xs-11,
               .col-xs-12,
               .col-xs-2,
               .col-xs-3,
               .col-xs-4,
               .col-xs-5,
               .col-xs-6,
               .col-xs-7,
               .col-xs-8,
               .col-xs-9 {
                 position: relative;
                 min-height: 1px;
                 padding-right: 15px;
                 padding-left: 15px
               }
               
               .col-xs-1,
               .col-xs-10,
               .col-xs-11,
               .col-xs-12,
               .col-xs-2,
               .col-xs-3,
               .col-xs-4,
               .col-xs-5,
               .col-xs-6,
               .col-xs-7,
               .col-xs-8,
               .col-xs-9 {
                 float: left
               }
               
               .col-xs-12 {
                 width: 100%
               }
               
               .col-xs-11 {
                 width: 91.66666667%
               }
               
               .col-xs-10 {
                 width: 83.33333333%
               }
               
               .col-xs-9 {
                 width: 75%
               }
               
               .col-xs-8 {
                 width: 66.66666667%
               }
               
               .col-xs-7 {
                 width: 58.33333333%
               }
               
               .col-xs-6 {
                 width: 50%
               }
               
               .col-xs-5 {
                 width: 41.66666667%
               }
               
               .col-xs-4 {
                 width: 33.33333333%
               }
               
               .col-xs-3 {
                 width: 25%
               }
               
               .col-xs-2 {
                 width: 16.66666667%
               }
               
               .col-xs-1 {
                 width: 8.33333333%
               }
               
               .col-xs-pull-12 {
                 right: 100%
               }
               
               .col-xs-pull-11 {
                 right: 91.66666667%
               }
               
               .col-xs-pull-10 {
                 right: 83.33333333%
               }
               
               .col-xs-pull-9 {
                 right: 75%
               }
               
               .col-xs-pull-8 {
                 right: 66.66666667%
               }
               
               .col-xs-pull-7 {
                 right: 58.33333333%
               }
               
               .col-xs-pull-6 {
                 right: 50%
               }
               
               .col-xs-pull-5 {
                 right: 41.66666667%
               }
               
               .col-xs-pull-4 {
                 right: 33.33333333%
               }
               
               .col-xs-pull-3 {
                 right: 25%
               }
               
               .col-xs-pull-2 {
                 right: 16.66666667%
               }
               
               .col-xs-pull-1 {
                 right: 8.33333333%
               }
               
               .col-xs-pull-0 {
                 right: auto
               }
               
               .col-xs-push-12 {
                 left: 100%
               }
               
               .col-xs-push-11 {
                 left: 91.66666667%
               }
               
               .col-xs-push-10 {
                 left: 83.33333333%
               }
               
               .col-xs-push-9 {
                 left: 75%
               }
               
               .col-xs-push-8 {
                 left: 66.66666667%
               }
               
               .col-xs-push-7 {
                 left: 58.33333333%
               }
               
               .col-xs-push-6 {
                 left: 50%
               }
               
               .col-xs-push-5 {
                 left: 41.66666667%
               }
               
               .col-xs-push-4 {
                 left: 33.33333333%
               }
               
               .col-xs-push-3 {
                 left: 25%
               }
               
               .col-xs-push-2 {
                 left: 16.66666667%
               }
               
               .col-xs-push-1 {
                 left: 8.33333333%
               }
               
               .col-xs-push-0 {
                 left: auto
               }
               
               .col-xs-offset-12 {
                 margin-left: 100%
               }
               
               .col-xs-offset-11 {
                 margin-left: 91.66666667%
               }
               
               .col-xs-offset-10 {
                 margin-left: 83.33333333%
               }
               
               .col-xs-offset-9 {
                 margin-left: 75%
               }
               
               .col-xs-offset-8 {
                 margin-left: 66.66666667%
               }
               
               .col-xs-offset-7 {
                 margin-left: 58.33333333%
               }
               
               .col-xs-offset-6 {
                 margin-left: 50%
               }
               
               .col-xs-offset-5 {
                 margin-left: 41.66666667%
               }
               
               .col-xs-offset-4 {
                 margin-left: 33.33333333%
               }
               
               .col-xs-offset-3 {
                 margin-left: 25%
               }
               
               .col-xs-offset-2 {
                 margin-left: 16.66666667%
               }
               
               .col-xs-offset-1 {
                 margin-left: 8.33333333%
               }
               
               .col-xs-offset-0 {
                 margin-left: 0
               }
               
               @media (min-width:768px) {
               
                 .col-sm-1,
                 .col-sm-10,
                 .col-sm-11,
                 .col-sm-12,
                 .col-sm-2,
                 .col-sm-3,
                 .col-sm-4,
                 .col-sm-5,
                 .col-sm-6,
                 .col-sm-7,
                 .col-sm-8,
                 .col-sm-9 {
                   float: left
                 }
               
                 .col-sm-12 {
                   width: 100%
                 }
               
                 .col-sm-11 {
                   width: 91.66666667%
                 }
               
                 .col-sm-10 {
                   width: 83.33333333%
                 }
               
                 .col-sm-9 {
                   width: 75%
                 }
               
                 .col-sm-8 {
                   width: 66.66666667%
                 }
               
                 .col-sm-7 {
                   width: 58.33333333%
                 }
               
                 .col-sm-6 {
                   width: 50%
                 }
               
                 .col-sm-5 {
                   width: 41.66666667%
                 }
               
                 .col-sm-4 {
                   width: 33.33333333%
                 }
               
                 .col-sm-3 {
                   width: 25%
                 }
               
                 .col-sm-2 {
                   width: 16.66666667%
                 }
               
                 .col-sm-1 {
                   width: 8.33333333%
                 }
               
                 .col-sm-pull-12 {
                   right: 100%
                 }
               
                 .col-sm-pull-11 {
                   right: 91.66666667%
                 }
               
                 .col-sm-pull-10 {
                   right: 83.33333333%
                 }
               
                 .col-sm-pull-9 {
                   right: 75%
                 }
               
                 .col-sm-pull-8 {
                   right: 66.66666667%
                 }
               
                 .col-sm-pull-7 {
                   right: 58.33333333%
                 }
               
                 .col-sm-pull-6 {
                   right: 50%
                 }
               
                 .col-sm-pull-5 {
                   right: 41.66666667%
                 }
               
                 .col-sm-pull-4 {
                   right: 33.33333333%
                 }
               
                 .col-sm-pull-3 {
                   right: 25%
                 }
               
                 .col-sm-pull-2 {
                   right: 16.66666667%
                 }
               
                 .col-sm-pull-1 {
                   right: 8.33333333%
                 }
               
                 .col-sm-pull-0 {
                   right: auto
                 }
               
                 .col-sm-push-12 {
                   left: 100%
                 }
               
                 .col-sm-push-11 {
                   left: 91.66666667%
                 }
               
                 .col-sm-push-10 {
                   left: 83.33333333%
                 }
               
                 .col-sm-push-9 {
                   left: 75%
                 }
               
                 .col-sm-push-8 {
                   left: 66.66666667%
                 }
               
                 .col-sm-push-7 {
                   left: 58.33333333%
                 }
               
                 .col-sm-push-6 {
                   left: 50%
                 }
               
                 .col-sm-push-5 {
                   left: 41.66666667%
                 }
               
                 .col-sm-push-4 {
                   left: 33.33333333%
                 }
               
                 .col-sm-push-3 {
                   left: 25%
                 }
               
                 .col-sm-push-2 {
                   left: 16.66666667%
                 }
               
                 .col-sm-push-1 {
                   left: 8.33333333%
                 }
               
                 .col-sm-push-0 {
                   left: auto
                 }
               
                 .col-sm-offset-12 {
                   margin-left: 100%
                 }
               
                 .col-sm-offset-11 {
                   margin-left: 91.66666667%
                 }
               
                 .col-sm-offset-10 {
                   margin-left: 83.33333333%
                 }
               
                 .col-sm-offset-9 {
                   margin-left: 75%
                 }
               
                 .col-sm-offset-8 {
                   margin-left: 66.66666667%
                 }
               
                 .col-sm-offset-7 {
                   margin-left: 58.33333333%
                 }
               
                 .col-sm-offset-6 {
                   margin-left: 50%
                 }
               
                 .col-sm-offset-5 {
                   margin-left: 41.66666667%
                 }
               
                 .col-sm-offset-4 {
                   margin-left: 33.33333333%
                 }
               
                 .col-sm-offset-3 {
                   margin-left: 25%
                 }
               
                 .col-sm-offset-2 {
                   margin-left: 16.66666667%
                 }
               
                 .col-sm-offset-1 {
                   margin-left: 8.33333333%
                 }
               
                 .col-sm-offset-0 {
                   margin-left: 0
                 }
               }
               
               @media (min-width:992px) {
               
                 .col-md-1,
                 .col-md-10,
                 .col-md-11,
                 .col-md-12,
                 .col-md-2,
                 .col-md-3,
                 .col-md-4,
                 .col-md-5,
                 .col-md-6,
                 .col-md-7,
                 .col-md-8,
                 .col-md-9 {
                   float: left
                 }
               
                 .col-md-12 {
                   width: 100%
                 }
               
                 .col-md-11 {
                   width: 91.66666667%
                 }
               
                 .col-md-10 {
                   width: 83.33333333%
                 }
               
                 .col-md-9 {
                   width: 75%
                 }
               
                 .col-md-8 {
                   width: 66.66666667%
                 }
               
                 .col-md-7 {
                   width: 58.33333333%
                 }
               
                 .col-md-6 {
                   width: 50%
                 }
               
                 .col-md-5 {
                   width: 41.66666667%
                 }
               
                 .col-md-4 {
                   width: 33.33333333%
                 }
               
                 .col-md-3 {
                   width: 25%
                 }
               
                 .col-md-2 {
                   width: 16.66666667%
                 }
               
                 .col-md-1 {
                   width: 8.33333333%
                 }
               
                 .col-md-pull-12 {
                   right: 100%
                 }
               
                 .col-md-pull-11 {
                   right: 91.66666667%
                 }
               
                 .col-md-pull-10 {
                   right: 83.33333333%
                 }
               
                 .col-md-pull-9 {
                   right: 75%
                 }
               
                 .col-md-pull-8 {
                   right: 66.66666667%
                 }
               
                 .col-md-pull-7 {
                   right: 58.33333333%
                 }
               
                 .col-md-pull-6 {
                   right: 50%
                 }
               
                 .col-md-pull-5 {
                   right: 41.66666667%
                 }
               
                 .col-md-pull-4 {
                   right: 33.33333333%
                 }
               
                 .col-md-pull-3 {
                   right: 25%
                 }
               
                 .col-md-pull-2 {
                   right: 16.66666667%
                 }
               
                 .col-md-pull-1 {
                   right: 8.33333333%
                 }
               
                 .col-md-pull-0 {
                   right: auto
                 }
               
                 .col-md-push-12 {
                   left: 100%
                 }
               
                 .col-md-push-11 {
                   left: 91.66666667%
                 }
               
                 .col-md-push-10 {
                   left: 83.33333333%
                 }
               
                 .col-md-push-9 {
                   left: 75%
                 }
               
                 .col-md-push-8 {
                   left: 66.66666667%
                 }
               
                 .col-md-push-7 {
                   left: 58.33333333%
                 }
               
                 .col-md-push-6 {
                   left: 50%
                 }
               
                 .col-md-push-5 {
                   left: 41.66666667%
                 }
               
                 .col-md-push-4 {
                   left: 33.33333333%
                 }
               
                 .col-md-push-3 {
                   left: 25%
                 }
               
                 .col-md-push-2 {
                   left: 16.66666667%
                 }
               
                 .col-md-push-1 {
                   left: 8.33333333%
                 }
               
                 .col-md-push-0 {
                   left: auto
                 }
               
                 .col-md-offset-12 {
                   margin-left: 100%
                 }
               
                 .col-md-offset-11 {
                   margin-left: 91.66666667%
                 }
               
                 .col-md-offset-10 {
                   margin-left: 83.33333333%
                 }
               
                 .col-md-offset-9 {
                   margin-left: 75%
                 }
               
                 .col-md-offset-8 {
                   margin-left: 66.66666667%
                 }
               
                 .col-md-offset-7 {
                   margin-left: 58.33333333%
                 }
               
                 .col-md-offset-6 {
                   margin-left: 50%
                 }
               
                 .col-md-offset-5 {
                   margin-left: 41.66666667%
                 }
               
                 .col-md-offset-4 {
                   margin-left: 33.33333333%
                 }
               
                 .col-md-offset-3 {
                   margin-left: 25%
                 }
               
                 .col-md-offset-2 {
                   margin-left: 16.66666667%
                 }
               
                 .col-md-offset-1 {
                   margin-left: 8.33333333%
                 }
               
                 .col-md-offset-0 {
                   margin-left: 0
                 }
               }
               
               @media (min-width:1200px) {
               
                 .col-lg-1,
                 .col-lg-10,
                 .col-lg-11,
                 .col-lg-12,
                 .col-lg-2,
                 .col-lg-3,
                 .col-lg-4,
                 .col-lg-5,
                 .col-lg-6,
                 .col-lg-7,
                 .col-lg-8,
                 .col-lg-9 {
                   float: left
                 }
               
                 .col-lg-12 {
                   width: 100%
                 }
               
                 .col-lg-11 {
                   width: 91.66666667%
                 }
               
                 .col-lg-10 {
                   width: 83.33333333%
                 }
               
                 .col-lg-9 {
                   width: 75%
                 }
               
                 .col-lg-8 {
                   width: 66.66666667%
                 }
               
                 .col-lg-7 {
                   width: 58.33333333%
                 }
               
                 .col-lg-6 {
                   width: 50%
                 }
               
                 .col-lg-5 {
                   width: 41.66666667%
                 }
               
                 .col-lg-4 {
                   width: 33.33333333%
                 }
               
                 .col-lg-3 {
                   width: 25%
                 }
               
                 .col-lg-2 {
                   width: 16.66666667%
                 }
               
                 .col-lg-1 {
                   width: 8.33333333%
                 }
               
                 .col-lg-pull-12 {
                   right: 100%
                 }
               
                 .col-lg-pull-11 {
                   right: 91.66666667%
                 }
               
                 .col-lg-pull-10 {
                   right: 83.33333333%
                 }
               
                 .col-lg-pull-9 {
                   right: 75%
                 }
               
                 .col-lg-pull-8 {
                   right: 66.66666667%
                 }
               
                 .col-lg-pull-7 {
                   right: 58.33333333%
                 }
               
                 .col-lg-pull-6 {
                   right: 50%
                 }
               
                 .col-lg-pull-5 {
                   right: 41.66666667%
                 }
               
                 .col-lg-pull-4 {
                   right: 33.33333333%
                 }
               
                 .col-lg-pull-3 {
                   right: 25%
                 }
               
                 .col-lg-pull-2 {
                   right: 16.66666667%
                 }
               
                 .col-lg-pull-1 {
                   right: 8.33333333%
                 }
               
                 .col-lg-pull-0 {
                   right: auto
                 }
               
                 .col-lg-push-12 {
                   left: 100%
                 }
               
                 .col-lg-push-11 {
                   left: 91.66666667%
                 }
               
                 .col-lg-push-10 {
                   left: 83.33333333%
                 }
               
                 .col-lg-push-9 {
                   left: 75%
                 }
               
                 .col-lg-push-8 {
                   left: 66.66666667%
                 }
               
                 .col-lg-push-7 {
                   left: 58.33333333%
                 }
               
                 .col-lg-push-6 {
                   left: 50%
                 }
               
                 .col-lg-push-5 {
                   left: 41.66666667%
                 }
               
                 .col-lg-push-4 {
                   left: 33.33333333%
                 }
               
                 .col-lg-push-3 {
                   left: 25%
                 }
               
                 .col-lg-push-2 {
                   left: 16.66666667%
                 }
               
                 .col-lg-push-1 {
                   left: 8.33333333%
                 }
               
                 .col-lg-push-0 {
                   left: auto
                 }
               
                 .col-lg-offset-12 {
                   margin-left: 100%
                 }
               
                 .col-lg-offset-11 {
                   margin-left: 91.66666667%
                 }
               
                 .col-lg-offset-10 {
                   margin-left: 83.33333333%
                 }
               
                 .col-lg-offset-9 {
                   margin-left: 75%
                 }
               
                 .col-lg-offset-8 {
                   margin-left: 66.66666667%
                 }
               
                 .col-lg-offset-7 {
                   margin-left: 58.33333333%
                 }
               
                 .col-lg-offset-6 {
                   margin-left: 50%
                 }
               
                 .col-lg-offset-5 {
                   margin-left: 41.66666667%
                 }
               
                 .col-lg-offset-4 {
                   margin-left: 33.33333333%
                 }
               
                 .col-lg-offset-3 {
                   margin-left: 25%
                 }
               
                 .col-lg-offset-2 {
                   margin-left: 16.66666667%
                 }
               
                 .col-lg-offset-1 {
                   margin-left: 8.33333333%
                 }
               
                 .col-lg-offset-0 {
                   margin-left: 0
                 }
               }
               
               table {
                 background-color: transparent
               }
               
               caption {
                 padding-top: 8px;
                 padding-bottom: 8px;
                 color: #777;
                 text-align: left
               }
               
               th {
                 text-align: left
               }
               
               .table {
                 width: 100%;
                 max-width: 100%;
                 margin-bottom: 20px
               }
               
               .table>tbody>tr>td,
               .table>tbody>tr>th,
               .table>tfoot>tr>td,
               .table>tfoot>tr>th,
               .table>thead>tr>td,
               .table>thead>tr>th {
                 padding: 8px;
                 line-height: 1.42857143;
                 vertical-align: top;
                 border-top: 1px solid #ddd
               }
               
               .table>thead>tr>th {
                 vertical-align: bottom;
                 border-bottom: 2px solid #ddd
               }
               
               .table>caption+thead>tr:first-child>td,
               .table>caption+thead>tr:first-child>th,
               .table>colgroup+thead>tr:first-child>td,
               .table>colgroup+thead>tr:first-child>th,
               .table>thead:first-child>tr:first-child>td,
               .table>thead:first-child>tr:first-child>th {
                 border-top: 0
               }
               
               .table>tbody+tbody {
                 border-top: 2px solid #ddd
               }
               
               .table .table {
                 background-color: #fff
               }
               
               .table-condensed>tbody>tr>td,
               .table-condensed>tbody>tr>th,
               .table-condensed>tfoot>tr>td,
               .table-condensed>tfoot>tr>th,
               .table-condensed>thead>tr>td,
               .table-condensed>thead>tr>th {
                 padding: 5px
               }
               
               .table-bordered {
                 border: 1px solid #ddd
               }
               
               .table-bordered>tbody>tr>td,
               .table-bordered>tbody>tr>th,
               .table-bordered>tfoot>tr>td,
               .table-bordered>tfoot>tr>th,
               .table-bordered>thead>tr>td,
               .table-bordered>thead>tr>th {
                 border: 1px solid #ddd
               }
               
               .table-bordered>thead>tr>td,
               .table-bordered>thead>tr>th {
                 border-bottom-width: 2px
               }
               
               .table-striped>tbody>tr:nth-of-type(odd) {
                 background-color: #f9f9f9
               }
               
               .table-hover>tbody>tr:hover {
                 background-color: #f5f5f5
               }
               
               table col[class*=col-] {
                 position: static;
                 display: table-column;
                 float: none
               }
               
               table td[class*=col-],
               table th[class*=col-] {
                 position: static;
                 display: table-cell;
                 float: none
               }
               
               .table>tbody>tr.active>td,
               .table>tbody>tr.active>th,
               .table>tbody>tr>td.active,
               .table>tbody>tr>th.active,
               .table>tfoot>tr.active>td,
               .table>tfoot>tr.active>th,
               .table>tfoot>tr>td.active,
               .table>tfoot>tr>th.active,
               .table>thead>tr.active>td,
               .table>thead>tr.active>th,
               .table>thead>tr>td.active,
               .table>thead>tr>th.active {
                 background-color: #f5f5f5
               }
               
               .table-hover>tbody>tr.active:hover>td,
               .table-hover>tbody>tr.active:hover>th,
               .table-hover>tbody>tr:hover>.active,
               .table-hover>tbody>tr>td.active:hover,
               .table-hover>tbody>tr>th.active:hover {
                 background-color: #e8e8e8
               }
               
               .table>tbody>tr.success>td,
               .table>tbody>tr.success>th,
               .table>tbody>tr>td.success,
               .table>tbody>tr>th.success,
               .table>tfoot>tr.success>td,
               .table>tfoot>tr.success>th,
               .table>tfoot>tr>td.success,
               .table>tfoot>tr>th.success,
               .table>thead>tr.success>td,
               .table>thead>tr.success>th,
               .table>thead>tr>td.success,
               .table>thead>tr>th.success {
                 background-color: #dff0d8
               }
               
               .table-hover>tbody>tr.success:hover>td,
               .table-hover>tbody>tr.success:hover>th,
               .table-hover>tbody>tr:hover>.success,
               .table-hover>tbody>tr>td.success:hover,
               .table-hover>tbody>tr>th.success:hover {
                 background-color: #d0e9c6
               }
               
               .table>tbody>tr.info>td,
               .table>tbody>tr.info>th,
               .table>tbody>tr>td.info,
               .table>tbody>tr>th.info,
               .table>tfoot>tr.info>td,
               .table>tfoot>tr.info>th,
               .table>tfoot>tr>td.info,
               .table>tfoot>tr>th.info,
               .table>thead>tr.info>td,
               .table>thead>tr.info>th,
               .table>thead>tr>td.info,
               .table>thead>tr>th.info {
                 background-color: #d9edf7
               }
               
               .table-hover>tbody>tr.info:hover>td,
               .table-hover>tbody>tr.info:hover>th,
               .table-hover>tbody>tr:hover>.info,
               .table-hover>tbody>tr>td.info:hover,
               .table-hover>tbody>tr>th.info:hover {
                 background-color: #c4e3f3
               }
               
               .table>tbody>tr.warning>td,
               .table>tbody>tr.warning>th,
               .table>tbody>tr>td.warning,
               .table>tbody>tr>th.warning,
               .table>tfoot>tr.warning>td,
               .table>tfoot>tr.warning>th,
               .table>tfoot>tr>td.warning,
               .table>tfoot>tr>th.warning,
               .table>thead>tr.warning>td,
               .table>thead>tr.warning>th,
               .table>thead>tr>td.warning,
               .table>thead>tr>th.warning {
                 background-color: #fcf8e3
               }
               
               .table-hover>tbody>tr.warning:hover>td,
               .table-hover>tbody>tr.warning:hover>th,
               .table-hover>tbody>tr:hover>.warning,
               .table-hover>tbody>tr>td.warning:hover,
               .table-hover>tbody>tr>th.warning:hover {
                 background-color: #faf2cc
               }
               
               .table>tbody>tr.danger>td,
               .table>tbody>tr.danger>th,
               .table>tbody>tr>td.danger,
               .table>tbody>tr>th.danger,
               .table>tfoot>tr.danger>td,
               .table>tfoot>tr.danger>th,
               .table>tfoot>tr>td.danger,
               .table>tfoot>tr>th.danger,
               .table>thead>tr.danger>td,
               .table>thead>tr.danger>th,
               .table>thead>tr>td.danger,
               .table>thead>tr>th.danger {
                 background-color: #f2dede
               }
               
               .table-hover>tbody>tr.danger:hover>td,
               .table-hover>tbody>tr.danger:hover>th,
               .table-hover>tbody>tr:hover>.danger,
               .table-hover>tbody>tr>td.danger:hover,
               .table-hover>tbody>tr>th.danger:hover {
                 background-color: #ebcccc
               }
               
               .table-responsive {
                 min-height: .01%;
                 overflow-x: auto
               }
               
               @media screen and (max-width:767px) {
                 .table-responsive {
                   width: 100%;
                   margin-bottom: 15px;
                   overflow-y: hidden;
                   -ms-overflow-style: -ms-autohiding-scrollbar;
                   border: 1px solid #ddd
                 }
               
                 .table-responsive>.table {
                   margin-bottom: 0
                 }
               
                 .table-responsive>.table>tbody>tr>td,
                 .table-responsive>.table>tbody>tr>th,
                 .table-responsive>.table>tfoot>tr>td,
                 .table-responsive>.table>tfoot>tr>th,
                 .table-responsive>.table>thead>tr>td,
                 .table-responsive>.table>thead>tr>th {
                   white-space: nowrap
                 }
               
                 .table-responsive>.table-bordered {
                   border: 0
                 }
               
                 .table-responsive>.table-bordered>tbody>tr>td:first-child,
                 .table-responsive>.table-bordered>tbody>tr>th:first-child,
                 .table-responsive>.table-bordered>tfoot>tr>td:first-child,
                 .table-responsive>.table-bordered>tfoot>tr>th:first-child,
                 .table-responsive>.table-bordered>thead>tr>td:first-child,
                 .table-responsive>.table-bordered>thead>tr>th:first-child {
                   border-left: 0
                 }
               
                 .table-responsive>.table-bordered>tbody>tr>td:last-child,
                 .table-responsive>.table-bordered>tbody>tr>th:last-child,
                 .table-responsive>.table-bordered>tfoot>tr>td:last-child,
                 .table-responsive>.table-bordered>tfoot>tr>th:last-child,
                 .table-responsive>.table-bordered>thead>tr>td:last-child,
                 .table-responsive>.table-bordered>thead>tr>th:last-child {
                   border-right: 0
                 }
               
                 .table-responsive>.table-bordered>tbody>tr:last-child>td,
                 .table-responsive>.table-bordered>tbody>tr:last-child>th,
                 .table-responsive>.table-bordered>tfoot>tr:last-child>td,
                 .table-responsive>.table-bordered>tfoot>tr:last-child>th {
                   border-bottom: 0
                 }
               }
               
               fieldset {
                 min-width: 0;
                 padding: 0;
                 margin: 0;
                 border: 0
               }
               
               legend {
                 display: block;
                 width: 100%;
                 padding: 0;
                 margin-bottom: 20px;
                 font-size: 21px;
                 line-height: inherit;
                 color: #333;
                 border: 0;
                 border-bottom: 1px solid #e5e5e5
               }
               
               
               output {
                 display: block;
                 padding-top: 7px;
                 font-size: 14px;
                 line-height: 1.42857143;
                 color: #555
               }
               
               @media screen and (-webkit-min-device-pixel-ratio:0) {
               
                 input[type=date].form-control,
                 input[type=time].form-control,
                 input[type=datetime-local].form-control,
                 input[type=month].form-control {
                   line-height: 34px
                 }
               
                 .input-group-sm input[type=date],
                 .input-group-sm input[type=time],
                 .input-group-sm input[type=datetime-local],
                 .input-group-sm input[type=month],
                 input[type=date].input-sm,
                 input[type=time].input-sm,
                 input[type=datetime-local].input-sm,
                 input[type=month].input-sm {
                   line-height: 30px
                 }
               
                 .input-group-lg input[type=date],
                 .input-group-lg input[type=time],
                 .input-group-lg input[type=datetime-local],
                 .input-group-lg input[type=month],
                 input[type=date].input-lg,
                 input[type=time].input-lg,
                 input[type=datetime-local].input-lg,
                 input[type=month].input-lg {
                   line-height: 46px
                 }
               }
               
               
               @media (min-width:768px) {
                 .form-horizontal .form-group-sm .control-label {
                   padding-top: 6px;
                   font-size: 12px
                 }
               }
               
               
               
               .fade {
                 opacity: 0;
                 -webkit-transition: opacity .15s linear;
                 -o-transition: opacity .15s linear;
                 transition: opacity .15s linear
               }
               
               .fade.in {
                 opacity: 1
               }
               
               .collapse {
                 display: none
               }
               
               .collapse.in {
                 display: block
               }
               
               tr.collapse.in {
                 display: table-row
               }
               
               tbody.collapse.in {
                 display: table-row-group
               }
               
               .collapsing {
                 position: relative;
                 height: 0;
                 overflow: hidden;
                 -webkit-transition-timing-function: ease;
                 -o-transition-timing-function: ease;
                 transition-timing-function: ease;
                 -webkit-transition-duration: .35s;
                 -o-transition-duration: .35s;
                 transition-duration: .35s;
                 -webkit-transition-property: height, visibility;
                 -o-transition-property: height, visibility;
                 transition-property: height, visibility
               }
               
               .caret {
                 display: inline-block;
                 width: 0;
                 height: 0;
                 margin-left: 2px;
                 vertical-align: middle;
                 border-top: 4px dashed;
                 border-top: 4px solid\9;
                 border-right: 4px solid transparent;
                 border-left: 4px solid transparent
               }
               
               .dropdown,
               .dropup {
                 position: relative
               }
               
               .dropdown-toggle:focus {
                 outline: 0
               }
               
               .dropdown-menu {
                 position: absolute;
                 top: 100%;
                 left: 0;
                 z-index: 1000;
                 display: none;
                 float: left;
                 min-width: 160px;
                 padding: 5px 0;
                 margin: 2px 0 0;
                 font-size: 14px;
                 text-align: left;
                 list-style: none;
                 background-color: #fff;
                 -webkit-background-clip: padding-box;
                 background-clip: padding-box;
                 border: 1px solid #ccc;
                 border: 1px solid rgba(0, 0, 0, .15);
                 border-radius: 4px;
                 -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
                 box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
               }
               
               .dropdown-menu.pull-right {
                 right: 0;
                 left: auto
               }
               
               .dropdown-menu .divider {
                 height: 1px;
                 margin: 9px 0;
                 overflow: hidden;
                 background-color: #e5e5e5
               }
               
               .dropdown-menu>li>a {
                 display: block;
                 padding: 3px 20px;
                 clear: both;
                 font-weight: 400;
                 line-height: 1.42857143;
                 color: #333;
                 white-space: nowrap
               }
               
               .dropdown-menu>li>a:focus,
               .dropdown-menu>li>a:hover {
                 color: #262626;
                 text-decoration: none;
                 background-color: #f5f5f5
               }
               
               .dropdown-menu>.active>a,
               .dropdown-menu>.active>a:focus,
               .dropdown-menu>.active>a:hover {
                 color: #fff;
                 text-decoration: none;
                 background-color: #337ab7;
                 outline: 0
               }
               
               .dropdown-menu>.disabled>a,
               .dropdown-menu>.disabled>a:focus,
               .dropdown-menu>.disabled>a:hover {
                 color: #777
               }
               
               .dropdown-menu>.disabled>a:focus,
               .dropdown-menu>.disabled>a:hover {
                 text-decoration: none;
                 cursor: not-allowed;
                 background-color: transparent;
                 background-image: none;
                 filter: progid:DXImageTransform.Microsoft.gradient(enabled=false)
               }
               
               .open>.dropdown-menu {
                 display: block
               }
               
               .open>a {
                 outline: 0
               }
               
               .dropdown-menu-right {
                 right: 0;
                 left: auto
               }
               
               .dropdown-menu-left {
                 right: auto;
                 left: 0
               }
               
               .dropdown-header {
                 display: block;
                 padding: 3px 20px;
                 font-size: 12px;
                 line-height: 1.42857143;
                 color: #777;
                 white-space: nowrap
               }
               
               .dropdown-backdrop {
                 position: fixed;
                 top: 0;
                 right: 0;
                 bottom: 0;
                 left: 0;
                 z-index: 990
               }
               
               .pull-right>.dropdown-menu {
                 right: 0;
                 left: auto
               }
               
               .dropup .caret,
               .navbar-fixed-bottom .dropdown .caret {
                 content: "";
                 border-top: 0;
                 border-bottom: 4px dashed;
                 border-bottom: 4px solid\9
               }
               
               .dropup .dropdown-menu,
               .navbar-fixed-bottom .dropdown .dropdown-menu {
                 top: auto;
                 bottom: 100%;
                 margin-bottom: 2px
               }
               
               @media (min-width:768px) {
                 .navbar-right .dropdown-menu {
                   right: 0;
                   left: auto
                 }
               
                 .navbar-right .dropdown-menu-left {
                   right: auto;
                   left: 0
                 }
               }
               
               .btn-group,
               .btn-group-vertical {
                 position: relative;
                 display: inline-block;
                 vertical-align: middle
               }
               
               .btn-group-vertical>.btn,
               .btn-group>.btn {
                 position: relative;
                 float: left
               }
               
               .btn-group-vertical>.btn.active,
               .btn-group-vertical>.btn:active,
               .btn-group-vertical>.btn:focus,
               .btn-group-vertical>.btn:hover,
               .btn-group>.btn.active,
               .btn-group>.btn:active,
               .btn-group>.btn:focus,
               .btn-group>.btn:hover {
                 z-index: 2
               }
               
               .btn-group .btn+.btn,
               .btn-group .btn+.btn-group,
               .btn-group .btn-group+.btn,
               .btn-group .btn-group+.btn-group {
                 margin-left: -1px
               }
               
               .btn-toolbar {
                 margin-left: -5px
               }
               
               .btn-toolbar .btn,
               .btn-toolbar .btn-group,
               .btn-toolbar .input-group {
                 float: left
               }
               
               .btn-toolbar>.btn,
               .btn-toolbar>.btn-group,
               .btn-toolbar>.input-group {
                 margin-left: 5px
               }
               
               .btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
                 border-radius: 0
               }
               
               .btn-group>.btn:first-child {
                 margin-left: 0
               }
               
               .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
                 border-top-right-radius: 0;
                 border-bottom-right-radius: 0
               }
               
               .btn-group>.btn:last-child:not(:first-child),
               .btn-group>.dropdown-toggle:not(:first-child) {
                 border-top-left-radius: 0;
                 border-bottom-left-radius: 0
               }
               
               .btn-group>.btn-group {
                 float: left
               }
               
               .btn-group>.btn-group:not(:first-child):not(:last-child)>.btn {
                 border-radius: 0
               }
               
               .btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,
               .btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle {
                 border-top-right-radius: 0;
                 border-bottom-right-radius: 0
               }
               
               .btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child {
                 border-top-left-radius: 0;
                 border-bottom-left-radius: 0
               }
               
               .btn-group .dropdown-toggle:active,
               .btn-group.open .dropdown-toggle {
                 outline: 0
               }
               
               .btn-group>.btn+.dropdown-toggle {
                 padding-right: 8px;
                 padding-left: 8px
               }
               
               .btn-group>.btn-lg+.dropdown-toggle {
                 padding-right: 12px;
                 padding-left: 12px
               }
               
               .btn-group.open .dropdown-toggle {
                 -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
                 box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125)
               }
               
               .btn-group.open .dropdown-toggle.btn-link {
                 -webkit-box-shadow: none;
                 box-shadow: none
               }
               
               .btn .caret {
                 margin-left: 0
               }
               
               .btn-lg .caret {
                 border-width: 5px 5px 0;
                 border-bottom-width: 0
               }
               
               .dropup .btn-lg .caret {
                 border-width: 0 5px 5px
               }
               
               .btn-group-vertical>.btn,
               .btn-group-vertical>.btn-group,
               .btn-group-vertical>.btn-group>.btn {
                 display: block;
                 float: none;
                 width: 100%;
                 max-width: 100%
               }
               
               .btn-group-vertical>.btn-group>.btn {
                 float: none
               }
               
               .btn-group-vertical>.btn+.btn,
               .btn-group-vertical>.btn+.btn-group,
               .btn-group-vertical>.btn-group+.btn,
               .btn-group-vertical>.btn-group+.btn-group {
                 margin-top: -1px;
                 margin-left: 0
               }
               
               .btn-group-vertical>.btn:not(:first-child):not(:last-child) {
                 border-radius: 0
               }
               
               .btn-group-vertical>.btn:first-child:not(:last-child) {
                 border-top-left-radius: 4px;
                 border-top-right-radius: 4px;
                 border-bottom-right-radius: 0;
                 border-bottom-left-radius: 0
               }
               
               .btn-group-vertical>.btn:last-child:not(:first-child) {
                 border-top-left-radius: 0;
                 border-top-right-radius: 0;
                 border-bottom-right-radius: 4px;
                 border-bottom-left-radius: 4px
               }
               
               .btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn {
                 border-radius: 0
               }
               
               .btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,
               .btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle {
                 border-bottom-right-radius: 0;
                 border-bottom-left-radius: 0
               }
               
               .btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child {
                 border-top-left-radius: 0;
                 border-top-right-radius: 0
               }
               
               .btn-group-justified {
                 display: table;
                 width: 100%;
                 table-layout: fixed;
                 border-collapse: separate
               }
               
               .btn-group-justified>.btn,
               .btn-group-justified>.btn-group {
                 display: table-cell;
                 float: none;
                 width: 1%
               }
               
               .btn-group-justified>.btn-group .btn {
                 width: 100%
               }
               
               .btn-group-justified>.btn-group .dropdown-menu {
                 left: auto
               }
               
               /* [data-toggle=buttons]>.btn input[type=checkbox],
               [data-toggle=buttons]>.btn input[type=radio],
               [data-toggle=buttons]>.btn-group>.btn input[type=checkbox],
               [data-toggle=buttons]>.btn-group>.btn input[type=radio] {
                 position: absolute;
                 clip: rect(0, 0, 0, 0);
                 pointer-events: none
               } */
               
               .input-group {
                 /* position: relative;
                 display: table;
                 border-collapse: separate */
               }
               
               .input-group[class*=col-] {
                 float: none;
                 padding-right: 0;
                 padding-left: 0
               }
               
               .input-group .form-control {
                 position: relative;
                 z-index: 2;
                 float: left;
                 width: 100%;
                 margin-bottom: 0
               }
               
               .input-group .form-control:focus {
                 z-index: 3
               }
               
               .input-group-lg>.form-control,
               .input-group-lg>.input-group-addon,
               .input-group-lg>.input-group-btn>.btn {
                 height: 46px;
                 padding: 10px 16px;
                 font-size: 18px;
                 line-height: 1.3333333;
                 border-radius: 6px
               }
               
               .input-group-sm>.form-control,
               .input-group-sm>.input-group-addon,
               .input-group-sm>.input-group-btn>.btn {
                 height: 30px;
                 padding: 5px 10px;
                 font-size: 12px;
                 line-height: 1.5;
                 border-radius: 3px
               }
               
               .nav {
                 padding-left: 0;
                 margin-bottom: 0;
                 list-style: none
               }
               
               .nav>li {
                 position: relative;
                 display: block
               }
               
               .nav>li>a {
                 position: relative;
                 display: block;
                 padding: 10px 15px
               }
               
               .nav>li>a:focus,
               .nav>li>a:hover {
                 text-decoration: none;
                 background-color: #eee
               }
               
               .nav>li.disabled>a {
                 color: #777
               }
               
               .nav>li.disabled>a:focus,
               .nav>li.disabled>a:hover {
                 color: #777;
                 text-decoration: none;
                 cursor: not-allowed;
                 background-color: transparent
               }
               
               .nav .open>a,
               .nav .open>a:focus,
               .nav .open>a:hover {
                 background-color: #eee;
                 border-color: #337ab7
               }
               
               .nav .nav-divider {
                 height: 1px;
                 margin: 9px 0;
                 overflow: hidden;
                 background-color: #e5e5e5
               }
               
               .nav>li>a>img {
                 max-width: none
               }
               
               .nav-tabs {
                 border-bottom: 1px solid #ddd
               }
               
               .nav-tabs>li {
                 float: left;
                 margin-bottom: -1px
               }
               
               .nav-tabs>li>a {
                 margin-right: 2px;
                 line-height: 1.42857143;
                 border: 1px solid transparent;
                 border-radius: 4px 4px 0 0
               }
               
               .nav-tabs>li>a:hover {
                 border-color: #eee #eee #ddd
               }
               
               .nav-tabs>li.active>a,
               .nav-tabs>li.active>a:focus,
               .nav-tabs>li.active>a:hover {
                 color: #555;
                 cursor: default;
                 background-color: #fff;
                 border: 1px solid #ddd;
                 border-bottom-color: transparent
               }
               
               .nav-tabs.nav-justified {
                 width: 100%;
                 border-bottom: 0
               }
               
               .nav-tabs.nav-justified>li {
                 float: none
               }
               
               .nav-tabs.nav-justified>li>a {
                 margin-bottom: 5px;
                 text-align: center
               }
               
               .nav-tabs.nav-justified>.dropdown .dropdown-menu {
                 top: auto;
                 left: auto
               }
               
               @media (min-width:768px) {
                 .nav-tabs.nav-justified>li {
                   display: table-cell;
                   width: 1%
                 }
               
                 .nav-tabs.nav-justified>li>a {
                   margin-bottom: 0
                 }
               }
               
               .nav-tabs.nav-justified>li>a {
                 margin-right: 0;
                 border-radius: 4px
               }
               
               .nav-tabs.nav-justified>.active>a,
               .nav-tabs.nav-justified>.active>a:focus,
               .nav-tabs.nav-justified>.active>a:hover {
                 border: 1px solid #ddd
               }
               
               @media (min-width:768px) {
                 .nav-tabs.nav-justified>li>a {
                   border-bottom: 1px solid #ddd;
                   border-radius: 4px 4px 0 0
                 }
               
                 .nav-tabs.nav-justified>.active>a,
                 .nav-tabs.nav-justified>.active>a:focus,
                 .nav-tabs.nav-justified>.active>a:hover {
                   border-bottom-color: #fff
                 }
               }
               
               .nav-pills>li {
                 float: left
               }
               
               .nav-pills>li>a {
                 border-radius: 4px
               }
               
               .nav-pills>li+li {
                 margin-left: 2px
               }
               
               .nav-pills>li.active>a,
               .nav-pills>li.active>a:focus,
               .nav-pills>li.active>a:hover {
                 color: #fff;
                 background-color: #337ab7
               }
               
               .nav-stacked>li {
                 float: none
               }
               
               .nav-stacked>li+li {
                 margin-top: 2px;
                 margin-left: 0
               }
               
               .nav-justified {
                 width: 100%
               }
               
               .nav-justified>li {
                 float: none
               }
               
               .nav-justified>li>a {
                 margin-bottom: 5px;
                 text-align: center
               }
               
               .nav-justified>.dropdown .dropdown-menu {
                 top: auto;
                 left: auto
               }
               
               @media (min-width:768px) {
                 .nav-justified>li {
                   display: table-cell;
                   width: 1%
                 }
               
                 .nav-justified>li>a {
                   margin-bottom: 0
                 }
               }
               
               .nav-tabs-justified {
                 border-bottom: 0
               }
               
               .nav-tabs-justified>li>a {
                 margin-right: 0;
                 border-radius: 4px
               }
               
               .nav-tabs-justified>.active>a,
               .nav-tabs-justified>.active>a:focus,
               .nav-tabs-justified>.active>a:hover {
                 border: 1px solid #ddd
               }
               
               @media (min-width:768px) {
                 .nav-tabs-justified>li>a {
                   border-bottom: 1px solid #ddd;
                   border-radius: 4px 4px 0 0
                 }
               
                 .nav-tabs-justified>.active>a,
                 .nav-tabs-justified>.active>a:focus,
                 .nav-tabs-justified>.active>a:hover {
                   border-bottom-color: #fff
                 }
               }
               
               .tab-content>.tab-pane {
                 display: none
               }
               
               .tab-content>.active {
                 display: block
               }
               
               .nav-tabs .dropdown-menu {
                 margin-top: -1px;
                 border-top-left-radius: 0;
                 border-top-right-radius: 0
               }
               
               .navbar {
                 position: relative;
                 min-height: 50px;
                 margin-bottom: 20px;
                 border: 1px solid transparent
               }
               
               @media (min-width:768px) {
                 .navbar {
                   border-radius: 4px
                 }
               }
               
               @media (min-width:768px) {
                 .navbar-header {
                   float: left
                 }
               }
               
               .navbar-collapse {
                 padding-right: 15px;
                 padding-left: 15px;
                 overflow-x: visible;
                 -webkit-overflow-scrolling: touch;
                 border-top: 1px solid transparent;
                 -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
                 box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1)
               }
               
               .navbar-collapse.in {
                 overflow-y: auto
               }
               
               @media (min-width:768px) {
                 .navbar-collapse {
                   width: auto;
                   border-top: 0;
                   -webkit-box-shadow: none;
                   box-shadow: none
                 }
               
                 .navbar-collapse.collapse {
                   display: block !important;
                   height: auto !important;
                   padding-bottom: 0;
                   overflow: visible !important
                 }
               
                 .navbar-collapse.in {
                   overflow-y: visible
                 }
               
                 .navbar-fixed-bottom .navbar-collapse,
                 .navbar-fixed-top .navbar-collapse,
                 .navbar-static-top .navbar-collapse {
                   padding-right: 0;
                   padding-left: 0
                 }
               }
               
               .navbar-fixed-bottom .navbar-collapse,
               .navbar-fixed-top .navbar-collapse {
                 max-height: 340px
               }
               
               @media (max-device-width:480px) and (orientation:landscape) {
               
                 .navbar-fixed-bottom .navbar-collapse,
                 .navbar-fixed-top .navbar-collapse {
                   max-height: 200px
                 }
               }
               
               .container-fluid>.navbar-collapse,
               .container-fluid>.navbar-header,
               .container>.navbar-collapse,
               .container>.navbar-header {
                 margin-right: -15px;
                 margin-left: -15px
               }
               
               @media (min-width:768px) {
               
                 .container-fluid>.navbar-collapse,
                 .container-fluid>.navbar-header,
                 .container>.navbar-collapse,
                 .container>.navbar-header {
                   margin-right: 0;
                   margin-left: 0
                 }
               }
               
               .navbar-static-top {
                 z-index: 1000;
                 border-width: 0 0 1px
               }
               
               @media (min-width:768px) {
                 .navbar-static-top {
                   border-radius: 0
                 }
               }
               
               .navbar-fixed-bottom,
               .navbar-fixed-top {
                 position: fixed;
                 right: 0;
                 left: 0;
                 z-index: 1030
               }
               
               @media (min-width:768px) {
               
                 .navbar-fixed-bottom,
                 .navbar-fixed-top {
                   border-radius: 0
                 }
               }
               
               .navbar-fixed-top {
                 top: 0;
                 border-width: 0 0 1px
               }
               
               .navbar-fixed-bottom {
                 bottom: 0;
                 margin-bottom: 0;
                 border-width: 1px 0 0
               }
               
               .navbar-brand {
                 float: left;
                 height: 50px;
                 padding: 15px 15px;
                 font-size: 18px;
                 line-height: 20px
               }
               
               .navbar-brand:focus,
               .navbar-brand:hover {
                 text-decoration: none
               }
               
               .navbar-brand>img {
                 display: block
               }
               
               @media (min-width:768px) {
               
                 .navbar>.container .navbar-brand,
                 .navbar>.container-fluid .navbar-brand {
                   margin-left: -15px
                 }
               }
               
               .navbar-toggle {
                 position: relative;
                 float: right;
                 padding: 9px 10px;
                 margin-top: 8px;
                 margin-right: 15px;
                 margin-bottom: 8px;
                 background-color: transparent;
                 background-image: none;
                 border: 1px solid transparent;
                 border-radius: 4px
               }
               
               .navbar-toggle:focus {
                 outline: 0
               }
               
               .navbar-toggle .icon-bar {
                 display: block;
                 width: 22px;
                 height: 2px;
                 border-radius: 1px
               }
               
               .navbar-toggle .icon-bar+.icon-bar {
                 margin-top: 4px
               }
               
               @media (min-width:768px) {
                 .navbar-toggle {
                   display: none
                 }
               }
               
               .navbar-nav {
                 margin: 7.5px -15px
               }
               
               .navbar-nav>li>a {
                 padding-top: 10px;
                 padding-bottom: 10px;
                 line-height: 20px
               }
               
               @media (max-width:767px) {
                 .navbar-nav .open .dropdown-menu {
                   position: static;
                   float: none;
                   width: auto;
                   margin-top: 0;
                   background-color: transparent;
                   border: 0;
                   -webkit-box-shadow: none;
                   box-shadow: none
                 }
               
                 .navbar-nav .open .dropdown-menu .dropdown-header,
                 .navbar-nav .open .dropdown-menu>li>a {
                   padding: 5px 15px 5px 25px
                 }
               
                 .navbar-nav .open .dropdown-menu>li>a {
                   line-height: 20px
                 }
               
                 .navbar-nav .open .dropdown-menu>li>a:focus,
                 .navbar-nav .open .dropdown-menu>li>a:hover {
                   background-image: none
                 }
               }
               
               @media (min-width:768px) {
                 .navbar-nav {
                   float: left;
                   margin: 0
                 }
               
                 .navbar-nav>li {
                   float: left
                 }
               
                 .navbar-nav>li>a {
                   padding-top: 15px;
                   padding-bottom: 15px
                 }
               }
               
               .navbar-form {
                 padding: 10px 15px;
                 margin-top: 8px;
                 margin-right: -15px;
                 margin-bottom: 8px;
                 margin-left: -15px;
                 border-top: 1px solid transparent;
                 border-bottom: 1px solid transparent;
                 -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);
                 box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1)
               }
               
               @media (min-width:768px) {
                 .navbar-form .form-group {
                   display: inline-block;
                   margin-bottom: 0;
                   vertical-align: middle
                 }
               
                 .navbar-form .form-control {
                   display: inline-block;
                   width: auto;
                   vertical-align: middle
                 }
               
                 .navbar-form .form-control-static {
                   display: inline-block
                 }
               
                 .navbar-form .input-group {
                   display: inline-table;
                   vertical-align: middle
                 }
               
                 .navbar-form .input-group .form-control,
                 .navbar-form .input-group .input-group-addon,
                 .navbar-form .input-group .input-group-btn {
                   width: auto
                 }
               
                 .navbar-form .input-group>.form-control {
                   width: 100%
                 }
               
                 .navbar-form .control-label {
                   margin-bottom: 0;
                   vertical-align: middle
                 }
               
               
                 .navbar-form .has-feedback .form-control-feedback {
                   top: 0
                 }
               }
               
               @media (max-width:767px) {
                 .navbar-form .form-group {
                   margin-bottom: 5px
                 }
               
                 .navbar-form .form-group:last-child {
                   margin-bottom: 0
                 }
               }
               
               @media (min-width:768px) {
                 .navbar-form {
                   width: auto;
                   padding-top: 0;
                   padding-bottom: 0;
                   margin-right: 0;
                   margin-left: 0;
                   border: 0;
                   -webkit-box-shadow: none;
                   box-shadow: none
                 }
               }
               
               .navbar-nav>li>.dropdown-menu {
                 margin-top: 0;
                 border-top-left-radius: 0;
                 border-top-right-radius: 0
               }
               
               .navbar-fixed-bottom .navbar-nav>li>.dropdown-menu {
                 margin-bottom: 0;
                 border-top-left-radius: 4px;
                 border-top-right-radius: 4px;
                 border-bottom-right-radius: 0;
                 border-bottom-left-radius: 0
               }
               
               .navbar-btn {
                 margin-top: 8px;
                 margin-bottom: 8px
               }
               
               .navbar-btn.btn-sm {
                 margin-top: 10px;
                 margin-bottom: 10px
               }
               
               .navbar-btn.btn-xs {
                 margin-top: 14px;
                 margin-bottom: 14px
               }
               
               .navbar-text {
                 margin-top: 15px;
                 margin-bottom: 15px
               }
               
               @media (min-width:768px) {
                 .navbar-text {
                   float: left;
                   margin-right: 15px;
                   margin-left: 15px
                 }
               }
               
               @media (min-width:768px) {
                 .navbar-left {
                   float: left !important
                 }
               
                 .navbar-right {
                   float: right !important;
                   margin-right: -15px
                 }
               
                 .navbar-right~.navbar-right {
                   margin-right: 0
                 }
               }
               
               .navbar-default {
                 background-color: #f8f8f8;
                 border-color: #e7e7e7
               }
               
               .navbar-default .navbar-brand {
                 color: #777
               }
               
               .navbar-default .navbar-brand:focus,
               .navbar-default .navbar-brand:hover {
                 color: #5e5e5e;
                 background-color: transparent
               }
               
               .navbar-default .navbar-text {
                 color: #777
               }
               
               .navbar-default .navbar-nav>li>a {
                 color: #777
               }
               
               .navbar-default .navbar-nav>li>a:focus,
               .navbar-default .navbar-nav>li>a:hover {
                 color: #333;
                 background-color: transparent
               }
               
               .navbar-default .navbar-nav>.active>a,
               .navbar-default .navbar-nav>.active>a:focus,
               .navbar-default .navbar-nav>.active>a:hover {
                 color: #555;
                 background-color: #e7e7e7
               }
               
               .navbar-default .navbar-nav>.disabled>a,
               .navbar-default .navbar-nav>.disabled>a:focus,
               .navbar-default .navbar-nav>.disabled>a:hover {
                 color: #ccc;
                 background-color: transparent
               }
               
               .navbar-default .navbar-toggle {
                 border-color: #ddd
               }
               
               .navbar-default .navbar-toggle:focus,
               .navbar-default .navbar-toggle:hover {
                 background-color: #ddd
               }
               
               .navbar-default .navbar-toggle .icon-bar {
                 background-color: #888
               }
               
               .navbar-default .navbar-collapse,
               .navbar-default .navbar-form {
                 border-color: #e7e7e7
               }
               
               .navbar-default .navbar-nav>.open>a,
               .navbar-default .navbar-nav>.open>a:focus,
               .navbar-default .navbar-nav>.open>a:hover {
                 color: #555;
                 background-color: #e7e7e7
               }
               
               @media (max-width:767px) {
                 .navbar-default .navbar-nav .open .dropdown-menu>li>a {
                   color: #777
                 }
               
                 .navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,
                 .navbar-default .navbar-nav .open .dropdown-menu>li>a:hover {
                   color: #333;
                   background-color: transparent
                 }
               
                 .navbar-default .navbar-nav .open .dropdown-menu>.active>a,
                 .navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,
                 .navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover {
                   color: #555;
                   background-color: #e7e7e7
                 }
               
                 .navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,
                 .navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,
                 .navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover {
                   color: #ccc;
                   background-color: transparent
                 }
               }
               
               .navbar-default .navbar-link {
                 color: #777
               }
               
               .navbar-default .navbar-link:hover {
                 color: #333
               }
               
               .navbar-default .btn-link {
                 color: #777
               }
               
               .navbar-default .btn-link:focus,
               .navbar-default .btn-link:hover {
                 color: #333
               }
               
               .navbar-default .btn-link[disabled]:focus,
               .navbar-default .btn-link[disabled]:hover,
               fieldset[disabled] .navbar-default .btn-link:focus,
               fieldset[disabled] .navbar-default .btn-link:hover {
                 color: #ccc
               }
               
               .navbar-inverse {
                 background-color: #222;
                 border-color: #080808
               }
               
               .navbar-inverse .navbar-brand {
                 color: #9d9d9d
               }
               
               .navbar-inverse .navbar-brand:focus,
               .navbar-inverse .navbar-brand:hover {
                 color: #fff;
                 background-color: transparent
               }
               
               .navbar-inverse .navbar-text {
                 color: #9d9d9d
               }
               
               .navbar-inverse .navbar-nav>li>a {
                 color: #9d9d9d
               }
               
               .navbar-inverse .navbar-nav>li>a:focus,
               .navbar-inverse .navbar-nav>li>a:hover {
                 color: #fff;
                 background-color: transparent
               }
               
               .navbar-inverse .navbar-nav>.active>a,
               .navbar-inverse .navbar-nav>.active>a:focus,
               .navbar-inverse .navbar-nav>.active>a:hover {
                 color: #fff;
                 background-color: #080808
               }
               
               .navbar-inverse .navbar-nav>.disabled>a,
               .navbar-inverse .navbar-nav>.disabled>a:focus,
               .navbar-inverse .navbar-nav>.disabled>a:hover {
                 color: #444;
                 background-color: transparent
               }
               
               .navbar-inverse .navbar-toggle {
                 border-color: #333
               }
               
               .navbar-inverse .navbar-toggle:focus,
               .navbar-inverse .navbar-toggle:hover {
                 background-color: #333
               }
               
               .navbar-inverse .navbar-toggle .icon-bar {
                 background-color: #fff
               }
               
               .navbar-inverse .navbar-collapse,
               .navbar-inverse .navbar-form {
                 border-color: #101010
               }
               
               .navbar-inverse .navbar-nav>.open>a,
               .navbar-inverse .navbar-nav>.open>a:focus,
               .navbar-inverse .navbar-nav>.open>a:hover {
                 color: #fff;
                 background-color: #080808
               }
               
               @media (max-width:767px) {
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header {
                   border-color: #080808
                 }
               
                 .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
                   background-color: #080808
                 }
               
                 .navbar-inverse .navbar-nav .open .dropdown-menu>li>a {
                   color: #9d9d9d
                 }
               
                 .navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,
                 .navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover {
                   color: #fff;
                   background-color: transparent
                 }
               
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover {
                   color: #fff;
                   background-color: #080808
                 }
               
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,
                 .navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover {
                   color: #444;
                   background-color: transparent
                 }
               }
               
               .navbar-inverse .navbar-link {
                 color: #9d9d9d
               }
               
               .navbar-inverse .navbar-link:hover {
                 color: #fff
               }
               
               .navbar-inverse .btn-link {
                 color: #9d9d9d
               }
               
               .navbar-inverse .btn-link:focus,
               .navbar-inverse .btn-link:hover {
                 color: #fff
               }
               
               .navbar-inverse .btn-link[disabled]:focus,
               .navbar-inverse .btn-link[disabled]:hover,
               fieldset[disabled] .navbar-inverse .btn-link:focus,
               fieldset[disabled] .navbar-inverse .btn-link:hover {
                 color: #444
               }
               
               .breadcrumb {
                 padding: 8px 15px;
                 margin-bottom: 20px;
                 list-style: none;
                 background-color: #f5f5f5;
                 border-radius: 4px
               }
               
               .breadcrumb>li {
                 display: inline-block
               }
               
               .breadcrumb>li+li:before {
                 padding: 0 5px;
                 color: #ccc;
                 content: "/\\00a0"
               }
               
               .breadcrumb>.active {
                 color: #777
               }
               
               .pagination {
                 display: inline-block;
                 padding-left: 0;
                 margin: 20px 0;
                 border-radius: 4px
               }
               
               .pagination>li {
                 display: inline
               }
               
               .pagination>li>a,
               .pagination>li>span {
                 position: relative;
                 float: left;
                 padding: 6px 12px;
                 margin-left: -1px;
                 line-height: 1.42857143;
                 color: #337ab7;
                 text-decoration: none;
                 background-color: #fff;
                 border: 1px solid #ddd
               }
               
               .pagination>li:first-child>a,
               .pagination>li:first-child>span {
                 margin-left: 0;
                 border-top-left-radius: 4px;
                 border-bottom-left-radius: 4px
               }
               
               .pagination>li:last-child>a,
               .pagination>li:last-child>span {
                 border-top-right-radius: 4px;
                 border-bottom-right-radius: 4px
               }
               
               .pagination>li>a:focus,
               .pagination>li>a:hover,
               .pagination>li>span:focus,
               .pagination>li>span:hover {
                 z-index: 2;
                 color: #23527c;
                 background-color: #eee;
                 border-color: #ddd
               }
               
               .pagination>.active>a,
               .pagination>.active>a:focus,
               .pagination>.active>a:hover,
               .pagination>.active>span,
               .pagination>.active>span:focus,
               .pagination>.active>span:hover {
                 z-index: 3;
                 color: #fff;
                 cursor: default;
                 background-color: #337ab7;
                 border-color: #337ab7
               }
               
               .pagination>.disabled>a,
               .pagination>.disabled>a:focus,
               .pagination>.disabled>a:hover,
               .pagination>.disabled>span,
               .pagination>.disabled>span:focus,
               .pagination>.disabled>span:hover {
                 color: #777;
                 cursor: not-allowed;
                 background-color: #fff;
                 border-color: #ddd
               }
               
               .pagination-lg>li>a,
               .pagination-lg>li>span {
                 padding: 10px 16px;
                 font-size: 18px;
                 line-height: 1.3333333
               }
               
               .pagination-lg>li:first-child>a,
               .pagination-lg>li:first-child>span {
                 border-top-left-radius: 6px;
                 border-bottom-left-radius: 6px
               }
               
               .pagination-lg>li:last-child>a,
               .pagination-lg>li:last-child>span {
                 border-top-right-radius: 6px;
                 border-bottom-right-radius: 6px
               }
               
               .pagination-sm>li>a,
               .pagination-sm>li>span {
                 padding: 5px 10px;
                 font-size: 12px;
                 line-height: 1.5
               }
               
               .pagination-sm>li:first-child>a,
               .pagination-sm>li:first-child>span {
                 border-top-left-radius: 3px;
                 border-bottom-left-radius: 3px
               }
               
               .pagination-sm>li:last-child>a,
               .pagination-sm>li:last-child>span {
                 border-top-right-radius: 3px;
                 border-bottom-right-radius: 3px
               }
               
               .pager {
                 padding-left: 0;
                 margin: 20px 0;
                 text-align: center;
                 list-style: none
               }
               
               .pager li {
                 display: inline
               }
               
               .pager li>a,
               .pager li>span {
                 display: inline-block;
                 padding: 5px 14px;
                 background-color: #fff;
                 border: 1px solid #ddd;
                 border-radius: 15px
               }
               
               .pager li>a:focus,
               .pager li>a:hover {
                 text-decoration: none;
                 background-color: #eee
               }
               
               .pager .next>a,
               .pager .next>span {
                 float: right
               }
               
               .pager .previous>a,
               .pager .previous>span {
                 float: left
               }
               
               .pager .disabled>a,
               .pager .disabled>a:focus,
               .pager .disabled>a:hover,
               .pager .disabled>span {
                 color: #777;
                 cursor: not-allowed;
                 background-color: #fff
               }
               
               .list-group {
                 padding-left: 0;
                 margin-bottom: 20px
               }
               
               .list-group-item {
                 position: relative;
                 display: block;
                 padding: 10px 15px;
                 margin-bottom: -1px;
                 background-color: #fff;
                 border: 1px solid #ddd
               }
               
               .list-group-item:first-child {
                 border-top-left-radius: 4px;
                 border-top-right-radius: 4px
               }
               
               .list-group-item:last-child {
                 margin-bottom: 0;
                 border-bottom-right-radius: 4px;
                 border-bottom-left-radius: 4px
               }
               
               a.list-group-item,
               button.list-group-item {
                 color: #555
               }
               
               a.list-group-item .list-group-item-heading,
               button.list-group-item .list-group-item-heading {
                 color: #333
               }
               
               a.list-group-item:focus,
               a.list-group-item:hover,
               button.list-group-item:focus,
               button.list-group-item:hover {
                 color: #555;
                 text-decoration: none;
                 background-color: #f5f5f5
               }
               
               button.list-group-item {
                 width: 100%;
                 text-align: left
               }
               
               .list-group-item.disabled,
               .list-group-item.disabled:focus,
               .list-group-item.disabled:hover {
                 color: #777;
                 cursor: not-allowed;
                 background-color: #eee
               }
               
               .list-group-item.disabled .list-group-item-heading,
               .list-group-item.disabled:focus .list-group-item-heading,
               .list-group-item.disabled:hover .list-group-item-heading {
                 color: inherit
               }
               
               .list-group-item.disabled .list-group-item-text,
               .list-group-item.disabled:focus .list-group-item-text,
               .list-group-item.disabled:hover .list-group-item-text {
                 color: #777
               }
               
               .list-group-item.active,
               .list-group-item.active:focus,
               .list-group-item.active:hover {
                 z-index: 2;
                 color: #fff;
                 background-color: #337ab7;
                 border-color: #337ab7
               }
               
               .list-group-item.active .list-group-item-heading,
               .list-group-item.active .list-group-item-heading>.small,
               .list-group-item.active .list-group-item-heading>small,
               .list-group-item.active:focus .list-group-item-heading,
               .list-group-item.active:focus .list-group-item-heading>.small,
               .list-group-item.active:focus .list-group-item-heading>small,
               .list-group-item.active:hover .list-group-item-heading,
               .list-group-item.active:hover .list-group-item-heading>.small,
               .list-group-item.active:hover .list-group-item-heading>small {
                 color: inherit
               }
               
               .list-group-item.active .list-group-item-text,
               .list-group-item.active:focus .list-group-item-text,
               .list-group-item.active:hover .list-group-item-text {
                 color: #c7ddef
               }
               
               .list-group-item-success {
                 color: #3c763d;
                 background-color: #dff0d8
               }
               
               a.list-group-item-success,
               button.list-group-item-success {
                 color: #3c763d
               }
               
               a.list-group-item-success .list-group-item-heading,
               button.list-group-item-success .list-group-item-heading {
                 color: inherit
               }
               
               a.list-group-item-success:focus,
               a.list-group-item-success:hover,
               button.list-group-item-success:focus,
               button.list-group-item-success:hover {
                 color: #3c763d;
                 background-color: #d0e9c6
               }
               
               a.list-group-item-success.active,
               a.list-group-item-success.active:focus,
               a.list-group-item-success.active:hover,
               button.list-group-item-success.active,
               button.list-group-item-success.active:focus,
               button.list-group-item-success.active:hover {
                 color: #fff;
                 background-color: #3c763d;
                 border-color: #3c763d
               }
               
               .list-group-item-info {
                 color: #31708f;
                 background-color: #d9edf7
               }
               
               a.list-group-item-info,
               button.list-group-item-info {
                 color: #31708f
               }
               
               a.list-group-item-info .list-group-item-heading,
               button.list-group-item-info .list-group-item-heading {
                 color: inherit
               }
               
               a.list-group-item-info:focus,
               a.list-group-item-info:hover,
               button.list-group-item-info:focus,
               button.list-group-item-info:hover {
                 color: #31708f;
                 background-color: #c4e3f3
               }
               
               a.list-group-item-info.active,
               a.list-group-item-info.active:focus,
               a.list-group-item-info.active:hover,
               button.list-group-item-info.active,
               button.list-group-item-info.active:focus,
               button.list-group-item-info.active:hover {
                 color: #fff;
                 background-color: #31708f;
                 border-color: #31708f
               }
               
               .list-group-item-warning {
                 color: #8a6d3b;
                 background-color: #fcf8e3
               }
               
               a.list-group-item-warning,
               button.list-group-item-warning {
                 color: #8a6d3b
               }
               
               a.list-group-item-warning .list-group-item-heading,
               button.list-group-item-warning .list-group-item-heading {
                 color: inherit
               }
               
               a.list-group-item-warning:focus,
               a.list-group-item-warning:hover,
               button.list-group-item-warning:focus,
               button.list-group-item-warning:hover {
                 color: #8a6d3b;
                 background-color: #faf2cc
               }
               
               a.list-group-item-warning.active,
               a.list-group-item-warning.active:focus,
               a.list-group-item-warning.active:hover,
               button.list-group-item-warning.active,
               button.list-group-item-warning.active:focus,
               button.list-group-item-warning.active:hover {
                 color: #fff;
                 background-color: #8a6d3b;
                 border-color: #8a6d3b
               }
               
               .list-group-item-danger {
                 color: #a94442;
                 background-color: #f2dede
               }
               
               a.list-group-item-danger,
               button.list-group-item-danger {
                 color: #a94442
               }
               
               a.list-group-item-danger .list-group-item-heading,
               button.list-group-item-danger .list-group-item-heading {
                 color: inherit
               }
               
               a.list-group-item-danger:focus,
               a.list-group-item-danger:hover,
               button.list-group-item-danger:focus,
               button.list-group-item-danger:hover {
                 color: #a94442;
                 background-color: #ebcccc
               }
               
               a.list-group-item-danger.active,
               a.list-group-item-danger.active:focus,
               a.list-group-item-danger.active:hover,
               button.list-group-item-danger.active,
               button.list-group-item-danger.active:focus,
               button.list-group-item-danger.active:hover {
                 color: #fff;
                 background-color: #a94442;
                 border-color: #a94442
               }
               
               .list-group-item-heading {
                 margin-top: 0;
                 margin-bottom: 5px
               }
               
               .list-group-item-text {
                 margin-bottom: 0;
                 line-height: 1.3
               }
               
               .panel {
                 margin-bottom: 20px;
                 background-color: #fff;
                 border: 1px solid transparent;
                 border-radius: 4px;
                 -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
                 box-shadow: 0 1px 1px rgba(0, 0, 0, .05)
               }
               
               .panel-body {
                 padding: 15px
               }
               
               .panel-heading {
                 padding: 10px 15px;
                 border-bottom: 1px solid transparent;
                 border-top-left-radius: 3px;
                 border-top-right-radius: 3px
               }
               
               .panel-heading>.dropdown .dropdown-toggle {
                 color: inherit
               }
               
               .panel-title {
                 margin-top: 0;
                 margin-bottom: 0;
                 font-size: 16px;
                 color: inherit
               }
               
               .panel-title>.small,
               .panel-title>.small>a,
               .panel-title>a,
               .panel-title>small,
               .panel-title>small>a {
                 color: inherit
               }
               
               .panel-footer {
                 padding: 10px 15px;
                 background-color: #f5f5f5;
                 border-top: 1px solid #ddd;
                 border-bottom-right-radius: 3px;
                 border-bottom-left-radius: 3px
               }
               
               .panel>.list-group,
               .panel>.panel-collapse>.list-group {
                 margin-bottom: 0
               }
               
               .panel>.list-group .list-group-item,
               .panel>.panel-collapse>.list-group .list-group-item {
                 border-width: 1px 0;
                 border-radius: 0
               }
               
               .panel>.list-group:first-child .list-group-item:first-child,
               .panel>.panel-collapse>.list-group:first-child .list-group-item:first-child {
                 border-top: 0;
                 border-top-left-radius: 3px;
                 border-top-right-radius: 3px
               }
               
               .panel>.list-group:last-child .list-group-item:last-child,
               .panel>.panel-collapse>.list-group:last-child .list-group-item:last-child {
                 border-bottom: 0;
                 border-bottom-right-radius: 3px;
                 border-bottom-left-radius: 3px
               }
               
               .panel>.panel-heading+.panel-collapse>.list-group .list-group-item:first-child {
                 border-top-left-radius: 0;
                 border-top-right-radius: 0
               }
               
               .panel-heading+.list-group .list-group-item:first-child {
                 border-top-width: 0
               }
               
               .list-group+.panel-footer {
                 border-top-width: 0
               }
               
               .panel>.panel-collapse>.table,
               .panel>.table,
               .panel>.table-responsive>.table {
                 margin-bottom: 0
               }
               
               .panel>.panel-collapse>.table caption,
               .panel>.table caption,
               .panel>.table-responsive>.table caption {
                 padding-right: 15px;
                 padding-left: 15px
               }
               
               .panel>.table-responsive:first-child>.table:first-child,
               .panel>.table:first-child {
                 border-top-left-radius: 3px;
                 border-top-right-radius: 3px
               }
               
               .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,
               .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,
               .panel>.table:first-child>tbody:first-child>tr:first-child,
               .panel>.table:first-child>thead:first-child>tr:first-child {
                 border-top-left-radius: 3px;
                 border-top-right-radius: 3px
               }
               
               .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,
               .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,
               .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,
               .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,
               .panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,
               .panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,
               .panel>.table:first-child>thead:first-child>tr:first-child td:first-child,
               .panel>.table:first-child>thead:first-child>tr:first-child th:first-child {
                 border-top-left-radius: 3px
               }
               
               .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,
               .panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,
               .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,
               .panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,
               .panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,
               .panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,
               .panel>.table:first-child>thead:first-child>tr:first-child td:last-child,
               .panel>.table:first-child>thead:first-child>tr:first-child th:last-child {
                 border-top-right-radius: 3px
               }
               
               .panel>.table-responsive:last-child>.table:last-child,
               .panel>.table:last-child {
                 border-bottom-right-radius: 3px;
                 border-bottom-left-radius: 3px
               }
               
               .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,
               .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,
               .panel>.table:last-child>tbody:last-child>tr:last-child,
               .panel>.table:last-child>tfoot:last-child>tr:last-child {
                 border-bottom-right-radius: 3px;
                 border-bottom-left-radius: 3px
               }
               
               .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,
               .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,
               .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,
               .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,
               .panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,
               .panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,
               .panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,
               .panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child {
                 border-bottom-left-radius: 3px
               }
               
               .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,
               .panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,
               .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,
               .panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,
               .panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,
               .panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,
               .panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,
               .panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child {
                 border-bottom-right-radius: 3px
               }
               
               .panel>.panel-body+.table,
               .panel>.panel-body+.table-responsive,
               .panel>.table+.panel-body,
               .panel>.table-responsive+.panel-body {
                 border-top: 1px solid #ddd
               }
               
               .panel>.table>tbody:first-child>tr:first-child td,
               .panel>.table>tbody:first-child>tr:first-child th {
                 border-top: 0
               }
               
               .panel>.table-bordered,
               .panel>.table-responsive>.table-bordered {
                 border: 0
               }
               
               .panel>.table-bordered>tbody>tr>td:first-child,
               .panel>.table-bordered>tbody>tr>th:first-child,
               .panel>.table-bordered>tfoot>tr>td:first-child,
               .panel>.table-bordered>tfoot>tr>th:first-child,
               .panel>.table-bordered>thead>tr>td:first-child,
               .panel>.table-bordered>thead>tr>th:first-child,
               .panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,
               .panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,
               .panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,
               .panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,
               .panel>.table-responsive>.table-bordered>thead>tr>td:first-child,
               .panel>.table-responsive>.table-bordered>thead>tr>th:first-child {
                 border-left: 0
               }
               
               .panel>.table-bordered>tbody>tr>td:last-child,
               .panel>.table-bordered>tbody>tr>th:last-child,
               .panel>.table-bordered>tfoot>tr>td:last-child,
               .panel>.table-bordered>tfoot>tr>th:last-child,
               .panel>.table-bordered>thead>tr>td:last-child,
               .panel>.table-bordered>thead>tr>th:last-child,
               .panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,
               .panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,
               .panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,
               .panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,
               .panel>.table-responsive>.table-bordered>thead>tr>td:last-child,
               .panel>.table-responsive>.table-bordered>thead>tr>th:last-child {
                 border-right: 0
               }
               
               .panel>.table-bordered>tbody>tr:first-child>td,
               .panel>.table-bordered>tbody>tr:first-child>th,
               .panel>.table-bordered>thead>tr:first-child>td,
               .panel>.table-bordered>thead>tr:first-child>th,
               .panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,
               .panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,
               .panel>.table-responsive>.table-bordered>thead>tr:first-child>td,
               .panel>.table-responsive>.table-bordered>thead>tr:first-child>th {
                 border-bottom: 0
               }
               
               .panel>.table-bordered>tbody>tr:last-child>td,
               .panel>.table-bordered>tbody>tr:last-child>th,
               .panel>.table-bordered>tfoot>tr:last-child>td,
               .panel>.table-bordered>tfoot>tr:last-child>th,
               .panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,
               .panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,
               .panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,
               .panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th {
                 border-bottom: 0
               }
               
               .panel>.table-responsive {
                 margin-bottom: 0;
                 border: 0
               }
               
               .panel-group {
                 margin-bottom: 20px
               }
               
               .panel-group .panel {
                 margin-bottom: 0;
                 border-radius: 4px
               }
               
               .panel-group .panel+.panel {
                 margin-top: 5px
               }
               
               .panel-group .panel-heading {
                 border-bottom: 0
               }
               
               .panel-group .panel-heading+.panel-collapse>.list-group,
               .panel-group .panel-heading+.panel-collapse>.panel-body {
                 border-top: 1px solid #ddd
               }
               
               .panel-group .panel-footer {
                 border-top: 0
               }
               
               .panel-group .panel-footer+.panel-collapse .panel-body {
                 border-bottom: 1px solid #ddd
               }
               
               .panel-default {
                 border-color: #ddd
               }
               
               .panel-default>.panel-heading {
                 color: #333;
                 background-color: #f5f5f5;
                 border-color: #ddd
               }
               
               .panel-default>.panel-heading+.panel-collapse>.panel-body {
                 border-top-color: #ddd
               }
               
               .panel-default>.panel-heading .badge {
                 color: #f5f5f5;
                 background-color: #333
               }
               
               .panel-default>.panel-footer+.panel-collapse>.panel-body {
                 border-bottom-color: #ddd
               }
               
               .panel-primary {
                 border-color: #337ab7
               }
               
               .panel-primary>.panel-heading {
                 color: #fff;
                 background-color: #337ab7;
                 border-color: #337ab7
               }
               
               .panel-primary>.panel-heading+.panel-collapse>.panel-body {
                 border-top-color: #337ab7
               }
               
               .panel-primary>.panel-heading .badge {
                 color: #337ab7;
                 background-color: #fff
               }
               
               .panel-primary>.panel-footer+.panel-collapse>.panel-body {
                 border-bottom-color: #337ab7
               }
               
               .panel-success {
                 border-color: #d6e9c6
               }
               
               .panel-success>.panel-heading {
                 color: #3c763d;
                 background-color: #dff0d8;
                 border-color: #d6e9c6
               }
               
               .panel-success>.panel-heading+.panel-collapse>.panel-body {
                 border-top-color: #d6e9c6
               }
               
               .panel-success>.panel-heading .badge {
                 color: #dff0d8;
                 background-color: #3c763d
               }
               
               .panel-success>.panel-footer+.panel-collapse>.panel-body {
                 border-bottom-color: #d6e9c6
               }
               
               .panel-info {
                 border-color: #bce8f1
               }
               
               .panel-info>.panel-heading {
                 color: #31708f;
                 background-color: #d9edf7;
                 border-color: #bce8f1
               }
               
               .panel-info>.panel-heading+.panel-collapse>.panel-body {
                 border-top-color: #bce8f1
               }
               
               .panel-info>.panel-heading .badge {
                 color: #d9edf7;
                 background-color: #31708f
               }
               
               .panel-info>.panel-footer+.panel-collapse>.panel-body {
                 border-bottom-color: #bce8f1
               }
               
               .panel-warning {
                 border-color: #faebcc
               }
               
               .panel-warning>.panel-heading {
                 color: #8a6d3b;
                 background-color: #fcf8e3;
                 border-color: #faebcc
               }
               
               .panel-warning>.panel-heading+.panel-collapse>.panel-body {
                 border-top-color: #faebcc
               }
               
               .panel-warning>.panel-heading .badge {
                 color: #fcf8e3;
                 background-color: #8a6d3b
               }
               
               .panel-warning>.panel-footer+.panel-collapse>.panel-body {
                 border-bottom-color: #faebcc
               }
               
               .panel-danger {
                 border-color: #ebccd1
               }
               
               .panel-danger>.panel-heading {
                 color: #a94442;
                 background-color: #f2dede;
                 border-color: #ebccd1
               }
               
               .panel-danger>.panel-heading+.panel-collapse>.panel-body {
                 border-top-color: #ebccd1
               }
               
               .panel-danger>.panel-heading .badge {
                 color: #f2dede;
                 background-color: #a94442
               }
               
               .panel-danger>.panel-footer+.panel-collapse>.panel-body {
                 border-bottom-color: #ebccd1
               }
               
               .embed-responsive {
                 position: relative;
                 display: block;
                 height: 0;
                 padding: 0;
                 overflow: hidden
               }
               
               .embed-responsive .embed-responsive-item,
               .embed-responsive embed,
               .embed-responsive iframe,
               .embed-responsive object,
               .embed-responsive video {
                 position: absolute;
                 top: 0;
                 bottom: 0;
                 left: 0;
                 width: 100%;
                 height: 100%;
                 border: 0
               }
               
               .embed-responsive-16by9 {
                 padding-bottom: 56.25%
               }
               
               .embed-responsive-4by3 {
                 padding-bottom: 75%
               }
               
               .well {
                 min-height: 20px;
                 padding: 19px;
                 margin-bottom: 20px;
                 background-color: #f5f5f5;
                 border: 1px solid #e3e3e3;
                 border-radius: 4px;
                 -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
                 box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05)
               }
               
               .well blockquote {
                 border-color: #ddd;
                 border-color: rgba(0, 0, 0, .15)
               }
               
               .well-lg {
                 padding: 24px;
                 border-radius: 6px
               }
               
               .well-sm {
                 padding: 9px;
                 border-radius: 3px
               }
               
               .close {
                 float: right;
                 font-size: 21px;
                 font-weight: 700;
                 line-height: 1;
                 color: #000;
                 text-shadow: 0 1px 0 #fff;
                 filter: alpha(opacity=20);
                 opacity: .2
               }
               
               .close:focus,
               .close:hover {
                 color: #000;
                 text-decoration: none;
                 cursor: pointer;
                 filter: alpha(opacity=50);
                 opacity: .5
               }
               
               .btn-group-vertical>.btn-group:after,
               .btn-group-vertical>.btn-group:before,
               .btn-toolbar:after,
               .btn-toolbar:before,
               .clearfix:after,
               .clearfix:before,
               .container-fluid:after,
               .container-fluid:before,
               .container:after,
               .container:before,
               .dl-horizontal dd:after,
               .dl-horizontal dd:before,
               .form-horizontal .form-group:after,
               .form-horizontal .form-group:before,
               .modal-footer:after,
               .modal-footer:before,
               .modal-header:after,
               .modal-header:before,
               .nav:after,
               .nav:before,
               .navbar-collapse:after,
               .navbar-collapse:before,
               .navbar-header:after,
               .navbar-header:before,
               .navbar:after,
               .navbar:before,
               .pager:after,
               .pager:before,
               .panel-body:after,
               .panel-body:before,
               .row:after,
               .row:before {
                 display: table;
                 content: " "
               }
               
               .btn-group-vertical>.btn-group:after,
               .btn-toolbar:after,
               .clearfix:after,
               .container-fluid:after,
               .container:after,
               .dl-horizontal dd:after,
               .form-horizontal .form-group:after,
               .modal-footer:after,
               .modal-header:after,
               .nav:after,
               .navbar-collapse:after,
               .navbar-header:after,
               .navbar:after,
               .pager:after,
               .panel-body:after,
               .row:after {
                 clear: both
               }
               
               .center-block {
                 display: block;
                 margin-right: auto;
                 margin-left: auto
               }
               
               .pull-right {
                 float: right !important
               }
               
               .pull-left {
                 float: left !important
               }
               
               .hide {
                 display: none !important
               }
               
               .show {
                 display: block !important
               }
               
               .invisible {
                 visibility: hidden
               }
               
               .text-hide {
                 font: 0/0 a;
                 color: transparent;
                 text-shadow: none;
                 background-color: transparent;
                 border: 0
               }
               
               .hidden {
                 display: none !important
               }
               
               .affix {
                 position: fixed
               }
               
               @-ms-viewport {
                 width: device-width
               }
               
               .visible-lg,
               .visible-md,
               .visible-sm,
               .visible-xs {
                 display: none !important
               }
               
               .visible-lg-block,
               .visible-lg-inline,
               .visible-lg-inline-block,
               .visible-md-block,
               .visible-md-inline,
               .visible-md-inline-block,
               .visible-sm-block,
               .visible-sm-inline,
               .visible-sm-inline-block,
               .visible-xs-block,
               .visible-xs-inline,
               .visible-xs-inline-block {
                 display: none !important
               }
               
               @media (max-width:767px) {
                 .visible-xs {
                   display: block !important
                 }
               
                 table.visible-xs {
                   display: table !important
                 }
               
                 tr.visible-xs {
                   display: table-row !important
                 }
               
                 td.visible-xs,
                 th.visible-xs {
                   display: table-cell !important
                 }
               }
               
               @media (max-width:767px) {
                 .visible-xs-block {
                   display: block !important
                 }
               }
               
               @media (max-width:767px) {
                 .visible-xs-inline {
                   display: inline !important
                 }
               }
               
               @media (max-width:767px) {
                 .visible-xs-inline-block {
                   display: inline-block !important
                 }
               }
               
               @media (min-width:768px) and (max-width:991px) {
                 .visible-sm {
                   display: block !important
                 }
               
                 table.visible-sm {
                   display: table !important
                 }
               
                 tr.visible-sm {
                   display: table-row !important
                 }
               
                 td.visible-sm,
                 th.visible-sm {
                   display: table-cell !important
                 }
               }
               
               @media (min-width:768px) and (max-width:991px) {
                 .visible-sm-block {
                   display: block !important
                 }
               }
               
               @media (min-width:768px) and (max-width:991px) {
                 .visible-sm-inline {
                   display: inline !important
                 }
               }
               
               @media (min-width:768px) and (max-width:991px) {
                 .visible-sm-inline-block {
                   display: inline-block !important
                 }
               }
               
               @media (min-width:992px) and (max-width:1199px) {
                 .visible-md {
                   display: block !important
                 }
               
                 table.visible-md {
                   display: table !important
                 }
               
                 tr.visible-md {
                   display: table-row !important
                 }
               
                 td.visible-md,
                 th.visible-md {
                   display: table-cell !important
                 }
               }
               
               @media (min-width:992px) and (max-width:1199px) {
                 .visible-md-block {
                   display: block !important
                 }
               }
               
               @media (min-width:992px) and (max-width:1199px) {
                 .visible-md-inline {
                   display: inline !important
                 }
               }
               
               @media (min-width:992px) and (max-width:1199px) {
                 .visible-md-inline-block {
                   display: inline-block !important
                 }
               }
               
               @media (min-width:1200px) {
                 .visible-lg {
                   display: block !important
                 }
               
                 table.visible-lg {
                   display: table !important
                 }
               
                 tr.visible-lg {
                   display: table-row !important
                 }
               
                 td.visible-lg,
                 th.visible-lg {
                   display: table-cell !important
                 }
               }
               
               @media (min-width:1200px) {
                 .visible-lg-block {
                   display: block !important
                 }
               }
               
               @media (min-width:1200px) {
                 .visible-lg-inline {
                   display: inline !important
                 }
               }
               
               @media (min-width:1200px) {
                 .visible-lg-inline-block {
                   display: inline-block !important
                 }
               }
               
               @media (max-width:767px) {
                 .hidden-xs {
                   display: none !important
                 }
               }
               
               @media (min-width:768px) and (max-width:991px) {
                 .hidden-sm {
                   display: none !important
                 }
               }
               
               @media (min-width:992px) and (max-width:1199px) {
                 .hidden-md {
                   display: none !important
                 }
               }
               
               @media (min-width:1200px) {
                 .hidden-lg {
                   display: none !important
                 }
               }
               
               .visible-print {
                 display: none !important
               }
               
               @media print {
                 .visible-print {
                   display: block !important
                 }
               
                 table.visible-print {
                   display: table !important
                 }
               
                 tr.visible-print {
                   display: table-row !important
                 }
               
                 td.visible-print,
                 th.visible-print {
                   display: table-cell !important
                 }
               }
               
               .visible-print-block {
                 display: none !important
               }
               
               @media print {
                 .visible-print-block {
                   display: block !important
                 }
               }
               
               .visible-print-inline {
                 display: none !important
               }
               
               @media print {
                 .visible-print-inline {
                   display: inline !important
                 }
               }
               
               .visible-print-inline-block {
                 display: none !important
               }
               
               @media print {
                 .visible-print-inline-block {
                   display: inline-block !important
                 }
               }
               
               @media print {
                 .hidden-print {
                   display: none !important
                 }
               }
               
               /*# sourceMappingURL=bootstrap.min.css.map */
               
               `,
                is_angular: false
            }
        ],
        "gjs-assets": [
            "[]"
        ],
        "gjs-styles": [
            "[{\"selectors\":[{\"name\":\"wrapper\",\"label\":\"wrapper\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"wrapper\":1},{\"selectors\":[],\"selectorsAdd\":\"body\",\"style\":{\"font-family\":\"'Open Sans', sans-serif\",\"background\":\"#FFF\"}},{\"selectors\":[],\"selectorsAdd\":\"section\",\"style\":{\"padding-top\":\"50px\",\"padding-bottom\":\"50px\"}},{\"selectors\":[],\"selectorsAdd\":\"h2\",\"style\":{\"text-transform\":\"uppercase\",\"font-weight\":\"900\"}},{\"selectors\":[{\"name\":\"navbar-inverse\",\"label\":\"navbar-inverse\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"background-color\":\"#808080 !important\",\"border-color\":\"#808080 !important\"}},{\"selectors\":[],\"selectorsAdd\":\".navbar-inverse .navbar-brand\",\"style\":{\"color\":\"#fff !important\"}},{\"selectors\":[],\"selectorsAdd\":\".navbar-inverse .navbar-nav > li > a\",\"style\":{\"color\":\"#fff\",\"padding\":\"17px 12px\"}},{\"selectors\":[],\"selectorsAdd\":\"header\",\"style\":{\"background\":\"url(assets/img/home.jpg) no-repeat center center\",\"padding\":\"0\",\"-webkit-background-size\":\"cover\",\"background-size\":\"cover\",\"-moz-background-size\":\"cover\",\"margin-top\":\"-2%\",\"min-height\":\"600px\"}},{\"selectors\":[],\"selectorsAdd\":\"#home-sec .overlay\",\"style\":{\"background-color\":\"rgba(149, 166, 248, 0.75)\",\"min-height\":\"600px\"}},{\"selectors\":[],\"selectorsAdd\":\"h1\",\"style\":{\"line-height\":\"80px !important\",\"font-size\":\"45px !important\",\"font-weight\":\"900 !important\",\"color\":\"#fff !important\"}},{\"selectors\":[],\"selectorsAdd\":\"#home-sec mark\",\"style\":{\"background-color\":\"rgba(0, 0, 0, 0.5)\",\"color\":\"#fff\",\"padding\":\"0px 5px 0px 20px\",\"margin\":\"0px 15px 0px 8px\",\"border-radius\":\"10px\",\"-moz-border-radius\":\"10px\",\"-webkit-border-radius\":\"10px\"}},{\"selectors\":[{\"name\":\"btn\",\"label\":\"btn\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"background-color\":\"rgba(66, 139, 202, 0.8) !important\",\"border-radius\":\"0.5em !important\",\"-moz-border-radius\":\"30px\",\"-webkit-border-radius\":\"30px\",\"color\":\"white !important\",\"padding\":\"1em !important\"}},{\"selectors\":[],\"selectorsAdd\":\"#features-sec h3\",\"style\":{\"color\":\"#666565\"}},{\"selectors\":[],\"selectorsAdd\":\"#features-sec hr\",\"style\":{\"border\":\"1px solid rgba(184, 94, 255, 1)\",\"width\":\"30%\"}},{\"selectors\":[],\"selectorsAdd\":\"#features-sec p\",\"style\":{\"line-height\":\"30px\",\"color\":\"#9C9C9C\"}},{\"selectors\":[],\"selectorsAdd\":\"#skill-sec h4\",\"style\":{\"text-align\":\"center\",\"padding-top\":\"20px\",\"font-weight\":\"900\"}},{\"selectors\":[],\"selectorsAdd\":\"#skill-sec .overlay\",\"style\":{\"padding-top\":\"50px\",\"undefined\":\"undefined\",\"min-height\":\"250px\",\"background-color\":\"rgba(5, 5, 5, 0.45)\"}},{\"selectors\":[],\"selectorsAdd\":\"#advance-sec h3\",\"style\":{\"color\":\"#666565\"}},{\"selectors\":[],\"selectorsAdd\":\"#advance-sec p\",\"style\":{\"line-height\":\"30px\",\"color\":\"#9C9C9C\"}},{\"selectors\":[],\"selectorsAdd\":\"#just-sec .overlay\",\"style\":{\"background\":\"rgba(72, 104, 233, 0.95)\",\"padding\":\"50px 30px\"}},{\"selectors\":[],\"selectorsAdd\":\".portfolio-item img:hover\",\"style\":{\"cursor\":\"pointer\",\"-webkit-transform\":\"scale(1.5, 1.5)\",\"-ms-transform\":\"scale(1.5, 1.5)\",\"transform\":\"scale(1.5, 1.5)\",\"transition-duration\":\"0.3s\",\"-webkit-transition-duration\":\"0.3s\",\"undefined\":\"undefined\",\"z-index\":\"1\"}},{\"selectors\":[],\"selectorsAdd\":\"ul#filters\",\"style\":{\"padding\":\"0px\"}},{\"selectors\":[],\"selectorsAdd\":\"#filters li\",\"style\":{\"display\":\"-webkit-inline-box\"}},{\"selectors\":[],\"selectorsAdd\":\"#filters li span\",\"style\":{\"display\":\"block\",\"padding\":\"5px 4px\",\"text-decoration\":\"none\",\"cursor\":\"pointer\",\"font-size\":\"14px\",\"font-weight\":\"800\"}},{\"selectors\":[],\"selectorsAdd\":\"#port-folio .portfolio-item\",\"style\":{\"-webkit-box-sizing\":\"border-box\",\"-moz-box-sizing\":\"border-box\",\"-o-box-sizing\":\"border-box\",\"width\":\"100%\",\"float\":\"left\",\"overflow\":\"hidden\",\"display\":\"none\"}},{\"selectors\":[],\"selectorsAdd\":\"footer\",\"style\":{\"background-color\":\"rgba(50, 51, 58,1)\",\"color\":\"#fff\",\"margin-top\":\"2em\"}},{\"selectors\":[],\"selectorsAdd\":\"footer h3\",\"style\":{\"color\":\"#FFF\",\"font-weight\":\"900\"}},{\"selectors\":[{\"name\":\"sidenav\",\"label\":\"sidenav\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"height\":\"100%\",\"width\":\"0\",\"position\":\"fixed\",\"z-index\":\"1\",\"top\":\"0\",\"left\":\"0\",\"background-color\":\"rgba(0, 0, 0, 0.5)\",\"overflow-x\":\"hidden\",\"transition\":\"0.5s\",\"padding-top\":\"60px\",\"font-family\":\"'Open Sans', sans-serif\"}},{\"selectors\":[],\"selectorsAdd\":\".sidenav a\",\"style\":{\"undefined\":\"undefined\",\"text-decoration\":\"none\",\"color\":\"#fff\",\"display\":\"block\",\"transition\":\"0.3s\",\"background-color\":\"rgba(0, 0, 0, 0.65)\"}},{\"selectors\":[],\"selectorsAdd\":\".sidenav .closebtn\",\"style\":{\"position\":\"absolute\",\"top\":\"0\",\"right\":\"25px\",\"font-size\":\"36px\",\"margin-left\":\"50px\"}},{\"selectors\":[{\"name\":\"list-group\",\"label\":\"list-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"panel\",\"label\":\"panel\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"border\":\"0\",\"border-radius\":\"0\",\"margin-bottom\":\"0\"}},{\"selectors\":[{\"name\":\"list-group-item\",\"label\":\"list-group-item\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"border\":\"none !important\",\"background-color\":\"rgba(0, 0, 0, 0.5)\",\"font-size\":\"18px\",\"color\":\"white !important\"}},{\"selectors\":[{\"name\":\"list-group-item-success\",\"label\":\"list-group-item-success\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"background-color\":\"rgba(0, 0, 0, 0.65)\",\"font-size\":\"20px\",\"color\":\"white !important\",\"border-radius\":\"none !important\"}},{\"selectors\":[],\"selectorsAdd\":\"a.list-group-item:focus, a.list-group-item:hover, button.list-group-item:focus, button.list-group-item:hover\",\"style\":{\"color\":\"#555 !important\",\"text-decoration\":\"none !important\",\"background-color\":\"#f5f5f5 !important\"}},{\"selectors\":[],\"selectorsAdd\":\"a.list-group-item-success:hover\",\"style\":{\"color\":\"#3c763d !important\",\"background-color\":\"#d0e9c6 !important\"}},{\"selectors\":[],\"selectorsAdd\":\"header\",\"style\":{\"margin\":\"-20px 0 0 0\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[],\"selectorsAdd\":\"header\",\"style\":{\"margin\":\"-20px 0 0 0\"},\"mediaText\":\"(max-width: 375px)\",\"atRuleType\":\"media\"},{\"selectors\":[{\"name\":\"in2oj\",\"label\":\"in2oj\",\"type\":2,\"active\":true,\"private\":false,\"protected\":false}],\"style\":{\"font-size\":\"30px\",\"cursor\":\"pointer\",\"float\":\"left\",\"margin-left\":\"20px\",\"margin-top\":\"5px\"}}]"
        ],
        "gjs-components": [
            "[{\"tagName\":\"meta\",\"void\":true,\"content\":\"\",\"attributes\":{\"charset\":\"UTF-8\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"meta\",\"void\":true,\"content\":\"\",\"attributes\":{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"meta\",\"void\":true,\"content\":\"\",\"attributes\":{\"name\":\"description\",\"content\":\"This is a sample HTML created by GEPPETTO\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"meta\",\"void\":true,\"content\":\"\",\"attributes\":{\"name\":\"author\",\"content\":\"GEPPETTO\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"meta\",\"void\":true,\"content\":\"\",\"attributes\":{\"name\":\"keywords\",\"content\":\"geppetto,web,development\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"title\",\"type\":\"text\",\"content\":\"\\n        Geppetto\\n    \",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"base\",\"void\":true,\"content\":\"\",\"attributes\":{\"href\":\"/\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"meta\",\"void\":true,\"content\":\"\",\"attributes\":{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"script\",\"type\":\"script\",\"content\":\"\",\"attributes\":{\"src\":\"https://cdn.ckeditor.com/4.5.11/full/ckeditor.js\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"src\":\"https://cdn.ckeditor.com/4.5.11/full/ckeditor.js\",\"onload\":null},{\"tagName\":\"link\",\"void\":true,\"content\":\"\",\"attributes\":{\"rel\":\"stylesheet\",\"href\":\"assets/css/bootstrap.min.css\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"link\",\"void\":true,\"content\":\"\",\"attributes\":{\"rel\":\"stylesheet\",\"href\":\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"script\",\"type\":\"script\",\"content\":\"\",\"attributes\":{\"src\":\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"src\":\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\",\"onload\":null},{\"tagName\":\"script\",\"type\":\"script\",\"content\":\"\",\"attributes\":{\"src\":\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"src\":\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\",\"onload\":null},{\"tagName\":\"script\",\"type\":\"script\",\"content\":\"\\n        function openNav() {\\n        document.getElementById(\\\"mySidenav\\\").style.width = \\\"auto\\\";\\n      }\\n    \\n      function closeNav() {\\n        document.getElementById(\\\"mySidenav\\\").style.width = \\\"0\\\";\\n      }\\n    \",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}]},{\"tagName\":\"nav\",\"content\":\"\",\"classes\":[{\"name\":\"navbar\",\"label\":\"navbar\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"navbar-inverse\",\"label\":\"navbar-inverse\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"navbar-header\",\"label\":\"navbar-header\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"span\",\"type\":\"text\",\"content\":\"☰\",\"attributes\":{\"onclick\":\"openNav()\",\"id\":\"in2oj\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"type\":\"button\",\"content\":\"\",\"classes\":[{\"name\":\"navbar-toggle\",\"label\":\"navbar-toggle\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"type\":\"button\",\"data-toggle\":\"collapse\",\"data-target\":\"#myNavbar\"},\"traits\":[{\"type\":\"content\",\"label\":\"Text\",\"name\":\"\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"Type\",\"name\":\"type\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"submit\",\"name\":\"Submit\"},{\"value\":\"reset\",\"name\":\"Reset\"},{\"value\":\"button\",\"name\":\"Button\"}]}],\"components\":[{\"tagName\":\"span\",\"content\":\"\",\"classes\":[{\"name\":\"icon-bar\",\"label\":\"icon-bar\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"span\",\"content\":\"\",\"classes\":[{\"name\":\"icon-bar\",\"label\":\"icon-bar\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"tagName\":\"span\",\"content\":\"\",\"classes\":[{\"name\":\"icon-bar\",\"label\":\"icon-bar\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false},{\"type\":\"link\",\"content\":\"GEPPETTO\",\"classes\":[{\"name\":\"navbar-brand\",\"label\":\"navbar-brand\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"href\":\"/\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"href\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. https://google.com\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"\",\"name\":\"target\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"\",\"name\":\"This window\"},{\"value\":\"_blank\",\"name\":\"New window\"}]}],\"open\":false}],\"open\":false},{\"status\":\"hovered\",\"content\":\"\",\"classes\":[{\"name\":\"collapse\",\"label\":\"collapse\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"navbar-collapse\",\"label\":\"navbar-collapse\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"id\":\"myNavbar\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"ul\",\"content\":\"\",\"classes\":[{\"name\":\"nav\",\"label\":\"nav\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"navbar-nav\",\"label\":\"navbar-nav\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"navbar-right\",\"label\":\"navbar-right\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"li\",\"content\":\"\",\"classes\":[{\"name\":\"active\",\"label\":\"active\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"link\",\"content\":\"Home\",\"attributes\":{\"href\":\"/\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"href\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. https://google.com\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"\",\"name\":\"target\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"\",\"name\":\"This window\"},{\"value\":\"_blank\",\"name\":\"New window\"}]}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false},{\"content\":\"\",\"classes\":[{\"name\":\"sidenav\",\"label\":\"sidenav\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"id\":\"mySidenav\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"link\",\"content\":\"×\",\"classes\":[{\"name\":\"closebtn\",\"label\":\"closebtn\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"href\":\"javascript:void(0)\",\"onclick\":\"closeNav()\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"href\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. https://google.com\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"\",\"name\":\"target\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"\",\"name\":\"This window\"},{\"value\":\"_blank\",\"name\":\"New window\"}]}],\"open\":false},{\"content\":\"\",\"attributes\":{\"id\":\"MainMenu\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"list-group\",\"label\":\"list-group\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"panel\",\"label\":\"panel\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"link\",\"content\":\"\",\"classes\":[{\"name\":\"list-group-item\",\"label\":\"list-group-item\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"list-group-item-success\",\"label\":\"list-group-item-success\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"href\":\"#Student\",\"data-toggle\":\"collapse\",\"data-parent\":\"#MainMenu\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"href\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. https://google.com\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"\",\"name\":\"target\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"\",\"name\":\"This window\"},{\"value\":\"_blank\",\"name\":\"New window\"}]}],\"components\":[{\"tagName\":\"\",\"type\":\"textnode\",\"content\":\"Student \",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}]},{\"tagName\":\"i\",\"content\":\"\",\"classes\":[{\"name\":\"fa\",\"label\":\"fa\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"fa-caret-down\",\"label\":\"fa-caret-down\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false},{\"content\":\"\",\"classes\":[{\"name\":\"collapse\",\"label\":\"collapse\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"id\":\"Student\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"link\",\"content\":\"CreateNoun\",\"classes\":[{\"name\":\"list-group-item\",\"label\":\"list-group-item\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"attributes\":{\"href\":\"#\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"href\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. https://google.com\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"\",\"name\":\"target\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"\",\"name\":\"This window\"},{\"value\":\"_blank\",\"name\":\"New window\"}]}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false},{\"tagName\":\"header\",\"content\":\"\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"container\",\"label\":\"container\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"row\",\"label\":\"row\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"col-lg-12\",\"label\":\"col-lg-12\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"header\",\"content\":\"GEPPETTO SOFTWARE\",\"traits\":[{\"type\":\"select\",\"label\":\"Size\",\"name\":\"tagName\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"h1\",\"name\":\"One (largest)\"},{\"value\":\"h2\",\"name\":\"Two\"},{\"value\":\"h3\",\"name\":\"Three\"},{\"value\":\"h4\",\"name\":\"Four\"},{\"value\":\"h5\",\"name\":\"Five\"},{\"value\":\"h6\",\"name\":\"Six (smallest)\"}]}],\"open\":false},{\"tagName\":\"span\",\"type\":\"text\",\"content\":\"This is an HTML template developed by GEPPETTO\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false},{\"tagName\":\"section\",\"content\":\"\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"container\",\"label\":\"container\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"row\",\"label\":\"row\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"col-lg-12\",\"label\":\"col-lg-12\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"h2\",\"type\":\"header\",\"content\":\"Content Title\",\"traits\":[{\"type\":\"select\",\"label\":\"Size\",\"name\":\"tagName\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"h1\",\"name\":\"One (largest)\"},{\"value\":\"h2\",\"name\":\"Two\"},{\"value\":\"h3\",\"name\":\"Three\"},{\"value\":\"h4\",\"name\":\"Four\"},{\"value\":\"h5\",\"name\":\"Five\"},{\"value\":\"h6\",\"name\":\"Six (smallest)\"}]}],\"open\":false},{\"tagName\":\"hr\",\"void\":true,\"content\":\"\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false}],\"open\":false},{\"content\":\"\",\"classes\":[{\"name\":\"row\",\"label\":\"row\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"col-lg-6\",\"label\":\"col-lg-6\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"p\",\"type\":\"text\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ratione quo alias fugit maiores\\n                        enim odio\\n                        amet, harum provident necessitatibus, error eveniet iste non voluptatibus dolore rem voluptates\\n                        deleniti\\n                        quos?\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"type\":\"link\",\"editable\":0,\"content\":\"\",\"attributes\":{\"href\":\"#\"},\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"href\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. https://google.com\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"\",\"name\":\"target\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"\",\"name\":\"This window\"},{\"value\":\"_blank\",\"name\":\"New window\"}]}],\"components\":[{\"tagName\":\"h4\",\"type\":\"header\",\"content\":\"more\",\"traits\":[{\"type\":\"select\",\"label\":\"Size\",\"name\":\"tagName\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"h1\",\"name\":\"One (largest)\"},{\"value\":\"h2\",\"name\":\"Two\"},{\"value\":\"h3\",\"name\":\"Three\"},{\"value\":\"h4\",\"name\":\"Four\"},{\"value\":\"h5\",\"name\":\"Five\"},{\"value\":\"h6\",\"name\":\"Six (smallest)\"}]}],\"open\":false}],\"open\":false}],\"open\":false},{\"content\":\"\",\"classes\":[{\"name\":\"col-lg-6\",\"label\":\"col-lg-6\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"p\",\"type\":\"text\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ratione quo alias fugit maiores\\n                        enim odio\\n                        amet, harum provident necessitatibus, error eveniet iste non voluptatibus dolore rem voluptates\\n                        deleniti\\n                        quos?\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false},{\"type\":\"button\",\"content\":\"Read More\",\"classes\":[{\"name\":\"btn\",\"label\":\"btn\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"btn-default\",\"label\":\"btn-default\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"content\",\"label\":\"Text\",\"name\":\"\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[]},{\"type\":\"select\",\"label\":\"Type\",\"name\":\"type\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":0,\"options\":[{\"value\":\"submit\",\"name\":\"Submit\"},{\"value\":\"reset\",\"name\":\"Reset\"},{\"value\":\"button\",\"name\":\"Button\"}]}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false},{\"tagName\":\"footer\",\"content\":\"\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"container\",\"label\":\"container\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"row\",\"label\":\"row\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"footer-col\",\"label\":\"footer-col\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"col-md-4\",\"label\":\"col-md-4\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"h3\",\"type\":\"header\",\"content\":\"Location\",\"traits\":[{\"type\":\"select\",\"label\":\"Size\",\"name\":\"tagName\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"h1\",\"name\":\"One (largest)\"},{\"value\":\"h2\",\"name\":\"Two\"},{\"value\":\"h3\",\"name\":\"Three\"},{\"value\":\"h4\",\"name\":\"Four\"},{\"value\":\"h5\",\"name\":\"Five\"},{\"value\":\"h6\",\"name\":\"Six (smallest)\"}]}],\"open\":false},{\"tagName\":\"p\",\"type\":\"text\",\"content\":\"\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"\",\"type\":\"textnode\",\"content\":\"Sample Place\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}]},{\"tagName\":\"br\",\"void\":true,\"content\":\"\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}]},{\"tagName\":\"\",\"type\":\"textnode\",\"content\":\"Sample, XX 99999\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}]}],\"open\":false}],\"open\":false},{\"content\":\"\",\"classes\":[{\"name\":\"footer-col\",\"label\":\"footer-col\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false},{\"name\":\"col-md-8\",\"label\":\"col-md-8\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"tagName\":\"h3\",\"type\":\"header\",\"content\":\"About Geppetto\",\"traits\":[{\"type\":\"select\",\"label\":\"Size\",\"name\":\"tagName\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"\",\"changeProp\":1,\"options\":[{\"value\":\"h1\",\"name\":\"One (largest)\"},{\"value\":\"h2\",\"name\":\"Two\"},{\"value\":\"h3\",\"name\":\"Three\"},{\"value\":\"h4\",\"name\":\"Four\"},{\"value\":\"h5\",\"name\":\"Five\"},{\"value\":\"h6\",\"name\":\"Six (smallest)\"}]}],\"open\":false},{\"tagName\":\"p\",\"type\":\"text\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum incidunt reprehenderit placeat,\\n                    animi quo\\n                    perferendis magni doloremque tempore autem ut maiores, molestias vero repellat earum optio\\n                    similique deleniti\\n                    explicabo sint?.\",\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false},{\"content\":\"\",\"classes\":[{\"name\":\"container\",\"label\":\"container\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"content\":\"\",\"classes\":[{\"name\":\"row\",\"label\":\"row\",\"type\":1,\"active\":true,\"private\":1,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"components\":[{\"type\":\"text\",\"content\":\"\\n                Copyright © GEPPETTO 2016\\n            \",\"classes\":[{\"name\":\"col-lg-12\",\"label\":\"col-lg-12\",\"type\":1,\"active\":true,\"private\":false,\"protected\":false}],\"traits\":[{\"type\":\"text\",\"label\":\"\",\"name\":\"id\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]},{\"type\":\"text\",\"label\":\"\",\"name\":\"title\",\"min\":\"\",\"max\":\"\",\"unit\":\"\",\"step\":1,\"value\":\"\",\"default\":\"\",\"placeholder\":\"eg. Text here\",\"changeProp\":0,\"options\":[]}],\"open\":false}],\"open\":false}],\"open\":false}],\"open\":false}]"
        ],
        "gjs-css": "* { box-sizing: border-box; } body {margin: 0;}body{font-family:'Open Sans', sans-serif;background:#FFF;}section{padding-top:50px;padding-bottom:50px;}h2{text-transform:uppercase;font-weight:900;}.navbar-inverse{background-color:#808080 !important;border-color:#808080 !important;}.navbar-inverse .navbar-brand{color:#fff !important;}.navbar-inverse .navbar-nav > li > a{color:#fff;padding:17px 12px;}header{background:url(assets/img/home.jpg) no-repeat center center;padding:0;-webkit-background-size:cover;background-size:cover;-moz-background-size:cover;margin-top:-2%;min-height:600px;}#home-sec .overlay{background-color:rgba(149, 166, 248, 0.75);min-height:600px;}h1{line-height:80px !important;font-size:45px !important;font-weight:900 !important;color:#fff !important;}#home-sec mark{background-color:rgba(0, 0, 0, 0.5);color:#fff;padding:0px 5px 0px 20px;margin:0px 15px 0px 8px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;}.btn{background-color:rgba(66, 139, 202, 0.8) !important;border-radius:0.5em !important;-moz-border-radius:30px;-webkit-border-radius:30px;color:white !important;padding:1em !important;}#features-sec h3{color:#666565;}#features-sec hr{border:1px solid rgba(184, 94, 255, 1);width:30%;}#features-sec p{line-height:30px;color:#9C9C9C;}#skill-sec h4{text-align:center;padding-top:20px;font-weight:900;}#skill-sec .overlay{padding-top:50px;undefined:undefined;min-height:250px;background-color:rgba(5, 5, 5, 0.45);}#advance-sec h3{color:#666565;}#advance-sec p{line-height:30px;color:#9C9C9C;}#just-sec .overlay{background:rgba(72, 104, 233, 0.95);padding:50px 30px;}.portfolio-item img:hover{cursor:pointer;-webkit-transform:scale(1.5, 1.5);-ms-transform:scale(1.5, 1.5);transform:scale(1.5, 1.5);transition-duration:0.3s;-webkit-transition-duration:0.3s;undefined:undefined;z-index:1;}ul#filters{padding:0px;}#filters li{display:-webkit-inline-box;}#filters li span{display:block;padding:5px 4px;text-decoration:none;cursor:pointer;font-size:14px;font-weight:800;}#port-folio .portfolio-item{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-o-box-sizing:border-box;width:100%;float:left;overflow:hidden;display:none;}footer{background-color:rgba(50, 51, 58,1);color:#fff;margin-top:2em;}footer h3{color:#FFF;font-weight:900;}.sidenav{height:100%;width:0;position:fixed;z-index:1;top:0;left:0;background-color:rgba(0, 0, 0, 0.5);overflow-x:hidden;transition:0.5s;padding-top:60px;font-family:'Open Sans', sans-serif;}.sidenav a{undefined:undefined;text-decoration:none;color:#fff;display:block;transition:0.3s;background-color:rgba(0, 0, 0, 0.65);}.sidenav .closebtn{position:absolute;top:0;right:25px;font-size:36px;margin-left:50px;}.list-group.panel{border:0;border-radius:0;margin-bottom:0;}.list-group-item{border:none !important;background-color:rgba(0, 0, 0, 0.5);font-size:18px;color:white !important;}.list-group-item-success{background-color:rgba(0, 0, 0, 0.65);font-size:20px;color:white !important;border-radius:none !important;}a.list-group-item:focus, a.list-group-item:hover, button.list-group-item:focus, button.list-group-item:hover{color:#555 !important;text-decoration:none !important;background-color:#f5f5f5 !important;}a.list-group-item-success:hover{color:#3c763d !important;background-color:#d0e9c6 !important;}#in2oj{font-size:30px;cursor:pointer;float:left;margin-left:20px;margin-top:5px;}@media (max-width: 768px){header{margin:-20px 0 0 0;}}@media (max-width: 375px){header{margin:-20px 0 0 0;}}",
        "gjs-html": "<body><meta charset=\"UTF-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><meta name=\"description\" content=\"This is a sample HTML created by GEPPETTO\"/><meta name=\"author\" content=\"GEPPETTO\"/><meta name=\"keywords\" content=\"geppetto,web,development\"/><title>\n        Geppetto\n    </title><base href=\"/\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><script src=\"https://cdn.ckeditor.com/4.5.11/full/ckeditor.js\"></script><link rel=\"stylesheet\" href=\"assets/css/bootstrap.min.css\"/><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css\"/><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script><script>\n        function openNav() {\n        document.getElementById(\"mySidenav\").style.width = \"auto\";\n      }\n    \n      function closeNav() {\n        document.getElementById(\"mySidenav\").style.width = \"0\";\n      }\n    </script><nav class=\"navbar navbar-inverse\"><div class=\"navbar-header\"><span onclick=\"openNav()\" id=\"in2oj\">☰</span><button type=\"button\" data-toggle=\"collapse\" data-target=\"#myNavbar\" class=\"navbar-toggle\"><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">GEPPETTO</a></div><div id=\"myNavbar\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li class=\"active\"><a href=\"/\">Home</a></li></ul></div><div id=\"mySidenav\" class=\"sidenav\"><a href=\"javascript:void(0)\" onclick=\"closeNav()\" class=\"closebtn\">×</a><div id=\"MainMenu\"><div class=\"list-group panel\"><a href=\"#Student\" data-toggle=\"collapse\" data-parent=\"#MainMenu\" class=\"list-group-item list-group-item-success\">Student <i class=\"fa fa-caret-down\"></i></a><div id=\"Student\" class=\"collapse\"><a href=\"#\" class=\"list-group-item\">CreateNoun</a></div></div></div></div></nav><header><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12\"><h1>GEPPETTO SOFTWARE</h1><span>This is an HTML template developed by GEPPETTO</span></div></div></div></header><section><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12\"><h2>Content Title</h2><hr/></div></div><div class=\"row\"><div class=\"col-lg-6\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ratione quo alias fugit maiores\n                        enim odio\n                        amet, harum provident necessitatibus, error eveniet iste non voluptatibus dolore rem voluptates\n                        deleniti\n                        quos?</p><a href=\"#\"><h4>more</h4></a></div><div class=\"col-lg-6\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ratione quo alias fugit maiores\n                        enim odio\n                        amet, harum provident necessitatibus, error eveniet iste non voluptatibus dolore rem voluptates\n                        deleniti\n                        quos?</p><button class=\"btn btn-default\">Read More</button></div></div></div></section><footer><div class=\"container\"><div class=\"row\"><div class=\"footer-col col-md-4\"><h3>Location</h3><p>Sample Place<br/>Sample, XX 99999</p></div><div class=\"footer-col col-md-8\"><h3>About Geppetto</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum incidunt reprehenderit placeat,\n                    animi quo\n                    perferendis magni doloremque tempore autem ut maiores, molestias vero repellat earum optio\n                    similique deleniti\n                    explicabo sint?.</p></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12\">\n                Copyright © GEPPETTO 2016\n            </div></div></div></footer></body>",
        "asset-image": [{
          imagename: 'home',
          image: `data:image/jpg;base64,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9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAzhCSU0EAgAAAAAACAAAAAAAAAAAOEJJTQQwAAAAAAAEAQEBAThCSU0ELQAAAAAABgABAAAABDhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAB9AAAAu4AAAAEAGgAbwBtAGUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAu4AAAH0AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAH0AAAAAFJnaHRsb25nAAAC7gAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAB9AAAAABSZ2h0bG9uZwAAAu4AAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9v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SHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iMjMxMUJDQ0Q5Njk0QTNENjVBRDE2MzhEQzIxMzNBN0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUVGNkZCMEE3MzcyRTcxMUI3ODc4OTIxOUFCMTVDMUMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMjMxMUJDQ0Q5Njk0QTNENjVBRDE2MzhEQzIxMzNBN0MiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkNvbG9yTWF0Y2ggUkdCIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wNy0yNlQyMToyMTo0Mi0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTctMDctMjZUMjI6Mjc6NDQtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTctMDctMjZUMjI6Mjc6NDQtMDQ6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRUY2RkIwQTczNzJFNzExQjc4Nzg5MjE5QUIxNUMxQyIgc3RFdnQ6d2hlbj0iMjAxNy0wNy0yNlQyMjoyNzo0NC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/4gJASUNDX1BST0ZJTEUAAQEAAAIwQURCRQIQAABtbnRyUkdCIFhZWiAHzwAGAAMAAAAAAABhY3NwQVBQTAAAAABub25lAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUFEQkUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApjcHJ0AAAA/AAAADJkZXNjAAABMAAAAGl3dHB0AAABnAAAABRia3B0AAABsAAAABRyVFJDAAABxAAAAA5nVFJDAAAB1AAAAA5iVFJDAAAB5AAAAA5yWFlaAAAB9AAAABRnWFlaAAACCAAAABRiWFlaAAACHAAAABR0ZXh0AAAAAENvcHlyaWdodCAxOTk5IEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkAAAAZGVzYwAAAAAAAAAPQ29sb3JNYXRjaCBSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPbcAAEAAAAA0zpYWVogAAAAAAAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAAQHNAABjdXJ2AAAAAAAAAAEBzQAAY3VydgAAAAAAAAABAc0AAFhZWiAAAAAAAACCawAARmMAAAY2WFlaIAAAAAAAAFIjAACoeQAAG9dYWVogAAAAAAAAIkgAABElAACxIP/uAA5BZG9iZQBkQAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAQEBAQICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAfQC7gMBEQACEQEDEQH/3QAEAF7/xAGiAAAABgIDAQAAAAAAAAAAAAAHCAYFBAkDCgIBAAsBAAAGAwEBAQAAAAAAAAAAAAYFBAMHAggBCQAKCxAAAgEDBAEDAwIDAwMCBgl1AQIDBBEFEgYhBxMiAAgxFEEyIxUJUUIWYSQzF1JxgRhikSVDobHwJjRyChnB0TUn4VM2gvGSokRUc0VGN0djKFVWVxqywtLi8mSDdJOEZaOzw9PjKThm83UqOTpISUpYWVpnaGlqdnd4eXqFhoeIiYqUlZaXmJmapKWmp6ipqrS1tre4ubrExcbHyMnK1NXW19jZ2uTl5ufo6er09fb3+Pn6EQACAQMCBAQDBQQEBAYGBW0BAgMRBCESBTEGACITQVEHMmEUcQhCgSORFVKhYhYzCbEkwdFDcvAX4YI0JZJTGGNE8aKyJjUZVDZFZCcKc4OTRnTC0uLyVWV1VjeEhaOzw9Pj8ykalKS0xNTk9JWltcXV5fUoR1dmOHaGlqa2xtbm9md3h5ent8fX5/dIWGh4iJiouMjY6Pg5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6vr/2gAMAwEAAhEDEQA/ACX+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//9Al/v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv//RJhpP9P8AevfutVHXtJ/p/vXv3Xqjr2k/0/3r37r1R17Sf6f717916o69pP8AT/evfuvVHXtJ/p/vXv3Xqjr2k/0/3r37r1R17Sf6f717916o69pP9P8AevfuvVHXtJ/p/vXv3Xqjr2k/0/3r37r1R17Sf6f717916o69pP8AT/evfuvVHXtJ/p/vXv3Xqjr2k/0/3r37r1R13pP9PfuvVHXWk/0/3r37r1R17Sf6e/deqOvaT/T/AHr37r1R17Sf6f717916o69pP9P969+69Ude0n+n+9e/deqOvaT/AE/3r37r1R17Sf6f717916o69pP++I9+p16o6697ofTrfXveuvde9+4de697917r3v3Xuve/de697917r3vdD6de69b36h69173rh17r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3vdOvde96691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//9InOk/4e906rqHXtJ/w9+p17UOvaT/h79Tr2ode0n/D36nXtQ69pP8Ah79Tr2ode0n/AA9+p17UOvaT/h79Tr2ode0n/D36nXtQ69pP+Hv1Ovah17Sf8Pfqde1Dr2k/4e/U69qHXtJ/w9+p17UOvaT/AIe/U69qHXtJ/wAPfqde1Dr2k/4e/U69qHXtJ/w9+p17UOvaT/h79Tr2ode0n/D36nXtQ69pP+Hv1Ovah17Sf8Pfqde1Dr2k/wCHv1Ovah17Sf8AD36nXtQ69pP+Hv1Ovah17Sf8Pfqde1DrrQf99/yL37rWD14pb/jX/IvfuvY68EP/ACP37r2OvaP99z/xT37PXsddaT/Q/wC29+63QevXEj378utEfs69Y+/fl16h69731rr3v1D6de697917r3vXXuve/de66Iv+T731uvy646T/AIe9163UdcbH+nvxofPrdR16x/ofeqD169Xr2k+/UHr16vXrf6/v1B69er163v1B5Hr1R1179pPXqjr1/e9Pr1rUOvXHv2nr2odeuPftPXtQ6979pHXtXXr+/aevah16/vdOvVHXdx+P979+69UevXd1P1496oetVpwPXdv6c+/fb1sHrh79pHXtQ69/iPetPz63XFR11c+/aT1XUevXPvVPl17Ueuve6H068TXr3+w9+oevV+XXv9h79Q9er8uve9da4dd+7afn1uvXdx73TrdR12CPfuvVHr1y0/7Ef77/AAPvVevV670j/H3qvWqnror/AE97r1uvXH3vrfXveqUz17rlpP8Ah79XrVR1x97631736levddXHuunrWoddX96p17V11791XrsH36nVgfXrla/u1B1uvXek+9UHWtXXrH+nvdR1uo670n36vWq9d6feq9ar13pHv1et5PXtHv1T17PXWkf4+/V61U9cSLe9g9bBr1178RXrfXvfiMde66960nr1eve96R16teu7e9aR17r1j/Q+/UHr16vXrH+h9+oPXr1evWP9D79Qder13pPv1B16vX//0yhaB/vh7tX5dUqPTr2gf74e/V+XXqj069oH++Hv1fl16o9OvaB/vh79X5deqPTr2gf74e/V+XXqj069oH++Hv1fl16o9OvaP99b3v8ALr1R6de0D/fD3qvy69UenXtA/wB8Pfq/Lr1R6ddaP8f9497qPTrx694/8f8AeP8AjfvWOtde8f8Aj/vH/G/euvde8f8Aj/vH/G/fuvde8f8Aj/vHv3Xsde8Y/r7317HXvH/j/vH/ABv3rr3XtA/r791vHp13oH++Hvdfl16o9OvaB/vh79X5deqPTr2gf74e/V+XXqj069oH++Hv1fl16o9OvaP99b37r1R6ddaP8feuvY9OveP/AB/3j37rXXWj/H/eP+Nn3vr3Xfj/AMf94/437117r2j/AB/33+39+63jrrQfe+vY660H/fW/4r79j16111oP9P8AevfuvddFSPqPfqHr1euOkf0Hv2evdcSo/HH+w97B6rWnXHSfe8der17Sf6f7179jrdR1x976913Y/wBP9496x16vXVveqfPr1eu7H36g9evVHXtJ9+oPXr1R13pPv1B69eqOutJ97x16o69pP9P9596oOvVHXRX/AA9+p8+tY660f4f7x73+fXj9vXrAe/afn17A64kX9+oeq1660j3vPW69dFbc+9A9bB66IP1+v+w97r16vXVj/T36vW6jr1j/AEPv3Xq9dlT/AK/vVetV69Y/0/29ve+vVHr13Y/0X36nWqj59d2/B+n9Le9flnr1eu7D8j34A+vXgevFR/T37I8+tk9Y/e+t9e9+691170eHXuur+6569Udd3921Dr3XfvfXuuxf6j37r1euWsj6j/ivvWnr3XZb/Ef73/xPvVOvAn064nn6Ef630974deJPmOvBf6m3+v8A8j97/LrwOesg+n1v/j7rTrfXiL+/UPXgadY2W3vYPl1s564+99V697917rr3oivW+ve/AU691yBsR78R1sHFOs3utOtdd297p1bT8+urW9+p6dVIp13f3uny62CPPrkBf6e9Y9OrV670n+nv1R16o66K/wBR79jrWD1xI9+p8+tEU64aR73Q+vXtR68Ftf8APv2evV660n8+/Z68SOuwnv2evV9OuekD36g63T59et79QenXtPz66t71TqvXvftPz69173ug691//9Qp2g/0/wB9/t/d6fPpnt69oP8AT/ff7f36nz6929e0H+n++/2/v1Pn17t69oP9P99/t/fqfPr3b17Sf6f7179T59eqOu9H+t79+fXqj0660n+n+9e/U+fXqjr2k+/U+fW6jrox3/H+8/8AG/fvz61Ude8d/wAf77/b+/fn16o694/8P95/4379X59bqD114x/T/ef+N+9/n16o670f4e9faetY678f+0j/AHj/AIr79/tut0668X+H+8/8b9+r/S63134v99c/8V9+r8+tfl17x3/H+8/8b9+/Pr1OuvH/ALT/AL7/AG/v1T69e68Et+P95/4379x4nrVR13oP9P8Aff7f378+vCnXihP4/wB5H/FffsevVqnrvQ39P96/4r71QevXuutBP4/3r/ivvePXr3XvGf6f7z/xv378+t1PXvGf6f7z/wAb9+r8+vVPXXi/2n/ef+N+/VPr1rrgUH+t/vv9f37PmOvddeP/AB/3j/jfv1P6PXuu9A/3x9+ofTr3XXj/AMf94/4379w8uvdcCh9+x69VNPPrgU5+nvwr177Djrhov/vv+N+7Z9OvVr5ddFPfjXzHVfy660f0PvWPTr3XvGf8Pe6D06917xn+vv1Pl17r3jP5t79T5de65aP8f99/t/fs+nW6geXXtA/x96qa8Otde0D3vPp17rvSPes9bqeuiv8AQe958+vA9Y7W+vvfVQeurX97pXrfXHSv9PeuvV6xstvp9Pe6dVBr1x9+4db6971SvXuurC9/z79Qdbqeu/e+tde9+691736nXuve/de697917r3v3XiaddFgPfqder6dYyxP04HvXW+uNz7916p69c+/deqeuvfs9er173rT17r3vYFOtdd8+9063U9clJv/AL379TrxPr1nCk/T37rXXEof6H/ex71TrdadY7Ee/U6vUdeDN/yP37qtPl12Ht+Pfut8PPrmHB/w/wBf37r1fl10WU3Hv1OvV64G349209b6691oR17r3v1Mde67AJ97p8+tE0670H/D3qnXq9ZFBAt/vh791uprw6yLz/gfdadWr1zNvo3+3+nvwHXvs66KA8g+99a64WI/w97pXrXXNST9R/sfeiPXr1eufv3XuuiAfx79TrdT11oX37r3Xig/HHv3XuutA/qffuvdcwAPp79Qdeqeve9UHWuve/UHW+utI97p16p6xMR+OP8AY+9060W9euN/fqdaqOv/1Su+En/fH3Yn16Zz69e8P++uffut5+fXvD/vuffutZ668P8AvuffuvZ+fXvD/vuffuvZ+fXvD/vuffuvZ+fXvD/vuffuvVPXvD/rf7c+/Y61VuveH/W/3n37reeveH/fc+/dez8+veH/AFv959+69U9e8P8AvuffuvZ678P+t/vPv3Xs9d+A/wBP9796x1uv+rHXvB/h/vf/ABT36o69+fXvBb6j/b3/AOKe99e/Pr3ht+P95PvXXq9deH/W/wBv73Xr2eu/Af6f7371jr1f9WOveH/W/wBufe+t9e8H+H/Q3vXXuu/B/h/vfv3W+uvD/gP959+61Tr3g/31z/xT37r1D8+veH/W/wBuffuvddeH/W/259761n164GA/6/8Arf8AI/fq9epXy668R/of9sfe6j069T5de8R/3w9661j5dcDHf8X/ANv72Pkevfl114f99z73nr2euBhPvWOvfb1x8R/x/wBt731rrgYj+f8AiR78Pl1rroRH+g/23v35nrX29d+I/wBBf/W/4179+3r3XRUj36nz69Xrjp/wP+8+90+fW9XXEgk8/T/Y+9gHqpPXgn5A/wB796NfXrWT59eK/kj/AHv3sD59erSmeuOk/gA/7f8A437916vXtH9Tb/D3vrdeuiotcn/ePfgOtVr5dYz731omuesRU39749aLddaDz9Pfsdar1xK2/p/tve6V8+t1r11b/D3ogjrdevaR/T36p69U9dWH++v79U9e1U8+vGx/Hv3VdXWMg/8AIufftI9erauurn37Tnr2o9de/aevVPXveutdcCDe/vYPVgeuNifeqfPrdR1y0f4+90+XWtXXege/U+XXtXXWj/H/AH3+39+pxx17V13pH+Pv1Pl17UeuJUj3rT1vUOvK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GtvwP9e1v96Hv3Xusdh/Qf7b3uh8uvV66MV/x/vXv1T6dVx1x8YP+Hv1OvU668af77/kXvefUdeqOuJiB/Stz/re/darXrGYP99/vh73+XWqdcTAb/QW/wAbX97r1qnWNogP7P8AvX/FPfgfXquOozR3v+P99/re91NOq0HWBozc/T/WPvdfPrfWMxk/j/Yi1/eq+nWuuBjt/wAb92BHXvs64lG/5Ef+K+/de668ZHJH/Ee7fb1Ufb11oIH09+69g9daT/T3vHVevCP/AA9+HW6+p67MXHAFv99+be99er6ddCEngDn/AF/fqde1HqQlMR9b396r1uvWfw6fxYf4W9+z1vh1hchT/wAV97p1rV1EZre99e4/Z1gLC3B91r1cCvWIj/be/cevEU4dcLf0A/2PuvXq+vXTf63vwzXrY64e/aR1brmrspBB+nvefz61QdSkq3J9X+8e90H59aNR1KSXWQfr79Qdaqes+nVYWsffuvcOu/D/AI/77/be/dbr11odDe1x/h711up65WBHI9+I68D11oH4vb3o9WB9B134z/vuf9696r1sHrmsZH+x9649br1lEX+Hvx/LrX29cvHYfQf7x711vrl4/wDBf99/sPfq/PrfXYitzx79jr3XLx8X9+p1vHXvH/j79T5dex14IB79Q+nXq04dcgn+x9+p9nW6nr2ge90+zrRr59eCgf8AG/fqHr1evFR79Q9er1jKke949OtHrgfp78AOvV6jPGT/AF5926r1iMKnjn/Ye918utU6wvTj6jj3sHrXWIQjkDlh79TqvXARm5Wx/oT/ALBTe/vdP8PWq8fs6//QBwx/4f7179TpokHz64+Ef0P+8f8AFPe/y69Udd+If0/4j/ifdc+nWsevXXi/2n/ev+K+/daqOu9H+0/7x79Tq2PI9eMZt9P94Hv1Otfn17xE/wBkf7Ye90+fVeu/E3+p/wB4Hv1K9W/PrwgP+I/2A/4p71UdeIrjr32xP+q/23v1fl16hPXIUv5sf94961dW0/LrmKX/AA/3r/ib+/V69o699uP9T/vXv3WqdeNOB9R/vXv1Set0Xrj4o/8AfAe/Z6129cCsQ/F/9YD3uh9OtHSOvWT+h/5JHvVD1vUvr10QP9R/vA97p17UvXVv9p/3j/jXvVOtax1x/wCQB/vHu2n59er13b/m2f8AbD3qnz69r66N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t/xr36g+XW69diL/AAt/t/fqU69X59d+L/W/2597qB5daqeveMW+n+8H3rrf59cCB/T3anWqnrHbmwAv/sfeqdVqesgjsLkf7wbe99e/PqMeTyOP9jf36nWtXWNkb8W/33+xHuwHVSa9cTFaxvf3vrdeuBUEcWHv1KDrVesRH9f9tb3ug69X9vUdkBJNv9797r1UnrgY+L29760T8+uPjH1/Fv8AinF/fv8AP1vyP2df/9JClVI/J/33+w9+A6Y19cAv9FI9+p1qteuRQ/1P++/2I9+p16rdcSpP0v8A71/xPvdOtE9cfG3+P+3HvdOq1+XXYT/g/wDvX/Ej3unW69e8YJ+h/wBf3WnXq0HHr3i/w/3n3ah69q+3rl4j/tX+8/8AFfdadV1de8Z/ofe6deqvXvGf8f8Abe9Y61Xroxt/Q/71/wAT79jrYPXFoj/Un36vWqt1j8R/o3v1OvVb064NCf8AH/iP+J97HWtXWPwn+h/3j3f8+q0PXXgP9D/tx71TrefTr3h/1/8Abj37/Vw6117w/wCv/tx71Trx66MX+v8A737916vXERW/r/tv+N+91PXq+p64mEf4/wC9f8V9+qfTr1euvF/r/wC3Hv3V6jriYf8AX/33+sffgvXqg9dGAf74H/ivv3Dr1eujF/gf99/sfeutL9nXHxf7T/vP/G/dqD163Xr3g/x/3n/jXv1T69b678P+B/2x961HqteuxDf8f73/AMV971Hr1eveD/A/7z/xX36nXq9d/b/77/fH3up69Xrv7f8A33++Pv1T1uo699v/AL7/AHx9663q694Lf76//E+/de1fProw2/33/G/futhvn1xaIW+pP+8f8a9+49aJ6xeAtyCeP6f8j9+61jrKKe/5Pv1OvVpx66MIH5P++/1/futauo0qAA2t/vr+7jrRbpqmU3/H/IP/ACP3bpgnqIy8k3926rVusek/4/7Y+9dboPXroqt/rf8A2/vek9aZj119P6+9aetaqdeBP5t/yD73p+XXtXXWlz+f94/4r79RetauuJH9Cf8Ab+/U60T+fXtI9+p8+vVPXRU/Ucf77+vv329br1x0XHq97p1rV1jZVHA/33+8+9060Wz1iOn8H/bj37Sevaj6dY2F/wDYe9U63q6xfT6D3uh62SfTrPHI4/LD37HXtXUjUHHIt/re/U68T1GljH1/2P8Atvfq9ar1FKsPoT71XreW6xEE/T3up63jz6wMgP1HvxPp1ZSfy6wtCfwP+Ke/U63XrGYP9h791ot69eFPf6A/77/Y+7U61q6kx0ZNuPdevaupqY2/1B9+p1evUpcYv10+/auq8esq48D8H3bV1qnUpKawtb/e/wDjXup6uB1k+3/33++Pvdft63jr32/+B/3v/evdetivXvt+f+N/8b92r16vz699v/vv98feq/Lr1fn1kEPH++/4379TrdeuXgP+oP8Avv8AY+9fn1vrvxf77n3X9vW6/ProRX/Fve+t1+fXPwm36ffvy69X59Y/H/h/vP8Axv37rVT1yEV/99/xT37r1fn14xN/T/e/+J9661q6xGIn8n/ff7H3s06sa9Y3i/xN/wDW97A6pXPWRIdI5HJ/3j349br10yXuOR73Tqteo0kdvpf34evWieseg/TT/vv9f36nWq9Y2Ti3592p1st8usXiJ/r/ALce99erXr3h/wB9f37/AFcOtY66MP8Ah/vR/wCJ96x17rg0P++/4373TrVeuHh/33+w97p3fn17/N1//9NKGA3HB/33+Pu3SKh67FP/AIH/AG/v2er1Pr177cf0P+3HvdOtVPXvt7fg3/1/futMCevCD/A/7f8A417tU+fVDXrv7c/0P+391x1un2dd/bH+h/3n/inutfl1ag67FMf6H/ef+Ke99aoOu/Af6f73/wAU9+r178+veA/0P+8/8U9+r1unz66NOf6H/ef+Ke9Y69+fXRg5+n+8+99eI64mAj8H/ff6/vXVOuBg/wAD/vf+9e9568DTrh4P8P8Ae/dq9ex17wH+n+8t7rTr1T69e+3/AMP+hvfqdex1xMBH4P8Avv8AX97p17rgaf8AoP8Aefe+t1+fXXgP+p/3n/jXvVfn1T/V59dGE/0P+8/8R7114Drj9uf99f8A4p73TrdR1xMJtyD/AL7/AGx9+rXrynriYR/Q/wCw9+/MdWqeuBh/qP8AeT/xPvZ8+tVrx64+E/0PvVfn1uny694j/vj73nr1fn14Q/4f7z/xT3oHr1Pl12If8P8Aef8Ainu3WqdcxCf6f8R7qetFR1z8J/ofevy6tTrwgH9P9uf+R+9161U9diD+n/E/8U9+r6der1wMJH4HvYPz62T1xMLf0/3v36vz61Ujrg0LD8f7zx/xX34daJ9esPjP++v7t1XHoeuawkDm9v8Aef8AeffurV64SEILcf8AG/8Ae/etPVdXUKWUG41D3cL1TV01yFmPBa3u1em616jmNrX0/wC9/wDFPfutCvXTRm1j/vv94+nu3Xm6xGA/gE/77/Y+/V60D6ddCnb8g/8AEe99VPy68YCP6/77/Ye/V691jMbf6n/ff7H36nr177eutH9b+9VPl1Unrxj4+h/2P/Ive6nr1evaR9CtvduvV+fXBlH4BP8AsD7qKder+3rA6gcj3anWusJUn8av99/rD3uvVdPXAxMfqvvQPp17HXRhN+Rz73Tq1Pn1wMdj+f8AW/4379T5dar14R2+t/8AevfqdeBp11pYH6e9MenAeuJv+feqdbrXrGUc/wC+/wCNe96gOtE9e8Tn34569XrsUcp5Csf9j73Tr1aefWVKGUn9H+9+/UHW618+p0eLLD1KPeqjr3d1lXEAHgD/AGH1/wBt9Pe9XWqHrPHjgn/IvftR6toPUgUpX8f7z/vj71Xq9OuYhP8AQf7179TrdR1yEJ/p/wAR/wAT71TrWOuxDb+v+wt/xv36vVyeuXh/wP8Avv8AYe9UHWwPn1yEQt+n/efdqdbxTroxD+h/3n36nWqDyPXhED+D/tz711ug9euQgb+hP++/2Pv3VushhJ4sdP8Avv6e6063Qfn1jamDHj/if99f3vrVOua0wA+n+8+616912Yj/AEPvdetjHXAw8/p/3n3unXuuJj/wP+w91qevceuBib/fX9+oOtdYzD/Qkn3uvWuuK0rckgX96r14Drk0BB/p/sf+K+9163T59dNC1rge/efWusJhJHKkf7H36nWqdY2hK/QX97r+zqrCnWAwk8m/vYPVaDroQEf2T/t/fq9eH29dGH/A/wC3Hu3WjTrrw/4f7z71Xr3XAxH/AI0f+Ne99VqPXrj4efp/vf8AU+91/wAPW6/4Ov/UgGn5+h/23v359JuuvAP6f7179+fXuuXg/wAD/vP/ABX3vpuvXX24/of9t73Xreo/6j134P8AA/7z/wAV9+p1qvXvB/gf95/4r7116vXL7b/D/ebf8T711vrsU3+B/wBgf+N+/de65fb/AO0n/eP+Ke/deqPXriab/A/7E/8AG/fuvdcft7fj/e/+K+/der1xNOf99/vj791qtesZp/8AA/7x/wASPfuq0699u3+pP+2Hv2Pl1qnXX23+0n/bD/inv359b/Pr32/+0n/ePfvz61UddeD/AAP+9+/U61pHXAwD+h/23/I/fvsPW2PXBoB/Q/61h/xN/dutA/Lr32//AAb/AG3uhPy61+XWM03+H+8f8b97PW6r119v/h/vX/FfdutV+XXAwD+h/wBt7r17VTrH4P8AaT73+fXtfXE0/wDh/vv95961dW1ddfb/AO0f70P97Pvf5de1fxddfbn/AFB/3j3uvW69cvth/T/ev+K+/V61r+XXL7b/AA/33+39+60Osgph/T/eL+9der139sP6H/kkf8U9763U+nXE0/8Ah/vv949+1dbp14U4/p/vX/G/futHrpqX8j/ff8a9+63XqM8BFxY39+6r1GeJgbBT731UjrEUkH6UP+293xXqgPz6wSLMb3H/ACT731qr9QWjcmxB/wBt/X36vVfXryUbE+of8m2t78vl17V1mkx4XkL73Xq1OulpI2UqQb/77+vvdevDrDPQaBe1197B6q3UYQKDyp/2x9+r8uvdZftbjge91+XWusTU3PK/7x73X5dep1iakX+h/wBt71U9VYdYHpLer/ff7z791TrGIrf2f94Pv1T17T1waC/9ffut166+0kb8H/ff73731pj119j/AK/++/1veq/LrXXFqa30H+9f8R7tXrY6wtAVH6b/AO+/1/eq9bofPriaWQi5Sw97r16mnz6x/Zvfi7D/AGHv1eqVX164/YyH+z79UdbDenXf2Uin/Nsffm6tWnXYx7sVJRgPfqdbr6dT4sST/ZPvVet/F1MTEAH9JPv1eraOpy45AP0kf46fetXW6fLrMtBGPop/3v8A330961dWVesgoV/1N/8Aff6/v1erfn140dr8H/bf8T79Xqv59YWpj/Rh/vv9f3av7etV6xGn/wBpt/tve69ep8+uX2/+0f77/b+/V+Z63n16x/b/AO+v/wAb9361Xrv7f/D/AH3+3901fLq/XRg/1/8Aef8Ajfv1fl16vXvAP6f73/xX37V8utV678A/p/vB/wCK+/V+XW6/Pr3g/wAD/tj/AMV9+r8ut1Pr1kWLj6H/AGA/31/fqdWr1y8YH4v7rXr1euvEP9T73+fW9PXvEP8AU+/fn17T14w/4H3qvWtPXDwj/fD/AI373n063Trowf4f7x/yL3rqueuPgv8A8a/5F791uny68ae39f8Aeveq9ep8uuPh/wAD/vv9h73+zrdOuvB/gf8Abj3qvy61p64tCQP+Rf8AFSPfq9boOsJhJ+t/9497r8uq0668XH0P/E/7b3uvVeuJh4+n+8f74j37rdesfi/FuP6+99Vp+3rE8QPv3XiOsXit+P8Aif8Aivu1OtUp59cTD/r/AO3HvdeqMOuHh/4j8f6/496B4/b1qufy6//VcDS8/wDI/dek359e+1/33P8AxT36vXv9t1y+zH+q/wB5PvVT1rPr1x+0/pf/AHn/AIj37V1sfb139qP8f95971nr2fUdcxS/1/3n/jXuta9ap139qP8AfX9+69T5HrkKT/D/AHv/AI373q69Qde+0X/avdc9ep1wNN/vv+R+99b+3riaT+t/ftXy6rQdcDSf0H+9+3Ot064/an/fX/4r791WvXvtT/qf94P/ABX3rV1ug66NMLf8j961dep8+ujT8f8AGj7t16nz64fbf6/+2Pvx6bp8+uBplPulT1eh9euvtR/Q/wC3P/FPe9Xz6p1wNL/vuf8Aivv2o+fW2TPXH7b/AA/3n3qp6ppPr10ab/A/7Y/8V97r1opXro03+v8A7b36o63Q9YzSk/8AIj7tq611x+0/x/33+291/PrdP6PXvth/X/ff7b3vX8j1rHp1x+1P+P8AvHvWofLr1D139r/tX+8f8a9+1fLr1D139r/j/vfv1fl16ny67+2/x/33+2921fLrdT6dcvtz/X/eT73X5dep8uuJpz/j/vv9v78OvV6x+A/4/wC8/wDFPdKde1dYzEw+n0/H++t7t1XX8+sTQpflGH+39+63WnXvFCwsfr/tXv3Wq9dmhR14IP8At/dur06xNjrt+n/e+P8AD6e/auq6Oo0mNI5C6v8Ab+7V60ydYxSlf7J/2x96r1SnWRILmxUj/b+99WU46zNjo2F7C/8Asf8AYfT3qvVmHWE47iwv+PS1/e69a0dcTiUuGKj/AG3vVevaOuLYxSPyP9v7tXqrL1gfEsP0uLf43971efVdJ6iSYuYc+lvdtXVGVuoLUkinTob/AJJ9+qOq9cTQ3+q2/wB9/S3u3VW67FCo9QBY+9161TrG0Lg6dGkf8E9+Y9e+HrH9hMx+jf7z/vj7316ny6yDFu36g3+x96+fXgvUhMT+LDi3q596r1dU6ynEqfT9f9v79UdW8PrgMV+P+IP/ABT3uvy6r4PUhMWqjlQP9gfeq16t4fXMY5B9AP8Abe9V63oPXL7BB/YLf7f/AIge96urBeua0in+z/vv9b3XV1ulOuf22n+v+3/4qPeuvU+fXRpyfrf/AH3+x97+zqwPXXg0/wBf9h791Tj17w/4H/bH/ivv1enKnr3j/r/sR/yP3r7OtdY2T8H/AHi//Ej3vr3WEx/4X/1vdh1uvp1x8QP++P8AxI9+r8uqV9evGHj/AIpz71Xq35dcTT3/AN8ffq9V+fXX2v8AtXu1fl1br32xH9f94/4r79Xr1eu/B/gf99/sfftXW69e+3/31/8AjfvdevV+fXIU/wDvv99f3Svp1rSPTrs0v++5P+9e91+fVq9deC30/wB9/tz71Xr1R+fXjEf99/xo+/VHXsHrrxH/AHwPvdfn1qg64+D/AH3PvVet/n17wj/fX9+69nr3gA+t/wDff7b37r1euDRD8f8AE+99er1jKX/4379WnXg3XDxj/fE+69b1dcGRf99f/ebj3qnn1rV+3rGU/wBSPdqevVeuvCv++v8A8V97HXuunj4/4m3++497611gMK/0P+8+91r1UnrgYh+bW/2PvdetE9cDGB/vj/xT3qvy69UdYzEvu1fl1Vj1w8XNufqP+ivfiO1eq1zx8uv/1loaTn6D/ff7H2z0m0n067+0P9B/vPv2rrWn7OuH2v8AtI/2/wDxv3br1fmeuX2x/p/vH/G/fsevVajrwpT/AE/23/I/eur/AG9cxSH8Af7b36vz639o65ikP+p/33+8e66h69a/Prn9mP6D/be9163X59cGpR/T/ePe+tdYjSj+nvQ631wNKP6D/bX/AOJ926r+fXX2g/p/vA/4r79178uuvtR/T/eP+Ne9V+fW8f6v+L66+3/xH+29+69Qfw9dGnH9B/vv9t7917Hp1iNKD+P9793691xNOP6D3r7eq06xmnH9D/vJ/wB6966310af/aQf9v8A8Rf37r3XH7f/AGkf7f8A437q3Vaj064/b/4D/efftZ9evU/pddfbf7SP99/sPe/z6rT59e+2/wBpX/bH/ivvWet0HXvtv9pH++/2Hvf59ap8+u/tz/T/AHv/AIp711rT1w+2/wAF/wB5/wCK+/fl1vSfXr323+C/7z/xX378uvaT69d/a/4f77/be/auvU64tTj+g/2H++Hv2qnHrXXvtz/Qf7b/AI37tq63p66+3b/U/wC8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`
        }]
      }
]