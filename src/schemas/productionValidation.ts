import { z } from 'zod'

// Constantes para mensagens de erro
const REQUIRED_FIELD_MESSAGE = 'Este campo é obrigatório'
const INVALID_NUMBER_MESSAGE = 'Deve ser um número válido'
const POSITIVE_NUMBER_MESSAGE = 'Deve ser um número positivo'
const MIN_QUANTITY_MESSAGE = 'A quantidade deve ser maior que 0'
const MAX_PRODUCT_NAME_LENGTH = 100
const MAX_PRODUCT_NAME_MESSAGE = `O nome do produto deve ter no máximo ${MAX_PRODUCT_NAME_LENGTH} caracteres`

// Schema de validação para entrada de produção (dados processados)
export const productionEntrySchema = z.object({
  product: z
    .string()
    .trim()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .max(MAX_PRODUCT_NAME_LENGTH, MAX_PRODUCT_NAME_MESSAGE),
  
  quantityKg: z
    .number({
      message: INVALID_NUMBER_MESSAGE,
    })
    .positive(POSITIVE_NUMBER_MESSAGE)
    .min(0.1, MIN_QUANTITY_MESSAGE)
})

// Tipo TypeScript derivado do schema
export type ProductionEntryData = z.infer<typeof productionEntrySchema>

// Schema para validação de formulário (string inputs que serão transformados)
export const productionEntryFormSchema = z.object({
  productId: z
    .string()
    .trim()
    .min(1, 'Selecione um produto')
    .uuid('Selecione um produto válido'),
  
  quantityKg: z
    .string()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && num > 0 && num >= 0.1
    }, MIN_QUANTITY_MESSAGE)
})

export type ProductionEntryFormData = z.infer<typeof productionEntryFormSchema>

// Schema para validação de login
const MIN_USERNAME_LENGTH = 3
const MIN_PASSWORD_LENGTH = 4
const MIN_USERNAME_MESSAGE = `O nome de usuário deve ter pelo menos ${MIN_USERNAME_LENGTH} caracteres`
const MIN_PASSWORD_MESSAGE = `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`

export const loginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .min(MIN_USERNAME_LENGTH, MIN_USERNAME_MESSAGE),
  
  password: z
    .string()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .min(MIN_PASSWORD_LENGTH, MIN_PASSWORD_MESSAGE)
})

export type LoginFormData = z.infer<typeof loginFormSchema>