angular.module('MyApp').factory('Product',
  ['$http', '$q', 'moment', function($http, $q, moment){
  
  function Product(row, skuModels = null){
    this.id = row.id;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at;
    this.member_id = row.member_id;
  
    this.division = row.division;
    this.category = row.category;
    this.name = row.name;
    this.description = row.description;
    this.images = row.images;
    this.deliveryoptions = row.deliveryoptions;
    this.active = row.active;
    this.status = row.status;
    this.skus = [];
    
    if(skuModels && skuModels.length > 0){
      this.skus = skuModels.map(function(e){
        e.parentShow(row);
        return e;
      });
    }
  };
  
  // Product.prototype = {
  //   firstDate: function(){
  //     return moment(this.showDates.map(e => e)
  //       .sort((a,b) => a.dateofshow - b.dateofshow)[0].dateofshow)
  //       .format('YYYY/MM/DD hh:mm a');
  //   },
  //
  // };
  
  ////////////////////////////////////////////
  // STATIC methods
  ////////////////////////////////////////////
  
  Product.processForm = function(form, input, currentProduct){
  
    var deferred = $q.defer();
  
    console.log('FORM', form)
    console.log('INPUT', input)
    console.log('CURRENT', currentProduct)
      
    var errors = [];
    
    $http.post('/api/products', {
      input: input,
      current: currentProduct
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
    
  
  // Convert to Show Objects
  Product.buildProductCollection = function(productRows, skuModels) {
    // console.log('building...', dateRows)
    return productRows.map(function (product) {
      var matches = skuModels.filter(e => e.show_id === product.id);
      if (matches.length > 1) {
        matches.sort((a, b) => a.id - b.id);
      }
      return new Product(product, matches);
    });
  };
  
  return Product;
}]);
