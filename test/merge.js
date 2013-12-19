describe('merge.js', function() {
	var merge = require('../index')

	describe('When two objects are different', function() {
		it('should return an object with all properties', function() {
			expect(merge({ a: 1, b: 2 }, { c: 3, d: 4 }))
				.to.deep.equal({ a: 1, b: 2, c: 3, d: 4 })
		})
		it('should not modify the original object', function() {
			var a = { a: 1, b: 2 }
			  , b = merge(a, { c: 3, d: 4 })
			expect(a).to.not.equal(b)
			expect(a).to.deep.equal({ a: 1, b: 2 })
		})
	})

	describe('When two objects share keys', function() {
		it('should keep the values from the last object', function() {
			expect(merge({ a: 1, b: 2 }, { b: 3, c: 4 }))
				.to.deep.equal({ a: 1, b: 3, c: 4 })
		})
	})

	describe('When merging multiple objects', function() {
		it('should merge all', function() {
			expect(merge({ a: 1 }, { b: 2 }, { c: 3 }))
				.to.deep.equal({ a: 1, b: 2, c: 3 })
		})
	})

	describe('When merging nested objects', function() {
		it('should merge objects and simple values', function() {
			var a = { a: { b: 1, c: 2 }, d: 3 }
			  , b = { a: { b: 3, d: 4 }, d: 4, e: 5 }
			  , c = { a: { b: 3, c: 2, d: 4 }, d: 4, e: 5 }
			expect(merge(a, b))
				.to.deep.equal(c)
		})
		it('should replace arrays', function() {
			var a = { a: [ 1, 2 ] }
			  , b = { a: [ 3 ] }
			  , c = { a: [ 3 ] }
			expect(merge(a, b))
				.to.deep.equal(c)
		})
	})
})
