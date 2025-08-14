/*
  # Criar bucket de storage para imagens dos cães

  1. Storage
    - Criar bucket `dog_images` para armazenar as fotos dos cães
    - Configurar políticas de acesso público para leitura
    - Permitir upload apenas para usuários autenticados

  2. Políticas
    - Leitura pública das imagens
    - Upload restrito a usuários autenticados
*/

-- Criar bucket para imagens dos cães
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog_images', 'dog_images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir leitura pública das imagens
CREATE POLICY "Imagens dos cães são públicas"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'dog_images');

-- Política para permitir upload apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem fazer upload de imagens"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'dog_images');

-- Política para permitir atualização apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem atualizar imagens"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'dog_images')
  WITH CHECK (bucket_id = 'dog_images');

-- Política para permitir exclusão apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem deletar imagens"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'dog_images');