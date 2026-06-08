import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('teams', (table) => {
        table.string('id').primary();
        
        // Team Member Information
        table.string('photo_url').nullable();
        table.string('name').notNullable();
        table.string('position').notNullable();
        table.text('jobdesk').notNullable();
        table.integer('order').defaultTo(0);
        
        // Ownership
        table.string('user_id').index();
        
        // Timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('teams');
}
