import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

export class TemplateHeader {
  public static HTML_TAG = `
<nav className='navbar navbar-inverse' id='template-i090p'>
    <div className='navbar-header' id='template-iyoc4'>
      <span onclick='openNav()' id='in2oj'>☰</span>
      <button className='navbar-toggle' type='button' data-toggle='collapse' data-target='#myNavbar' id='template-ioico'>
        <span className='icon-bar' id='template-iy169'>
        </span>
        <span className='icon-bar' id='template-ivo7o'>
        </span>
        <span className='icon-bar' id='template-ihry1'>
        </span>
      </button>
      <a className='navbar-brand' [routerLink]="['/home']" id='template-io1pk'>GEPPETTO</a>
    </div>
    <div className='collapse navbar-collapse' id='myNavbar'>
      <ul className='nav navbar-nav navbar-right' id='template-ionqz'>
        <li className='active' id='template-ivm2e'>
          <a [routerLink]="['/']" id='template-iz682'>Home</a>
        </li>
      </ul>
    </div>
    <div className='sidenav' id='mySidenav'>
      <div className='closebtn' href='javascript:void(0)' onclick='closeNav()' id='template-if7ki'>×</div>
      <div id='MainMenu'>
      </div>
    </div>
  </nav>
  <div className="modal" tabindex="-1" role="dialog" [ngStyle]="{'top': '100px','display': confirmLangChangeModal}">
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
  </div>`;

  public static HTML_SIDENAV_TSX = 
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
      import DropdownButton from 'react-bootstrap/DropdownButton';
      import Dropdown from 'react-bootstrap/Dropdown';
  
      const Header = () => {
          const [isOpen, setIsOpen] = useState(false);
  
          const toggle = () => setIsOpen(!isOpen);
          const openNav = () => {
            document.getElementById('mySidenav')!.style.width = "250px";
            document.getElementById("main")!.style.marginLeft = "250px";
            document.getElementById("foot")!.style.marginLeft = "250px";
            document.getElementById("mySidenav")!.style.backgroundColor = "#1E1E1E";
        };
        const closeNav = () => {
            document.getElementById("mySidenav")!.style.width = "0";
            document.getElementById("main")!.style.marginLeft = "0%";
            document.getElementById("foot")!.style.marginLeft = "0%";
        };
          return (
        `;
  public static CSS_DATA = `
        .list-group.panel {
            border: 0;
            border-radius: 0;
            margin-bottom: 0;
        }
        
        .list-group-item {
            border: none !important;
            background-color: rgb(85, 85, 85) !important;
            font-size: 18px;
            color: white !important;
        }
        
        .list-group-item-success {
            background-color: rgb(85, 85, 85) !important;
            font-size: 20px;
            color: white !important;
            border-radius: none !important;
        }
        
        li {
            list-style: none;
        }
        
        .dropdown-container {
            display: none;
            background-color: #262626;
            padding-left: 8px;
          }
        
        // --------------------------------------------------------------------
        #icrvgp {
            padding: 5px 0 5px 10px;
            /* height: 50px; */
            flex: 1 1 100%;
        }
        
        #icrvgp:hover {
            background-color: #3d815a;
        }
        #i6vd27 {
            align-items: center;
        }
        #inlo1l {
            flex: 0 1 auto;
            align-self: center;
            padding: 0 0 0 0;
        }
        #iytw4t {
            flex: 0 1 auto;
            align-self: center;
            margin: 0 0 0 15px;
            padding: 0 0 0 0;
        }
        #i9imej {
            color: #ffffff;
            font-size: 18px;
            padding: 0 0 0 0;
            line-height: 24px;
        }
        #i9imej:hover {
            color: #151515;
        }
        #i8h3sg {
            flex: 0 1 auto;
            padding: 8px 10px 10px 10px;
            background-color: #61616B;
            border-radius: 4px 4px 4px 4px;
            max-width: 48px;
        }
        .gpd-clm {
            padding: 5px 0;
        }
        
        .gpd-grid {
            min-height: auto;
            padding: 10px 0;
        }
        
        .gpd-cnt {
            padding: 0;
        }
        .gpd-shape-divider>svg {
            height: 100%;
            width: 100%;
            transform: scaleY(-1);
        }
        
        .gpd-shape-divider--fl-v>svg {
            transform: scaleY(1);
        }
        
        .gpd-shape-divider--fl-h>svg {
            transform: scaleX(-1) scaleY(-1);
        }
        
        .gpd-shape-divider--fl-v-h>svg {
            transform: scaleY(1) scaleX(-1);
        }
        
        .gpd-shape-divider>svg>path {
            fill: currentColor;
        }
        
        .gpd-shape-divider-inv>path {
            transform: scale(-1, -1) translate(-100%, -100%);
        }
        
        .gpd-navbar {
            width: 100%;
        }
        .gpd-navbar__menu {
            display: none;
        }
        @media (max-width: 768px) {
            .gpd-navbar__menu {
                display: block;
            }
        }
        #iyxitk {
            color: white;
            max-width: 90%;
            font-size: 18px;
        }
        #i0xya-2 {
            padding: 0 0 0 0;
            flex-basis: 23%;
            background-color: black;
            display: block;
            height: 160vh;
        }
        #ibuiwl {
            text-align: right;
            padding: 15px;
        }
        #i60c7-2:hover {
            margin: 0 0 0 0;
        }
        #i60c7-2 {
            flex-direction: column;
            padding: 0 0 0 0;
            background-image: none;
            background-repeat: repeat;
            background-position: left top;
            background-attachment: fixed;
            background-size: auto;
            margin: 0 0 0 0;
        }
        
        //-------------------------------------------------------
        .cell, .cell-gut, .gdp-cell, .gdp-cell-gut {
            flex-grow: 1;
            flex-basis: 100%;
            padding: 5px
        }
        
        .cell-gut, .gdp-cell-gut {
            padding-right: 15px
        }
        
        @media (max-width:768px) {
            .cell-gut, .gdp-cell-gut {
                padding-right: 0
            }
        }
        .gdp-row, .row {
            display: flex;
            justify-content: flex-start;
            align-items: stretch;
            flex-wrap: nowrap;
            padding: 10px;
            min-height: 50px;
            flex-direction: row;
            font-weight: bold;
        }
        
        @media (max-width:768px) {
            .gdp-row, .row {
                flex-wrap: wrap
            }
        }
        .gpd-container {
            width: 90%;
            padding: 25px 0;
            margin: 0 auto;
            max-width: 1200px
        }
        
        .gpd-section {
            display: flex;
            padding: 50px 0
        }
        
        .gpd-image-block {
            height: 200px;
            background-color: #ccc;
            width: auto
        }
        
        .gpd-icon {
            vertical-align: middle;
            fill: currentColor;
            width: 64px;
            height: 64px
        }
        
        .gpd-icon, .gpd-link, .gpd-link-box, .gpd-text {
            display: inline-block;
            text-decoration: none;
            color: inherit
        }
        
        .gpd-link, .gpd-link-box, .gpd-text {
            vertical-align: top;
            padding: 10px;
            max-width: 100%
        }
        
        .gpd-link-box {
            padding: 5px
        }
        
        .gpd-link {
            color: #d983a6
        }`;
}