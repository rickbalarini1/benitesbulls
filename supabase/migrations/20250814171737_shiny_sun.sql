/*
  # Criar tabela de cães

  1. Nova Tabela
    - `dogs`
      - `id` (uuid, primary key)
      - `name` (text, nome do cão)
      - `breed` (text, raça)
      - `age` (text, idade)
      - `sex` (text, sexo - Macho/Fêmea)
      - `status` (text, status - Disponível/Reservado/Vendido/Padreador)
      - `description` (text, descrição)
      - `image_urls` (text[], array de URLs das imagens)
      - `is_featured` (boolean, se está em destaque na home)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `dogs`
    - Adicionar política para usuários autenticados poderem ler todos os dados
    - Adicionar política para usuários autenticados poderem inserir/atualizar/deletar
*/

CREATE TABLE IF NOT EXISTS dogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  breed text NOT NULL,
  age text,
  sex text NOT NULL CHECK (sex IN ('Macho', 'Fêmea')),
  status text NOT NULL DEFAULT 'Disponível' CHECK (status IN ('Disponível', 'Reservado', 'Vendido', 'Padreador')),
  description text,
  image_urls text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (qualquer pessoa pode ver os cães)
CREATE POLICY "Qualquer pessoa pode ver os cães"
  ON dogs
  FOR SELECT
  TO public
  USING (true);

-- Política para usuários autenticados poderem inserir
CREATE POLICY "Usuários autenticados podem inserir cães"
  ON dogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para usuários autenticados poderem atualizar
CREATE POLICY "Usuários autenticados podem atualizar cães"
  ON dogs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para usuários autenticados poderem deletar
CREATE POLICY "Usuários autenticados podem deletar cães"
  ON dogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_dogs_updated_at
    BEFORE UPDATE ON dogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();