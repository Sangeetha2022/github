import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

export class GeppettoHeader {
    public static HTML_TAG = `
<nav class='navbar navbar-inverse' id='template-i090p'>
    <div class='navbar-header' id='template-iyoc4'>
      <span onclick='openNav()' id='in2oj'>☰</span>
      <button class='navbar-toggle' type='button' data-toggle='collapse' data-target='#myNavbar' id='template-ioico'>
        <span class='icon-bar' id='template-iy169'>
        </span>
        <span class='icon-bar' id='template-ivo7o'>
        </span>
        <span class='icon-bar' id='template-ihry1'>
        </span>
      </button>
      <a class='navbar-brand' href='/home' id='template-io1pk'>GEPPETTO</a>
    </div>
    <div class='collapse navbar-collapse' id='myNavbar'>
      <ul class='nav navbar-nav navbar-right' id='template-ionqz'>
        <li class='active' id='template-ivm2e'>
          <a [routerLink]="['/']" id='template-iz682'>Home</a>
        </li>
      </ul>
    </div>
    <div class='sidenav' id='mySidenav'>
      <div class='closebtn' href='javascript:void(0)' onclick='closeNav()' id='template-if7ki'>×</div>
      <div id='MainMenu'>
      </div>
    </div>
  </nav>
  <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'top': '100px','display': confirmLangChangeModal}">
    <div class="modal-dialog modal-sm" role="dialog">
      <div class="modal-content">
        <div class="modal-body">
          <p>language change cause you to re-login</p>
        </div>
        <div class="modal-footer" style="padding: 5px">
          <button type="button" (click)="confirmLangChange()" class="btn btn-default">Confirm</button>
          <button type="button" (click)="onCloseHandled()" class="btn btn-default">Cancel</button>
        </div>
      </div>
    </div>
  </div>`;
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
    }`;
}