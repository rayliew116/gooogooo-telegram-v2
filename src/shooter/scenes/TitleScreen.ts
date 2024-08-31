import Phaser from 'phaser'
import ReactDOM from 'react-dom/client';


import playButton from '../ui/PlayButton'
import { DarkColor } from '../consts/Colors'
import SceneKeys from '../consts/SceneKeys'
import SoundEffectsController from '../game/SoundEffectsController'
import { Subject } from 'rxjs'
import TextureKeys from '../consts/TextureKeys'

const DPR = window.devicePixelRatio

export default class HelloWorldScene extends Phaser.Scene
{
	private sfx?: SoundEffectsController
	private uiClickSubject = new Subject<void>()

	init()
	{
		this.sfx = new SoundEffectsController(this.sound)
		this.sfx.handleUIClick(this.uiClickSubject.asObservable())
	}

    create()
    {
		const width = this.scale.width
		const height = this.scale.height

		const x = width * 0.5
		const y = height * 0.3

		this.add.image(x, height * 0.5, TextureKeys.Background)
			.setScale(DPR)
			.setTint(0x000000FF)

		const hexColor = `#${DarkColor.toString(16).padStart(6, '0')}`;

		const fontSize = Math.min(width * 0.095, 225)
        const title1 = this.add.text(x, y, 'Coronavirus', {
			fontFamily: 'Nosifer',
			fontSize,
			color: '#eb4034',
			align: 'center',
			stroke: hexColor,
			strokeThickness: 8
		})
		.setOrigin(0.5, 0.5)

		this.add.text(x, title1.y + title1.height, 'Pop!', {
			fontFamily: 'Lemon',
			fontSize: fontSize * 1.5,
			color: '#FEC81A',
			stroke: hexColor,
			strokeThickness: 4
		})
		.setOrigin(0.5, 0.5)

		// const container = document.createElement('div')
		// const root = ReactDOM.createRoot(container)
		// root.render(playButton('Play'))
		// const playButtonElement = container.firstChild as HTMLElement;

		const button = document.createElement('button');
		button.innerText = 'Play';
		button.className = 'button is-primary is-large';
		this.add.dom(x, height * 0.7, button)
		// this.add.dom(x, height * 0.7, playButton('Play'))
		// this.add.dom(x, height * 0.7, playButtonElement)
			.addListener('click').on('click', () => {
				this.uiClickSubject.next()

				// this.scene.start(SceneKeys.Game)
				this.scene.start(SceneKeys.TipsInterstitial, {
					target: SceneKeys.Game
				})
			})

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.sfx?.destroy()
		})
    }
}
