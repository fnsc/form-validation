export default class Form
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
		let data = Object.assign({}, this);
		delete data.originalData;
		delete data.errors;
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
	}

	/**
	 * Submit the form
	 *
	 * @param {string} requestType
	 * @param {string} url
	 */
	submit (requestType, url)
	{
		axios[requestType](url, this.data())
			.then(this.onSuccess.bind(this))
			.catch(this.onFail.bind(this))
	}

	/**
	 * Handle a successful form submission.
	 *
	 * @param {object} response
	 */
	onSuccess (response)
	{
		alert(response.data.message); // temporary
		this.errors.clear();
		this.reset();
	}

	/**
	 * Handle a faild form submission.
	 *
	 * @param {object} error
	 */
	onFail (error)
	{
		this.errors.record(error.response.data);
	}
}