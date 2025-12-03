import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('portfolios', (table) => {
        table.string('id').primary();
        
        // Portfolio Information
        table.string('image_url').notNullable();
        table.text('description').notNullable();
        table.string('hyperlink').nullable();
        
        // Ownership
        table.string('user_id').index();
        
        // Timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('portfolios');
}
