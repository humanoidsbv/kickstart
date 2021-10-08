import readline, { Key } from "readline";
import { ChildProcess, spawn } from "child_process";

const package_ = require(`${process.cwd()}/package.json`);

interface Script {
  command: string;
  name: string;
}

export class Kickstart {
  script: ChildProcess | undefined;

  scripts: Script[];

  constructor() {
    Kickstart.checkInteractiveTerminal();

    readline.emitKeypressEvents(process.stdin);
    readline.createInterface({
      input: process.stdin,
      output: undefined,
    });

    process.stdin.on("keypress", this.handleKeypress.bind(this));

    this.scripts = Kickstart.loadScripts();

    console.clear();

    this.printScripts();
  }

  static checkInteractiveTerminal() {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    } else {
      console.error("Kickstart requires an interactive terminal!");
      process.exit();
    }
  }

  handleKeypress(input: string, key: Key) {
    if (key.sequence === "\u0003" && !this.script) {
      process.exit();
    } else if (key.sequence === "\u0003" && this.script) {
      this.script.kill();
      process.exit();
    }

    if (/\D/.test(input) || Number(input) > this.scripts.length || Number(input) < 1) {
      return;
    }

    console.log(`OK! I'll start "${this.scripts[Number(input) - 1].name}" for you!`);

    this.script = spawn(this.scripts[Number(input) - 1].command, [], {
      cwd: process.cwd(),
      detached: true,
      shell: true,
      stdio: "inherit",
    });
  }

  static loadScripts() {
    const scripts = Object.keys(package_.scripts)
      .reduce(
        (previousValue: Script[], currentValue) => [
          ...previousValue,
          {
            name: currentValue,
            command: package_.scripts[currentValue],
          },
        ],
        [],
      )
      .filter(({ command }) => !command.startsWith("kickstart"));

    if (!scripts.length) {
      console.error("\x1b[91mThere are no scripts in the package.json.\x1b[1m");
      process.exit();
    }

    return scripts;
  }

  printScripts() {
    console.log(
      `What script would you like me to start?\n\n` +
        `${this.scripts
          .map(
            (script, i) =>
              `\x1b[32m[${String(i + 1).padStart(
                this.scripts.length >= 10 ? 2 : 1,
              )}]  \x1b[1m${script.name.padEnd(15)}\x1b[0m  ${script.command}\n`,
          )
          .join("")}`,
    );
  }
}
