import 'dotenv/config'
import GSheetDB from './gsheetsdb/GSheetDB'

export default new GSheetDB(process.env.GSHEET_ID)
