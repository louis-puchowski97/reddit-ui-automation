import { request, APIRequestContext } from '@playwright/test';

export async function loginReddit(username: string, password: string) {
    const apiRequest: APIRequestContext = await request.newContext();

    const response = await apiRequest.post('https://www.reddit.com/api/login', {
        form: {
            user: username,
            passwd: password,
            api_type: 'json'
        },
        headers: {
            'User-Agent': 'Playwright-Automation'
        }
    });

    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()} - ${await response.text()}`);
    }

    const cookies = await apiRequest.storageState();
    await apiRequest.dispose();

    return cookies;
}