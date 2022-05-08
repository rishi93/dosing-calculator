import mongoose from 'mongoose';

export type Pill = {
    nutrient: string,
    amount: number,
    unit: string,
    absorption: number
};

export const pillSchema = new mongoose.Schema<Pill>({
    nutrient: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
    absorption: { type: Number, required: true }
});

export type Deficiency = {
    nutrient: string,
    target: number
};