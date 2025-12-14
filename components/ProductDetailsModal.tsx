import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onRequestQuote: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onRequestQuote }) => {
  const [activeImage, setActiveImage] = useState(product.imageUrl);

  // Combina a imagem principal com a galeria
  const allImages = [product.imageUrl, ...(product.galleryImages || [])];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://placehold.co/800x600/e2e8f0/475569?text=Imagem+Indispon%C3%ADvel';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative animate-fade-in">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full transition-colors shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          
          {/* Coluna da Esquerda: Galeria */}
          <div className="lg:w-1/2 bg-slate-100 p-6 flex flex-col">
            <div className="aspect-w-4 aspect-h-3 bg-white rounded-xl overflow-hidden shadow-sm mb-4 h-[300px] lg:h-[400px]">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
                onError={handleImageError}
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`View ${idx}`} 
                    className="w-full h-full object-cover" 
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Informações */}
          <div className="lg:w-1/2 p-8 flex flex-col">
            <div className="mb-6">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">{product.name}</h2>
              <p className="text-slate-600 leading-relaxed text-lg border-b border-slate-100 pb-6">
                {product.longDescription || product.description}
              </p>
            </div>

            <div className="space-y-8">
              {/* Características */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Destaques
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dados Técnicos */}
              {product.technicalData && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    Especificações Técnicas
                  </h3>
                  <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {product.technicalData.map((item, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="px-4 py-2 font-medium text-slate-700 border-b border-slate-100 last:border-0">{item.label}</td>
                            <td className="px-4 py-2 text-slate-600 border-b border-slate-100 last:border-0">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onRequestQuote}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-blue-900/20 text-center"
              >
                Solicitar Orçamento
              </button>
              <button 
                onClick={onClose}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};