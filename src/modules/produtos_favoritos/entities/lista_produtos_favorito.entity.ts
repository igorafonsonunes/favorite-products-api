import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity('lista_produtos_favoritos')
@Unique(['cliente', 'titulo'])
export class ListaProdutoFavorito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
  cliente: Cliente;

  @Column({ type: 'varchar' })
  titulo: string;

  @Column({ type: 'varchar', length: 300 })
  imagem: string;

  @Column({ type: 'float' })
  preco: number;

  @Column({ type: 'varchar' })
  avaliacao: string;

  @Column({ type: 'int' })
  contador: number;
}
