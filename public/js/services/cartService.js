
angular.module('MyApp')
  .service('CartService', ['$http', '$q', '$stateParams', 'ContextService',
    'Show', 'ShowDate', 'ShowTicket', 'Product', 'ProductSku', 'moment',
    
    function($http, $q, $stateParams,
             ContextService, Show, ShowDate, ShowTicket, Product, ProductSku, moment){

      var _self = this;
      this.cartBasket = [];
  
      var cartItem = function(kind, qty, item, description){
        this.idx = kind + '_' + item.id;
        this.kind = kind;
        this.qty = qty;
        this.description = description;
        this.item = item;
        //its either productsku or show
        this.itemPrice = item.price;
        this.lineItemTotal = function(){
          return this.qty * this.itemPrice;
        }
    
        this.mainDesc = (this.description.length) ? this.description[0] : '';
        this.secondaryDesc = (this.description.length > 1) ? this.description.slice(1) : [];
      }
  
      
      // move to cart controller/service
      this.addShowTicketToCart = function(item){
        // console.log('ITEM', item)
        var description = [];
        description.push(item._parentShowDate._parentShow.name);
        description.push(item._parentShowDate._parentShow.venue);
        description.push(moment(item._parentShowDate.dateofshow).format('ddd YYYY/MM/DD hh:mm'));
        
        if(item.name && item.name.trim().length > 0){
          description.push(item.name);
        }
        description.push(item.ages);
        
        var cItem = new cartItem('ticket', 1, angular.copy(item), description);
        this.addItemToCart(cItem);
      };
      
      this.addProductToCart = function(item){
        // console.log('ITEM', item)
        var description = [];
        description.push(item._parentProduct.name);
        if(item.name && item.name.trim().length > 0){
          description.push(item.name);
        }
        
        var cItem = new cartItem('product', 1, angular.copy(item), description);
        this.addItemToCart(cItem);
      };
      
      this.addItemToCart = function(cartItem){
        //determine quantity
        var existing = this.cartBasket.filter(function(itm){
          return cartItem.kind === itm.kind && cartItem.item.id === itm.item.id;
        });
        // only allow one of each item type - up to max per order
        if(!existing.length){
          this.cartBasket.push(cartItem);
        }
      };
  
  
      this.updateQuantity = function(changedItem){
        var newQty = changedItem.qty;
  
        if(newQty === 0){
          //remove from array
          // console.log('BEFORE',this.cartBasket.length)
          this.cartBasket = this.cartBasket.filter(function(e){
            return e.idx !== changedItem.idx;
          })
          // console.log('AFTER',this.cartBasket.length)
        }
        var ttl = this.getCartTotal();
      };
      
      this.clearCart = function(){
        this.cartBasket = [];
      };
      
      this.getCartTotal = function(){
        return this.cartBasket.reduce(function(prev, cur){
          return prev += cur.lineItemTotal();
        },0);
      };
      
  }]);