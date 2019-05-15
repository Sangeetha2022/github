import { Component, OnInit } from '@angular/core';
// import { ITreeState, ITreeOptions } from 'angular-tree-component';
import { v4 } from 'uuid';
import { DataService } from 'src/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { MenuBuilderService } from './menu-builder.service';
import { TreeDragService } from './tree-drag/tree-drag.service';

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
  menuBuilderDetails: any = [];
  description: String;
  selectedMenu: String;
  project_id: String;
  menuDetails: any = [];
  stopUpdate: Boolean;
  getMenu: Boolean;
  descriptionBeforeUpdate: String;
  createRow: Boolean = false;

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
        console.log('==========', this.menuDetails);
        this.menuDetails.forEach(menuData => {
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
    this.menuBuilderService.getMenuBuilderByProjectId(this.project_id).subscribe(menuBuilderData => {
      if (menuBuilderData.length !== 0) {
        this.menuLang = [];
        if (!this.getMenu) {
          menuBuilderData.forEach(mData => {
            this.menuLang.push(mData.language);
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
          });
        }

        if (this.getMenu) {
          menuBuilderData.forEach(meData => {
            if (meData.language === this.selectedLang) {
              meData.menu_option = true;
              this.updateMenuById(meData._id, meData);
              this.menuDetails = meData.menuDetails;
              this.database.initialize(this.menuDetails);
              this.stopUpdate = true;
            }
            if (meData.language !== this.selectedLang) {
              meData.menu_option = false;
              this.menuDetails = meData.menuDetails;
              this.updateMenuById(meData._id, meData);
            }
          });
        }
      }
    });
  }

  updateMenuBuilder(description) {
    this.menuDetails.map(element => {
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
    let difference = this.menuBuilderDetails.project_languages
      .filter(x => !this.menuLang.includes(x))
      .concat(this.menuLang.filter(x => !this.menuBuilderDetails.project_languages.includes(x)));
    console.log('================', difference)
    if (difference.length === 0) {
      this.createRow = true;
    }
    this.menuLang.forEach(lang => {
      if (!this.createRow) {
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
            this.menuBuilderService.createMenu(this.menuBuilderDetails).subscribe(menuData => {
            });
          }
        } else if (lang === this.primaryLang) {
          this.updateMenuById(this.menuBuilderDetails._id, this.menuBuilderDetails);
          this.stopUpdate = false;
        }
      } else {
        this.updateMenuById(this.menuBuilderDetails._id, this.menuBuilderDetails);
        this.stopUpdate = false;
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
      if (!this.stopUpdate) {
        this.database.initialize(fMenu.menuDetails);
        this.stopUpdate = false;
      }
    });
  }

  updatemenu(projectId, menu) {
    this.menuBuilderService.updateMenubyProject(projectId, menu)
      .subscribe(fMenu => {
        if (fMenu) {

        }
      });
  }
  onChangeLang(event) {
    this.secondaryLang = event;
    this.getMenuByProjectId();
    if (this.menuLang.length === 2) {
      this.getMenu = true;
    }
  }
}
