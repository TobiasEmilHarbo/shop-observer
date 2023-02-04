import axios, { AxiosResponse } from 'axios';

export default class KlaravikHttpClient {
	private defaultPageSize = 30;
	private defaultPageNumber = 1;

	constructor(private host: string) {}

	public query(
		searchString: string,
		pageNumber: number = this.defaultPageNumber,
		pageSize: number = this.defaultPageSize
	): Promise<AxiosResponse<string, unknown>> {
		console.log('query:', searchString, pageNumber, pageSize);
		return axios.get(`${this.host}/auction/${pageNumber}/`, {
			params: {
				searchtext: searchString,
				setperpage: pageSize,
			},
		});
	}
}
