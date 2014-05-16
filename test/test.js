var chai = require('chai');
var assert = chai.assert;

describe('Testing Mocha',function() {

	before(function(done) {
        // Create something before testing
        // then using done() to finish
        done();
    });

    it('should equal hello',function() {
        assert.equal( 'hello', 'hello' ); 
    });
    
});