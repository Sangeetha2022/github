import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TodoItemNode } from './interface/TodoItemNode';
import { TreeDragService } from './tree-drag.service';
import { DataService } from 'src/shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { MenuBuilderComponent } from '../menu-builder.component';


/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode 
{
  item: string='';
  level: number=0;
  expandable: boolean = false;
}

@Component
({
  selector: 'app-tree-drag',
  templateUrl: './tree-drag.component.html',
  styleUrls: ['./tree-drag.component.scss']
})

export class TreeDragComponent implements OnInit 
{
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<any>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  /* Drag and drop */
  dragNode:any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number=0;
  dragNodeExpandOverArea: number=0;
  project_id: String='';
  menuBilderDetails: any = [];
  menuFeatureId: any = [];
  menuFeatureName: any = [];
  menusJson: any = [];
  screenFeature: any = [];
  screenName: any = [];
  uniqueScreen: any = [];
  screenMenu: any;
  selectedItem: String='';
  parentNode:any;
  nestedNode:any;

  @ViewChild('emptyItem') emptyItem: ElementRef | undefined;

  constructor(private database: TreeDragService,private route: ActivatedRoute,private dataService: DataService,
              private menuBuilder: MenuBuilderComponent) 
  {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe(data => 
    {
      this.dataSource.data = [];
      this.dataSource.data = data;
    });
  }

  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => 
    {
      this.project_id = params.projectId;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => 
  {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item? existingNode: new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = (node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean 
  {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean 
  {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void 
  {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)? this.checklistSelection.select(...descendants): this.checklistSelection.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) 
  {
    this.parentNode=this.flatNodeMap.get(node);
    this.database.insertItem(this.parentNode, '');
    this.treeControl.expand(node);
  }

  logNode(node:any) 
  {
    this.selectedItem = node.item;
    this.dataService.setSelectedMenuInfo(this.selectedItem);
    this.menuBuilder.getSelectedMenu();
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) 
  {
    this.nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(this.nestedNode, itemValue);
  }

  handleDragStart(event:any, node:any) 
  {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

   handleDragOver(event:any, node:any) 
   {
    event.preventDefault();
    // Handle node expand
    if (this.dragNodeExpandOverNode && node === this.dragNodeExpandOverNode) 
    {
      if ((Date.now() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) 
      {
        if (!this.treeControl.isExpanded(node)) 
        {
          this.treeControl.expand(node);
        }
      }
    } 
    else 
    {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageY = event.offsetY / event.target.clientHeight;
    if (0 <= percentageY && percentageY <= 0.25) 
    {
      this.dragNodeExpandOverArea = 1;
    } 
    else if (1 >= percentageY && percentageY >= 0.75) 
    {
      this.dragNodeExpandOverArea = -1;
    }
    else 
    {
      this.dragNodeExpandOverArea = 0;
    }
  }


  handleDrop(event:any, node:any) 
  {
    if (node !== this.dragNode) 
    {
      let newItem: TodoItemNode;
      if (this.dragNodeExpandOverArea === 1) 
      {
        newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } 
      else if (this.dragNodeExpandOverArea === -1) 
      {
        newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } 
      else 
      {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      }
      this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
    }
    this.handleDragEnd(event);
  }

  handleDragEnd(event:any) 
  {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
    this.dragNodeExpandOverArea = NaN;
    event.preventDefault();
  }

  deleteItem(node: TodoItemFlatNode) 
  {
    this.database.deleteItem(this.flatNodeMap.get(node));
  }

}