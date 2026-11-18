import { Page } from '@playwright/test';
import { NavigationPage } from './navigation-page';
import { FormLayoutsPage } from './form-layouts-page';
import { DatepickerPage } from './datapicker-page';

export class PageManager {
    private readonly page: Page;
    readonly navigateTo: NavigationPage;
    readonly formLayoutsPage: FormLayoutsPage;
    readonly datepickerPage: DatepickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigateTo = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }
}