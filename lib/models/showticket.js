'use strict';

var Show = require('./show');
var ShowDate = require('./showdate');

class ShowTicket {
  
  constructor(row){
    this.id = row.id;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at;
    this.showdate_id = row.showdate_id;
    this.name = row.name;
    this.ages = row.ages;
    this.description = row.description;
    this.price = row.price;
    this.pricedetail = row.pricedetail;
    this.pricedos = row.pricedos;
    this.pricedosdetail = row.pricedosdetail;
    this.deliveryoptions = row.deliveryoptions;
    this.active = row.active;
    this.status = row.status;
    this.maxperorder = row.maxperorder;
    this.allotted = row.allotted;
    this.sold = row.sold;
    this.refunded = row.refunded;
    this.available = row.available;
  }
};

module.exports = ShowTicket;