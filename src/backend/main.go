package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Request struct {
	Text string `json:"text"`
}

type Response struct {
	Message string `json:"message"`
}

func main() {
	router := gin.Default()

	// Enable CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	router.POST("/echo", func(c *gin.Context) {
		var request Request
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, Response{Message: "Invalid request"})
			return
		}

		c.JSON(http.StatusOK, Response{Message: request.Text})
	})

	router.Run(":8080")
}
