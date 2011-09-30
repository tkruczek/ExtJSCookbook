Ext.onReady(function(){
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [{
			region: 'center',
			title: 'Center content',
			html: 'Some center content'
		}, {
				title: 'North panel',
				html: 'some content',
				region: 'north',
				height: 150,
				minSize: 75,
				maxSize: 250,
				cmargins: '0 0 5 0'
			}, {
				region: 'east',
				title: 'east region',
				html: 'some content for east',
				collapsible: true,
				split: true,
				collapseMode: 'mini',
				margins: '0 0 0 5',
				cmargins: '0 0 0 5',
				width: 175,
				minSize: 100,
				maxSize: 250
			}, {
				region: 'south',
				title: 'South panel',
				html: 'Some content for south panel'
			} , {
				region: 'west',
				title: 'West region',
				html: 'Some content for west region',
				layout: 'border',
				margins: '0 5 0 0',
				bodyStyle: 'border: 0px',
				items: [
				{
					region: 'north',
					html: 'Some content north',
					height: 100,
					margins: '0 0 5 0'
					
				}, {
					region: 'center',
					html: 'Some content in center'
				}]
			}
		]
	});
	console.assertNotNull(viewport, 'Viewport is null');
});
