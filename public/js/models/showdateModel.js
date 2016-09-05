angular.module('MyApp').factory('ShowDate',
  ['$http', '$q', 'ShowTicket',
    function($http, $q, ShowTicket){
      
      function ShowDate(row, ticketRows = null){
        this.id = row.id;
        this.created_at = row.created_at;
        this.updated_at = row.updated_at;
        this.show_id = row.show_id;
        this.dateofshow = row.dateofshow;
        this.doorsopen = row.doorsopen;
        this.name = row.name;
        this.ages = row.ages;
        this.billing = row.billing;
        this.pricing = row.pricing;
        this.description = row.description;
        this.active = row.active;
        this.status = row.status;
        this.showtickets = [];
        
        if(ticketRows && ticketRows.length > 0){
          this.showtickets = ticketRows.map(e => new ShowTicket(e, row));
        };
  
        this._parentShow = null;
      };
      
      ShowDate.prototype = {
        parentShow(row){
          this._parentShow = row;
        }
      };
      
      ////////////////////////////////////////////
      // STATIC methods
      ////////////////////////////////////////////
  
      // list to refresh and refreshmethod should point to show list
      ShowDate.processForm = function(form, input, currentShowDate, currentShow){
    
        var deferred = $q.defer();
    
        // console.log('FORM', form)
        // console.log('INPUT', input)
        // console.log('CURRENT SHOW', currentShow)
        // console.log('CURRENT DATE', currentShowDate)
    
        var errors = [];
        
        input.show_id = (currentShowDate) ?
          currentShowDate.show_id : (currentShow) ? currentShow.id : -1;
    
        $http.post('/api/showdates', {
          input: input,
          current: currentShowDate
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
  
      // Convert to ShowDate Objects
      ShowDate.buildShowDateCollection = function(dateRows, ticketRows) {
        // console.log('building...', dateRows)
        return dateRows.map(function (date) {
          var matches = ticketRows.filter(e => e.showdate_id === date.id);
          if (matches.length > 1) {
            matches.sort((a, b) => a.price - b.price);
          }
          // console.log('MATCHES', matches)
          return new ShowDate(date, matches);
        });
      };
      
      return ShowDate;
}]);

