import baseURL from './baseURL'
import { msalInstance } from '../index';

const getConfig = async () => {
    const accounts = msalInstance.getAllAccounts();
	const request = {
		scopes: ['api://f8626081-3f81-4909-bcef-14f0a974f079/search_list'],
		account: accounts[0],
	}
	const token = await msalInstance.acquireTokenSilent(request);

	const config = {
		baseURL,
		headers: {
			Authorization: `Bearer ${token.accessToken}`,
		}
	}
    return config
}

export default getConfig