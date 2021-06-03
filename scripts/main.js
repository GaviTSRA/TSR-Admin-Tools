const ui = require("ui-lib/library");
var dialog = null, button = null, code = "", block="";
let playerName = Core.settings.getString("name");

ui.onLoad(() => {
	dialog = new BaseDialog("TSR Admin Tools (TAT)");
	const table = dialog.cont; 
	
	//Hub button
	table.label(() => "Servers");
	table.row();
	const a = table.table().center().bottom().get();
	a.button("Hub", Icon.host, () => {
		Groups.player.each(p => { 
			if(p.name.includes(playerName)) { 
				Call.connect(p.con, "fifr4.quackhost.uk", 20131); 
			};
			dialog.hide();
		});
	}).width(200).height(75);
	a.button("Survival", Icon.modeSurvival, () => {
		Groups.player.each(p => { 
			if(p.name.includes(playerName)) { 
				Call.connect(p.con, "fifr4.quackhost.uk", 20912);
			};
			dialog.hide();
		});
	}).width(200).height(75);
	a.button("Sandbox", Icon.map, () => {
		Groups.player.each(p => { 
			if(p.name.includes(playerName)) { 
				Call.connect(p.con, "fifr4.quackhost.uk", 21716) ;
			};
			dialog.hide();
		});
	}).width(200).height(75);
	table.row();

	//Killing stuff ----------------------------------------
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
	
	//Destroy stuff ----------------------------------------
	table.label(() => "Destroying");
	table.row();
	const c = table.table().center().bottom().get();
	c.button("Destroy", Icon.pencil, () => {
		Call.sendChatMessage("/destroy " + block.text);
		dialog.hide();
	}).width(200).height(75);
	block = c.field("powerNode", t => {}).get();
	c.button("Destroy Logic", Icon.logic, () => {
		Call.sendChatMessage("/destroylogic " + code.text);
		dialog.hide();
	}).width(200).height(75);
	code = c.field("*", t => {}).get();
	c.button("Destroy Factories", Icon.units, () => {
		Call.sendChatMessage("/destroyfacs");
		dialog.hide();
	}).width(200).height(75);
	table.row();

	
	dialog.addCloseButton();
});

ui.addButton("tat", Icon.logic, () => {
	dialog.show();
}, b => {button = b.get()});
