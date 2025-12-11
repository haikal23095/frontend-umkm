import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { transactionService } from "../services/transactionService";
import toast from "react-hot-toast";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    alamat_pengiriman: "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Keranjang kosong");
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.harga) * item.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.alamat_pengiriman.trim()) {
      toast.error("Alamat pengiriman harus diisi");
      return;
    }

    setLoading(true);
    try {
      // Prepare transaction data
      const transactionData = {
        user_id: user.id,
        total_harga: calculateTotal(),
        alamat_pengiriman: formData.alamat_pengiriman,
        status: "pending",
        details: cartItems.map((item) => ({
          produk_id: item.id,
          jumlah: item.quantity,
          harga_satuan: parseFloat(item.harga),
          subtotal: parseFloat(item.harga) * item.quantity,
        })),
      };

      const response = await transactionService.createTransaction(
        transactionData
      );

      if (response.success) {
        toast.success("Transaksi berhasil dibuat!");
        // Clear cart
        localStorage.removeItem("cart");
        // Redirect to payment page
        navigate(`/payment/${response.data.id}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Gagal membuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Informasi Pengiriman
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Penerima
                    </label>
                    <input
                      type="text"
                      value={user?.name || ""}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Pengiriman <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.alamat_pengiriman}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          alamat_pengiriman: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Masukkan alamat lengkap pengiriman..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Memproses..." : "Lanjut ke Pembayaran"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={
                        item.gambar
                          ? `http://localhost:8000/storage/${item.gambar}`
                          : "https://via.placeholder.com/60"
                      }
                      alt={item.nama_produk}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/60?text=No+Img";
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.nama_produk}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-indigo-600">
                        {formatPrice(item.harga * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
