import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import GameEvents from '../consts/GameEvents'
import AudioKeys from '../consts/AudioKeys'

export default class Preload extends Phaser.Scene
{
	preload()
	{
		this.load.image(TextureKeys.Background, 'background.png')
		this.load.image(TextureKeys.Virus, 'coronavirus.png')
		this.load.image(TextureKeys.VirusRed, 'virus_red.png')
		this.load.image(TextureKeys.VirusGreen, 'virus_green.png')
		this.load.image(TextureKeys.VirusBlue, 'virus_blue.png')
		this.load.image(TextureKeys.VirusYellow, 'virus_yellow.png')
		this.load.image(TextureKeys.VirusParticles, 'light_02.png')
		this.load.image(TextureKeys.Shooter, 'shooter.png')

		this.load.audio(AudioKeys.MusicLoop, 'music/imminent-threat-loop-var.wav')

		this.load.audio(AudioKeys.ShootBall, 'sfx/highUp.wav')
		this.load.audio(AudioKeys.AttachToGrid, 'sfx/phaserUp5.wav')
		this.load.audio(AudioKeys.ClearMatches, 'sfx/threeTone2.wav')
		this.load.audio(AudioKeys.ClearMatchesExtra1, 'sfx/powerUp8.wav')
		this.load.audio(AudioKeys.OrphanCleared, 'sfx/zap1.wav')
		this.load.audio(AudioKeys.UIClick, 'sfx/click_003.wav')
		this.load.audio(AudioKeys.GameOverFoley, 'sfx/lowDown.wav')
	}

	create()
	{
		this.sound.play(AudioKeys.MusicLoop, {
			loop: true
		})

		this.game.events.emit(GameEvents.PreloadFinished)
	}
}
