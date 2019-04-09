import { Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  feature_id: any;
  project_id: any;

  constructor(
    private location: Location,
    private activateRoute: ActivatedRoute
  ) {
    activateRoute.queryParams.subscribe(params => {
      console.log('save command ran params values ar e----- ', params);
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
    });
  }

  addSaveCommand(commandName, editor, saveURL) {
    console.log('entering into add save command', saveURL)
    const $this = this;
    editor.Commands.add(commandName, {
      run: function (e, n) {
        editor.StorageManager.get('remote').set({ urlStore: saveURL });
        n.set('active', 0);
        console.log('save command ran for saving features ', $this.feature_id, ' ---- ', $this.project_id);
        // console.log('save command ran for saving features storemanagar arr ', e, ' ---- ', n);
        if (this.project_id !== undefined && this.feature_id !== undefined) {
          editor.store();
        } else {
editor.store();
        }
        // editor.store();
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
