import { test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    // Mở trang chủ trước khi bắt đầu từng bài test
    await page.goto('https://playground.bondaracademy.com/');
});

// Test 1: Kiểm tra việc điều hướng qua lại giữa các menu
test('Navigate to pages', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo.formLayoutsPage();
    await pm.navigateTo.datePickerPage();
    await pm.navigateTo.toasterPage();
    await pm.navigateTo.smartTablePage();
});

// Test 2: Thao tác với Form và Datepicker qua PageManager
test('Parametrized page object methods with PageManager', async ({ page }) => {
    const pm = new PageManager(page);
    const randomFirstName = faker.person.firstName()
    const randomEmail = faker.internet.email({provider: 'test.com'})

    // 1. Thao tác trên Form Layouts
    await pm.navigateTo.formLayoutsPage();
    await pm.formLayoutsPage.submitUsingTheGridForm('artem@test.com', 'Welcome', 'Option 2');
    await pm.formLayoutsPage.submitInlineForm(randomFirstName,randomEmail, false);

   /* 
   // 2. Thao tác trên Datepicker
    await pm.navigateTo.datePickerPage();
    await pm.datepickerPage.selectCommonDatepickerDateFromToday(5);
    await pm.datepickerPage.selectDatePickerWithRangeFromToday(7, 20);

    // 3. Chuyển sang Smart Table
    await pm.navigateTo.smartTablePage();
    */
});