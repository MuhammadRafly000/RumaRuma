import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProductStore } from '@/context/ProductContext';
import { useToast } from '@/context/ToastContext';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const getProductById = useProductStore((s) => s.getProductById);

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'dekorasi',
    material: '',
    description: '',
    images: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const product = getProductById(id);
      if (product) {
        setForm({
          name: product.name,
          price: product.price.toString(),
          category: product.category,
          material: product.material || '',
          description: product.description,
          images: product.images.join(', '),
        });
      } else {
        toast.error('Gagal', 'Produk tidak ditemukan');
        navigate('/admin/produk');
      }
    }
  }, [id, isEditMode, getProductById, navigate, toast]);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    
    // Parse the form
    const productData = {
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, '-'),
      price: parseInt(form.price, 10),
      category: form.category,
      material: form.material,
      description: form.description,
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      tags: [form.category, form.material].filter(Boolean),
    };

    if (isEditMode) {
      updateProduct(id, productData);
      toast.success('Berhasil', 'Produk berhasil diperbarui');
    } else {
      addProduct(productData);
      toast.success('Berhasil', 'Produk baru berhasil ditambahkan');
    }

    navigate('/admin/produk');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="flex items-center gap-4">
        <Link to="/admin/produk" className="rounded-full p-2 hover:bg-sage-100 text-charcoal-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-display text-charcoal-800">
            {isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
        </div>
      </header>

      <form onSubmit={submit} className="rounded-3xl bg-white p-8 shadow-soft space-y-6">
        <Input
          label="Nama Produk"
          required
          value={form.name}
          onChange={handle('name')}
          placeholder="Cth: Vas Bunga Estetik"
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Harga (Rp)"
            type="number"
            required
            value={form.price}
            onChange={handle('price')}
            placeholder="Cth: 150000"
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
              Kategori
            </label>
            <select
              value={form.category}
              onChange={handle('category')}
              className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-800 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
            >
              <option value="pecah-belah">Pecah Belah</option>
              <option value="kitchenware">Kitchenware</option>
              <option value="dekorasi">Dekorasi</option>
              <option value="storage">Storage</option>
            </select>
          </div>
        </div>

        <Input
          label="Material"
          value={form.material}
          onChange={handle('material')}
          placeholder="Cth: Keramik, Kayu Jati"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
            Deskripsi
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={handle('description')}
            className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-800 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
            placeholder="Jelaskan detail produk ini..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
            URL Gambar (Pisahkan dengan koma jika lebih dari satu)
          </label>
          <textarea
            required
            rows={3}
            value={form.images}
            onChange={handle('images')}
            className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-800 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
            placeholder="/assets/products/piring.png, /assets/products/piring-2.png"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-100">
          <Button type="button" variant="secondary" onClick={() => navigate('/admin/produk')}>
            Batal
          </Button>
          <Button type="submit">
            {isEditMode ? 'Simpan Perubahan' : 'Tambah Produk'}
          </Button>
        </div>
      </form>
    </div>
  );
}
