exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invoiceitems', function(table) {
      table.increments();
      table.timestamps(true,true);

      table.integer('invoice_id').references('id').inTable('invoices').notNullable();
      table.integer('ticket_id').references('id').inTable('showtickets').nullable();
      table.integer('product_id').references('id').inTable('productskus').nullable();

      table.string('uniqueid', 50).unique().notNullable()
        .comment('guid');

      table.string('purchasename', 512).notNullable().defaultsTo('')
        .comment('tickets only - record the name for pickup');
      table.string('pickupname', 512).notNullable().defaultsTo('')
        .comment('tickets only - record the name for pickup - allow purchasers to set the pickup name');
      table.timestamp('dtshowdate');

      table.string('name', 512).notNullable();
      table.string('ages').defaultsTo('');
      table.json('attribs').notNullable().defaultsTo(JSON.stringify([]))
        .comment('Record attribs of purchased item');
      table.string('description', 8192).notNullable().defaultsTo('')
        .comment('Record description at time of purchase');

      table.decimal('price').defaultsTo(0);
      table.integer('quantity').defaultsTo(1);
      table.decimal('lineitemtotal').defaultsTo(0);

      table.string('status').notNullable().defaultsTo('inprocess')
        .comment('3 states - inprocess, complete, completedthenremoved');

      table.string('shipmethod').notNullable().defaultsTo('willcall')
        .comment('Record the shipping method');
      table.timestamp('dtshipped');//.commment('Record the date shipped or picked up or received');
      table.string('shipnotes', 8192).notNullable().defaultsTo('')
        .comment('Notes regarding shipping');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invoiceitems')
  ])
};
