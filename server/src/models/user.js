import 'dotenv/config'
import db from '../db'
import Model from '../gsheetsdb/Model'


let userSchema = [
  {
    column: 'A',
    columnName: 'email',
    type: String
  },
  {
    column: 'B',
    columnName: 'username',
    type: String
  },
  {
    column: 'C',
    columnName: 'password',
    type: String
  },
  {
    column: 'D',
    columnName: 'upToChapter',
    type: Number
  },
  {
    column: 'E',
    columnName: 'lastDailyRevision',
    type: String
  }
]

export default new Model(db, process.env.GSHEET_USER_RANGE, userSchema)
