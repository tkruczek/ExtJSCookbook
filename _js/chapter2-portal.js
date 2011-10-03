//Creating a protal and portlets catalog
Ext.ns('Dashboard');
//Create the portlet class
Dashboard.Portlet = Ext.extend(Ext.Panel, {
	anchor: '100%',
	frame: true,
	collapsible: true,
	draggable: true,
	cls: 'x-portlet',
	height: 150,
	tools: [{
		id: 'gear',
		handler: function() {
			Ext.Msg.alert('Message', 'Settings button has been clicked')
		}
	}, {
		id: 'close',
		handler: function(e, target, panel) {
			panel.ownerCt.ownerCt.fireEvent('portletRemoved', panel);
			panel.ownerCt.remove(panel, true);
		}
	}]
});
Ext.reg('portlet', Dashboard.Portlet);

//Create the portal column class
Dashboard.PortalColumn = Ext.extend(Ext.Container, {
	layout: 'anchor',
	autoEl: 'div',
	defaultType: 'portlet',
	cls: 'x-potal-column' 
	
});
Ext.reg('portal', Dashboard.PortalColumn);

//Create the Portal class
Dashboard.Portal = function(config) {
	Dashboard.Portal.superclass.constructor.call(this, config);
};