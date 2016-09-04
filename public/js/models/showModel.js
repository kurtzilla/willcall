angular.module('MyApp').factory('Show', ['$http', 'moment', function($http, moment){
  
  function Show(row, dateModels = null){
    this.id = row.id;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at;
    this.member_id = row.member_id;
    this.venue = row.venue;
    this.url = row.url;
    this.name = row.name;
    this.description = row.description;
    this.images = row.images;
    this.active = row.active;
    this.announcedate = row.announcedate;
    this.enddate = row.enddate;
    this.showdates = [];
    
    if(dateModels && dateModels.length > 0){
      this.showdates = dateModels.map(function(e){
        e.parentShow(row);
        return e;
      });
    }
  };
  
  Show.prototype = {
    firstDate: function(){
      return moment(this.showDates.map(e => e)
        .sort((a,b) => a.dateofshow - b.dateofshow)[0].dateofshow)
        .format('YYYY/MM/DD hh:mm a');
    },
    lastDate: function(){
      return moment(this.showDates.map(e => e).reverse()
        .sort((a,b) => a.dateofshow - b.dateofshow)[0].dateofshow)
        .format('YYYY/MM/DD hh:mm a');
    },
    dateRange: function(){
      // console.log('DATERANGE', this.firstDate())
      if(this.firstDate() === this.lastDate()){
        return this.firstDate();
      }
      return this.firstDate() + ' - ' + this.lastDate();
    },
    showtickets: function(){
      return this.showdates.reduce(function(prev,cur,idx){
        return prev = prev.concat(cur.showtickets);
      },[]);
    }
    
  };
  
  ////////////////////////////////////////////
  // STATIC methods
  ////////////////////////////////////////////
  
  Show.processForm = function(form, input, current){
    console.log('F I C', form, input, current)
  };
  
  Show.buildShowCollection = function(showRows, dateModels) {
    // console.log('building...', dateRows)
    return showRows.map(function (show) {
      var matches = dateModels.filter(e => e.show_id === show.id);
      if (matches.length > 1) {
        matches.sort((a, b) => a.dateofshow - b.dateofshow);
      }
      // console.log('MATCHES', matches)
      return new Show(show, matches);
    });
  };
  
  return Show;
}]);
