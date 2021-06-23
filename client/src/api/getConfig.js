import baseURL from './baseURL'
import getToken from './getToken'

const getConfig = async () => {
    const token = await getToken();
	const config = {
		baseURL,
		headers: {
			Authorization: `Bearer ${token.accessToken}`
		}
	}
    return {token, config}
}

export default getConfig