import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-slate-100 flex flex-col h-full group">
      <div className="h-48 overflow-hidden relative bg-slate-200">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/800x600/e2e8f0/475569?text=Imagem+Indispon%C3%ADvel';
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-grow">{product.description}</p>
        
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Destaques</h4>
          <ul className="space-y-1">
            {product.specs.slice(0, 3).map((spec, index) => (
              <li key={index} className="text-xs text-slate-700 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                {spec}
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={() => onViewDetails && onViewDetails(product)}
          className="w-full mt-auto bg-slate-100 text-slate-900 font-semibold py-2 rounded border border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};