exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invoicetransactions', function(table) {
      table.increments();
      table.timestamps(true,true);
      table.integer('invoice_id').references('id').inTable('invoices').notNullable();

      table.string('transactiontype').notNullable().defaultsTo('purchase').comment('purchase or refund');
      table.string('performedby').notNullable().defaultsTo('user').comment('indicates user or admin in the case of a refund');
      table.integer('user_id').references('id').inTable('users').notNullable().comment('note that this is the id of the performer not necessarily the user for whom the invoice has been created');

      table.string('processor').notNullable().comment('The name of the payment processor');
      table.string('batchid').notNullable().defaultsTo('').comment('To identify a batch');
      table.decimal('amount').notNullable().defaultsTo(0);
      table.string('ipaddress').notNullable().defaultsTo('');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invoicetransactions')
  ])
};
