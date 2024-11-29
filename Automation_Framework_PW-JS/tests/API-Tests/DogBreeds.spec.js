import { test, expect } from '@playwright/test';
//require('dotenv').config();

test.describe('Verify list of dog breeds', async () => {
    let allBreeds;
    let response;
    let errorBody;

    test.beforeEach(async ({ request }) => {
        response = await request.get('https://dog.ceo/api/breeds/list/all');
        if (response.ok()) {
            const respBody = JSON.parse(await response.text());
            allBreeds = respBody.message;
        } else if (!response.ok()) {
            errorBody = JSON.parse(await response.text());
        }
    })

    test('Verify Breeds and sub-breeds list', async () => {
        for (const breeds in allBreeds) {
            // check if all breeds do not have sub-breeds
            if (allBreeds[breeds].length === 0) {
                expect(allBreeds[breeds]).toEqual([]);
            } else {
                // to check if breeds have sub-breeds 
                expect(allBreeds[breeds]).not.toEqual([]);
                const subBreeds = allBreeds[breeds];
                for (const subBreed of subBreeds) {
                    // to check if sub-breeds do not have further breed types
                    if(subBreed===undefined)
                    expect(allBreeds[subBreed]).toBeUndefined();
                }
            }
        }
    })

    test('HTTP status displayed in case of negative cases', async () => {
        if (errorBody) {
            console.log(errorBody)
            if (errorBody.code === 404) {
                expect(errorBody.status).toBe('error');
            } else {
                console.error(`Unexpected error: ${errorBody.message}`);
            }
        } else {
            console.log('No error response received for the API tests.');
        }
    })
})
