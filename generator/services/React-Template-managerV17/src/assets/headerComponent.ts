export const sideBar = {
  htmlTag: [`<div className="wrapper">
  <nav id="sidebar" className="active">
      <div className="sidebar-header">
          <div className="marginClass">
            <h4>changename</h4>
          </div>
          <div className="marginClass">
            <a className="close" id="closeIcon"></a>
          </div>
      </div>
      <ul className="list-unstyled components">
  loadnav
      </ul>
  </nav>
  <div id="content" className="active">
      <a id="nav-toggle"><span></span></a>
  </div>
</div>`],
  components: {
    scriptVariable: [
      `$`
    ],
    componentOnInit: [
      `const el = document.querySelector('#nav-toggle');
      const closeIcon = document.querySelector('#closeIcon');
      if (closeIcon && el) {
        closeIcon.addEventListener('click', function() {
          document.getElementById('nav-toggle').click();
        });
      }
      if (el) {
        el.addEventListener('click', function() {
          this.classList.toggle('active');
          this.classList.toggle('change');
          $('#sidebar, #content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
        this.isAdminUser = false;
        this.userId = sessionStorage.getItem('Id');
      }`
    ]
  },
  css: [`#sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
  }

  .close {
    position: absolute;
    right: 32px;
    top: 18px;
    width: 32px;
    height: 32px;
  }
  .close:before, .close:after {
    position: absolute;
    left: 30px;
    content: ' ';
    height: 29px;
    width: 4px;
    background-color: #fff;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  

  .closeClass {
    color: white;
    cursor: pointer;
  }

  .marginClass {
    margin: auto;
    padding: 0;
  }

  .text {
    color: white;
  }
  
  #sidebar.active {
    margin-left: -250px;
  }
  
  #sidebar .sidebar-header {
    padding: 20px;
    background: #6d7fcc;
    display: flex;
  }
  
  #sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
  }
  
  #sidebar ul p {
    color: #fff;
    padding: 10px;
  }
  
  #sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
  }
  
  #sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
  }
  
  #sidebar ul li.active>a,
  a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
  }
  
  
  a[data-toggle="collapse"] {
    position: relative;
  }
  
  
  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
  }
  
  #content {
    padding: 40px;
    transition: all 0.3s;
    top: 0;
    right: 0;
    contentstyle

  }
  
  #content.active {
    width: 100%;
  }
  
  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
  }
  
  #nav-toggle {
    position: absolute;
  }
  
  #nav-toggle {
    cursor: pointer;
  }
  
  #nav-toggle span,
  #nav-toggle span:before,
  #nav-toggle span:after {
    cursor: pointer;
    border-radius: 1px;
    height: 5px;
    width: 35px;
    background: white;
    position: absolute;
    display: block;
    content: '';
  }
  
  #nav-toggle span:before {
    top: -10px;
  }
  
  #nav-toggle span:after {
    bottom: -10px;
  }
  
  #nav-toggle span,
  #nav-toggle span:before,
  #nav-toggle span:after {
    transition: all 500ms ease-in-out;
  }
  
  #nav-toggle.active span {
    background-color: transparent;
  }
  
  #nav-toggle.active span:before,
  #nav-toggle.active span:after {
    top: 0;
  }
  
  #nav-toggle.active span:before {
    transform: rotate(45deg);
  }
  
  #nav-toggle.active span:after {
    transform: rotate(-45deg);
  }
  
  #nav-toggle.change {
    position: fixed !important;
    float: left;
    z-index: 10000;
    margin-top: 0%;
    margin-left: -7%;
  }
  
  @media only screen and(max-width:600px){
    #nav-toggle.change {
      margin-left: -58%;
      margin-top: -1%;
  }
  }
  
  @media only screen and(min-width:600px){
    #nav-toggle.change {
      margin-left: -50%;
  }
  }
  
  @media only screen and(min-width:767px){
    #nav-toggle.change {
      margin-left: -11%;
      margin-top: -1%;
  }
  }
  
  @media only screen and(min-width:992px){
    #nav-toggle.change {
      margin-left: -8%;
      margin-top: -5px;
  
  }
  }
  
  @media only screen and(min-width:1200px){
    #nav-toggle.change {
      margin-left: -7%;
      margin-top: 0;
  }
  }`],
  script: [
    `<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>`,
    `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>`,
    `<script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>`
  ]
}

export const templateScreen = [
  {
    name: 'HSBC TEMPLATE', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#262712'
        }]
      }
    ]
  },
  {
    name: 'CISCO TEMPLATE', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#2abdeb'
        }]
      }
    ]
  },
  {
    name: 'ENJOY THE TRAVEL', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#37273a'
        }]
      }
    ]
  },
  {
    name: 'NIGHT CITY EVENTS', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#15202e'
        }]
      }
    ]
  }, {
    name: 'TWO SIDE TEMPLATE', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#da6777'
        }]
      }
    ]
  }, {
    name: 'RIGHT TEAM', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#3d3b3e'
        }]
      }
    ]
  }, {
    name: 'NIGHT VOYAGER', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#262c35'
        }]
      }
    ]
  }, {
    name: 'GEPPETTONEW TEMPLATE', styles: [
      {
        name: '#content',
        css: [{
          cssName: 'background-color',
          cssValue: '#162230'
        }]
      }
    ]
  }
];

// export const templateScreen = [
//   {
//     name: 'HSBC TEMPLATE', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#191d10'
//         }]
//       }
//     ]
//   },
//   {
//     name: 'CISCO TEMPLATE', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#2abdeb'
//         }]
//       }
//     ]
//   },
//   {
//     name: 'ENJOY THE TRAVEL', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#4b424deb'
//         }]
//       }
//     ]
//   },
//   {
//     name: 'NIGHT CITY EVENTS', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#191d10'
//         }]
//       }
//     ]
//   }, {
//     name: 'TWO SIDE TEMPLATE', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#191d10'
//         }]
//       }
//     ]
//   }, {
//     name: 'RIGHT TEAM', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#191d10'
//         }]
//       }
//     ]
//   }, {
//     name: 'NIGHT VOYAGER', styles: [
//       {
//         name: '.homepage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '0'
//         }, {
//           cssName: 'background-color',
//           cssValue: 'white'
//         }]
//       },
//       {
//         name: '.otherpage',
//         css: [{
//           cssName: 'padding-top',
//           cssValue: '70px'
//         }, {
//           cssName: 'background-color',
//           cssValue: '#191d10'
//         }]
//       }
//     ]
//   }
// ];

export const ConfimModalPopup = {
  htmlTag: [
    `<div className="modal" tabindex="-1" role="dialog" [ngStyle]="{'top': '100px','display': confirmLangChangeModal}">
  <div className="modal-dialog modal-sm" role="dialog">
    <div className="modal-content">
      <div className="modal-body">
        <p>language change cause you to re-login</p>
      </div>
      <div className="modal-footer" style="padding: 5px">
        <button type="button" (click)="confirmLangChange()" className="btn btn-default">Confirm</button>
        <button type="button" (click)="onCloseHandled()" className="btn btn-default">Cancel</button>
      </div>
    </div>

  </div>
</div>`
  ]
}

export const HeaderComponent = {
  htmlImport : [
    `import React, { useState } from 'react';
    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        NavbarText
    } from 'reactstrap';
    import "./header.scss";

    const Header = () => {
        const [isOpen, setIsOpen] = useState(false);

        const toggle = () => setIsOpen(!isOpen);
        return (
    `
  ],
  htmlEnd: [
    `
        )
      }
      
      export default Header;
    `
  ]

}