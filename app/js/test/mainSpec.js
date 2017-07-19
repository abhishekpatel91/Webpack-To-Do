var jasmine = require('jasmine');

define('hi', function(require, factory) {
    it("should Return Hi",function(){ 
      expect(hi()).toEqual('Hi'); 
   });
    
});