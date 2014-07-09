describe('merge.js', function() {
	var merge = require('../index')

	describe('When given a single null argument', function() {
		var result
		beforeEach(function() {
			result = merge(null)
		})
		it('should return a new object', function() {
			expect(result).to.deep.equal({})
		})
	})

	describe('When given a single object', function() {
		var original
		var copy
		beforeEach(function() {
			original =
				{ a:
				  { aa:
				    { aaa: [{},2,3]
				    }
				  , ab:
				    { aba: 1
				    }
				  }
				, b:
				  { ba:
				    { baa: 1
				    }
				  }
				}
			copy = merge(original)
		})
		it('should copy the first level', function() {
			expect(copy).not.to.equal(original)
		})
		it('should copy the second level', function() {
			expect(copy.a).not.to.equal(original.a)
		})
		it('should copy the third level', function() {
			expect(copy.a.aa).not.to.equal(original.a.aa)
		})
		it('should also copy arrays', function() {
			expect(copy.a.aa.aaa).not.to.equal(original.a.aa.aaa)
		})
		it('should deep-copy arrays', function() {
			expect(copy.a.aa.aaa[0]).not.to.equal(original.a.aa.aaa[0])
		})
	})

	describe('When given null before a single object', function() {
		it('should not throw', function() {
			expect(function() {
				merge(null, { a: { } })
			}).to.not.throw()
		})
	})

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
		it('should replace arrays with a copy', function() {
			var a = { a: [ 1, 2 ] }
			var b = { a: [ 3 ] }
			var c = { a: [ 3 ] }
			expect(merge(a, b))
				.to.deep.equal(c)
			expect(merge(a, b).a)
				.to.not.equal(a.a)
				.and.not.equal(b.a)
		})
	})
})
