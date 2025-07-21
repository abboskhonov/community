	package models

	import (
		"time"
	)

type User struct {
	ID        uint        `json:"id" gorm:"primaryKey"`
	Username  string      `json:"username" gorm:"unique;not null"`
	Password  string      `json:"password" gorm:"not null"`
	Bio       string      `json:"bio"`
	// Not required unless you want to query user's created communities
	CreatedCommunities []Community `gorm:"foreignKey:OwnerID" json:"createdCommunities"`
	Communities        []Community `gorm:"many2many:user_communities;" json:"communities"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

