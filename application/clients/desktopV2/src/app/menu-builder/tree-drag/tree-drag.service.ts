import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItemNode } from './interface/TodoItemNode';

@Injectable
({
  providedIn: 'root'
})

export class TreeDragService 
{
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  menuBuilder: any;
  public defaultMenuData: any;
  menu: any = [];
  get data(): TodoItemNode[] { return this.dataChange.value; }
  constructor() {}

  initialize(menu: any) 
  {
    let array :any[]= [];
    let count: any;
    if (menu.length > 0) 
    {
      count = 0;
      menu.forEach((element:any) => 
      {
        count = count + 1;
        if (element.featuremenu.length > 0) 
        {
          array[element.featuremenu[0].description.feature] = element.screenmenu[0].description.screen;
          console.log("Array:",array);
          this.menuBuilder = array;
          const data = this.buildFileTree(this.menuBuilder, 0);
          console.log("Data:",data);
          this.dataChange.next(data);
        } 
        else 
        {
          this.defaultMenuData = menu[0].screenmenu[0].description.screen;
          const data = this.buildFileTree(this.defaultMenuData, 0);
          this.dataChange.next(data);
        }
      });
    } 
    else 
    {
      this.menuBuilder = array;
      const data = this.buildFileTree(this.menuBuilder, 0);
      this.dataChange.next(data);
    }
  }

  buildFileTree(obj: any, level: number): TodoItemNode[] 
  {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => 
    {
      console.log("Accumalator:",accumulator);
      console.log("Key:",key);
      const value = obj[key];
      console.log("Value:",value);
      const node = new TodoItemNode();
      console.log("Node:",node);
      node.item = key;
      if (value != null) 
      {
        if (typeof value === 'object') 
        {
          node.children = this.buildFileTree(value, level + 1);
        } 
        else 
        {
          node.item = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string): TodoItemNode 
  {
    if (!parent.children) 
    {
      parent.children = [];
    }
    const newItem = { item: name } as TodoItemNode;
    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: TodoItemNode, name: string): TodoItemNode 
  {
    const parentNode = this.getParentFromNodes(node);
    const newItem = { item: name } as TodoItemNode;
    if (parentNode != null) 
    {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
    } 
    else 
    {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: TodoItemNode, name: string): TodoItemNode 
  {
    const parentNode = this.getParentFromNodes(node);
    const newItem = { item: name } as TodoItemNode;
    if (parentNode != null) 
    {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } 
    else 
    {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: TodoItemNode): TodoItemNode 
  {
    for (let i = 0; i < this.data.length; ++i) 
    {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) 
      {
        return parent;
      }
    }
    return node;
  }

  getParent(currentRoot: TodoItemNode, node: TodoItemNode): TodoItemNode 
  {
    if (currentRoot.children && currentRoot.children.length > 0) 
    {
      for (let i = 0; i < currentRoot.children.length; ++i) 
      {
        const child = currentRoot.children[i];
        if (child === node) 
        {
          return currentRoot;
        } 
        else if (child.children && child.children.length > 0) 
        {
          const parent = this.getParent(child, node);
          if (parent != null) 
          {
            return parent;
          }
        }
      }
    }
    return node;
  }

  updateItem(node: TodoItemNode, name: string) 
  {
    node.item = name;
    this.dataChange.next(this.data);
  }

  deleteItem(node: any) 
  {
    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: any, to: any): TodoItemNode 
  {
    const newItem = this.insertItem(to, from.item);
    if (from.children) 
    {
      from.children.forEach((child: any) => 
      {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: any, to: any): TodoItemNode 
  {
    const newItem = this.insertItemAbove(to, from.item);
    if (from.children) 
    {
      from.children.forEach((child: TodoItemNode) => 
      {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: any, to: any): TodoItemNode 
  {
    const newItem = this.insertItemBelow(to, from.item);
    if (from.children) 
    {
      from.children.forEach((child: TodoItemNode) => 
      {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: TodoItemNode[], nodeToDelete: TodoItemNode) 
  {
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) 
    {
      nodes.splice(index, 1);
    } 
    else 
    {
      nodes.forEach(node => 
      {
        if (node.children && node.children.length > 0) 
        {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }
}