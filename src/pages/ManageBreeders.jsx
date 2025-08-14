import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Crown, PawPrint, Loader2 } from 'lucide-react';
import Loader from '@/components/Loader';

const ManageBreeders = () => {
  const { toast } = useToast();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchDogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao buscar cães', description: error.message });
    } else {
      setDogs(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);
  
  const handleBreederToggle = async (dog) => {
    setUpdatingId(dog.id);
    const newStatus = dog.status === 'Padreador' ? 'Disponível' : 'Padreador';
    
    const { error } = await supabase
      .from('dogs')
      .update({ status: newStatus })
      .eq('id', dog.id);

    if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar status', description: error.message });
    } else {
        toast({ title: 'Status atualizado com sucesso!', description: `${dog.name} agora é ${newStatus === 'Padreador' ? 'um Padreador' : 'Disponível'}.` });
        fetchDogs();
    }
    setUpdatingId(null);
  };

  const breeders = dogs.filter(dog => dog.status === 'Padreador');
  const otherDogs = dogs.filter(dog => dog.status !== 'Padreador');

  return (
    <>
      <Helmet>
        <title>Gerenciar Padreadores - Benites Bulls</title>
        <meta name="description" content="Defina quais cães são seus padreadores oficiais." />
      </Helmet>
      <div className="min-h-[calc(100vh-160px)] bg-accent p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-heading">Gerenciar Padreadores</h1>
            <p className="text-muted-foreground mt-1">Selecione quais cães do seu plantel são padreadores.</p>
          </div>

          {loading ? (
            <Loader text="Carregando plantel..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                    <Crown className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-heading">Padreadores Atuais</h2>
                </div>
                <div className="space-y-4">
                  {breeders.length > 0 ? breeders.map(dog => (
                     <Card key={dog.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <img src={dog.image_urls?.[0] || 'https://placehold.co/100x100/FFF0D5/4C4A48?text=B'} alt={dog.name} className="h-16 w-16 object-cover rounded-md" />
                          <div>
                            <p className="font-bold text-foreground">{dog.name}</p>
                            <p className="text-sm text-muted-foreground">{dog.breed}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           {updatingId === dog.id ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                             <Switch
                                id={`breeder-switch-${dog.id}`}
                                checked={dog.status === 'Padreador'}
                                onCheckedChange={() => handleBreederToggle(dog)}
                              />
                           )}
                        </div>
                    </Card>
                  )) : (
                    <p className="text-muted-foreground italic">Nenhum padreador selecionado.</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                    <PawPrint className="h-8 w-8 text-muted-foreground" />
                    <h2 className="text-2xl font-bold text-heading">Outros Cães do Plantel</h2>
                </div>
                <div className="space-y-4">
                    {otherDogs.length > 0 ? otherDogs.map(dog => (
                       <Card key={dog.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <img src={dog.image_urls?.[0] || 'https://placehold.co/100x100/FFF0D5/4C4A48?text=B'} alt={dog.name} className="h-16 w-16 object-cover rounded-md" />
                            <div>
                              <p className="font-bold text-foreground">{dog.name}</p>
                              <p className="text-sm text-muted-foreground">{dog.breed}</p>
                            </div>
                          </div>
                           <div className="flex items-center space-x-2">
                            {updatingId === dog.id ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                              <Switch
                                 id={`breeder-switch-${dog.id}`}
                                 checked={dog.status === 'Padreador'}
                                 onCheckedChange={() => handleBreederToggle(dog)}
                               />
                            )}
                          </div>
                      </Card>
                    )) : (
                      <p className="text-muted-foreground italic">Nenhum outro cão no plantel.</p>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBreeders;