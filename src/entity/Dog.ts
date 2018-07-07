import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsInt, IsNotEmpty } from "class-validator";

@Entity()
export class Dog {
  @PrimaryGeneratedColumn() id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  breed: string;

  @IsNotEmpty()
  @IsInt()
  @Column()
  age: number;

  @IsNotEmpty()
  @Column()
  image: string;
}
