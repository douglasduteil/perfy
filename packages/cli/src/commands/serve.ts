//

import { CommandModule } from "yargs";

export class ServeCommand implements CommandModule {

  public command = "serve";
  public describe = "Launch a server to browse perfy results";
  public handler() {
    console.log("serve stuff dude ;)");
  }
}
