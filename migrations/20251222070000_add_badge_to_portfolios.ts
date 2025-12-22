import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('portfolios', (table) => {
        table.string('badge').notNullable().defaultTo('');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('portfolios', (table) => {
        table.dropColumn('badge');
    });
}
