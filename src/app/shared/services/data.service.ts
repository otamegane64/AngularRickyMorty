import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import {take, tap} from 'rxjs/operators'
import { Character, DataResponse, Episode } from '../interface/data.interface';
const QUERY = gql`
{
  episodes{
    results{
      name
      episode
    }
  }
  characters{
    results{
      id
      name
      status
      species
      gender
      image
    }
  }
}`
@Injectable({
  providedIn: 'root'
})
export class DataService {
private episodesSubject = new BehaviorSubject<Episode[]>(null);
episodes$ = this.episodesSubject.asObservable();
private characterSubject = new BehaviorSubject<Character[]>(null);
character$ = this.characterSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.getDataAPI();
   }

 private getDataAPI():void{
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const  {characters, episodes} = data;
        this.episodesSubject.next(episodes.results);
        this.characterSubject.next(characters.results)
      })
    ).subscribe();

  }
}
