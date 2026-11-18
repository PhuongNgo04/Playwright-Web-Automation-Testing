import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Dialog').click();
});

test('Auto waiting', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', {
    hasText: 'Open Dialog With Delay',
  });

  await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();

  const dialogContainer = page.locator('nb-dialog-container');
  const dialogHeaderText = await dialogContainer.locator('nb-card-header').textContent();

  expect(dialogHeaderText).toEqual('Friendly reminder');
});


test('Alternative waits', async ({ page }) => {
    // 1. Định vị card chứa nút bấm
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
    
    // 2. Click vào button (đã sửa lỗi mở ngoặc đơn thành ngoặc nhọn { name: '3 seconds' })
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
    
    // 3. Định vị container của Dialog popup
    const dialogContainer = page.locator('nb-dialog-container');

    // =========================================================================
    // CÁC CHIẾN LƯỢC CHỜ THAY THẾ (ALTERNATIVE WAITS) :
    // =========================================================================

    // Cách 1: Chờ trực tiếp element xuất hiện (Wait for element)
    // await dialogContainer.waitFor();
    // await page.waitForSelector('nb-dialog-container');

    // Cách 2: Chờ phản hồi từ API (Wait for API response)
    // await page.waitForResponse('**/delay/*');

    // Cách 3: Chờ toàn bộ network nghỉ (NOT RECOMMENDED - Không khuyến khích)
    // await page.waitForLoadState('networkidle');

    // Cách 4: Chờ cứng số giây cố định (NEVER EVER USE IT - Tuyệt đối không dùng trong test thực tế)
    // await page.waitForTimeout(3500);

    // Cách kiểm tra cũ không tự động chờ (Non-auto-waiting assertion):
    // const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
    // expect(dialogHeaderText).toContain('Friendly reminder');

    // =========================================================================
    // CÁCH TỐT NHẤT (PLAYWRIGHT BEST PRACTICE):
    // Dùng web-first assertion toHaveText() - nó sẽ TỰ ĐỘNG CHỜ tối đa 5 giây cho dialog hiện ra!
    // =========================================================================
    await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder');
})

test('Timeouts', async ({ page }) => {
    // 1. Tùy chỉnh timeout cho riêng bài test này (nếu cần):
    test.setTimeout(120000); // Tăng timeout của test case lên 120 giây (2 phút)
    // test.slow();          // Hoặc dùng test.slow() để tự động nhân 3 lần timeout mặc định (30s x 3 = 90s)
    // 2. Định vị form card "Open Dialog With Delay"
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
    // 3. Click nút "3 seconds" để kích hoạt mở dialog sau 3 giây delay
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
    // 4. Định vị modal dialog container
    const dialogContainer = page.locator('nb-dialog-container');
    // 5. Click nút "OK" bên trong dialog (ghi đè action timeout riêng cho nút này là 4 giây)
    await dialogContainer.getByRole('button', { name: 'OK' }).click({ timeout: 4000 });
})