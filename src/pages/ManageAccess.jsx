import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Send, Loader2 } from 'lucide-react';

const ManageAccess = () => {
    const { inviteUser } = useAuth();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInvite = async (e) => {
        e.preventDefault();
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'E-mail necessário',
                description: 'Por favor, insira um e-mail para enviar o convite.',
            });
            return;
        }
        setIsSubmitting(true);
        await inviteUser(email);
        setEmail('');
        setIsSubmitting(false);
    };

    return (
        <>
            <Helmet>
                <title>Gerenciar Acessos - Benites Bulls</title>
                <meta name="description" content="Gerencie o acesso de administradores ao painel." />
            </Helmet>
            <div className="min-h-[calc(100vh-160px)] bg-accent p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-heading">Gerenciar Acessos</h1>
                        <p className="text-muted-foreground mt-1">Convide e gerencie os administradores do painel.</p>
                    </div>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <UserPlus className="text-primary" />
                                Convidar Novo Administrador
                            </CardTitle>
                            <CardDescription>
                                O usuário receberá um e-mail com um link para criar sua senha e acessar o painel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-4 items-end">
                                <div className="flex-grow w-full">
                                    <Label htmlFor="email" className="sr-only">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@exemplo.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Enviar Convite
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    
                    <Card>
                       <CardHeader>
                           <CardTitle>Administradores Atuais</CardTitle>
                           <CardDescription>
                               A funcionalidade para listar e remover usuários será implementada em breve.
                           </CardDescription>
                       </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground italic">🚧 Em construção...</p>
                        </CardContent>
                   </Card>
                </div>
            </div>
        </>
    );
};

export default ManageAccess;