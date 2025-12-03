/**
 * Validators Module
 * 
 * Re-exports all validation functions and utilities.
 * No external dependencies - just plain TypeScript.
 */

// Validation utilities
export { 
  validateOrFail, 
  formatErrors, 
  sendValidationError,
  isString,
  isEmail,
  isPhone,
  isUUID,
  isNumber,
  isBoolean,
  isArray,
  isObject,
} from './validate';
export type { ValidationResult, Validator } from './validate';

// All validators
export {
  // Auth
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  
  // User
  CreateUserSchema,
  UpdateUserSchema,
  DeleteUsersSchema,
  ChangeProfileSchema,
  
  // Portfolio
  CreatePortfolioSchema,
  UpdatePortfolioSchema,
  DeletePortfoliosSchema,
  
  // Product
  CreateProductSchema,
  UpdateProductSchema,
  DeleteProductsSchema,
} from './schemas';

// Type exports
export type {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  CreateUserInput,
  UpdateUserInput,
  DeleteUsersInput,
  ChangeProfileInput,
  CreatePortfolioInput,
  UpdatePortfolioInput,
  DeletePortfoliosInput,
  CreateProductInput,
  UpdateProductInput,
  DeleteProductsInput,
} from './schemas';
