'use strict';

// var ShowDate = require('./showdate');
// var ShowTicket = require('./showticket');

class Show {
  
  constructor(row){
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
    this.showDates = [];
  };
  
  firstDate(){
    return this.showDates.map(e => e).sort((a,b) => a.dateofshow - b.dateofshow)[0];
  };
  lastDate(){
    return this.showDates.map(e => e).reverse().sort((a,b) => a.dateofshow - b.dateofshow)[0];
  };
  
  dateRange(){
    console.log('DATERANGE', firstDate())
    if(firstDate() === lastDate()){
      return firstDate();
    }
    return firstDate() + ' - ' + lastDate();
  };
  
  
  
  ////////////////////////////////////////////////
  // STATIC METHODS
  ////////////////////////////////////////////////
  static _Show_FromRowAndDateModels(row, showDateModels){
    var _show = new Show(row);
    _show.showDates = showDateModels;
    return _show;
  };
};

module.exports = Show;

