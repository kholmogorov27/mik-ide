const sizeOfMemory = 1000;
const memoryPlaceholder = '00';
const defaultPrompt = ' \n> ';

const tabContentTemplate = `
<div class="gridster main-container">
		<ul>
			<li data-row="1" data-col="1" data-sizex="2" data-sizey="2" descrition="Processor state">
				<div class="in-li-wrapper">
					<div class="regs-container">
						<fieldset>
							<legend><div>УУ</div></legend>
							<div class="reg-field">
								<div><div class="address pos regs-info">RA</div></div><div><input class="address regs-info RA" type="text" value="0"></div>
							</div>
							<div class="reg-field">
								<div><div class="address pos regs-info">RK</div></div><div><input class="address regs-info RK" type="text" value="${memoryPlaceholder}"></div>
							</div>
						</fieldset>
					</div>
					<div class="control-button reset-btn" style=" margin-right: 10px;border-radius: 100%; font-size:1.5em">0</div>
					<div class="regs-container">
						<fieldset>
							<legend><div>АЛУ</div></legend>
							<div class="reg-field">
								<div><div class="address pos regs-info">S</div></div><div><input class="address regs-info S" type="text" value="0"></div>
							</div>
							<div class="reg-field">
								<div><div class="address pos regs-info">R1</div></div><div><input class="address regs-info R1" type="text" value="0"></div>
							</div>
							<div class="reg-field">
								<div><div class="address pos regs-info">W</div></div><div><input class="address regs-info W" type="text" value="0"></div>
							</div>
						</fieldset>
					</div>
				</div>
				<header></header>
			</li>

			<li class="full-sized" data-row="4" data-col="3" data-sizex="2" data-sizey="5" descrition="ASM editor">
				<div class="in-li-wrapper" style="justify-content: start;align-items: start;">
					<div class="asm-editor" style="width: 100%;height: inherit;"></div>
				</div>
				<header></header>
			</li>
			<li class="full-sized" data-row="4" data-col="1" data-sizex="2" data-sizey="5" descrition="Terminal">
				<div class="in-li-wrapper">
					<div class="terminal-container">
						<div class="terminal-instance"></div>
					</div>
				</div>
				<header></header>
			</li>

			<li data-row="1" data-col="3" data-sizex="2" data-sizey="2" descrition="Control panel">
				<div class="in-li-wrapper">
					<div class="control-button run-btn">Запуск</div>
					<div class="control-button next-btn">Запуск с трассировкой</div>
				</div>
				<header></header>
			</li>
		</ul>
	<div style="width: 100%;align-self: end;text-align: center;font-size: large;color: grey;">NOT FINAL BUILD</div>
</div>
`;

let memoryLineDefault = {'memory-line-pos': '', 'memory-line-dec': '', 'memory-line-asm': ''};
for (var i = 0; i < sizeOfMemory; i++) {
	memoryLineDefault['memory-line-pos'] += '<td><div class="address pos">' + i + '</div></td>';
	memoryLineDefault['memory-line-dec'] += '<td><input type="text" class="address" value="' + memoryPlaceholder + '"></td>';
	memoryLineDefault['memory-line-asm'] += '<td><input type="text" class="address" maxlength="3" word="' + WordToNum(memoryPlaceholder + memoryPlaceholder) + '" value="-"></td>';
}
const memoryLineTemplate = `
<li class="full-sized memoryLineInstance" descrition="Memory line">
	<div class="in-li-wrapper" style="display: block;">
		<div class="memory-line-container">
			<table class="memory-line">
				<tr class="memory-line-pos">${memoryLineDefault['memory-line-pos']}</tr>
				<tr class="memory-line-dec">${memoryLineDefault['memory-line-dec']}</tr>
				<tr class="memory-line-asm">${memoryLineDefault['memory-line-asm']}</tr>
			</table>
			<div class="line-indicator-container">
				<div style="display: none;position: absolute;margin-top: 10px;border-radius: 0.5em;padding: 3px;background: #ccc; outline: none;" contenteditable="true">
					<div class="line-indicator">0</div>
				</div>
			</div>
		</div>
		<div class='add-memory-line memoryLineAdditButton'>+</div>
		<div class='remove-memory-line memoryLineAdditButton'>-</div>
	</div>
	<header></header>
</li>
`;

const f0Commands = {'01': async function(context) {context.processor.alu.S.val = await context.read()}, '02': function(context) {context.say(SayText + context.processor.alu.S.data);}, '99': function(context) {context.halt();}, '00': function(context) {debug(`Warning! <00> command on ${preAddress(context.processor.cu.RA.data, context.processor.cu.RK.data)} address`); context.say(`Warning! <00> command on ${preAddress(context.processor.cu.RA.data, context.processor.cu.RK.data)} address`); context.halt();}};
const f1Commands = {'10': function(context, arg) {context.processor.alu.R1.val = context.memory.getWord(arg);/*Number(strNumFix(context.memory.line[arg] + context.memory.line[arg+1]));*/ context.processor.alu.add();}, '11': function(context, arg) {context.processor.alu.R1.val = context.memory.getWord(arg);; context.processor.alu.sub();}, '12': function(context, arg) {context.processor.alu.R1.val = context.memory.getWord(arg); context.processor.alu.W.val = sign(context.memory.getWord(arg));}, '21': function(context, arg) {context.processor.alu.S.val = context.memory.getWord(arg);}, '22': function(context, arg) {context.memory.write(arg, String(context.processor.alu.S.data.pad(4)).substring(0, 2)); context.memory.write(arg+1, String(context.processor.alu.S.data.pad(4)).substring(2));}, '23': function(context, arg) {context.processor.alu.S.val = arg;}, '30': function(context, arg) {context.processor.cu.RA.val = arg;}, '33': function(context, arg) {if(context.processor.alu.W.data === 0){context.processor.cu.RA.val = arg}}, '34': function(context, arg) {if(context.processor.alu.W.data < 0){context.processor.cu.RA.val = arg}}};
const asciiLogo = String.raw`
__/\\\\____________/\\\\__/\\\\\\\\\\\__/\\\________/\\\__/\\\________/\\\_
 _\/\\\\\\________/\\\\\\_\/////\\\///__\/\\\_____/\\\//__\/\\\_______\/\\\_
  _\/\\\//\\\____/\\\//\\\_____\/\\\_____\/\\\__/\\\//_____\/\\\_______\/\\\_
   _\/\\\\///\\\/\\\/_\/\\\_____\/\\\_____\/\\\\\\//\\\_____\/\\\_______\/\\\_
    _\/\\\__\///\\\/___\/\\\_____\/\\\_____\/\\\//_\//\\\____\/\\\_______\/\\\_
     _\/\\\____\///_____\/\\\_____\/\\\_____\/\\\____\//\\\___\/\\\_______\/\\\_
      _\/\\\_____________\/\\\_____\/\\\_____\/\\\_____\//\\\__\//\\\______/\\\__
       _\/\\\_____________\/\\\__/\\\\\\\\\\\_\/\\\______\//\\\__\///\\\\\\\\\/___
        _\///______________\///__\///////////__\///________\///_____\/////////_____

`;
const f0mnemonicCmds = {'01': 'IN', '02': 'OUT', '99': 'HLT'};
const f1mnemonicCmds = {'10': 'ADD', '11': 'SUB', '12': 'CMP', '21': 'LD', '22': 'ST', '23': 'LA', '30': 'JMP', '33': 'JZ', '34': 'JM'};
const mnemonicCmds = Object.assign(f0mnemonicCmds, f1mnemonicCmds);
//--- Gridster ---

//---

//--- Memory Line ---

//---

//---Terminal---

//---
