Events.on(ClientLoadEvent, (event) => {
    var req = new Http.get(
        "https://raw.githubusercontent.com/0rang30rang3/implosion/main/mod.hjson",
        (res) => {
            var resp = res.getResultAsString();
            var json = Jval.read(resp);
            var vers = Vars.mods.getMod("implosion").meta.version;
            Log.info("found mod version:" + json.get("version"));

            if (!vers.equals(json.get("version"))) {
                try {
                    Vars.ui.showMenu(
                        "TEST",
                        "TEXT GOES HERE",
                        [
                            ["[red]Ok"],
                            ["[green]Update"]
                        ],
                        (option) => {
                            if (option == 1) {
                                Vars.ui.mods.githubImportMod(
                                    Vars.mods.locateMod("implosion").getRepo()
                                );

                                var shown = false;
                                Timer.schedule(
                                    () => {
                                        if (Vars.mods.requiresReload() && !shown) {
                                            shown = true;
                                            Vars.ui.showInfoOnHidden(
                                                "@mods.reloadexit",
                                                () => {
                                                    Core.app.exit();
                                                }
                                            );
                                        }
                                    },
                                    2,
                                    1
                                );
                            }
                        }
                    );
                } catch (err) {
                    Log.info("Error: " + err.toString());
                }
            }
        }
    );
});
