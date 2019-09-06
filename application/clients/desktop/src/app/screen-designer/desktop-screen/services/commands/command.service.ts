import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  feature_id: any;
  project_id: any;
  screenArray: any[] = [];
  screen_id: any;
  @ViewChild('myModal') myModal: ElementRef;

  constructor(
    private location: Location,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      if (params.featureId !== undefined && params.featureId !== null) {
        this.feature_id = params.featureId;
      } else {
        this.feature_id = undefined;
      }
      if (params.projectId !== undefined && params.projectId !== null) {
        this.project_id = params.projectId;
      } else {
        this.project_id = undefined;
      }
      if (params.screenId !== undefined && params.screenId !== null) {
        this.screen_id = params.screenId;
      } else {
        this.screen_id = undefined;
      }
    });
  }

  addSaveCommand(commandName, editor) {
    const $this = this;
    editor.Commands.add(commandName, {
      run: function (e, n) {
        const eventPopupModel = document.getElementById('myModal');
        eventPopupModel.style.display = 'block';
       }
    });

  }

  addCancelCommand(commandName, editor) {
    const previousPageRoute = this.location;
    editor.Commands.add(commandName, {
      run: function (e, n) {
        n.set('active', 0);
        previousPageRoute.back();
        // window.history.go(-1);
      }
    });

  }
}
