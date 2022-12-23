/* eslint-disable eqeqeq */
export const storage = {
	set: function (key, value) {
		if (value != null || value != undefined) {
			try {
				const data = JSON.stringify(value);

				localStorage.setItem(key, data);

				const first = localStorage.getItem("black-steller");
				if (first) {
					return;
				} else {
					localStorage.setItem(
						"black-steller",
						JSON.stringify("BlackSteller Data is here ❤️‍🔥")
					);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log(value, "is Invalid");
		}
	},
	get: function (key) {
		const data = localStorage.getItem(key);

		return JSON.parse(data);
	},
};
