package database

import (
	"fmt"
	"log"

	"community/models" // Update this import path if your module name is different

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=localhost user=abboskhonov password=abror2520 dbname=database-test port=5432 sslmode=disable"

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	// AutoMigrate your models
	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("❌ Migration failed:", err)
	}

	fmt.Println("✅ Database connected and migrated")
}