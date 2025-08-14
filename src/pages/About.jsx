import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Shield, Award, Users, MapPin, Phone, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const values = [
    { icon: Heart, title: 'Compromisso', description: 'Dedicação total ao bem-estar e desenvolvimento de cada animal sob nossos cuidados.' },
    { icon: Shield, title: 'Ética', description: 'Práticas responsáveis e transparentes em todos os aspectos da criação.' },
    { icon: Award, title: 'Amor', description: 'Paixão genuína pela raça e carinho especial com cada exemplar.' },
    { icon: Users, title: 'Transparência', description: 'Relacionamento honesto e aberto com nossos clientes e parceiros.' }
  ];

  const timeline = [
    { year: '2014', title: 'Fundação', description: 'Início da jornada com a paixão pelas raças bully e o sonho de criar exemplares excepcionais.' },
    { year: '2017', title: 'Primeiros Campeões', description: 'Nossos primeiros cães conquistam títulos em exposições regionais.' },
    { year: '2020', title: 'Reconhecimento Nacional', description: 'Expansão para todo o Brasil e reconhecimento como canil de referência.' },
    { year: '2024', title: 'Excelência Consolidada', description: 'Mais de 100 clientes satisfeitos e genética reconhecida internacionalmente.' }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre o Canil - Benites Bulls</title>
        <meta name="description" content="Conheça a história do Benites Bulls. Fundado com a missão de criar cães saudáveis e bem socializados, somos referência nacional em American Bully e Bulldog Francês." />
      </Helmet>

      <div className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4"> Nossa História </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto"> Uma jornada de paixão, dedicação e excelência na criação de raças de elite </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-24">
            <Card className="overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img  className="w-full h-80 lg:h-full object-cover" alt="Benites Bulls kennel facilities" src="https://images.unsplash.com/photo-1575230594439-5e92393c9a75" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-heading mb-4"> Fundado com Propósito </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4"> Fundado com a missão de criar cães saudáveis, bem socializados e com genética superior, o Benites Bulls é referência no mercado nacional e internacional. Aqui, cada cão recebe atenção individual e carinho especial. </p>
                  <p className="text-muted-foreground leading-relaxed"> Nossa paixão pelas raças bully nos levou a desenvolver um programa de criação que prioriza não apenas a beleza e conformação, mas também o temperamento equilibrado e a saúde impecável de cada exemplar. </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4"> Nossos Valores </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto"> Os princípios que guiam cada decisão e ação em nosso canil </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="card-hover h-full text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-heading mb-2"> {value.title} </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm"> {value.description} </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4"> Nossa Trajetória </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto"> Marcos importantes em nossa jornada de excelência </p>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block"></div>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className={`relative flex items-center w-full`}>
                     <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                     <Card className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold text-primary">{item.year}</div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="bg-accent rounded-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-heading mb-2"> Informações Comerciais </h2>
              <p className="text-lg text-muted-foreground"> Dados oficiais do nosso estabelecimento </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4"> <MapPin size={32} /> </div>
                <h3 className="text-lg font-bold text-heading mb-1">Endereço</h3>
                <p className="text-muted-foreground text-sm"> Rua Honório Gasparino, 595<br /> Res. Alexandre - Dobrada/SP </p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4"> <Building size={32} /> </div>
                <h3 className="text-lg font-bold text-heading mb-1">CNPJ</h3>
                <p className="text-muted-foreground text-sm">25.128.982/0001-22</p>
                <p className="text-xs text-muted-foreground mt-1"> <strong>Razão Social:</strong> Benites Bulls </p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4"> <Phone size={32} /> </div>
                <h3 className="text-lg font-bold text-heading mb-1">WhatsApp</h3>
                <a href="https://wa.me/5516997962312" className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm"> (16) 9 9796-2312 </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;