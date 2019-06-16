import 'dotenv/config'
import db from '../db'
import Model from '../gsheetsdb/Model'


let wordSchema = [
  {
    column: 'A',
    columnName: 'greek',
    type: String
  },
  {
    column: 'B',
    columnName: 'french',
    type: String
  },
  {
    column: 'C',
    columnName: 'english',
    type: String
  },
  {
    column: 'D',
    columnName: 'chapter',
    type: Number
  },
  {
    column: 'E',
    columnName: 'revisionBox',
    type: String
  },
  {
    column: 'F',
    columnName: 'lastRevised',
    type: String
  },
  {
    column: 'G',
    columnName: 'categories',
    type: String
  }
]

export default new Model(db, process.env.GSHEET_GREEK_RANGE, wordSchema)
