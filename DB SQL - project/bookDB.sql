-- MySQL Script generated by MySQL Workbench
-- Thu Oct  5 14:42:45 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Books` (
  `id` INT GENERATED ALWAYS AS () VIRTUAL,
  `author` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `isbn` INT(13) NOT NULL,
  `publisher` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Authors` (
  `id` INT GENERATED ALWAYS AS () VIRTUAL,
  `fullName` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `fullName`),
  INDEX `Authors_Books_idx` (`fullName` ASC),
  CONSTRAINT `Authors_Books`
    FOREIGN KEY (`fullName`)
    REFERENCES `mydb`.`Books` (`author`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Publishers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Publishers` (
  `id` INT GENERATED ALWAYS AS () VIRTUAL,
  `name` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  PRIMARY KEY (`id`, `name`),
  INDEX `Publishers_Books_idx` (`name` ASC),
  CONSTRAINT `Publishers_Books`
    FOREIGN KEY (`name`)
    REFERENCES `mydb`.`Books` (`publisher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;