import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { transactionService } from "../services/transactionService";
import toast from "react-hot-toast";

const Transactions = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionService.getTransactionsByUser(user.id);
      if (response.success) {
        setTransactions(response.data);
      }
    } catch (error) {
      toast.error("Gagal memuat transaksi");
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "dibayar":
        return "bg-green-100 text-green-800";
      case "dikirim":
        return "bg-blue-100 text-blue-800";
      case "selesai":
        return "bg-purple-100 text-purple-800";
      case "dibatalkan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat transaksi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Riwayat Transaksi
              </h1>
              <p className="text-sm text-gray-600">
                Selamat datang, {user?.name}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
              >
                Kembali ke Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {transactions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Belum ada transaksi
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Mulai belanja sekarang!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Lihat Produk
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  {/* Transaction Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        ID Transaksi:{" "}
                        <span className="font-medium text-gray-900">
                          #{transaction.id}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                  {/* Transaction Items */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-3">
                      {transaction.details?.map((detail) => (
                        <div key={detail.id} className="flex gap-4">
                          <img
                            src={
                              detail.produk?.gambar
                                ? `http://localhost:8000/storage/${detail.produk.gambar}`
                                : "https://via.placeholder.com/80"
                            }
                            alt={detail.produk?.nama_produk || "Produk"}
                            className="w-20 h-20 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/80?text=No+Img";
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {detail.produk?.nama_produk || "Produk"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Jumlah: {detail.jumlah}
                            </p>
                            <p className="text-sm font-bold text-indigo-600">
                              {formatPrice(detail.subtotal)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transaction Footer */}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Alamat: {transaction.alamat_pengiriman}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-xl font-bold text-indigo-600">
                          {formatPrice(transaction.total_harga)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {transaction.status === "pending" && (
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => navigate(`/payment/${transaction.id}`)}
                          className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          Bayar Sekarang
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Transactions;
