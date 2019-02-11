export default class Errors
{
	constructor()
	{
		this.errors = {};
	}

	has (field)
	{
		return this.errors.hasOwnProperty(field);
	}

	any ()
	{
		return Object.keys(this.errors).length > 0;
	}

	get (field)
	{
		if (this.errors[field]) {
			this.errors[field][0];
		}
	}

	record (errors)
	{
		this.errors = errors;
	}

	clear(field)
	{
		// On the form it will be called like that => @keydown="errors.clear($event.target.name)"
		if (field)
		{
			delete this.errors[field];
			return;
		}
		this.errors = {};
	}
}