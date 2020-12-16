/*
  Warnings:

  - Added the required column `rate` to the `Book` table without a default value. This is not possible if the table is not empty.
  
*/
-- AlterTable
ALTER TABLE `Book`
ADD COLUMN     `rate` INT NOT NULL;
