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

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.scss']
})
export class MenuBuilderComponent implements OnInit {
  languages: any = [];
  primaryLang: String;
  secondaryLang: String;
  selectedLang: String;
  menuLang: any = [];
  name: String;
  menuFId: any;
  menuBuilderDetails: any = [];
  screenMenuName: any;
  description: String;
  selectedMenu: String;
  currenLang: String;
  menuFName: any;
  project_id: String;
  featureDetailsData: any;
  oldMenu: any = [];
  newMenu: any = [];
  menuDetails: any = [];
  currentMenu: any = [];
  screenId: any;
  getMenu: Boolean;
  descriptionBeforeUpdate: String;
  createRow: Boolean = false;
  menuBuilder: any;
  dataMenu: any;

  // state: ITreeState = {
  //   expandedNodeIds: {
  //     1: true,
  //     2: true
  //   },
  //   hiddenNodeIds: {},
  //   activeNodeIds: {}
  // };

  // options: ITreeOptions = {
  //   allowDrag: (node) => node.isLeaf,
  //   getNodeClone: (node) => ({
  //     ...node.data,
  //     id: v4(),
  //     name: `copy of ${node.data.name}`
  //   })
  // };

  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { name: 'child1' },
  //       { name: 'child2' }
  //     ]
  //   },
  //   {
  //     name: 'root2',
  //     id: 2,
  //     children: [
  //       { name: 'child2.1', children: [] },
  //       { name: 'child2.2', children: [
  //         {name: 'grandchild2.2.1'}
  //       ] }
  //     ]
  //   },
  //   { name: 'root3' },
  //   { name: 'root4', children: [] },
  //   { name: 'root5', children: null }
  // ];
  constructor(
    private dataService: DataService,
    private database: TreeDragService,
    private route: ActivatedRoute,
    private menuBuilderService: MenuBuilderService,
    private screenService: ScreenDesignerService,
    private projectComponentService: ProjectComponentService,
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
    this.getMenuByProjectId();
    this.dataService.currentSelectedMenuInfo.subscribe(
      (data) => {
        this.description = data;
        this.descriptionBeforeUpdate = data;
        this.currentMenu.forEach(menuData => {
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
      }
    );
  }

  getMenuByProjectId() {
    this.menuBuilderService.getMenuBuilderByProjectId(this.project_id).subscribe(response => {
      const menuBuilderData = response.body;
      if (menuBuilderData.length !== 0) {
        this.menuLang = [];
        menuBuilderData.forEach(mData => {
          this.menuLang.push(mData.language);
          if (mData.menu_option === true) {
            this.currenLang = mData.language;
            this.currentMenu = mData.menuDetails;
          }
          if (!this.getMenu) {
            if (mData.menu_option === true) {
              this.menuBuilderDetails = mData;
              this.languages = this.menuBuilderDetails.project_languages;
              this.primaryLang = this.menuBuilderDetails.language;
              this.menuDetails = this.menuBuilderDetails.menuDetails;
              if (this.selectedLang === undefined) {
                this.selectedLang = this.menuBuilderDetails.language;
              } else {
                this.menuBuilderDetails.language = this.selectedLang;
              }
            }

          }
        });

        if (this.getMenu) {
          this.newMenu = [];
          this.oldMenu = [];
          menuBuilderData.forEach(meData => {
            this.dataMenu = meData.menuDetails;
            if (this.currenLang === meData.language) {
              this.oldMenu = meData;
            } else if (this.selectedLang === meData.language) {
              this.newMenu = meData;
            }

            if (meData.language !== this.selectedLang) {
              meData.menu_option = false;
              this.updateMenuById(meData._id, meData);
            } else if (meData.language === this.selectedLang) {
              meData.menu_option = true;
              meData.language = this.selectedLang;
              let FeatureDiff;
              if (this.newMenu.feature !== undefined && this.oldMenu.feature !== undefined) {
                FeatureDiff = this.oldMenu.feature
                  .filter(x => !this.newMenu.feature.includes(x));
                if (FeatureDiff.length > 0) {
                  const array = [];
                  FeatureDiff.forEach(featureId => {
                    if (!meData.feature.includes(featureId)) {
                      meData.feature.push(featureId);
                      this.featureDetailsData = [];
                      this.projectComponentService.getFeatureById(featureId).subscribe(
                        feature => {
                          this.featureDetailsData = feature.body;
                          this.menuFId = this.featureDetailsData._id;
                          this.menuFName = this.featureDetailsData.name;
                          const fMenuData = {
                            feature: this.menuFName,
                            featureId: this.menuFId,
                          };
                          this.screenService.getScreenByFeatureId(featureId).subscribe(data => {
                            if (data.body && data.body.length !== 0) {
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
                              this.menuBuilder = meData;
                              this.menuBuilder.menuDetails = array;
                              if (this.dataMenu.length !== 0) {
                                // tslint:disable-next-line:no-shadowed-variable
                                this.dataMenu.forEach(meData => {
                                  this.menuBuilder.menuDetails.forEach(menu => {
                                    if (meData.featuremenu.length > 0) {
                                      if (menu.featuremenu[0].name.featureId === meData.featuremenu[0].name.featureId) {
                                        menu.featuremenu[0].description = meData.featuremenu[0].description;
                                        // tslint:disable-next-line:max-line-length
                                        if (menu.screenmenu[0].name.screenId !== undefined && meData.screenmenu[0].name.screenId !== undefined) {
                                          // tslint:disable-next-line:max-line-length
                                          const intersection = menu.screenmenu[0].name.screenId.filter(x => meData.screenmenu[0].name.screenId.includes(x));
                                          if (intersection.length !== 0) {
                                            intersection.forEach(sId => {
                                              meData.screenmenu[0].name.screenId.forEach((dSId, index) => {
                                                if (sId === dSId) {
                                                  // tslint:disable-next-line:max-line-length
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
                                  this.menuBuilder.menuDetails.splice(0, 0, this.dataMenu[0]);
                                }
                              }
                              this.menuBuilderService.updateMenuById(meData._id, this.menuBuilder)
                                .subscribe(fMenu => {
                                  if (fMenu.body) {
                                    this.database.initialize(fMenu.body.menuDetails);
                                  }
                                });
                            }
                          });

                        },
                        error => {

                        }
                      );
                    }
                  });
                  this.menuDetails = meData.menuDetails;
                  this.updateMenuById(meData._id, meData);
                  this.database.initialize(meData.menuDetails);
                }
              }
            }
          });
        }
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

    this.menuLang.forEach(lang => {
      if (this.secondaryLang !== undefined) {
        if (lang !== this.secondaryLang) {
          this.menuBuilderDetails.language = this.primaryLang;
          this.menuBuilderDetails.menu_option = false;
          this.updateMenuById(this.menuBuilderDetails._id, this.menuBuilderDetails);
          delete this.menuBuilderDetails._id;
          delete this.menuBuilderDetails.updated_date;
          delete this.menuBuilderDetails.created_date;
          this.menuBuilderDetails.menu_option = true;
          this.menuBuilderDetails.language = this.selectedLang;
        }
      } else if (lang === this.primaryLang) {
        this.database.initialize(this.menuBuilderDetails.menuDetails);
        this.updateMenuById(this.menuBuilderDetails._id, this.menuBuilderDetails);
      }
    });
  }
  updateMenuById(id, menu) {
    this.menuBuilderService.updateMenuById(id, menu).subscribe(fMenu => {
      this.getMenu = false;
      this.menuDetails = [];
      this.menuBuilderDetails = [];
      this.name = '';
      this.description = '';
    });
  }
  onChangeLang(event) {
    this.secondaryLang = event;
    this.selectedLang = this.secondaryLang;
    this.getMenu = true;
    this.getMenuByProjectId();
  }
}
