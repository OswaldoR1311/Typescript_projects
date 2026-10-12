import express, { type Response, type Request } from 'express'
import { DiaryEntry, NewDiaryEntry, type NonSensitiveDiaryEntry } from '../../types.ts'
import diaryService from '../services/diaryService.ts'
import { errorMiddleware, newDiaryParser } from '../middleware/parserFunction.ts'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))

  if (diary) {
    res.send(diary)
  }
  else {
    res.sendStatus(404)
  }
})

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  // try {
  //   const newDiaryEntry = NewEntrySchema.parse(req.body)
  //   const addedEntry = diaryService.addDiary(newDiaryEntry)
  //   res.json(addedEntry)
  // }
  // catch (error: unknown) {
  //   if (error instanceof z.ZodError) {
  //     // console.log('Si se está disparando el error de zod.')
  //     res.status(400).send({ error: error.issues })
  //   }
  //   else {
  //     res.status(400).send({ error: 'unknown error' })
  //   }
  // }
  const addedEntry = diaryService.addDiary(req.body)
  res.json(addedEntry)
})

router.use(errorMiddleware)

export default router
