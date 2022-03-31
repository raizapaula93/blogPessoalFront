import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin:UserLogin = new UserLogin
  constructor(
    private auth: AuthService,
    private route:Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe({
      next:(resp: UserLogin)=>{
      this.userLogin=resp

      environment.id= this.userLogin.id
      environment.nome= this.userLogin.nome
      environment.token= this.userLogin.token
      environment.foto= this.userLogin.foto
      

      this.userLogin.foto

      this.route.navigate(['/inicio'])
    }, 
    error:erro =>{
      if(erro.status==401){
        alert('Usuário e/ou senha incorretos')
      }
    },
  });
}}
