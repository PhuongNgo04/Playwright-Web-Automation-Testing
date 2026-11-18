import { test, expect } from '@playwright/test';

// Mở trang chủ trước MỖI test
test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Form Layouts page', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input fields', async ({ page }) => {
        test.setTimeout(60_000);

        const usingTheGridEmailInput = page
            .locator('nb-card', { hasText: 'Using the Grid' })
            .getByRole('textbox', { name: 'Email' });

        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 100 });

        const inputValue = await usingTheGridEmailInput.inputValue();

        // Cách 1: Generic assertion
        expect(inputValue).toEqual('test2@test.com');
        // Cách 2: Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
        // Cách 3: Regex
        await expect(usingTheGridEmailInput).toHaveValue(/.*@test\.com/);
    });

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

        await usingTheGridForm.getByLabel('Option 1').check({ force: true });
        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });

        const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked();
        expect(radioStatus).toBeTruthy();

        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked();
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).not.toBeChecked();
    });

});

test('checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });

    const allCheckboxes = page.getByRole('checkbox');

    for (const checkbox of await allCheckboxes.all()) {
        await checkbox.check({ force: true });
        await expect(checkbox).toBeChecked();
    }
});

test('Lists and dropdowns', async ({ page }) => {
    test.setTimeout(60_000);

    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    // 1. Dropdown truyền thống (<select>)
    const standardDropdown = page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox');
    await standardDropdown.selectOption('info');
    await expect(standardDropdown).toHaveValue('info');

    // 2. Dropdown custom (nb-select)
    const positionDropDownField = page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select');
    await positionDropDownField.click();
    await page.locator('nb-option', { hasText: 'bottom-end' }).click();
    await expect(positionDropDownField).toHaveText('bottom-end');

    // 3. Duyệt và test TẤT CẢ option
    await positionDropDownField.click();
    const allListValues = await page.locator('nb-option').allTextContents();

    for (let i = 0; i < allListValues.length; i++) {
        const trimmedValue = allListValues[i].trim();

        await page.locator('nb-option', { hasText: trimmedValue }).click();
        await expect(positionDropDownField).toHaveText(trimmedValue);

        if (i < allListValues.length - 1) {
            await positionDropDownField.click();
        }
    }
});

test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    await page.getByRole('button', { name: 'Top' }).hover();

    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip');
});

test('dialog box', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Đăng ký listener TRƯỚC KHI bấm nút xóa
    page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        await dialog.accept();
    });

    await page.locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();

    await expect(page.locator('tr', { hasText: 'mdo@gmail.com' })).not.toBeVisible();
});

test('web tables', async ({ page }) => {
    test.setTimeout(60_000);

    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Cách 1: Tìm dòng bằng text hiển thị
    const tableRowByEmail = page.getByRole('row', { name: 'twitter@outlook.com' });
    await tableRowByEmail.locator('.nb-edit').click();
    await tableRowByEmail.getByPlaceholder('Age').fill('35');
    await tableRowByEmail.locator('.nb-checkmark').click();
    await expect(tableRowByEmail.locator('td').last()).toHaveText('35');

    // Cách 2: Tìm dòng theo cột ID = 10
    const tableRowById = page.getByRole('row').filter({
        has: page.getByRole('cell').nth(1).getByText('10', { exact: true })
    });
    await tableRowById.locator('.nb-edit').click();
    await page.locator('tbody').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('tbody').locator('.nb-checkmark').click();
    await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com');

    // Cách 3: Lặp qua các giá trị để test bộ lọc theo tuổi
    const ages = ['20', '30', '40', '200'];

    for (const age of ages) {
        await page.locator('thead').getByPlaceholder('Age').fill(age);
        await page.waitForTimeout(500);

        if (age === '200') {
            await expect(page.locator('tbody')).toContainText('No data found');
        } else {
            const allTableRows = await page.locator('tbody tr').all();
            for (const row of allTableRows) {
                await expect(row.locator('td').last()).toHaveText(age);
            }
        }
    }
});

test('datepicker with dynamic future date', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    const date = new Date();
    date.setDate(date.getDate() + 100);

    const expectedDay = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' });
    const expectedYear = date.getFullYear();

    const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;

    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation .next-month').click();
        currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click();

    await expect(calendarInputField).toHaveValue(expectedDate);
});

test('sliders', async ({ page }) => {
    await page.getByText('IoT Dashboard').click();

    // Cách 1: Đổi trực tiếp cx, cy của thẻ SVG
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');

    await tempGauge.evaluate(element => {
        element.setAttribute('cx', '232.630');
        element.setAttribute('cy', '232.630');
    });
    await tempGauge.click();

    // Cách 2: Mô phỏng kéo chuột thật
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    if (box) {
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;

        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x + 100, y);
        await page.mouse.move(x + 100, y + 100);
        await page.mouse.up();

        await expect(tempBox).toContainText('30');
    }
});

test('iFrames', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog', { exact: true }).click();

    // Bước click nằm TRONG iframe
    const frameLocator = page.frameLocator('[data-cy="esc-close-iframe"]');
    await frameLocator
        .getByRole('button', { name: 'Open Dialog with esc close' })
        .click();

    // Nhưng dialog được trang cha mở ra -> kiểm tra ở `page`
    const dialog = page.locator('nb-dialog-container');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('This is a title passed to the dialog component');

    // Dialog này đóng được bằng phím Esc
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
});

test('Drag and drop', async ({ page }) => {
    await page.getByText('Extra Components').click();
    await page.getByText('Drag & Drop').click();

    // Cách 1: dragTo
    await page.getByText('Clean my room').dragTo(page.locator('#drop-list'));

    // Cách 2: kéo thả thủ công bằng chuột
    await page.getByText('Get groceries').hover();
    await page.mouse.down();
    await page.locator('#drop-list').hover();
    await page.mouse.up();

    // #drop-list là 1 element duy nhất nên kiểm tra từng text riêng
    const dropList = page.locator('#drop-list');
    await expect(dropList).toContainText('Clean my room');
    await expect(dropList).toContainText('Get groceries');
});