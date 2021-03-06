import Blockly, { BlockSvg } from 'blockly';

Blockly.Blocks.toast = {
	init() {
		this.jsonInit(this.definition());
	},
	definition() {
		return {
			message0: 'toast %1 %2',
			args0: [
				{
					type: 'custom_dropdown',
					name: 'TOAST_OPTIONS',
					options: [
						{ label: 'Success', value: 'success' },
						{ label: 'Error', value: 'error' },
					],
					search: false,
				},
				{
					type: 'input_value',
					name: 'TEXT',
				},
			],
			colour: 215,
			previousStatement: null,
			nextStatement: null,
		};
	},
};

Blockly.JavaScript.toast = (block: BlockSvg) => {
	const toastOptions = block.getFieldValue('TOAST_OPTIONS');
	const msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || "''";

	return `toast(${msg}.toString(), '${toastOptions}');\n`;
};
