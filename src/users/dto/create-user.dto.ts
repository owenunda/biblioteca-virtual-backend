export class CreateUserDto {
  email: string;
  name: string;
  lastname?: string;
  password: string;
  prestamos: number[];
  role?: string;
}
