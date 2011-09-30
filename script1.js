var dataSet = {
	files: [{
		name: 'beatles.jpg',
		path:'/images/',
		size:46.5,
		lastmod:'2001-12-21 00:00:00'
	},{
		name: 'led_zeppelin.jpg',
		path:'/images/',
		size:43.2,
		lastmod:
		'2001-12-21 00:00:00'
	},{
		name: 'the_doors.jpg',
		path: '/images/',
		size:24.6,
		lastmod:'2001-12-21 00:00:00'
	},{
		name: 'jimi_hendrix.jpg',
		path: '/images/',
		size:64.3,
		lastmod:
		'2001-12-21 00:00:00'
	}]
};
var newSt = new Ext.data.JsonStore({
	data: dataSet,
	root: 'files',
	idProperty: 'name',
	fields:[
	'name',{
		name:'FilePath',
		mapping:'path'
	},{
		name:'FileSize',
		mapping:'size',
		type:'float'
	},{
		name:'LastModified',
		mapping:'lastmod',
		type:'date'
	}
	],
	listeners: {
		load: {
			fn: function(store,records,options) {
				console.info(records);
			},
			scope:this
		}
	}
});

console.time('loop');
var j=0;
for (var i=1; i < 10000000; i++) {
	Ext.get('#test');
}
console.timeEnd('loop');
console.assert(1 == 2);
