import { revisionBoxes } from './constants'

// createDailyRevision()

// get all words in revisionBox[0] 'every-day' or no revisionBox or no lastRevised
// and add them all to questionPool

// get all words in revisionBox[1] 'every-three-days'
//  - if NOW > lastRevised + 3days add to questionPool

// get all words in revisionBox[2] 'every-week'
//  - if NOW > lastRevised + 7days add to questionPool

// get all words in revisionBox[3] 'every-other-week'
//  - if NOW > lastRevised + 14days add to questionPool

// take a random selection of available words for exercise
// return exercise array
