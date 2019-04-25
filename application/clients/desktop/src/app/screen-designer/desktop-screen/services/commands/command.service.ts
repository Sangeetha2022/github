import { Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectComponentService } from 'src/app/project-component/project-component.service';
import * as dictionary from 'nanoid-dictionary';
import * as generate from 'nanoid/generate';
import { TraitsService } from '../traits/traits.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  feature_id: any;
  project_id: any;
  screenArray: any[] = [];

  constructor(
    private projectComponentService: ProjectComponentService,
    private traitService: TraitsService,
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

  addSaveCommand(commandName, editor) {
    const $this = this;
    editor.Commands.add(commandName, {
      run: function (e, n) {
        n.set('active', 0);
        const currentStorageDetails = e.StorageManager.getCurrentStorage();
        if ($this.project_id !== undefined && $this.feature_id !== undefined) {
          editor.store();
        } else {
          $this.traitService.getScreenInfo();
          $this.screenArray = $this.traitService.getScreenInfo();
          const featureDetailObj = {
            name: `Feature_${generate(dictionary.numbers, 6)}`,
            description: `This Feature has been created from screen designer`
          };
          $this.projectComponentService.addFeatureDetails(featureDetailObj).subscribe(
            (details) => {
              if (details) {
                const featureObj = {
                  project_id: $this.project_id,
                  feature_id: details._id
                };
                $this.projectComponentService.addFeature(featureObj).subscribe(
                  (features) => {
                    const result = $this.screenArray.filter(function (a) {
                      return !this[a._id] && (this[a._id] = true);
                    }, Object.create(null));
                    if (result !== undefined && result !== null) {
                      const resultArray = [];
                      result.forEach(flowElement => {
                        const flowObj = {
                          action_on_data: flowElement.button.action.action_on_data,
                          create_with_default_activity: flowElement.button.action.create_with_default_activity,
                          description: flowElement.button.action.description,
                          label: flowElement.button.action.label,
                          name: flowElement.button.action.name,
                          screenName: currentStorageDetails.attributes.params.foldername,
                          type: flowElement.button.action.type,
                          feature_id: details._id
                        };
                        resultArray.push(flowObj);
                      });
                      $this.projectComponentService.addFeatureFlow(resultArray).subscribe(
                        (featureFlow) => {
                          currentStorageDetails.attributes.params.feature = details._id;
                          editor.store();
                        },
                        (error) => {

                        }
                      );
                    } else {
                      currentStorageDetails.attributes.params.feature = details._id;
                      editor.store();
                    }

                  },
                  (error) => {
                    console.log('sorry feature project cannot able to save ');
                  }
                );
              } else {
                console.log('saved feature details return empty object', details);
              }
            },
            (error) => {
              console.log('sorry the feature details cannot able to save');
            }
          );
        }
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
