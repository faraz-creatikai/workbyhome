import { z } from 'zod';

export const PropertyFormSchema = z.object({
     images: z.array(z.string()).default([]),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long'),
  address: z.string().min(5, 'Address must be at least 5 characters').max(200, 'Address too long'),
  price: z.number().min(1, 'Price must be greater than 0').max(999999999, 'Price too high'),
  beds: z.number().min(0, 'Beds cannot be negative').max(20, 'Too many beds'),
  baths: z.number().min(0, 'Baths cannot be negative').max(20, 'Too many baths'),
  sqft: z.number().min(1, 'Square feet must be greater than 0').max(100000, 'Area too large'),
  type: z.enum(['House', 'Apartment', 'Condo', 'Villa', 'Townhouse']),
  status: z.enum(['For Sale', 'For Rent', 'Draft', 'Sold']),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  yearBuilt: z.number().min(1800, 'Year must be after 1800').max(new Date().getFullYear() + 1, 'Invalid year'),
  garage: z.number().min(0, 'Garage cannot be negative').max(10, 'Too many garage spaces'),
  lotSize: z.string().max(50, 'Lot size description too long').optional(),
  features: z.array(z.string()).max(20, 'Too many features'),
  agent: z.object({
    name: z.string().min(2, 'Agent name must be at least 2 characters').max(50, 'Name too long'),
    phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number').min(10, 'Phone too short'),
    email: z.string().email('Invalid email address'),
    image: z.string().optional()
  })
});

export type PropertyFormData = z.infer<typeof PropertyFormSchema>;

export const validateField = <T extends keyof PropertyFormData>(
  field: T,
  value: PropertyFormData[T]
): string | null => {
  // For nested fields like agent, validate the whole object
  if (field === 'agent') {
    const agentSchema = PropertyFormSchema.shape.agent;
    const result = agentSchema.safeParse(value);
    return result.success ? null : result.error.issues[0]?.message || 'Invalid agent info';
  }
  
  const fieldSchema = PropertyFormSchema.shape[field];
  if (!fieldSchema) return null;
  
  const result = fieldSchema.safeParse(value);
  if (!result.success) {
    return result.error.issues[0]?.message || 'Invalid value';
  }
  return null;
};

export const validateForm = (data: PropertyFormData): { success: boolean; errors: Record<string, string> } => {
  const result = PropertyFormSchema.safeParse(data);
  
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });
    return { success: false, errors };
  }
  
  return { success: true, errors: {} };
};