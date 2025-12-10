'use client'

import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import BrushStroke from './BrushStroke'
import 'leaflet/dist/leaflet.css'
import './Cafes.css'

const placesData = [
  // Paris - Cafés (Top 5)
  {
    id: 1,
    name: 'Café Kitsuné',
    area: 'Palais Royal',
    city: 'Paris',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&auto=format&fit=crop',
    coords: [48.8637, 2.3365],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8637,2.3365',
  },
  {
    id: 2,
    name: 'Boot Café',
    area: 'Le Marais',
    city: 'Paris',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&auto=format&fit=crop',
    coords: [48.8566, 2.3622],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8566,2.3622',
  },
  {
    id: 3,
    name: 'Coutume Café',
    area: 'Babylone',
    city: 'Paris',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&auto=format&fit=crop',
    coords: [48.8513, 2.3174],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8513,2.3174',
  },
  {
    id: 4,
    name: 'Café de Flore',
    area: 'Saint-Germain',
    city: 'Paris',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&auto=format&fit=crop',
    coords: [48.8542, 2.3326],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8542,2.3326',
  },
  {
    id: 5,
    name: 'Ten Belles',
    area: 'Canal Saint-Martin',
    city: 'Paris',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&auto=format&fit=crop',
    coords: [48.8713, 2.3649],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8713,2.3649',
  },
  // Paris - Restaurants (Top 5)
  {
    id: 6,
    name: 'Septime',
    area: 'Bastille',
    city: 'Paris',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&auto=format&fit=crop',
    coords: [48.8531, 2.3776],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8531,2.3776',
  },
  {
    id: 7,
    name: 'Frenchie',
    area: 'Sentier',
    city: 'Paris',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&auto=format&fit=crop',
    coords: [48.8672, 2.3438],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8672,2.3438',
  },
  {
    id: 8,
    name: 'Ellsworth',
    area: 'Le Marais',
    city: 'Paris',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&auto=format&fit=crop',
    coords: [48.8580, 2.3622],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8580,2.3622',
  },
  {
    id: 9,
    name: 'Clown Bar',
    area: 'Oberkampf',
    city: 'Paris',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&auto=format&fit=crop',
    coords: [48.8649, 2.3792],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8649,2.3792',
  },
  {
    id: 10,
    name: 'Le Chateaubriand',
    area: 'Belleville',
    city: 'Paris',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&auto=format&fit=crop',
    coords: [48.8700, 2.3826],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8700,2.3826',
  },
  // Paris - Bars à vin (Top 5)
  {
    id: 11,
    name: 'La Buvette',
    area: 'Pigalle',
    city: 'Paris',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&auto=format&fit=crop',
    coords: [48.8816, 2.3371],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8816,2.3371',
  },
  {
    id: 12,
    name: 'Le Baron Rouge',
    area: 'Bastille',
    city: 'Paris',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [48.8512, 2.3773],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8512,2.3773',
  },
  {
    id: 13,
    name: 'Aux Deux Amis',
    area: 'Oberkampf',
    city: 'Paris',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [48.8654, 2.3745],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8654,2.3745',
  },
  {
    id: 14,
    name: 'Le Verre Volé',
    area: 'Canal Saint-Martin',
    city: 'Paris',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&auto=format&fit=crop',
    coords: [48.8721, 2.3642],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8721,2.3642',
  },
  {
    id: 15,
    name: 'Septime La Cave',
    area: 'Bastille',
    city: 'Paris',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [48.8530, 2.3774],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.8530,2.3774',
  },
  // Dublin - Cafés (Top 5)
  {
    id: 16,
    name: 'Clement & Pekoe',
    area: 'South William St',
    city: 'Dublin',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&auto=format&fit=crop',
    coords: [53.3418, -6.2624],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3418,-6.2624',
  },
  {
    id: 17,
    name: '3FE Coffee',
    area: 'Grand Canal',
    city: 'Dublin',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&auto=format&fit=crop',
    coords: [53.3389, -6.2413],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3389,-6.2413',
  },
  {
    id: 18,
    name: 'Kaph',
    area: 'Drury Street',
    city: 'Dublin',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&auto=format&fit=crop',
    coords: [53.3421, -6.2631],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3421,-6.2631',
  },
  {
    id: 19,
    name: 'Bewley\'s',
    area: 'Grafton Street',
    city: 'Dublin',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&auto=format&fit=crop',
    coords: [53.3426, -6.2602],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3426,-6.2602',
  },
  {
    id: 20,
    name: 'The Fumbally',
    area: 'The Liberties',
    city: 'Dublin',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&auto=format&fit=crop',
    coords: [53.3386, -6.2721],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3386,-6.2721',
  },
  // Dublin - Restaurants (Top 5)
  {
    id: 21,
    name: 'Chapter One',
    area: 'Parnell Square',
    city: 'Dublin',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&auto=format&fit=crop',
    coords: [53.3532, -6.2643],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3532,-6.2643',
  },
  {
    id: 22,
    name: 'The Greenhouse',
    area: 'Dawson Street',
    city: 'Dublin',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&auto=format&fit=crop',
    coords: [53.3399, -6.2577],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3399,-6.2577',
  },
  {
    id: 23,
    name: 'Bastible',
    area: 'South Circular Road',
    city: 'Dublin',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&auto=format&fit=crop',
    coords: [53.3345, -6.2774],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3345,-6.2774',
  },
  {
    id: 24,
    name: 'Delahunt',
    area: 'Camden Street',
    city: 'Dublin',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&auto=format&fit=crop',
    coords: [53.3361, -6.2629],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3361,-6.2629',
  },
  {
    id: 25,
    name: 'Forest Avenue',
    area: 'Ranelagh',
    city: 'Dublin',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&auto=format&fit=crop',
    coords: [53.3253, -6.2572],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3253,-6.2572',
  },
  // Dublin - Bars à vin (Top 5)
  {
    id: 26,
    name: 'Ely Wine Bar',
    area: 'Ely Place',
    city: 'Dublin',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [53.3388, -6.2554],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3388,-6.2554',
  },
  {
    id: 27,
    name: 'The Vintage Cocktail Club',
    area: 'Temple Bar',
    city: 'Dublin',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [53.3452, -6.2640],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3452,-6.2640',
  },
  {
    id: 28,
    name: 'L\'Gueuleton Wine Bar',
    area: 'Fade Street',
    city: 'Dublin',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&auto=format&fit=crop',
    coords: [53.3431, -6.2638],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3431,-6.2638',
  },
  {
    id: 29,
    name: '64 Wine',
    area: 'Glasthule',
    city: 'Dublin',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [53.2886, -6.1284],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.2886,-6.1284',
  },
  {
    id: 30,
    name: 'Loose Canon',
    area: 'Drury Street',
    city: 'Dublin',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [53.3422, -6.2635],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3422,-6.2635',
  },
  // London - Cafés (Top 5)
  {
    id: 31,
    name: 'Monmouth Coffee',
    area: 'Borough Market',
    city: 'London',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&auto=format&fit=crop',
    coords: [51.5055, -0.0910],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5055,-0.0910',
  },
  {
    id: 32,
    name: 'Prufrock Coffee',
    area: 'Leather Lane',
    city: 'London',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&auto=format&fit=crop',
    coords: [51.5204, -0.1096],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5204,-0.1096',
  },
  {
    id: 33,
    name: 'Workshop Coffee',
    area: 'Clerkenwell',
    city: 'London',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&auto=format&fit=crop',
    coords: [51.5232, -0.1033],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5232,-0.1033',
  },
  {
    id: 34,
    name: 'Ozone Coffee',
    area: 'Shoreditch',
    city: 'London',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&auto=format&fit=crop',
    coords: [51.5247, -0.0803],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5247,-0.0803',
  },
  {
    id: 35,
    name: 'Caravan',
    area: 'King\'s Cross',
    city: 'London',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&auto=format&fit=crop',
    coords: [51.5366, -0.1240],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5366,-0.1240',
  },
  // London - Restaurants (Top 5)
  {
    id: 36,
    name: 'St. John',
    area: 'Farringdon',
    city: 'London',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&auto=format&fit=crop',
    coords: [51.5201, -0.1025],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5201,-0.1025',
  },
  {
    id: 37,
    name: 'The River Café',
    area: 'Hammersmith',
    city: 'London',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&auto=format&fit=crop',
    coords: [51.4887, -0.2276],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.4887,-0.2276',
  },
  {
    id: 38,
    name: 'Lyle\'s',
    area: 'Shoreditch',
    city: 'London',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&auto=format&fit=crop',
    coords: [51.5243, -0.0758],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5243,-0.0758',
  },
  {
    id: 39,
    name: 'Brat',
    area: 'Shoreditch',
    city: 'London',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&auto=format&fit=crop',
    coords: [51.5252, -0.0771],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5252,-0.0771',
  },
  {
    id: 40,
    name: 'Café Cecilia',
    area: 'Dalston',
    city: 'London',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&auto=format&fit=crop',
    coords: [51.5465, -0.0754],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5465,-0.0754',
  },
  // London - Bars à vin (Top 5)
  {
    id: 41,
    name: 'Gordon\'s Wine Bar',
    area: 'Embankment',
    city: 'London',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [51.5088, -0.1226],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5088,-0.1226',
  },
  {
    id: 42,
    name: 'Noble Rot',
    area: 'Bloomsbury',
    city: 'London',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [51.5196, -0.1244],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5196,-0.1244',
  },
  {
    id: 43,
    name: 'Terroirs',
    area: 'Charing Cross',
    city: 'London',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&auto=format&fit=crop',
    coords: [51.5100, -0.1246],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5100,-0.1246',
  },
  {
    id: 44,
    name: 'Bar Pepito',
    area: 'King\'s Cross',
    city: 'London',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [51.5302, -0.1192],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5302,-0.1192',
  },
  {
    id: 45,
    name: 'P. Franco',
    area: 'Clapton',
    city: 'London',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [51.5609, -0.0530],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=51.5609,-0.0530',
  },
  // Osaka - Cafés (Top 5)
  {
    id: 46,
    name: 'Lilo Coffee Roasters',
    area: 'Namba',
    city: 'Osaka',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&auto=format&fit=crop',
    coords: [34.6659, 135.5013],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6659,135.5013',
  },
  {
    id: 47,
    name: 'Mel Coffee Roasters',
    area: 'Shinsaibashi',
    city: 'Osaka',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&auto=format&fit=crop',
    coords: [34.6747, 135.5023],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6747,135.5023',
  },
  {
    id: 48,
    name: 'Granknot Coffee',
    area: 'Kitahama',
    city: 'Osaka',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&auto=format&fit=crop',
    coords: [34.6912, 135.5058],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6912,135.5058',
  },
  {
    id: 49,
    name: 'Takamura Wine & Coffee',
    area: 'Nishi-ku',
    city: 'Osaka',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&auto=format&fit=crop',
    coords: [34.6815, 135.4874],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6815,135.4874',
  },
  {
    id: 50,
    name: 'Brooklyn Roasting Company',
    area: 'Kitahama',
    city: 'Osaka',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&auto=format&fit=crop',
    coords: [34.6905, 135.5089],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6905,135.5089',
  },
  // Osaka - Restaurants (Top 5)
  {
    id: 51,
    name: 'Hajime',
    area: 'Nishi-ku',
    city: 'Osaka',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&auto=format&fit=crop',
    coords: [34.6789, 135.4956],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6789,135.4956',
  },
  {
    id: 52,
    name: 'La Cime',
    area: 'Higashishinsaibashi',
    city: 'Osaka',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&auto=format&fit=crop',
    coords: [34.6721, 135.5067],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6721,135.5067',
  },
  {
    id: 53,
    name: 'Fujiya 1935',
    area: 'Chuo-ku',
    city: 'Osaka',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&auto=format&fit=crop',
    coords: [34.6834, 135.5145],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6834,135.5145',
  },
  {
    id: 54,
    name: 'Mizuno',
    area: 'Dotonbori',
    city: 'Osaka',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&auto=format&fit=crop',
    coords: [34.6687, 135.5012],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6687,135.5012',
  },
  {
    id: 55,
    name: 'Kappo Yoshino',
    area: 'Kitashinchi',
    city: 'Osaka',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&auto=format&fit=crop',
    coords: [34.6978, 135.4989],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6978,135.4989',
  },
  // Osaka - Bars à vin (Top 5)
  {
    id: 56,
    name: 'Fujimaru Winery',
    area: 'Kashiwara',
    city: 'Osaka',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [34.5823, 135.6289],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.5823,135.6289',
  },
  {
    id: 57,
    name: 'Wine Bistro NOLA',
    area: 'Fukushima',
    city: 'Osaka',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [34.6945, 135.4856],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6945,135.4856',
  },
  {
    id: 58,
    name: 'Bar K',
    area: 'Kitashinchi',
    city: 'Osaka',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&auto=format&fit=crop',
    coords: [34.6989, 135.4978],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6989,135.4978',
  },
  {
    id: 59,
    name: 'Pontocho Robin',
    area: 'Tenma',
    city: 'Osaka',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&auto=format&fit=crop',
    coords: [34.7012, 135.5123],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.7012,135.5123',
  },
  {
    id: 60,
    name: 'Cuvée J2',
    area: 'Shinsaibashi',
    city: 'Osaka',
    type: 'Bar à vin',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&auto=format&fit=crop',
    coords: [34.6756, 135.5034],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.6756,135.5034',
  },
]

const cities = ['Paris', 'Dublin', 'London', 'Osaka']

const cityCoords = {
  Paris: { center: [48.8566, 2.3522], zoom: 12 },
  Dublin: { center: [53.3400, -6.2400], zoom: 12 },
  London: { center: [51.5150, -0.1000], zoom: 11 },
  Osaka: { center: [34.6700, 135.5200], zoom: 11 },
}

const getCitiesWithCount = () => {
  const counts = {}
  placesData.forEach(place => {
    counts[place.city] = (counts[place.city] || 0) + 1
  })
  return counts
}

const Cafes = () => {
  const [selectedCity, setSelectedCity] = useState('Paris')
  const [selectedType, setSelectedType] = useState('Café') // 'Café', 'Restaurant', 'Bar à vin'
  const [viewMode, setViewMode] = useState('list')
  const { lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useScrollReveal()
  const cityCounts = useMemo(() => getCitiesWithCount(), [])

  const filteredPlaces = useMemo(() => {
    return placesData
      .filter(place => place.city === selectedCity && place.type === selectedType)
      .slice(0, 5) // Top 5
  }, [selectedCity, selectedType])

  const currentCityCoords = cityCoords[selectedCity] || cityCoords.Paris

  const labels = {
    fr: {
      sectionLabel: 'Mes adresses',
      sectionTitle: 'Carnet',
      sectionSubtitle: 'gourmand',
      my: 'Mes',
      cafes: 'cafés',
      restaurants: 'restaurants',
      bars: 'bars',
      in: 'à',
      intro: 'Mon top 5 par catégorie. Les lieux qui font vibrer mon palais et mon cœur.',
      mapTitle: 'Ma carte gourmande',
      mapSubtitle: 'Tous mes coups de cœur à travers le monde',
      viewList: 'Liste',
      viewMap: 'Carte',
    },
    en: {
      sectionLabel: 'My addresses',
      sectionTitle: 'Gourmet',
      sectionSubtitle: 'notebook',
      my: 'My',
      cafes: 'cafés',
      restaurants: 'restaurants',
      bars: 'bars',
      in: 'in',
      intro: 'My top 5 per category. The places that make my palate and heart sing.',
      mapTitle: 'My gourmet map',
      mapSubtitle: 'All my favorites around the world',
      viewList: 'List',
      viewMap: 'Map',
    },
  }

  const t = labels[lang]

  const handleCityChange = (city) => {
    setSelectedCity(city)
  }

  const getTypeTitle = () => {
    if (selectedType === 'Café') return lang === 'fr' ? t.myCafes : t.myCafes
    if (selectedType === 'Restaurant') return t.myRestaurants
    if (selectedType === 'Bar à vin') return t.myBars
    return t.myCafes
  }

  return (
    <section className="cafes" id="cafes" ref={sectionRef}>
      {/* Section Title */}
      <div className="cafes__section-header reveal">
        <span className="cafes__label">{t.sectionLabel}</span>
        <h2 className="cafes__section-title">
          {t.sectionTitle}
          <br />
          <em>{t.sectionSubtitle}</em>
        </h2>
      </div>

      {/* City List Section */}
      <div className="cafes__inner">
        <div className="cafes__header reveal">
          <div className="cafes__title-wrapper">
            <h2 className="cafes__title">
              {t.my}{' '}
              <span className="cafes__type-selector">
                <button
                  className={`cafes__type-btn ${selectedType === 'Café' ? 'is-active' : ''}`}
                  onClick={() => setSelectedType('Café')}
                >
                  {t.cafes}
                </button>
                <span className="cafes__type-separator">/</span>
                <button
                  className={`cafes__type-btn ${selectedType === 'Restaurant' ? 'is-active' : ''}`}
                  onClick={() => setSelectedType('Restaurant')}
                >
                  {t.restaurants}
                </button>
                <span className="cafes__type-separator">/</span>
                <button
                  className={`cafes__type-btn ${selectedType === 'Bar à vin' ? 'is-active' : ''}`}
                  onClick={() => setSelectedType('Bar à vin')}
                >
                  {t.bars}
                </button>
              </span>
            </h2>

            <div className="cafes__separator">
              <BrushStroke className="cafes__brush" />
            </div>

            <h3 className="cafes__subtitle">
              <em>{t.in}</em>{' '}
              <span className="cafes__city-selector">
                {cities.map((city, index) => (
                  <span key={city}>
                    <button
                      className={`cafes__city-btn ${selectedCity === city ? 'is-active' : ''}`}
                      onClick={() => handleCityChange(city)}
                    >
                      {city}
                    </button>
                    {index < cities.length - 1 && (
                      <span className="cafes__city-separator">/</span>
                    )}
                  </span>
                ))}
              </span>
            </h3>
          </div>
          <p className="cafes__intro">{t.intro}</p>

          {/* View toggle */}
          <div className="cafes__view-toggle">
            <button
              className={`cafes__view-btn ${viewMode === 'list' ? 'is-active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              {t.viewList}
            </button>
            <button
              className={`cafes__view-btn ${viewMode === 'map' ? 'is-active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              {t.viewMap}
            </button>
          </div>
        </div>

        <div className="cafes__content">
          {/* List view */}
          {viewMode === 'list' && (
            <div className="cafes__list" key={selectedCity}>
              {filteredPlaces.map((place, index) => (
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={place.id}
                  className="cafe"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="cafe__number">0{index + 1}</span>
                  <div className="cafe__img">
                    <img src={place.image} alt={place.name} loading="lazy" />
                  </div>
                  <div className="cafe__info">
                    <h3 className="cafe__name">{place.name}</h3>
                    <span className="cafe__area">{place.area} · {place.type}</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* City map view */}
          {viewMode === 'map' && (
            <div className="cafes__city-map" key={`map-${selectedCity}`}>
              <MapContainer
                key={selectedCity}
                center={currentCityCoords.center}
                zoom={currentCityCoords.zoom}
                scrollWheelZoom={false}
                zoomControl={true}
                attributionControl={false}
                className="cafes__city-map-container"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {filteredPlaces.map(place => (
                  <CircleMarker
                    key={place.id}
                    center={place.coords}
                    radius={10}
                    pathOptions={{
                      color: isDark ? '#ffffff' : '#1a1a1a',
                      weight: 2,
                      fillColor: isDark ? '#ffffff' : '#1a1a1a',
                      fillOpacity: 1,
                    }}
                    eventHandlers={{
                      click: () => window.open(place.mapsUrl, '_blank'),
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]}>
                      <div className="cafe-popup">
                        <strong>{place.name}</strong>
                        <span>{place.type} · {place.area}</span>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </div>

      {/* World Map Section */}
      <div className="cafes__map-section reveal">
        <div className="cafes__map-header">
          <h3 className="cafes__map-title">{t.mapTitle}</h3>
          <p className="cafes__map-subtitle">{t.mapSubtitle}</p>
        </div>

        <div className="cafes__world-map">
          <MapContainer
            center={[48, 10]}
            zoom={2}
            scrollWheelZoom={false}
            zoomControl={true}
            attributionControl={false}
            dragging={true}
            className="cafes__map-container"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />
            {placesData.map(place => (
              <CircleMarker
                key={place.id}
                center={place.coords}
                radius={selectedCity === place.city ? 10 : 6}
                pathOptions={{
                  color: isDark ? '#ffffff' : '#1a1a1a',
                  weight: 1.5,
                  fillColor: selectedCity === place.city
                    ? (isDark ? '#ffffff' : '#1a1a1a')
                    : (isDark ? '#1a1a1a' : '#ffffff'),
                  fillOpacity: 1,
                }}
                eventHandlers={{
                  click: () => window.open(place.mapsUrl, '_blank'),
                }}
              >
                <Tooltip direction="top" offset={[0, -8]}>
                  <div className="cafe-popup">
                    <strong>{place.name}</strong>
                    <span>{place.type} · {place.city}</span>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* City legend */}
          <div className="cafes__map-legend">
            {cities.map(city => (
              <button
                key={city}
                className={`cafes__legend-item ${selectedCity === city ? 'is-active' : ''}`}
                onClick={() => handleCityChange(city)}
              >
                <span className="cafes__legend-dot"></span>
                <span className="cafes__legend-name">{city}</span>
                <span className="cafes__legend-count">{cityCounts[city]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cafes
