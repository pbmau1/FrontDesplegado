import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";   
import { RouterLink } from "@angular/router";
import { Usuario } from "../../../models/Usuario";
import { UsuarioService } from "../../../services/usuario-service";

@Component({
  selector: 'app-usuariolistar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
],
  templateUrl: './usuariolistar.html',
  styleUrls: ['./usuariolistar.css'],
})
export class usuariolistar implements OnInit {

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
