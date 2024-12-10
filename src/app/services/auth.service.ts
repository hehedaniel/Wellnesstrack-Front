import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #afAuth: AngularFireAuth = inject(AngularFireAuth);

    // Metodos para usar con Firebase


    /**
     * Método para logearse con Firebase
     * @param correo Correo de login del usuario
     * @param contrasena Contraseña de login del usuario
     * @returns
     */
    async fbLogin(correo: string, contrasena: string){
      try {
        const result = await this.#afAuth.signInWithEmailAndPassword(correo, contrasena);
        return result;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    /**
     * Método para registrarse con Firebase
     * @param correo Correo de registro del usuario
     * @param contrasena Contraseña de registro del usuario
     * @returns
     */
    async fbRegistro(correo: string, contrasena: string){
      try {
        const result = await this.#afAuth.createUserWithEmailAndPassword(correo, contrasena);
        this.fbSendVerificationEmail();
        return result;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    /**
     * Método para cerrar sesión con Firebase
     * @returns
     */
    async fbLogout(){
      try {
        const result = await this.#afAuth.signOut();
        return result;
      } catch (error) {
        console.log(error);
      }
    }

    async fbSendVerificationEmail(): Promise<void>{
      return (await this.#afAuth.currentUser)?.sendEmailVerification();
    }

    async fbUserCredentials(){
      return this.#afAuth.authState.pipe(first()).toPromise();
    }

    async fbIsUserVerified(): Promise<any>{
      return new Promise((resolve, reject) => {
        this.#afAuth.authState.subscribe(user => {
          if (user) {
            resolve(user.emailVerified);
          } else {
            resolve(false);
          }
        }, error => reject(error));
      });
    }

    async fbUserEmail(): Promise<any>{
      return new Promise((resolve, reject) => {
        this.#afAuth.authState.subscribe(user => {
          if (user) {
            resolve(user.email);
          } else {
            resolve(null);
          }
        }, error => reject(error));
      });
    }

    async fbChangePassword(contrasenaAntigua: string, contrasenaNueva: string){
      this.#afAuth.currentUser.then(user => {
        if (user) {
          const credentials = firebase.auth.EmailAuthProvider.credential(user.email!, contrasenaAntigua);
          user.reauthenticateWithCredential(credentials).then(() => {
            user.updatePassword(contrasenaNueva).then(() => {
              console.log('Contraseña cambiada exitosamente');
            });
          });
        }
      });
    }

    async fbCurrentUser(){
      await this.#afAuth.currentUser;
    }


    async fbDeleteUser(contrasena: string){
      this.#afAuth.currentUser.then(user => {
        if (user) {
          const credentials = firebase.auth.EmailAuthProvider.credential(user.email!, contrasena);
          user.reauthenticateWithCredential(credentials).then(() => {
            user.delete().then(() => {
              console.log('Usuario eliminado correctamente');
            });
          });
        }else{
          console.log('No hay ningún usuario iniciado sesión');
        }
      });
    }
}
