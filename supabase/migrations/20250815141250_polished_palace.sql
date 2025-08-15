/*
  # Add is_featured column to dogs table

  1. Changes
    - Add `is_featured` boolean column to `dogs` table
    - Set default value to false
    - Update existing records to have is_featured = false

  2. Security
    - No changes to existing RLS policies needed
*/

-- Add the is_featured column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dogs' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE dogs ADD COLUMN is_featured boolean DEFAULT false;
  END IF;
END $$;

-- Ensure all existing records have is_featured set to false
UPDATE dogs SET is_featured = false WHERE is_featured IS NULL;