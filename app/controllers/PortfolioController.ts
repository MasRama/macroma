/**
 * PortfolioController
 *
 * Handles CRUD operations for portfolio items.
 * - portfoliosPage: List all portfolios with pagination
 * - createPortfolio: Create a new portfolio item
 * - updatePortfolio: Update an existing portfolio item
 * - deletePortfolios: Delete one or more portfolio items
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
   CreatePortfolioSchema,
   UpdatePortfolioSchema,
   DeletePortfoliosSchema,
} from "@validators";

class PortfolioController extends BaseController {
   /**
    * List all portfolios with pagination
    */
   public async portfoliosPage(request: NaraRequest, response: NaraResponse) {
      const { page, limit } = parsePaginationQuery(request.query);
      const search = request.query.search as string || "";

      let query = DB.from("portfolios").select("*");

      if (search) {
         query = query.where(function() {
            this.where('description', 'like', `%${search}%`)
                .orWhere('hyperlink', 'like', `%${search}%`);
         });
      }

      // Paginate results
      const result = await paginate(query.orderBy('created_at', 'desc'), { page, limit });

      return response.inertia("portfolios", {
         portfolios: result.data,
         ...result.meta,
         search,
      });
   }

   /**
    * Create a new portfolio item
    */
   public async createPortfolio(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, CreatePortfolioSchema);

      const now = dayjs().valueOf();

      const portfolio = {
         id: randomUUID(),
         image_url: data.image_url,
         description: data.description,
         hyperlink: data.hyperlink || null,
         user_id: request.user.id,
         created_at: now,
         updated_at: now,
      };

      try {
         await DB.table("portfolios").insert(portfolio);
         return jsonCreated(response, "Portfolio berhasil dibuat", { portfolio });
      } catch (error: unknown) {
         Logger.error('Failed to create portfolio', error as Error);
         return jsonServerError(response, "Gagal membuat portfolio");
      }
   }

   /**
    * Update an existing portfolio item
    */
   public async updatePortfolio(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const id = this.getRequiredParam(request, 'id');
      const data = await this.getBody(request, UpdatePortfolioSchema);

      const payload: Record<string, unknown> = {};

      if (data.image_url !== undefined) payload.image_url = data.image_url;
      if (data.description !== undefined) payload.description = data.description;
      if (data.hyperlink !== undefined) payload.hyperlink = data.hyperlink;

      payload.updated_at = dayjs().valueOf();

      try {
         await DB.from("portfolios").where("id", id).update(payload);
         const portfolio = await DB.from("portfolios").where("id", id).first();
         return jsonSuccess(response, "Portfolio berhasil diupdate", { portfolio });
      } catch (error: unknown) {
         Logger.error('Failed to update portfolio', error as Error);
         return jsonServerError(response, "Gagal mengupdate portfolio");
      }
   }

   /**
    * Delete one or more portfolio items
    */
   public async deletePortfolios(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, DeletePortfoliosSchema);
      
      const deleted = await DB.from("portfolios")
         .whereIn("id", data.ids)
         .delete();
      
      Logger.warn('Portfolios deleted by admin', {
         adminId: request.user.id,
         deletedIds: data.ids,
         count: deleted,
         ip: request.ip
      });
      
      return jsonSuccess(response, "Portfolio berhasil dihapus", { deleted });
   }
}

export default new PortfolioController();
