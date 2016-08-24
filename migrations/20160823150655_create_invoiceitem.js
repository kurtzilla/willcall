exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invoiceitems', function(table) {
      table.increments();
      table.timestamps(true,true);
      table.integer('invoice_id').references('id').inTable('invoices').notNullable();
      table.string('uniqueid', 50).unique().notNullable().comment('possible use case for a guid');

      table.integer('ticket_id').references('id').inTable('showtickets').nullable();
      table.integer('product_id').references('id').inTable('productinventories').nullable();

      table.string('purchasename', 512).notNullable().defaultsTo('').comment('tickets only - record the name for pickup');
      table.string('pickupname', 512).notNullable().defaultsTo('').comment('tickets only - record the name for pickup - allow purchasers to set the pickup name');
      table.timestamp('dtshowdate');
      table.string('ages').defaultsTo('');

      table.string('name', 512).notNullable();
      table.json('attribs').notNullable().defaultsTo(JSON.stringify([])).comment('Record attribs of purchased item');
      table.string('description', 8192).notNullable().defaultsTo('').comment('Record description at time of purchase');

      // tickets
      // table.string('name', 512);
      // table.string('ages').notNullable().defaultsTo('all ages');
      // table.string('criteria', 4096).notNullable().defaultsTo('');
      // table.string('description', 8192).notNullable().defaultsTo('');

      // products
      // table.string('name', 512).notNullable().defaultsTo('');
      // table.string('description', 8192).notNullable().defaultsTo('');
      // inventory
      // table.string('name', 512).notNullable().defaultsTo('');
      // table.json('attribs').notNullable().defaultsTo(JSON.stringify([])).comment('size, color, etc');

      table.decimal('price').defaultsTo(0);
      table.integer('quantity').defaultsTo(1);
      table.decimal('lineitemtotal').defaultsTo(0);

      table.string('status').notNullable().defaultsTo('inprocess').comment('3 states - inprocess, complete, completedthenremoved');
      table.string('notes', 8192).notNullable().defaultsTo('').comment('Allow admin to add notes to a particular item');

      table.timestamp('dtshipped');//.commment('Record the date shipped or picked up or received');
      table.string('shipnotes', 8192).notNullable().defaultsTo('').comment('Notes regarding shipping');
      table.string('shipmethod').notNullable().defaultsTo('willcall').comment('Record the shipping method');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invoiceitems')
  ])
};
