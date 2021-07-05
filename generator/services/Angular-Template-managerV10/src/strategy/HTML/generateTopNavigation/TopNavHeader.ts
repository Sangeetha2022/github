import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

export class TopTemplateHeader {
    public static HTML_TAG = `
    <nav data-gjs="navs" id="i011z1" class="menu">
        <div id='MainMenu'>
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
    }
    #i4izs3 {
      margin: 0 0 0 0;
    }
    #i4izs3 {
        margin: 0 100px 0 0;
    }
    
    #izdchj:hover {
        background-color: #649F87;
        border-radius: 5px 5px 5px 5px;
        padding: 8px 20px 8px 20px;
        color: #f9f9f9;
        font-weight: 400;
    }
    
    #izdchj {
        padding: 8px 20px 8px 20px;
        color: inherit;
        font-size: medium;
    }
    
    #ipek5x {
        font-size: medium;
    }
    #sgfsd {
    
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
    
    .nav-items {
        display: inline-block;
        float: right
    }
    
    .menu-link {
        margin: 0;
        color: inherit;
        opacity: 1;
        text-decoration: none;
        display: inline-block;
        vertical-align: middle;
        padding: 10px 15px;
        transition: opacity 0.25s;
        font-size: medium;
    }
    
    .menu-link:hover {
        opacity: 1;
    }`;
}