import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Crown, Award, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import Loader from '@/components/Loader';
import { useToast } from '@/components/ui/use-toast';

const Breeders = () => {
  const [breeders, setBreeders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBreeders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('status', 'Padreador')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao buscar padreadores',
          description: 'Não foi possível buscar os padreadores. Tente novamente mais tarde.',
        });
        console.error('Error fetching breeders:', error);
      } else {
        setBreeders(data);
      }
      setLoading(false);
    };

    fetchBreeders();
  }, [toast]);
  

  return (
    <>
      <Helmet>
        <title>Padreadores - Benites Bulls</title>
        <meta name="description" content="Conheça nossos reprodutores selecionados, responsáveis por manter e elevar o padrão genético Benites Bulls. Padreadores campeões com pedigree excepcional." />
      </Helmet>

      <div className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-6"> <Crown size={48} /> </div>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4"> Nossos Padreadores </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto"> Conheça nossos reprodutores selecionados, responsáveis por manter e elevar o padrão genético Benites Bulls </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-accent rounded-lg p-8 mb-20 text-center">
            <h2 className="text-2xl font-bold text-heading mb-2"> Excelência Genética Comprovada </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto"> Nossos padreadores são cuidadosamente selecionados não apenas por sua beleza e conformação, mas também por seu temperamento excepcional e saúde impecável. Cada reprodutor passa por rigorosos exames de saúde e avaliação comportamental antes de integrar nosso programa de criação. </p>
          </motion.div>
          
          {loading ? <Loader text="Carregando padreadores..."/> : (
            <>
              {breeders.length > 0 ? (
                <div className="space-y-16">
                  {breeders.map((breeder, index) => (
                    <motion.div key={breeder.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                      <Card className="overflow-hidden shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className={`relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                            <img className="w-full h-96 lg:h-full object-cover" alt={`${breeder.name} - ${breeder.breed}`} src={breeder.image_urls?.[0] || 'https://placehold.co/800x600/FFF0D5/4C4A48?text=Sem+Foto'} />
                            <div className="absolute top-4 left-4"> <span className="status-badge status-padreador flex items-center"> <Crown size={16} className="mr-2" /> Padreador </span> </div>
                          </div>
                          <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                              <h3 className="text-3xl font-bold text-heading mb-1">{breeder.name}</h3>
                              <p className="text-xl text-primary font-semibold mb-2">{breeder.breed}</p>
                              <p className="text-muted-foreground">{breeder.age}</p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-8"> {breeder.description} </p>
                            <div className="mb-8">
                              <h4 className="text-lg font-bold text-heading mb-4 flex items-center"> <Award size={20} className="mr-2 text-primary" /> Genética e Diferenciais </h4>
                                <ul className="space-y-2">
                                  {/* This part can be dynamic if you add achievements to your DB */}
                                  <li className="flex items-center text-muted-foreground"> <Star size={16} className="mr-3 text-yellow-500 flex-shrink-0" /> Linhagem Importada </li>
                                  <li className="flex items-center text-muted-foreground"> <Star size={16} className="mr-3 text-yellow-500 flex-shrink-0" /> Estrutura Compacta </li>
                                  <li className="flex items-center text-muted-foreground"> <Star size={16} className="mr-3 text-yellow-500 flex-shrink-0" /> Temperamento Dócil </li>
                                </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button asChild size="lg" className="flex-1">
                                <a href={`https://wa.me/5516997962312?text=Olá! Gostaria de saber mais sobre cobertura com o ${breeder.name}.`} target="_blank" rel="noopener noreferrer">Solicitar Cobertura</a>
                              </Button>
                              <Button asChild size="lg" variant="outline" className="flex-1">
                                <a href={`https://wa.me/5516997962312?text=Olá! Gostaria de ver o pedigree do ${breeder.name}.`} target="_blank" rel="noopener noreferrer">Ver Pedigree</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">Nenhum padreador cadastrado no momento.</p>
                </div>
              )}
            </>
          )}


          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-24 bg-secondary text-secondary-foreground rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4"> Interessado em uma Cobertura? </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"> Entre em contato conosco para discutir as possibilidades de cobertura com nossos padreadores excepcionais. </p>
            <Button asChild size="lg">
              <a href="https://wa.me/5516997962312?text=Olá! Gostaria de saber mais sobre coberturas com os padreadores do Benites Bulls." target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Breeders;