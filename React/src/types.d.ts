// Tipos alinhados ao seu SQL (agora em camelCase para o Spring Boot)

export type Id = number;

export interface Usuario {
  id: Id;
  nome: string;
  senha?: string; // Opcional no frontend ao listar
}

export interface Categoria {
  id: Id;
  nome: string;
}

export interface Produto {
  id: Id;
  nome: string;
  digital: boolean;
  altura?: number | null;
  largura?: number | null;
  peso?: number | null;
  quantidade: number;
  valor_Unitario: number;
  comprimento?: number | null;
  data_criacao?: string;
  data_modificacao?: string | null;
  usuario_Criou_Id?: Usuario | null;
  usuario_Modificou_id?: Usuario | null;
  categorias?: Categoria[];
}