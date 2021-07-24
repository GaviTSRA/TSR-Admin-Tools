const ui = require("ui-lib/library");
var dialog = null, button = null, code = "", block="", teamField="";
let playerName = Core.settings.getString("name");


function loadDialog() {
	dialog = new BaseDialog("TSR Admin Tools (TAT)");
	const table = dialog.cont; 

	//Server buttons
	if(Core.settings.get("show-servers", true)) {
		table.label(() => "Servers");
		table.row();
		const a = table.table().center().bottom().get();
		a.button("Hub", Icon.host, () => {
			Groups.player.each(p => { 
				if(p.name.includes(playerName)) { 
					Call.connect(p.con, "de15-3.falix.gg", 27422); 
				};
				dialog.hide();
			});
		}).width(200).height(75);
		a.button("Survival", Icon.modeSurvival, () => {
			Groups.player.each(p => { 
				if(p.name.includes(playerName)) { 
					Call.connect(p.con, "de15-3.falix.gg", 27787);
				};
				dialog.hide();
			});
		}).width(200).height(75);
		a.button("Sandbox", Icon.map, () => {
			Groups.player.each(p => { 
				if(p.name.includes(playerName)) { 
					Call.connect(p.con, "de15-3.falix.gg", 26185) ;
				};
				dialog.hide();
			});
		}).width(200).height(75);
		a.button("Attack", Icon.modeAttack, () => {
			Groups.player.each(p => { 
				if(p.name.includes(playerName)) { 
					Call.connect(p.con, "fifr4.quackhost.uk", 20560) ;
				};
				dialog.hide();
			});
		}).width(200).height(75);
		a.button("Anarchy", Icon.warning, () => {
			Groups.player.each(p => { 
				if(p.name.includes(playerName)) { 
					Call.connect(p.con, "de10.falix.gg", 26434) ;
				};
				dialog.hide();
			});
		}).width(200).height(75);
		table.row();
	}

	//Killing stuff ----------------------------------------
	if(Core.settings.get("show-killers", true)) {
		table.label(() => "Killing");
		table.row();
		const b = table.table().center().bottom().get();
		b.button("Self Kill", Icon.defense, () => {
			var js = "Groups.player.each(p => { if(p.name.includes(\"" + playerName + "\")) { p.unit().kill(); }});";
			Call.sendChatMessage("/js " + js);
			dialog.hide();
		}).width(200).height(75);
		b.button("Kill units", Icon.modeAttack, () => {
			Call.sendChatMessage("/killunits");
			dialog.hide();
		}).width(200).height(75);
		b.button("Kill all", Icon.modePvp, () => {
			Call.sendChatMessage("/killall");
			dialog.hide();
		}).width(200).height(75);
		table.row();
	}
	
	//Destroy stuff ----------------------------------------
	if(Core.settings.get("show-destroyers", true)) {
		table.label(() => "Destroying");
		table.row();
		const c = table.table().center().bottom().get();
		c.button("Destroy", Icon.pencil, () => {
			Call.sendChatMessage("/destroy " + block.text);
			dialog.hide();
		}).width(200).height(75);
		block = c.field("powerNode", t => {}).get();
		c.add("          ");
		c.button("Destroy Logic", Icon.logic, () => {
			Call.sendChatMessage("/destroylogic " + code.text);
			dialog.hide();
		}).width(200).height(75);
		code = c.field("*", t => {}).get();
		c.add("          ");
		c.button("Destroy Factories", Icon.units, () => {
			Call.sendChatMessage("/destroyfacs");
			dialog.hide();
		}).width(200).height(75);
		table.row();
	}


	//Player modification -------------------------------------------------
	if(Core.settings.get("show-player-modification", true)) {
		table.label(() => "Team");
		table.row();
		const d = table.table().center().bottom().get();
		teamField = d.field("1", n=>{}).get();
		d.button("Change Team", Icon.units, () => {
			Groups.player.each(p=>{if(p.name.includes(playerName)){
				Call.sendChatMessage("/team " + teamField.text);
			}});
			dialog.hide();
		}).width(200).height(75);
		d.add("     ");
	
		var healthField = d.field("1000", n=>{}).get();
		d.button("Set health", Icon.warning, () => {
			Call.sendChatMessage("/js Groups.player.each(p=>p.name.includes(\"" + playerName + "\"),p=>p.unit().health = " + healthField.text + ")")
		}).width(200).height(75);

		table.row()
	}

	
	dialog.addCloseButton();
	dialog.buttons.button("Reload settings", Icon.logic, () => {
		loadDialog(); 
	});
};

ui.onLoad(() => {
	Vars.ui.settings.game.checkPref("show-servers", Core.settings.getBool("show-servers", true));
	Vars.ui.settings.game.checkPref("show-killers", Core.settings.getBool("show-killers", true));
	Vars.ui.settings.game.checkPref("show-destroyers", Core.settings.getBool("show-destroyers", true));
	Vars.ui.settings.game.checkPref("show-player-mod", Core.settings.getBool("show-player-mod", true));
	loadDialog();
});

ui.addButton("tat", "logic", () => {
	playerName = Core.settings.getString("name");
	dialog.show();
}, b => {button = b.get()});
