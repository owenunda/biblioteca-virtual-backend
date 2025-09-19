export class CreateBookDto {
  title: string;
  category: string;
  estado?: string; // Opcional, por defecto DISPONIBLE
}
