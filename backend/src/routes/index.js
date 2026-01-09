const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const authController = require('../controllers/authController');

// Auth routes
router.post('/auth/login', (req, res) => authController.login(req, res));
router.post('/auth/logout', (req, res) => authController.logout(req, res));
router.get('/auth/profile', (req, res) => authController.getProfile(req, res));

// Weather routes
router.get('/weather/coords', (req, res) => weatherController.getWeatherByCoords(req, res));
router.get('/weather/city/:city', (req, res) => weatherController.getWeatherByCity(req, res));

module.exports = router;
