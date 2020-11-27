import { Component, OnInit } from '@angular/core';
// import { ITreeState, ITreeOptions } from 'angular-tree-component';
import { v4 } from 'uuid';
import { DataService } from 'src/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { MenuBuilderService } from './menu-builder.service';
import { TreeDragService } from './tree-drag/tree-drag.service';
import { EntityManagerComponent } from '../project-component/project-component.component';
import { ProjectComponentService } from '../project-component/project-component.service';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.scss']
})
export class MenuBuilderComponent implements OnInit {
  public languages: any = [];
  private primaryLang: String;
  private secondaryLang: String;
  public selectedLang: String;
  private menuLang: any = [];
  public name: String;
  private menuFId: any;
  private menuBuilderDetails: any = [];
  private screenMenuName: any;
  public description: String;
  private selectedMenu: String;
  private currentLang: String;
  private menu: any;
  private menuFName: any;
  private project_id: String;
  private featureDetailsData: any;
  private oldMenu: any = [];
  private currentMenuUpdateDetails: any;
  private newMenu: any = [];
  private menuDetails: any = [];
  private currentMenuDetails: any = [];
  private screenId: any;
  public logId = sessionStorage.getItem('LogId');
  private changeMenu: Boolean = false;
  private descriptionBeforeUpdate: String;
  private createRow: Boolean = false;
  private menuBuilder: any;
  private dataMenu: any;

  constructor(
    private dataService: DataService,
    private database: TreeDragService,
    private route: ActivatedRoute,
    private menuBuilderService: MenuBuilderService,
    private projectComp: EntityManagerComponent,
    private screenService: ScreenDesignerService,
    private projectComponentService: ProjectComponentService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.project_id = params.projectId;
    });
    this.getMenuByProjectId();
  }

  getSelectedMenu() {
    this.name = '';
    this.dataService.currentSelectedMenuInfo.subscribe(
      (data) => {
        this.description = data;
        this.descriptionBeforeUpdate = data;
        this.dataService.currentMenuBuilderSource.subscribe(updatedmenuDetails => {
          updatedmenuDetails.forEach(menuData => {
            if (menuData.featuremenu[0].description.feature === this.descriptionBeforeUpdate) {
              this.name = menuData.featuremenu[0].name.feature;
            } else {
              menuData.screenmenu.forEach(sData => {
                sData.description.screen.forEach((screen, index) => {
                  if (screen === this.descriptionBeforeUpdate) {
                    this.name = sData.name.screen[index];
                  }
                });
              });
            }
          });
        });

      }
    );
  }

  getMenuByProjectId() {
    this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => {
      this.menuBuilderDetails = menuBuilderData;
      const array = [];
      if (menuBuilderData.length !== 0) {
        menuBuilderData.body.forEach(mData => {
          if (!this.changeMenu) {
            if (mData.menu_option === true) {
              this.languages = mData.project_languages;
              this.selectedLang = mData.language;
              this.currentLang = mData.language;
              this.currentMenuDetails = mData;
              this.menuDetails = mData.menuDetails;
            }
          } else if (this.changeMenu) {
            if (mData.language === this.currentLang) {
              this.currentMenuDetails = mData;
              this.menuDetails = mData.menuDetails;
              this.menu = mData.menuDetails;
              mData.menu_option = true;
              this.updateMenuById(mData._id, mData);
            }
            this.languages.forEach(language => {
              if (language === mData.language && mData.menu_option === true) {
                this.newMenu = mData;
              } else if (language === mData.language && mData.menu_option === false) {
                this.oldMenu = mData;
              }
              if (language !== this.currentLang) {
                let FeatureDiff = [];
                if (this.newMenu.feature !== undefined && this.oldMenu.feature !== undefined) {
                  FeatureDiff = this.oldMenu.feature
                    .filter(x => !this.newMenu.feature.includes(x));
                  if (FeatureDiff.length > 0) {
                    FeatureDiff.forEach(featureId => {
                      this.newMenu.feature.push(featureId);
                    });
                    if (this.newMenu.feature.length > 0) {
                      this.newMenu.feature.forEach(feData => {
                        if (feData !== null) {
                          this.featureDetailsData = [];
                          this.projectComponentService.getFeatureById(feData, this.logId).subscribe(
                            feature => {
                              this.featureDetailsData = feature.body;
                              this.menuFId = this.featureDetailsData._id;
                              this.menuFName = this.featureDetailsData.name;
                              const fMenuData = {
                                feature: this.menuFName,
                                featureId: this.menuFId,
                              };
                              this.screenService.getScreenByFeatureId(feData, this.logId).subscribe(data => {
                                if (data.length !== 0) {
                                  this.screenMenuName = [];
                                  this.screenId = [];
                                  data.body.forEach(sData => {
                                    this.screenId.push(sData._id);
                                    this.screenMenuName.push(sData.screenName);
                                  });
                                  const screenData = {
                                    screen: this.screenMenuName,
                                    screenId: this.screenId
                                  };
                                  const obj = {
                                    featuremenu: [{ name: fMenuData, description: fMenuData }],
                                    screenmenu: [{
                                      name: screenData,
                                      description: screenData
                                    }],
                                  };
                                  array.push(obj);
                                  this.menuBuilder = this.newMenu;
                                  this.menuBuilder.menuDetails = array;
                                  if (this.menu.length !== 0) {
                                    this.menu.forEach(meData => {
                                      this.menuBuilder.menuDetails.forEach(menu => {
                                        if (meData.featuremenu.length > 0) {
                                          if (menu.featuremenu[0].name.featureId === meData.featuremenu[0].name.featureId) {
                                            menu.featuremenu[0].description = meData.featuremenu[0].description;
                                            if (menu.screenmenu[0].name.screenId !== undefined && meData.screenmenu[0].name.screenId !== undefined) {
                                              const intersection = menu.screenmenu[0].name.screenId.filter(x => meData.screenmenu[0].name.screenId.includes(x));
                                              if (intersection.length !== 0) {
                                                intersection.forEach(sId => {
                                                  meData.screenmenu[0].name.screenId.forEach((dSId, index) => {
                                                    if (sId === dSId) {
                                                      menu.screenmenu[0].description.screen[index] = meData.screenmenu[0].description.screen[index];
                                                    }
                                                  });
                                                });
                                              }
                                            }
                                          }
                                        }
                                      });
                                    });
                                    if (this.menuBuilder.menuDetails[0].featuremenu[0].name.feature !== 'default') {
                                      this.menuBuilder.menuDetails.splice(0, 0, this.menu[0]);
                                    }
                                  }
                                  this.updateMenuById(this.menuBuilder._id, this.menuBuilder);
                                }
                              });

                            },
                            error => {

                            }
                          );
                        }
                      });
                    }
                  }
                }
              }
            });
          }
        });
      }
    });
  }

  updateMenuBuilder(description) {
    this.menuDetails.forEach(element => {
      if (element.featuremenu[0].description.feature === this.descriptionBeforeUpdate) {
        element.featuremenu[0].description.feature = description;
      } else {
        element.screenmenu.forEach(sData => {
          sData.description.screen.forEach((screen, index) => {
            if (screen === this.descriptionBeforeUpdate) {
              sData.description.screen.splice(index, 1, description);
            }
          });
        });
      }
    });
    this.updateMenuById(this.currentMenuDetails._id, this.currentMenuDetails);
  }
  updateMenuById(id, menu) {
    this.spinner.show();
    this.menuBuilderService.updateMenuById(id, menu, this.logId).subscribe(fMenu => {
      this.spinner.hide();
      this.database.initialize(fMenu.body.menuDetails);
      this.dataService.setMenuBuilder(fMenu.body.menuDetails);
      this.name = '';
      this.description = '';
    });
  }
  onChangeLang(event) {
    this.selectedLang = event;
    if (this.currentLang !== this.selectedLang) {
      this.changeMenu = true;
      this.currentLang = this.selectedLang;
      this.currentMenuDetails.menu_option = false;
      this.updateMenuById(this.currentMenuDetails._id, this.currentMenuDetails);
      this.getMenuByProjectId();
    }
  }
}