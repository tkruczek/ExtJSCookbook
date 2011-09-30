/*
 BannerSlideshow.js
 CEC Warsaw Team
 */
Ext.namespace('CISCO.ux');
/**
 * @class CISCO.intranet.component.Hero
 * @extends Ext.Panel
 * @param {Ext.Element/String/Object} config The configuration options.
 */

CISCO.ux.BannerSlideshow = Ext.extend(Ext.Container, {
	MAX_ITEMS : 3,
	MAX_WIDTH : 546,
	MAX_HEIGHT: 250,
	displayDuration : 8000,    /*miliseconds*/
	autoPlay : true,
	frame : true,
	border : false,
	height : 250,
	layout : 'absolute',
	activeSlide: 0,
	initComponent : function() {
		CISCO.ux.BannerSlideshow.superclass.initComponent.call(this);
		this.slides = new Ext.Container({
			autoEl: {},
			width : this.MAX_WIDTH,
			height : this.MAX_HEIGHT,
			layout : 'absolute'
		});
		this.add(this.slides);
		//add controls
		this.controlsbar = {
			cls : 'x-bannerslideshowpanel-controlsbar',
			x : 15,
			y : 210,
			items : [{
				xtype : 'tbbutton',
				iconCls : this.autoPlay?'bannerslideshowpanel-pause':'bannerslideshowpanel-pause',
				toggleGroup : 'player',
				pressed : this.autoPlay,
				listeners : {
					'toggle' : this.playHandler.createDelegate(this)
				}
			}]
		};

		this.playTask = new Ext.util.DelayedTask(this.play, this);
		this.on('afterlayout', function() {
			if(this.autoPlay) {
				this.playTask.delay(this.displayDuration);
			}
		}, this, {
			single : true
		});
	},
	play : function() {
		this.controlsbar.items.get(((this.activeSlide + 1) % this.slides.items.getCount())).toggle();
		this.playTask.delay(this.displayDuration);
	},
	stop : function() {
		this.playTask.cancel();
		this.autoPlay = false;
	},
	navHandler : function(button, pressed, item) {
		//handle only for one button
		if(pressed) {
			if (this.activeSlide != item) {
				this.slides.getComponent(this.activeSlide).getEl().fadeOut();
				this.slides.getComponent(item).show();
				this.slides.getComponent(item).getEl().fadeIn();
				this.activeSlide = item;
			}
			this.playTask.delay(this.displayDuration);
		}
	},
	playHandler : function(button, pressed) {
		if(pressed) {
			this.playTask.delay(this.displayDuration);
			button.setIconClass('bannerslideshowpanel-pause');
		} else {
			this.playTask.cancel();
			button.setIconClass('bannerslideshowpanel-play');
		}
	},
	afterRender : function() {
		CISCO.ux.BannerSlideshow.superclass.afterRender.call(this);
		var body = this.el.down(".bd"), thumbs = this.el.down(".thumbs"), items = null;
		if(body) {
			items = body.select("> ul > li");
			if(items) {
				items.each(function(el, scope, index) {
					if(index < this.MAX_ITEMS) {
						var image = el.down('img.background-image');
						var slideBody = el.down('.bd');
						if(image) {
							this.slides.add({
								xtype: 'box',
								applyTo: slideBody,
								index : index,
								x: 0,
								y: 0,
								width : this.MAX_WIDTH,
								height : this.MAX_HEIGHT,
								style : "background:url(" + image.dom.src + ") no-repeat;",
								hidden: !!index
							});
							image.remove();
						}
					}
				}, this);
			}
			//body.remove();
		}
		//init thumbs
		if(thumbs) {
			items = thumbs.select(">ul>li>img");
			if(items) {
				items.each(function(el, scope, index) {
					if(index < this.MAX_ITEMS) {
						this.controlsbar.items.splice(index, 0, {
							cls : 'x-btn-icon',
							icon : el.dom.src,
							listeners : {
								'toggle' : {
									fn : this.navHandler.createDelegate(this, [index], true)
								}
							},
							toggleGroup : 'slide-selector',
							pressed : !index
						}, ' ');
						el.remove();
					}
				}, this);
			}
			this.controlsbar = new Ext.Toolbar(this.controlsbar);
			this.add(this.controlsbar);
			thumbs.remove();
		}

	}
});
Ext.reg('bannerslideshow', CISCO.ux.BannerSlideshow);