import { test, expect } from '@playwright/test'

test.describe('Task 3: Verify Response from API', async () => {

    test.only('Verify API response fields', async ({ request }) => {
        const APIResp = await request.get('https://hub.dummyapis.com/employee?noofRecords=10&idStarts=2')
        const respBody = JSON.parse(await APIResp.text());

        respBody.forEach(empFields => {
            const requiredFields = ['imageUrl', 'firstName', 'lastName', 'email', 'contactNumber', 'age', 'dob', 'salary', 'address'];
            console.log(requiredFields)

            for (let i = 0; i < empFields; i++) {
                console.log(typeof (data[i]))
                expect(respBody).to.not.be.a('number')
            }

        })
    })
})
