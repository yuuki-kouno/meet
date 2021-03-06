import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { EventId } from '../interfaces/event-id';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUserData(uid: string): Observable<any> {
    return this.db.doc(`users/${uid}`).valueChanges();
  }

  async createUser(uid: string, googleProfile: any): Promise<void> {
    const userData: User = {
      uid,
      name: googleProfile.name,
      avatarURL: googleProfile.picture,
      email: googleProfile.email,
    };
    await this.db.doc(`users/${uid}`).set(userData);
  }

  addOwnerEventId(uid: string, id: string) {
    this.db.doc(`users/${uid}/ownerEvents/${id}`).set({ id });
  }

  getOwnerEvents(uid: string): Observable<Event[]> {
    return this.db
      .collection<Event>('events', (ref) => ref.where('ownerUserId', '==', uid))
      .valueChanges();
  }
  getOwnerEvent(uid: string): Observable<Event[]> {
    return this.db
      .collection<Event>('events', (ref) => ref.where('ownerUserId', '==', uid))
      .valueChanges();
  }
}
