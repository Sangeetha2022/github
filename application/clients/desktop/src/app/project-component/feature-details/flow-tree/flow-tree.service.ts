import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItemNode } from './interface/TodoItemNode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class FlowTreeService {

    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] { return this.dataChange.value; }

    public fredResponse: any;

    constructor(
    ) {
        this.initialize();
    }

    initialize() {
    }

    quickTest(data) {
        // console.log('qucik test--->>', data);

        // let response = {
        //     'categories': [
        //         { 'id': 149, 'name': 'Arkansas', 'parent_id': 27281, 'dass': 123 },
        //         { 'id': 149, 'name': 'Arkansas', 'parent_id': 27281 },
        //         { 'id': 149, 'name': 'Arkansas', 'parent_id': 27281 },
        //         { 'id': 149, 'name': 'Arkansas', 'parent_id': 27281 },
        //         { 'id': 149, 'name': 'Arkansas', 'parent_id': 27281 },
        //     ]
        // };
        // const data = {
        //     'categories': [
        //         { 'id': 149, 'name': 'Arkansas', 'parent_id': 27281 },
        //         { 'id': 150, 'name': 'Illinois', 'parent_id': 27281 },
        //         { 'id': 151, 'name': 'Indiana', 'parent_id': 27281 },
        //         { 'id': 152, 'name': 'Kentucky', 'parent_id': 27281 },
        //         { 'id': 153, 'name': 'Mississippi', 'parent_id': 27281 },
        //         { 'id': 154, 'name': 'Missouri', 'parent_id': 27281 },
        //         { 'id': 193, 'name': 'Tennessee', 'parent_id': 27281 }
        //     ]
        // };

        const spiltKey = Object.assign({}, ...data.categories);
        const uniqueKey = Object.keys(spiltKey);
        const paranentKey = Object.keys(data);
        const obj = Object.assign({}, paranentKey);
        Object.values(obj).reduce((a, b) => {
            const result = {};
            result[b] = uniqueKey;
            const data = this.buildFileTree(result, 0);
            console.log('-----rrespomse-->>', data);
            this.dataChange.next(data);
            // this.fredResponse = result;
            a[b.substring(0, b.indexOf(''))] = obj[b];
            return a;
        }, {});

    }



    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: object, level: number): TodoItemNode[] {
        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new TodoItemNode();
            node.item = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.item = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: TodoItemNode, name: string): TodoItemNode {
        if (!parent.children) {
            parent.children = [];
        }
        const newItem = { item: name } as TodoItemNode;
        parent.children.push(newItem);
        this.dataChange.next(this.data);
        return newItem;
    }

    insertItemAbove(node: TodoItemNode, name: string): TodoItemNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = { item: name } as TodoItemNode;
        if (parentNode != null) {
            parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
        } else {
            this.data.splice(this.data.indexOf(node), 0, newItem);
        }
        this.dataChange.next(this.data);
        return newItem;
    }

    insertItemBelow(node: TodoItemNode, name: string): TodoItemNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = { item: name } as TodoItemNode;
        if (parentNode != null) {
            parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
        } else {
            this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
        }
        this.dataChange.next(this.data);
        return newItem;
    }

    getParentFromNodes(node: TodoItemNode): TodoItemNode {
        for (let i = 0; i < this.data.length; ++i) {
            const currentRoot = this.data[i];
            const parent = this.getParent(currentRoot, node);
            if (parent != null) {
                return parent;
            }
        }
        return null;
    }

    getParent(currentRoot: TodoItemNode, node: TodoItemNode): TodoItemNode {
        if (currentRoot.children && currentRoot.children.length > 0) {
            for (let i = 0; i < currentRoot.children.length; ++i) {
                const child = currentRoot.children[i];
                if (child === node) {
                    return currentRoot;
                } else if (child.children && child.children.length > 0) {
                    const parent = this.getParent(child, node);
                    if (parent != null) {
                        return parent;
                    }
                }
            }
        }
        return null;
    }

    updateItem(node: TodoItemNode, name: string) {
        node.item = name;
        this.dataChange.next(this.data);
    }

    deleteItem(node: TodoItemNode) {
        this.deleteNode(this.data, node);
        this.dataChange.next(this.data);
    }

    copyPasteItem(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
        const newItem = this.insertItem(to, from.item);
        if (from.children) {
            from.children.forEach(child => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemAbove(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
        const newItem = this.insertItemAbove(to, from.item);
        if (from.children) {
            from.children.forEach(child => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemBelow(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
        const newItem = this.insertItemBelow(to, from.item);
        if (from.children) {
            from.children.forEach(child => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    deleteNode(nodes: TodoItemNode[], nodeToDelete: TodoItemNode) {
        const index = nodes.indexOf(nodeToDelete, 0);
        if (index > -1) {
            nodes.splice(index, 1);
        } else {
            nodes.forEach(node => {
                if (node.children && node.children.length > 0) {
                    this.deleteNode(node.children, nodeToDelete);
                }
            });
        }
    }

}