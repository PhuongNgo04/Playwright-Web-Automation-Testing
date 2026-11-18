import { Page } from '@playwright/test';

export class NavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Điều hướng đến trang Form Layouts
    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.getByText('Form Layouts').click();
    }

    // Điều hướng đến trang Datepicker
    async datePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.getByText('Datepicker').click();
    }

    // Điều hướng đến trang Toastr
    async toasterPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.getByText('Toastr').click();
    }

    // Điều hướng đến trang Tooltip
    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.getByText('Tooltip').click();
    }

    // Điều hướng đến trang Smart Table
    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.page.getByText('Smart Table').click();
    }

    // ------------------------------------------------------------------------
    // Hàm phụ trợ: Chỉ click mở menu cha nếu nó đang đóng (aria-expanded === 'false')
    // Giúp tránh việc click nhầm làm đóng menu lại khi nó đã mở sẵn
    // ------------------------------------------------------------------------
    private async selectGroupMenuItem(groupMenuTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupMenuTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');

        // Nếu menu cha chưa mở (đang là 'false'), click để bung ra
        if (expandedState === 'false') {
            await groupMenuItem.click();
        }
    }
}