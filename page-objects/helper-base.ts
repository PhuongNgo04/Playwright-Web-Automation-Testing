import { Page } from '@playwright/test';

export class HelperBase {
    // Để protected để các Page Object con (như NavigationPage, DatepickerPage) có thể dùng lại được this.page
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Hàm chờ và lấy text thông báo Toastr hiển thị trên màn hình
     */
    protected async getToastrMessage() {
        // Sau này khi bắt toastr thật trên UI, bạn sẽ lấy text từ locator:
        // return await this.page.locator('nb-toastr-container').textContent();
        return "I'm cool toaster!";
    }

    /**
     * Hàm chờ tiện ích: Tạm dừng x giây khi cần debug hoặc chờ hiệu ứng animation UI
     * @param seconds - Số giây muốn chờ (vd: 2, 5)
     */
    async waitForNumberOfSeconds(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }
}