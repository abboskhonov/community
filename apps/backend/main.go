package main

import (
	"community/database"
	"community/handlers"
	"community/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
		AllowCredentials: true,
	}))

	api := app.Group("/api")

	// Public routes
	api.Post("/register", handlers.Register)
	api.Post("/login", handlers.Login)

	// Protected routes
	protected := api.Group("", middleware.Protect)
	protected.Post("/communities", handlers.CreateCommunity)
	protected.Get("/communities/tab", handlers.GetUserAndOtherCommunities)



	app.Listen(":3000")
}
