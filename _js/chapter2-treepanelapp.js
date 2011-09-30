Ext.onReady(function() {
	var viewport = new Ext.Viewport({
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [{
			html : '<h1>Logo</h1>'
		}, {
			xtype : 'panel',
			layout : 'border',
			flex : 1,
			items : [{
				title : 'Navigation',
				region : 'west',
				collapsible : true,
				width : 200
			}, {
				region : 'center',
				xtype : 'container',
				layout : 'border',
				items : [{
					region : 'center',
					title : 'Master',
					tbar : [{
						xtype : 'combo',
						triggerAction : 'all',
						store : new Ext.data.ArrayStore({
							id : 0,
							fields : ['regionId', 'name'],
							data : [['region-bottom', 'Bottom'], ['region-right', 'Rigth'], ['hide', 'Hide']]
						}),
						valueField: 'regionId',
						displayField: 'name',
						mode: 'local',
						editable : false,
						forceSelection : true,
						value : 'region-bottom',
						listeners : {
							'select' : function(ct, record, index) {
								var newRegion = null, oldRegion = null, detailsPanel = Ext.getCmp('details-panel');
								//check if details panel is added to a region
								if (oldRegion = detailsPanel.ownerCt) {
									oldRegion.removeAll(false);
									oldRegion.doLayout();
								}
								if (record.data.regionId !== 'hide') {
									newRegion = Ext.getCmp(record.data.regionId);
									newRegion.add(detailsPanel);
									newRegion.doLayout();
								}
							}
						}
					}]
				}, {
					region : 'south',
					id: 'region-bottom',
					xtype : 'container',
					height : 100,
					items : [{
						id : 'details-panel',
						title : 'Details',
						html : 'some details',
						layout: 'fit',
						listeners: {
							'removed' : function(cp, ownerCt){
								cp.hide();
							},
							'added' : function(cp, ownerCt, index) {
								cp.show();
							}
							
						}
					}]
				}, {
					region : 'east',
					xtype : 'container',
					id: 'region-right',
					width: 100
				}]
			}]
		}]
	});
});
//end onReady