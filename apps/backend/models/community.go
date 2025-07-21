package models

import "time"

type Community struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"` // not unique anymore
	Username    string    `json:"username"`              // add this (nullable for now)
	Description string    `json:"description"`
	OwnerID     uint      `json:"ownerId"`
	Owner       User      `gorm:"foreignKey:OwnerID" json:"owner"`
	Members     []User    `gorm:"many2many:user_communities;" json:"members"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
