import readline, { Key } from "readline";
import { ChildProcess, spawn } from "child_process";

import { colors, styles } from "./styles";

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
    process.stdout.on("resize", this.render.bind(this));

    this.scripts = Kickstart.loadScripts();

    console.clear();

    this.render();
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
      console.error(`${colors.red}There are no scripts in the package.json.${styles.reset}`);
      process.exit();
    }

    return scripts;
  }

  render() {
    const { rows } = process.stdout;

    console.log(
      `What script would you like me to start?\n\n` +
        `${this.scripts
          .map(
            (script, i) =>
              `${colors.green}[${String(i + 1).padStart(this.scripts.length >= 10 ? 2 : 1)}]  ${
                styles.bold
              }${script.name.padEnd(15)}${styles.reset}  ${script.command}\n`,
          )
          .join("")}` +
        `${"\n".repeat(rows - this.scripts.length - 4)}` +
        `${colors.gray}Powered by Humanoids - UX & development experts from the Netherlands${styles.reset}`,
    );
  }
}
