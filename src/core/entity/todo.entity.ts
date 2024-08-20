import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity("todo")
export class TodoEntity extends BaseEntity {
    @Column({ type: "varchar", nullable: true })
    public name!: string;

    @Column({ type: "varchar", nullable: true })
    public color!: string;

    @Column({ type: "boolean", nullable: true, default: false })
    public status!: boolean;
}

