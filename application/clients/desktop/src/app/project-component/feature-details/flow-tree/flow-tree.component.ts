import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowTreeService } from './flow-tree.service';
import { element } from '@angular/core/src/render3';
import { ProjectComponentService } from '../../project-component.service';
import { DataService } from 'src/shared/data.service';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-flow-tree',
  templateUrl: './flow-tree.component.html',
  styleUrls: ['./flow-tree.component.scss'],
})
export class FlowTreeComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  /* Drag and drop */
  dragNode: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;
  dragNodeExpandOverArea: string;

  public flow: any = {
    name: '',
    dataType: '',
  };
  public entityModelData: any = {
    name: '',
    description: '',
    entity_type: 'secondary',
    project_id: '',
    feature_id: '',
    is_default: false,
    field: []
  };
  public entityId: any;
  public flowFields: any[] = [];
  public columnDefs: any;
  public rowData: any;
  public isShowGird: boolean;

  public typeOfData: any[] = ['String', 'Number', 'Boolen', 'Array'];

  @ViewChild('emptyItem') emptyItem: ElementRef;
  gridApi: any;
  gridColumnApi: any;

  constructor(
    private flowTreeService: FlowTreeService,
    private route: ActivatedRoute,
    private projectService: ProjectComponentService,
    private router: Router,
    private dataService: DataService,
  ) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    flowTreeService.dataChange.subscribe(data => {
      console.log('component---servuce--->>', data);
      this.entityModelData.name = data[0].item;
      this.entityModelData.description = data[0].item;
      this.dataSource.data = [];
      this.dataSource.data = data;
    }, error => {
      console.log(error);
    });



    this.columnDefs = [
      { headerName: 'FlowName', field: 'name' },
      { headerName: 'Data Type', field: 'dataType' },
    ];

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.projectId && params.featureId) {
        this.entityModelData.project_id = params.projectId;
        this.entityModelData.feature_id = params.featureId;
      }
    });

  }

  selecFlow(node) {
    this.flow.name = node.item;
    console.log('node--->>', node);

  }
  addFlows(data) {
    const tembData = {
      name: data.name,
      dataType: data.dataType,
    };
    this.flowFields.push(tembData);
    console.log('data--->>>', this.flowFields);

  }

  showFlows() {
    this.isShowGird = true;
    this.rowData = this.flowFields;
    this.flowFields.map(fieldElement => {
      const tempData = {
        name: '',
        type_name: 'text',
        data_type: '',
        description: '',
        is_default: false,
        is_entity_type: false,
        is_list_type: false,
        list_type: '',
        list_value: '',
        entity_id: '',
      };
      tempData.name = fieldElement.name;
      tempData.description = fieldElement.name;
      tempData.data_type = fieldElement.dataType;
      this.entityModelData.field.push(tempData);
    });
    console.log('all--flow-->>', this.entityModelData);
    this.projectService.createEntity(this.entityModelData).subscribe(response => {
      if (response.body) {
        const data = response.body;
        console.log('my custom entity response-->>', response);
        console.log('my custom featureID are-->>', this.entityModelData.feature_id);
        // this.entityId = response.body._id;
        this.dataService.FlowSaveEntity(response.body);
        this.updateFeatureEntity(response.body);
        // tslint:disable-next-line: max-line-length
      }
    });

  }

  updateFeatureEntity(entityInfo) {
    const temp = {
      entityType: entityInfo.entity_type,
      entityId: entityInfo._id
    };
    this.projectService.updateFeatureEntity(this.entityModelData.feature_id, temp)
      .subscribe(data => {
        console.log('successfully updated the feature entity details');
      }, error => {
        console.log('cannot able to update the feature entity');
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = (node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.flowTreeService.insertItem(parentNode, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.flowTreeService.updateItem(nestedNode, itemValue);
  }

  handleDragStart(event, node) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event, node) {
    event.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event, node) {
    event.preventDefault();
    if (node !== this.dragNode) {
      let newItem: TodoItemNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.flowTreeService.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.flowTreeService.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      } else {
        newItem = this.flowTreeService.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
      }
      this.flowTreeService.deleteItem(this.flatNodeMap.get(this.dragNode));
      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }
}





