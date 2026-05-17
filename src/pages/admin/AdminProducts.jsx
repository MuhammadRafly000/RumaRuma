import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useProductStore } from '@/context/ProductContext';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from '@/components/ui/Button.jsx';
import { useToast } from '@/context/ToastContext';

export default function AdminProducts() {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const toast = useToast();

  const handleDelete = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${name}"?`)) {
      deleteProduct(id);
      toast.success('Produk Dihapus', `"${name}" berhasil dihapus dari katalog.`);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-display text-charcoal-800">Manajemen Produk</h2>
          <p className="text-sm text-charcoal-500">Kelola katalog produk RumaRuma.</p>
        </div>
        <Button as={Link} to="/admin/produk/baru" className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Tambah Produk
        </Button>
      </header>

      <div className="rounded-3xl bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-100 text-charcoal-400">
              <tr>
                <th className="pb-3 font-medium">Produk</th>
                <th className="pb-3 font-medium">Kategori</th>
                <th className="pb-3 font-medium">Harga</th>
                <th className="pb-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-50">
              {products.map((p) => (
                <tr key={p.id} className="group">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-charcoal-800">{p.name}</p>
                        <p className="text-xs text-charcoal-400">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-charcoal-600 capitalize">
                    {p.category.replace('-', ' ')}
                  </td>
                  <td className="py-4 font-semibold text-charcoal-800">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        to={`/admin/produk/edit/${p.id}`}
                        className="rounded-lg p-2 text-sage-600 hover:bg-sage-50"
                        title="Edit Produk"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        title="Hapus Produk"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="mt-4 text-center text-sm text-charcoal-500">
              Belum ada produk. Silakan tambahkan produk baru.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
