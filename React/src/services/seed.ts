import { Categoria, Usuario } from "../types";
import { getItem, setItem } from "./storage";

export const KEYS = {
  usuarios: "db.usuarios",
  categorias: "db.categorias",
  produtos: "db.produtos",
  catxprod: "db.catxprod"
};

export async function seedIfEmpty() {
  const usuarios = await getItem<Usuario[]>(KEYS.usuarios, []);
  if (usuarios.length === 0) {
    const admin: Usuario = { Id: 1, Nome: "admin", Senha: "admin" }; // Atenção: apenas dev
    await setItem(KEYS.usuarios, [admin]);
  }

  const categorias = await getItem<Categoria[]>(KEYS.categorias, []);
  if (categorias.length === 0) {
    const base: Categoria[] = [
      { Id: 1, Nome: "Geral" },
      { Id: 2, Nome: "Digital" },
      { Id: 3, Nome: "Físico" }
    ];
    await setItem(KEYS.categorias, base);
  }

  // Produtos e CatXprod começam vazios
  const produtos = await getItem(KEYS.produtos, null);
  if (!produtos) await setItem(KEYS.produtos, []);
  const catxprod = await getItem(KEYS.catxprod, null);
  if (!catxprod) await setItem(KEYS.catxprod, []);
}