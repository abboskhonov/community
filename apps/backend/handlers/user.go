package handlers

import (
	"community/database"
	"community/middleware"
	"community/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// Register user
func Register(c *fiber.Ctx) error {
	var data models.User
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse"})
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Password), 14)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Hashing failed"})
	}
	data.Password = string(hash)
	if err := database.DB.Create(&data).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Username exists"})
	}
	return c.JSON(fiber.Map{"message": "User created"})
}

// Login and return JWT
func Login(c *fiber.Ctx) error {
	var input models.User
	var user models.User
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse"})
	}
	if err := database.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}
	token, err := middleware.GenerateToken(user.ID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create token"})
	}
	return c.JSON(fiber.Map{"token": token})
}

// Get all users
func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	database.DB.Find(&users)
	return c.JSON(users)
}

// Update user info
func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}
	var input models.User
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}
	if input.Password != "" {
		hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Password hash error"})
		}
		user.Password = string(hash)
	}
	if input.Username != "" {
		user.Username = input.Username
	}
	database.DB.Save(&user)
	return c.JSON(user)
}
