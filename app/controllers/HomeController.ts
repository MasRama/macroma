import type { NaraRequest, NaraResponse } from "@core";
import { BaseController } from "@core";
import DB from "@services/DB";

class HomeController extends BaseController {
    
    public async index(request: NaraRequest, response: NaraResponse) { 
        let user: any = {};

        if (request.cookies.auth_id) {
            const session = await DB.from("sessions").where("id", request.cookies.auth_id).first();

            if (session) {
                user = await DB.from("users")
                    .where("id", session.user_id)
                    .select(["id","name","email","phone","avatar","is_admin","is_verified"])
                    .first();
            }
        }

        const carousels = await DB.from("carousel_images")
            .where("is_active", true)
            .orderBy('order', 'asc')
            .orderBy('created_at', 'desc')
            .select("*");

        const portfolios = await DB.from("portfolios")
            .orderBy('created_at', 'desc')
            .select("*");

        const products = await DB.from("products")
            .where("is_featured", true)
            .orderBy('created_at', 'desc')
            .select("*");

        return response.inertia("landing", { user, carousels, portfolios, products });
    }

    public async about(request: NaraRequest, response: NaraResponse) {
        let user: any = {};

        if (request.cookies.auth_id) {
            const session = await DB.from("sessions").where("id", request.cookies.auth_id).first();

            if (session) {
                user = await DB.from("users")
                    .where("id", session.user_id)
                    .select(["id","name","email","phone","avatar","is_admin","is_verified"])
                    .first();
            }
        }

        return response.inertia("about", { user });
    }
}

export default new HomeController()
