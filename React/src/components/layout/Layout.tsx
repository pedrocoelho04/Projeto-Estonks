import React from "react";
import { Boxes, LayoutDashboard, Package, Tag, Users, LogOut } from 'lucide-react';
import { useAuthStore } from "../../store/auth";
import clsx from "clsx";
import { usePage } from "../../store/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const { page, setPage } = usePage();

  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000); // atualiza a cada 1s
    return () => clearInterval(t);
  }, []);

  const nav = [
    { page: { name: "dashboard" } as const, label: "Dashboard", icon: LayoutDashboard },
    { page: { name: "produtos" } as const, label: "Produtos", icon: Package },
    { page: { name: "categorias" } as const, label: "Categorias", icon: Tag },
    { page: { name: "usuarios" } as const, label: "Usuários", icon: Users }
  ];

  const isActive = (p: typeof nav[number]["page"]) =>
    page.name === p.name;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:flex flex-col border-r border-border bg-white">
        <div className="h-16 flex items-center gap-2 px-4 border-b border-border cursor-pointer" onClick={() => setPage({ name: "dashboard" })}>
          <Boxes className="text-primary" />
          <span className="font-semibold">Meu Estoque</span>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.page);
              return (
                <li key={item.label}>
                  <button
                    className={clsx(
                      "w-full text-left flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                      active ? "bg-muted text-foreground" : "text-gray-600 hover:bg-gray-50"
                    )}
                    onClick={() => setPage(item.page)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-border">
          <div className="text-sm mb-2">
            Logado como: <span className="font-medium">{user?.nome}</span>
          </div>
          <button className="btn btn-outline w-full" onClick={logout}>
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="h-16 flex items-center justify-between border-b border-border bg-white px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:hidden cursor-pointer" onClick={() => setPage({ name: "dashboard" })}>
            <Boxes className="text-primary" />
            <span className="font-semibold">Meu Estoque</span>
          </div>
          <div className="ml-auto text-sm text-gray-600 hidden sm:block">
            {now.toLocaleString()}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <div className="container-page">{children}</div>
        </main>
      </div>
    </div>
  );
}