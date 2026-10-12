import { type NewDiaryEntry, NewEntrySchema } from '../types.ts'

// const parseComment = (comment: unknown): string => {
//   return z.string().parse(comment);
// };

// export const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if(!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data');
//   }

//   if('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
//     const newEntry: NewDiaryEntry = {
//       comment: z.string().optional().parse(object.comment),
//       date: z.iso.date().parse(object.date),
//       weather: z.enum(Weather).parse(object.weather),
//       visibility: z.enum(Visibility).parse(object.visibility)
//     };
//     return newEntry;
//   }
//   throw new Error('Incorrect data: some fields are missing.');
// };

// Using zod to validate
// const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   return NewEntrySchema.parse(object)
// }

// export { parseNewDiaryEntry }
