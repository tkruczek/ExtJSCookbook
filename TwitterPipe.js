// JavaScript Document
Ext.namespace('CISCO.ux');
/**
 * @class CISCO.ux.TwitterPipe TwitterPipe is a panel that contains twits loaded via a yahoo pipe.
 * @namespace CISCO.ux
 * @extends Ext.Panel
 * @author Tomasz Kruczek tkruczek@cisco.com
 * @version 1.0
 */
CISCO.ux.TwitterPipe = Ext.extend(Ext.Panel, {
	/**
	 * 
	 * @param {Object} Format of data used by tpl template
	 * @hide
	 */
	data : {
		title:'',
		description: '',
		link: '',
		pudDate: '',
		guid: ''
	},
	/**
	 * This template is used to display twitts
	 * @property
	 * @type Ext.Template
	 * @hide
	 */
	tpl: new Ext.Template([
		'<p class="tp-desc">{description}</p>',
		'<p class="tp-date">- {date}</p>'
	]),
	/**
	 * This is the url to Yahoo pipes service
	 * @property
	 * @type String
	 * @hide
	 */
	pipeUrl: 'http://pipes.yahoo.com/pipes/pipe.run',
	/**
	 * @cfg {String} pipeId An id of the Yahoo pipe
	 */
	pipeId: '',
	/**
	 * @cfg {Number} limit Number of tweets to show
	 */
	limit: 3,
	//private
	initComponent: function() {
		CISCO.ux.TwitterPipe.superclass.initComponent.call(this);
		if (typeof this.tpl === 'string') {
			this.tpl = new Ext.XTemplate(this.tpl);
		}
	},
	/**
	 * @method
	 * @param {String} sText Plain text value containing urls
	 * @return {String} html string with active links.
	 * @private
	 */
	linkifyFeed : function(sText) {
		return sText.replace(/(http:\/\/\S*)/gm, "<a href='$1' class='autoIconOFFSITE'>$1</a>");
	},
	//private
	onRender: function(ct, position) {
		CISCO.ux.TwitterPipe.superclass.onRender.call(this, ct, position);
		this.reader =  new Ext.data.JsonReader({
				totalProperty: 'count',
				root: 'value.items'
			},
				[
					"link",
					"description",
					"title",
					{
						name: "pubDate",
						type: 'date'
					}
				]
			);
		this.proxy = new Ext.data.ScriptTagProxy({
			callbackParam: '_callback',
			url: this.pipeUrl
			});
			this.proxy.load({
					'_id': this.pipeId,
					'_render': 'json'
				},
				this.reader,
				function (data, arg, success) {
					if (success) {
						var limit = (this.limit < data.totalRecords)?this.limit:data.totalRecords;
						for (var i = 0; i < limit; i++) {
							var pattern = /http:\/\/\S*/gim;
							this.tpl.append(this.body, {
								description: this.linkifyFeed(data.records[i].data.description),
								date: data.records[i].data.pubDate.format('j/n/Y')
							});
						}
					}
				},
				this
			);
	},
});