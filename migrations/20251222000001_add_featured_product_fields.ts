import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('products', (table) => {
        table.string('name').notNullable().defaultTo('');
        table.string('tagline').notNullable().defaultTo('');
        table.string('badge').notNullable().defaultTo('');
        table.boolean('is_featured').notNullable().defaultTo(false);
        table.renameColumn('description', 'desc');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('products', (table) => {
        table.dropColumn('name');
        table.dropColumn('tagline');
        table.dropColumn('badge');
        table.dropColumn('is_featured');
        table.renameColumn('desc', 'description');
    });
}
