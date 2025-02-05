import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../types';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = '/api/users/login';
    private authUrlRegister = '/api/register';
    private authenticated: boolean = false;

    user = new BehaviorSubject<User | null>(null) ;
    currentUser = this.user.asObservable();

    _isLogged = new BehaviorSubject<Boolean>(false);
    current_isLogged=this._isLogged.asObservable();

    isAlreadyLogout = new BehaviorSubject<Boolean>(true);
    current_isAlreadyLogout=this.isAlreadyLogout.asObservable();

    constructor(private http: HttpClient, private accountService: AccountService ) {}

    login(username: string, password: string): Observable<User> {
        
        let options = {
            headers: new HttpHeaders({
                "Authorization": 'Basic ' + btoa(username + ':' + password),
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
                "Access-Control-Allow-Origin": '*'
            })
        };

        // C'est ici qu'on récupère l'utilisateur.
        return this.http.post<User>(this.authUrl, {username, password}, { headers:options.headers, withCredentials: true }).pipe(
            tap((user: User) => {
                console.log("auth.service http post user", user);
                this.authenticated = true;
                this.accountService.setUser(user);
                localStorage.setItem("isLogout", "false");
                localStorage.setItem("isLogged", "true");
                localStorage.setItem("isAlreadyLogin", "false");
                localStorage.setItem("isAlreadyLogout", "false");
                this.user.next(user);
            })
        );
    }

    register(registerUser: object) {
        let options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
                "Access-Control-Allow-Origin": '*'
            })
        };
        let data=JSON.stringify(registerUser);
        console.log("registerUser", data);

        return this.http.post<any>(this.authUrlRegister, data, { headers:options.headers }).pipe(
            tap((user: User) => {
                this.authenticated = true;
                this.accountService.setUser(user)
                localStorage.setItem("isLogout", "false");
                localStorage.setItem("isLogged", "true");
                localStorage.setItem("isAlreadyLogin", "true"); // false
                localStorage.setItem("isAlreadyLogout", "false"); // true
                this.user.next(user);
            })
        );
    }

    isAuthenticated(): boolean {
        return this.authenticated = true;
    }

    /**
     * Déconnexion de l'utilisateur en supprimant celui-ci du local storage.
     */
    logout(): void {
        console.log("L83 autho service logout");
        
        this.authenticated = false;
        localStorage.setItem("isLogout", "true");
        localStorage.setItem("isLogged", "false");
        localStorage.setItem("isAlreadyLogout", "false");
        this.isAlreadyLogout.next(true)
        localStorage.removeItem("user");
        this.user.next(null);
    }


    /**
     * Permet de savoir si on est connecté.
     * @returns {Boolean}
     */
    isLogged(){
        return JSON.parse(localStorage.getItem('isLogged')!)
    }

    /**
     * Permet de savoir si on est déconnecté.
     * @returns {Boolean}
     */
    isLogout(){
        return JSON.parse(localStorage.getItem('isLogout')!);
    }
}
