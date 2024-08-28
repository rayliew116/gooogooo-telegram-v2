import { DarkColor } from './shooter/consts/Colors'
import ElementKeys from './shooter/consts/ElementKeys'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: ElementKeys.ContainerId,
	dom: {
		createContainer: true
	},
	backgroundColor: DarkColor,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 },
			// debug: true
		}
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
		width: '100%',
		height: '100%',
	}
}

export default config
