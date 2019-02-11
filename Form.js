import Errors from './Errors';

class Form
{
	/**
	 * Create a new Form instance
	 *
	 * @param {object} data
	 */
	constructor (data)
	{
		this.data = data;
		for (let field in data) {
			this[field] = data[field];
		}

		this.errors = new Errors();
	}

	/**
	 * Fetch all relevant data for the form.
	 */
	data ()
	{
		let data = {};
		for (let property in this.originalData) {
			data[property] = this[property];
		}
		// let data = Object.assign({}, this);
		// delete data.originalData;
		// delete data.errors;
		return data;
	}

	/**
	 * Reset the form fields.
	 */
	reset ()
	{
		for (let field in this.originalData) {
			this[field] = null;
		}
		this.errors.clear();
	}

	/**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
	post (url)
	{
		return this.submit('post', url);
	}

	/**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
	put (url)
	{
		return this.submit('put', url);
	}

	/**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
	patch (url)
	{
		return this.submit('patch', url);
	}

	/**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
	delete (url)
	{
		return this.submit('delete', url);
	}



	/**
	 * Submit the form
	 *
	 * @param {string} requestType
	 * @param {string} url
	 */
	submit (requestType, url)
	{
		return new Promisse ((resolve, reject) => {
			axios[requestType](url, this.data())
				.then(response => {
					this.onSuccess(response.data);

					resolve(response.data)
				})
				.catch(error => {
					this.onFail(error.response.data);
					reject(error.response.data);
				});

		});
	}

	/**
	 * Handle a successful form submission.
	 *
	 * @param {object} response
	 */
	onSuccess (data)
	{
		alert(data.message); // temporary

		this.reset();
	}

	/**
	 * Handle a faild form submission.
	 *
	 * @param {object} error
	 */
	onFail (errors)
	{
		this.errors.record(errors);
	}
}

export default Form;