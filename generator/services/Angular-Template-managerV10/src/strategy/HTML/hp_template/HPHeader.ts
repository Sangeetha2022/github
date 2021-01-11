import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

export class HPHeader {
    public static HTML_TAG = `
    <header class='fixed-top' id='header'>
  <a class='logo mr-auto' href='index.html' id='template-im3f'>
    <img class='img-fluid' src='assets/img/logo.png' alt='' id='template-i810i'>
  </a>
  <div class='navbar' id='template-ixvoa'>
    <nav class='nav-menu d-none d-lg-block' id='template-in2xm'>
    </nav>
  </div>
</header>
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
</div>
    `;
    public static CSS_DATA = ``;
}