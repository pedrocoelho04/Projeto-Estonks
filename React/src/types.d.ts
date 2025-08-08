// Tipos alinhados ao seu SQL

export type Id = number;

export interface Usuario {
  Id: Id;
  Nome: string;
  Senha: string; // Em produção, use hash (ex.: bcrypt) antes de salvar
}

export interface Categoria {
  Id: Id;
  Nome: string;
}

export interface Produto {
  Id: Id;
  Nome: string;
  Digital: boolean;
  Altura?: number | null; // NUMERIC(10,2)
  Largura?: number | null;
  Peso?: number | null; // NUMERIC(10,3)
  Quantidade: number;
  Valor_Unitario: number; // NUMERIC(10,2)
  Comprimento?: number | null;
  Data_Criacao: string; // ISO string
  Data_Modificacao?: string | null;
  Usuario_Criou_Id?: Id | null;
  Usuario_Modificou_Id?: Id | null;
}

export interface CatXprod {
  Id: Id;
  Id_Produto: Id;
  Id_Categoria: Id;
}