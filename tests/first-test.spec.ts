import { expect, test } from '@playwright/test';

// ================= TEST SUITE 1 =================
/*test.describe('Test Suite 1', () => {

    page.goto('https://bondaracademy.com/')

    test('This is test 1', async ({ page }) => {
        // Code test case 1 ở đây
    });

    test('This is test 2', async ({ page }) => {
        // Code test case 2 ở đây
    });

    test('This is test 3', async ({ page }) => {
        // Code test case 3 ở đây
    });

}); // Đóng Test Suite 1


// ================= TEST SUITE 2 =================
test.describe('Test Suite 2', () => {

    test('This is test 1 in suite 2', async ({ page }) => {
        // Code test case 1 ở đây
    });

    test('This is test 2 in suite 2', async ({ page }) => {
        // Code test case 2 ở đây
    });

    test('This is test 3 in suite 2', async ({ page }) => {
        // Code test case 3 ở đây
    });

}); // Đóng Test Suite 2


test.describe('suite 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/'); // Nhớ mở trang trước khi click
        await page.getByText('Forms').click();
    });
    test('this is a first test', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });
    test('this is a first test to datepicker', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
}); 

test.describe('suite 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/'); // Nhớ mở trang trước khi click
        await page.getByText('Charts').click();
    });
    test('this is a first test', async ({ page }) => {
        await page.getByText('Echarts').click(); // Ở menu Charts thường vào các mục biểu đồ
    });
    test('this is a first test to datepicker', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
}); 
*/

test.beforeEach(async({ page }) => {
    await page.goto('https://playground.bondaracademy.com/'); // Nhớ mở trang trước khi click
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

    test('Locator Synctax Rules ', async ({ page }) => {
       //find by Tag 
       page.locator('input')

       //find by ID 
       page.locator('#inputEmail1')

       //find by Class value
       page.locator('.shape-rectangle')

       //find by any attribute
       page.locator('[placeholder="Email1"]')

       //find by class value 
       page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

       //find by several selectors
       page.locator('input[placeholder="Email"].shape-rectangle')

       //find by Xpath (NOT RECOMOMEND)
       page.locator('//*[@id="inputEmail1"]')

       //find by partial text match
       page.locator(':text("Using")')

       //find by exact text match
       page.locator(':text-is("Using the Grid")')
    })

test('User-visible locators', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).first().click();
    await page.getByRole('textbox', { name: 'Email' }).first().fill('test@test.com');

    await page.getByLabel('Email').first().fill('test@test.com');

    await page.getByPlaceholder('Jane Doe').fill('Artem Bondar');

    await page.getByText('Submit').first().click();

    await page.getByTestId('inputEmail1').fill('test@test.com');

    await page.getByTitle('IoT Dashboard').click();
});

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();
    
    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click();
    
    await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('button').click();

    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('button').click();

    await page.locator('nb-card').filter({ hasText: 'Using the Grid' }) .getByRole('button').click();

    await page.locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: 'Sign in' })
        .getByLabel('Email')
        .fill('test@test.com');

    await page.getByText('Using the Grid').locator('..').getByRole('button').click();
});

test('Reusing locators', async ({ page }) => {
    const basicFormSection = page.locator('nb-card', { hasText: 'Basic form' });
    const emailInputField = basicFormSection.getByLabel('Email');

    await emailInputField.fill('test@test.com');
    await basicFormSection.getByLabel('Password').fill('playwright');
    await basicFormSection.locator('nb-checkbox').click();
    await basicFormSection.getByRole('button').click();
    
    await expect(emailInputField).toHaveValue('test@test.com');
});

test('Extracting values', async ({ page }) => {
    // Extract text
    const basicFormSection = page.locator('nb-card', { hasText: 'Basic form' });
    const submitButtonText = await basicFormSection.getByRole('button').textContent();
    expect(submitButtonText).toEqual('Submit');

    // Extract multiple text values
    const allRadioButtonValues = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonValues).toContain('Option 1');

    // Extract input field values
    const emailField = basicFormSection.getByRole('textbox', { name: 'Email' });
    await emailField.fill('test@test.com');
    const emailFieldValue = await emailField.inputValue();
    console.log(emailFieldValue);

    // Extract attribute value
    const emailPlaceholder = await emailField.getAttribute('placeholder');
    console.log(emailPlaceholder);
});

test('Assertions', async ({ page }) => {
    const basicFormSectionButton = page
        .locator('nb-card', { hasText: 'Basic form' })
        .getByRole('button');

    // Generic assertions
    const value = 5
    expect(value).toEqual(5);
    
    const submitButtonText = await basicFormSectionButton.textContent();
    expect(submitButtonText).toEqual('Submit');

    // Locator assertions
    await expect.soft(basicFormSectionButton).toHaveText('Submit');
    await basicFormSectionButton.click();
});

test('Generated test', async ({ page }) => {
    // 1. Nhập email
    await page.getByRole('textbox', { name: 'Email address' }).fill('test@test.com');
    // 2. Nhập password
    await page.locator('#exampleInputPassword1').fill('Welcome');
    // 3. Tích chọn checkbox
    await page.locator('.form-group > .status-basic > .label > .custom-checkbox').click();
    // 4. Click nút Submit trong Basic form
    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('button').click();
});