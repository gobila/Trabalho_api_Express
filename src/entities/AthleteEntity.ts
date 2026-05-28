import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkoutEntity } from "./WorkoutEntity";

@Entity({ name: "athletes" })
export class AthleteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", nullable: false })
    name!: string;

    @Column({ type: "int", nullable: false })
    age!: number;

    @Column({ type: "float", nullable: false })
    weight!: number;

    @Column({ type: "float", nullable: false })
    height!: number;

    @Column({ type: "varchar", nullable: false })
    goal!: string;

    @OneToMany(() => WorkoutEntity, (workout) => workout.athlete, { cascade: true, onDelete: "CASCADE" })
    workouts!: WorkoutEntity[];
}
