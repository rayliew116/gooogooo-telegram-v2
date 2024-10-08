import Phaser, { Tilemaps, Scene } from 'phaser'
import ReactDOM from 'react-dom/client';

import { DarkColor } from '../consts/Colors'

import button, { primaryButton } from '../ui/Buttons'
import SceneKeys from '../consts/SceneKeys'
import SoundEffectsController from '../game/SoundEffectsController'
import { Subject } from 'rxjs'

export default class GameOver extends Phaser.Scene
{
	private sfx?: SoundEffectsController
	private uiClickSubject = new Subject<void>()
	private enterSubject = new Subject<void>()

	init()
	{
		this.sfx = new SoundEffectsController(this.sound)
		this.sfx.handleUIClick(this.uiClickSubject.asObservable())
		this.sfx.handleGameOverEnter(this.enterSubject.asObservable())
	}

	create()
	{
		const width = this.scale.width
		const height = this.scale.height
		const x = width * 0.5
		const y = height * 0.5

		// add dark transparent overlay
		this.add.rectangle(x, y, width, height, DarkColor, 0.7)

		const hexColor = `#${DarkColor.toString(16).padStart(6, '0')}`;

		const fontSize = Math.min(width * 0.15, 225)
		const title = this.add.text(x, height * 0.4, 'Game\nOver', {
			fontFamily: 'Nosifer',
			fontSize,
			color: '#eb4034',
			align: 'center',
			stroke: hexColor,
			strokeThickness: 8
		})
		.setOrigin(0.5, 0.5)
		.setScale(0, 0)

		// const container = document.createElement('div');
		// ReactDOM.render(primaryButton('Try Again'), container);
		
		const container = document.createElement('div');
		const root = ReactDOM.createRoot(container);
		root.render(primaryButton('Try Again'));
		// const tryAgainBtn = this.add.dom(x, height * 0.6, primaryButton('Try Again'))
		const tryAgainBtn = this.add.dom(x, height * 0.6, container.firstChild as HTMLElement)
			.setScale(0, 0)
			.addListener('click').on('click', () => {
				this.uiClickSubject.next()

				this.scene.stop(SceneKeys.Game)
				this.scene.start(SceneKeys.TipsInterstitial, {
					target: SceneKeys.Game
				})
			})

		// ReactDOM.render(button('Back'), container);
		// const exitBtn = this.add.dom(x, tryAgainBtn.y + tryAgainBtn.height + 20, button('Back'))
		const container2 = document.createElement('div');
		const root2 = ReactDOM.createRoot(container2);
		root2.render(button('Back'));
		const exitBtn = this.add.dom(x, tryAgainBtn.y + tryAgainBtn.height + 20, container.firstChild as HTMLElement)
			.setScale(0, 0)
			.addListener('click').on('click', () => {
				this.uiClickSubject.next()

				this.scene.stop(SceneKeys.Game)

				this.scene.start(SceneKeys.TipsInterstitial, {
					target: SceneKeys.TitleScreen
				})
			})

		// const timeline = this.tweens.timeline()
		const timeline = (this.tweens as any).timeline();


		timeline.add({
			targets: title,
			scale: 1,
			ease: 'Back.easeOut',
			duration: 300
		})

		timeline.add({
			targets: tryAgainBtn,
			scale: 1,
			ease: 'Back.easeOut',
			duration: 300
		})

		timeline.add({
			targets: exitBtn,
			scale: 1,
			ease: 'Back.easeOut',
			duration: 300
		})

		timeline.play()

		this.enterSubject.next()

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.sfx?.destroy()
		})
	}
}