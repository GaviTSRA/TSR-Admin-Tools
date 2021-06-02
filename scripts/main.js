const ui = require("ui-lib/library");

const pos = new Vec2(-1, -1);

var dialog = null, button = null;
//var spawning = UnitTypes.dagger, count = 1;
//var team = Vars.state.rules.waveTeam;
//var rand = 2;
let playerName = Core.settings.getString("name");

/*
function spawn() {
	const unitcode = "UnitTypes." + spawning.name;
	const teamcode = "Team." + team.name;

	const code = [
		(count ? "for(var n=0;n<" + count + ";n++){" : ""),
			"Tmp.v1.rnd(" + Mathf.random(rand * Vars.tilesize) + ");",
			"var u=" + unitcode + ".create(" + teamcode + ");",
			"u.set(" + pos.x + "+Tmp.v1.x," + pos.y + "+Tmp.v1.y);",
			"u.add()",
		(count ? "}" : "")
	].join("");

	Call.sendChatMessage("/js " + code);
} */

function kill() {
	var js = "Groups.player.each(p => { if(p.name.includes(\"" + playerName + "\")) { p.unit().kill(); }});";
	Call.sendChatMessage("/js " + js);
}

ui.onLoad(() => {
	dialog = new BaseDialog("TSR Admin Tools (TAT)");
	const table = dialog.cont; 

	/* Unit selection 
	table.pane(list => {
		const units = Vars.content.units();
		units.sort();
		var i = 0;
		units.each(unit => {
			// Block "unit" for payloads
			if (unit.isHidden()) return;

			if (i++ % 4 == 0) {
				list.row();
			}

			const icon = new TextureRegionDrawable(unit.icon(Cicon.full));
			list.button(icon, () => {
				spawning = unit;
				button.style.imageUp = icon;
			}).size(128);
		});
	}).top().center();
	table.row(); */

	/* Random selection 
	const r = table.table().center().bottom().get();
	var rSlider, rField;
	r.defaults().left();
	rSlider = r.slider(0, 2, 0.125, rand, n => {
		rand = n;
		rField.text = n;
	}).get();
	r.add("Randomness: ");
	rField = r.field("" + rand, text => {
		rand = parseInt(text);
		rSlider.value = rand;
	}).get();
	rField.validator = text => !isNaN(parseInt(text));
	table.row(); */
    
	/* Count selection 
	const t = table.table().center().bottom().get();
	var cSlider, cField;
	t.defaults().left();
	cSlider = t.slider(1, 5, count, n => {
		count = n;
		cField.text = n;
	}).get();
	t.add("Count: ");
	cField = t.field("" + count, text => {
		count = parseInt(text);
		cSlider.value = count;
	}).get();
	cField.validator = text => !isNaN(parseInt(text));

	table.row();
	var posb;
	posb = table.button("Set Position", () => {
		dialog.hide();
		ui.click((screen, world) => {
			// We don't need sub-wu precision + make /js output nicer
			pos.set(Math.round(world.x), Math.round(world.y));
			posb.getLabel().text = "Spawn at " + Math.round(pos.x / 8)
				+ ", " + Math.round(pos.y / 8);
			dialog.show();
		}, true);
	}).width(200).get(); 
	table.row(); */

	/* Buttons */
	
	/*dialog.buttons.button("$unit-factory.spawn", Icon.modeAttack, spawn)
		.disabled(() => !Vars.world.passable(pos.x / 8, pos.y / 8));

	const teamRect = extend(TextureRegionDrawable, Tex.whiteui, {});
	teamRect.tint.set(team.color);
	dialog.buttons.button("$unit-factory.set-team", teamRect, 40, () => {
		ui.select("$unit-factory.set-team", Team.baseTeams, t => {
			team = t;
			teamRect.tint.set(team.color);
		}, (i, t) => "[#" + t.color + "]" + t);
	});*/
	dialog.addCloseButton();
	const a = table.table().center().bottom().get();
	a.defaults().left();
	a.button("Hub", Icon.host, () => {
		Groups.player.each(p => { if(p.name.includes(playerName)) { Call.connect(p.con, "fifr4.quackhost.uk", 20131) };
		});
	}).width(200).height(75);
	
	table.row();

	const b = table.table().center().bottom().get();
	b.button("Self Kill", Icon.defense, kill).width(128);
	b.button("Kill units", Icon.modeAttack, () => {
		Call.sendChatMessage("/killunits");
	}).width(200).height(75);
	b.button("Kill all", Icon.modePvp, () => {
		Call.sendChatMessage("/killall");
	}).width(200).height(75);

	table.row();

	const c = table.table().center().bottom().get();
	b.button("Destroy Logic", Icon.logic, () => {
		Call.sendChatMessage("/destroylogic *");
	}).width(200).height(75);
	b.button("Destroy Factories", Icon.logic, () => {
		Call.sendChatMessage("/destroyfacs");
	}).width(200).height(75);
});

ui.addButton("tat", Icon.logic, () => {
	dialog.show();
}, b => {button = b.get()});
