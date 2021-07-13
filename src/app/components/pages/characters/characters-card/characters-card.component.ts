import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Character } from '@app/shared/interface/data.interface';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent  {
  @Input() character: Character;
  constructor() { }
  getIcon():String
  {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg'

  }
  toggleFavorite():void
  {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;

  }

}
