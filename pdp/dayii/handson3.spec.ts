import { test, expect, Page } from '@playwright/test';

test.describe("Handle table", () => {
    test.beforeEach("Navigate to the testing webpage", async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/pages/tables/smart-table');
        await expect(page).toHaveURL(/smart-table/);
    });

    test("Filter Specific Field and Validate Result", async ({ page }) => {

        const rows1 = page.locator('tbody tr');
        console.log(`Count of Rows before filtering: ${await rows1.count()}`)

        const emailId = 'ann@gmail.com';

        // Filter based on email id as it is unique
        const emailFilter = page.locator(
            'input[placeholder="E-mail"]'
        );

        // Enter filter value
        await emailFilter.fill(emailId);
        await page.keyboard.press('Tab');

        const rows = page.locator('tbody tr');

        // Verify at least one row exists
        await expect.poll(async () => rows.count()).toBeLessThan(5);
        await expect(rows.first()).toBeVisible();
        const rowCount = await rows.count();
        console.log(`Count of Row after filtering  ${rowCount}`)

        for (let i = 0; i < rowCount; i++) {
            console.log(
                await rows.nth(i).locator('td').allTextContents()
            );
            const firstEmailCell = rows
                .nth(i)
                .locator('td')
                .nth(5);
            const actualValue = await firstEmailCell.textContent();;
            console.log(`Row ${i + 1}: ${actualValue}`);
            expect(actualValue?.trim()).toBe(emailId);
        }
    })

    test("Select 20 Entries and Delete Second Row", async ({ page }) => {
        const firstPage = page.locator('table tbody tr');

        await page.getByRole('link', { name: '2' }).click();
        const secondPage = page.locator('table tbody tr');
        const secondRowDelete = page
            .locator('tbody tr')
            .nth(1)
            .locator('.ng2-smart-action-delete-delete');

        const secondRowBeforDel = await getSecondRow(firstPage, secondPage);
        await page.getByRole('link', { name: '1' }).click();

        // Handla alert
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure');
            await dialog.accept();
        });
        await secondRowDelete.click();

        const firstPage1 = page.locator('table tbody tr');
        await expect.poll(async () => await firstPage1.count()).toEqual(10);

        await page.getByRole('link', { name: '2' }).click();
        const secondPage1 = page.locator('table tbody tr');
        await expect.poll(async () => await secondPage1.count()).toEqual(10);
        const secondRowAfterDel = await getSecondRow(firstPage1, secondPage1);
        console.log(`Secomd row emailID before deleting the row: ${await secondRowBeforDel}`)
        console.log(`Secomd row emailID after deleting the row: ${await secondRowAfterDel}`)
        expect(secondRowBeforDel).not.toEqual(secondRowAfterDel)


    });

    test("Handle Date Picker Using Dynamic Function", async ({ page }) => {
        await page.goto("https://demoqa.com/date-picker");
        await expect(page).toHaveURL(/date-picker/);
        await page.locator('#datePickerMonthYearInput').click();

        const expected = await datePicker("13/11/2025", page);
        const dateSelected = await page.locator('#datePickerMonthYearInput').inputValue();
        expect(dateSelected).toEqual(expected)

    });

    test('Handle Nested Iframe', async ({ page }) => {
        await page.goto('https://vinothqaacademy.com/iframe/');
        await page.locator('.iframe-container').click();
        const frame = page.frameLocator('iframe[name="registeruser"]');

        await frame.getByRole('textbox', { name: 'First Name *' }).click();
        await frame.getByRole('textbox', { name: 'First Name *' }).fill('Mohamm');
        await frame.getByRole('textbox', { name: 'Last Name *' }).fill('asif');
        await frame.getByRole('radio', { name: 'Male', exact: true }).check();

        await frame.getByRole('checkbox', { name: 'Selenium WebDriver' }).check();

        await frame.getByRole('textbox', { name: 'Street Address' }).click();
        await frame.getByRole('textbox', { name: 'Street Address' }).fill('1131 aude');
        await frame.getByRole('textbox', { name: 'Apt, Suite, Bldg. (optional)' }).fill('12');
        await frame.getByRole('textbox', { name: 'City' }).fill('dallas');
        await frame.getByRole('textbox', { name: 'State / Province / Region' }).fill('tx');
        await frame.getByRole('textbox', { name: 'Postal / Zip Code' }).fill('7435');
        await frame.locator('.select2-selection__arrow').first().click();
        await frame.getByRole('searchbox', { name: 'Search' }).fill('');
        await frame.getByRole('option', { name: 'United States of America' }).click();

        await frame.getByRole('textbox', { name: 'Email *' }).click();
        await frame.getByRole('textbox', { name: 'Email *' }).fill('test@yopmail.com');
        await frame.getByRole('textbox', { name: 'Date of Demo' }).click();
        await frame.getByRole('textbox', { name: 'Date of Demo' }).fill('12/20/2026');
        await frame.getByRole('textbox', { name: 'Date of Demo' }).press('Tab');

        await frame.locator('.selection').nth(1).click();
        await frame.getByRole('option', { name: '12' }).click();
        await frame.locator('.selection').nth(2).click();

        await frame.getByRole('option', { name: '20' }).click();
        await frame.getByRole('textbox', { name: 'Mobile Number' }).click();
        await frame.getByRole('textbox', { name: 'Mobile Number' }).fill('2133456789');
        await frame.getByRole('textbox', { name: 'Enter your query' }).fill('Fine');
        await frame.getByRole('textbox', { name: 'Please enter two digits as' }).fill('12');
        await frame.getByRole('button', { name: 'Submit' }).click();

        const confirmation = await frame.locator('#messageContainer').textContent();
        expect(confirmation).toContain('Registration Form is Successfully Submitted')

        // switch to the other iframe
        const popup = page.frameLocator('iframe[name="popuppage"]');
        await popup.getByText('Alert Box', { exact: true }).click();
        const message = await popup.locator('#demotwo').textContent();
        expect(message).toEqual('You clicked on OK!');

        await popup.getByText('Confirm Alert Box', { exact: true }).click();
        const message1 = await popup.locator('#demo').textContent();
        expect(message1).toEqual('You clicked on Cancel!');

        await popup.getByText('Prompt Alert Box', { exact: true }).click();
        const message2 = await popup.locator('#demoone').textContent();
        expect(message2).toEqual('User cancelled the prompt.');


    });

    // No part of hands 4- more practice material
    test("Handle nested ifram - child frame Project Detaisl", async ({ page }) => {
        await page.goto("https://vinothqaacademy.com/iframe/");
        expect(page).toHaveURL(/ifram/);
        await page.locator(".iframe-container").click();
        const iFrame = page.frameLocator("iframe[name='employeetable']");
        expect(await iFrame.getByText("Project Details").textContent()).toEqual("Project Details");

        //add an employee
        await iFrame.getByPlaceholder("Name", { exact: true }).fill(employee.fullName);
        await iFrame.getByPlaceholder("Role").fill(employee.role);
        await iFrame.getByPlaceholder("Email Address").fill(employee.email);
        await iFrame.getByPlaceholder("Location").fill(employee.location);
        await iFrame.getByPlaceholder("Department").fill(employee.department);
        await iFrame.getByText("Add Row", { exact: true }).click();

        const employeeList = iFrame.locator("table tbody tr");//.locator("td");
       
       const lastRow = (await iFrame.locator('table tbody tr').last().innerText());
       const expectedVals: string []= lastRow.split("\t");
       console.log("First ",expectedVals[0])
       expect.soft(expectedVals[0].trimStart()+""+expectedVals[1].trim()).toEqual(employee.fullName);
       expect.soft(expectedVals[2].trim()).toEqual(employee.role);
       expect.soft(expectedVals[3].trim()).toEqual(employee.email);
       expect.soft(expectedVals[4].trim()).toEqual(employee.location);
       expect.soft(expectedVals[5].trim()).toEqual(employee.department);

         
    })

    async function datePicker(dateInput: string, page: Page): Promise<string | null> {
        const parts = dateInput.split(/\/|-/);

        if (parts.length !== 3) {
            return null;
        }

        const first = parseInt(parts[0], 10);
        const second = parseInt(parts[1], 10);
        const year = parts[2];

        let day: number;
        let month: number;

        // Detect format
        if (first > 12) {
            day = first;
            month = second + 1;
        } else if (second > 12) {
            day = second;
            month = first + 1;
        } else {
            month = first + 1;
            day = second;
        }

        const formattedDay = day.toString().padStart(3, '0');
        const formattedMonth = month.toString().padStart(2, '0');

        await page.locator('#datePickerMonthYearInput').click();
        await page.locator('.react-datepicker__year-select').selectOption(year);
        await page.locator('.react-datepicker__month-select').selectOption((month - 1).toString());
        await page
            .locator(`.react-datepicker__day--${formattedDay}:not(.react-datepicker__day--outside-month)`)
            .click();
        return `${formattedMonth}/${formattedDay.substring(1)}/${year}`;
    };
    async function getSecondRow(firstPage: any, secondPage: any) {
        const listOfrows = [];
        const countP1 = await firstPage.count();
        const countP2 = await secondPage.count();
        const secondRow = firstPage.nth(1).locator('td').nth(5).textContent();
        console.log('Second row email id: ', await secondRow)
        for (let i = 0; i < countP1; i++) {
            listOfrows.push(firstPage.nth(i).locator('td').nth(5).textContent());
        }
        for (let i = 0; i < countP2; i++) {
            listOfrows.push(secondPage.nth(i).locator('td').nth(5).textContent())
        }
        for (let i = 0; i < listOfrows.length; i++) {
            console.log(`Row ${i} ${await listOfrows[i]}`);
        }
        return secondRow;

    }

});

const employee = {
  fullName: 'Moh Asif',
  role: 'QAE',
  email: 'mohasif@yopmail.com',
  location: 'Texas',
  department: 'IT'
};