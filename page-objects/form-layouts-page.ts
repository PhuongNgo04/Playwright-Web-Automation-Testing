import { Page } from '@playwright/test';

export class FormLayoutsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Submit form 'Using the Grid' với email, password và chọn radio button tùy ý
     * @param email - Email của user (vd: 'artem@test.com')
     * @param password - Mật khẩu
     * @param optionText - Tên nhãn của radio button muốn tick (vd: 'Option 1', 'Option 2')
     */
    async submitUsingTheGridForm(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });

        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
        
        // Thẻ radio bị custom CSS che nên cần force: true để tick được
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
        
        await usingTheGridForm.getByRole('button', { name: 'Sign in' }).click();
    }

    /**
     * Submit 'Inline form' với họ tên, email và tùy chọn tick checkbox 'Remember me'
     * @param fullName - Họ và tên đầy đủ (vd: 'Jane Doe')
     * @param email - Địa chỉ email
     * @param rememberMeCheckbox - Truyền true nếu muốn tick checkbox, false nếu bỏ qua
     */
    async submitInlineForm(fullName: string, email: string, rememberMeCheckbox: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });

        // Ô nhập tên trên form này dùng placeholder là 'Jane Doe'
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(fullName);
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);

        // Nếu tham số truyền vào là true thì mới tick checkbox
        if (rememberMeCheckbox) {
            await inlineForm.getByRole('checkbox').check({ force: true });
        }

        await inlineForm.getByRole('button', { name: 'Submit' }).click();
    }
}