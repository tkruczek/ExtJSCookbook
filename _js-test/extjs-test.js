var ExtJsTest = new TestCase('extend test', {
	'text Ext.extend adds superclass to prototype' : function() {
		var portal = Ext.extend('Ext.Panel', {
			test: 'testVal'
		});
		assertNotSame(portal.prototype, Ext.Panel);
	}
});
