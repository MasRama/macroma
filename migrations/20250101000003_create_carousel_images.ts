import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('carousel_images', function (table) {
        table.uuid('id').primary().notNullable()
        table.string('title', 255).notNullable()
        table.text('description').nullable()
        table.string('image_url', 500).notNullable()
        table.integer('order').defaultTo(0).notNullable()
        table.boolean('is_active').defaultTo(true).notNullable()
        table.bigInteger("created_at").notNullable()
        table.bigInteger("updated_at").notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('carousel_images')
}
