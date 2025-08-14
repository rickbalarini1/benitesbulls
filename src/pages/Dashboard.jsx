import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, PawPrint, Users, ArrowRight, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dashboardCards = [
    {
      title: 'Gerenciar Cães',
      description: 'Adicione, edite e remova cães da sua galeria. Mantenha as informações sempre atualizadas.',
      icon: PawPrint,
      path: '/dashboard/manage-dogs',
    },
     {
      title: 'Gerenciar Padreadores',
      description: 'Defina quais cães são seus padreadores oficiais e gerencie suas informações.',
      icon: Crown,
      path: '/dashboard/manage-breeders',
    },
    {
      title: 'Gerenciar Acessos',
      description: 'Convide novos administradores ou remova acessos ao painel de controle.',
      icon: Users,
      path: '/dashboard/manage-access',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Painel - Benites Bulls</title>
        <meta name="description" content="Painel de gerenciamento do canil Benites Bulls." />
      </Helmet>
      <div className="min-h-[calc(100vh-160px)] bg-accent p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10"
          >
            <div>
              <h1 className="text-3xl font-bold text-heading">Painel do Criador</h1>
              <p className="text-muted-foreground mt-1">Bem-vindo de volta, {user?.email}!</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="mt-4 sm:mt-0">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card 
                  className="card-hover cursor-pointer h-full flex flex-col group" 
                  onClick={() => handleNavigation(item.path)}
                >
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <div className="text-sm font-semibold text-primary flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                      Acessar
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;