Events.on(ClientLoadEvent, (event) => {
    Log.info("MultiCrafterLib - Checking if the mod is installed");

    var mod = Vars.mods.getMod("multi-crafter");
    if (mod == null) {
        Log.info("MultiCrafterLib - not installed");

        Vars.ui.showMenu(
            Core.bundle.get("scripts.multicrafter.title"),
            Core.bundle.get("scripts.multicrafter.content"),
            [["[red]no"], ["[green]yes[white]"]],
            (option) => {
                if (option == 1) {
                    Log.info("MultiCrafterLib - Downloading and installing the mod");

                    Vars.ui.mods.githubImportMod("liplum/MultiCrafterLib", true);

                    var shown = false;

                    Timer.schedule(() => {
                        if (Vars.mods.requiresReload() && !shown) {
                            shown = true;
                            Vars.ui.showInfoOnHidden("@mods.reloadexit", () => {
                                Core.app.exit();
                            });
                        }
                    }, 2, 1);
                }
            }
        );
    } else {
        Log.info("MultiCrafterLib - already installed");
    }
});