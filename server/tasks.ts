import { updateBookStatuses } from "./services/TaskService";
import quicktime from "./utils/quicktime";

const schedule = require('node-schedule');

const job = schedule.scheduleJob('*/1 * * * *', async () => {
	const success = await updateBookStatuses();
	console.log(success ? 
		" 📅 [task][" + quicktime() + "]: Successfully updated book statuses." :
		" ❌ [task][" + quicktime() + "]: Error updating book statuses."
	)
});