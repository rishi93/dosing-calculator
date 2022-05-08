import mongoose from "mongoose";

import { Pill, pillSchema } from './schemas';

export const PillModel = mongoose.model<Pill>('Pill', pillSchema);