import { Page, expect } from '@playwright/test';
import { HelperBase } from './helper-base';
// Nếu bạn có file decorator bọc test step, import như dưới:
// import { step } from '../helpers/test-step-decorator';

export class DatepickerPage extends HelperBase {

    constructor(page: Page) {
        super(page); // Gọi constructor của HelperBase để truyền page xuống
    }

    /**
     * Chọn 1 ngày trên Form Picker tính từ hôm nay
     * @param daysFromToday - Số ngày cộng thêm từ hôm nay
     */
    // @step('Select common datepicker date from today') // Bỏ comment nếu dự án đang bật custom decorator
    async selectCommonDatepickerDateFromToday(daysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        const expectedDate = await this.selectDateInTheCalendar(daysFromToday);
        await expect(calendarInputField).toHaveValue(expectedDate);
    }

    /**
     * Chọn khoảng ngày trên Range Picker tính từ hôm nay
     * @param daysFromTodayStart - Số ngày bắt đầu tính từ hôm nay
     * @param daysFromTodayEnd - Số ngày kết thúc tính từ hôm nay
     */
    // @step('Select datepicker with range from today') // Bỏ comment nếu dự án đang bật custom decorator
    async selectDatePickerWithRangeFromToday(daysFromTodayStart: number, daysFromTodayEnd: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
        const expectedDateStart = await this.selectDateInTheCalendar(daysFromTodayStart);
        const expectedDateEnd = await this.selectDateInTheCalendar(daysFromTodayEnd);
        const expectedRangeDate = `${expectedDateStart} - ${expectedDateEnd}`;
        await expect(calendarInputField).toHaveValue(expectedRangeDate);
    }

    /**
     * Hàm nội bộ dùng chung: tính toán ngày, điều hướng qua các tháng và click chọn ô ngày
     */
    private async selectDateInTheCalendar(daysFromToday: number) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);

        const expectedDay = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' });
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;

        let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

        // Nếu tháng/năm trên lịch chưa tới tháng/năm mục tiêu thì bấm nút next
        while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation .next-month').click();
            currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        // Chọn ngày của tháng hiện tại (tránh bounding month của tháng trước/sau)
        await this.page
            .locator('.day-cell:not(.bounding-month)')
            .getByText(expectedDay, { exact: true })
            .click();

        return dateToAssert;
    }
}