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
  languages = ['English', 'தமிழ்', 'Español'];
  Screens = ['PC', 'Tablet', 'Phone'];
  OS = ['IOS', 'Android'];
  selectedLang: String;
  selectedScreen: String;
  selectedOS: String;
  disabledOS: Boolean;
  name: String;
  menuBuilderDetails: any = [];
  description: String;
  selectedMenu: String;
  project_id: String;
  menuDetails: any = [];
  descriptionBeforeUpdate: String;

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
    if (this.selectedLang === undefined) {
      this.selectedLang = 'English';
    }
    if (this.selectedScreen === undefined) {
      this.selectedScreen = 'PC';
    }
    if (this.selectedScreen = 'PC') {
      this.disabledOS = true;
    } else {
      this.disabledOS = false;
    }
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
        this.menuBuilderDetails = menuBuilderData;
        this.menuDetails = this.menuBuilderDetails[0].menuDetails;
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
    this.updatamenu(this.project_id, this.menuBuilderDetails[0]);
  }


  updatamenu(projectId, menu) {
    this.menuBuilderService.updateMenubyProject(projectId, menu)
      .subscribe(fMenu => {
        if (fMenu) {
          this.menuDetails = [];
          this.menuBuilderDetails = [];
          this.name = '';
          this.description = '';
          this.database.initialize(fMenu.menuDetails);
        }
      });
  }
  onChangeLang(event) {
    console.log('lang', event);
  }
  onChangeScreen(event) {
    if (event === 'PC') {
      this.disabledOS = true;
    } else {
      console.log('screen', event);
      this.disabledOS = false;
    }
  }
  onChangeOS(event) {
    console.log('OS', event);

  }
}
