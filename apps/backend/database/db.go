package database

import (
	"fmt"
	"log"

	"community/models"

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

	// Drop and recreate the table to fix NOT NULL error
	// err = DB.Migrator().DropTable(&models.User{})
	if err != nil {
		log.Fatal("❌ Failed to drop table:", err)
	}

	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("❌ Migration failed:", err)
	}

	fmt.Println("✅ Database connected and migrated")
}
