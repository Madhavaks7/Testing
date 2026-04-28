"use client";
import { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const categoryName = decodeURIComponent(resolvedParams.name);
  
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { user, loading } = useAuth();
  const { products, loadingProducts } = useProducts();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loadingProducts) {
      setCategoryProducts(products.filter(p => p.category === categoryName));
    }
  }, [products, categoryName, loadingProducts]);

  if (loading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Categories
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {categoryName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {loadingProducts ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors">
          <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <span className="text-3xl text-gray-400 dark:text-gray-500">📦</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
          <p className="text-gray-500 dark:text-gray-400">We couldn't find any products in this category yet.</p>
        </div>
      )}
    </div>
  );
}
