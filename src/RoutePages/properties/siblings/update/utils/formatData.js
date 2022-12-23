import moment from "moment/moment";

export const formatDate = (sec, nanosec) => {
	let time = "00:00:00";

	try {
		time = moment()
			.add({
				seconds: sec,
				milliseconds: nanosec / 1000000,
			})
			.fromNow()
			// .format("hh:mm , DD/MM/YYYY")
			.toString();
	} catch (error) {
		console.log(error);
	}

	return time;
};
