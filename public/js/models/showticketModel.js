angular.module('MyApp')
.factory('ShowTicket', function(){
  
  function ShowTicket(row, parentShowDate){
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
    
    this._parentShowDate = parentShowDate;
  }
  // ShowTicket.prototype = {
  //
  // };
  
  // static methods
  // ShowTicket.someFunction = function(){}
  
  return ShowTicket;
});


// http://stackoverflow.com/questions/26865967/how-do-i-create-a-custom-object-class-thats-available-to-my-methods-in-angular