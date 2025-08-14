import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from "@/components/ui/use-toast";
import Loader from '@/components/Loader';

const Gallery = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching dogs:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar cães",
          description: "Não foi possível buscar os cães da galeria. Tente novamente mais tarde.",
        });
      } else {
        setDogs(data);
      }
      setLoading(false);
    };

    fetchDogs();
  }, [toast]);
  
  const filters = ['Todos', 'Disponível', 'Reservado', 'Padreador', 'Vendido'];

  const filteredDogs = dogs.filter(dog => {
    const matchesFilter = selectedFilter === 'Todos' || dog.status === selectedFilter;
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) || dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Galeria de Cães - Benites Bulls</title>
        <meta name="description" content="Conheça nossa galeria completa de American Bully, Bulldog Francês e Exotic Bully. Cães disponíveis, reservados e nossos padreadores de elite." />
      </Helmet>

      <div className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4"> Nossa Galeria </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto"> Conheça nossos exemplares, cada um com genética superior e temperamento exemplar. </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-16 sticky top-32 z-40 bg-background/80 backdrop-blur-xl p-4 rounded-xl border-2">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-auto lg:flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input type="text" placeholder="Buscar por nome ou raça..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 bg-card" />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {filters.map((filter) => (
                  <Button key={filter} variant={selectedFilter === filter ? "default" : "secondary"} size="sm" onClick={() => setSelectedFilter(filter)}>
                    {filter === 'Padriador' ? 'Padreador' : filter}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {loading ? <Loader text="Carregando galeria..." /> : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDogs.map((dog, index) => (
                  <motion.div key={dog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }}>
                    <Card className="card-hover overflow-hidden h-full flex flex-col bg-card group">
                      <div className="relative overflow-hidden">
                        <img className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" alt={`${dog.name} - ${dog.breed}`} src={dog.image_urls?.[0] || 'https://placehold.co/600x400/FFF0D5/4C4A48?text=Sem+Foto'} />
                        <div className="absolute top-4 right-4"> <span className={`status-badge status-${dog.status.toLowerCase().replace(/\s/g, '-')}`}> {dog.status} </span> </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl text-card-foreground">{dog.name}</CardTitle>
                        <p className="text-primary font-semibold text-lg">{dog.breed}</p>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <div className="space-y-2 mb-6 text-base text-muted-foreground">
                          <div className="flex justify-between"> <span>Idade:</span> <span className="font-medium text-card-foreground">{dog.age || 'N/D'}</span> </div>
                          <div className="flex justify-between"> <span>Sexo:</span> <span className="font-medium text-card-foreground">{dog.sex}</span> </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow"> {dog.description} </p>
                        <Button asChild className="w-full mt-auto" size="lg">
                          <a href={`https://wa.me/5516997962312?text=Olá! Gostaria de saber mais sobre o ${dog.name} (${dog.breed}).`} target="_blank" rel="noopener noreferrer">Mais Informações</a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
               {filteredDogs.length === 0 && !loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 col-span-full">
                  <p className="text-xl text-muted-foreground"> Nenhum cão encontrado com os filtros selecionados. </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;