import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      toast({ title: "Mensagem Enviada!", description: "Recebemos sua mensagem e entraremos em contato em breve." });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Endereço', content: 'Rua Honório Gasparino, 595\nRes. Alexandre - Dobrada/SP', action: null },
    { icon: Phone, title: 'WhatsApp', content: '(16) 9 9796-2312', action: 'https://wa.me/5516997962312' },
    { icon: Mail, title: 'E-mail', content: 'contato@benitesbulls.com.br', action: 'mailto:contato@benitesbulls.com.br' },
    { icon: Clock, title: 'Atendimento', content: 'Segunda a Sábado\n8h às 18h', action: null }
  ];

  return (
    <>
      <Helmet>
        <title>Contato - Benites Bulls</title>
        <meta name="description" content="Entre em contato com o Benites Bulls. Descubra como garantir seu filhote dos sonhos. WhatsApp, formulário de contato e localização." />
      </Helmet>

      <div className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4"> Entre em Contato </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto"> Estamos aqui para ajudar. Envie sua mensagem ou fale conosco diretamente. </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-3">
              <Card className="shadow-xl p-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="Seu nome completo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleInputChange} placeholder="Sobre o que você gostaria de falar?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea id="message" name="message" required value={formData.message} onChange={handleInputChange} placeholder="Conte-nos mais sobre seu interesse..." />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-2 space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-heading mb-1"> {info.title} </h3>
                      {info.action ? (
                        <a href={info.action} target={info.action.startsWith('http') ? '_blank' : undefined} rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-primary hover:text-primary/80 transition-colors whitespace-pre-line text-sm"> {info.content} </a>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line text-sm"> {info.content} </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-24">
            <Card className="overflow-hidden shadow-xl">
              <div className="h-96 w-full bg-gray-200 flex items-center justify-center text-center p-4">
                <div>
                  <MapPin size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-heading">Nossa Localização</h3>
                  <p className="text-muted-foreground"> Rua Honório Gasparino, 595, Res. Alexandre - Dobrada/SP </p>
                  <Button asChild variant="link" className="mt-2">
                    <a href="https://maps.google.com/?q=Rua+Honório+Gasparino,+595,+Dobrada,+SP" target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;