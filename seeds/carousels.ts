import { Knex } from "knex";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export async function seed(knex: Knex): Promise<void> {
    await knex("carousel_images").del();

    const now = dayjs().valueOf();

    await knex("carousel_images").insert([
        {
            id: randomUUID(),
            title: "Solusi Digital Enterprise",
            description: "Platform terintegrasi untuk mengelola seluruh aspek bisnis Anda dengan efisien dan modern",
            image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            order: 0,
            is_active: true,
            created_at: now,
            updated_at: now,
        },
        {
            id: randomUUID(),
            title: "Teknologi Terdepan",
            description: "Menggunakan teknologi terkini untuk memberikan performa dan keamanan terbaik",
            image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
            order: 1,
            is_active: true,
            created_at: now,
            updated_at: now,
        },
        {
            id: randomUUID(),
            title: "Tim Profesional",
            description: "Didukung oleh tim ahli yang berpengalaman dalam pengembangan sistem enterprise",
            image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
            order: 2,
            is_active: true,
            created_at: now,
            updated_at: now,
        },
    ]);
}
