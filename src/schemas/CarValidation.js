import { z  } from "zod";

export const carFormSchema= z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.coerce
    .number({ invalid_type_error: "Year must be a number" })
    .int("Year must be an integer")
    .gte(1886, "Year must be >= 1886")
    .lte(new Date().getFullYear(), `Year must be <= ${new Date().getFullYear()}`),
    mileage: z.coerce
    .number({ invalid_type_error: "Mileage must be a number" })
    .min(0, "Mileage must be 0 or more"),
    price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be 0 or more"),
    fuel: z.string().min(1, "Fuel type is required"),
    color: z.string().min(1, "Color is required"),
    transmission: z.string().min(1, "Transmission is required"),
    features: z.string().optional(),
    condition: z.string().min(1, "Condition is required"),
    accident: z.string().transform((val)=>val.trim().toLowerCase()).refine((val)=>val === "yes" || val=== "no", {message: 'Accident must be "Yes" or "No"'}).transform((val) => (val === "yes" ? "Yes" : "No")),
})
