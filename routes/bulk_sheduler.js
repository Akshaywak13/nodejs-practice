const schedule = require('node-schedule');
const BulkUploadService = require('../service/bulk.service');
const path = require('path');

// Log the current time
function logCurrentTime(message) {
  console.log(`${message} at:`, new Date());
}

// Job to process Excel
schedule.scheduleJob('40 15 * * *', async () => {
  logCurrentTime("Scheduled task running: Processing Excel");

  const filePath = path.join(__dirname, 'uploads/Untitled spreadsheet.xlsx');
  console.log("File Path:", filePath);  // Log the file path to check if it's correct

  try {
    const result = await BulkUploadService.processExcelFile(filePath);
    console.log("Excel data processed successfully:", result);
  } catch (error) {
    console.error("Error processing Excel file:", error.message);
  }
  console.log("Processing Excel task finished.");
});

// Job to archive and delete data
schedule.scheduleJob('42 15 * * *', async () => {
  logCurrentTime("Scheduled task running: Archiving and Deleting");

  try {
    const result = await BulkUploadService.archiveAndDeleteAllData();
    console.log("Data archived and deleted successfully:", result);
  } catch (error) {
    console.error("Error archiving and deleting data:", error.message);
  }
  console.log("Archiving and deleting task finished.");
});

// Job to restore archived data
schedule.scheduleJob('44 15 * * *', async () => {
  logCurrentTime("Scheduled task running: Restoring archived data");

  try {
    const result = await BulkUploadService.getAllDeletedData();
    console.log("Archived data restored successfully:", result);
  } catch (error) {
    console.error("Error restoring archived data:", error.message);
  }
  console.log("Restoring archived data task finished.");
});

// Log when jobs are scheduled
console.log("Jobs scheduled at", new Date());
