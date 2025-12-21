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
   CreateCarouselSchema,
   UpdateCarouselSchema,
   DeleteCarouselsSchema,
} from "@validators";

class CarouselController extends BaseController {
   public async carouselsPage(request: NaraRequest, response: NaraResponse) {
      const { page, limit } = parsePaginationQuery(request.query);
      const search = request.query.search as string || "";

      let query = DB.from("carousel_images").select("*");

      if (search) {
         query = query.where(function() {
            this.where('title', 'like', `%${search}%`)
                .orWhere('description', 'like', `%${search}%`);
         });
      }

      const result = await paginate(query.orderBy('order', 'asc').orderBy('created_at', 'desc'), { page, limit });

      return response.inertia("carousels", {
         carousels: result.data,
         ...result.meta,
         search,
      });
   }

   public async createCarousel(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, CreateCarouselSchema);

      const now = dayjs().valueOf();

      const carousel = {
         id: randomUUID(),
         title: data.title,
         description: data.description || null,
         image_url: data.image_url,
         order: data.order || 0,
         is_active: data.is_active !== undefined ? data.is_active : true,
         created_at: now,
         updated_at: now,
      };

      try {
         await DB.table("carousel_images").insert(carousel);
         return jsonCreated(response, "Carousel berhasil dibuat", { carousel });
      } catch (error: unknown) {
         Logger.error('Failed to create carousel', error as Error);
         return jsonServerError(response, "Gagal membuat carousel");
      }
   }

   public async updateCarousel(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const id = this.getRequiredParam(request, 'id');
      const data = await this.getBody(request, UpdateCarouselSchema);

      const payload: Record<string, unknown> = {};

      if (data.title !== undefined) payload.title = data.title;
      if (data.description !== undefined) payload.description = data.description;
      if (data.image_url !== undefined) payload.image_url = data.image_url;
      if (data.order !== undefined) payload.order = data.order;
      if (data.is_active !== undefined) payload.is_active = data.is_active;

      payload.updated_at = dayjs().valueOf();

      try {
         await DB.from("carousel_images").where("id", id).update(payload);
         const carousel = await DB.from("carousel_images").where("id", id).first();
         return jsonSuccess(response, "Carousel berhasil diupdate", { carousel });
      } catch (error: unknown) {
         Logger.error('Failed to update carousel', error as Error);
         return jsonServerError(response, "Gagal mengupdate carousel");
      }
   }

   public async deleteCarousels(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, DeleteCarouselsSchema);
      
      const deleted = await DB.from("carousel_images")
         .whereIn("id", data.ids)
         .delete();
      
      Logger.warn('Carousels deleted by admin', {
         adminId: request.user.id,
         deletedIds: data.ids,
         count: deleted,
         ip: request.ip
      });
      
      return jsonSuccess(response, "Carousel berhasil dihapus", { deleted });
   }

   public async getActiveCarousels(request: NaraRequest, response: NaraResponse) {
      try {
         const carousels = await DB.from("carousel_images")
            .where("is_active", true)
            .orderBy('order', 'asc')
            .orderBy('created_at', 'desc')
            .select("*");
         
         return jsonSuccess(response, "Carousel berhasil diambil", { carousels });
      } catch (error: unknown) {
         Logger.error('Failed to fetch active carousels', error as Error);
         return jsonServerError(response, "Gagal mengambil carousel");
      }
   }
}

export default new CarouselController();
