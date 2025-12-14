import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { AIChatbot } from './components/AIChatbot';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { Product, Section, Service } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 'd-series',
      name: 'Decanter Centrifuge Série D',
      category: 'decantadora',
      description: 'Alta performance na separação de sólidos e líquidos para indústrias de efluentes e mineração.',
      longDescription: 'A Série D representa o estado da arte em centrifugação horizontal. Projetada para ambientes agressivos, esta máquina oferece separação contínua de sólidos em suspensão. Seu sistema de transmissão de alto torque ajusta automaticamente a velocidade diferencial baseada na carga de sólidos, garantindo um "bolo" mais seco e clarificado de alta pureza.',
      // Imagem: Estação de tratamento industrial (Tubulações e tanques horizontais)
      imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800', 
      specs: ['Capacidade: 5-100 m³/h', 'Rotação: até 4000 RPM', 'Material: Aço Inox 316L'],
      features: [
        'Proteção contra desgaste em carbeto de tungstênio',
        'Sistema de controle CLP intuitivo com tela touch',
        'Baixo consumo energético por m³ processado',
        'Design compacto com fácil acesso para manutenção'
      ],
      technicalData: [
        { label: 'Diâmetro do Tambor', value: '350mm - 900mm' },
        { label: 'Fator G Máximo', value: '3.200 G' },
        { label: 'Potência do Motor Principal', value: '30kW - 250kW' },
        { label: 'Material em Contato', value: 'Duplex 2205 / AISI 316L' },
        { label: 'Sistema de Lubrificação', value: 'Automático Ar-Óleo' }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800', // Tanques de tratamento de água
        'https://images.unsplash.com/photo-1590502206450-7c667e4d8bcf?auto=format&fit=crop&q=80&w=800', // Detalhe mecânico industrial
        'https://images.unsplash.com/photo-1518458920194-e5c9429188d4?auto=format&fit=crop&q=80&w=800', // Chão de fábrica
        'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=800'  // Válvulas pesadas
      ]
    },
    {
      id: 's-series',
      name: 'Separadora de Discos Série S',
      category: 'separadora',
      description: 'Clarificação e purificação de líquidos com precisão microscópica. Ideal para laticínios.',
      longDescription: 'Nossa separadora de discos Série S (Vertical Disc Stack) utiliza uma pilha de discos cônicos para criar uma enorme área de clarificação em um espaço compacto. É a escolha definitiva para separação líquido-líquido-sólido em indústrias alimentícias, farmacêuticas e de biocombustíveis, onde a higiene e a precisão são inegociáveis.',
      // Imagem: Tanques de aço inox sanitário (Visual idêntico a separadoras verticais)
      imageUrl: 'https://images.unsplash.com/photo-1516916759473-600c07bc99d7?auto=format&fit=crop&q=80&w=800',
      specs: ['Eficiência de Clarificação: 99.9%', 'Autolimpeza automática', 'Design sanitário'],
      features: [
        'Sistema de descarga automática de sólidos parciais e totais',
        'Vedação hermética para evitar oxidação do produto',
        'Acabamento sanitário polido (Ra < 0.8µm)',
        'Integração CIP (Clean-in-Place) completa'
      ],
      technicalData: [
        { label: 'Capacidade Hidráulica', value: 'Até 50.000 L/h' },
        { label: 'Rotação do Tambor', value: 'Até 8.500 RPM' },
        { label: 'Fator G', value: '12.000 G' },
        { label: 'Nível de Ruído', value: '< 78 dB(A)' },
        { label: 'Conformidade', value: 'EHEDG / FDA' }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1559304822-9eb2813c9844?auto=format&fit=crop&q=80&w=800', // Manômetros sanitários
        'https://images.unsplash.com/photo-1571216682256-a9c5464f145f?auto=format&fit=crop&q=80&w=800', // Tanques polidos
        'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800', // Linha de produção limpa
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800'  // Líquido sendo processado
      ]
    },
    {
      id: 'v-series',
      name: 'Centrífuga Vertical V-Pro',
      category: 'filtradora',
      description: 'Solução robusta para indústrias químicas e farmacêuticas que exigem secagem de cristais.',
      longDescription: 'A V-Pro é uma centrífuga de cesto vertical (Cesto Perfurado) projetada para operações em batelada. É especialista na lavagem e secagem de cristais, polímeros e produtos químicos finos. Com abertura total do tampo e possibilidade de raspagem automática, oferece segurança máxima para o operador e pureza do produto final.',
      // Imagem: Máquina industrial fechada / Tecnologia de precisão
      imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800',
      specs: ['Cesto perfurado customizável', 'Segurança EX-Proof', 'Carga máxima: 500kg'],
      features: [
        'Atende normas para áreas classificadas (Zona 1/21)',
        'Sistema de injeção de nitrogênio (inertização)',
        'Raspador automático ou manual',
        'Controle preciso de velocidade via inversor de frequência'
      ],
      technicalData: [
        { label: 'Diâmetro do Cesto', value: '800mm - 1600mm' },
        { label: 'Volume Útil', value: '100L - 800L' },
        { label: 'Força Centrífuga', value: '800 - 1200 G' },
        { label: 'Material de Construção', value: 'Inox 316L, Hastelloy, Titânio' },
        { label: 'Sistema de Freio', value: 'Regenerativo + Pneumático' }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', // Laboratório Clean Room
        'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800', // Equipamento automatizado
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800', // Vidraria química
        'https://images.unsplash.com/photo-1617134267493-57530c175344?auto=format&fit=crop&q=80&w=800'  // Textura de pó químico
      ]
    }
  ];

  const services: Service[] = [
    { id: '1', title: 'Fabricação Customizada', description: 'Projetos sob medida para sua planta industrial.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: '2', title: 'Manutenção Preditiva', description: 'Monitoramento de vibração e análise de óleo.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: '3', title: 'Balanceamento Dinâmico', description: 'Serviço em campo ou em nossa fábrica.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  ];

  const handleNavigate = (section: Section) => {
    setCurrentSection(section);
    if (section === Section.AI_CONSULTANT) {
      setShowChatModal(true);
      return;
    }
    setShowChatModal(false);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRequestQuote = () => {
    setSelectedProduct(null);
    handleNavigate(Section.CONTACT);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />

      <main className="pt-16">
        
        {/* Home / Hero Section */}
        <section id={Section.HOME} className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             {/* Background de fábrica industrial genérico e robusto */}
             <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1920" alt="Industrial Background" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-slate-900/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Excelência em <span className="text-blue-400">Separação Industrial</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
              Fabricação, manutenção e otimização de centrífugas de alta performance para os setores mais exigentes.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigate(Section.PRODUCTS)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Conheça Nossos Produtos
              </button>
              <button 
                onClick={() => handleNavigate(Section.AI_CONSULTANT)}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Fale com Engenheiro IA
              </button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id={Section.PRODUCTS} className="py-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossa Linha de Centrífugas</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Equipamentos projetados para máxima eficiência e durabilidade.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id={Section.SERVICES} className="py-20 bg-slate-900 text-white">
           <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Serviços Especializados</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {services.map(service => (
                <div key={service.id} className="text-center group p-6 rounded-xl hover:bg-slate-800 transition-colors">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id={Section.ABOUT} className="py-20 container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               {/* Imagem de engenheiros em fábrica */}
               <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="Factory Floor" className="rounded-2xl shadow-2xl" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Tradição em Engenharia de Precisão</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                A CentriTech atua há mais de 25 anos no mercado de separação industrial. Nossa fábrica conta com usinagem CNC de última geração e equipe de engenharia especializada em dinâmica de fluidos.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Não apenas fabricamos máquinas; entregamos soluções que aumentam a produtividade da sua planta e reduzem o desperdício.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Certificação ISO 9001
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Assistência Técnica 24/7
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Tecnologia Nacional com Qualidade Global
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id={Section.CONTACT} className="bg-slate-100 py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-blue-900 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
                <p className="text-blue-200 mb-8">Estamos prontos para otimizar seu processo produtivo.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <div>
                      <h4 className="font-semibold">Endereço</h4>
                      <p className="text-blue-200">Av. Industrial, 1500 - Distrito Industrial</p>
                      <p className="text-blue-200">São Paulo, SP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <div>
                      <h4 className="font-semibold">Telefone</h4>
                      <p className="text-blue-200">+55 (11) 4002-8922</p>
                    </div>
                  </div>

                   <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-blue-200">comercial@centritech.com.br</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-12">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors">
                    Solicitar Orçamento
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CentriTech Industrial. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* AI Chat Modal Overlay */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl relative">
            <button 
              onClick={() => setShowChatModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-blue-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <AIChatbot />
          </div>
        </div>
      )}

      {/* Product Details Modal Overlay */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </div>
  );
}

export default App;