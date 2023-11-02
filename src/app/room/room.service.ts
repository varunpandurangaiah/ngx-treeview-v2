import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview-v2';
import { Observable, of } from 'rxjs';

@Injectable()
export class RoomService {
  getRooms(): Observable<TreeviewItem[]> {
    const items: TreeviewItem[] = [];
    for (let i = 0; i < 1000; i++) {
      const value: any = i === 0 ? { name: `${i}` } : i;
      const checked = i % 100 === 0;
      const item = new TreeviewItem({
        text: `Room ${i}`,
        value,
        checked
      });
      items.push(item);
    }

    return of(items);
  }
}
