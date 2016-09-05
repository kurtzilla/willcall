angular.module('MyApp')
.factory('ShowTicket', ['$http', function($http){
  
  function ShowTicket(row, parentShowDate = null){
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
  
  ShowTicket.prototype = {
    parentShowDate(row){
      this._parentShowDate = row;
    }
  };
  
  ////////////////////////////////////////////
  // STATIC methods
  ////////////////////////////////////////////
  
  // list to refresh and refreshmethod should point to show list
  ShowTicket.processForm = function(form, input, currentShowTicket, currentShowDate){
    
    var deferred = $q.defer();
    
    // console.log('FORM', form)
    // console.log('INPUT', input)
    // console.log('CURRENT DATE', currentShowDate)
    // console.log('CURRENT TICKET', currentShowTicket)
    
    var errors = [];
  
    input.showdate_id = (currentShowTicket) ?
      currentShowTicket.showdate_id : (currentShowDate) ? currentShowDate.id : -1;
    
    $http.post('/api/showtickets', {
      input: input,
      current: currentShowTicket
    })
    .then(function(data){
      var returnData = data.data;
      deferred.resolve(returnData);
    })
    .catch(function(err){
      //convert err to array and return
      // console.log('I CAUGHT it', err)
      errors.push(err.data);
      deferred.reject(errors);
    })
    
    
    return deferred.promise;
  };
  
  // Convert to ShowTicket Objects
  ShowTicket.buildShowTicketCollection = function(ticketRows) {
    // console.log('building...', dateRows)
    return ticketRows.map(function (ticket) {
      return new ShowTicket(ticket);
    });
  };
  
  return ShowTicket;
}]);


// http://stackoverflow.com/questions/26865967/how-do-i-create-a-custom-object-class-thats-available-to-my-methods-in-angular