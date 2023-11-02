import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { isNil, remove, reverse } from 'lodash';
import {
  TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview-v2';
import { ProductService } from './product.service';

@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = 400;
}

@Component({
  selector: 'ngx-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
  providers: [
    ProductService,
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})
export class ProductComponent implements OnInit {
  @ViewChild(TreeviewComponent, { static: false }) treeviewComponent: TreeviewComponent;
  items: TreeviewItem[];
  rows: string[];

  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.items = this.service.getProducts();
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]): void {
    this.rows = [];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
        texts.push(parent.item.text);
        parent = parent.parent;
      }
      const reverseTexts = reverse(texts);
      const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.rows.push(row);
    });
  }

  removeItem(item: TreeviewItem): void {
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        if (TreeviewHelper.removeItem(tmpItem, item)) {
          break;
        }
      }
    }

    this.treeviewComponent.raiseSelectedChange();
  }
}
