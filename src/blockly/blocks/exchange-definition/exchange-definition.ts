import Blockly, { BlockSvg } from 'blockly';
import { getChildByType, getInputValue } from '@utils/blockly';
import { ExchangeParameters } from '../images';

Blockly.Blocks.exchange_definition = {
	init() {
		this.jsonInit(this.definition());
	},
	definition() {
		return {
			message0: '%1 %2 %3',
			message1: '%1',
			message2: '%1 %2 %3',
			message3: '%1',
			message4: '%1 %2 %3',
			message5: '%1',
			args0: [
				{
					type: 'field_image',
					src: ExchangeParameters,
					width: 25,
					height: 25,
					alt: 'Exchange',
				},
				{
					type: 'field_label',
					text: '1. Exchange definition',
				},
				{
					type: 'dummy_field',
					width: 20,
				},
			],
			args1: [
				{
					type: 'input_statement',
					name: 'EXCHANGE_PARAMETER',
				},
			],
			args2: [
				{
					type: 'dummy_field',
					width: 15,
				},
				{
					type: 'field_label',
					text: 'Run once at start:',
					class: 'text-sm',
				},
				{
					type: 'dummy_field',
				},
			],
			args3: [
				{
					type: 'input_statement',
					name: 'INITIALIZATION',
				},
			],
			args4: [
				{
					type: 'dummy_field',
					width: 15,
				},
				{
					type: 'field_label',
					text: 'Exchange amount:',
				},
				{
					type: 'dummy_field',
				},
			],
			args5: [
				{
					type: 'input_statement',
					name: 'EXCHANGE_AMOUNT',
				},
			],
			colour: '#020029',
			extensions: ['exchange_amount_check'],
		};
	},
};

Blockly.JavaScript.exchange_definition = (block: BlockSvg) => {
	const paramBlock = getChildByType(block, 'exchange_parameter');
	const slippageBlock = getChildByType(block, 'exchange_slippage');
	const payToken = paramBlock?.getFieldValue('PAY_TOKEN_LIST');
	const receiveToken = paramBlock?.getFieldValue('RECEIVE_TOKEN_LIST');

	let slippage;
	if (slippageBlock) slippage = getInputValue(slippageBlock, 'SLIPPAGE');

	const initialization = Blockly.JavaScript.statementToCode(block, 'INITIALIZATION');
	const stack = Blockly.JavaScript.statementToCode(block, 'EXCHANGE_AMOUNT');

	return `
		${initialization.trim()}

		var inputMint;
		var outputMint;
		var slippage;
		var amount;

		function JupDefinition() {
			inputMint = '${payToken}';
			outputMint = '${receiveToken}';
			slippage = ${slippage};

			updateJupParam('inputToken', inputMint);
			updateJupParam('outputToken', outputMint);
			updateJupParam('slippage', slippage)

			${stack}
		}
	`;
};
