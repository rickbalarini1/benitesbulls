/*
  # Add is_featured column to dogs table

  1. Changes
    - Add `is_featured` boolean column to `dogs` table
    - Set default value to false
    - Allow null values initially for existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dogs' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE dogs ADD COLUMN is_featured boolean DEFAULT false;
  END IF;
END $$;