import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import Loader from '@/components/Loader';

const Home = () => {
  const [featuredDogs, setFeaturedDogs] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const fetchFeaturedDogs = async () => {
      setLoadingFeatured(true);
      
      // Primeiro tenta buscar cães marcados como destaque
      let { data: featured, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(4);

      // Se não houver cães em destaque, pega os 4 primeiros cadastrados
      if (!error && (!featured || featured.length === 0)) {
        const { data: firstDogs, error: firstError } = await supabase
          .from('dogs')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(4);
        
        if (!firstError) {
          featured = firstDogs;
        }
      }

      if (!error) {
        setFeaturedDogs(featured || []);
      }
      setLoadingFeatured(false);
    };

    fetchFeaturedDogs();
  }, []);

  const stats = [
    { number: '5+', label: 'Anos de Experiência' }, 
    { number: '30+', label: 'Clientes Satisfeitos' }, 
    { number: '12+', label: 'Linhagens Exclusivas' }
  ];
  
  const advantages = [
    { icon: Heart, title: 'Amor pela Raça', description: 'Paixão genuína por cada animal, garantindo cuidado excepcional e dedicação total.' }, 
    { icon: Users, title: 'Atenção Individual', description: 'Cada cão recebe atenção personalizada, desde o nascimento até a entrega ao novo lar.' }, 
    { icon: Shield, title: 'Confiança e Transparência', description: 'Processo transparente com documentação completa e acompanhamento pós-venda.' }
  ];

  return (
    <>
      <Helmet>
        <title>BENITES BULLS - Excelência na Criação de Raças de Elite</title>
        <meta name="description" content="10+ anos dedicados a criar cães com genética de alto padrão e temperamento exemplar. American Bully, Bulldog Francês e Exotic Bully de qualidade superior." />
      </Helmet>

      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-28 pt-28 bg-cover bg-center md:h-screen"
        style={{ backgroundImage: "url('https://dash.henriquebalarini.com/wp-content/uploads/2025/08/HERO.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center text-white px-5 md:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <img
              src="https://dash.henriquebalarini.com/wp-content/uploads/2025/08/72e5851d6_logonovosemfundo.png"
              alt="Benites Bulls Logo"
              className="mx-auto mb-5 w-[120px] md:w-[150px]"
            />
                      <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-5">
              Excelência e Paixão na Criação de Raças de Elite com Genética Superior e Temperamento Exemplar.
            </p>

            <Button asChild>
              <Link to="/galeria">Ver Nossos Cães</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1, once: true }} className="text-center">
                <p className="text-6xl md:text-7xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-xl text-muted-foreground font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, once: true }} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Por Que Benites Bulls?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Nosso compromisso vai além da criação - é sobre construir legados e lares felizes.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1, once: true }}>
                <Card className="card-hover h-full text-center p-8 bg-card">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                    <advantage.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">{advantage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, once: true }} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Nossos Destaques</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Conheça alguns dos nossos exemplares mais especiais.</p>
          </motion.div>
          
          {loadingFeatured ? (
            <Loader text="Carregando destaques..." />
          ) : featuredDogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredDogs.map((dog, index) => (
                <motion.div 
                  key={dog.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: index * 0.1, once: true }}
                >
                  <Card className="card-hover overflow-hidden bg-card group h-full">
                    <div className="overflow-hidden relative">
                      <img 
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" 
                        alt={`${dog.name} - ${dog.breed}`} 
                        src={dog.image_urls?.[0] || 'https://placehold.co/400x320/FFF0D5/4C4A48?text=Sem+Foto'} 
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`status-badge status-${dog.status.toLowerCase().replace(/\s/g, '-')}`}>
                          {dog.status}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{dog.name}</CardTitle>
                      <p className="text-base text-muted-foreground">{dog.breed}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button asChild className="w-full" size="sm">
                        <a 
                          href={`https://wa.me/5516997962312?text=Olá! Gostaria de saber mais sobre o ${dog.name} (${dog.breed}).`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Mais Informações
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">Nenhum cão cadastrado ainda.</p>
              <Button asChild>
                <Link to="/galeria">Ver Galeria Completa</Link>
              </Button>
            </div>
          )}
          
          <div className="text-center mt-20">
            <Button asChild>
              <Link to="/galeria">Ver Galeria Completa</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, once: true }}>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Pronto para Encontrar Seu Companheiro Ideal?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">Entre em contato e descubra como garantir seu filhote dos sonhos.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-background text-foreground hover:bg-background/90">
                <a href="https://wa.me/5516997962312" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
              </Button>
              <Button asChild variant="outline" className="border-muted bg-transparent hover:bg-muted hover:text-foreground">
                <Link to="/contato">Formulário de Contato</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default Home;