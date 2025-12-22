/**
 * ProductController
 *
 * Handles CRUD operations for product items.
 * - productsPage: List all products with pagination
 * - createProduct: Create a new product item
 * - updateProduct: Update an existing product item
 * - deleteProducts: Delete one or more product items
 */
import DB from "@services/DB";
import { paginate, parsePaginationQuery } from "@services/Paginator";
import Logger from "@services/Logger";
import dayjs from "dayjs";
import type { NaraRequest, NaraResponse } from "@core";
import { 
   BaseController,
   jsonSuccess, 
   jsonCreated, 
   jsonServerError 
} from "@core"; 
import { randomUUID } from "crypto";
import { 
   CreateProductSchema,
   UpdateProductSchema,
   DeleteProductsSchema,
} from "@validators";

class ProductController extends BaseController {
   /**
    * List all products with pagination
    */
   public async productsPage(request: NaraRequest, response: NaraResponse) {
      const { page, limit } = parsePaginationQuery(request.query);
      const search = request.query.search as string || "";
      const typeFilter = request.query.type as string || "";

      let query = DB.from("products").select("*");

      if (search) {
         query = query.where(function() {
            this.where('name', 'like', `%${search}%`)
                .orWhere('tagline', 'like', `%${search}%`)
                .orWhere('desc', 'like', `%${search}%`)
                .orWhere('hyperlink', 'like', `%${search}%`)
                .orWhere('type', 'like', `%${search}%`);
         });
      }

      if (typeFilter) {
         query = query.where('type', typeFilter);
      }

      // Paginate results
      const result = await paginate(query.orderBy('created_at', 'desc'), { page, limit });

      return response.inertia("products", {
         products: result.data,
         ...result.meta,
         search,
         typeFilter,
      });
   }

   /**
    * Create a new product item
    */
   public async createProduct(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, CreateProductSchema);

      const now = dayjs().valueOf();

      const product = {
         id: randomUUID(),
         name: data.name,
         tagline: data.tagline,
         desc: data.desc,
         badge: data.badge,
         image_url: data.image_url,
         hyperlink: data.hyperlink || null,
         type: data.type,
         is_featured: data.is_featured !== undefined ? data.is_featured : false,
         user_id: request.user.id,
         created_at: now,
         updated_at: now,
      };

      try {
         await DB.table("products").insert(product);
         return jsonCreated(response, "Produk berhasil dibuat", { product });
      } catch (error: unknown) {
         Logger.error('Failed to create product', error as Error);
         return jsonServerError(response, "Gagal membuat produk");
      }
   }

   /**
    * Update an existing product item
    */
   public async updateProduct(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const id = this.getRequiredParam(request, 'id');
      const data = await this.getBody(request, UpdateProductSchema);

      const payload: Record<string, unknown> = {};

      if (data.name !== undefined) payload.name = data.name;
      if (data.tagline !== undefined) payload.tagline = data.tagline;
      if (data.desc !== undefined) payload.desc = data.desc;
      if (data.badge !== undefined) payload.badge = data.badge;
      if (data.image_url !== undefined) payload.image_url = data.image_url;
      if (data.hyperlink !== undefined) payload.hyperlink = data.hyperlink;
      if (data.type !== undefined) payload.type = data.type;
      if (data.is_featured !== undefined) payload.is_featured = data.is_featured;

      payload.updated_at = dayjs().valueOf();

      try {
         await DB.from("products").where("id", id).update(payload);
         const product = await DB.from("products").where("id", id).first();
         return jsonSuccess(response, "Produk berhasil diupdate", { product });
      } catch (error: unknown) {
         Logger.error('Failed to update product', error as Error);
         return jsonServerError(response, "Gagal mengupdate produk");
      }
   }

   /**
    * Delete one or more product items
    */
   public async deleteProducts(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, DeleteProductsSchema);
      
      const deleted = await DB.from("products")
         .whereIn("id", data.ids)
         .delete();
      
      Logger.warn('Products deleted by admin', {
         adminId: request.user.id,
         deletedIds: data.ids,
         count: deleted,
         ip: request.ip
      });
      
      return jsonSuccess(response, "Produk berhasil dihapus", { deleted });
   }
}

export default new ProductController();
