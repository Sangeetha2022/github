import { Component, OnInit } from '@angular/core';
import { ITreeState, ITreeOptions } from 'angular-tree-component';
import { v4 } from 'uuid';

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
  description: String;
  state: ITreeState = {
    expandedNodeIds: {
      1: true,
      2: true
    },
    hiddenNodeIds: {},
    activeNodeIds: {}
  };

  options: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    getNodeClone: (node) => ({
      ...node.data,
      id: v4(),
      name: `copy of ${node.data.name}`
    })
  };

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      id: 2,
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
          {name: 'grandchild2.2.1'}
        ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];
  constructor() {
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
