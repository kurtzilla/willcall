exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invoices', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.integer('member_id').references('id').inTable('members').nullable();

      table.string('uniqueid', 50).unique().notNullable();
      table.string('purchaseemail', 512).notNullable();
      table.timestamp('invoicedate').defaultsTo(knex.fn.now());
      table.json('itemlist').notNullable().defaultsTo(JSON.stringify([]))
        .comment('keeps a list of products - both tickets and merch - for quick access in reporting');

      // TODO research invoice states - Paid/NotPaid
      table.string('status').notNullable().defaultsTo('')
        .comment('2 states - inprocess and complete');
      table.decimal('balancedue').defaultsTo(0);
      table.decimal('totalpaid').defaultsTo(0);
      table.decimal('totalrefunds').defaultsTo(0);
      table.decimal('netpaid').defaultsTo(0);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invoices')
  ])
};
