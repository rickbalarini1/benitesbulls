import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn, KeyRound, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import Loader from '@/components/Loader';

const AdminLogin = () => {
  const { toast } = useToast();
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Falha no Login',
        description: 'Verifique seu e-mail e senha e tente novamente.',
      });
    } else {
      toast({
        title: 'Login bem-sucedido!',
        description: 'Bem-vindo de volta ao seu painel.',
      });
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };
  
  if (loading) {
      return (
          <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
              <Loader text="Carregando..." />
          </div>
      );
  }

  return (
    <>
      <Helmet>
        <title>Login do Criador - Benites Bulls</title>
        <meta name="description" content="Acesso restrito à área de gerenciamento do canil Benites Bulls." />
      </Helmet>

      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-accent p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center p-8">
              <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <KeyRound size={32} />
              </div>
              <CardTitle className="text-2xl">Painel do Criador</CardTitle>
              <CardDescription>Acesso exclusivo para gerenciamento</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Link to="/" className="text-sm text-primary hover:underline">
                  Voltar para o início
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;