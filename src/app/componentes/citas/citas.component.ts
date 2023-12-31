import { Component, OnInit } from '@angular/core';
import { Consultorio } from 'src/app/models/consultorio';
import { NgForm } from '@angular/forms';
import { ConsultorioService } from 'src/app/services/citas.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit{
  constructor (public consultorioService:ConsultorioService) {}

  
  ngOnInit(): void {
    this.getConsultorio();
  }

  getConsultorio(){
    this.consultorioService.getCosultorio().subscribe(
      res=>{
        this.consultorioService.consultorios = res;
        console.log(res);
      },

      err => console.log(err)
    )
  }

  updateConsultorios(form:NgForm){
    alert('Actualizando');
      this.consultorioService.editConsultorio(form.value).subscribe(
        res=> {
          this.getConsultorio();
          console.log(res);
          form.reset();
        },
        err=> console.log(err)
      )
  }

  createConsultorio(form:NgForm){
    this.consultorioService.createConsultorio(form.value).subscribe(
      res=> {
        this.getConsultorio();
        form.reset();
      },
      err=> console.log(err)
    )
  }

  deleteConsultorio(id_consultorio:any){
    const resp = confirm('Quieres eliminarlo?');
    console.log('Eliminando '+id_consultorio);
    if(resp){
      this.consultorioService.deleteConsultorio(id_consultorio).subscribe(
        res=>{
          this.getConsultorio();
        },
        err=> console.log(err)
      );
    }
  }

  editConsultorio(consultorio:Consultorio){
    this.consultorioService.consultorio = consultorio;
  }

  formReset(form:NgForm){
    this.consultorioService.consultorio=form.value;
    form.reset();
  }
}
