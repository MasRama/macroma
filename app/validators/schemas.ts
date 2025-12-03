/**
 * Validation Schemas
 * 
 * Simple validation functions for all API endpoints.
 * No external dependencies - just plain TypeScript.
 */
import { ValidationResult, isString, isEmail, isPhone, isUUID, isBoolean, isArray, isObject } from './validate';

// ============================================
// Type Definitions
// ============================================

export interface LoginInput {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone?: string | null;
  password: string;
}

export interface ForgotPasswordInput {
  email?: string;
  phone?: string;
}

export interface ResetPasswordInput {
  id: string;
  password: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone?: string | null;
  password?: string;
  is_admin?: boolean;
  is_verified?: boolean;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string | null;
  password?: string;
  is_admin?: boolean;
  is_verified?: boolean;
}

export interface DeleteUsersInput {
  ids: string[];
}

export interface ChangeProfileInput {
  name: string;
  email: string;
  phone?: string | null;
}

export interface CreatePortfolioInput {
  image_url: string;
  description: string;
  hyperlink?: string | null;
}

export interface UpdatePortfolioInput {
  image_url?: string;
  description?: string;
  hyperlink?: string | null;
}

export interface DeletePortfoliosInput {
  ids: string[];
}

export interface CreateProductInput {
  image_url: string;
  description: string;
  hyperlink?: string | null;
  type: string;
}

export interface UpdateProductInput {
  image_url?: string;
  description?: string;
  hyperlink?: string | null;
  type?: string;
}

export interface DeleteProductsInput {
  ids: string[];
}


// ============================================
// Validator Functions
// ============================================

/**
 * Login validator
 */
export function LoginSchema(data: unknown): ValidationResult<LoginInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { email, phone, password } = data as Record<string, unknown>;

  // Email or phone required
  if (!email && !phone) {
    errors._root = ['Email atau nomor telepon wajib diisi'];
  }

  // Validate email if provided
  if (email !== undefined && email !== null && email !== '') {
    if (!isEmail(email)) {
      errors.email = ['Format email tidak valid'];
    }
  }

  // Validate phone if provided
  if (phone !== undefined && phone !== null && phone !== '') {
    if (!isString(phone) || phone.length < 10) {
      errors.phone = ['Nomor telepon minimal 10 digit'];
    }
  }

  // Password required
  if (!isString(password) || password.length === 0) {
    errors.password = ['Password wajib diisi'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      email: email ? String(email).toLowerCase() : undefined,
      phone: phone ? String(phone) : undefined,
      password: String(password),
    }
  };
}

/**
 * Register validator
 */
export function RegisterSchema(data: unknown): ValidationResult<RegisterInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { name, email, phone, password } = data as Record<string, unknown>;

  // Name validation
  if (!isString(name) || name.trim().length < 2) {
    errors.name = ['Nama minimal 2 karakter'];
  } else if (name.length > 100) {
    errors.name = ['Nama maksimal 100 karakter'];
  }

  // Email validation
  if (!isEmail(email)) {
    errors.email = ['Format email tidak valid'];
  }

  // Phone validation (optional)
  if (phone !== undefined && phone !== null && phone !== '') {
    if (!isPhone(phone)) {
      errors.phone = ['Format nomor telepon tidak valid'];
    }
  }

  // Password validation
  if (!isString(password) || password.length < 8) {
    errors.password = ['Password minimal 8 karakter'];
  } else if (password.length > 100) {
    errors.password = ['Password maksimal 100 karakter'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: String(name).trim(),
      email: String(email).toLowerCase(),
      phone: phone ? String(phone) : null,
      password: String(password),
    }
  };
}

/**
 * Forgot password validator
 */
export function ForgotPasswordSchema(data: unknown): ValidationResult<ForgotPasswordInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { email, phone } = data as Record<string, unknown>;

  // Email or phone required
  if (!email && !phone) {
    errors._root = ['Email atau nomor telepon wajib diisi'];
  }

  // Validate email if provided
  if (email !== undefined && email !== null && email !== '') {
    if (!isEmail(email)) {
      errors.email = ['Format email tidak valid'];
    }
  }

  // Validate phone if provided
  if (phone !== undefined && phone !== null && phone !== '') {
    if (!isString(phone) || phone.length < 10) {
      errors.phone = ['Nomor telepon minimal 10 digit'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      email: email ? String(email).toLowerCase() : undefined,
      phone: phone ? String(phone) : undefined,
    }
  };
}

/**
 * Reset password validator
 */
export function ResetPasswordSchema(data: unknown): ValidationResult<ResetPasswordInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { id, password } = data as Record<string, unknown>;

  // Token validation
  if (!isString(id) || id.length === 0) {
    errors.id = ['Token tidak valid'];
  }

  // Password validation
  if (!isString(password) || password.length < 8) {
    errors.password = ['Password minimal 8 karakter'];
  } else if (password.length > 100) {
    errors.password = ['Password maksimal 100 karakter'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      id: String(id),
      password: String(password),
    }
  };
}

/**
 * Change password validator
 */
export function ChangePasswordSchema(data: unknown): ValidationResult<ChangePasswordInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { current_password, new_password } = data as Record<string, unknown>;

  // Current password validation
  if (!isString(current_password) || current_password.length === 0) {
    errors.current_password = ['Password lama wajib diisi'];
  }

  // New password validation
  if (!isString(new_password) || new_password.length < 8) {
    errors.new_password = ['Password minimal 8 karakter'];
  } else if (new_password.length > 100) {
    errors.new_password = ['Password maksimal 100 karakter'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      current_password: String(current_password),
      new_password: String(new_password),
    }
  };
}

/**
 * Create user validator
 */
export function CreateUserSchema(data: unknown): ValidationResult<CreateUserInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { name, email, phone, password, is_admin, is_verified } = data as Record<string, unknown>;

  // Name validation
  if (!isString(name) || name.trim().length < 2) {
    errors.name = ['Nama minimal 2 karakter'];
  } else if (name.length > 100) {
    errors.name = ['Nama maksimal 100 karakter'];
  }

  // Email validation
  if (!isEmail(email)) {
    errors.email = ['Format email tidak valid'];
  }

  // Phone validation (optional)
  if (phone !== undefined && phone !== null && phone !== '') {
    if (!isPhone(phone)) {
      errors.phone = ['Format nomor telepon tidak valid'];
    }
  }

  // Password validation (optional)
  if (password !== undefined && password !== null && password !== '') {
    if (!isString(password) || password.length < 8) {
      errors.password = ['Password minimal 8 karakter'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: String(name).trim(),
      email: String(email).toLowerCase(),
      phone: phone ? String(phone) : null,
      password: password ? String(password) : undefined,
      is_admin: isBoolean(is_admin) ? is_admin : false,
      is_verified: isBoolean(is_verified) ? is_verified : false,
    }
  };
}

/**
 * Update user validator
 */
export function UpdateUserSchema(data: unknown): ValidationResult<UpdateUserInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { name, email, phone, password, is_admin, is_verified } = data as Record<string, unknown>;

  // At least one field must be provided
  const hasAnyField = name !== undefined || email !== undefined || phone !== undefined || 
                      password !== undefined || is_admin !== undefined || is_verified !== undefined;
  
  if (!hasAnyField) {
    errors._root = ['Minimal satu field harus diisi untuk update'];
  }

  // Name validation (optional)
  if (name !== undefined && name !== null) {
    if (!isString(name) || name.trim().length < 2) {
      errors.name = ['Nama minimal 2 karakter'];
    } else if (name.length > 100) {
      errors.name = ['Nama maksimal 100 karakter'];
    }
  }

  // Email validation (optional)
  if (email !== undefined && email !== null) {
    if (!isEmail(email)) {
      errors.email = ['Format email tidak valid'];
    }
  }

  // Phone validation (optional)
  if (phone !== undefined && phone !== null && phone !== '') {
    if (!isPhone(phone)) {
      errors.phone = ['Format nomor telepon tidak valid'];
    }
  }

  // Password validation (optional)
  if (password !== undefined && password !== null && password !== '') {
    if (!isString(password) || password.length < 8) {
      errors.password = ['Password minimal 8 karakter'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const result: UpdateUserInput = {};
  if (name !== undefined) result.name = String(name).trim();
  if (email !== undefined) result.email = String(email).toLowerCase();
  if (phone !== undefined) result.phone = phone ? String(phone) : null;
  if (password !== undefined && password !== '') result.password = String(password);
  if (is_admin !== undefined) result.is_admin = Boolean(is_admin);
  if (is_verified !== undefined) result.is_verified = Boolean(is_verified);

  return { success: true, data: result };
}

/**
 * Delete users validator
 */
export function DeleteUsersSchema(data: unknown): ValidationResult<DeleteUsersInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { ids } = data as Record<string, unknown>;

  // IDs validation
  if (!isArray(ids) || ids.length === 0) {
    errors.ids = ['Minimal satu ID harus dipilih'];
  } else {
    const invalidIds = ids.filter(id => !isUUID(id));
    if (invalidIds.length > 0) {
      errors.ids = ['Format ID tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      ids: (ids as unknown[]).map(id => String(id)),
    }
  };
}

/**
 * Change profile validator
 */
export function ChangeProfileSchema(data: unknown): ValidationResult<ChangeProfileInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { name, email, phone } = data as Record<string, unknown>;

  // Name validation
  if (!isString(name) || name.trim().length < 2) {
    errors.name = ['Nama minimal 2 karakter'];
  } else if (name.length > 100) {
    errors.name = ['Nama maksimal 100 karakter'];
  }

  // Email validation
  if (!isEmail(email)) {
    errors.email = ['Format email tidak valid'];
  }

  // Phone validation (optional)
  if (phone !== undefined && phone !== null && phone !== '') {
    if (!isPhone(phone)) {
      errors.phone = ['Format nomor telepon tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: String(name).trim(),
      email: String(email).toLowerCase(),
      phone: phone ? String(phone) : null,
    }
  };
}

/**
 * Create portfolio validator
 */
export function CreatePortfolioSchema(data: unknown): ValidationResult<CreatePortfolioInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { image_url, description, hyperlink } = data as Record<string, unknown>;

  // Image URL validation
  if (!isString(image_url) || image_url.trim().length === 0) {
    errors.image_url = ['URL gambar wajib diisi'];
  }

  // Description validation
  if (!isString(description) || description.trim().length < 10) {
    errors.description = ['Deskripsi minimal 10 karakter'];
  } else if (description.length > 1000) {
    errors.description = ['Deskripsi maksimal 1000 karakter'];
  }

  // Hyperlink validation (optional)
  if (hyperlink !== undefined && hyperlink !== null && hyperlink !== '') {
    if (!isString(hyperlink)) {
      errors.hyperlink = ['Format hyperlink tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      image_url: String(image_url).trim(),
      description: String(description).trim(),
      hyperlink: hyperlink ? String(hyperlink).trim() : null,
    }
  };
}

/**
 * Update portfolio validator
 */
export function UpdatePortfolioSchema(data: unknown): ValidationResult<UpdatePortfolioInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { image_url, description, hyperlink } = data as Record<string, unknown>;

  // At least one field must be provided
  const hasAnyField = image_url !== undefined || description !== undefined || hyperlink !== undefined;
  
  if (!hasAnyField) {
    errors._root = ['Minimal satu field harus diisi untuk update'];
  }

  // Image URL validation (optional)
  if (image_url !== undefined && image_url !== null) {
    if (!isString(image_url) || image_url.trim().length === 0) {
      errors.image_url = ['URL gambar tidak boleh kosong'];
    }
  }

  // Description validation (optional)
  if (description !== undefined && description !== null) {
    if (!isString(description) || description.trim().length < 10) {
      errors.description = ['Deskripsi minimal 10 karakter'];
    } else if (description.length > 1000) {
      errors.description = ['Deskripsi maksimal 1000 karakter'];
    }
  }

  // Hyperlink validation (optional)
  if (hyperlink !== undefined && hyperlink !== null && hyperlink !== '') {
    if (!isString(hyperlink)) {
      errors.hyperlink = ['Format hyperlink tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const result: UpdatePortfolioInput = {};
  if (image_url !== undefined) result.image_url = String(image_url).trim();
  if (description !== undefined) result.description = String(description).trim();
  if (hyperlink !== undefined) result.hyperlink = hyperlink ? String(hyperlink).trim() : null;

  return { success: true, data: result };
}

/**
 * Delete portfolios validator
 */
export function DeletePortfoliosSchema(data: unknown): ValidationResult<DeletePortfoliosInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { ids } = data as Record<string, unknown>;

  // IDs validation
  if (!isArray(ids) || ids.length === 0) {
    errors.ids = ['Minimal satu ID harus dipilih'];
  } else {
    const invalidIds = ids.filter(id => !isUUID(id));
    if (invalidIds.length > 0) {
      errors.ids = ['Format ID tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      ids: (ids as unknown[]).map(id => String(id)),
    }
  };
}

/**
 * Create product validator
 */
export function CreateProductSchema(data: unknown): ValidationResult<CreateProductInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { image_url, description, hyperlink, type } = data as Record<string, unknown>;

  // Image URL validation
  if (!isString(image_url) || image_url.trim().length === 0) {
    errors.image_url = ['URL gambar wajib diisi'];
  }

  // Description validation
  if (!isString(description) || description.trim().length < 10) {
    errors.description = ['Deskripsi minimal 10 karakter'];
  } else if (description.length > 1000) {
    errors.description = ['Deskripsi maksimal 1000 karakter'];
  }

  // Type validation
  if (!isString(type) || type.trim().length === 0) {
    errors.type = ['Tipe produk wajib diisi'];
  }

  // Hyperlink validation (optional)
  if (hyperlink !== undefined && hyperlink !== null && hyperlink !== '') {
    if (!isString(hyperlink)) {
      errors.hyperlink = ['Format hyperlink tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      image_url: String(image_url).trim(),
      description: String(description).trim(),
      hyperlink: hyperlink ? String(hyperlink).trim() : null,
      type: String(type).trim(),
    }
  };
}

/**
 * Update product validator
 */
export function UpdateProductSchema(data: unknown): ValidationResult<UpdateProductInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { image_url, description, hyperlink, type } = data as Record<string, unknown>;

  // At least one field must be provided
  const hasAnyField = image_url !== undefined || description !== undefined || hyperlink !== undefined || type !== undefined;
  
  if (!hasAnyField) {
    errors._root = ['Minimal satu field harus diisi untuk update'];
  }

  // Image URL validation (optional)
  if (image_url !== undefined && image_url !== null) {
    if (!isString(image_url) || image_url.trim().length === 0) {
      errors.image_url = ['URL gambar tidak boleh kosong'];
    }
  }

  // Description validation (optional)
  if (description !== undefined && description !== null) {
    if (!isString(description) || description.trim().length < 10) {
      errors.description = ['Deskripsi minimal 10 karakter'];
    } else if (description.length > 1000) {
      errors.description = ['Deskripsi maksimal 1000 karakter'];
    }
  }

  // Type validation (optional)
  if (type !== undefined && type !== null) {
    if (!isString(type) || type.trim().length === 0) {
      errors.type = ['Tipe produk tidak boleh kosong'];
    }
  }

  // Hyperlink validation (optional)
  if (hyperlink !== undefined && hyperlink !== null && hyperlink !== '') {
    if (!isString(hyperlink)) {
      errors.hyperlink = ['Format hyperlink tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const result: UpdateProductInput = {};
  if (image_url !== undefined) result.image_url = String(image_url).trim();
  if (description !== undefined) result.description = String(description).trim();
  if (hyperlink !== undefined) result.hyperlink = hyperlink ? String(hyperlink).trim() : null;
  if (type !== undefined) result.type = String(type).trim();

  return { success: true, data: result };
}

/**
 * Delete products validator
 */
export function DeleteProductsSchema(data: unknown): ValidationResult<DeleteProductsInput> {
  const errors: Record<string, string[]> = {};
  
  if (!isObject(data)) {
    return { success: false, errors: { _root: ['Data harus berupa object'] } };
  }

  const { ids } = data as Record<string, unknown>;

  // IDs validation
  if (!isArray(ids) || ids.length === 0) {
    errors.ids = ['Minimal satu ID harus dipilih'];
  } else {
    const invalidIds = ids.filter(id => !isUUID(id));
    if (invalidIds.length > 0) {
      errors.ids = ['Format ID tidak valid'];
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      ids: (ids as unknown[]).map(id => String(id)),
    }
  };
}

