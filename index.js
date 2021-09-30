#!/usr/bin/env node
'use strict';

const package_ = require(process.cwd() + '/package.json');
const readline = require('readline');
const { spawn } = require('child_process');

class Kickstart {
  script;
  scripts;

  constructor() {
    this.checkInteractiveTerminal();

    readline.emitKeypressEvents(process.stdin);
    readline.createInterface({
      input: process.stdin,
      output: null
    });

    process.stdin.on('keypress', this.handleKeypress.bind(this));

    this.scripts = this.loadScripts();

    console.clear();

    this.printScripts();
  }

  checkInteractiveTerminal() {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    } else {
      console.error('Kickstart requires an interactive terminal!');
      process.exit();
    }
  }

  handleKeypress(input, key) {
    if (key.sequence === '\u0003' && !this.script) {
      process.exit();
    } else if (key.sequence === '\u0003' && this.script) {
      this.script.kill();
      process.exit();
    }
  
    if (/\D/.test(input)) {
      return;
    } else if (Number(input) > this.scripts.length || Number(input) < 1) {
      return;
    }
  
    console.log(`OK! I'll start "${this.scripts[(input - 1)].name}" for you!`);
  
    this.script = spawn(this.scripts[(input - 1)].command, [], {
      cwd: process.cwd(),
      detached: true,
      shell: true,
      stdio: 'inherit'
    });
  }

  loadScripts() {
    const scripts = Object
      .keys(package_.scripts)
      .reduce((previousValue, currentValue) => ([
        ...previousValue,
        {
          name: currentValue,
          command: package_.scripts[currentValue]
        }
      ]), [])
      .filter(({ command }) => !command.startsWith('kickstart'));

    if (!scripts.length) {
      console.error('There are no scripts in the package.json.');
      process.exit();
    }

    return scripts;
  }

  printScripts() {
    console.log(
      `What script would you like me to start?\n\n` +
    
      `${this.scripts.map((script, i) => (
        `[${String(i + 1).padStart(this.scripts.length > 10 ? 2 : 1)}]  ${script.name.padEnd(15)} ${script.command}\n`
      )).join('')}`
    );
  }
}

new Kickstart();
