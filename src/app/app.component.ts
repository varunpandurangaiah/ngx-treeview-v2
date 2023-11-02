import { Component } from '@angular/core';
import { TreeviewI18n } from 'ngx-treeview-v2';
import { I18n } from './i18n';
import { DefaultTreeviewI18n } from './default-treeview-i18n';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: TreeviewI18n, useClass: DefaultTreeviewI18n }
  ]
})
export class AppComponent {
  constructor(
    private i18n: I18n
  ) { }

  set language(language: string) {
    this.i18n.language = language;
  }

  get language(): string {
    return this.i18n.language;
  }
}
