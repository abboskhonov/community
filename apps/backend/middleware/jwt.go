package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("your-secret")

func Protect(c *fiber.Ctx) error {
	auth := c.Get("Authorization")
	if auth == "" || len(auth) < 7 || auth[:7] != "Bearer " {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
	}

	tokenStr := auth[7:]

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil || !token.Valid {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
	}

	// Extract claims and set userID
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if uid, ok := claims["user_id"].(float64); ok {
			c.Locals("userID", uint(uid))
		} else {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid user ID in token"})
		}
	} else {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token claims"})
	}

	return c.Next()
}

func GenerateToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
