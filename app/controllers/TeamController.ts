/**
 * TeamController
 *
 * Handles CRUD operations for team members.
 * - teamsPage: List all team members with pagination
 * - createTeam: Create a new team member
 * - updateTeam: Update an existing team member
 * - deleteTeams: Delete one or more team members
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
   CreateTeamSchema,
   UpdateTeamSchema,
   DeleteTeamsSchema,
} from "@validators";

class TeamController extends BaseController {
   /**
    * List all team members with pagination
    */
   public async teamsPage(request: NaraRequest, response: NaraResponse) {
      const { page, limit } = parsePaginationQuery(request.query);
      const search = request.query.search as string || "";

      let query = DB.from("teams").select("*");

      if (search) {
         query = query.where(function() {
            this.where('name', 'like', `%${search}%`)
                .orWhere('position', 'like', `%${search}%`)
                .orWhere('jobdesk', 'like', `%${search}%`);
         });
      }

      const result = await paginate(query.orderBy('order', 'asc').orderBy('created_at', 'desc'), { page, limit });

      return response.inertia("teams", {
         teams: result.data,
         ...result.meta,
         search,
      });
   }

   /**
    * Create a new team member
    */
   public async createTeam(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, CreateTeamSchema);

      const now = dayjs().valueOf();

      const team = {
         id: randomUUID(),
         photo_url: data.photo_url || null,
         name: data.name,
         position: data.position,
         jobdesk: data.jobdesk,
         order: data.order || 0,
         user_id: request.user.id,
         created_at: now,
         updated_at: now,
      };

      try {
         await DB.table("teams").insert(team);
         return jsonCreated(response, "Team member berhasil dibuat", { team });
      } catch (error: unknown) {
         Logger.error('Failed to create team member', error as Error);
         return jsonServerError(response, "Gagal membuat team member");
      }
   }

   /**
    * Update an existing team member
    */
   public async updateTeam(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const id = this.getRequiredParam(request, 'id');
      const data = await this.getBody(request, UpdateTeamSchema);

      const payload: Record<string, unknown> = {};

      if (data.photo_url !== undefined) payload.photo_url = data.photo_url;
      if (data.name !== undefined) payload.name = data.name;
      if (data.position !== undefined) payload.position = data.position;
      if (data.jobdesk !== undefined) payload.jobdesk = data.jobdesk;
      if (data.order !== undefined) payload.order = data.order;

      payload.updated_at = dayjs().valueOf();

      try {
         await DB.from("teams").where("id", id).update(payload);
         const team = await DB.from("teams").where("id", id).first();
         return jsonSuccess(response, "Team member berhasil diupdate", { team });
      } catch (error: unknown) {
         Logger.error('Failed to update team member', error as Error);
         return jsonServerError(response, "Gagal mengupdate team member");
      }
   }

   /**
    * Delete one or more team members
    */
   public async deleteTeams(request: NaraRequest, response: NaraResponse) {
      this.requireAdmin(request);
      const data = await this.getBody(request, DeleteTeamsSchema);
      
      const deleted = await DB.from("teams")
         .whereIn("id", data.ids)
         .delete();
      
      Logger.warn('Team members deleted by admin', {
         adminId: request.user.id,
         deletedIds: data.ids,
         count: deleted,
         ip: request.ip
      });
      
      return jsonSuccess(response, "Team member berhasil dihapus", { deleted });
   }
}

export default new TeamController();
