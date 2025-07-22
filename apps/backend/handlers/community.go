package handlers

import (
	"community/database"
	"community/models"

	"github.com/gofiber/fiber/v2"
)

func CreateCommunity(c *fiber.Ctx) error {
	val := c.Locals("userID")
	userID, ok := val.(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
	}

	var input models.Community
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	input.OwnerID = userID
	if err := database.DB.Create(&input).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not create community"})
	}

	return c.JSON(input)
}

func GetAllCommunities(c *fiber.Ctx) error {
	var communities []models.Community
	if err := database.DB.Preload("Owner").Find(&communities).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve communities"})
	}
	return c.JSON(communities)
}

func GetCommunityByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var community models.Community
	if err := database.DB.Preload("Owner").First(&community, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Community not found"})
	}
	return c.JSON(community)
}

func UpdateCommunity(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	id := c.Params("id")

	var community models.Community
	if err := database.DB.First(&community, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Community not found"})
	}

	if community.OwnerID != userID {
		return c.Status(403).JSON(fiber.Map{"error": "Unauthorized"})
	}

	var input models.Community
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	community.Name = input.Name
	community.Description = input.Description

	database.DB.Save(&community)
	return c.JSON(community)
}

func DeleteCommunity(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	id := c.Params("id")

	var community models.Community
	if err := database.DB.First(&community, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Community not found"})
	}

	if community.OwnerID != userID {
		return c.Status(403).JSON(fiber.Map{"error": "Unauthorized"})
	}

	database.DB.Delete(&community)
	return c.JSON(fiber.Map{"message": "Community deleted"})
}


func GetUserAndOtherCommunities(c *fiber.Ctx) error {
	val := c.Locals("userID")
	userID, ok := val.(uint)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
	}

	var userCommunities []models.Community
	var otherCommunities []models.Community

	// Get communities created by the user
	if err := database.DB.
		Where("owner_id = ?", userID).
		Preload("Owner").
		Find(&userCommunities).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get user's communities"})
	}

	// Get communities NOT created by the user
	if err := database.DB.
		Where("owner_id != ?", userID).
		Preload("Owner").
		Find(&otherCommunities).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get other communities"})
	}

	return c.JSON(fiber.Map{
		"userCommunities":  userCommunities,
		"otherCommunities": otherCommunities,
	})
}
