import 'dotenv/config'
import GSheetDB from './gsheetsdb/GSheetDB'
console.log(process.env.GSHEET_ID)
export default new GSheetDB(process.env.GSHEET_ID)
