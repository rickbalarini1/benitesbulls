import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Edit, Trash2, UploadCloud, X, Loader2 } from 'lucide-react';
import Loader from '@/components/Loader';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ManageDogs = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDog, setEditingDog] = useState(null);
  
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const dogSexOptions = ['Macho', 'Fêmea'];
  const dogStatusOptions = [
    { value: 'Disponível', label: 'Disponível' },
    { value: 'Reservado', label: 'Reservado' },
    { value: 'Vendido', label: 'Vendido' },
    { value: 'Padreador', label: 'Padreador' },
  ];

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
  
  const resetForm = () => {
    setName('');
    setBreed('');
    setAge('');
    setSex('');
    setStatus('');
    setDescription('');
    setIsFeatured(false);
    setImageFiles([]);
    setImagePreviews([]);
    setEditingDog(null);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };
  
  const removeImage = (index, isExistingUrl = false) => {
    if (isExistingUrl) {
      setImagePreviews(previews => previews.filter((_, i) => i !== index));
    } else {
      const fileIndex = index - (imagePreviews.length - imageFiles.length);
      setImageFiles(files => files.filter((_, i) => i !== fileIndex));
      setImagePreviews(previews => previews.filter((_, i) => i !== index));
    }
  };
  
  const uploadImages = async () => {
    const uploadedUrls = [];
    for (const file of imageFiles) {
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from('dog_images')
            .upload(fileName, file);

        if (error) {
            throw new Error(`Falha no upload da imagem: ${error.message}`);
        }
        
        const { data: { publicUrl } } = supabase.storage
            .from('dog_images')
            .getPublicUrl(data.path);
            
        uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !breed || !sex || !status) {
        toast({ variant: 'destructive', title: 'Campos obrigatórios', description: 'Preencha todos os campos marcados com *' });
        return;
    }
    setIsSubmitting(true);
    
    try {
        const newImageUrls = await uploadImages();
        const existingImageUrls = editingDog ? imagePreviews.filter(p => typeof p === 'string' && p.startsWith('http')) : [];
        
        const dogData = {
            name,
            breed,
            age,
            sex,
            status,
            description,
            is_featured: isFeatured,
            image_urls: [...existingImageUrls, ...newImageUrls]
        };

        let error;

        if (editingDog) {
          const { error: updateError } = await supabase.from('dogs').update(dogData).eq('id', editingDog.id);
          error = updateError;
        } else {
          const { error: insertError } = await supabase.from('dogs').insert([dogData]);
          error = insertError;
        }

        if (error) {
            throw error;
        }

        toast({ title: `Cão ${editingDog ? 'atualizado' : 'adicionado'} com sucesso!`, description: 'A galeria foi atualizada.' });
        resetForm();
        setIsDialogOpen(false);
        fetchDogs();

    } catch (error) {
        toast({ variant: 'destructive', title: `Erro ao ${editingDog ? 'atualizar' : 'adicionar'} cão`, description: error.message });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleEdit = (dog) => {
    setEditingDog(dog);
    setName(dog.name);
    setBreed(dog.breed);
    setAge(dog.age || '');
    setSex(dog.sex);
    setStatus(dog.status);
    setDescription(dog.description || '');
    setIsFeatured(dog.is_featured || false);
    setImagePreviews(dog.image_urls || []);
    setImageFiles([]);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (dogId) => {
     if (!window.confirm("Tem certeza que deseja excluir este cão? Esta ação não pode ser desfeita.")) {
        return;
    }
    const { error } = await supabase.from('dogs').delete().eq('id', dogId);
    if (error) {
        toast({ variant: 'destructive', title: 'Erro ao excluir cão', description: error.message });
    } else {
        toast({ title: 'Cão excluído com sucesso!' });
        fetchDogs();
    }
  };

  return (
    <>
      <Helmet>
        <title>Gerenciar Cães - Benites Bulls</title>
        <meta name="description" content="Adicione, edite ou remova cães do seu canil." />
      </Helmet>
      <div className="min-h-[calc(100vh-160px)] bg-accent p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-heading">Gerenciar Cães</h1>
              <p className="text-muted-foreground mt-1">Adicione, edite e remova os cães da galeria.</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsDialogOpen(open); }}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)} className="mt-4 sm:mt-0">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Cão
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{editingDog ? 'Editar Cão' : 'Adicionar Novo Cão'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="name">Nome*</Label>
                          <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="breed">Raça*</Label>
                          <Input id="breed" value={breed} onChange={e => setBreed(e.target.value)} required />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="age">Idade</Label>
                          <Input id="age" value={age} onChange={e => setAge(e.target.value)} />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="sex">Sexo*</Label>
                          <Select value={sex} onValueChange={setSex}>
                              <SelectTrigger id="sex"><SelectValue placeholder="Selecione" /></SelectTrigger>
                              <SelectContent>{dogSexOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2">
                          <Label htmlFor="status">Status*</Label>
                          <Select value={status} onValueChange={setStatus}>
                              <SelectTrigger id="status"><SelectValue placeholder="Selecione" /></SelectTrigger>
                              <SelectContent>{dogStatusOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                          </Select>
                       </div>
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
                   </div>
                   <div className="space-y-2">
                      <Label>Imagens</Label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                        <div className="text-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <Label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none hover:text-primary/80">
                              <span>Carregar arquivos</span>
                              <Input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} multiple accept="image/*" />
                            </Label>
                            <p className="pl-1">ou arraste e solte</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF até 10MB</p>
                        </div>
                      </div>
                      {imagePreviews.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                              {imagePreviews.map((preview, index) => (
                                  <div key={index} className="relative group">
                                      <img src={preview} alt={`Preview ${index}`} className="h-28 w-full object-cover rounded-md" />
                                      <button type="button" onClick={() => removeImage(index, typeof preview === 'string')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <X className="h-3 w-3" />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      )}
                   </div>
                   <DialogFooter>
                      <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                      <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : (editingDog ? 'Salvar Alterações' : 'Adicionar Cão')}
                      </Button>
                   </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <Loader text="Carregando cães..." />
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dogs.map((dog) => (
                <Card key={dog.id} className="overflow-hidden flex flex-col">
                  <div className="h-56 w-full bg-muted">
                      {dog.image_urls && dog.image_urls.length > 0 ? (
                          <img src={dog.image_urls[0]} alt={dog.name} className="h-full w-full object-cover" />
                      ) : <div className="h-full w-full bg-accent"></div>}
                  </div>
                   <div className="flex items-center space-x-2">
                     <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                     <Label htmlFor="featured">Destacar na página inicial</Label>
                   </div>
                  <CardHeader>
                    <CardTitle>{dog.name}</CardTitle>
                    <CardDescription>{dog.breed}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm"><span className="font-semibold">Idade:</span> {dog.age || 'N/A'}</p>
                    <p className="text-sm"><span className="font-semibold">Sexo:</span> {dog.sex}</p>
                    <p className="text-sm">
                      <span className="font-semibold">Status:</span> 
                      <span className={`status-badge status-${(dog.status || '').toLowerCase()}`}>
                        {dog.status}
                      </span>
                    </p>
                    {dog.is_featured && (
                      <p className="text-sm">
                        <span className="font-semibold text-primary">⭐ Em destaque na home</span>
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(dog)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(dog.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageDogs;